import { useState, useEffect } from 'react';
import { Trope, Setting, PlotStarter, Inspiration } from '@/types';
import { inspirationService } from '@/services/serviceFactory';
import { 
  getSelectedInspirationsFromStorage, 
  saveSelectedInspirationsToStorage,
  clearSelectedInspirationsFromStorage 
} from '@/lib/storage';

// Custom hook for managing inspirations
export function useInspirations() {
  const [tropes, setTropes] = useState<Trope[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [plotStarters, setPlotStarters] = useState<PlotStarter[]>([]);
  const [selectedInspirations, setSelectedInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadAllInspirations();
    loadSelectedInspirations();
  }, []);

  const loadAllInspirations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [tropesData, settingsData, plotsData] = await Promise.all([
        inspirationService.getTropes(),
        inspirationService.getSettings(),
        inspirationService.getPlotStarters()
      ]);
      
      setTropes(tropesData);
      setSettings(settingsData);
      setPlotStarters(plotsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load inspirations';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadSelectedInspirations = () => {
    const selected = getSelectedInspirationsFromStorage();
    setSelectedInspirations(selected);
  };

  const selectInspiration = (inspiration: Inspiration) => {
    setSelectedInspirations(prev => {
      const exists = prev.some(item => 
        item.name === inspiration.name && item.type === inspiration.type
      );
      
      if (!exists) {
        const updated = [...prev, inspiration];
        saveSelectedInspirationsToStorage(updated);
        return updated;
      }
      
      return prev;
    });
  };

  const unselectInspiration = (inspiration: Inspiration) => {
    setSelectedInspirations(prev => {
      const updated = prev.filter(item => 
        !(item.name === inspiration.name && item.type === inspiration.type)
      );
      saveSelectedInspirationsToStorage(updated);
      return updated;
    });
  };

  const clearSelectedInspirations = () => {
    clearSelectedInspirationsFromStorage();
    setSelectedInspirations([]);
  };

  const isSelected = (inspiration: Inspiration): boolean => {
    return selectedInspirations.some(item => 
      item.name === inspiration.name && item.type === inspiration.type
    );
  };

  // Get inspirations by category
  const getInspirationsByCategory = (category: 'trope' | 'setting' | 'plot') => {
    switch (category) {
      case 'trope':
        return tropes;
      case 'setting':
        return settings;
      case 'plot':
        return plotStarters;
      default:
        return [];
    }
  };

  return {
    tropes,
    settings,
    plotStarters,
    selectedInspirations,
    loading,
    error,
    selectInspiration,
    unselectInspiration,
    clearSelectedInspirations,
    isSelected,
    getInspirationsByCategory,
    refetch: loadAllInspirations
  };
}