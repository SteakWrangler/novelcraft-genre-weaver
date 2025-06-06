
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SimpleBookCreatorProps {
  onCreateBook: (bookData: any) => void;
}

const SimpleBookCreator = ({ onCreateBook }: SimpleBookCreatorProps) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("300");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const genres = [
    "Romance", "Fantasy", "Science Fiction", "Mystery", "Thriller", 
    "Horror", "Historical Fiction", "Contemporary Fiction", "Young Adult",
    "Adventure", "Comedy", "Drama", "Western", "Crime"
  ];

  const handleGenerate = async () => {
    if (!title || !genre) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select a genre.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual AI integration)
    setTimeout(() => {
      const bookData = {
        title,
        genres: [genre],
        content: `This is a ${pages}-page ${genre.toLowerCase()} novel titled "${title}". ${description || "The story unfolds with engaging characters and compelling plot twists."}\n\nChapter 1\n\nThe beginning of an amazing story...`,
        settings: {
          simple: true,
          pages: parseInt(pages),
          description,
          rating: "PG-13"
        }
      };
      
      onCreateBook(bookData);
      setIsGenerating(false);
      
      toast({
        title: "Book Created!",
        description: `Your ${genre.toLowerCase()} novel "${title}" has been generated.`
      });
      
      // Reset form
      setTitle("");
      setGenre("");
      setPages("300");
      setDescription("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            placeholder="Enter your book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pages">Approximate Pages</Label>
        <Select value={pages} onValueChange={setPages}>
          <SelectTrigger className="w-full">
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
        <Label htmlFor="description">Brief Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Any specific ideas or themes you'd like included..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-700 mb-3">
            📝 <strong>What happens next:</strong> The AI will create a complete {pages}-page {genre ? genre.toLowerCase() : ""} novel with chapters, character development, and a satisfying conclusion.
          </p>
          <p className="text-xs text-blue-600">
            ⏱️ Generation typically takes 2-5 minutes depending on length
          </p>
        </CardContent>
      </Card>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !title || !genre}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        size="lg"
      >
        {isGenerating ? "Generating Your Book..." : "Create My Book"}
      </Button>
    </div>
  );
};

export default SimpleBookCreator;
