# NovelCraft Genre Weaver - Frontend Implementation Plan

## Overview

This document outlines all frontend work required to prepare the web app for Orchestrator AI integration. The backend (23 agents, workflow engine, API endpoints) will be built separately in Orchestrator AI.

---

## Features Summary

| # | Feature | Description | Priority | Effort |
|---|---------|-------------|----------|--------|
| 1 | Series Mode UI | Toggle + fields for series books | P0 | Medium |
| 2 | Content Constraints | Rating enforcement logic | P0 | Small |
| 3 | Generation Progress | 6-phase progress display | P0 | Medium |
| 4 | API Service Integration | OrchestratorAI service layer | P0 | Medium |
| 5 | Manuscript Viewer | Chapter navigation + downloads | P1 | Medium |
| 6 | Disabled Format Handling | Picture Book "Coming Soon" | P1 | Small |

---

## Phase 1: Foundation (Types & Utilities)

### 1.1 Update Type Definitions

**File:** `src/types/index.ts`

Add the following new types:

```typescript
// ============================================
// SERIES MODE TYPES
// ============================================

export interface SeriesFields {
  seriesMode: boolean;
  seriesPosition?: number;      // Book 1, 2, 3...
  seriesName?: string;          // "The Shadow Garden Trilogy"
  seriesBibleId?: string;       // Reference to existing series bible
  seriesArc?: string;           // Optional overall arc description
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

// ============================================
// CONTENT CONSTRAINTS TYPES
// ============================================

export interface ContentConstraints {
  allowedRatings: ContentRating[];
  defaultRating: ContentRating;
  lockedRating?: ContentRating;       // If set, rating cannot be changed
  autoAvoidContent: string[];         // Auto-populated avoid list
  formatWarnings: string[];           // Warnings to show user
}

// ============================================
// JOB PROGRESS TYPES (for orchestrator)
// ============================================

export type GenerationPhase = 'foundation' | 'structure' | 'drafting' | 'revision' | 'image' | 'output';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface JobProgress {
  jobId: string;
  status: JobStatus;
  currentPhase: GenerationPhase;
  currentStep: string;                // "Building character profiles..."
  percentComplete: number;            // 0-100
  estimatedTimeRemaining?: number;    // seconds
  completedPhases: GenerationPhase[];
  errors?: string[];
}

// ============================================
// BOOK RESULT TYPES
// ============================================

export interface BookResult {
  bookId: string;
  title: string;
  content: string;                    // Full manuscript
  chapters: Chapter[];
  coverImageUrl?: string;
  seriesBibleId?: string;
  generationMetadata: GenerationMetadata;
}

export interface Chapter {
  number: number;
  title: string;
  content: string;
  wordCount: number;
}

export interface GenerationMetadata {
  totalTokensUsed: number;
  actualCost: number;
  generationDuration: number;         // milliseconds
  model: string;
  phases: PhaseMetadata[];
}

export interface PhaseMetadata {
  phase: GenerationPhase;
  duration: number;
  tokensUsed: number;
}

// ============================================
// ORCHESTRATOR SERVICE INTERFACE
// ============================================

export interface OrchestratorAIService {
  startBookGeneration(request: BookRequest): Promise<{ jobId: string }>;
  getJobProgress(jobId: string): Promise<JobProgress>;
  getJobResult(jobId: string): Promise<BookResult>;
  cancelJob(jobId: string): Promise<void>;
  listSeriesBibles(): Promise<SeriesBible[]>;
  getSeriesBible(id: string): Promise<SeriesBible>;
}

export interface BookRequest {
  settings: BookSettings;
  seriesFields?: SeriesFields;
  contentConstraints?: ContentConstraints;
}
```

---

### 1.2 Create Content Constraints Utility

**New File:** `src/lib/contentConstraints.ts`

```typescript
import { BookFormat, ContentRating, ContentConstraints } from '@/types';

// Format-specific rating constraints
const FORMAT_RATING_CONSTRAINTS: Record<BookFormat, {
  allowed: ContentRating[];
  default: ContentRating;
  locked?: ContentRating
}> = {
  'picture-book': { allowed: ['G'], default: 'G', locked: 'G' },
  'early-reader': { allowed: ['G', 'PG'], default: 'G' },
  'middle-grade': { allowed: ['G', 'PG', 'PG-13'], default: 'PG' },
  'novel': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'short-stories': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'poetry': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'graphic-novel': { allowed: ['G', 'PG', 'PG-13', 'R'], default: 'PG-13' },
  'technical': { allowed: ['G', 'PG'], default: 'G' },
  'biography': { allowed: ['G', 'PG', 'PG-13', 'R'], default: 'PG-13' },
  'cookbook': { allowed: ['G', 'PG'], default: 'G' }
};

// Auto-avoid content based on format
const AUTO_AVOID_CONTENT: Record<BookFormat, string[]> = {
  'picture-book': ['violence', 'death', 'scary themes', 'complex emotions', 'romance'],
  'early-reader': ['violence', 'death', 'scary content', 'romance', 'complex moral dilemmas'],
  'middle-grade': ['explicit violence', 'graphic content', 'adult romance', 'strong language'],
  'novel': [],
  'short-stories': [],
  'poetry': [],
  'graphic-novel': [],
  'technical': ['fictional narrative', 'story elements'],
  'biography': [],
  'cookbook': ['narrative fiction']
};

// Auto-avoid content based on rating
const RATING_AVOID_CONTENT: Record<ContentRating, string[]> = {
  'G': ['violence', 'death', 'scary content', 'romance', 'conflict', 'strong language'],
  'PG': ['graphic violence', 'death details', 'romance beyond hand-holding', 'mild profanity'],
  'PG-13': ['explicit violence', 'explicit romance', 'strong profanity'],
  'R': ['extremely graphic content'],
  'X': []
};

/**
 * Derives content constraints based on format and rating.
 * This function enforces format-specific rating restrictions and auto-populates
 * the avoid list based on the format and rating combination.
 */
export function deriveContentConstraints(
  format: BookFormat,
  rating: ContentRating
): ContentConstraints {
  const formatConfig = FORMAT_RATING_CONSTRAINTS[format];

  // Determine effective rating (may be locked or adjusted)
  const effectiveRating = formatConfig.locked ||
    (formatConfig.allowed.includes(rating) ? rating : formatConfig.default);

  // Combine auto-avoid lists and deduplicate
  const autoAvoidContent = [
    ...AUTO_AVOID_CONTENT[format],
    ...RATING_AVOID_CONTENT[effectiveRating]
  ].filter((item, index, arr) => arr.indexOf(item) === index);

  // Generate warnings for user
  const formatWarnings: string[] = [];
  if (formatConfig.locked && rating !== formatConfig.locked) {
    formatWarnings.push(`${format} books are restricted to ${formatConfig.locked} rating`);
  }
  if (!formatConfig.allowed.includes(rating)) {
    formatWarnings.push(`Rating adjusted from ${rating} to ${effectiveRating} for ${format} format`);
  }

  return {
    allowedRatings: formatConfig.allowed,
    defaultRating: formatConfig.default,
    lockedRating: formatConfig.locked,
    autoAvoidContent,
    formatWarnings
  };
}

/**
 * Checks if a rating is allowed for a given format.
 */
export function isRatingAllowedForFormat(
  format: BookFormat,
  rating: ContentRating
): boolean {
  return FORMAT_RATING_CONSTRAINTS[format].allowed.includes(rating);
}

/**
 * Gets the default rating for a format.
 */
export function getDefaultRatingForFormat(format: BookFormat): ContentRating {
  return FORMAT_RATING_CONSTRAINTS[format].default;
}

/**
 * Checks if a format has a locked rating (cannot be changed).
 */
export function isRatingLockedForFormat(format: BookFormat): boolean {
  return !!FORMAT_RATING_CONSTRAINTS[format].locked;
}
```

---

## Phase 2: Service Layer

### 2.1 Create Mock Orchestrator Service

**New File:** `src/services/mockOrchestratorService.ts`

This service simulates the Orchestrator AI backend for development and testing.

Key functionality:
- `startBookGeneration()` - Returns jobId, starts simulated 6-phase generation
- `getJobProgress()` - Returns current progress with phase indicators
- `getJobResult()` - Returns mock BookResult with chapters
- `cancelJob()` - Stops generation
- `listSeriesBibles()` - Returns mock series from localStorage
- `getSeriesBible()` - Returns single series bible

The mock service simulates ~20 seconds of generation time across 6 phases:
1. Foundation (2s) - Building premise, characters, world
2. Structure (3s) - Chapter planning, scenes, themes
3. Drafting (8s) - Writing prose content
4. Revision (4s) - Quality improvements
5. Image (2s) - Cover generation
6. Output (1s) - Final formatting

### 2.2 Update Service Factory

**File:** `src/services/serviceFactory.ts`

Add:
```typescript
import { MockOrchestratorService } from './mockOrchestratorService';

// In class:
private static orchestratorService: OrchestratorAIService | null = null;

static getOrchestratorService(): OrchestratorAIService {
  if (!this.orchestratorService) {
    if (USE_MOCK_SERVICES) {
      this.orchestratorService = new MockOrchestratorService();
    } else {
      throw new Error('Real OrchestratorService not implemented yet');
    }
  }
  return this.orchestratorService;
}

// Export:
export const orchestratorService = ServiceFactory.getOrchestratorService();
```

---

## Phase 3: Validation Updates

### 3.1 Update Validation Schemas

**File:** `src/lib/validation.ts`

Add series validation:

```typescript
export const seriesFieldsSchema = z.object({
  seriesMode: z.boolean(),
  seriesPosition: z.number().int().min(1).max(20).optional(),
  seriesName: z.string().max(200).optional(),
  seriesBibleId: z.string().uuid().optional(),
  seriesArc: z.string().max(2000).optional()
}).refine(
  (data) => {
    if (data.seriesMode) {
      return data.seriesName && data.seriesName.length > 0 && data.seriesPosition !== undefined;
    }
    return true;
  },
  { message: 'Series name and position are required when series mode is enabled' }
);

export function validateSeriesFields(data: unknown): ValidationResult<z.infer<typeof seriesFieldsSchema>> {
  return validateData(seriesFieldsSchema, data);
}
```

---

## Phase 4: Hooks

### 4.1 Create Orchestrator Generation Hook

**New File:** `src/hooks/useOrchestratorGeneration.ts`

State management:
```typescript
interface OrchestratorState {
  isGenerating: boolean;
  jobId: string | null;
  progress: JobProgress | null;
  result: BookResult | null;
  error: string | null;
}
```

Functions:
- `startGeneration(request)` - Starts job, begins polling for progress
- `cancelGeneration()` - Stops polling, cancels job on backend
- `resetState()` - Clears all state

Features:
- Polls for progress every 1 second while generating
- Toast notifications on completion/failure
- Cleanup on component unmount

### 4.2 Create Series Bibles Hook

**New File:** `src/hooks/useSeriesBibles.ts`

Returns:
- `seriesBibles[]` - List of available series
- `loading` - Loading state
- `error` - Error message if any
- `refetch()` - Reload series list
- `getSeriesBible(id)` - Fetch single series

---

## Phase 5: Components

### 5.1 Generation Progress Component

**New File:** `src/components/GenerationProgress.tsx`

Visual features:
- 6 phase indicators in a row (Foundation → Structure → Drafting → Revision → Image → Output)
- Phase states: completed (green checkmark), current (spinning loader), upcoming (dimmed icon)
- Overall progress bar with percentage
- Current step text (e.g., "Building character profiles...")
- Estimated time remaining
- Cancel button (red outline)
- Error display section

Props:
```typescript
interface GenerationProgressProps {
  progress: JobProgress | null;
  onCancel?: () => void;
  showCancel?: boolean;
}
```

### 5.2 Series Mode Fields Component

**New File:** `src/components/SeriesModeFields.tsx`

Visual features:
- Card with toggle header "Series Mode"
- When enabled, shows:
  - Series Name input (required)
  - Book Position dropdown (1-20)
  - For Book 2+: Series Bible selector dropdown
  - Series Arc textarea (optional, 2000 char limit)
  - Badges showing selected position and series name
- Series bible preview when one is selected

Props:
```typescript
interface SeriesModeFieldsProps {
  seriesFields: SeriesFields;
  onChange: (fields: SeriesFields) => void;
  errors?: Record<string, string>;
}
```

### 5.3 Manuscript Viewer Component

**New File:** `src/components/ManuscriptViewer.tsx`

Visual features:
- Left sidebar: Chapter navigation list
- Main area:
  - Cover image display with title and stats
  - Download buttons (PDF, EPUB, DOCX)
  - Chapter content with scroll area
  - Previous/Next chapter navigation
- Generation metadata dialog (tokens, cost, time, phase breakdown)

Props:
```typescript
interface ManuscriptViewerProps {
  result: BookResult;
  onClose?: () => void;
}
```

Note: Download buttons are placeholder - actual format conversion requires backend support.

### 5.4 Update SimpleBookCreator

**File:** `src/components/SimpleBookCreator.tsx`

Changes:
1. Add "Coming Soon" badge to Picture Book option in format dropdown
2. Disable picture-book selection
3. Import and call `deriveContentConstraints()` before generation
4. Show toast notification when rating is auto-adjusted

### 5.5 Update BookCustomizer

**File:** `src/components/BookCustomizer.tsx`

Changes:
1. Import `SeriesModeFields` component
2. Add `seriesFields` state: `useState<SeriesFields>({ seriesMode: false })`
3. Add `<SeriesModeFields>` after Story Preferences section
4. Include series fields in validation
5. Include series fields in book creation payload
6. Apply content constraints before generation

---

## Files Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `src/lib/contentConstraints.ts` | Rating enforcement logic |
| `src/services/mockOrchestratorService.ts` | Mock Orchestrator AI backend |
| `src/hooks/useOrchestratorGeneration.ts` | Generation state + polling |
| `src/hooks/useSeriesBibles.ts` | Series bible fetching |
| `src/components/GenerationProgress.tsx` | 6-phase progress UI |
| `src/components/SeriesModeFields.tsx` | Series mode form fields |
| `src/components/ManuscriptViewer.tsx` | Book reader + downloads |

### Files to Modify

| File | Changes |
|------|---------|
| `src/types/index.ts` | Add ~15 new types/interfaces |
| `src/lib/validation.ts` | Add series validation schema |
| `src/services/serviceFactory.ts` | Add orchestrator service |
| `src/components/SimpleBookCreator.tsx` | Disable picture-book, add constraints |
| `src/components/BookCustomizer.tsx` | Add SeriesModeFields component |

---

## Implementation Order

Execute in this order to respect dependencies:

1. **Types** (`src/types/index.ts`) - Foundation for everything
2. **Content Constraints** (`src/lib/contentConstraints.ts`) - Pure utility
3. **Validation** (`src/lib/validation.ts`) - Depends on types
4. **Mock Service** (`src/services/mockOrchestratorService.ts`) - Implements interfaces
5. **Service Factory** (`src/services/serviceFactory.ts`) - Registers service
6. **Hooks** - Depends on services
   - `useOrchestratorGeneration.ts`
   - `useSeriesBibles.ts`
7. **Components** - Depends on hooks and types
   - `GenerationProgress.tsx` (standalone)
   - `SeriesModeFields.tsx` (uses useSeriesBibles)
   - `ManuscriptViewer.tsx` (standalone)
8. **Component Updates**
   - `SimpleBookCreator.tsx`
   - `BookCustomizer.tsx`

---

## Verification Checklist

After implementation, verify:

- [ ] `npm run build` passes with no TypeScript errors
- [ ] `npm run dev` starts without errors
- [ ] Series Mode toggle enables/disables fields correctly
- [ ] Series name and position are required when series mode is on
- [ ] Book position > 1 shows series bible selector
- [ ] Picture Book format shows "Coming Soon" badge and is disabled
- [ ] Early-reader format auto-locks rating to G
- [ ] Toast appears when rating is auto-adjusted for format
- [ ] Generation progress shows all 6 phases with correct states
- [ ] Progress bar updates during mock generation
- [ ] Cancel button stops generation
- [ ] Manuscript viewer displays chapters correctly
- [ ] Chapter navigation (Previous/Next) works
- [ ] Download buttons trigger file download
- [ ] Generation metadata dialog shows correct info

---

## Notes

1. **Picture Book format is disabled for V1** - Requires illustration pipeline (V2)
2. **Download buttons are placeholder** - Actual format conversion (PDF, EPUB) needs backend
3. **Mock service simulates ~20 second generation** - Real backend will vary by book length
4. **Series bibles stored in localStorage** - Will move to Supabase with backend integration
5. **Content constraints are enforced client-side** - Backend should also enforce

---

## Handoff to Orchestrator AI

When the frontend is complete, the Orchestrator AI backend needs to implement:

1. **API Endpoints:**
   - `POST /api/books/generate` → returns `{ jobId }`
   - `GET /api/jobs/{jobId}/progress` → returns `JobProgress`
   - `GET /api/jobs/{jobId}/result` → returns `BookResult`
   - `DELETE /api/jobs/{jobId}` → cancels job
   - `GET /api/series` → returns `SeriesBible[]`
   - `GET /api/series/{id}` → returns `SeriesBible`
   - `POST /api/series` → creates series from Book 1

2. **Match the TypeScript interfaces exactly** (see Phase 1.1 types)

3. **Progress reporting** should update at least every 2 seconds

4. **Series Bible creation** happens automatically when generating Book 1 of a series
