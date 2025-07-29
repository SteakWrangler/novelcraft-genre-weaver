
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Download, Search, Calendar } from "lucide-react";
import { BookLibraryProps, Book } from "@/types";

const BookLibrary = ({ books, onSelectBook, onUpdateBook }: BookLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownloadPDF = (book: Book) => {
    // Simple text file download (in a real app, you'd generate a proper PDF)
    const element = document.createElement("a");
    const file = new Blob([book.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${book.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: `"${book.title}" is being downloaded.`
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getWordCount = (content: string) => {
    return content.split(/\s+/).length.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold">My Book Library</h2>
          <p className="text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {books.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first AI-generated book to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg mb-2 line-clamp-2 break-words">{book.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Created {formatDate(book.createdAt)}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {book.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Words:</strong> {getWordCount(book.content)}</p>
                    <p><strong>Rating:</strong> {book.settings?.rating || "Not specified"}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 justify-center"
                          onClick={() => setSelectedBook(book)}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Read
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] mx-4">
                        <DialogHeader>
                          <DialogTitle className="text-base sm:text-lg break-words">{selectedBook?.title}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {selectedBook?.content}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadPDF(book)}
                      className="flex-1 sm:flex-initial justify-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Download</span>
                      <span className="sm:hidden">Save</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredBooks.length === 0 && books.length > 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms to find books in your library.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookLibrary;
