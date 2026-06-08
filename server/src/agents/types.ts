import type { BookProject, AgentMode } from '../types/project.js';

export type ModelRole = 'creative' | 'structural' | 'uncensored' | 'fast' | 'evaluator';
export type OutputFormat = 'json' | 'text';
export type AgentCategory = 'orchestration' | 'foundation' | 'structure' | 'writing' | 'quality' | 'image';

export interface AgentConfig {
  name: string;
  displayName: string;
  category: AgentCategory;

  model: {
    role: ModelRole;
    fallback?: ModelRole;
  };

  mode?: {
    supported: AgentMode[];
    inputField: string;
    expandThreshold: number;
  };

  buildSystemPrompt: (context: PromptContext) => string;
  buildUserPrompt: (context: PromptContext, mode: AgentMode) => string;

  output: {
    format: OutputFormat;
    storeAs: string;
  };

  activation: {
    alwaysRun: boolean;
    condition?: (project: BookProject) => boolean;
  };

  evaluation?: {
    enabled: boolean;
    criteria: string[];
    threshold: number;
  };
}

export interface PromptContext {
  // From request
  title: string;
  genres: string[];
  description: string;
  plotOutline: string;
  characterDetails: string;
  settingDetails: string;
  themes: string;
  avoidList: string[];
  specialRequests: string;
  inspirations: string;
  contentRating: string;
  audienceStyle: string;
  perspective: string;
  happyEnding: boolean;
  bigTwist: boolean;
  romanticSubplot: boolean;
  targetWordCount: number;

  // From previous agents (accumulated in BookProject)
  premise?: string;
  genreProfile?: string;
  worldBible?: string;
  characters?: string;
  relationships?: string;
  plotSkeleton?: string;
  themeMap?: string;
  chapterPlans?: string;

  // Drafting context
  currentChapter?: number;
  currentScene?: any;
  previousSceneEnding?: string;
  chapterContent?: string;
  previousChapterSummaries?: string;
  fullManuscript?: string;

  // Series context
  seriesBible?: string;

  // Continuity/tracking
  continuityLog?: string;
  setupLog?: string;

  // Quality analysis notes (from revision phase)
  voiceNotes?: string;
  pacingNotes?: string;
  clicheNotes?: string;
  setupPayoffNotes?: string;

  // Beta reader feedback (for targeted re-editing)
  betaReaderFeedback?: string;
}

export interface AgentResult {
  agentName: string;
  output: any;
  rawResponse: string;
  tokensUsed: number;
  promptTokens: number;
  duration: number;
  mode: AgentMode;
  model: string;
}
