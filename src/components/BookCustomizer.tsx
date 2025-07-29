import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GenreSelector from "./GenreSelector";
import { BookCustomizerProps, Book, BookSettings, ContentRating, NarrativePerspective } from "@/types";
import { validateAdvancedBook, ValidationError } from "@/lib/validation";
import { BookGenerationProgress } from "@/components/LoadingSkeletons";

const BookCustomizer = ({ onCreateBook, selectedInspirations = [], onClearInspirations }: BookCustomizerProps) => {
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [plotOutline, setPlotOutline] = useState("");
  const [characterDetails, setCharacterDetails] = useState("");
  const [setting, setSetting] = useState("");
  const [length, setLength] = useState("300");
  const [rating, setRating] = useState<ContentRating>("PG-13");
  const [happyEnding, setHappyEnding] = useState(true);
  const [bigTwist, setBigTwist] = useState(false);
  const [romanticSubplot, setRomanticSubplot] = useState(false);
  const [perspective, setPerspective] = useState<NarrativePerspective>("third-person");
  const [themes, setThemes] = useState("");
  const [avoidContent, setAvoidContent] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const { toast } = useToast();
  
  // Helper function to get error message for a field
  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  // Populate fields with selected inspirations when they change
  useEffect(() => {
    if (selectedInspirations.length > 0) {
      const inspirationText = selectedInspirations.map(inspiration => {
        return `${inspiration.type}: ${inspiration.name}${inspiration.description ? ` - ${inspiration.description}` : ''}`;
      }).join('\n\n');
      
      // Add inspirations to special requests if there are any
      if (inspirationText) {
        setSpecialRequests(prev => {
          const newText = prev ? `${prev}\n\n--- Selected Inspirations ---\n${inspirationText}` : `--- Selected Inspirations ---\n${inspirationText}`;
          return newText;
        });
      }
    }
  }, [selectedInspirations]);

  const handleGenerate = async () => {
    // Clear previous errors
    setErrors([]);
    
    // Validate form data
    const validation = validateAdvancedBook({
      title,
      selectedGenres,
      plotOutline,
      characterDetails,
      setting,
      themes,
      avoidContent,
      specialRequests,
      length,
      rating,
      perspective
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
    
    // Use fallbacks for empty fields
    const bookTitle = title || "Untitled Story";
    const bookGenres = selectedGenres.length > 0 ? selectedGenres : ["Fiction"];
    
    // Simulate AI generation
    setTimeout(() => {
      const bookData: Omit<Book, "id" | "createdAt" | "updatedAt"> = {
        title: bookTitle,
        genres: bookGenres,
        content: `${bookTitle}\n\nA ${bookGenres.join(" & ")} novel\n\nChapter 1\n\nThis advanced story incorporates all your custom preferences...`,
        settings: {
          advanced: true,
          plotOutline,
          characterDetails,
          setting,
          length: parseInt(length),
          rating,
          happyEnding,
          bigTwist,
          romanticSubplot,
          perspective,
          themes,
          avoidContent,
          specialRequests,
          selectedInspirations
        } as BookSettings
      };
      
      onCreateBook(bookData);
      setIsGenerating(false);
      
      // Clear inspirations after creating the book
      if (onClearInspirations) {
        onClearInspirations();
      }
      
      const genreText = bookGenres.length > 1 ? bookGenres.join(" & ") : bookGenres[0];
      toast({
        title: "Advanced Book Created!",
        description: `Your custom ${genreText.toLowerCase()} novel has been generated.`
      });
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Show selected inspirations if any */}
      {selectedInspirations.length > 0 && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-base text-blue-700">Selected Inspirations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedInspirations.map((inspiration, index) => (
                <div key={index} className="text-sm text-blue-600">
                  <span className="font-medium">{inspiration.type}:</span> {inspiration.name}
                  {inspiration.description && <span className="text-blue-500"> - {inspiration.description}</span>}
                </div>
              ))}
            </div>
            {onClearInspirations && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearInspirations}
                className="mt-3"
              >
                Clear Inspirations
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Book Title</Label>
            <Input
              id="title"
              placeholder="Enter your book title... (or leave blank for AI to decide)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`h-10 ${getFieldError('title') ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {getFieldError('title') && (
              <p className="text-sm text-red-600 mt-1">{getFieldError('title')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="length" className="text-sm font-medium">Target Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger className="h-10">
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
        </div>
      </div>

      <Separator />

      {/* Genre Selection */}
      <GenreSelector 
        selectedGenres={selectedGenres} 
        onGenreChange={setSelectedGenres}
        error={getFieldError('selectedGenres')}
      />

      <Separator />

      {/* Story Elements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Story Elements</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plot" className="text-sm font-medium">Plot Outline</Label>
              <Textarea
                id="plot"
                placeholder="Describe the main plot points, conflicts, and story arc..."
                value={plotOutline}
                onChange={(e) => setPlotOutline(e.target.value)}
                rows={4}
                className={`resize-none ${getFieldError('plotOutline') ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{plotOutline.length}/2000 characters</span>
                {getFieldError('plotOutline') && (
                  <p className="text-sm text-red-600">{getFieldError('plotOutline')}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="characters" className="text-sm font-medium">Character Details</Label>
              <Textarea
                id="characters"
                placeholder="Describe main characters, their personalities, backgrounds..."
                value={characterDetails}
                onChange={(e) => setCharacterDetails(e.target.value)}
                rows={4}
                className={`resize-none ${getFieldError('characterDetails') ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{characterDetails.length}/2000 characters</span>
                {getFieldError('characterDetails') && (
                  <p className="text-sm text-red-600">{getFieldError('characterDetails')}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="setting" className="text-sm font-medium">Setting & World</Label>
              <Textarea
                id="setting"
                placeholder="Time period, location, world-building details..."
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                rows={4}
                className={`resize-none ${getFieldError('setting') ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{setting.length}/1500 characters</span>
                {getFieldError('setting') && (
                  <p className="text-sm text-red-600">{getFieldError('setting')}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="themes" className="text-sm font-medium">Themes & Messages</Label>
              <Textarea
                id="themes"
                placeholder="What themes or messages should the book explore?"
                value={themes}
                onChange={(e) => setThemes(e.target.value)}
                rows={4}
                className={`resize-none ${getFieldError('themes') ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{themes.length}/1000 characters</span>
                {getFieldError('themes') && (
                  <p className="text-sm text-red-600">{getFieldError('themes')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Story Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Story Preferences</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Story Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="happy-ending" className="text-sm font-medium cursor-pointer">Happy Ending</Label>
                <Switch
                  id="happy-ending"
                  checked={happyEnding}
                  onCheckedChange={setHappyEnding}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="big-twist" className="text-sm font-medium cursor-pointer">Include Big Twist</Label>
                <Switch
                  id="big-twist"
                  checked={bigTwist}
                  onCheckedChange={setBigTwist}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="romantic-subplot" className="text-sm font-medium cursor-pointer">Romantic Subplot</Label>
                <Switch
                  id="romantic-subplot"
                  checked={romanticSubplot}
                  onCheckedChange={setRomanticSubplot}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Technical Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-medium">Content Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="G">G - General Audiences</SelectItem>
                    <SelectItem value="PG">PG - Parental Guidance</SelectItem>
                    <SelectItem value="PG-13">PG-13 - Teen Appropriate</SelectItem>
                    <SelectItem value="R">R - Mature Content</SelectItem>
                    <SelectItem value="X">X - Adult Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="perspective" className="text-sm font-medium">Narrative Perspective</Label>
                <Select value={perspective} onValueChange={setPerspective}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-person">First Person</SelectItem>
                    <SelectItem value="third-person">Third Person</SelectItem>
                    <SelectItem value="multiple-pov">Multiple POV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Content Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Preferences</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="avoid">Content to Avoid</Label>
            <Textarea
              id="avoid"
              placeholder="List any topics, themes, or content types you want to avoid..."
              value={avoidContent}
              onChange={(e) => setAvoidContent(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="special">Special Requests</Label>
            <Textarea
              id="special"
              placeholder="Any specific requests or unique elements you'd like included..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {isGenerating && (
        <BookGenerationProgress 
          progress={85} 
          currentStep="Incorporating your custom preferences..." 
        />
      )}
      
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-200"
        size="lg"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Crafting Your Custom Book...
          </div>
        ) : (
          "Create Advanced Book"
        )}
      </Button>
    </div>
  );
};

export default BookCustomizer;
