import { useState } from 'react';
import { BookSettings } from '@/types';
import { aiGenerationService } from '@/services/serviceFactory';
import { useToast } from '@/hooks/use-toast';

interface GenerationState {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  generatedContent: string | null;
  error: string | null;
}

// Custom hook for AI book generation
export function useAIGeneration() {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    progress: 0,
    currentStep: '',
    generatedContent: null,
    error: null
  });
  const { toast } = useToast();

  const generateBook = async (settings: BookSettings): Promise<string | null> => {
    try {
      setState(prev => ({
        ...prev,
        isGenerating: true,
        progress: 0,
        currentStep: 'Starting generation...',
        generatedContent: null,
        error: null
      }));

      // Get generation steps for progress tracking
      const steps = aiGenerationService.getGenerationSteps();
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => {
          if (prev.progress < 90) {
            const newProgress = prev.progress + Math.random() * 10;
            const stepIndex = Math.floor((newProgress / 100) * steps.length);
            return {
              ...prev,
              progress: Math.min(newProgress, 90),
              currentStep: steps[stepIndex] || 'Processing...'
            };
          }
          return prev;
        });
      }, 800);

      // Generate the book
      const result = await aiGenerationService.generateBook(settings);
      
      clearInterval(progressInterval);
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 100,
        currentStep: 'Complete!',
        generatedContent: result.content
      }));

      toast({
        title: 'Book Generated Successfully!',
        description: 'Your AI-generated book is ready to read.'
      });

      return result.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate book';
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
        currentStep: 'Generation failed'
      }));

      toast({
        title: 'Generation Failed',
        description: errorMessage,
        variant: 'destructive'
      });

      return null;
    }
  };

  const generateBookCover = async (title: string, genres: string[]): Promise<string | null> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      const imageUrl = await aiGenerationService.generateBookCover(title, genres);
      
      toast({
        title: 'Book Cover Generated',
        description: 'Your custom book cover is ready!'
      });

      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate book cover';
      
      setState(prev => ({ ...prev, error: errorMessage }));
      
      toast({
        title: 'Cover Generation Failed',
        description: errorMessage,
        variant: 'destructive'
      });

      return null;
    }
  };

  const cancelGeneration = () => {
    setState(prev => ({
      ...prev,
      isGenerating: false,
      progress: 0,
      currentStep: 'Cancelled',
      error: 'Generation cancelled by user'
    }));
  };

  const resetState = () => {
    setState({
      isGenerating: false,
      progress: 0,
      currentStep: '',
      generatedContent: null,
      error: null
    });
  };

  return {
    ...state,
    generateBook,
    generateBookCover,
    cancelGeneration,
    resetState
  };
}