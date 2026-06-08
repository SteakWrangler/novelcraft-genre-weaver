import { describe, it, expect } from 'vitest';
import { resolveAgentMode, deriveAudienceStyle } from '../src/workflow/mode-resolver.js';
import type { AgentConfig } from '../src/agents/types.js';
import type { BookSettings } from '../src/types/shared.js';

// Minimal agent config factory
function makeAgent(overrides: Partial<AgentConfig['mode']> & { inputField?: string } = {}): AgentConfig {
  const mode = overrides.inputField
    ? {
        supported: overrides.supported || ['generate', 'expand', 'hybrid'] as any,
        inputField: overrides.inputField,
        expandThreshold: overrides.expandThreshold ?? 200,
      }
    : undefined;

  return {
    name: 'test-agent',
    displayName: 'Test Agent',
    category: 'foundation',
    model: { role: 'creative' },
    mode,
    buildSystemPrompt: () => '',
    buildUserPrompt: () => '',
    output: { format: 'json', storeAs: 'foundation.test' },
    activation: { alwaysRun: true },
  } as AgentConfig;
}

function makeSettings(overrides: Partial<BookSettings> = {}): BookSettings {
  return { description: '', ...overrides };
}

// --- resolveAgentMode ---

describe('resolveAgentMode', () => {
  it('returns "generate" when agent has no mode config', () => {
    const agent = makeAgent(); // no inputField → no mode
    expect(resolveAgentMode(agent, makeSettings())).toBe('generate');
  });

  it('returns "generate" when the input field is empty', () => {
    const agent = makeAgent({ inputField: 'description', expandThreshold: 200 });
    expect(resolveAgentMode(agent, makeSettings({ description: '' }))).toBe('generate');
  });

  it('returns "hybrid" when input is present but below threshold', () => {
    const agent = makeAgent({ inputField: 'description', expandThreshold: 200 });
    const settings = makeSettings({ description: 'A short seed idea about a wizard.' });
    expect(resolveAgentMode(agent, settings)).toBe('hybrid');
  });

  it('returns "expand" when input exceeds threshold', () => {
    const agent = makeAgent({ inputField: 'description', expandThreshold: 50 });
    const settings = makeSettings({
      description: 'A very detailed description that goes on and on, containing more than fifty characters easily.',
    });
    expect(resolveAgentMode(agent, settings)).toBe('expand');
  });

  it('returns "expand" at exactly threshold + 1 characters', () => {
    const agent = makeAgent({ inputField: 'description', expandThreshold: 10 });
    const settings = makeSettings({ description: '12345678901' }); // 11 chars > 10
    expect(resolveAgentMode(agent, settings)).toBe('expand');
  });

  it('returns "hybrid" at exactly 1 character (below threshold)', () => {
    const agent = makeAgent({ inputField: 'description', expandThreshold: 200 });
    const settings = makeSettings({ description: 'x' });
    expect(resolveAgentMode(agent, settings)).toBe('hybrid');
  });

  it('maps "plotOutline" input field to settings.plotOutline', () => {
    const agent = makeAgent({ inputField: 'plotOutline', expandThreshold: 10 });
    const settings = makeSettings({ plotOutline: 'Act 1: The hero sets out on a grand adventure.' });
    expect(resolveAgentMode(agent, settings)).toBe('expand');
  });

  it('maps "characterDetails" input field to settings.characterDetails', () => {
    const agent = makeAgent({ inputField: 'characterDetails', expandThreshold: 5 });
    const settings = makeSettings({ characterDetails: 'Brave warrior' });
    expect(resolveAgentMode(agent, settings)).toBe('expand');
  });

  it('maps "settingDetails" input field to settings.setting', () => {
    const agent = makeAgent({ inputField: 'settingDetails', expandThreshold: 5 });
    const settings = makeSettings({ setting: 'Medieval castle' });
    expect(resolveAgentMode(agent, settings)).toBe('expand');
  });

  it('maps "themes" input field to settings.themes', () => {
    const agent = makeAgent({ inputField: 'themes', expandThreshold: 100 });
    const settings = makeSettings({ themes: 'Redemption' });
    expect(resolveAgentMode(agent, settings)).toBe('hybrid');
  });

  it('returns "generate" for unknown input fields', () => {
    const agent = makeAgent({ inputField: 'nonExistentField', expandThreshold: 5 });
    const settings = makeSettings({ description: 'Some text' });
    expect(resolveAgentMode(agent, settings)).toBe('generate');
  });

  it('returns "generate" when the mapped field is undefined', () => {
    const agent = makeAgent({ inputField: 'plotOutline', expandThreshold: 5 });
    const settings = makeSettings({}); // plotOutline is undefined
    expect(resolveAgentMode(agent, settings)).toBe('generate');
  });
});

// --- deriveAudienceStyle ---

describe('deriveAudienceStyle', () => {
  it('defaults to "adult" when no format is set', () => {
    expect(deriveAudienceStyle(makeSettings())).toBe('adult');
  });

  it('returns "children" for picture-book format', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'picture-book', audience: 'children' } }))
    ).toBe('children');
  });

  it('returns "children" for early-reader format', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'early-reader', audience: 'children' } }))
    ).toBe('children');
  });

  it('returns "middle-grade" for middle-grade format', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'middle-grade', audience: 'children' } }))
    ).toBe('middle-grade');
  });

  it('returns "young-adult" when audience is young-adult (non-child format)', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'novel', audience: 'young-adult' } }))
    ).toBe('young-adult');
  });

  it('returns "children" when audience is children (non-child format)', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'novel', audience: 'children' } }))
    ).toBe('children');
  });

  it('returns "adult" for novel format with adult audience', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'novel', audience: 'adult' } }))
    ).toBe('adult');
  });

  it('returns "adult" for novel format with all-ages audience', () => {
    expect(
      deriveAudienceStyle(makeSettings({ format: { format: 'novel', audience: 'all-ages' } }))
    ).toBe('adult');
  });
});
