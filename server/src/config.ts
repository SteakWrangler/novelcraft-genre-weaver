import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from project root
dotenv.config({ path: resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  host: process.env.HOST || '0.0.0.0',

  ollama: {
    apiKey: process.env.OLLAMA_API_KEY || '',
    baseUrl: process.env.OLLAMA_BASE_URL || 'https://ollama.com/api',
  },

  models: {
    // Temporarily using gpt-oss:120b-cloud for all major roles (premium models require subscription)
    // Original: kimi-k2:1t-cloud (rank 1 Lechmazur Creative Writing Benchmark 8.729)
    creative: process.env.MODEL_CREATIVE || 'gpt-oss:120b-cloud',
    // Original: deepseek-v3.1:671b-cloud
    structural: process.env.MODEL_STRUCTURAL || 'gpt-oss:120b-cloud',
    // Original: qwen3.5:397b-cloud
    uncensored: process.env.MODEL_UNCENSORED || 'gpt-oss:120b-cloud',
    fast: process.env.MODEL_FAST || 'gpt-oss:20b-cloud',
    evaluator: process.env.MODEL_EVALUATOR || 'gpt-oss:120b-cloud',
  } as Record<string, string>,

  defaults: {
    temperature: 0.8,
    maxTokens: 4096,
    topP: 0.9,
  },

  // Per-agent overrides for temperature and max tokens
  agentOverrides: {
    // Foundation agents — character-architect needs high token limit for multi-character JSON arrays
    'character-architect': { temperature: 0.8, maxTokens: 16384 },
    // Writing agents — higher temperature for creativity
    'prose-writer': { temperature: 0.75, maxTokens: 8192 },
    'dialogue-writer': { temperature: 0.85, maxTokens: 4096 },
    'action-writer': { temperature: 0.85, maxTokens: 4096 },
    'emotion-writer': { temperature: 0.85, maxTokens: 4096 },
    'atmosphere-writer': { temperature: 0.85, maxTokens: 4096 },
    'line-editor': { temperature: 0.5, maxTokens: 8192 },
    // Structure agents — moderate temperature
    'chapter-planner': { temperature: 0.6, maxTokens: 16384 },
    'scene-outliner': { temperature: 0.6, maxTokens: 16384 },
    'continuity-keeper': { temperature: 0.4, maxTokens: 4096 },
    'setup-payoff-tracker': { temperature: 0.4, maxTokens: 4096 },
    // Quality analysis agents — low temperature for precise detection
    'voice-diversifier': { temperature: 0.4, maxTokens: 4096 },
    'pacing-analyst': { temperature: 0.4, maxTokens: 4096 },
    'cliche-hunter': { temperature: 0.4, maxTokens: 4096 },
    'setup-payoff-verifier': { temperature: 0.4, maxTokens: 4096 },
    'beta-reader-simulator': { temperature: 0.5, maxTokens: 4096 },
  } as Record<string, { temperature?: number; maxTokens?: number }>,

  concurrency: parseInt(process.env.LLM_CONCURRENCY || '2', 10),

  storage: {
    dataDir: resolve(__dirname, '../data'),
    seriesBiblesDir: resolve(__dirname, '../data/series-bibles'),
    generatedBooksDir: resolve(__dirname, '../data/generated-books'),
  },
};
