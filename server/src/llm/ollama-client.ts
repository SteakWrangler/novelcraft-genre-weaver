import { config } from '../config.js';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  num_predict?: number;
  top_p?: number;
}

export interface ChatResponse {
  model: string;
  message: ChatMessage;
  done: boolean;
  total_duration?: number;
  eval_count?: number;
  prompt_eval_count?: number;
}

export class OllamaClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.ollama.baseUrl;
    this.apiKey = config.ollama.apiKey;

    if (!this.apiKey) {
      console.warn('[OllamaClient] No OLLAMA_API_KEY set — LLM calls will fail');
    }
  }

  async chat(params: {
    model: string;
    messages: ChatMessage[];
    options?: ChatOptions;
    stream?: boolean;
  }): Promise<ChatResponse> {
    const url = `${this.baseUrl}/chat`;

    const body = {
      model: params.model,
      messages: params.messages,
      stream: params.stream ?? false,
      options: params.options ? {
        temperature: params.options.temperature,
        num_predict: params.options.num_predict,
        top_p: params.options.top_p,
      } : undefined,
    };

    const startTime = Date.now();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(
        `Ollama API error (${response.status}): ${errorBody || response.statusText}`
      );
    }

    const result = await response.json() as ChatResponse;
    const duration = Date.now() - startTime;

    console.log(
      `[OllamaClient] ${params.model} — ${result.prompt_eval_count || 0} prompt tokens, ` +
      `${result.eval_count || 0} eval tokens, ${duration}ms`
    );

    return result;
  }

  async ping(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Singleton
let client: OllamaClient | null = null;

export function getOllamaClient(): OllamaClient {
  if (!client) {
    client = new OllamaClient();
  }
  return client;
}
