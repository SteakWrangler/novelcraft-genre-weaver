import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { bookService } from '@/services/serviceFactory';
import { useToast } from '@/hooks/use-toast';

// Custom hook for managing books
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBooks = await bookService.getBooks();
      setBooks(fetchedBooks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load books';
      setError(errorMessage);
      toast({
        title: 'Error Loading Books',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book | null> => {
    try {
      setError(null);
      const newBook = await bookService.createBook(bookData);
      setBooks(prev => [...prev, newBook]);
      
      toast({
        title: 'Book Created Successfully',
        description: `"${newBook.title}" has been added to your library.`
      });
      
      return newBook;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create book';
      setError(errorMessage);
      toast({
        title: 'Error Creating Book',
        description: errorMessage,
        variant: 'destructive'
      });
      return null;
    }
  };

  const updateBook = async (book: Book): Promise<Book | null> => {
    try {
      setError(null);
      const updatedBook = await bookService.updateBook(book);
      setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
      
      toast({
        title: 'Book Updated',
        description: `"${updatedBook.title}" has been updated.`
      });
      
      return updatedBook;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update book';
      setError(errorMessage);
      toast({
        title: 'Error Updating Book',
        description: errorMessage,
        variant: 'destructive'
      });
      return null;
    }
  };

  const deleteBook = async (bookId: string): Promise<boolean> => {
    try {
      setError(null);
      await bookService.deleteBook(bookId);
      setBooks(prev => prev.filter(book => book.id !== bookId));
      
      toast({
        title: 'Book Deleted',
        description: 'Book has been removed from your library.'
      });
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete book';
      setError(errorMessage);
      toast({
        title: 'Error Deleting Book',
        description: errorMessage,
        variant: 'destructive'
      });
      return false;
    }
  };

  const getBook = async (bookId: string): Promise<Book | null> => {
    try {
      setError(null);
      return await bookService.getBook(bookId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch book';
      setError(errorMessage);
      return null;
    }
  };

  return {
    books,
    loading,
    error,
    createBook,
    updateBook,
    deleteBook,
    getBook,
    refetch: loadBooks
  };
}