import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Sparkles, Library, Plus } from "lucide-react";
import GenreSelector from "@/components/GenreSelector";
import BookCustomizer from "@/components/BookCustomizer";
import BookLibrary from "@/components/BookLibrary";
import SimpleBookCreator from "@/components/SimpleBookCreator";
import BookInspiration from "@/components/BookInspiration";
import { Book, Inspiration } from "@/types";
import { 
  getBooksFromStorage, 
  addBookToStorage, 
  updateBookInStorage,
  getSelectedInspirationsFromStorage,
  saveSelectedInspirationsToStorage,
  clearSelectedInspirationsFromStorage
} from "@/lib/storage";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState("create");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedInspirations, setSelectedInspirations] = useState<Inspiration[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBooks = getBooksFromStorage();
    const savedInspirations = getSelectedInspirationsFromStorage();
    
    setBooks(savedBooks);
    setSelectedInspirations(savedInspirations);
  }, []);

  const handleCreateBook = (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updatedBooks = addBookToStorage(newBook);
    setBooks(updatedBooks);
    setActiveTab("library");
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const bookWithUpdatedTime = { ...updatedBook, updatedAt: new Date() };
    const updatedBooks = updateBookInStorage(bookWithUpdatedTime);
    setBooks(updatedBooks);
  };

  const handleSelectInspiration = (inspiration: Inspiration) => {
    console.log('Selected inspiration:', inspiration);
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

  const handleUnselectInspiration = (inspiration: Inspiration) => {
    setSelectedInspirations(prev => {
      const updated = prev.filter(item => 
        !(item.name === inspiration.name && item.type === inspiration.type)
      );
      saveSelectedInspirationsToStorage(updated);
      return updated;
    });
  };

  const handleClearInspirations = () => {
    clearSelectedInspirationsFromStorage();
    setSelectedInspirations([]);
  };

  const handleGoToAdvancedCreator = () => {
    setActiveTab("advanced");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Book Creator
              </h1>
              <p className="text-muted-foreground">Create amazing stories with the power of AI</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="inspiration" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Inspiration</span>
              <span className="sm:hidden">Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Create Book</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Advanced Creator</span>
              <span className="sm:hidden">Advanced</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Library className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">My Library</span>
              <span className="sm:hidden">Library</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inspiration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  Find Your Next Great Story
                </CardTitle>
                <CardDescription>
                  Explore popular tropes, settings, and plot ideas to inspire your next masterpiece
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookInspiration 
                  onSelectIdea={handleSelectInspiration}
                  onUnselectIdea={handleUnselectInspiration}
                  selectedInspirations={selectedInspirations}
                  onClearInspirations={handleClearInspirations}
                  onGoToAdvancedCreator={handleGoToAdvancedCreator}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Simple Book Creator
                </CardTitle>
                <CardDescription>
                  Quick and easy book generation with minimal setup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleBookCreator onCreateBook={handleCreateBook} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Advanced Book Creator
                </CardTitle>
                <CardDescription>
                  Full control over every aspect of your book
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookCustomizer 
                  onCreateBook={handleCreateBook}
                  selectedInspirations={selectedInspirations}
                  onClearInspirations={handleClearInspirations}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <BookLibrary 
              books={books} 
              onSelectBook={setSelectedBook}
              onUpdateBook={handleUpdateBook}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
