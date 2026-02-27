import { useState, useEffect, useCallback } from 'react';
import { SeriesBible } from '@/types';
import { orchestratorService } from '@/services/serviceFactory';
import {
  getSeriesBiblesFromStorage,
  getSeriesBibleByIdFromStorage,
} from '@/lib/storage';

interface SeriesBiblesState {
  seriesBibles: SeriesBible[];
  loading: boolean;
  error: string | null;
}

export function useSeriesBibles() {
  const [state, setState] = useState<SeriesBiblesState>({
    seriesBibles: [],
    loading: true,
    error: null,
  });

  const fetchSeriesBibles = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const bibles = await orchestratorService.listSeriesBibles();
      setState({ seriesBibles: bibles, loading: false, error: null });
    } catch {
      // Fallback to localStorage if the API is unavailable
      const localBibles = getSeriesBiblesFromStorage();
      setState({
        seriesBibles: localBibles,
        loading: false,
        error: localBibles.length > 0 ? null : null,
      });
    }
  }, []);

  useEffect(() => {
    fetchSeriesBibles();
  }, [fetchSeriesBibles]);

  const getSeriesBible = useCallback(async (id: string): Promise<SeriesBible | null> => {
    try {
      return await orchestratorService.getSeriesBible(id);
    } catch {
      // Fallback to localStorage
      return getSeriesBibleByIdFromStorage(id);
    }
  }, []);

  return {
    ...state,
    refetch: fetchSeriesBibles,
    getSeriesBible,
  };
}
