import { describe, it, expect } from 'vitest';
import { getAgent, getAllAgents, getAgentsByCategory } from '../src/agents/registry.js';
import type { AgentConfig } from '../src/agents/types.js';

describe('getAllAgents', () => {
  const agents = getAllAgents();

  it('returns 25 agents', () => {
    expect(agents.length).toBe(25);
  });

  it('every agent has a non-empty name', () => {
    for (const a of agents) {
      expect(a.name).toBeTruthy();
      expect(typeof a.name).toBe('string');
    }
  });

  it('every agent has a non-empty displayName', () => {
    for (const a of agents) {
      expect(a.displayName).toBeTruthy();
    }
  });

  it('all agent names are unique', () => {
    const names = agents.map(a => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every agent has a valid category', () => {
    const validCategories = ['orchestration', 'foundation', 'structure', 'writing', 'quality', 'image'];
    for (const a of agents) {
      expect(validCategories).toContain(a.category);
    }
  });

  it('every agent has a valid model role', () => {
    const validRoles = ['creative', 'structural', 'uncensored', 'fast', 'evaluator'];
    for (const a of agents) {
      expect(validRoles).toContain(a.model.role);
      if (a.model.fallback) {
        expect(validRoles).toContain(a.model.fallback);
      }
    }
  });

  it('every agent has a valid output format', () => {
    for (const a of agents) {
      expect(['json', 'text']).toContain(a.output.format);
    }
  });

  it('every agent has a storeAs path', () => {
    for (const a of agents) {
      expect(a.output.storeAs).toBeTruthy();
    }
  });

  it('every agent has buildSystemPrompt and buildUserPrompt functions', () => {
    for (const a of agents) {
      expect(typeof a.buildSystemPrompt).toBe('function');
      expect(typeof a.buildUserPrompt).toBe('function');
    }
  });

  it('every agent has an activation config', () => {
    for (const a of agents) {
      expect(typeof a.activation.alwaysRun).toBe('boolean');
    }
  });

  it('agents with mode config have valid fields', () => {
    for (const a of agents) {
      if (a.mode) {
        expect(a.mode.supported.length).toBeGreaterThan(0);
        expect(typeof a.mode.inputField).toBe('string');
        expect(typeof a.mode.expandThreshold).toBe('number');
        expect(a.mode.expandThreshold).toBeGreaterThan(0);
      }
    }
  });

  it('agents with evaluation config have valid fields', () => {
    for (const a of agents) {
      if (a.evaluation) {
        expect(typeof a.evaluation.enabled).toBe('boolean');
        expect(a.evaluation.criteria.length).toBeGreaterThan(0);
        expect(a.evaluation.threshold).toBeGreaterThanOrEqual(0);
        expect(a.evaluation.threshold).toBeLessThanOrEqual(10);
      }
    }
  });
});

describe('getAgent', () => {
  it('retrieves a known agent by name', () => {
    const agent = getAgent('premise-architect');
    expect(agent.name).toBe('premise-architect');
    expect(agent.displayName).toBe('Premise Architect');
    expect(agent.category).toBe('foundation');
  });

  it('retrieves agents from different categories', () => {
    expect(getAgent('prose-writer').category).toBe('writing');
    expect(getAgent('cliche-hunter').category).toBe('quality');
    expect(getAgent('chapter-planner').category).toBe('structure');
    expect(getAgent('cover-prompt-generator').category).toBe('image');
  });

  it('throws for unknown agent name', () => {
    expect(() => getAgent('nonexistent-agent')).toThrow('Agent not found: nonexistent-agent');
  });

  it('throws for empty agent name', () => {
    expect(() => getAgent('')).toThrow('Agent not found: ');
  });
});

describe('getAgentsByCategory', () => {
  it('returns 6 foundation agents', () => {
    expect(getAgentsByCategory('foundation').length).toBe(6);
  });

  it('returns 4 structure agents', () => {
    expect(getAgentsByCategory('structure').length).toBe(4);
  });

  it('returns 3 orchestration agents', () => {
    expect(getAgentsByCategory('orchestration').length).toBe(3);
  });

  it('returns 5 writing agents', () => {
    expect(getAgentsByCategory('writing').length).toBe(5);
  });

  it('returns 6 quality agents', () => {
    expect(getAgentsByCategory('quality').length).toBe(6);
  });

  it('returns 1 image agent', () => {
    expect(getAgentsByCategory('image').length).toBe(1);
  });

  it('returns empty array for unknown category', () => {
    expect(getAgentsByCategory('nonexistent')).toEqual([]);
  });

  it('all returned agents belong to the requested category', () => {
    const category = 'writing';
    const agents = getAgentsByCategory(category);
    for (const a of agents) {
      expect(a.category).toBe(category);
    }
  });
});

describe('agent config consistency', () => {
  const agents = getAllAgents();

  it('agent names follow kebab-case convention', () => {
    const kebabRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
    for (const a of agents) {
      expect(a.name).toMatch(kebabRegex);
    }
  });

  it('storeAs paths use dot notation', () => {
    for (const a of agents) {
      expect(a.output.storeAs).toMatch(/^[a-z]+\.[a-zA-Z]+/);
    }
  });

  it('writing agents use "creative" model role', () => {
    const writingAgents = getAgentsByCategory('writing');
    for (const a of writingAgents) {
      expect(a.model.role).toBe('creative');
    }
  });

  it('quality agents use valid model roles', () => {
    const qualityAgents = getAgentsByCategory('quality');
    for (const a of qualityAgents) {
      expect(['creative', 'structural', 'uncensored', 'fast', 'evaluator']).toContain(a.model.role);
    }
  });

  it('writing agents output text format', () => {
    const writingAgents = getAgentsByCategory('writing');
    for (const a of writingAgents) {
      expect(a.output.format).toBe('text');
    }
  });

  it('foundation agents output json format', () => {
    const foundationAgents = getAgentsByCategory('foundation');
    for (const a of foundationAgents) {
      expect(a.output.format).toBe('json');
    }
  });
});
