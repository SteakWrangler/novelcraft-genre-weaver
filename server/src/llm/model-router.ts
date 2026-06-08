import { config } from '../config.js';
import type { ModelRole } from '../agents/types.js';

/**
 * Resolves a model role (creative, structural, etc.) to an actual Ollama Cloud model name.
 * Falls back through the chain: primary role → fallback role → creative.
 */
export function resolveModel(role: ModelRole, fallback?: ModelRole): string {
  const model = config.models[role];
  if (model) return model;

  if (fallback) {
    const fallbackModel = config.models[fallback];
    if (fallbackModel) return fallbackModel;
  }

  return config.models.creative;
}

/**
 * Gets the LLM options (temperature, max tokens) for a specific agent,
 * with per-agent overrides falling back to defaults.
 */
export function getAgentOptions(agentName: string): {
  temperature: number;
  num_predict: number;
  top_p: number;
} {
  const overrides = config.agentOverrides[agentName] || {};

  return {
    temperature: overrides.temperature ?? config.defaults.temperature,
    num_predict: overrides.maxTokens ?? config.defaults.maxTokens,
    top_p: config.defaults.topP,
  };
}
