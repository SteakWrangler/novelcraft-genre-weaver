import { Book, Inspiration } from '@/types';

const STORAGE_KEYS = {
  BOOKS: 'novelcraft-books',
  SELECTED_INSPIRATIONS: 'novelcraft-selected-inspirations',
} as const;

// Generic localStorage utilities
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item);
    
    // Convert date strings back to Date objects for Book objects
    if (key === STORAGE_KEYS.BOOKS && Array.isArray(parsed)) {
      return parsed.map((book: any) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        updatedAt: new Date(book.updatedAt),
      })) as T;
    }
    
    return parsed;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

// Book-specific storage functions
export function getBooksFromStorage(): Book[] {
  return getFromStorage(STORAGE_KEYS.BOOKS, []);
}

export function saveBooksToStorage(books: Book[]): void {
  saveToStorage(STORAGE_KEYS.BOOKS, books);
}

export function addBookToStorage(book: Book): Book[] {
  const books = getBooksFromStorage();
  const updatedBooks = [...books, book];
  saveBooksToStorage(updatedBooks);
  return updatedBooks;
}

export function updateBookInStorage(updatedBook: Book): Book[] {
  const books = getBooksFromStorage();
  const updatedBooks = books.map(book => 
    book.id === updatedBook.id ? updatedBook : book
  );
  saveBooksToStorage(updatedBooks);
  return updatedBooks;
}

export function deleteBookFromStorage(bookId: string): Book[] {
  const books = getBooksFromStorage();
  const updatedBooks = books.filter(book => book.id !== bookId);
  saveBooksToStorage(updatedBooks);
  return updatedBooks;
}

// Inspiration-specific storage functions
export function getSelectedInspirationsFromStorage(): Inspiration[] {
  return getFromStorage(STORAGE_KEYS.SELECTED_INSPIRATIONS, []);
}

export function saveSelectedInspirationsToStorage(inspirations: Inspiration[]): void {
  saveToStorage(STORAGE_KEYS.SELECTED_INSPIRATIONS, inspirations);
}

export function clearSelectedInspirationsFromStorage(): void {
  localStorage.removeItem(STORAGE_KEYS.SELECTED_INSPIRATIONS);
}

// Clear all app data (useful for development/testing)
export function clearAllAppData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}