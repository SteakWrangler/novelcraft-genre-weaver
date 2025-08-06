
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SimpleBookCreatorProps, Book, BookSettings, BookFormat, QualityLevel } from "@/types";
import { validateSimpleBook, ValidationError } from "@/lib/validation";
import { BookGenerationProgress } from "@/components/LoadingSkeletons";
import CostCalculator from "@/components/CostCalculator";
import CostConfirmationModal from "@/components/CostConfirmationModal";
import { calculateEstimatedCost } from "@/lib/costCalculator";

const SimpleBookCreator = ({ onCreateBook }: SimpleBookCreatorProps) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("300");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState<BookFormat>("novel");
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>("premium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showCostConfirmation, setShowCostConfirmation] = useState(false);
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

    // Show cost confirmation modal
    setShowCostConfirmation(true);
  };

  const handleConfirmGeneration = async () => {
    setShowCostConfirmation(false);
    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual AI integration)
    setTimeout(() => {
      const bookData: Omit<Book, "id" | "createdAt" | "updatedAt"> = {
        title,
        genres: [genre],
        content: `This is a ${pages}-page ${format === 'novel' ? genre.toLowerCase() + ' novel' : format.replace('-', ' ')} titled "${title}". ${description || "The story unfolds with engaging characters and compelling plot twists."}\n\nChapter 1\n\nThe beginning of an amazing story...`,
        settings: {
          simple: true,
          pages: parseInt(pages),
          description,
          rating: "PG-13" as const,
          format: {
            format,
            audience: format === 'picture-book' || format === 'early-reader' ? 'children' as const : 
                     format === 'middle-grade' ? 'young-adult' as const : 'adult' as const
          },
          qualityLevel,
          targetWordCount: parseInt(pages) * (format === 'picture-book' ? 15 : 
                                            format === 'early-reader' ? 100 : 
                                            format === 'poetry' ? 50 : 250)
        } as BookSettings
      };
      
      onCreateBook(bookData);
      setIsGenerating(false);
      
      toast({
        title: "Book Created!",
        description: `Your ${format === 'novel' ? genre.toLowerCase() + ' novel' : format.replace('-', ' ')} "${title}" has been generated.`
      });
      
      // Reset form and errors
      setTitle("");
      setGenre("");
      setPages(format === 'picture-book' ? "32" : format === 'early-reader' ? "64" : "300");
      setDescription("");
      setFormat("novel");
      setQualityLevel("premium");
      setErrors([]);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Format Selection */}
        <div className="space-y-2">
          <Label htmlFor="format" className="text-sm font-medium">Book Format</Label>
          <Select value={format} onValueChange={(value: BookFormat) => setFormat(value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select book format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="novel">Novel - Full-length fiction</SelectItem>
              <SelectItem value="picture-book">Picture Book - Illustrated children's book</SelectItem>
              <SelectItem value="early-reader">Early Reader - Simple chapter book</SelectItem>
              <SelectItem value="middle-grade">Middle Grade - Chapter book for ages 8-12</SelectItem>
              <SelectItem value="short-stories">Short Stories - Collection of stories</SelectItem>
              <SelectItem value="poetry">Poetry - Collection of poems</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
        
        <div className="space-y-2">
          <Label htmlFor="quality" className="text-sm font-medium">Quality Level</Label>
          <Select value={qualityLevel} onValueChange={(value: QualityLevel) => setQualityLevel(value)}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic - Faster, lower cost</SelectItem>
              <SelectItem value="premium">Premium - Balanced quality and speed</SelectItem>
              <SelectItem value="professional">Professional - Highest quality</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pages" className="text-sm font-medium">
          {format === 'picture-book' ? 'Pages (typically 24-48)' : 
           format === 'early-reader' ? 'Pages (typically 48-96)' :
           format === 'poetry' ? 'Pages (typically 60-120)' :
           'Approximate Pages'}
        </Label>
        <Select value={pages} onValueChange={setPages}>
          <SelectTrigger className="w-full h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {format === 'picture-book' ? (
              <>
                <SelectItem value="24">24 pages (Short Picture Book)</SelectItem>
                <SelectItem value="32">32 pages (Standard Picture Book)</SelectItem>
                <SelectItem value="48">48 pages (Extended Picture Book)</SelectItem>
              </>
            ) : format === 'early-reader' ? (
              <>
                <SelectItem value="48">48 pages (Short Early Reader)</SelectItem>
                <SelectItem value="64">64 pages (Standard Early Reader)</SelectItem>
                <SelectItem value="96">96 pages (Long Early Reader)</SelectItem>
              </>
            ) : format === 'middle-grade' ? (
              <>
                <SelectItem value="100">100 pages (Short Middle Grade)</SelectItem>
                <SelectItem value="150">150 pages (Standard Middle Grade)</SelectItem>
                <SelectItem value="200">200 pages (Long Middle Grade)</SelectItem>
              </>
            ) : format === 'poetry' ? (
              <>
                <SelectItem value="60">60 pages (Small Collection)</SelectItem>
                <SelectItem value="80">80 pages (Standard Collection)</SelectItem>
                <SelectItem value="120">120 pages (Large Collection)</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="100">100 pages (Novella)</SelectItem>
                <SelectItem value="200">200 pages (Short Novel)</SelectItem>
                <SelectItem value="300">300 pages (Standard Novel)</SelectItem>
                <SelectItem value="400">400 pages (Long Novel)</SelectItem>
                <SelectItem value="500">500+ pages (Epic Novel)</SelectItem>
              </>
            )}
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
      
      {/* Cost Calculator Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <CostCalculator
            pages={parseInt(pages)}
            format={format}
            genre={genre}
            qualityLevel={qualityLevel}
            options={{
              specialRequests: description
            }}
          />
        </div>
      </div>
      
      {/* Cost Confirmation Modal */}
      <CostConfirmationModal
        isOpen={showCostConfirmation}
        onClose={() => setShowCostConfirmation(false)}
        onConfirm={handleConfirmGeneration}
        estimate={calculateEstimatedCost(
          parseInt(pages),
          format,
          genre,
          qualityLevel,
          { specialRequests: description }
        )}
        bookDetails={{
          title,
          format,
          pages: parseInt(pages),
          genre,
          qualityLevel
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default SimpleBookCreator;
