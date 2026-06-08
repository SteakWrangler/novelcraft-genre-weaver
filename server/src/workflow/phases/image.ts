import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { buildPromptContext } from '../context-builder.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject } from '../../types/project.js';

/**
 * Phase 5: Image Generation
 * Runs: Cover Prompt Generator → (future: cloud image API call)
 *
 * For now, generates the cover prompt. Actual image generation via cloud API
 * will be added in P2.
 */
export async function executeImage(jobId: string, project: BookProject): Promise<void> {
  jobManager.updateProgress(jobId, 'image', 'Generating cover art prompt...', 91);
  checkCancelled(jobId);

  try {
    const coverAgent = getAgent('cover-prompt-generator');
    const context = buildPromptContext(project);
    const result = await runAgent(coverAgent, context, 'generate');

    const coverPrompt = typeof result.output === 'string'
      ? result.output
      : result.rawResponse;

    project.output.coverPrompt = coverPrompt;
    project.meta.tokensUsed += result.tokensUsed + result.promptTokens;
    project.meta.agentsRun.push('cover-prompt-generator');

    // TODO (P2): Call cloud image API (DALL-E or Stability AI) with coverPrompt
    // project.output.coverImageUrl = await generateCoverImage(coverPrompt);

    console.log('[Image] Cover prompt generated');
  } catch (error: any) {
    console.warn('[Image] Cover prompt generation failed:', error.message);
    project.meta.errors.push(`Cover prompt generation failed: ${error.message}`);
  }
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
