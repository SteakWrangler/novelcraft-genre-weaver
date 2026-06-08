import { runAgent } from '../../agents/runner.js';
import { getAgent } from '../../agents/registry.js';
import { buildSceneContext, buildSceneContextWithHistory } from '../context-builder.js';
import { continueProseGeneration } from '../../agents/prose-continuation.js';
import { jobManager } from '../../jobs/manager.js';
import type { BookProject, SceneCardOutput } from '../../types/project.js';

/**
 * Phase 3: Drafting
 * For each chapter, for each scene:
 *   Prose Writer → Specialist Pass (adaptive) → Atmosphere Writer
 *
 * Chapters 1-3 are sequential (establish voice/tone).
 * After that, chapters could be parallelized (future P1 enhancement).
 */
export async function executeDrafting(jobId: string, project: BookProject): Promise<void> {
  const chapterPlans = project.structure.chapterPlans;
  if (!chapterPlans || chapterPlans.length === 0) {
    throw new Error('No chapter plans available for drafting');
  }

  const sceneCards = project.structure.sceneCards;
  const totalChapters = chapterPlans.length;

  for (let i = 0; i < totalChapters; i++) {
    const chapter = chapterPlans[i];
    const chapterNum = chapter.chapterNumber || i + 1;
    const progress = 35 + Math.floor((i / totalChapters) * 40); // 35-75%

    jobManager.updateProgress(
      jobId, 'drafting',
      `Writing Chapter ${chapterNum}: ${chapter.title}...`,
      progress
    );
    checkCancelled(jobId);

    // Get scenes for this chapter
    const scenes = getChapterScenes(sceneCards, i);
    let chapterText = '';
    let previousSceneEnding = '';

    console.log(`[Drafting] Chapter ${chapterNum}: ${scenes.length} scenes, word targets: [${scenes.map(s => s.wordTarget).join(', ')}]`);

    for (let j = 0; j < scenes.length; j++) {
      const scene = scenes[j];

      // Step 1: Prose Writer (always runs) + continuation if short
      const proseAgent = getAgent('prose-writer');
      const context = buildSceneContextWithHistory(project, scene, previousSceneEnding);
      const proseResult = await runAgent(proseAgent, context, 'generate');
      let sceneText = typeof proseResult.output === 'string'
        ? proseResult.output
        : proseResult.rawResponse;
      project.meta.tokensUsed += proseResult.tokensUsed + proseResult.promptTokens;

      // Continue generation if output is significantly short of target
      const wordTarget = scene.wordTarget || 2000;
      const continuationResult = await continueProseGeneration(
        proseAgent, context, sceneText, wordTarget
      );
      if (continuationResult) {
        sceneText = continuationResult.text;
        project.meta.tokensUsed += continuationResult.tokensUsed;
      }

      // Step 2: Specialist Pass (adaptive based on scene type)
      const specialistAgent = selectSpecialist(scene);
      if (specialistAgent) {
        const specialistContext = buildSceneContext(project, scene, previousSceneEnding);
        specialistContext.chapterContent = sceneText;
        const specialistResult = await runAgent(
          specialistAgent,
          specialistContext,
          'generate'
        );
        const enhanced = typeof specialistResult.output === 'string'
          ? specialistResult.output
          : specialistResult.rawResponse;
        // Only use the specialist output if it's substantial
        if (enhanced && enhanced.length > sceneText.length * 0.5) {
          sceneText = enhanced;
        }
        project.meta.tokensUsed += specialistResult.tokensUsed + specialistResult.promptTokens;
        project.meta.agentsRun.push(specialistAgent.name);
      }

      // Step 3: Atmosphere Writer (always runs)
      const atmosphereAgent = getAgent('atmosphere-writer');
      const atmosContext = buildSceneContext(project, scene, previousSceneEnding);
      atmosContext.chapterContent = sceneText;
      const atmosResult = await runAgent(atmosphereAgent, atmosContext, 'generate');
      const atmosEnhanced = typeof atmosResult.output === 'string'
        ? atmosResult.output
        : atmosResult.rawResponse;
      if (atmosEnhanced && atmosEnhanced.length > sceneText.length * 0.5) {
        sceneText = atmosEnhanced;
      }
      project.meta.tokensUsed += atmosResult.tokensUsed + atmosResult.promptTokens;

      // Store scene and update context
      const sceneId = scene.id || `ch${chapterNum}-s${j + 1}`;
      const sceneWords = sceneText.split(/\s+/).length;
      console.log(`[Drafting] Scene ${sceneId}: target=${scene.wordTarget}, actual=${sceneWords} words (${Math.round(sceneWords / (scene.wordTarget || 1) * 100)}%)`);
      project.drafts.scenes.set(sceneId, sceneText);
      previousSceneEnding = sceneText.slice(-500);
      chapterText += (chapterText ? '\n\n' : '') + sceneText;
    }

    // Store assembled chapter
    project.drafts.chapters.set(chapterNum, chapterText);
    project.meta.agentsRun.push('prose-writer', 'atmosphere-writer');

    console.log(`[Drafting] Chapter ${chapterNum} complete (${chapterText.length} chars)`);
  }

  console.log('[Drafting] Phase complete');
}

/**
 * Select the appropriate specialist writing agent based on scene type.
 */
function selectSpecialist(scene: SceneCardOutput) {
  if (!scene.sceneType || scene.sceneType.length === 0) return null;

  // Priority: action > emotional > dialogue
  if (scene.sceneType.includes('action')) {
    try { return getAgent('action-writer'); } catch { return null; }
  }
  if (scene.sceneType.includes('emotional')) {
    try { return getAgent('emotion-writer'); } catch { return null; }
  }
  if (scene.sceneType.includes('dialogue')) {
    try { return getAgent('dialogue-writer'); } catch { return null; }
  }

  return null;
}

/**
 * Get scenes for a chapter, handling various sceneCards formats.
 */
function getChapterScenes(sceneCards: any, chapterIndex: number): SceneCardOutput[] {
  if (!sceneCards) return [createDefaultScene(chapterIndex + 1)];

  // If it's an array of arrays (per-chapter)
  if (Array.isArray(sceneCards) && Array.isArray(sceneCards[chapterIndex])) {
    return sceneCards[chapterIndex];
  }

  // If it's a flat array, filter by chapter number
  if (Array.isArray(sceneCards)) {
    const forChapter = sceneCards.filter(
      (s: any) => s.chapterNumber === chapterIndex + 1
    );
    if (forChapter.length > 0) return forChapter;
  }

  // Fallback: create a single default scene
  return [createDefaultScene(chapterIndex + 1)];
}

function createDefaultScene(chapterNumber: number): SceneCardOutput {
  return {
    id: `ch${chapterNumber}-s1`,
    chapterNumber,
    position: 1,
    location: 'To be determined',
    characters: [],
    purpose: 'Advance the story',
    beats: [],
    conflict: 'Chapter conflict',
    emotionalNote: 'Standard',
    entryHook: '',
    exitHook: '',
    sceneType: ['exposition'],
    wordTarget: 3000,
    setups: [],
    payoffs: [],
  };
}

function checkCancelled(jobId: string): void {
  if (jobManager.isCancelled(jobId)) {
    throw new Error('Job cancelled by user');
  }
}
