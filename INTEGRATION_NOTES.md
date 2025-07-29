# Integration Notes for Supabase & OpenAI Implementation

This document tracks design decisions and implementations that will need to be revisited or modified when integrating Supabase (database/auth) and OpenAI APIs (book generation/image creation).

## State Persistence & Data Management

### Current Implementation
- **What:** Using React useState with localStorage persistence for books and inspirations
- **Location:** `src/pages/Index.tsx`, localStorage utilities in `src/lib/storage.ts`
- **Structure:** 
  ```typescript
  interface Book {
    id: string;
    title: string;
    genres: string[];
    content: string;
    settings: BookSettings; // Now properly typed
    createdAt: Date;
    updatedAt: Date;
  }
  ```
- **Storage Keys:** 
  - `novelcraft-books`: Array of Book objects
  - `novelcraft-selected-inspirations`: Array of selected inspirations
- **Implementation:** Automatic save/load on component mount and state changes

### Future Integration Considerations
- **Supabase Impact:** Real-time database sync will replace localStorage
- **Potential Conflicts:** localStorage may conflict with Supabase real-time updates
- **Migration Path:** Current Book interface should map well to Supabase table schema
- **Action Required:** Remove localStorage persistence, replace with Supabase queries

---

## Service Layer Architecture

### Current Implementation
- **What:** Complete service abstraction layer with mock implementations and React hooks
- **Location:** 
  - Services: `src/services/mockBookService.ts`, `src/services/mockInspirationService.ts`, `src/services/mockAIService.ts`
  - Factory: `src/services/serviceFactory.ts`
  - Hooks: `src/hooks/useBooks.ts`, `src/hooks/useInspirations.ts`, `src/hooks/useAIGeneration.ts`
- **Purpose:** Clean separation between UI components and data operations
- **Structure:**
  ```typescript
  // Service interfaces defined in types/index.ts
  interface BookService {
    createBook(bookData: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book>;
    getBooks(): Promise<Book[]>;
    // ... other methods
  }
  
  // Factory pattern for easy service swapping
  const bookService = ServiceFactory.getBookService();
  
  // React hooks for component integration
  const { books, createBook, loading } = useBooks();
  ```

### Future Integration Benefits
- **Service Swapping:** Change `USE_MOCK_SERVICES` flag in serviceFactory.ts to switch to real APIs
- **Supabase Integration:** Create `SupabaseBookService` implementing same `BookService` interface
- **OpenAI Integration:** Create `OpenAIGenerationService` implementing `AIGenerationService` interface
- **Zero Component Changes:** All components use hooks, no direct service dependencies
- **Progress Tracking:** AI generation includes real-time progress updates ready for streaming APIs

---

## Progress Tracking System

### Current Implementation
- **What:** Multi-step progress UI for simulated book generation
- **Location:** Components with generation flows
- **Current Steps:** Mock 3-5 second delays with progress updates

### Future Integration Mapping
- **OpenAI Streaming:** Progress will map to actual AI generation steps
- **Multi-Agent System:** Each agent step will correspond to a progress stage
- **Webhook Integration:** Long-running operations will need real progress tracking
- **Action Required:** Connect progress states to actual AI generation pipeline

---

## Error Handling Framework

### Current Implementation
- **What:** Basic error boundaries and toast notifications
- **Location:** Throughout components, centralized error handling to be added
- **Current Scope:** Form validation, user input errors

### Future Extension Needs
- **API Error Handling:** Network failures, rate limits, API key issues
- **Supabase Errors:** Database connection, permission errors
- **OpenAI Specific:** Token limits, content policy violations, generation failures
- **Action Required:** Extend error types and handling strategies

---

## Book Generation Workflow

### Current Implementation
- **What:** Simulated multi-step generation with fake delays
- **UI Components:** Progress indicators, cancellation options
- **Data Flow:** User inputs → Mock processing → Generated book object

### Future Real Implementation
- **Multi-Agent Orchestration:** Each UI step maps to actual agent tasks
- **Alternative Sequential Prompting:** UI progress matches prompt sequence
- **Real-time Updates:** WebSocket or polling for generation progress
- **Content Streaming:** Partial results displayed as they're generated

---

## Content Management

### Current Implementation
- **What:** Static arrays of tropes, genres, settings in component files
- **Location:** Hardcoded in `BookInspiration.tsx`, `GenreSelector.tsx`
- **Expansion:** Adding more content directly to component arrays

### Future Database Integration
- **Supabase Tables:** Content will move to database tables for easier management
- **Admin Interface:** Content management through database updates
- **User Customization:** Users may add custom tropes/settings to their account
- **Action Required:** Migrate static content to database schema, create content management system

---

## Updates Log

- **Date Created:** Initial setup with localStorage persistence and service architecture planning
- **Next Review:** When starting Supabase integration