// Types shared with frontend — must match src/types/index.ts

export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'X';
export type NarrativePerspective = 'first-person' | 'third-person' | 'multiple-pov';
export type QualityLevel = 'basic' | 'premium' | 'professional';
export type BookAudience = 'children' | 'young-adult' | 'adult' | 'all-ages';

export type BookFormat =
  | 'novel'
  | 'picture-book'
  | 'early-reader'
  | 'middle-grade'
  | 'graphic-novel'
  | 'poetry'
  | 'short-stories'
  | 'technical'
  | 'biography'
  | 'cookbook';

export interface FormatSettings {
  format: BookFormat;
  audience: BookAudience;
  illustrationStyle?: 'cartoon' | 'realistic' | 'minimalist' | 'none';
  interactiveElements?: boolean;
  ageRange?: { min: number; max: number };
  readingLevel?: 'beginner' | 'intermediate' | 'advanced';
  fontSizePreference?: 'large' | 'medium' | 'small';
}

export interface Inspiration {
  type: 'trope' | 'setting' | 'plot';
  name: string;
  description?: string;
  genres?: string[];
  atmosphere?: string;
  hook?: string;
  potential?: string;
}

export interface BookSettings {
  simple?: boolean;
  pages?: number;
  description?: string;
  rating?: ContentRating;

  advanced?: boolean;
  plotOutline?: string;
  characterDetails?: string;
  setting?: string;
  length?: number;
  happyEnding?: boolean;
  bigTwist?: boolean;
  romanticSubplot?: boolean;
  perspective?: NarrativePerspective;
  themes?: string;
  avoidContent?: string;
  specialRequests?: string;
  selectedInspirations?: Inspiration[];

  format?: FormatSettings;
  qualityLevel?: QualityLevel;
  targetWordCount?: number;
  chapterCount?: number;
  illustrationCount?: number;
}

export interface SeriesFields {
  seriesMode: boolean;
  seriesPosition?: number;
  seriesName?: string;
  seriesBibleId?: string;
  seriesArc?: string;
}

export interface ContentConstraints {
  allowedRatings: ContentRating[];
  defaultRating: ContentRating;
  lockedRating?: ContentRating;
  autoAvoidContent: string[];
  formatWarnings: string[];
}

export interface BookRequest {
  settings: BookSettings;
  seriesFields?: SeriesFields;
  contentConstraints?: ContentConstraints;
}

// Job progress types
export type GenerationPhase = 'foundation' | 'structure' | 'drafting' | 'revision' | 'image' | 'output';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface JobProgress {
  jobId: string;
  status: JobStatus;
  currentPhase: GenerationPhase;
  currentStep: string;
  percentComplete: number;
  estimatedTimeRemaining?: number;
  completedPhases: GenerationPhase[];
  errors?: string[];
}

// Book result types
export interface Chapter {
  number: number;
  title: string;
  content: string;
  wordCount: number;
}

export interface PhaseMetadata {
  phase: GenerationPhase;
  duration: number;
  tokensUsed: number;
}

export interface GenerationMetadata {
  totalTokensUsed: number;
  actualCost: number;
  generationDuration: number;
  model: string;
  phases: PhaseMetadata[];
}

export interface BookResult {
  bookId: string;
  title: string;
  content: string;
  chapters: Chapter[];
  coverImageUrl?: string;
  seriesBibleId?: string;
  generationMetadata: GenerationMetadata;
}

// Series types
export interface SeriesBookEntry {
  position: number;
  bookId: string;
  title: string;
  synopsis: string;
}

export interface SeriesCharacter {
  name: string;
  description: string;
  appearsInBooks: number[];
}

export interface SeriesBible {
  id: string;
  seriesName: string;
  books: SeriesBookEntry[];
  overallArc: string;
  characters: SeriesCharacter[];
  worldDetails: string;
  timeline: string;
  createdAt: Date;
  updatedAt: Date;
}
