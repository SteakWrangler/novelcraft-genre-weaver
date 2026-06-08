import { describe, it, expect } from 'vitest';
import { getAllAgents } from '../src/agents/registry.js';
import type { PromptContext } from '../src/agents/types.js';

/**
 * Tests that every agent's prompt builders execute without errors
 * and produce non-empty strings. This catches broken template logic
 * without making any LLM calls.
 */

function makeFullContext(): PromptContext {
  return {
    title: 'The Last Dragon',
    genres: ['Fantasy', 'Adventure'],
    description: 'A young scribe discovers she is the last living dragonrider.',
    plotOutline: 'Act 1: Discovery. Act 2: Training. Act 3: War.',
    characterDetails: 'Lyra is a 19-year-old scribe with a hidden talent for magic.',
    settingDetails: 'A medieval kingdom where dragons were hunted to extinction.',
    themes: 'legacy, sacrifice, the cost of power',
    avoidList: ['excessive gore', 'sexual content'],
    specialRequests: 'Include a mentor figure who dies mid-story.',
    inspirations: 'Eragon - Coming of age dragon story; Game of Thrones - Political intrigue',
    contentRating: 'PG-13',
    audienceStyle: 'young-adult',
    perspective: 'third-person',
    happyEnding: true,
    bigTwist: true,
    romanticSubplot: true,
    targetWordCount: 80000,
    // Foundation outputs
    premise: JSON.stringify({
      hook: 'In a world where dragons were hunted to extinction, a young scribe finds a living egg.',
      centralConflict: 'The kingdom that destroyed dragons now needs one to survive.',
      stakes: 'If the last dragon dies, an ancient magical barrier falls.',
      themeSeeds: ['the cost of power', 'legacy', 'forgiveness of ancestral sins'],
      tone: 'Epic and sweeping with moments of quiet intimacy.',
      logline: 'A scribe must bond with the last dragon to save the kingdom that destroyed its kind.',
    }),
    genreProfile: JSON.stringify({
      conventions: ['coming of age', 'chosen one'],
      pacingExpectations: 'Build slowly, accelerate in final third',
      commonTropes: ['dragon bond', 'hidden heir', 'mentor sacrifice'],
      readerExpectations: 'Satisfying character growth with an epic climax',
      toneGuidance: 'Balance wonder with danger',
      avoidClichés: ['instant mastery', 'prophecy solves everything'],
    }),
    worldBible: JSON.stringify({
      setting: 'Kingdom of Ashenmoor',
      geography: 'Mountain ranges and vast forests',
      culture: 'Feudal society with dragon-hunting history',
      rules: 'Magic faded when dragons died',
      history: 'Great Dragon War 200 years ago',
      atmosphere: 'Fading grandeur with hints of magic returning',
    }),
    characters: JSON.stringify([{
      id: 'char-1',
      name: 'Lyra',
      role: 'protagonist',
      age: '19',
      physicalDescription: 'Short, dark-haired, ink-stained fingers',
      personality: 'Curious, stubborn, secretly fearful',
      backstory: 'Orphan raised in the royal library',
      motivation: 'To discover her origins',
      flaw: 'Trusts too easily',
      fear: 'Being alone',
      want: 'To belong somewhere',
      need: 'To accept her own power',
      arcStart: 'Timid scribe',
      arcEnd: 'Confident dragonrider and leader',
      voiceNotes: 'Formal when nervous, colloquial with friends',
      speechPatterns: 'Uses literary metaphors, asks many questions',
    }]),
    relationships: JSON.stringify({
      relationships: [{
        characters: ['Lyra', 'Kael'],
        type: 'romantic interest',
        dynamics: 'Tension between duty and desire',
        evolution: 'From distrust to partnership',
      }],
    }),
    plotSkeleton: JSON.stringify({
      acts: [
        { act: 1, summary: 'Discovery of the egg', beats: ['Finds egg', 'Dragon hatches', 'Must flee'] },
        { act: 2, summary: 'Training and allies', beats: ['Learns to ride', 'Finds rebel group', 'Betrayal'] },
        { act: 3, summary: 'Final battle', beats: ['Confrontation', 'Sacrifice', 'Victory'] },
      ],
      climax: 'Dragon and rider face the corrupted king together',
      resolution: 'New era of dragon-human coexistence',
      endingType: 'hopeful',
    }),
    themeMap: JSON.stringify({
      themes: [{ theme: 'legacy', surfacePoints: [{ chapter: 1, description: 'Library discovery' }] }],
    }),
    chapterPlans: JSON.stringify([{
      chapterNumber: 1, title: 'The Egg', summary: 'Lyra finds the egg',
      goals: ['Introduce Lyra', 'Discovery moment'], wordTarget: 4000, endHook: 'The egg cracks',
    }]),
    // Drafting context
    currentChapter: 1,
    currentScene: JSON.stringify({
      id: 'scene-1-1', chapterNumber: 1, position: 1, location: 'Royal Library',
      characters: ['Lyra'], purpose: 'Introduction', beats: ['Lyra working', 'Strange sound'],
      conflict: 'Curiosity vs duty', emotionalNote: 'Wonder', entryHook: 'A normal day...',
      exitHook: 'A glow from the vault', sceneType: ['exposition'], wordTarget: 1500,
      setups: ['hidden vault'], payoffs: [],
    }),
    chapterContent: 'The library was quiet in the pre-dawn hours, just the way Lyra liked it.',
    fullManuscript: '--- Chapter 1 ---\nThe library was quiet...',
    // Quality notes
    voiceNotes: JSON.stringify([{ issue: 'Lyra sounds too formal in casual scenes' }]),
    pacingNotes: JSON.stringify([{ issue: 'Chapter 3 drags in the middle' }]),
    clicheNotes: JSON.stringify([{ issue: '"Her heart raced" used 4 times' }]),
    setupPayoffNotes: JSON.stringify([{ issue: 'Hidden vault mentioned but never revisited' }]),
    // Series
    seriesBible: JSON.stringify({ seriesName: 'Dragon Chronicles', books: [] }),
    // Tracking
    continuityLog: JSON.stringify([{ fact: 'Library has a hidden vault', source: 'Chapter 1', chapter: 1, verified: true }]),
    setupLog: JSON.stringify([{ id: 's1', description: 'Hidden vault', introducedIn: { chapter: 1, scene: 1 }, type: 'object' }]),
  };
}

function makeMinimalContext(): PromptContext {
  return {
    title: '',
    genres: [],
    description: '',
    plotOutline: '',
    characterDetails: '',
    settingDetails: '',
    themes: '',
    avoidList: [],
    specialRequests: '',
    inspirations: '',
    contentRating: 'PG-13',
    audienceStyle: 'adult',
    perspective: 'third-person',
    happyEnding: true,
    bigTwist: false,
    romanticSubplot: false,
    targetWordCount: 50000,
  };
}

describe('agent prompt generation (full context)', () => {
  const agents = getAllAgents();
  const context = makeFullContext();

  for (const agent of agents) {
    describe(agent.name, () => {
      it('buildSystemPrompt returns a non-empty string', () => {
        const prompt = agent.buildSystemPrompt(context);
        expect(typeof prompt).toBe('string');
        expect(prompt.length).toBeGreaterThan(50);
      });

      it('buildUserPrompt (generate) returns a non-empty string', () => {
        const prompt = agent.buildUserPrompt(context, 'generate');
        expect(typeof prompt).toBe('string');
        expect(prompt.length).toBeGreaterThan(10);
      });

      it('buildUserPrompt (expand) returns a non-empty string', () => {
        const prompt = agent.buildUserPrompt(context, 'expand');
        expect(typeof prompt).toBe('string');
        expect(prompt.length).toBeGreaterThan(10);
      });

      it('buildUserPrompt (hybrid) returns a non-empty string', () => {
        const prompt = agent.buildUserPrompt(context, 'hybrid');
        expect(typeof prompt).toBe('string');
        expect(prompt.length).toBeGreaterThan(10);
      });
    });
  }
});

describe('agent prompt generation (minimal context)', () => {
  const agents = getAllAgents();
  const context = makeMinimalContext();

  for (const agent of agents) {
    describe(agent.name, () => {
      it('buildSystemPrompt does not throw with minimal context', () => {
        expect(() => agent.buildSystemPrompt(context)).not.toThrow();
      });

      it('buildUserPrompt (generate) does not throw with minimal context', () => {
        expect(() => agent.buildUserPrompt(context, 'generate')).not.toThrow();
      });
    });
  }
});

describe('prompt content checks', () => {
  const context = makeFullContext();

  it('prose-writer system prompt includes content rating', () => {
    const agent = getAllAgents().find(a => a.name === 'prose-writer')!;
    const prompt = agent.buildSystemPrompt(context);
    expect(prompt).toContain('PG-13');
  });

  it('premise-architect system prompt includes genre', () => {
    const agent = getAllAgents().find(a => a.name === 'premise-architect')!;
    const prompt = agent.buildSystemPrompt(context);
    expect(prompt).toContain('Fantasy');
  });

  it('premise-architect user prompt changes by mode', () => {
    const agent = getAllAgents().find(a => a.name === 'premise-architect')!;
    const generate = agent.buildUserPrompt(context, 'generate');
    const expand = agent.buildUserPrompt(context, 'expand');
    const hybrid = agent.buildUserPrompt(context, 'hybrid');

    // The three modes should produce different text
    expect(generate).not.toBe(expand);
    expect(generate).not.toBe(hybrid);
    expect(expand).not.toBe(hybrid);
  });

  it('cliche-hunter system prompt references cliche detection', () => {
    const agent = getAllAgents().find(a => a.name === 'cliche-hunter')!;
    const prompt = agent.buildSystemPrompt(context);
    const lower = prompt.toLowerCase();
    expect(lower).toMatch(/clich[ée]/i);
  });

  it('voice-diversifier prompt references character voices', () => {
    const agent = getAllAgents().find(a => a.name === 'voice-diversifier')!;
    const prompt = agent.buildSystemPrompt(context);
    const lower = prompt.toLowerCase();
    expect(lower).toMatch(/voice|character|speech/);
  });
});
