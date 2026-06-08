import { getOllamaClient } from '../llm/ollama-client.js';
import { resolveModel, getAgentOptions } from '../llm/model-router.js';
import { buildMessages, buildCorrectionMessage, extractJson } from '../llm/prompt-builder.js';
import type { AgentConfig, AgentResult, PromptContext } from './types.js';
import type { AgentMode } from '../types/project.js';

/**
 * Executes a single agent: builds prompt → calls LLM → parses response → returns result.
 */
export async function runAgent(
  agentConfig: AgentConfig,
  context: PromptContext,
  mode: AgentMode
): Promise<AgentResult> {
  const client = getOllamaClient();
  const model = resolveModel(agentConfig.model.role, agentConfig.model.fallback);
  const options = getAgentOptions(agentConfig.name);
  const messages = buildMessages(agentConfig, context, mode);

  const startTime = Date.now();

  console.log(`[Agent] Running ${agentConfig.displayName} (${mode} mode, model: ${model})`);

  const response = await client.chat({ model, messages, options });

  const rawResponse = response.message.content;
  let output: any;

  if (agentConfig.output.format === 'json') {
    output = parseJsonResponse(rawResponse);

    // If JSON parsing failed, retry with correction prompt
    if (output === null) {
      console.log(`[Agent] ${agentConfig.displayName}: JSON parse failed, retrying with correction`);
      const correctionMsg = buildCorrectionMessage(rawResponse, 'Invalid JSON');
      const retryResponse = await client.chat({
        model,
        messages: [...messages, response.message, correctionMsg],
        options,
      });
      output = parseJsonResponse(retryResponse.message.content);

      if (output === null) {
        // Last resort: use raw text
        console.warn(`[Agent] ${agentConfig.displayName}: JSON retry also failed, using raw text`);
        output = { rawText: retryResponse.message.content };
      }
    }
  } else {
    // Text format — use response as-is
    output = rawResponse;
  }

  const duration = Date.now() - startTime;
  const tokensUsed = response.eval_count || 0;
  const promptTokens = response.prompt_eval_count || 0;

  console.log(`[Agent] ${agentConfig.displayName} completed in ${duration}ms (${tokensUsed} tokens)`);

  return {
    agentName: agentConfig.name,
    output,
    rawResponse,
    tokensUsed,
    promptTokens,
    duration,
    mode,
    model,
  };
}

function parseJsonResponse(raw: string): any | null {
  try {
    const jsonStr = extractJson(raw);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}
