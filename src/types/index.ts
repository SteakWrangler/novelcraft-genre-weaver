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
}

export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'X';

export type NarrativePerspective = 'first-person' | 'third-person' | 'multiple-pov';

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