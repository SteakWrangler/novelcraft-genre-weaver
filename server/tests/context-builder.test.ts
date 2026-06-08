import { describe, it, expect } from 'vitest';
import {
  buildPromptContext,
  buildSceneContext,
  buildChapterContext,
  buildManuscriptContext,
} from '../src/workflow/context-builder.js';
import { createBookProject } from '../src/types/project.js';
import type { BookProject, SceneCardOutput } from '../src/types/project.js';
import type { BookRequest } from '../src/types/shared.js';

function makeRequest(overrides: Partial<BookRequest['settings']> = {}): BookRequest {
  return {
    settings: {
      description: 'A wizard school story',
      rating: 'PG-13',
      perspective: 'third-person',
      themes: 'friendship, sacrifice',
      targetWordCount: 80000,
      ...overrides,
    },
  };
}

function makeProject(requestOverrides: Partial<BookRequest['settings']> = {}): BookProject {
  return createBookProject(makeRequest(requestOverrides));
}

// --- buildPromptContext ---

describe('buildPromptContext', () => {
  it('maps request fields to context', () => {
    const project = makeProject({ description: 'A dragon tale' });
    const ctx = buildPromptContext(project);

    expect(ctx.description).toBe('A dragon tale');
    expect(ctx.contentRating).toBe('PG-13');
    expect(ctx.perspective).toBe('third-person');
    expect(ctx.themes).toBe('friendship, sacrifice');
    expect(ctx.targetWordCount).toBe(80000);
  });

  it('derives title from description when simple mode is true', () => {
    const project = makeProject({ simple: true, description: 'The Great Dragon Adventure Story Beyond' });
    const ctx = buildPromptContext(project);
    // simple mode takes first 5 words of description
    expect(ctx.title).toBe('The Great Dragon Adventure Story');
  });

  it('derives title from plotOutline first line when not simple', () => {
    const project = makeProject({ plotOutline: 'Chapter One Outline\nMore details...' });
    const ctx = buildPromptContext(project);
    expect(ctx.title).toBe('Chapter One Outline');
  });

  it('falls back to description for title when plotOutline is empty', () => {
    const project = makeProject({ description: 'An epic saga' });
    const ctx = buildPromptContext(project);
    expect(ctx.title).toBe('An epic saga');
  });

  it('defaults to "Untitled" when no description or plotOutline', () => {
    const project = makeProject({ description: undefined });
    const ctx = buildPromptContext(project);
    expect(ctx.title).toBe('Untitled');
  });

  it('defaults genres to ["General Fiction"] when no format', () => {
    const project = makeProject();
    const ctx = buildPromptContext(project);
    expect(ctx.genres).toEqual(['General Fiction']);
  });

  it('uses format as genre when available', () => {
    const project = makeProject({ format: { format: 'poetry', audience: 'adult' } });
    const ctx = buildPromptContext(project);
    expect(ctx.genres).toEqual(['poetry']);
  });

  it('includes avoid list from derived state', () => {
    const project = makeProject({ avoidContent: 'violence' });
    expect(project.derived.avoidList).toContain('violence');
    const ctx = buildPromptContext(project);
    expect(ctx.avoidList).toContain('violence');
  });

  it('defaults boolean preferences correctly', () => {
    const project = makeProject();
    const ctx = buildPromptContext(project);
    expect(ctx.happyEnding).toBe(true);
    expect(ctx.bigTwist).toBe(false);
    expect(ctx.romanticSubplot).toBe(false);
  });

  it('respects user boolean overrides', () => {
    const project = makeProject({
      happyEnding: false,
      bigTwist: true,
      romanticSubplot: true,
    });
    const ctx = buildPromptContext(project);
    expect(ctx.happyEnding).toBe(false);
    expect(ctx.bigTwist).toBe(true);
    expect(ctx.romanticSubplot).toBe(true);
  });

  it('JSON-stringifies foundation outputs when present', () => {
    const project = makeProject();
    project.foundation.premise = {
      hook: 'A mysterious letter arrives',
      centralConflict: 'Hero vs dark lord',
      stakes: 'The world will end',
      themeSeeds: ['power', 'sacrifice'],
      tone: 'Epic and foreboding',
      logline: 'A reluctant hero must save the world.',
    };

    const ctx = buildPromptContext(project);
    expect(ctx.premise).toBeDefined();
    const parsed = JSON.parse(ctx.premise!);
    expect(parsed.hook).toBe('A mysterious letter arrives');
    expect(parsed.themeSeeds).toEqual(['power', 'sacrifice']);
  });

  it('leaves foundation fields undefined when not populated', () => {
    const project = makeProject();
    const ctx = buildPromptContext(project);
    expect(ctx.premise).toBeUndefined();
    expect(ctx.genreProfile).toBeUndefined();
    expect(ctx.worldBible).toBeUndefined();
    expect(ctx.characters).toBeUndefined();
    expect(ctx.relationships).toBeUndefined();
    expect(ctx.plotSkeleton).toBeUndefined();
  });

  it('includes quality analysis notes when present', () => {
    const project = makeProject();
    project.revision.voiceNotes = [{ issue: 'monotone dialogue' }];
    project.revision.pacingNotes = [{ issue: 'slow middle' }];

    const ctx = buildPromptContext(project);
    expect(ctx.voiceNotes).toBeDefined();
    expect(JSON.parse(ctx.voiceNotes!)).toEqual([{ issue: 'monotone dialogue' }]);
    expect(ctx.pacingNotes).toBeDefined();
  });

  it('applies overrides on top of computed context', () => {
    const project = makeProject();
    const ctx = buildPromptContext(project, {
      currentChapter: 3,
      chapterContent: 'Once upon a time...',
    });
    expect(ctx.currentChapter).toBe(3);
    expect(ctx.chapterContent).toBe('Once upon a time...');
  });

  it('formats inspirations correctly', () => {
    const project = makeProject({
      selectedInspirations: [
        { type: 'trope', name: 'Chosen One', description: 'Classic hero arc', hook: 'Prophecy twist' },
        { type: 'setting', name: 'Steampunk London' },
      ],
    });
    const ctx = buildPromptContext(project);
    expect(ctx.inspirations).toContain('Chosen One');
    expect(ctx.inspirations).toContain('Classic hero arc');
    expect(ctx.inspirations).toContain('Hook: Prophecy twist');
    expect(ctx.inspirations).toContain('Steampunk London');
  });

  it('returns empty inspirations string when none provided', () => {
    const project = makeProject();
    const ctx = buildPromptContext(project);
    expect(ctx.inspirations).toBe('');
  });

  it('includes series context when available', () => {
    const project = makeProject();
    project.meta.seriesContext = { seriesName: 'Epic Saga', books: [] };
    const ctx = buildPromptContext(project);
    expect(ctx.seriesBible).toBeDefined();
    expect(JSON.parse(ctx.seriesBible!).seriesName).toBe('Epic Saga');
  });
});

// --- buildSceneContext ---

describe('buildSceneContext', () => {
  it('includes scene-specific overrides', () => {
    const project = makeProject();
    project.foundation.characters = [
      {
        id: 'char-1', name: 'Alice', role: 'protagonist',
        age: '25', physicalDescription: 'Tall', personality: 'Brave',
        backstory: '', motivation: '', flaw: '', fear: '', want: '', need: '',
        arcStart: '', arcEnd: '', voiceNotes: '', speechPatterns: '',
      },
    ];

    const scene: SceneCardOutput = {
      id: 'scene-1-1',
      chapterNumber: 1,
      position: 1,
      location: 'Forest',
      characters: ['Alice'],
      purpose: 'Introduction',
      beats: ['Alice wakes up'],
      conflict: 'Lost in the woods',
      emotionalNote: 'Fear',
      entryHook: 'A sound in the dark',
      exitHook: 'She finds a path',
      sceneType: ['action'],
      wordTarget: 2000,
      setups: [],
      payoffs: [],
    };

    const ctx = buildSceneContext(project, scene, 'Previous scene ended here.');
    expect(ctx.currentChapter).toBe(1);
    expect(ctx.currentScene).toBeDefined();
    expect(ctx.previousSceneEnding).toBe('Previous scene ended here.');

    // Characters should be filtered to only scene characters
    const chars = JSON.parse(ctx.characters!);
    expect(chars).toHaveLength(1);
    expect(chars[0].name).toBe('Alice');
  });

  it('passes undefined characters when no characters match scene', () => {
    const project = makeProject();
    project.foundation.characters = [
      {
        id: 'char-1', name: 'Bob', role: 'supporting',
        age: '30', physicalDescription: '', personality: '',
        backstory: '', motivation: '', flaw: '', fear: '', want: '', need: '',
        arcStart: '', arcEnd: '', voiceNotes: '', speechPatterns: '',
      },
    ];

    const scene: SceneCardOutput = {
      id: 'scene-1-1', chapterNumber: 1, position: 1, location: 'Beach',
      characters: ['Alice'], // Alice not in foundation characters
      purpose: '', beats: [], conflict: '', emotionalNote: '',
      entryHook: '', exitHook: '', sceneType: ['dialogue'],
      wordTarget: 1500, setups: [], payoffs: [],
    };

    const ctx = buildSceneContext(project, scene);
    // Filtered characters = empty array → still stringified
    const chars = JSON.parse(ctx.characters!);
    expect(chars).toHaveLength(0);
  });
});

// --- buildChapterContext ---

describe('buildChapterContext', () => {
  it('includes chapter number and content', () => {
    const project = makeProject();
    project.drafts.chapters.set(1, 'Chapter 1 content here...');

    const ctx = buildChapterContext(project, 1);
    expect(ctx.currentChapter).toBe(1);
    expect(ctx.chapterContent).toBe('Chapter 1 content here...');
  });

  it('returns undefined chapterContent for missing chapter', () => {
    const project = makeProject();
    const ctx = buildChapterContext(project, 99);
    expect(ctx.currentChapter).toBe(99);
    expect(ctx.chapterContent).toBeUndefined();
  });
});

// --- buildManuscriptContext ---

describe('buildManuscriptContext', () => {
  it('concatenates all chapters into fullManuscript', () => {
    const project = makeProject();
    project.drafts.chapters.set(1, 'Chapter one text.');
    project.drafts.chapters.set(2, 'Chapter two text.');
    project.drafts.chapters.set(3, 'Chapter three text.');

    const ctx = buildManuscriptContext(project);
    expect(ctx.fullManuscript).toContain('--- Chapter 1 ---');
    expect(ctx.fullManuscript).toContain('Chapter one text.');
    expect(ctx.fullManuscript).toContain('--- Chapter 2 ---');
    expect(ctx.fullManuscript).toContain('Chapter two text.');
    expect(ctx.fullManuscript).toContain('--- Chapter 3 ---');
  });

  it('returns empty string for fullManuscript when no chapters exist', () => {
    const project = makeProject();
    const ctx = buildManuscriptContext(project);
    expect(ctx.fullManuscript).toBe('');
  });
});
