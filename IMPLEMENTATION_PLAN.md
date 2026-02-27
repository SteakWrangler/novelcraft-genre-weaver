# NovelCraft Genre Weaver - Implementation Plan

## Overview

This document separates the work needed for the **Frontend (this project)** from the work needed in **Orchestrator AI (backend)**. The frontend is a React web app that collects user input and displays results. Orchestrator AI will run the 23-agent multi-model pipeline that generates the books.

---

## Architecture Summary

**Total: 23 agents across 6 phases**

| Phase | Agents | Purpose |
|-------|--------|---------|
| Orchestration | 3 | Series/Book orchestration, continuity |
| Foundation | 6 | Premise, characters, world, plot |
| Structure | 4 | Chapters, scenes, themes, setup/payoff |
| Writing | 5 | Prose, dialogue, action, emotion, atmosphere |
| Quality | 6 | Voice, pacing, clichés, line editing, beta reader |
| Image | 1 | Cover prompt generation |

**Models used:** Qwen3 72B, DeepSeek, Dolphin 70B, Qwen3 32B (local Ollama)

---

## What's Already Built (Frontend)

### Completed Features
- [x] Simple Book Creator (basic inputs)
- [x] Advanced Book Creator (detailed customization)
- [x] Genre selection (29 genres, multi-select up to 5)
- [x] Inspiration system (tropes, settings, plot starters)
- [x] Book Library with search
- [x] Cost Calculator with phase breakdown
- [x] Form validation with Zod
- [x] Service abstraction layer (mock services ready for real API)
- [x] localStorage persistence
- [x] Error boundaries and toast notifications
- [x] Responsive design

### Existing Types (already defined)
- `Book`, `BookSettings`, `BookFormat`, `QualityLevel`
- `ContentRating`, `NarrativePerspective`
- `Inspiration`, `Trope`, `Setting`, `PlotStarter`

---

## Frontend Work Required

### 1. Input Field Alignment
Ensure all user input fields from the architecture are exposed in the UI:

| Field | Status | Location |
|-------|--------|----------|
| Title | ✅ Done | Both creators |
| Genre(s) | ✅ Done | GenreSelector (max 5) |
| Book Format | ✅ Done | Dropdown |
| Pages/Word Count | ✅ Done | Dropdown |
| Content Rating | ✅ Done | Advanced creator |
| Description | ✅ Done | SimpleBookCreator |
| Plot Outline | ✅ Done | BookCustomizer |
| Character Details | ✅ Done | BookCustomizer |
| Setting & World | ✅ Done | BookCustomizer |
| Themes & Messages | ✅ Done | BookCustomizer |
| Narrative Perspective | ✅ Done | BookCustomizer |
| Happy Ending | ✅ Done | BookCustomizer |
| Include Big Twist | ✅ Done | BookCustomizer |
| Romantic Subplot | ✅ Done | BookCustomizer |
| Content to Avoid | ✅ Done | BookCustomizer |
| Special Requests | ✅ Done | BookCustomizer |
| Inspirations | ✅ Done | BookInspiration |
| **Series Mode** | ⚠️ TODO | New feature |
| **Series Position** | ⚠️ TODO | New feature |
| **Series Name** | ⚠️ TODO | New feature |

### 2. Series Support (New Feature)
Add series mode toggle and fields:

```typescript
interface SeriesFields {
  seriesMode: boolean;
  seriesPosition?: number;      // Book 1, 2, 3...
  seriesName?: string;          // "The Shadow Garden Trilogy"
  seriesBibleId?: string;       // Reference to existing series bible
  seriesArc?: string;           // Optional overall arc description
}
```

**UI Requirements:**
- Add "Series Mode" toggle to Advanced Creator
- When enabled, show series position selector (1-10+)
- Show series name input
- For Book 2+, show dropdown to select existing series
- Store series bible references in book metadata

### 3. Content Rating Enforcement (Frontend Logic)
Implement the `deriveContentConstraints` function:

```typescript
function deriveContentConstraints(format: BookFormat, rating: ContentRating): ContentConstraints {
  // Lock ratings for certain formats
  // Auto-populate avoid list based on format + rating
  // Prevent contradictions (e.g., early-reader can't be R-rated)
}
```

**Where to add:**
- `src/lib/contentConstraints.ts` (new file)
- Call in SimpleBookCreator and BookCustomizer before submission

### 4. Progress Display During Generation
Create UI for showing agent progress:

**Components needed:**
- `GenerationProgress.tsx` - Shows current phase and step
- Phase indicators: Foundation → Structure → Drafting → Revision → Image → Output
- Agent-level progress within each phase
- Estimated time remaining
- Cancel/pause functionality

### 5. API Service Integration
Update service layer to call Orchestrator AI:

```typescript
interface OrchestratorAIService {
  // Start generation job
  startBookGeneration(request: BookRequest): Promise<{ jobId: string }>;

  // Poll for progress
  getJobProgress(jobId: string): Promise<JobProgress>;

  // Get final result
  getJobResult(jobId: string): Promise<BookResult>;

  // Series management
  listSeriesBibles(): Promise<SeriesBible[]>;
  getSeriesBible(id: string): Promise<SeriesBible>;
}
```

### 6. Book Result Display
Enhance BookLibrary to show:
- Full manuscript viewer (chapters navigation)
- Cover image display
- Download in multiple formats (PDF, EPUB, DOCX)
- Generation metadata (agents used, time taken)
- Series bible viewer (for series books)

### 7. Disabled Format Handling
Picture Book format is disabled in V1. Update UI:
- Show "Coming Soon" badge on Picture Book option
- Disable selection or show modal explaining V2 feature

---

## Orchestrator AI Work Required

### 1. Agent Implementation (23 agents)

#### Orchestration Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Book Orchestrator | Qwen3 72B | P0 - Core |
| Series Orchestrator | Qwen3 72B | P1 - After single book works |
| Continuity Keeper | DeepSeek | P0 - Core |

#### Foundation Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Premise Architect | Qwen3 72B | P0 |
| Genre Analyst | DeepSeek | P0 |
| World Builder | Qwen3 72B | P0 |
| Character Architect | Qwen3 72B | P0 |
| Relationship Mapper | DeepSeek | P0 |
| Plot Architect | DeepSeek | P0 |

#### Structure Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Theme Weaver | Qwen3 72B | P0 |
| Chapter Planner | DeepSeek | P0 |
| Scene Outliner | Qwen3 32B | P0 |
| Setup-Payoff Tracker | DeepSeek | P0 |

#### Writing Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Prose Writer | Qwen3 72B | P0 |
| Dialogue Writer | Qwen3 72B | P1 - Adaptive |
| Action Writer | Qwen3 72B/Dolphin | P1 - Adaptive |
| Emotion Writer | Qwen3 72B | P1 - Adaptive |
| Atmosphere Writer | Qwen3 72B | P0 |

#### Quality Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Voice Diversifier | DeepSeek | P1 |
| Pacing Analyst | DeepSeek | P1 |
| Cliché Hunter | Dolphin 70B | P1 |
| Line Editor | Qwen3 72B | P1 |
| Beta Reader Simulator | Different model | P2 |
| Setup-Payoff Tracker (verify) | DeepSeek | P1 |

#### Image Agents
| Agent | Model | Priority |
|-------|-------|----------|
| Cover Prompt Generator | Qwen3 72B | P2 |

### 2. Data Structures to Implement

```
BookProject
├── input (from frontend)
├── derived (constraints, agent modes)
├── foundation (premise, world, characters, plot)
├── structure (chapters, scenes, themes)
├── drafts (scene drafts, chapter drafts)
├── revision (notes, reports)
├── output (manuscript, cover)
└── meta (phase, progress, errors)
```

Key interfaces from architecture:
- `BookProject`
- `SceneCard`
- `CharacterSheet`
- `SeriesBible`
- `ContentConstraints`

### 3. Workflow Engine
Implement the 6-phase execution flow:

```
INPUT PROCESSING → FOUNDATION → STRUCTURE → DRAFTING → REVISION → IMAGE → OUTPUT
```

Features needed:
- Phase transitions with checkpoints
- Parallel execution where noted (World Builder + Character Architect)
- Iterative refinement (retry up to 2x if quality < 7/10)
- Adaptive agent activation based on scene type

### 4. API Endpoints for Frontend

```
POST /api/books/generate
  - Accepts BookRequest
  - Returns { jobId: string }

GET /api/jobs/{jobId}/progress
  - Returns current phase, step, percentage, ETA

GET /api/jobs/{jobId}/result
  - Returns completed BookResult or error

GET /api/series
  - Returns list of user's series bibles

GET /api/series/{id}
  - Returns specific series bible

POST /api/series
  - Creates new series (from Book 1 output)
```

### 5. Model Management
- Configure Ollama with required models
- Implement model selection per agent
- Handle fallback chain for quality issues
- Manage context windows and token limits

---

## API Contract

### BookRequest (Frontend → Orchestrator AI)

```typescript
interface BookRequest {
  // Required
  genres: string[];
  format: BookFormat;
  targetWordCount: number;
  contentRating: ContentRating;
  pov: NarrativePerspective;
  happyEnding: boolean;
  includeTwist: boolean;
  romanticSubplot: boolean;

  // Optional (user input)
  title?: string;
  description?: string;
  plotOutline?: string;
  characterDetails?: string;
  settingDetails?: string;
  themes?: string;
  avoidList?: string[];
  specialRequests?: string;
  inspirations?: Inspiration[];

  // Series (optional)
  seriesMode?: boolean;
  seriesPosition?: number;
  seriesName?: string;
  seriesBibleId?: string;
  seriesArc?: string;
}
```

### JobProgress (Orchestrator AI → Frontend)

```typescript
interface JobProgress {
  jobId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  currentPhase: 'foundation' | 'structure' | 'drafting' | 'revision' | 'image' | 'output';
  currentStep: string;
  percentComplete: number;
  estimatedTimeRemaining?: number; // seconds
  errors?: string[];
}
```

### BookResult (Orchestrator AI → Frontend)

```typescript
interface BookResult {
  id: string;
  title: string;
  manuscript: string;
  wordCount: number;
  chapterCount: number;

  // Metadata
  generationTime: number; // seconds
  agentsUsed: string[];

  // Cover
  coverPrompt?: string;
  coverImage?: string; // URL or base64

  // Series
  seriesBibleId?: string;

  // Artifacts (optional, for debugging/transparency)
  artifacts?: {
    premise?: string;
    worldBible?: string;
    characterSheets?: string;
    plotOutline?: string;
  };
}
```

---

## Things NOT to Implement (V1)

Per the architecture document, these are explicitly deferred to V2+:

| Feature | Reason |
|---------|--------|
| Picture Book format | Requires illustration pipeline |
| DALL-E/Midjourney integration | Sticking with local SD for V1 |
| Human-in-the-loop checkpoints | Optional feature for later |
| A/B cover testing | Nice-to-have |
| Publishing platform export | KDP, IngramSpark integration |
| Audiobook script generation | TTS formatting |
| Translation pipeline | Multi-language output |

---

## Implementation Priority

### Phase 1: MVP (Frontend + Core Backend)
1. **Frontend:** Series mode UI
2. **Frontend:** Content constraints logic
3. **Frontend:** Generation progress display
4. **Backend:** Core orchestration (Book Orchestrator)
5. **Backend:** Foundation agents (all 6)
6. **Backend:** Structure agents (all 4)
7. **Backend:** Core writing agents (Prose + Atmosphere)
8. **Backend:** Basic API endpoints

### Phase 2: Quality + Polish
1. **Backend:** Adaptive writing agents (Dialogue, Action, Emotion)
2. **Backend:** Quality agents (all 6)
3. **Backend:** Iterative refinement loop
4. **Frontend:** Enhanced result display
5. **Frontend:** Download in multiple formats

### Phase 3: Series + Images
1. **Backend:** Series Orchestrator
2. **Backend:** Series Bible management
3. **Backend:** Cover Prompt Generator
4. **Backend:** Stable Diffusion integration
5. **Frontend:** Series management UI
6. **Frontend:** Cover display and selection

---

## File Locations

### Frontend (this repo)
```
src/
├── components/
│   ├── SeriesFields.tsx          # NEW: Series mode inputs
│   ├── GenerationProgress.tsx    # NEW: Progress display
│   └── ManuscriptViewer.tsx      # NEW: Chapter navigation
├── lib/
│   └── contentConstraints.ts     # NEW: Rating enforcement
├── services/
│   └── orchestratorAIService.ts  # NEW: API client
└── types/
    └── index.ts                  # ADD: Series types, JobProgress
```

### Orchestrator AI (separate project)
```
agents/
├── orchestration/
│   ├── book_orchestrator.py
│   ├── series_orchestrator.py
│   └── continuity_keeper.py
├── foundation/
│   ├── premise_architect.py
│   ├── genre_analyst.py
│   ├── world_builder.py
│   ├── character_architect.py
│   ├── relationship_mapper.py
│   └── plot_architect.py
├── structure/
│   ├── theme_weaver.py
│   ├── chapter_planner.py
│   ├── scene_outliner.py
│   └── setup_payoff_tracker.py
├── writing/
│   ├── prose_writer.py
│   ├── dialogue_writer.py
│   ├── action_writer.py
│   ├── emotion_writer.py
│   └── atmosphere_writer.py
├── quality/
│   ├── voice_diversifier.py
│   ├── pacing_analyst.py
│   ├── cliche_hunter.py
│   ├── line_editor.py
│   └── beta_reader_simulator.py
└── image/
    └── cover_prompt_generator.py

models/
├── ollama_config.py
└── model_router.py

api/
├── routes.py
└── schemas.py

data/
├── series_bibles/
└── generated_books/
```

---

## Next Steps

1. Review this plan and confirm alignment with expectations
2. Decide on Phase 1 scope and timeline
3. Set up Orchestrator AI project structure
4. Begin frontend Series Mode implementation
5. Begin backend Book Orchestrator implementation
