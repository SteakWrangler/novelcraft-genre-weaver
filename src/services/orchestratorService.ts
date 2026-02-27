import {
  OrchestratorAIService,
  BookRequest,
  JobProgress,
  BookResult,
  SeriesBible,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_ORCHESTRATOR_API_URL || 'http://localhost:8000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `Orchestrator API error (${response.status}): ${errorBody || response.statusText}`
    );
  }

  return response.json();
}

export class OrchestratorService implements OrchestratorAIService {
  async startBookGeneration(request: BookRequest): Promise<{ jobId: string }> {
    return apiFetch<{ jobId: string }>('/books/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getJobProgress(jobId: string): Promise<JobProgress> {
    return apiFetch<JobProgress>(`/jobs/${jobId}/progress`);
  }

  async getJobResult(jobId: string): Promise<BookResult> {
    return apiFetch<BookResult>(`/jobs/${jobId}/result`);
  }

  async cancelJob(jobId: string): Promise<void> {
    await apiFetch<void>(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  async listSeriesBibles(): Promise<SeriesBible[]> {
    return apiFetch<SeriesBible[]>('/series');
  }

  async getSeriesBible(id: string): Promise<SeriesBible> {
    return apiFetch<SeriesBible>(`/series/${id}`);
  }
}
