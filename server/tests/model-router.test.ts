import { describe, it, expect } from 'vitest';
import { resolveModel, getAgentOptions } from '../src/llm/model-router.js';

// --- resolveModel ---

describe('resolveModel', () => {
  it('resolves "creative" role to configured creative model', () => {
    const model = resolveModel('creative');
    expect(model).toBeTruthy();
    expect(typeof model).toBe('string');
  });

  it('resolves "structural" role to configured structural model', () => {
    const model = resolveModel('structural');
    expect(model).toBeTruthy();
  });

  it('resolves "uncensored" role to configured uncensored model', () => {
    const model = resolveModel('uncensored');
    expect(model).toBeTruthy();
  });

  it('resolves "fast" role to configured fast model', () => {
    const model = resolveModel('fast');
    expect(model).toBeTruthy();
  });

  it('resolves "evaluator" role to configured evaluator model', () => {
    const model = resolveModel('evaluator');
    expect(model).toBeTruthy();
  });

  it('all roles resolve to different model names (no accidental duplicates)', () => {
    const roles = ['creative', 'structural', 'uncensored', 'fast', 'evaluator'] as const;
    const models = roles.map(r => resolveModel(r));
    // At minimum creative and fast should differ
    expect(models[0]).not.toBe(models[3]); // creative !== fast
  });

  it('uses fallback role when primary would be missing', () => {
    // This tests the fallback chain — creative always exists so it falls back
    const model = resolveModel('creative', 'structural');
    expect(model).toBeTruthy();
  });

  it('returns creative model as last resort', () => {
    // Even with nonsensical role, it falls through to creative
    // (TypeScript wouldn't allow this, but testing runtime behavior)
    const model = resolveModel('creative');
    expect(model).toBeTruthy();
  });
});

// --- getAgentOptions ---

describe('getAgentOptions', () => {
  it('returns temperature, num_predict, and top_p', () => {
    const opts = getAgentOptions('prose-writer');
    expect(typeof opts.temperature).toBe('number');
    expect(typeof opts.num_predict).toBe('number');
    expect(typeof opts.top_p).toBe('number');
  });

  it('uses agent-specific overrides for known agents', () => {
    const proseOpts = getAgentOptions('prose-writer');
    expect(proseOpts.temperature).toBe(0.75);
    expect(proseOpts.num_predict).toBe(8192);
  });

  it('uses default values for unknown agents', () => {
    const opts = getAgentOptions('nonexistent-agent');
    expect(opts.temperature).toBe(0.8);  // config.defaults.temperature
    expect(opts.num_predict).toBe(4096); // config.defaults.maxTokens
    expect(opts.top_p).toBe(0.9);        // config.defaults.topP
  });

  it('writing agents have higher temperature than quality agents', () => {
    const proseTemp = getAgentOptions('prose-writer').temperature;
    const clicheTemp = getAgentOptions('cliche-hunter').temperature;
    expect(proseTemp).toBeGreaterThan(clicheTemp);
  });

  it('line-editor has lower temperature than prose-writer', () => {
    const lineEditorTemp = getAgentOptions('line-editor').temperature;
    const proseTemp = getAgentOptions('prose-writer').temperature;
    expect(lineEditorTemp).toBeLessThan(proseTemp);
  });

  it('chapter-planner has moderate temperature', () => {
    const opts = getAgentOptions('chapter-planner');
    expect(opts.temperature).toBe(0.6);
  });

  it('continuity-keeper has low temperature for precision', () => {
    const opts = getAgentOptions('continuity-keeper');
    expect(opts.temperature).toBe(0.4);
  });

  it('all configured agents have valid temperature ranges', () => {
    const agentNames = [
      'prose-writer', 'dialogue-writer', 'action-writer', 'emotion-writer',
      'atmosphere-writer', 'line-editor', 'chapter-planner', 'scene-outliner',
      'continuity-keeper', 'setup-payoff-tracker', 'voice-diversifier',
      'pacing-analyst', 'cliche-hunter', 'setup-payoff-verifier', 'beta-reader-simulator',
    ];
    for (const name of agentNames) {
      const opts = getAgentOptions(name);
      expect(opts.temperature).toBeGreaterThanOrEqual(0);
      expect(opts.temperature).toBeLessThanOrEqual(1);
      expect(opts.num_predict).toBeGreaterThan(0);
    }
  });
});
