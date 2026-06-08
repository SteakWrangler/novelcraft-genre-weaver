import { describe, it, expect } from 'vitest';
import { buildMessages, buildCorrectionMessage, extractJson } from '../src/llm/prompt-builder.js';
import type { AgentConfig, PromptContext } from '../src/agents/types.js';
import type { AgentMode } from '../src/types/project.js';

function makeContext(overrides: Partial<PromptContext> = {}): PromptContext {
  return {
    title: 'Test Book',
    genres: ['Fantasy'],
    description: 'A test description',
    plotOutline: '',
    characterDetails: '',
    settingDetails: '',
    themes: '',
    avoidList: [],
    specialRequests: '',
    inspirations: '',
    contentRating: 'PG-13',
    audienceStyle: 'adult',
    perspective: 'third-person',
    happyEnding: true,
    bigTwist: false,
    romanticSubplot: false,
    targetWordCount: 80000,
    ...overrides,
  };
}

function makeAgent(overrides: Partial<AgentConfig> = {}): AgentConfig {
  return {
    name: 'test-agent',
    displayName: 'Test Agent',
    category: 'foundation',
    model: { role: 'creative' },
    buildSystemPrompt: (ctx) => `System prompt for ${ctx.title}`,
    buildUserPrompt: (ctx, mode) => `User prompt (${mode}) for ${ctx.title}`,
    output: { format: 'json', storeAs: 'foundation.test' },
    activation: { alwaysRun: true },
    ...overrides,
  } as AgentConfig;
}

// --- buildMessages ---

describe('buildMessages', () => {
  it('returns array with system and user messages', () => {
    const agent = makeAgent();
    const context = makeContext();
    const messages = buildMessages(agent, context, 'generate');

    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe('system');
    expect(messages[1].role).toBe('user');
  });

  it('calls agent buildSystemPrompt with context', () => {
    const agent = makeAgent();
    const context = makeContext({ title: 'Dragon Quest' });
    const messages = buildMessages(agent, context, 'generate');

    expect(messages[0].content).toBe('System prompt for Dragon Quest');
  });

  it('calls agent buildUserPrompt with context and mode', () => {
    const agent = makeAgent();
    const context = makeContext({ title: 'Dragon Quest' });
    const messages = buildMessages(agent, context, 'expand');

    expect(messages[1].content).toBe('User prompt (expand) for Dragon Quest');
  });

  it('trims whitespace from prompts', () => {
    const agent = makeAgent({
      buildSystemPrompt: () => '  System with spaces  \n',
      buildUserPrompt: () => '\n  User with spaces  ',
    } as Partial<AgentConfig>);

    const messages = buildMessages(agent, makeContext(), 'generate');
    expect(messages[0].content).toBe('System with spaces');
    expect(messages[1].content).toBe('User with spaces');
  });
});

// --- buildCorrectionMessage ---

describe('buildCorrectionMessage', () => {
  it('returns a user message with error details', () => {
    const msg = buildCorrectionMessage('{"broken json', 'Unexpected end of input');

    expect(msg.role).toBe('user');
    expect(msg.content).toContain('Unexpected end of input');
    expect(msg.content).toContain('not valid JSON');
  });

  it('truncates long raw responses to 500 chars', () => {
    const longResponse = 'x'.repeat(1000);
    const msg = buildCorrectionMessage(longResponse, 'Error');

    expect(msg.content).toContain('x'.repeat(500));
    expect(msg.content).not.toContain('x'.repeat(501));
  });

  it('asks for valid JSON without markdown fences', () => {
    const msg = buildCorrectionMessage('bad', 'Error');
    expect(msg.content).toContain('ONLY valid JSON');
    expect(msg.content).toContain('no markdown');
  });
});

// --- extractJson ---

describe('extractJson', () => {
  it('extracts JSON from ```json code fence', () => {
    const input = 'Here is the result:\n```json\n{"key": "value"}\n```\nDone.';
    expect(extractJson(input)).toBe('{"key": "value"}');
  });

  it('extracts JSON from ``` code fence without language tag', () => {
    const input = '```\n{"key": "value"}\n```';
    expect(extractJson(input)).toBe('{"key": "value"}');
  });

  it('extracts a raw JSON object from surrounding text', () => {
    const input = 'The output is: {"name": "Alice", "age": 25} as requested.';
    expect(extractJson(input)).toBe('{"name": "Alice", "age": 25}');
  });

  it('extracts a raw JSON array from surrounding text', () => {
    const input = 'Result: [1, 2, 3] end.';
    expect(extractJson(input)).toBe('[1, 2, 3]');
  });

  it('returns raw string when no JSON found', () => {
    const input = 'Just plain text, no JSON here.';
    expect(extractJson(input)).toBe('Just plain text, no JSON here.');
  });

  it('handles nested JSON objects', () => {
    const json = '{"outer": {"inner": {"deep": true}}}';
    const input = `Here: ${json} done`;
    const result = extractJson(input);
    expect(JSON.parse(result)).toEqual({ outer: { inner: { deep: true } } });
  });

  it('handles JSON with arrays inside objects', () => {
    const json = '{"items": [1, 2, 3], "nested": [{"a": 1}]}';
    const input = `\`\`\`json\n${json}\n\`\`\``;
    const result = extractJson(input);
    expect(JSON.parse(result)).toEqual({ items: [1, 2, 3], nested: [{ a: 1 }] });
  });

  it('prefers code fence over raw JSON match', () => {
    const input = 'Before {"wrong": true}\n```json\n{"right": true}\n```\nAfter {"also_wrong": true}';
    expect(extractJson(input)).toBe('{"right": true}');
  });

  it('trims whitespace from extracted JSON', () => {
    const input = '```json\n  {"key": "value"}  \n```';
    expect(extractJson(input)).toBe('{"key": "value"}');
  });

  it('handles empty input', () => {
    expect(extractJson('')).toBe('');
  });

  it('handles multiline JSON in code fences', () => {
    const input = '```json\n{\n  "hook": "A mysterious letter",\n  "stakes": "The world"\n}\n```';
    const result = extractJson(input);
    const parsed = JSON.parse(result);
    expect(parsed.hook).toBe('A mysterious letter');
    expect(parsed.stakes).toBe('The world');
  });
});
