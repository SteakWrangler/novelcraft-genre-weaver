import { BookService, InspirationService, AIGenerationService } from '@/types';
import { MockBookService } from './mockBookService';
import { MockInspirationService } from './mockInspirationService';
import { MockAIGenerationService } from './mockAIService';

// Environment configuration
const USE_MOCK_SERVICES = true; // This will be configurable via environment variables

// Service factory to create appropriate service implementations
class ServiceFactory {
  private static bookService: BookService | null = null;
  private static inspirationService: InspirationService | null = null;
  private static aiGenerationService: AIGenerationService | null = null;

  static getBookService(): BookService {
    if (!this.bookService) {
      if (USE_MOCK_SERVICES) {
        this.bookService = new MockBookService();
      } else {
        // TODO: Replace with real Supabase service when ready
        // this.bookService = new SupabaseBookService();
        throw new Error('Real BookService not implemented yet');
      }
    }
    return this.bookService;
  }

  static getInspirationService(): InspirationService {
    if (!this.inspirationService) {
      if (USE_MOCK_SERVICES) {
        this.inspirationService = new MockInspirationService();
      } else {
        // TODO: Replace with real service when ready
        // this.inspirationService = new SupabaseInspirationService();
        throw new Error('Real InspirationService not implemented yet');
      }
    }
    return this.inspirationService;
  }

  static getAIGenerationService(): AIGenerationService {
    if (!this.aiGenerationService) {
      if (USE_MOCK_SERVICES) {
        this.aiGenerationService = new MockAIGenerationService();
      } else {
        // TODO: Replace with real OpenAI service when ready
        // this.aiGenerationService = new OpenAIGenerationService();
        throw new Error('Real AIGenerationService not implemented yet');
      }
    }
    return this.aiGenerationService;
  }

  // Method to reset services (useful for testing or switching environments)
  static resetServices(): void {
    this.bookService = null;
    this.inspirationService = null;
    this.aiGenerationService = null;
  }
}

// Convenience exports
export const bookService = ServiceFactory.getBookService();
export const inspirationService = ServiceFactory.getInspirationService();
export const aiGenerationService = ServiceFactory.getAIGenerationService();

export default ServiceFactory;