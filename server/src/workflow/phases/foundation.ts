import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { resolveAgentMode } from '../mode-resolver.js';
import { buildPromptContext } from '../context-builder.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject } from '../../types/project.js';

/**
 * Phase 1: Foundation
 * Runs: Premise Architect → Genre Analyst → [World Builder || Character Architect] →
 *        Relationship Mapper → Plot Architect
 */
export async function executeFoundation(jobId: string, project: BookProject): Promise<void> {
  const settings = project.request.settings;

  // 1.1 Premise Architect
  jobManager.updateProgress(jobId, 'foundation', 'Developing premise...', 2);
  checkCancelled(jobId);

  const premiseAgent = getAgent('premise-architect');
  const premiseMode = resolveAgentMode(premiseAgent, settings);
  const premiseResult = await runAgent(premiseAgent, buildPromptContext(project), premiseMode);
  project.foundation.premise = premiseResult.output;
  project.meta.agentsRun.push('premise-architect');
  project.meta.tokensUsed += premiseResult.tokensUsed + premiseResult.promptTokens;

  // 1.2 Genre Analyst
  jobManager.updateProgress(jobId, 'foundation', 'Analyzing genre conventions...', 5);
  checkCancelled(jobId);

  const genreAgent = getAgent('genre-analyst');
  const genreResult = await runAgent(genreAgent, buildPromptContext(project), 'generate');
  project.foundation.genreProfile = genreResult.output;
  project.meta.agentsRun.push('genre-analyst');
  project.meta.tokensUsed += genreResult.tokensUsed + genreResult.promptTokens;

  // 1.3 + 1.4 World Builder and Character Architect (parallel)
  jobManager.updateProgress(jobId, 'foundation', 'Building world and characters...', 8);
  checkCancelled(jobId);

  const worldAgent = getAgent('world-builder');
  const worldMode = resolveAgentMode(worldAgent, settings);
  const charAgent = getAgent('character-architect');
  const charMode = resolveAgentMode(charAgent, settings);

  const [worldResult, charResult] = await Promise.all([
    runAgent(worldAgent, buildPromptContext(project), worldMode),
    runAgent(charAgent, buildPromptContext(project), charMode),
  ]);

  project.foundation.worldBible = worldResult.output;
  project.foundation.characters = charResult.output;
  project.meta.agentsRun.push('world-builder', 'character-architect');
  project.meta.tokensUsed += worldResult.tokensUsed + worldResult.promptTokens
    + charResult.tokensUsed + charResult.promptTokens;

  // 1.5 Relationship Mapper
  jobManager.updateProgress(jobId, 'foundation', 'Mapping character relationships...', 13);
  checkCancelled(jobId);

  const relAgent = getAgent('relationship-mapper');
  const relResult = await runAgent(relAgent, buildPromptContext(project), 'generate');
  project.foundation.relationships = relResult.output;
  project.meta.agentsRun.push('relationship-mapper');
  project.meta.tokensUsed += relResult.tokensUsed + relResult.promptTokens;

  // 1.6 Plot Architect
  jobManager.updateProgress(jobId, 'foundation', 'Architecting plot structure...', 16);
  checkCancelled(jobId);

  const plotAgent = getAgent('plot-architect');
  const plotMode = resolveAgentMode(plotAgent, settings);
  const plotResult = await runAgent(plotAgent, buildPromptContext(project), plotMode);
  project.foundation.plotSkeleton = plotResult.output;
  project.meta.agentsRun.push('plot-architect');
  project.meta.tokensUsed += plotResult.tokensUsed + plotResult.promptTokens;

  console.log('[Foundation] Phase complete');
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
