import { describe, it, expect } from 'vitest';
import { createBookProject } from '../src/types/project.js';
import type { BookRequest } from '../src/types/shared.js';

function makeRequest(overrides: Partial<BookRequest['settings']> = {}): BookRequest {
  return {
    settings: {
      description: 'A test book',
      rating: 'PG-13',
      ...overrides,
    },
  };
}

describe('createBookProject', () => {
  it('creates a project with correct request', () => {
    const request = makeRequest();
    const project = createBookProject(request);
    expect(project.request).toBe(request);
  });

  it('derives content rating from settings', () => {
    const project = createBookProject(makeRequest({ rating: 'R' }));
    expect(project.derived.contentRating).toBe('R');
  });

  it('defaults content rating to PG-13 when not set', () => {
    const project = createBookProject(makeRequest({ rating: undefined }));
    expect(project.derived.contentRating).toBe('PG-13');
  });

  it('derives target word count from targetWordCount', () => {
    const project = createBookProject(makeRequest({ targetWordCount: 120000 }));
    expect(project.derived.targetWordCount).toBe(120000);
  });

  it('falls back to length for word count', () => {
    const project = createBookProject(makeRequest({ length: 60000 }));
    expect(project.derived.targetWordCount).toBe(60000);
  });

  it('defaults word count to 50000', () => {
    const project = createBookProject(makeRequest());
    expect(project.derived.targetWordCount).toBe(50000);
  });

  it('initializes empty foundation', () => {
    const project = createBookProject(makeRequest());
    expect(project.foundation).toEqual({});
  });

  it('initializes empty structure', () => {
    const project = createBookProject(makeRequest());
    expect(project.structure).toEqual({});
  });

  it('initializes empty drafts with Maps', () => {
    const project = createBookProject(makeRequest());
    expect(project.drafts.scenes).toBeInstanceOf(Map);
    expect(project.drafts.chapters).toBeInstanceOf(Map);
    expect(project.drafts.scenes.size).toBe(0);
    expect(project.drafts.chapters.size).toBe(0);
  });

  it('initializes empty revision', () => {
    const project = createBookProject(makeRequest());
    expect(project.revision).toEqual({});
  });

  it('initializes empty output', () => {
    const project = createBookProject(makeRequest());
    expect(project.output).toEqual({});
  });

  it('initializes meta with startedAt and empty arrays', () => {
    const project = createBookProject(makeRequest());
    expect(project.meta.startedAt).toBeInstanceOf(Date);
    expect(project.meta.agentsRun).toEqual([]);
    expect(project.meta.tokensUsed).toBe(0);
    expect(project.meta.errors).toEqual([]);
    expect(project.meta.phaseDurations).toEqual({});
  });

  it('merges avoidContent from settings into avoidList', () => {
    const project = createBookProject(makeRequest({ avoidContent: 'gore' }));
    expect(project.derived.avoidList).toContain('gore');
  });

  it('merges autoAvoidContent from content constraints', () => {
    const request: BookRequest = {
      settings: { description: 'test' },
      contentConstraints: {
        allowedRatings: ['G', 'PG'],
        defaultRating: 'PG',
        autoAvoidContent: ['explicit violence', 'profanity'],
        formatWarnings: [],
      },
    };
    const project = createBookProject(request);
    expect(project.derived.avoidList).toContain('explicit violence');
    expect(project.derived.avoidList).toContain('profanity');
  });

  it('defaults audience style to adult', () => {
    const project = createBookProject(makeRequest());
    expect(project.derived.audienceStyle).toBe('adult');
  });

  it('initializes default content constraints when not provided', () => {
    const project = createBookProject(makeRequest());
    expect(project.derived.contentConstraints.allowedRatings).toEqual(['G', 'PG', 'PG-13', 'R', 'X']);
    expect(project.derived.contentConstraints.defaultRating).toBe('PG-13');
  });
});
