
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SimpleBookCreatorProps, Book, BookSettings } from "@/types";
import { validateSimpleBook, ValidationError } from "@/lib/validation";
import { BookGenerationProgress } from "@/components/LoadingSkeletons";

const SimpleBookCreator = ({ onCreateBook }: SimpleBookCreatorProps) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("300");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const { toast } = useToast();
  
  // Helper function to get error message for a field
  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const genres = [
    "Romance", "Fantasy", "Science Fiction", "Mystery", "Thriller", 
    "Horror", "Historical Fiction", "Contemporary Fiction", "Young Adult",
    "Adventure", "Comedy", "Drama", "Western", "Crime", "Paranormal",
    "Dystopian", "Literary Fiction", "Magical Realism", "Biographical",
    "Urban Fantasy", "Space Opera", "Cyberpunk", "Steampunk", 
    "Post-Apocalyptic", "Cozy Mystery", "Psychological Thriller", 
    "Gothic", "Satire", "Alternate History"
  ];

  const handleGenerate = async () => {
    // Clear previous errors
    setErrors([]);
    
    // Validate form data
    const validation = validateSimpleBook({
      title,
      genre,
      pages,
      description
    });
    
    if (!validation.success) {
      setErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual AI integration)
    setTimeout(() => {
      const bookData: Omit<Book, "id" | "createdAt" | "updatedAt"> = {
        title,
        genres: [genre],
        content: `This is a ${pages}-page ${genre.toLowerCase()} novel titled "${title}". ${description || "The story unfolds with engaging characters and compelling plot twists."}\n\nChapter 1\n\nThe beginning of an amazing story...`,
        settings: {
          simple: true,
          pages: parseInt(pages),
          description,
          rating: "PG-13" as const
        } as BookSettings
      };
      
      onCreateBook(bookData);
      setIsGenerating(false);
      
      toast({
        title: "Book Created!",
        description: `Your ${genre.toLowerCase()} novel "${title}" has been generated.`
      });
      
      // Reset form and errors
      setTitle("");
      setGenre("");
      setPages("300");
      setDescription("");
      setErrors([]);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Book Title</Label>
          <Input
            id="title"
            placeholder="Enter your book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`h-10 ${getFieldError('title') ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {getFieldError('title') && (
            <p className="text-sm text-red-600">{getFieldError('title')}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre" className="text-sm font-medium">Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className={`h-10 ${getFieldError('genre') ? 'border-red-500 focus:border-red-500' : ''}`}>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError('genre') && (
            <p className="text-sm text-red-600">{getFieldError('genre')}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pages" className="text-sm font-medium">Approximate Pages</Label>
        <Select value={pages} onValueChange={setPages}>
          <SelectTrigger className="w-full h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">100 pages (Novella)</SelectItem>
            <SelectItem value="200">200 pages (Short Novel)</SelectItem>
            <SelectItem value="300">300 pages (Standard Novel)</SelectItem>
            <SelectItem value="400">400 pages (Long Novel)</SelectItem>
            <SelectItem value="500">500+ pages (Epic Novel)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Brief Description (Optional)
          <span className="text-xs text-muted-foreground ml-2">({description.length}/1000)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Any specific ideas or themes you'd like included..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`resize-none ${getFieldError('description') ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {getFieldError('description') && (
          <p className="text-sm text-red-600">{getFieldError('description')}</p>
        )}
      </div>

      <Card className="bg-blue-50 border-blue-200 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-blue-700 mb-3">
            📝 <strong>What happens next:</strong> The AI will create a complete {pages}-page {genre ? genre.toLowerCase() : ""} novel with chapters, character development, and a satisfying conclusion.
          </p>
          <p className="text-xs text-blue-600">
            ⏱️ Generation typically takes 2-5 minutes depending on length
          </p>
        </CardContent>
      </Card>

      {isGenerating && (
        <BookGenerationProgress 
          progress={75} 
          currentStep="Crafting your story..." 
        />
      )}
      
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !title || !genre}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
        size="lg"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Generating Your Book...
          </div>
        ) : (
          "Create My Book"
        )}
      </Button>
    </div>
  );
};

export default SimpleBookCreator;
