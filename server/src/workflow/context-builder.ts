import type { PromptContext } from '../agents/types.js';
import type { BookProject, SceneCardOutput } from '../types/project.js';

/**
 * Builds a PromptContext from the current BookProject state.
 * This is passed to every agent's buildSystemPrompt and buildUserPrompt functions.
 */
export function buildPromptContext(
  project: BookProject,
  overrides?: Partial<PromptContext>
): PromptContext {
  const { request, derived, foundation, structure } = project;
  const settings = request.settings;

  return {
    // From request
    title: settings.simple
      ? (settings.description?.split(' ').slice(0, 5).join(' ') || 'Untitled')
      : (settings.plotOutline?.split('\n')[0] || settings.description || 'Untitled'),
    genres: getGenres(settings),
    description: settings.description || '',
    plotOutline: settings.plotOutline || '',
    characterDetails: settings.characterDetails || '',
    settingDetails: settings.setting || '',
    themes: settings.themes || '',
    avoidList: derived.avoidList,
    specialRequests: settings.specialRequests || '',
    inspirations: formatInspirations(settings.selectedInspirations),
    contentRating: derived.contentRating,
    audienceStyle: derived.audienceStyle,
    perspective: settings.perspective || 'third-person',
    happyEnding: settings.happyEnding ?? true,
    bigTwist: settings.bigTwist ?? false,
    romanticSubplot: settings.romanticSubplot ?? false,
    targetWordCount: derived.targetWordCount,

    // From previous agents
    premise: foundation.premise ? JSON.stringify(foundation.premise) : undefined,
    genreProfile: foundation.genreProfile ? JSON.stringify(foundation.genreProfile) : undefined,
    worldBible: foundation.worldBible ? JSON.stringify(foundation.worldBible) : undefined,
    characters: foundation.characters ? JSON.stringify(foundation.characters) : undefined,
    relationships: foundation.relationships ? JSON.stringify(foundation.relationships) : undefined,
    plotSkeleton: foundation.plotSkeleton ? JSON.stringify(foundation.plotSkeleton) : undefined,
    themeMap: structure.themeMap ? JSON.stringify(structure.themeMap) : undefined,
    chapterPlans: structure.chapterPlans ? JSON.stringify(structure.chapterPlans) : undefined,
    continuityLog: structure.continuityLog ? JSON.stringify(structure.continuityLog) : undefined,
    setupLog: structure.setupLog ? JSON.stringify(structure.setupLog) : undefined,

    // Series context (populated by Series Orchestrator when series mode is active)
    seriesBible: project.meta?.seriesContext
      ? JSON.stringify(project.meta.seriesContext)
      : undefined,

    // Quality analysis notes (available during revision phase)
    voiceNotes: project.revision?.voiceNotes
      ? JSON.stringify(project.revision.voiceNotes) : undefined,
    pacingNotes: project.revision?.pacingNotes
      ? JSON.stringify(project.revision.pacingNotes) : undefined,
    clicheNotes: project.revision?.clicheNotes
      ? JSON.stringify(project.revision.clicheNotes) : undefined,
    setupPayoffNotes: project.revision?.setupPayoffNotes
      ? JSON.stringify(project.revision.setupPayoffNotes) : undefined,

    // Overrides for scene-level context
    ...overrides,
  };
}

/**
 * Builds scene-specific context for writing agents.
 */
export function buildSceneContext(
  project: BookProject,
  scene: SceneCardOutput,
  previousSceneEnding?: string
): PromptContext {
  // Get character details for characters in this scene
  const sceneCharacters = project.foundation.characters?.filter(
    c => scene.characters.includes(c.name)
  );

  return buildPromptContext(project, {
    currentChapter: scene.chapterNumber,
    currentScene: JSON.stringify(scene),
    previousSceneEnding,
    characters: sceneCharacters ? JSON.stringify(sceneCharacters) : undefined,
  });
}

/**
 * Builds scene context with summaries of previously drafted chapters.
 * This gives the prose writer awareness of what happened earlier in the book.
 */
export function buildSceneContextWithHistory(
  project: BookProject,
  scene: SceneCardOutput,
  previousSceneEnding?: string
): PromptContext {
  const summaries: string[] = [];
  for (const [num, content] of project.drafts.chapters) {
    if (num < scene.chapterNumber) {
      const words = content.split(/\s+/);
      const excerpt = words.slice(0, 60).join(' ') + '...';
      const names = extractCharacterNames(content, project.foundation.characters);
      summaries.push(`Chapter ${num}: ${excerpt}\n  Characters featured: ${names.join(', ')}`);
    }
  }
  const previousChapterSummaries = summaries.length > 0 ? summaries.join('\n\n') : undefined;

  const sceneCharacters = project.foundation.characters?.filter(
    c => scene.characters.includes(c.name)
  );

  return buildPromptContext(project, {
    currentChapter: scene.chapterNumber,
    currentScene: JSON.stringify(scene),
    previousSceneEnding,
    previousChapterSummaries,
    characters: sceneCharacters ? JSON.stringify(sceneCharacters) : undefined,
  });
}

function extractCharacterNames(text: string, characters?: any[]): string[] {
  if (!characters) return [];
  return characters.filter(c => text.includes(c.name)).map(c => c.name);
}

/**
 * Builds chapter-level context for revision agents.
 */
export function buildChapterContext(
  project: BookProject,
  chapterNumber: number,
  extraOverrides?: Partial<PromptContext>
): PromptContext {
  const chapterContent = project.drafts.chapters.get(chapterNumber);
  return buildPromptContext(project, {
    currentChapter: chapterNumber,
    chapterContent,
    ...extraOverrides,
  });
}

/**
 * Builds full manuscript context for whole-book revision agents.
 */
export function buildManuscriptContext(project: BookProject): PromptContext {
  const allChapters: string[] = [];
  for (const [num, content] of project.drafts.chapters) {
    allChapters.push(`--- Chapter ${num} ---\n${content}`);
  }

  return buildPromptContext(project, {
    fullManuscript: allChapters.join('\n\n'),
  });
}

function getGenres(settings: any): string[] {
  // Try to extract genres from format or other fields
  if (settings.format?.format) {
    return [settings.format.format];
  }
  return ['General Fiction'];
}

function formatInspirations(inspirations?: any[]): string {
  if (!inspirations || inspirations.length === 0) return '';
  return inspirations.map((i: any) => {
    const parts = [i.name];
    if (i.description) parts.push(i.description);
    if (i.hook) parts.push(`Hook: ${i.hook}`);
    return parts.join(' - ');
  }).join('; ');
}
