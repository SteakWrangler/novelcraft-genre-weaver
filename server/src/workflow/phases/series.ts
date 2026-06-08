import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { buildPromptContext } from '../context-builder.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject } from '../../types/project.js';

/**
 * Series Orchestration (conditional)
 * Runs after Foundation + Structure, before Drafting.
 * Creates or updates the Series Bible so writing agents have series context.
 */
export async function executeSeriesOrchestration(jobId: string, project: BookProject): Promise<void> {
  checkCancelled(jobId);

  try {
    const seriesAgent = getAgent('series-orchestrator');
    const context = buildPromptContext(project);
    const result = await runAgent(seriesAgent, context, 'generate');

    project.meta.seriesContext = result.output;
    project.meta.agentsRun.push('series-orchestrator');
    project.meta.tokensUsed += result.tokensUsed + result.promptTokens;

    console.log('[Series] Series bible created');
  } catch (error: any) {
    console.warn('[Series] Series orchestrator failed:', error.message);
    project.meta.errors.push(`Series orchestrator failed: ${error.message}`);
  }
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
