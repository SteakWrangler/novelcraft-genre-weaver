import { Book, BookService } from '@/types';
import { 
  getBooksFromStorage, 
  addBookToStorage, 
  updateBookInStorage, 
  deleteBookFromStorage 
} from '@/lib/storage';

// Mock implementation of BookService using localStorage
export class MockBookService implements BookService {
  async createBook(bookData: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addBookToStorage(newBook);
    return newBook;
  }

  async getBooks(): Promise<Book[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return getBooksFromStorage();
  }

  async getBook(id: string): Promise<Book | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const books = getBooksFromStorage();
    return books.find(book => book.id === id) || null;
  }

  async updateBook(book: Book): Promise<Book> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedBook = { ...book, updatedAt: new Date() };
    updateBookInStorage(updatedBook);
    return updatedBook;
  }

  async deleteBook(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    deleteBookFromStorage(id);
  }
}