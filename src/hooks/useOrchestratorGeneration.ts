import { useState, useEffect, useRef, useCallback } from 'react';
import { BookRequest, JobProgress, BookResult } from '@/types';
import { orchestratorService } from '@/services/serviceFactory';
import { useToast } from '@/hooks/use-toast';

interface OrchestratorState {
  isGenerating: boolean;
  jobId: string | null;
  progress: JobProgress | null;
  result: BookResult | null;
  error: string | null;
}

const POLL_INTERVAL_MS = 1000;

export function useOrchestratorGeneration() {
  const [state, setState] = useState<OrchestratorState>({
    isGenerating: false,
    jobId: null,
    progress: null,
    result: null,
    error: null,
  });
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { toast } = useToast();

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const pollProgress = useCallback(async (jobId: string) => {
    try {
      const progress = await orchestratorService.getJobProgress(jobId);
      setState(prev => ({ ...prev, progress }));

      if (progress.status === 'completed') {
        stopPolling();
        try {
          const result = await orchestratorService.getJobResult(jobId);
          setState(prev => ({
            ...prev,
            isGenerating: false,
            result,
          }));
          toast({
            title: 'Book Generated!',
            description: `"${result.title}" is ready to read.`,
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Failed to retrieve book result';
          setState(prev => ({
            ...prev,
            isGenerating: false,
            error: msg,
          }));
          toast({
            title: 'Error Retrieving Result',
            description: msg,
            variant: 'destructive',
          });
        }
      } else if (progress.status === 'failed') {
        stopPolling();
        const errorMsg = progress.errors?.join(', ') || 'Generation failed';
        setState(prev => ({
          ...prev,
          isGenerating: false,
          error: errorMsg,
        }));
        toast({
          title: 'Generation Failed',
          description: errorMsg,
          variant: 'destructive',
        });
      } else if (progress.status === 'cancelled') {
        stopPolling();
        setState(prev => ({
          ...prev,
          isGenerating: false,
          error: 'Generation was cancelled',
        }));
      }
    } catch (err) {
      // Network errors during polling shouldn't kill the process immediately.
      // The backend might be temporarily unavailable. Log but continue polling.
      console.warn('Progress poll error:', err);
    }
  }, [orchestratorService, stopPolling, toast]);

  const startGeneration = useCallback(async (request: BookRequest) => {
    setState({
      isGenerating: true,
      jobId: null,
      progress: null,
      result: null,
      error: null,
    });

    try {
      const { jobId } = await orchestratorService.startBookGeneration(request);
      setState(prev => ({ ...prev, jobId }));

      // Begin polling
      pollRef.current = setInterval(() => pollProgress(jobId), POLL_INTERVAL_MS);
      // Also do an immediate first poll
      pollProgress(jobId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start generation';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: msg,
      }));
      toast({
        title: 'Generation Failed to Start',
        description: msg,
        variant: 'destructive',
      });
    }
  }, [pollProgress, toast]);

  const cancelGeneration = useCallback(async () => {
    stopPolling();
    if (state.jobId) {
      try {
        await orchestratorService.cancelJob(state.jobId);
      } catch {
        // Best effort cancel
      }
    }
    setState(prev => ({
      ...prev,
      isGenerating: false,
      error: 'Generation cancelled by user',
    }));
    toast({
      title: 'Generation Cancelled',
      description: 'Book generation has been stopped.',
    });
  }, [state.jobId, stopPolling, toast]);

  const resetState = useCallback(() => {
    stopPolling();
    setState({
      isGenerating: false,
      jobId: null,
      progress: null,
      result: null,
      error: null,
    });
  }, [stopPolling]);

  return {
    ...state,
    startGeneration,
    cancelGeneration,
    resetState,
  };
}
