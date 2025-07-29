import { z } from 'zod';
import { ContentRating, NarrativePerspective } from '@/types';

// Simple Book Creator Validation
export const simpleBookSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  genre: z.string()
    .min(1, 'Please select a genre'),
  pages: z.string()
    .min(1, 'Please select target page count'),
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
});

// Advanced Book Creator Validation
export const advancedBookSchema = z.object({
  title: z.string()
    .max(200, 'Title must be less than 200 characters')
    .trim()
    .optional(),
  selectedGenres: z.array(z.string())
    .max(5, 'Please select no more than 5 genres'),
  plotOutline: z.string()
    .max(2000, 'Plot outline must be less than 2000 characters')
    .optional(),
  characterDetails: z.string()
    .max(2000, 'Character details must be less than 2000 characters')
    .optional(),
  setting: z.string()
    .max(1500, 'Setting description must be less than 1500 characters')
    .optional(),
  themes: z.string()
    .max(1000, 'Themes must be less than 1000 characters')
    .optional(),
  avoidContent: z.string()
    .max(1000, 'Content to avoid must be less than 1000 characters')
    .optional(),
  specialRequests: z.string()
    .max(1500, 'Special requests must be less than 1500 characters')
    .optional(),
  length: z.string()
    .min(1, 'Please select target length'),
  rating: z.enum(['G', 'PG', 'PG-13', 'R', 'X'] as const),
  perspective: z.enum(['first-person', 'third-person', 'multiple-pov'] as const),
});

// Validation helper type
export type ValidationError = {
  field: string;
  message: string;
};

// Validation result type
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors: ValidationError[];
};

// Generic validation function
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: []
    };
  }
  
  const errors: ValidationError[] = result.error.errors.map(error => ({
    field: error.path.join('.'),
    message: error.message
  }));
  
  return {
    success: false,
    errors
  };
}

// Specific validation functions
export function validateSimpleBook(data: unknown): ValidationResult<z.infer<typeof simpleBookSchema>> {
  return validateData(simpleBookSchema, data);
}

export function validateAdvancedBook(data: unknown): ValidationResult<z.infer<typeof advancedBookSchema>> {
  return validateData(advancedBookSchema, data);
}

// Field-specific validation helpers
export function validateTitle(title: string): string | null {
  if (!title.trim()) return 'Title is required';
  if (title.length > 200) return 'Title must be less than 200 characters';
  return null;
}

export function validateGenres(genres: string[]): string | null {
  if (genres.length === 0) return 'Please select at least one genre';
  if (genres.length > 5) return 'Please select no more than 5 genres';
  return null;
}

export function validateTextArea(text: string, maxLength: number, fieldName: string): string | null {
  if (text.length > maxLength) return `${fieldName} must be less than ${maxLength} characters`;
  return null;
}