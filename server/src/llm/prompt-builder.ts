import type { ChatMessage } from './ollama-client.js';
import type { AgentConfig, PromptContext } from '../agents/types.js';
import type { AgentMode } from '../types/project.js';

/**
 * Builds the messages array for an LLM call from an AgentConfig and runtime context.
 */
export function buildMessages(
  agentConfig: AgentConfig,
  context: PromptContext,
  mode: AgentMode
): ChatMessage[] {
  const systemPrompt = agentConfig.buildSystemPrompt(context);
  const userPrompt = agentConfig.buildUserPrompt(context, mode);

  return [
    { role: 'system', content: systemPrompt.trim() },
    { role: 'user', content: userPrompt.trim() },
  ];
}

/**
 * Builds a correction prompt when the LLM returns invalid JSON.
 */
export function buildCorrectionMessage(
  rawResponse: string,
  error: string
): ChatMessage {
  return {
    role: 'user',
    content:
      `Your previous response was not valid JSON. Error: ${error}\n\n` +
      `Your response was:\n${rawResponse.substring(0, 500)}\n\n` +
      `Please respond with ONLY valid JSON, no markdown code fences or extra text.`,
  };
}

/**
 * Attempts to extract JSON from a response that may contain markdown code fences or other wrapping.
 */
export function extractJson(raw: string): string {
  // Try to find JSON in markdown code fences
  const fenceMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (fenceMatch) return fenceMatch[1].trim();

  // Try to find a JSON object or array
  const jsonMatch = raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) return jsonMatch[1].trim();

  // Return as-is
  return raw.trim();
}
