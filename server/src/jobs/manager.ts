import { randomUUID } from 'crypto';
import type {
  BookRequest,
  BookResult,
  JobProgress,
  JobStatus,
  GenerationPhase,
} from '../types/shared.js';

interface Job {
  id: string;
  request: BookRequest;
  status: JobStatus;
  currentPhase: GenerationPhase;
  currentStep: string;
  percentComplete: number;
  estimatedTimeRemaining?: number;
  completedPhases: GenerationPhase[];
  errors: string[];
  result?: BookResult;
  cancelled: boolean;
  createdAt: Date;
}

class JobManager {
  private jobs = new Map<string, Job>();

  create(request: BookRequest): string {
    const id = randomUUID();
    const job: Job = {
      id,
      request,
      status: 'queued',
      currentPhase: 'foundation',
      currentStep: 'Queued for generation...',
      percentComplete: 0,
      completedPhases: [],
      errors: [],
      cancelled: false,
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    console.log(`[JobManager] Created job ${id}`);
    return id;
  }

  getProgress(jobId: string): JobProgress | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return {
      jobId: job.id,
      status: job.status,
      currentPhase: job.currentPhase,
      currentStep: job.currentStep,
      percentComplete: job.percentComplete,
      estimatedTimeRemaining: job.estimatedTimeRemaining,
      completedPhases: job.completedPhases,
      errors: job.errors.length > 0 ? job.errors : undefined,
    };
  }

  getResult(jobId: string): BookResult | null {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'completed') return null;
    return job.result || null;
  }

  getRequest(jobId: string): BookRequest | null {
    const job = this.jobs.get(jobId);
    return job?.request || null;
  }

  updateProgress(
    jobId: string,
    phase: GenerationPhase,
    step: string,
    percentComplete: number,
    estimatedTimeRemaining?: number
  ): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    // If we moved to a new phase, mark the old one as completed
    if (job.currentPhase !== phase && !job.completedPhases.includes(job.currentPhase)) {
      job.completedPhases.push(job.currentPhase);
    }

    job.status = 'running';
    job.currentPhase = phase;
    job.currentStep = step;
    job.percentComplete = Math.min(percentComplete, 99); // Reserve 100 for completion
    job.estimatedTimeRemaining = estimatedTimeRemaining;

    console.log(`[JobManager] Job ${jobId}: ${phase} — ${step} (${percentComplete}%)`);
  }

  complete(jobId: string, result: BookResult): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    // Mark all phases as completed
    const allPhases: GenerationPhase[] = ['foundation', 'structure', 'drafting', 'revision', 'image', 'output'];
    job.completedPhases = allPhases;
    job.status = 'completed';
    job.currentPhase = 'output';
    job.currentStep = 'Complete';
    job.percentComplete = 100;
    job.estimatedTimeRemaining = 0;
    job.result = result;

    console.log(`[JobManager] Job ${jobId} completed`);
  }

  fail(jobId: string, error: string): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'failed';
    job.errors.push(error);
    job.currentStep = `Failed: ${error}`;

    console.error(`[JobManager] Job ${jobId} failed: ${error}`);
  }

  cancel(jobId: string): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.cancelled = true;
    job.status = 'cancelled';
    job.currentStep = 'Cancelled by user';

    console.log(`[JobManager] Job ${jobId} cancelled`);
  }

  isCancelled(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    return job?.cancelled ?? false;
  }

  addError(jobId: string, error: string): void {
    const job = this.jobs.get(jobId);
    if (job) job.errors.push(error);
  }

  // Cleanup old jobs (call periodically)
  cleanup(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    for (const [id, job] of this.jobs) {
      if (
        (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') &&
        now - job.createdAt.getTime() > maxAgeMs
      ) {
        this.jobs.delete(id);
        console.log(`[JobManager] Cleaned up job ${id}`);
      }
    }
  }
}

// Singleton
export const jobManager = new JobManager();
