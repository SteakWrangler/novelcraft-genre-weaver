# Novel Craft Genre Weaver - V1 Architecture

## Overview

This document outlines the complete architecture for an AI-powered book generation pipeline. The system uses a multi-agent approach where specialized agents handle different aspects of the writing process, from initial premise development through final manuscript polish.

**Core Principles:**
- Local-first: Runs on Ollama models (Qwen3 72B, DeepSeek, Dolphin 70B)
- Cost-effective: Near-zero marginal cost per book after hardware investment
- Quality-focused: Multiple revision passes and quality checks
- Flexible: Handles minimal input (title + genre) through fully specified outlines

---

## Supported Formats (V1)

| Format | Status | Notes |
|--------|--------|-------|
| Novel | ✅ Supported | Full pipeline |
| Middle Grade | ✅ Supported | Novel pipeline + age-appropriate constraints |
| Early Reader | ✅ Supported | Simplified pipeline, no illustrations |
| Short Stories | ✅ Supported | Loop over multiple story instances |
| Poetry | ✅ Supported | Different pipeline, may need refinement |
| Picture Book | ❌ Disabled | Requires illustration pipeline (future V2) |

---

## Agent Roster

### Orchestration Agents (3)

| Agent | Purpose | Model | Scope |
|-------|---------|-------|-------|
| **Series Orchestrator** | Manages multi-book continuity, maintains Series Bible | Qwen3 72B | Series-wide (optional) |
| **Book Orchestrator** | Manages single-book workflow, routes tasks, determines agent modes | Qwen3 72B | Full book |
| **Continuity Keeper** | Maintains master fact log, validates consistency, tracks timeline | DeepSeek | Full book |

### Foundation Agents (6)

| Agent | Purpose | Model | Mode |
|-------|---------|-------|------|
| **Premise Architect** | Expands seed idea into full premise (hook, conflict, stakes, theme) | Qwen3 72B | GENERATE or EXPAND |
| **Genre Analyst** | Establishes conventions, pacing norms, tropes for selected genre(s) | DeepSeek | Always GENERATE |
| **World Builder** | Creates setting, rules, geography, culture, magic systems, history | Qwen3 72B | GENERATE or EXPAND |
| **Character Architect** | Develops full character profiles with backstory, motivation, flaw, arc, voice | Qwen3 72B | GENERATE or EXPAND |
| **Relationship Mapper** | Maps character dynamics, conflicts, alliances, evolution; handles romantic subplot | DeepSeek | Always GENERATE |
| **Plot Architect** | Creates story structure, major beats, act breaks; handles twist setup if enabled | DeepSeek | GENERATE or EXPAND |

### Structure Agents (4)

| Agent | Purpose | Model |
|-------|---------|-------|
| **Theme Weaver** | Maps where themes should surface throughout the plot | Qwen3 72B |
| **Chapter Planner** | Breaks plot into chapters with goals, POV, pacing, hooks | DeepSeek |
| **Scene Outliner** | Breaks chapters into scenes with purpose, conflict, entry/exit | Qwen3 32B |
| **Setup-Payoff Tracker** | Logs all setups (objects, hints, questions); verifies payoffs exist | DeepSeek |

### Writing Agents (5)

| Agent | Purpose | Model | Activation |
|-------|---------|-------|------------|
| **Prose Writer** | Writes core narrative prose from scene outlines | Qwen3 72B | Always |
| **Dialogue Writer** | Writes/polishes conversation with distinct character voices | Qwen3 72B | Adaptive |
| **Action Writer** | Handles action sequences with clarity and momentum | Qwen3 72B or Dolphin | Adaptive |
| **Emotion Writer** | Deepens emotional beats, interiority, vulnerable moments | Qwen3 72B | Adaptive |
| **Atmosphere Writer** | Adds sensory details, mood setting, environmental description | Qwen3 72B | Always |

### Quality Agents (6)

| Agent | Purpose | Model |
|-------|---------|-------|
| **Voice Diversifier** | Ensures characters sound distinct, not homogeneous | DeepSeek |
| **Pacing Analyst** | Identifies drag/rush, suggests structural fixes | DeepSeek |
| **Cliché Hunter** | Flags generic phrasing, AI-isms, overused tropes | Dolphin 70B |
| **Line Editor** | Prose polish, sentence variety, word choice, repetition | Qwen3 72B |
| **Beta Reader Simulator** | Reads as reader, flags confusion/boredom/disbelief | Different model than writer |
| **Setup-Payoff Tracker** | Final verification that all setups are paid off | DeepSeek |

### Image Agents (1)

| Agent | Purpose | Model |
|-------|---------|-------|
| **Cover Prompt Generator** | Creates Stable Diffusion prompt from book metadata | Qwen3 72B |

**Total: 23 agents** (with several being adaptive/conditional)

---

## Model Recommendations

| Model | Best For |
|-------|----------|
| **Qwen3 72B** | Creative writing, prose, dialogue, emotional content, premise development |
| **DeepSeek** | Structural tasks, logic, continuity, plot architecture, pacing analysis |
| **Dolphin 70B** | Uncensored content, humor, cliché detection, edgy/mature themes |
| **Qwen3 32B** | Fast iteration tasks, scene outlining, quick evaluations |

> **AMENDMENT (March 2026):** These were planning targets for local Ollama deployment. The backend was built using **Ollama Cloud** instead. Actual models in use:
>
> | Role | Cloud Model | Replaces |
> |------|------------|----------|
> | creative | `kimi-k2:1t-cloud` | Qwen3 72B |
> | structural | `deepseek-v3.1:671b-cloud` | DeepSeek |
> | uncensored | `qwen3.5:397b-cloud` | Dolphin 70B |
> | fast | `gpt-oss:20b-cloud` | Qwen3 32B |
> | evaluator | `gpt-oss:120b-cloud` | (new role) |
>
> Key discoveries during testing:
> - `qwen3:235b-cloud` (original creative model) was removed from Ollama Cloud
> - `qwen3.5:cloud` (default tag) returns 404 — must use `qwen3.5:397b-cloud`
> - `character-architect` needs `maxTokens: 16384` to avoid truncating multi-character JSON
>
> See `server/src/config.ts` for the authoritative configuration.

---

## Input Processing

### User Input Fields

| Field | Required | Max Length | Used By |
|-------|----------|------------|---------|
| Title | Simple: Yes, Advanced: No | 200 chars | All agents |
| Genre(s) | Yes | 1-5 selections | Genre Analyst, all writing agents |
| Book Format | Yes | Selection | Orchestrator (pipeline selection) |
| Pages/Word Count | Yes | Preset options | Chapter Planner, all writing agents |
| Content Rating | Yes | G/PG/PG-13/R/X | Frontend constraint, all writing agents |
| Description | No | 1,000 chars | Premise Architect |
| Plot Outline | No | 2,000 chars | Plot Architect |
| Character Details | No | 2,000 chars | Character Architect |
| Setting & World | No | 1,500 chars | World Builder |
| Themes & Messages | No | 1,000 chars | Theme Weaver, Premise Architect |
| Narrative Perspective | Yes | 1st/3rd/Multi | All writing agents |
| Happy Ending | Yes | Boolean | Plot Architect |
| Include Big Twist | Yes | Boolean | Plot Architect, Setup-Payoff Tracker |
| Romantic Subplot | Yes | Boolean | Relationship Mapper, Plot Architect |
| Content to Avoid | No | 1,000 chars | All writing agents |
| Special Requests | No | 1,500 chars | Orchestrator (routes to relevant agents) |
| Inspirations | No | Up to 72 | Premise Architect, Plot Architect, World Builder |

### Series Fields (when series mode enabled)

| Field | Purpose |
|-------|---------|
| seriesMode | Boolean flag to enable Series Orchestrator |
| seriesPosition | Book number (1, 2, 3...) |
| seriesName | Name of the series |
| seriesBibleId | Reference to existing Series Bible (Book 2+) |
| seriesArc | Optional overall series arc description |

### Agent Mode Logic

Each foundation agent operates in one of two modes based on user input:

```
GENERATE Mode: User provided little/no input for this aspect
  → Agent creates from scratch using other context

EXPAND Mode: User provided substantial input
  → Agent formalizes and fills gaps
```

**Decision logic:**
```
If field has > 200 characters of content:
  → EXPAND mode (use as foundation, fill gaps)
Else if field has any content:
  → HYBRID mode (use as anchor, generate rest)
Else:
  → GENERATE mode (create from scratch)
```

---

## Content Rating Enforcement

Content constraints are handled by the **frontend**, not a dedicated agent.

### Frontend Logic

```typescript
function deriveContentConstraints(format: BookFormat, rating: ContentRating): ContentConstraints {
  const constraints: ContentConstraints = {
    rating,
    avoidList: [],
    locked: false
  };

  // Format-based locks
  if (format === 'early-reader') {
    constraints.rating = 'G';
    constraints.locked = true;
    constraints.avoidList.push(
      'graphic violence',
      'death of children',
      'sexual content',
      'profanity',
      'scary imagery',
      'complex moral ambiguity'
    );
  }

  if (format === 'middle-grade') {
    if (rating > 'PG-13') constraints.rating = 'PG-13';
    constraints.avoidList.push(
      'explicit violence',
      'sexual content',
      'heavy profanity'
    );
  }

  // Rating-based additions
  if (constraints.rating === 'G') {
    constraints.avoidList.push('mild profanity', 'romantic content beyond hand-holding');
  }
  
  if (constraints.rating === 'PG') {
    constraints.avoidList.push('graphic violence', 'sexual content');
  }

  return constraints;
}
```

### Enforcement Points

1. **Frontend:** Locks ratings, auto-populates avoid list, prevents contradictions
2. **Style Profile:** Content constraints baked into profile passed to all agents
3. **Revision:** Beta Reader Simulator includes validation check for constraint violations

---

## Execution Flow

```
╔═════════════════════════════════════════════════════════════════╗
║                      INPUT PROCESSING                           ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  1. Parse user inputs                                           ║
║  2. Derive audience style from format + rating                  ║
║  3. Apply content constraints (frontend-enforced)               ║
║  4. Merge user avoid list + auto-generated constraints          ║
║  5. Determine series mode                                       ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              SERIES ORCHESTRATOR (if series mode)               │
│                                                                 │
│  Book 1: Initialize Series Bible                                │
│  Book 2+: Load existing Series Bible, pass as context           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BOOK ORCHESTRATOR                          │
│                                                                 │
│  1. Determine which agents need GENERATE vs EXPAND mode         │
│  2. Manage phase transitions                                    │
│  3. Handle iterative refinement loops                           │
│  4. Route tasks to appropriate agents                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 1: FOUNDATION                                            ║
║  Goal: Establish everything before writing                      ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  1.1  Premise Architect                                         ║
║         Mode: GENERATE (if only title/genre)                    ║
║               EXPAND (if description provided)                  ║
║         Uses: title, genres, description, inspirations, themes  ║
║                          │                                      ║
║                          ▼                                      ║
║  1.2  Genre Analyst                                             ║
║         Uses: genres (always runs, always generates)            ║
║         Output: Genre conventions, pacing expectations, tropes  ║
║                          │                                      ║
║         ┌────────────────┴────────────────┐                     ║
║         ▼                                 ▼                     ║
║  1.3  World Builder              1.4  Character Architect       ║
║        (parallel)                      (parallel)               ║
║         │                                 │                     ║
║         └────────────────┬────────────────┘                     ║
║                          ▼                                      ║
║  1.5  Integration Pass (Orchestrator syncs world + characters)  ║
║                          │                                      ║
║                          ▼                                      ║
║  1.6  Relationship Mapper                                       ║
║         Uses: characters, romanticSubplot flag                  ║
║                          │                                      ║
║                          ▼                                      ║
║  1.7  Plot Architect                                            ║
║         Uses: plotOutline, premise, characters, world,          ║
║               happyEnding, includeTwist, inspirations           ║
║                                                                 ║
║  Output: Premise Doc, Genre Profile, World Bible,               ║
║          Character Sheets, Relationship Map, Plot Skeleton      ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 2: STRUCTURE                                             ║
║  Goal: Break story into executable units                        ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  2.1  Theme Weaver                                              ║
║         Uses: themes (user-provided or derived from premise)    ║
║         Output: Theme map (where themes surface in plot)        ║
║                          │                                      ║
║                          ▼                                      ║
║  2.2  Chapter Planner                                           ║
║         Uses: plot, targetWordCount, pov                        ║
║         Output: Chapter breakdown with word targets             ║
║                          │                                      ║
║                          ▼                                      ║
║  2.3  Scene Outliner (parallelizable across chapters)           ║
║         Output: Scene cards for all scenes                      ║
║                          │                                      ║
║                          ▼                                      ║
║  2.4  Setup-Payoff Tracker (initialize)                         ║
║         Logs: All setups from plot (especially if twist)        ║
║                          │                                      ║
║                          ▼                                      ║
║  2.5  Continuity Keeper (initialize)                            ║
║         Creates: Master fact log, timeline                      ║
║                                                                 ║
║  Output: Theme Map, Chapter Plans, Scene Cards,                 ║
║          Setup Log, Continuity Log, Timeline                    ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 3: DRAFTING                                              ║
║  Goal: Generate actual prose                                    ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Context passed to ALL writing agents:                          ║
║    - Audience style (derived from format + rating)              ║
║    - Content rating + avoid list                                ║
║    - POV constraint                                             ║
║    - Character voice profiles                                   ║
║    - Relevant world details                                     ║
║                                                                 ║
║  For each chapter:                                              ║
║  ┌────────────────────────────────────────────────────────┐     ║
║  │  For each scene:                                        │     ║
║  │                                                         │     ║
║  │    3.1  Prose Writer                                    │     ║
║  │           Input: Scene card + character voices +        │     ║
║  │                  previous scene ending + world details  │     ║
║  │           Output: Raw scene draft                       │     ║
║  │                        │                                │     ║
║  │                        ▼                                │     ║
║  │    3.2  Specialist Pass (ADAPTIVE based on scene type)  │     ║
║  │           Scene has action? → Action Writer             │     ║
║  │           Scene is emotional? → Emotion Writer          │     ║
║  │           Scene dialogue-heavy? → Dialogue Writer       │     ║
║  │                        │                                │     ║
║  │                        ▼                                │     ║
║  │    3.3  Atmosphere Writer                               │     ║
║  │           Adds sensory details, sets mood               │     ║
║  │                        │                                │     ║
║  │                        ▼                                │     ║
║  │    3.4  Continuity Keeper                               │     ║
║  │           Validates against master log                  │     ║
║  │           Adds new facts to log                         │     ║
║  │           Flags issues for revision                     │     ║
║  │                        │                                │     ║
║  │                        ▼                                │     ║
║  │    3.5  Setup-Payoff Tracker                            │     ║
║  │           Logs any new setups introduced                │     ║
║  │                                                         │     ║
║  │  End scene loop                                         │     ║
║  │                        │                                │     ║
║  │                        ▼                                │     ║
║  │    3.6  Chapter Assembly                                │     ║
║  │           Smooth transitions between scenes             │     ║
║  │           Verify chapter arc complete                   │     ║
║  │           Check end hook present                        │     ║
║  │                                                         │     ║
║  └────────────────────────────────────────────────────────┘     ║
║                                                                 ║
║  Iterative Refinement:                                          ║
║    After each scene, quick eval (7/10 threshold)                ║
║    If below: retry with feedback (up to 2 retries)              ║
║    Then move on regardless                                      ║
║                                                                 ║
║  Parallelization Strategy:                                      ║
║    Chapters 1-3: Sequential (establish voice/tone)              ║
║    After: Batch parallelize 2-3 chapters, then smooth edges     ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 4: REVISION                                              ║
║  Goal: Elevate to publishable quality                           ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  4.1  Structural Checks (full manuscript)                       ║
║         ├── Pacing Analyst                                      ║
║         │     Flags slow sections, rushed sections              ║
║         │     Suggests cuts or expansions                       ║
║         │                                                       ║
║         ├── Theme Weaver (verification pass)                    ║
║         │     Verifies themes land appropriately                ║
║         │     Strengthens weak thematic moments                 ║
║         │                                                       ║
║         └── Setup-Payoff Tracker (verification)                 ║
║               Confirms all setups have payoffs                  ║
║               Flags orphaned setups for removal or payoff       ║
║                          │                                      ║
║                          ▼                                      ║
║  4.2  Line-Level Checks (per chapter, parallelizable)           ║
║         ├── Voice Diversifier                                   ║
║         │     Ensures characters sound distinct                 ║
║         │     Flags homogeneous dialogue                        ║
║         │                                                       ║
║         ├── Cliché Hunter                                       ║
║         │     Flags generic phrasing                            ║
║         │     Identifies AI-isms ("I couldn't help but...")     ║
║         │     Catches overused metaphors                        ║
║         │                                                       ║
║         └── Line Editor                                         ║
║               Sentence variety                                  ║
║               Word choice refinement                            ║
║               Repetition removal                                ║
║               Flow improvement                                  ║
║                          │                                      ║
║                          ▼                                      ║
║  4.3  Beta Reader Simulator (full manuscript)                   ║
║         Reads from reader perspective                           ║
║         Flags: confusion, boredom, disbelief, delight           ║
║         Generates reader report with specific issues            ║
║         Also validates content rating compliance                ║
║                          │                                      ║
║                          ▼                                      ║
║  4.4  Final Continuity Sweep                                    ║
║         One last check of entire manuscript                     ║
║         Verify all flagged issues resolved                      ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 5: IMAGE GENERATION                                      ║
║  Goal: Generate cover art                                       ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  5.1  Cover Prompt Generator (Ollama)                           ║
║         Input: title, genres, premise, key imagery from book    ║
║         Output: Detailed Stable Diffusion prompt                ║
║                          │                                      ║
║                          ▼                                      ║
║  5.2  Cover Generator (Stable Diffusion - Local)                ║
║         Input: Prompt from step 5.1                             ║
║         Output: 3-4 cover variations                            ║
║                          │                                      ║
║                          ▼                                      ║
║  5.3  (Optional) User selects preferred cover                   ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════╗
║  PHASE 6: OUTPUT                                                ║
╠═════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  6.1  Title Generation (if user left blank)                     ║
║                                                                 ║
║  6.2  Manuscript Assembly                                       ║
║         Compile all chapters                                    ║
║         Add front matter                                        ║
║         Attach cover image                                      ║
║                                                                 ║
║  6.3  Format for output (PDF, EPUB, DOCX)                       ║
║                                                                 ║
║  6.4  Update Series Bible (if series mode)                      ║
║         Add new characters, events, world changes               ║
║         Track unresolved threads                                ║
║         Update timeline                                         ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝
```

---

## Series Orchestrator Detail

The Series Orchestrator wraps the Book Orchestrator to maintain continuity across multiple books.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SERIES ORCHESTRATOR                          │
│                                                                 │
│  Maintains:                                                     │
│    - Series Bible (characters, world, events across books)      │
│    - Series-level arc (if defined)                              │
│    - What's established vs. still flexible                      │
│                                                                 │
│  For Book 1:                                                    │
│    - Runs normal Book Orchestrator                              │
│    - Captures output into Series Bible                          │
│    - Flags elements with "series potential"                     │
│                                                                 │
│  For Book 2+:                                                   │
│    - Loads existing Series Bible                                │
│    - Passes as additional context to all foundation agents      │
│    - Ensures continuity with previous books                     │
│    - Updates Series Bible with new elements                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌─────────┐   ┌─────────┐   ┌─────────┐
     │ Book 1  │   │ Book 2  │   │ Book 3  │
     │ Orch.   │   │ Orch.   │   │ Orch.   │
     └─────────┘   └─────────┘   └─────────┘
```

### Series Bible Contents

```typescript
interface SeriesBible {
  // Metadata
  seriesName: string;
  totalPlannedBooks: number | null;
  seriesArc: string | null;
  
  // Characters
  characters: {
    sheet: CharacterSheet;
    status: 'alive' | 'dead' | 'unknown';
    introducedIn: number;  // Book number
    lastAppearedIn: number;
    arcProgression: string[];  // Per-book arc notes
  }[];
  
  // World
  worldBible: WorldBible;
  worldChanges: {
    bookNumber: number;
    change: string;
  }[];
  
  // Timeline
  timeline: {
    bookNumber: number;
    events: TimelineEvent[];
  }[];
  
  // Continuity
  establishedFacts: FactEntry[];
  unresolvedThreads: {
    thread: string;
    introducedIn: number;
    resolvedIn: number | null;
  }[];
  
  // Relationships
  relationships: {
    characters: [string, string];
    evolution: {
      bookNumber: number;
      status: string;
    }[];
  }[];
}
```

---

## Data Structures

### Core Project State

```typescript
interface BookProject {
  // User Input
  input: {
    title: string | null;
    genres: Genre[];
    format: BookFormat;
    targetWordCount: number;
    contentRating: ContentRating;
    pov: 'first-person' | 'third-person' | 'multiple-pov';
    happyEnding: boolean;
    includeTwist: boolean;
    romanticSubplot: boolean;
    
    // Optional detailed inputs
    description: string | null;
    plotOutline: string | null;
    characterDetails: string | null;
    settingDetails: string | null;
    themes: string | null;
    avoidList: string[];
    specialRequests: string | null;
    inspirations: Inspiration[];
    
    // Series
    seriesMode: boolean;
    seriesPosition: number | null;
    seriesBibleId: string | null;
  };
  
  // Derived
  derived: {
    audienceStyle: 'children' | 'middle-grade' | 'new-adult' | 'adult';
    contentConstraints: ContentConstraints;
    agentModes: Map<AgentName, 'generate' | 'expand'>;
  };
  
  // Foundation outputs
  foundation: {
    premise: PremiseDoc;
    genreProfile: GenreConventions;
    worldBible: WorldBible;
    characters: CharacterSheet[];
    relationships: RelationshipMap;
    plotSkeleton: PlotOutline;
  };
  
  // Structure outputs
  structure: {
    themeMap: ThemeMapping;
    chapterPlans: ChapterPlan[];
    sceneCards: Map<string, SceneCard[]>;  // chapterId -> scenes
    setupLog: SetupEntry[];
    continuityLog: FactEntry[];
    timeline: TimelineEvent[];
  };
  
  // Drafts
  drafts: {
    scenes: Map<string, SceneDraft>;  // sceneId -> draft
    chapters: Map<string, ChapterDraft>;  // chapterId -> draft
  };
  
  // Revision
  revision: {
    structuralNotes: RevisionNote[];
    lineNotes: Map<string, RevisionNote[]>;  // chapterId -> notes
    betaReaderReport: ReaderReport;
  };
  
  // Output
  output: {
    manuscript: string;
    title: string;
    coverPrompt: string;
    coverImage: string | null;  // Path or base64
  };
  
  // Meta
  meta: {
    currentPhase: Phase;
    completedSteps: Step[];
    errors: Error[];
  };
}
```

### Scene Card

```typescript
interface SceneCard {
  id: string;
  chapterId: string;
  position: number;
  
  // Content
  location: string;
  characters: string[];
  purpose: string;
  
  // Structure
  beats: string[];
  conflict: string;
  emotionalNote: string;
  
  // Transitions
  entryHook: string;
  exitHook: string;
  
  // Metadata
  sceneType: ('action' | 'dialogue' | 'emotional' | 'exposition' | 'transition')[];
  wordTarget: number;
  povCharacter: string | null;  // For multiple POV
  
  // Tracking
  setups: string[];  // Things introduced that need payoff
  payoffs: string[];  // Things paid off from earlier
}
```

### Character Sheet

```typescript
interface CharacterSheet {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'ally' | 'mentor' | 'rival' | 'supporting';
  
  // Physical
  age: number | string;
  physicalDescription: string;
  
  // Psychology
  personality: string;
  backstory: string;
  motivation: string;
  flaw: string;
  fear: string;
  
  // Arc
  want: string;  // What they think they want
  need: string;  // What they actually need
  arcStart: string;
  arcEnd: string;
  
  // Voice
  voiceNotes: string;
  speechPatterns: string;
  vocabulary: 'simple' | 'average' | 'sophisticated' | 'technical';
  
  // Relationships
  relationshipNotes: Map<string, string>;  // characterId -> relationship description
}
```

---

## Iterative Refinement

After generating content, agents can retry if quality is below threshold.

### Flow

```
Generate content
       │
       ▼
Quick evaluation (same or different model)
  "Rate this 1-10 on [criteria]. Explain issues."
       │
       ▼
Score >= 7? ───Yes──→ Accept, continue
       │
       No
       │
       ▼
Retry count < 2? ───No──→ Accept best attempt, flag for later
       │
       Yes
       │
       ▼
Retry with feedback
  "Previous attempt scored X. Issues: Y. Try again, addressing: Z"
       │
       └──→ Back to evaluation
```

### Evaluation Criteria by Agent

| Agent | Evaluation Criteria |
|-------|---------------------|
| Prose Writer | Flow, engagement, voice consistency, show-don't-tell |
| Dialogue Writer | Distinct voices, natural conversation, subtext |
| Action Writer | Clarity, momentum, spatial coherence |
| Emotion Writer | Authenticity, earned emotion, not melodramatic |

---

## Adaptive Agent Activation

Not every scene needs every writing agent. The Orchestrator determines which specialists to invoke based on scene metadata.

```typescript
function getAgentsForScene(sceneCard: SceneCard): Agent[] {
  const agents: Agent[] = [ProseWriter, AtmosphereWriter];  // Always run
  
  if (sceneCard.sceneType.includes('action')) {
    agents.push(ActionWriter);
  }
  
  if (sceneCard.sceneType.includes('emotional')) {
    agents.push(EmotionWriter);
  }
  
  if (sceneCard.sceneType.includes('dialogue') || sceneCard.characters.length > 2) {
    agents.push(DialogueWriter);
  }
  
  return agents;
}
```

---

## Estimated Timeline

For an 80,000-word novel on capable local hardware (RTX 3090/4090 + 64GB RAM):

| Phase | Estimated Time |
|-------|----------------|
| Foundation | 1-2 hours |
| Structure | 30-60 minutes |
| Drafting | 4-8 hours |
| Revision | 2-4 hours |
| Image Generation | 5-15 minutes |
| **Total** | **8-15 hours** |

With parallelization optimizations, potentially reducible to 4-6 hours.

---

## Hardware Requirements

### Minimum (runs but slower)
- GPU: RTX 3080 12GB or equivalent
- RAM: 32GB
- Storage: 500GB SSD

### Recommended
- GPU: RTX 3090 24GB or RTX 4090 24GB
- RAM: 64GB
- Storage: 1TB NVMe SSD

### For Parallel Processing
- Multiple GPUs or
- High-end single GPU (4090) with batched requests

### Stable Diffusion (Cover Art)
- Can share GPU with LLM (run sequentially)
- ~4-8GB VRAM for SD 1.5 / SDXL

---

## Future Enhancements (V2+)

| Feature | Description |
|---------|-------------|
| Picture Book Pipeline | Full illustration generation with character consistency |
| Advanced Image Options | DALL-E, Midjourney integration for higher quality |
| Human-in-the-Loop Checkpoints | Optional approval gates between phases |
| A/B Cover Testing | Generate multiple styles, let user pick |
| Export to Publishing Platforms | Direct upload to KDP, IngramSpark, etc. |
| Audiobook Script Generation | Format manuscript for text-to-speech |
| Translation Pipeline | Multi-language output |

---

## Appendix: Genre List

The 29 supported genres:

1. Romance
2. Fantasy
3. Sci-Fi
4. Mystery
5. Thriller
6. Horror
7. Historical Fiction
8. Contemporary Fiction
9. Young Adult
10. Adventure
11. Comedy
12. Drama
13. Western
14. Crime
15. Paranormal
16. Dystopian
17. Literary Fiction
18. Magical Realism
19. Biographical
20. Urban Fantasy
21. Space Opera
22. Cyberpunk
23. Steampunk
24. Post-Apocalyptic
25. Cozy Mystery
26. Psychological Thriller
27. Gothic
28. Satire
29. Alternate History

---

## Appendix: Inspiration Categories

### Tropes (up to 24)
Pre-defined narrative patterns (e.g., "Enemies to Lovers", "Chosen One", "Found Family")

### Settings (up to 24)
Pre-defined locations with atmosphere (e.g., "Victorian London", "Space Station", "Small Town America")

### Plot Starters (up to 24)
Pre-defined hooks with potential directions (e.g., "A librarian discovers books that predict the future")

Each inspiration carries:
- Name
- Description
- Associated genres
- (Settings) Atmosphere
- (Plot Starters) Potential directions
