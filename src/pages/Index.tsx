import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Sparkles, Library, Plus } from "lucide-react";
import GenreSelector from "@/components/GenreSelector";
import BookCustomizer from "@/components/BookCustomizer";
import BookLibrary from "@/components/BookLibrary";
import SimpleBookCreator from "@/components/SimpleBookCreator";
import BookInspiration from "@/components/BookInspiration";

interface Book {
  id: string;
  title: string;
  genres: string[];
  content: string;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState("create");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedInspirations, setSelectedInspirations] = useState<any[]>([]);

  const handleCreateBook = (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setBooks(prev => [...prev, newBook]);
    setActiveTab("library");
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(book => 
      book.id === updatedBook.id 
        ? { ...updatedBook, updatedAt: new Date() }
        : book
    ));
  };

  const handleSelectInspiration = (inspiration: any) => {
    console.log('Selected inspiration:', inspiration);
    setSelectedInspirations(prev => {
      const exists = prev.some(item => 
        item.name === inspiration.name && item.type === inspiration.type
      );
      if (!exists) {
        return [...prev, inspiration];
      }
      return prev;
    });
  };

  const handleUnselectInspiration = (inspiration: any) => {
    setSelectedInspirations(prev => 
      prev.filter(item => 
        !(item.name === inspiration.name && item.type === inspiration.type)
      )
    );
  };

  const handleClearInspirations = () => {
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="inspiration" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Inspiration
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Book
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Advanced Creator
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              My Library
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
