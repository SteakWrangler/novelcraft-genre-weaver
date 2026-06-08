// BookProject: internal state accumulated during generation

import type { BookRequest, ContentConstraints, ContentRating } from './shared.js';

export type AgentMode = 'generate' | 'expand' | 'hybrid';
export type AudienceStyle = 'children' | 'middle-grade' | 'young-adult' | 'adult';

export interface BookProject {
  request: BookRequest;

  derived: {
    audienceStyle: AudienceStyle;
    contentConstraints: ContentConstraints;
    contentRating: ContentRating;
    avoidList: string[];
    agentModes: Record<string, AgentMode>;
    targetWordCount: number;
  };

  foundation: {
    premise?: PremiseOutput;
    genreProfile?: GenreProfileOutput;
    worldBible?: WorldBibleOutput;
    characters?: CharacterOutput[];
    relationships?: RelationshipOutput;
    plotSkeleton?: PlotSkeletonOutput;
  };

  structure: {
    themeMap?: ThemeMapOutput;
    chapterPlans?: ChapterPlanOutput[];
    sceneCards?: SceneCardOutput[][];
    setupLog?: SetupEntry[];
    continuityLog?: FactEntry[];
  };

  drafts: {
    scenes: Map<string, string>;
    chapters: Map<number, string>;
  };

  revision: {
    structuralNotes?: RevisionNote[];
    lineNotes?: Map<number, RevisionNote[]>;
    betaReaderReport?: BetaReaderReport;
    revisedChapters?: Map<number, string>;
    voiceNotes?: any;
    pacingNotes?: any;
    clicheNotes?: any;
    setupPayoffNotes?: any;
  };

  output: {
    title?: string;
    manuscript?: string;
    coverPrompt?: string;
    coverImageUrl?: string;
  };

  meta: {
    startedAt: Date;
    agentsRun: string[];
    tokensUsed: number;
    phaseDurations: Record<string, number>;
    errors: string[];
    seriesContext?: any;
  };
}

// Foundation outputs
export interface PremiseOutput {
  hook: string;
  centralConflict: string;
  stakes: string;
  themeSeeds: string[];
  tone: string;
  logline: string;
}

export interface GenreProfileOutput {
  conventions: string[];
  pacingExpectations: string;
  commonTropes: string[];
  readerExpectations: string;
  toneGuidance: string;
  avoidClichés: string[];
}

export interface WorldBibleOutput {
  setting: string;
  geography: string;
  culture: string;
  rules: string;
  history: string;
  atmosphere: string;
  magicSystem?: string;
  technology?: string;
}

export interface CharacterOutput {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'ally' | 'mentor' | 'rival' | 'supporting';
  age: string;
  physicalDescription: string;
  personality: string;
  backstory: string;
  motivation: string;
  flaw: string;
  fear: string;
  want: string;
  need: string;
  arcStart: string;
  arcEnd: string;
  voiceNotes: string;
  speechPatterns: string;
}

export interface RelationshipOutput {
  relationships: {
    characters: [string, string];
    type: string;
    dynamics: string;
    evolution: string;
    conflict?: string;
  }[];
  romanticSubplot?: {
    characters: [string, string];
    arc: string;
    tension: string;
  };
}

export interface PlotSkeletonOutput {
  acts: {
    act: number;
    summary: string;
    beats: string[];
  }[];
  majorTwist?: {
    setup: string;
    reveal: string;
    impact: string;
  };
  climax: string;
  resolution: string;
  endingType: string;
}

// Structure outputs
export interface ThemeMapOutput {
  themes: {
    theme: string;
    surfacePoints: { chapter: number; description: string }[];
  }[];
}

export interface ChapterPlanOutput {
  chapterNumber: number;
  title: string;
  summary: string;
  goals: string[];
  pov?: string;
  wordTarget: number;
  endHook: string;
  openingType?: string;
  plotBeats?: string[];
  irreversibleChange?: string;
  storyStateBefore?: string;
  storyStateAfter?: string;
}

export interface SceneCardOutput {
  id: string;
  chapterNumber: number;
  position: number;
  location: string;
  characters: string[];
  purpose: string;
  beats: string[];
  conflict: string;
  emotionalNote: string;
  entryHook: string;
  exitHook: string;
  sceneType: ('action' | 'dialogue' | 'emotional' | 'exposition' | 'transition')[];
  wordTarget: number;
  povCharacter?: string;
  setups: string[];
  payoffs: string[];
}

export interface SetupEntry {
  id: string;
  description: string;
  introducedIn: { chapter: number; scene: number };
  paidOffIn?: { chapter: number; scene: number };
  type: 'object' | 'hint' | 'question' | 'promise' | 'foreshadowing';
}

export interface FactEntry {
  fact: string;
  source: string;
  chapter: number;
  verified: boolean;
}

// Revision types
export interface RevisionNote {
  type: 'pacing' | 'voice' | 'cliché' | 'line-edit' | 'continuity' | 'theme';
  chapter?: number;
  location: string;
  issue: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
}

export interface BetaReaderReport {
  overallRating: number;
  strengths: string[];
  weaknesses: string[];
  confusionPoints: { chapter: number; description: string }[];
  boringParts: { chapter: number; description: string }[];
  highlightMoments: { chapter: number; description: string }[];
  contentRatingCompliance: boolean;
  contentIssues: string[];
}

// Helper to create a fresh BookProject
export function createBookProject(request: BookRequest): BookProject {
  return {
    request,
    derived: {
      audienceStyle: 'adult',
      contentConstraints: request.contentConstraints || {
        allowedRatings: ['G', 'PG', 'PG-13', 'R', 'X'],
        defaultRating: 'PG-13',
        autoAvoidContent: [],
        formatWarnings: [],
      },
      contentRating: request.settings.rating || 'PG-13',
      avoidList: [
        ...(request.contentConstraints?.autoAvoidContent || []),
        ...(request.settings.avoidContent ? [request.settings.avoidContent] : []),
      ],
      agentModes: {},
      targetWordCount: request.settings.targetWordCount || request.settings.length || 50000,
    },
    foundation: {},
    structure: {},
    drafts: { scenes: new Map(), chapters: new Map() },
    revision: {},
    output: {},
    meta: {
      startedAt: new Date(),
      agentsRun: [],
      tokensUsed: 0,
      phaseDurations: {},
      errors: [],
    },
  };
}
