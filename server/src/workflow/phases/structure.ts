import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { resolveAgentMode } from '../mode-resolver.js';
import { buildPromptContext } from '../context-builder.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject } from '../../types/project.js';

/**
 * Phase 2: Structure
 * Runs: Theme Weaver → Chapter Planner → Scene Outliner → Setup-Payoff Tracker
 *       → Continuity Keeper (initialize)
 */
export async function executeStructure(jobId: string, project: BookProject): Promise<void> {
  const settings = project.request.settings;

  // 2.1 Theme Weaver
  jobManager.updateProgress(jobId, 'structure', 'Mapping themes throughout story...', 20);
  checkCancelled(jobId);

  const themeAgent = getAgent('theme-weaver');
  const themeMode = resolveAgentMode(themeAgent, settings);
  const themeResult = await runAgent(themeAgent, buildPromptContext(project), themeMode);
  project.structure.themeMap = themeResult.output;
  project.meta.agentsRun.push('theme-weaver');
  project.meta.tokensUsed += themeResult.tokensUsed + themeResult.promptTokens;

  // 2.2 Chapter Planner
  jobManager.updateProgress(jobId, 'structure', 'Planning chapters...', 24);
  checkCancelled(jobId);

  const chapterAgent = getAgent('chapter-planner');
  const chapterResult = await runAgent(chapterAgent, buildPromptContext(project), 'generate');
  project.structure.chapterPlans = chapterResult.output;
  project.meta.agentsRun.push('chapter-planner');
  project.meta.tokensUsed += chapterResult.tokensUsed + chapterResult.promptTokens;

  // 2.3 Scene Outliner
  jobManager.updateProgress(jobId, 'structure', 'Outlining scenes...', 28);
  checkCancelled(jobId);

  const sceneAgent = getAgent('scene-outliner');
  const sceneResult = await runAgent(sceneAgent, buildPromptContext(project), 'generate');
  project.structure.sceneCards = sceneResult.output;
  project.meta.agentsRun.push('scene-outliner');
  project.meta.tokensUsed += sceneResult.tokensUsed + sceneResult.promptTokens;

  // 2.4 Setup-Payoff Tracker (initialize)
  jobManager.updateProgress(jobId, 'structure', 'Tracking setups and payoffs...', 32);
  checkCancelled(jobId);

  const setupAgent = getAgent('setup-payoff-tracker');
  const setupResult = await runAgent(setupAgent, buildPromptContext(project), 'generate');
  project.structure.setupLog = setupResult.output;
  project.meta.agentsRun.push('setup-payoff-tracker');
  project.meta.tokensUsed += setupResult.tokensUsed + setupResult.promptTokens;

  // 2.5 Continuity Keeper (initialize)
  jobManager.updateProgress(jobId, 'structure', 'Initializing continuity tracking...', 34);
  checkCancelled(jobId);

  const continuityAgent = getAgent('continuity-keeper');
  const continuityResult = await runAgent(continuityAgent, buildPromptContext(project), 'generate');
  project.structure.continuityLog = continuityResult.output;
  project.meta.agentsRun.push('continuity-keeper');
  project.meta.tokensUsed += continuityResult.tokensUsed + continuityResult.promptTokens;

  console.log('[Structure] Phase complete');
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
