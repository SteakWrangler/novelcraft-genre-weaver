// Core application types

export interface Book {
  id: string;
  title: string;
  genres: string[];
  content: string;
  settings: BookSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookSettings {
  // Simple creator settings
  simple?: boolean;
  pages?: number;
  description?: string;
  rating?: ContentRating;
  
  // Advanced creator settings
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
  
  // Format and cost settings
  format?: FormatSettings;
  qualityLevel?: QualityLevel;
  targetWordCount?: number;
  chapterCount?: number;
  illustrationCount?: number;
}

export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'X';

export type NarrativePerspective = 'first-person' | 'third-person' | 'multiple-pov';

export type BookFormat = 
  | 'novel'           // Standard novels (current default)
  | 'picture-book'    // Ages 0-8, illustration-heavy
  | 'early-reader'    // Ages 5-9, simple chapter books  
  | 'middle-grade'    // Ages 8-12, longer chapter books
  | 'graphic-novel'   // Comic/graphic format
  | 'poetry'          // Poetry collections
  | 'short-stories'   // Short story collections
  | 'technical'       // How-to, educational
  | 'biography'       // Life stories
  | 'cookbook';       // Recipe collections

export type BookAudience = 'children' | 'young-adult' | 'adult' | 'all-ages';

export type QualityLevel = 'basic' | 'premium' | 'professional';

export interface FormatSettings {
  format: BookFormat;
  audience: BookAudience;
  illustrationStyle?: 'cartoon' | 'realistic' | 'minimalist' | 'none';
  interactiveElements?: boolean;
  ageRange?: { min: number; max: number };
  readingLevel?: 'beginner' | 'intermediate' | 'advanced';
  fontSizePreference?: 'large' | 'medium' | 'small';
}

export interface CostBreakdown {
  base: number;
  plotting: number;
  characters: number;
  writing: number;
  editing: number;
  review: number;
  polish: number;
  enhancements: number;
  illustrations: number;
  total: number;
}

export interface CostEstimate {
  estimated: number;
  range: { min: number; max: number };
  breakdown: CostBreakdown;
  confidence: 'low' | 'medium' | 'high';
}

export interface CostFactors {
  // Core factors
  wordCount: number;
  format: BookFormat;
  qualityLevel: QualityLevel;
  
  // Enhancement factors
  advancedPlotting: boolean;
  characterDevelopment: boolean;
  editingPasses: number;
  illustrationCount: number;
  
  // Complexity multipliers
  genreComplexity: number; // 1.0-1.5x
  narrativePerspective: number; // 1.0-1.3x
  specialRequests: number; // 1.0-2.0x
  
  // Book-specific options
  bigTwist: boolean;
  romanticSubplot: boolean;
  happyEnding: boolean;
}

export interface Inspiration {
  type: InspirationCategory;
  name: string;
  description?: string;
  // Trope-specific fields
  genres?: string[];
  icon?: React.ReactNode;
  // Setting-specific fields
  atmosphere?: string;
  // Plot-specific fields
  hook?: string;
  potential?: string;
}

export type InspirationCategory = 'trope' | 'setting' | 'plot';

export interface Trope extends Inspiration {
  type: 'trope';
  name: string;
  description: string;
  genres: string[];
  icon: React.ReactNode;
}

export interface Setting extends Inspiration {
  type: 'setting';
  name: string;
  description: string;
  atmosphere: string;
  genres: string[];
}

export interface PlotStarter extends Inspiration {
  type: 'plot';
  hook: string;
  potential: string;
  genres: string[];
}

export interface Genre {
  name: string;
  color: string;
}

// UI Component Props
export interface BookCustomizerProps {
  onCreateBook: (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => void;
  selectedInspirations?: Inspiration[];
  onClearInspirations?: () => void;
}

export interface SimpleBookCreatorProps {
  onCreateBook: (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => void;
}

export interface GenreSelectorProps {
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
}

export interface BookInspirationProps {
  onSelectIdea: (idea: Inspiration) => void;
  onUnselectIdea: (idea: Inspiration) => void;
  selectedInspirations: Inspiration[];
  onClearInspirations: () => void;
  onGoToAdvancedCreator: () => void;
}

export interface BookLibraryProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
}

// Service Layer Types (for future API integration)
export interface BookService {
  createBook(bookData: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book>;
  getBooks(): Promise<Book[]>;
  getBook(id: string): Promise<Book | null>;
  updateBook(book: Book): Promise<Book>;
  deleteBook(id: string): Promise<void>;
}

export interface InspirationService {
  getTropes(): Promise<Trope[]>;
  getSettings(): Promise<Setting[]>;
  getPlotStarters(): Promise<PlotStarter[]>;
}

export interface AIGenerationService {
  generateBook(settings: BookSettings): Promise<{ content: string; progress: number }>;
  generateBookCover(title: string, genres: string[]): Promise<string>; // Returns image URL
}

// Error Types
export interface AppError {
  type: 'validation' | 'network' | 'api' | 'unknown';
  message: string;
  details?: string;
}

// State Management
export interface AppState {
  books: Book[];
  selectedInspirations: Inspiration[];
  loading: boolean;
  error: AppError | null;
}