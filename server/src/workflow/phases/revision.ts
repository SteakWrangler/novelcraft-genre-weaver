import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { buildChapterContext, buildManuscriptContext } from '../context-builder.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject, BetaReaderReport } from '../../types/project.js';

/**
 * Phase 4: Revision
 * 1. Continuity check + quality analysis (parallel on full manuscript):
 *    Continuity Keeper, Voice Diversifier, Pacing Analyst,
 *    Cliché Hunter, Setup-Payoff Verifier
 * 2. Line Editor (per chapter) — receives quality + continuity notes in context
 * 3. Beta Reader Simulator (full manuscript) — final evaluation
 * 4. Targeted re-editing of chapters flagged by beta reader
 */
export async function executeRevision(jobId: string, project: BookProject): Promise<void> {
  const chapterNumbers = Array.from(project.drafts.chapters.keys()).sort((a, b) => a - b);

  if (chapterNumbers.length === 0) {
    console.log('[Revision] No chapters to revise, skipping');
    return;
  }

  // Step 1: Quality analysis pass (parallel on full manuscript)
  jobManager.updateProgress(jobId, 'revision', 'Running quality analysis...', 76);
  checkCancelled(jobId);

  await runQualityAnalysis(jobId, project);

  // Step 2: Line editing pass (per chapter, with quality notes in context)
  for (let i = 0; i < chapterNumbers.length; i++) {
    const chapterNum = chapterNumbers[i];
    const progress = 80 + Math.floor((i / chapterNumbers.length) * 6); // 80-86%

    jobManager.updateProgress(
      jobId, 'revision',
      `Editing Chapter ${chapterNum}...`,
      progress
    );
    checkCancelled(jobId);

    try {
      const lineEditorAgent = getAgent('line-editor');
      const context = buildChapterContext(project, chapterNum);
      const result = await runAgent(lineEditorAgent, context, 'generate');

      const editedText = typeof result.output === 'string'
        ? result.output
        : result.rawResponse;

      // Only accept if the edited version is substantial
      const original = project.drafts.chapters.get(chapterNum) || '';
      if (editedText && editedText.length > original.length * 0.5) {
        project.drafts.chapters.set(chapterNum, editedText);
      }

      project.meta.tokensUsed += result.tokensUsed + result.promptTokens;
      project.meta.agentsRun.push('line-editor');
    } catch (error: any) {
      console.warn(`[Revision] Line editor failed for chapter ${chapterNum}:`, error.message);
      project.meta.errors.push(`Line editor failed for chapter ${chapterNum}: ${error.message}`);
    }
  }

  // Step 3: Beta Reader Simulator (full manuscript)
  jobManager.updateProgress(jobId, 'revision', 'Beta reader reviewing manuscript...', 87);
  checkCancelled(jobId);

  try {
    const betaAgent = getAgent('beta-reader-simulator');
    const manuscriptContext = buildManuscriptContext(project);
    const betaResult = await runAgent(betaAgent, manuscriptContext, 'generate');

    project.revision.betaReaderReport = betaResult.output;
    project.meta.tokensUsed += betaResult.tokensUsed + betaResult.promptTokens;
    project.meta.agentsRun.push('beta-reader-simulator');
  } catch (error: any) {
    console.warn('[Revision] Beta reader failed:', error.message);
    project.meta.errors.push(`Beta reader failed: ${error.message}`);
  }

  // Step 4: Targeted re-editing based on beta reader feedback
  const report = project.revision.betaReaderReport;
  if (report && typeof report === 'object') {
    const flaggedChapters = collectFlaggedChapters(report, chapterNumbers);

    if (flaggedChapters.size > 0) {
      console.log(`[Revision] Beta reader flagged ${flaggedChapters.size} chapter(s) for re-editing`);

      let reEditIndex = 0;
      for (const [chapterNum, feedback] of flaggedChapters) {
        const progress = 89 + Math.floor((reEditIndex / flaggedChapters.size) * 4); // 89-93%
        jobManager.updateProgress(
          jobId, 'revision',
          `Re-editing Chapter ${chapterNum} (beta feedback)...`,
          progress
        );
        checkCancelled(jobId);

        try {
          const lineEditorAgent = getAgent('line-editor');
          const context = buildChapterContext(project, chapterNum, {
            betaReaderFeedback: feedback,
          });
          const result = await runAgent(lineEditorAgent, context, 'generate');

          const editedText = typeof result.output === 'string'
            ? result.output
            : result.rawResponse;

          const original = project.drafts.chapters.get(chapterNum) || '';
          if (editedText && editedText.length > original.length * 0.5) {
            project.drafts.chapters.set(chapterNum, editedText);
          }

          project.meta.tokensUsed += result.tokensUsed + result.promptTokens;
          project.meta.agentsRun.push('line-editor-beta-pass');
        } catch (error: any) {
          console.warn(`[Revision] Beta-driven re-edit failed for chapter ${chapterNum}:`, error.message);
          project.meta.errors.push(`Beta-driven re-edit failed for chapter ${chapterNum}: ${error.message}`);
        }

        reEditIndex++;
      }
    }
  }

  console.log('[Revision] Phase complete');
}

/**
 * Run quality analysis agents in parallel on the full manuscript.
 * Results are stored in project.revision and passed to the Line Editor via context.
 */
async function runQualityAnalysis(jobId: string, project: BookProject): Promise<void> {
  const manuscriptContext = buildManuscriptContext(project);

  // Quality analysis agents (stored in project.revision)
  const qualityAgents = [
    { name: 'voice-diversifier', storeKey: 'voiceNotes' as const },
    { name: 'pacing-analyst', storeKey: 'pacingNotes' as const },
    { name: 'cliche-hunter', storeKey: 'clicheNotes' as const },
    { name: 'setup-payoff-verifier', storeKey: 'setupPayoffNotes' as const },
  ];

  const qualityPromises = qualityAgents.map(async ({ name, storeKey }) => {
    try {
      const agent = getAgent(name);
      const result = await runAgent(agent, manuscriptContext, 'generate');

      project.revision[storeKey] = result.output;
      project.meta.tokensUsed += result.tokensUsed + result.promptTokens;
      project.meta.agentsRun.push(name);

      console.log(`[Revision] ${name} complete`);
    } catch (error: any) {
      console.warn(`[Revision] ${name} failed:`, error.message);
      project.meta.errors.push(`${name} failed: ${error.message}`);
    }
  });

  // Post-drafting continuity check (updates the continuity log with manuscript facts)
  const continuityPromise = (async () => {
    try {
      const agent = getAgent('continuity-keeper');
      const result = await runAgent(agent, manuscriptContext, 'generate');

      // Update the continuity log with findings from actual prose
      project.structure.continuityLog = result.output;
      project.meta.tokensUsed += result.tokensUsed + result.promptTokens;
      project.meta.agentsRun.push('continuity-keeper');

      console.log('[Revision] Post-drafting continuity check complete');
    } catch (error: any) {
      console.warn('[Revision] Post-drafting continuity check failed:', error.message);
      project.meta.errors.push(`Post-drafting continuity check failed: ${error.message}`);
    }
  })();

  await Promise.all([...qualityPromises, continuityPromise]);
}

/**
 * Collects chapters flagged by the beta reader with their specific feedback.
 * Returns a Map of chapterNumber → combined feedback string.
 */
function collectFlaggedChapters(
  report: BetaReaderReport,
  validChapters: number[]
): Map<number, string> {
  const feedback = new Map<number, string[]>();

  for (const point of report.confusionPoints || []) {
    if (validChapters.includes(point.chapter)) {
      if (!feedback.has(point.chapter)) feedback.set(point.chapter, []);
      feedback.get(point.chapter)!.push(`CONFUSION: ${point.description}`);
    }
  }

  for (const part of report.boringParts || []) {
    if (validChapters.includes(part.chapter)) {
      if (!feedback.has(part.chapter)) feedback.set(part.chapter, []);
      feedback.get(part.chapter)!.push(`PACING/ENGAGEMENT: ${part.description}`);
    }
  }

  const result = new Map<number, string>();
  for (const [chapter, notes] of feedback) {
    result.set(chapter, notes.join('\n'));
  }
  return result;
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
