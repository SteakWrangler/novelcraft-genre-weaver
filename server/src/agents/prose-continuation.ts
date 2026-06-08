import { getOllamaClient } from '../llm/ollama-client.js';
import { resolveModel, getAgentOptions } from '../llm/model-router.js';
import { buildMessages } from '../llm/prompt-builder.js';
import type { AgentConfig, PromptContext } from './types.js';

const MIN_HIT_RATIO = 0.75; // Continue if below 75% of target
const MAX_CONTINUATIONS = 2; // At most 2 continuation rounds

interface ContinuationResult {
  text: string;
  tokensUsed: number;
  rounds: number;
}

/**
 * If the prose writer's output is significantly shorter than the word target,
 * send follow-up messages asking the model to continue writing from where
 * it left off. Returns null if no continuation was needed.
 */
export async function continueProseGeneration(
  agentConfig: AgentConfig,
  context: PromptContext,
  initialText: string,
  wordTarget: number
): Promise<ContinuationResult | null> {
  let currentText = initialText;
  let wordCount = countWords(currentText);
  let totalExtraTokens = 0;
  let rounds = 0;

  if (wordCount >= wordTarget * MIN_HIT_RATIO) {
    return null; // Already close enough
  }

  const client = getOllamaClient();
  const model = resolveModel(agentConfig.model.role, agentConfig.model.fallback);
  const options = getAgentOptions(agentConfig.name);
  const baseMessages = buildMessages(agentConfig, context, 'generate');

  while (rounds < MAX_CONTINUATIONS && wordCount < wordTarget * MIN_HIT_RATIO) {
    rounds++;
    const remaining = wordTarget - wordCount;

    console.log(
      `[Continuation] Round ${rounds}: ${wordCount}/${wordTarget} words (${Math.round(wordCount / wordTarget * 100)}%), ` +
      `requesting ~${remaining} more words`
    );

    const continuationMessages = [
      ...baseMessages,
      { role: 'assistant' as const, content: currentText },
      {
        role: 'user' as const,
        content: `You've written ${wordCount.toLocaleString()} words so far, but the target is ${wordTarget.toLocaleString()} words. You need approximately ${remaining.toLocaleString()} more words to reach the target.

Continue writing the scene from EXACTLY where you left off. Do not repeat any text you've already written. Do not add a conclusion or wrap up prematurely — keep developing the scene with the same quality, adding:
- More dialogue exchanges and character interaction
- Sensory details and environmental description
- Character interiority and emotional reactions
- Physical action and staging

Pick up seamlessly from your last paragraph and keep going.`
      },
    ];

    const response = await client.chat({ model, messages: continuationMessages, options });
    const continuation = response.message.content;
    totalExtraTokens += (response.eval_count || 0) + (response.prompt_eval_count || 0);

    if (!continuation || countWords(continuation) < 50) {
      console.log(`[Continuation] Round ${rounds}: got insufficient continuation (${countWords(continuation)} words), stopping`);
      break;
    }

    currentText = currentText + '\n\n' + continuation;
    wordCount = countWords(currentText);

    console.log(`[Continuation] Round ${rounds} complete: now at ${wordCount}/${wordTarget} words (${Math.round(wordCount / wordTarget * 100)}%)`);
  }

  if (rounds === 0) return null;

  return {
    text: currentText,
    tokensUsed: totalExtraTokens,
    rounds,
  };
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}
