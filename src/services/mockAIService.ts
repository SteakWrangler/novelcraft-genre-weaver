import { AIGenerationService, BookSettings } from '@/types';

// Mock implementation of AI Generation Service
export class MockAIGenerationService implements AIGenerationService {
  
  async generateBook(settings: BookSettings): Promise<{ content: string; progress: number }> {
    const steps = [
      "Analyzing your preferences...",
      "Creating story structure...",
      "Developing characters...",
      "Building the world...",
      "Writing the opening chapter...",
      "Expanding the narrative...",
      "Adding dialogue and descriptions...",
      "Creating plot twists...",
      "Writing the climax...",
      "Crafting the conclusion...",
      "Final polish and editing..."
    ];

    let progress = 0;
    let generatedContent = "";

    // Simulate step-by-step generation
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      progress = Math.floor(((i + 1) / steps.length) * 100);
      
      // Build content progressively
      if (i === 0) {
        generatedContent = this.generateBookMetadata(settings);
      } else if (i === 4) {
        generatedContent += this.generateChapter("Chapter 1", settings);
      } else if (i === 8) {
        generatedContent += this.generateChapter("Chapter 2", settings);
      } else if (i === 9) {
        generatedContent += this.generateChapter("Final Chapter", settings);
      }
    }

    return {
      content: generatedContent,
      progress: 100
    };
  }

  async generateBookCover(title: string, genres: string[]): Promise<string> {
    // Simulate API delay for image generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a placeholder image URL (in real implementation, this would be an OpenAI generated image)
    const genreParam = genres[0]?.toLowerCase() || 'fiction';
    const titleParam = encodeURIComponent(title);
    return `https://via.placeholder.com/400x600/2563eb/ffffff?text=${titleParam}+%28${genreParam}%29`;
  }

  private generateBookMetadata(settings: BookSettings): string {
    const title = settings.advanced 
      ? "Custom Generated Novel" 
      : "AI Generated Story";
    
    const genres = settings.advanced && settings.selectedInspirations
      ? settings.selectedInspirations.map(i => i.type).join(", ")
      : "Fiction";

    return `${title}\n\nGenres: ${genres}\nRating: ${settings.rating || "PG-13"}\nLength: ${settings.length || settings.pages || 300} pages\n\n`;
  }

  private generateChapter(chapterTitle: string, settings: BookSettings): string {
    const isAdvanced = settings.advanced;
    const hasInspirations = settings.selectedInspirations && settings.selectedInspirations.length > 0;
    
    let chapterContent = `\n\n${chapterTitle}\n\n`;
    
    if (isAdvanced && hasInspirations) {
      chapterContent += `This chapter incorporates your selected inspirations: ${settings.selectedInspirations!.map(i => i.name).join(", ")}.\n\n`;
    }
    
    chapterContent += this.generateSampleParagraphs(settings);
    
    return chapterContent;
  }

  private generateSampleParagraphs(settings: BookSettings): string {
    const paragraphs = [
      "The story begins with our protagonist facing an unexpected challenge that will change everything they thought they knew about their world.",
      
      "As the narrative unfolds, we see the careful development of characters who are both relatable and extraordinary, each with their own motivations and conflicts.",
      
      "The world-building creates an immersive environment that serves not just as a backdrop, but as an integral part of the story's progression.",
      
      "Dialogue flows naturally between characters, revealing their personalities while advancing the plot in meaningful ways.",
      
      "The pacing builds steadily, creating moments of tension and release that keep readers engaged throughout the journey.",
      
      "Themes emerge organically from the action, exploring deeper questions about human nature, society, and the choices we make.",
      
      "The climax brings together all the story elements in a satisfying resolution that feels both surprising and inevitable."
    ];

    // Add context based on settings
    if (settings.plotOutline) {
      paragraphs.unshift(`Following your outlined plot: "${settings.plotOutline.substring(0, 100)}..."`);
    }
    
    if (settings.characterDetails) {
      paragraphs.splice(1, 0, `Your character details have been woven throughout: "${settings.characterDetails.substring(0, 100)}..."`);
    }

    if (settings.setting) {
      paragraphs.splice(2, 0, `Set in the world you described: "${settings.setting.substring(0, 100)}..."`);
    }

    return paragraphs.join("\n\n") + "\n\n[This is a preview of the AI-generated content. The full book would continue with complete chapters, detailed scenes, and character development based on your specifications.]";
  }

  // Utility method for progress tracking
  getGenerationSteps(): string[] {
    return [
      "Analyzing preferences",
      "Creating structure", 
      "Developing characters",
      "Building world",
      "Writing opening",
      "Expanding narrative",
      "Adding dialogue",
      "Creating plot twists",
      "Writing climax",
      "Crafting conclusion",
      "Final editing"
    ];
  }
}