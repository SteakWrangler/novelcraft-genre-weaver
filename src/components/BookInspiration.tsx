
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Heart, Zap, Crown, Sword, Rocket, Wand2, Search, Plus, RefreshCw, Check, X, ArrowRight } from "lucide-react";

interface BookInspirationProps {
  onSelectIdea: (idea: any) => void;
  onUnselectIdea: (idea: any) => void;
  selectedInspirations: any[];
  onClearInspirations: () => void;
  onGoToAdvancedCreator: () => void;
}

const BookInspiration = ({ 
  onSelectIdea, 
  onUnselectIdea, 
  selectedInspirations, 
  onClearInspirations,
  onGoToAdvancedCreator 
}: BookInspirationProps) => {
  const [selectedCategory, setSelectedCategory] = useState("tropes");

  const initialTropes = [
    {
      name: "Enemies to Lovers",
      description: "Two characters who start as adversaries gradually fall in love",
      genres: ["Romance", "Fantasy", "Contemporary Fiction"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "Chosen One",
      description: "A seemingly ordinary person discovers they're destined for greatness",
      genres: ["Fantasy", "Young Adult", "Science Fiction"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Found Family",
      description: "Characters who aren't related by blood become a tight-knit family unit",
      genres: ["Fantasy", "Adventure", "Contemporary Fiction"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "Time Loop",
      description: "Character relives the same day/period until they learn something important",
      genres: ["Science Fiction", "Comedy", "Drama"],
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: "Mentor's Death",
      description: "The wise guide dies, forcing the protagonist to continue alone",
      genres: ["Fantasy", "Adventure", "Young Adult"],
      icon: <Sword className="w-4 h-4" />
    },
    {
      name: "Fake Relationship",
      description: "Characters pretend to be in a relationship for mutual benefit",
      genres: ["Romance", "Comedy", "Contemporary Fiction"],
      icon: <Heart className="w-4 h-4" />
    }
  ];

  const additionalTropes = [
    {
      name: "Amnesia",
      description: "Character loses their memory and must rediscover who they are",
      genres: ["Drama", "Romance", "Thriller"],
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: "Secret Identity",
      description: "Character hides their true nature or background from others",
      genres: ["Fantasy", "Romance", "Adventure"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Redemption Arc",
      description: "A villain or flawed character seeks to make amends for past wrongs",
      genres: ["Fantasy", "Drama", "Adventure"],
      icon: <Heart className="w-4 h-4" />
    }
  ];

  const initialSettings = [
    {
      name: "Magic Academy",
      description: "A school where students learn to harness magical abilities",
      atmosphere: "Wonder, coming-of-age, academic pressure",
      genres: ["Fantasy", "Young Adult"]
    },
    {
      name: "Post-Apocalyptic Wasteland",
      description: "Earth after civilization has collapsed",
      atmosphere: "Survival, hope vs despair, rebuilding",
      genres: ["Science Fiction", "Dystopian", "Thriller"]
    },
    {
      name: "Space Station",
      description: "A confined environment in the vast emptiness of space",
      atmosphere: "Isolation, technological wonder, claustrophobia",
      genres: ["Science Fiction", "Thriller", "Horror"]
    },
    {
      name: "Victorian London",
      description: "The fog-shrouded streets of 19th century London",
      atmosphere: "Mystery, class divide, industrial revolution",
      genres: ["Historical Fiction", "Mystery", "Horror"]
    },
    {
      name: "Small Town with Secrets",
      description: "A seemingly perfect community hiding dark truths",
      atmosphere: "Nostalgia, paranoia, close-knit community",
      genres: ["Mystery", "Thriller", "Horror"]
    },
    {
      name: "Corporate Dystopia",
      description: "A world dominated by mega-corporations",
      atmosphere: "Technology, surveillance, rebellion",
      genres: ["Science Fiction", "Dystopian", "Thriller"]
    }
  ];

  const additionalSettings = [
    {
      name: "Floating City",
      description: "A metropolis suspended in the clouds or above water",
      atmosphere: "Wonder, isolation, technological marvel",
      genres: ["Fantasy", "Science Fiction", "Adventure"]
    },
    {
      name: "Underground Society",
      description: "A hidden civilization beneath the surface world",
      atmosphere: "Mystery, claustrophobia, hidden knowledge",
      genres: ["Fantasy", "Science Fiction", "Thriller"]
    },
    {
      name: "Time-Displaced Town",
      description: "A place where different time periods coexist",
      atmosphere: "Confusion, wonder, temporal mystery",
      genres: ["Science Fiction", "Fantasy", "Mystery"]
    }
  ];

  const initialPlots = [
    {
      hook: "A character receives a mysterious package with no return address",
      potential: "Mystery box, secret admirer, dangerous conspiracy",
      genres: ["Mystery", "Thriller", "Romance"]
    },
    {
      hook: "The last human on Earth discovers they're not actually alone",
      potential: "Hidden survivors, aliens, time travel, parallel dimensions",
      genres: ["Science Fiction", "Horror", "Drama"]
    },
    {
      hook: "A character can suddenly hear everyone's thoughts",
      potential: "Mind reading curse/gift, conspiracy discovery, relationship drama",
      genres: ["Fantasy", "Science Fiction", "Drama"]
    },
    {
      hook: "Two sworn enemies are forced to work together to survive",
      potential: "Natural disaster, common threat, unlikely alliance",
      genres: ["Adventure", "Romance", "Thriller"]
    },
    {
      hook: "A character wakes up with no memory in an unfamiliar place",
      potential: "Amnesia, witness protection, alternate reality, kidnapping",
      genres: ["Thriller", "Mystery", "Science Fiction"]
    },
    {
      hook: "The new neighbor seems too perfect to be real",
      potential: "Secret identity, supernatural being, con artist, spy",
      genres: ["Mystery", "Thriller", "Paranormal"]
    }
  ];

  const additionalPlots = [
    {
      hook: "A character inherits a house that exists in multiple dimensions",
      potential: "Parallel worlds, family secrets, interdimensional travel",
      genres: ["Science Fiction", "Fantasy", "Mystery"]
    },
    {
      hook: "Every lie a character tells becomes reality",
      potential: "Reality manipulation, moral dilemmas, unintended consequences",
      genres: ["Fantasy", "Drama", "Comedy"]
    },
    {
      hook: "A character discovers their dreams are someone else's memories",
      potential: "Psychic connection, past lives, shared consciousness",
      genres: ["Fantasy", "Thriller", "Romance"]
    }
  ];

  const [popularTropes, setPopularTropes] = useState(initialTropes);
  const [popularSettings, setPopularSettings] = useState(initialSettings);
  const [plotStarters, setPlotStarters] = useState(initialPlots);
  
  const [generatedMoreTropes, setGeneratedMoreTropes] = useState(false);
  const [generatedMoreSettings, setGeneratedMoreSettings] = useState(false);
  const [generatedMorePlots, setGeneratedMorePlots] = useState(false);

  const isSelected = (idea: any, type: string) => {
    return selectedInspirations.some(inspiration => 
      inspiration.name === idea.name && inspiration.type === type
    );
  };

  const handleToggleIdea = (idea: any, type: string) => {
    if (isSelected(idea, type)) {
      onUnselectIdea({ ...idea, type });
    } else {
      onSelectIdea({ ...idea, type });
    }
  };

  const handleRemoveInspiration = (inspiration: any) => {
    onUnselectIdea(inspiration);
  };

  const generateMore = (category: string) => {
    switch (category) {
      case 'tropes':
        if (!generatedMoreTropes) {
          setPopularTropes(prev => [...prev, ...additionalTropes]);
          setGeneratedMoreTropes(true);
        }
        break;
      case 'settings':
        if (!generatedMoreSettings) {
          setPopularSettings(prev => [...prev, ...additionalSettings]);
          setGeneratedMoreSettings(true);
        }
        break;
      case 'plots':
        if (!generatedMorePlots) {
          setPlotStarters(prev => [...prev, ...additionalPlots]);
          setGeneratedMorePlots(true);
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
      {selectedInspirations.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-800 text-lg">
                Selected Inspirations ({selectedInspirations.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={onGoToAdvancedCreator}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Go to Advanced Creator
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onClearInspirations}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedInspirations.map((inspiration, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 pr-1"
                >
                  {inspiration.name || inspiration.hook?.substring(0, 30) + "..."}
                  <span className="ml-1 text-xs">({inspiration.type})</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-1 h-4 w-4 p-0 hover:bg-green-300"
                    onClick={() => handleRemoveInspiration(inspiration)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Book Inspiration Hub
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Discover popular tropes, settings, and plot ideas to spark your creativity. Select multiple ideas to combine them!
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tropes">Popular Tropes</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="plots">Plot Starters</TabsTrigger>
            </TabsList>

            <TabsContent value="tropes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Choose Your Tropes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('tropes')}
                  disabled={generatedMoreTropes}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {generatedMoreTropes ? "All Loaded" : "Generate More"}
                </Button>
              </div>
              <div className="grid gap-4">
                {popularTropes.map((trope, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {trope.icon}
                            <h4 className="font-semibold">{trope.name}</h4>
                            {isSelected(trope, 'trope') && <Check className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{trope.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {trope.genres.map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isSelected(trope, 'trope') ? "default" : "outline"}
                          onClick={() => handleToggleIdea(trope, 'trope')}
                        >
                          {isSelected(trope, 'trope') ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Choose Your Settings</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('settings')}
                  disabled={generatedMoreSettings}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {generatedMoreSettings ? "All Loaded" : "Generate More"}
                </Button>
              </div>
              <div className="grid gap-4">
                {popularSettings.map((setting, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{setting.name}</h4>
                            {isSelected(setting, 'setting') && <Check className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{setting.description}</p>
                          <p className="text-xs text-blue-600 mb-3">
                            <strong>Atmosphere:</strong> {setting.atmosphere}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {setting.genres.map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isSelected(setting, 'setting') ? "default" : "outline"}
                          onClick={() => handleToggleIdea(setting, 'setting')}
                        >
                          {isSelected(setting, 'setting') ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="plots" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Choose Your Plot Starters</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('plots')}
                  disabled={generatedMorePlots}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {generatedMorePlots ? "All Loaded" : "Generate More"}
                </Button>
              </div>
              <div className="grid gap-4">
                {plotStarters.map((plot, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">"{plot.hook}"</h4>
                            {isSelected(plot, 'plot') && <Check className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-xs text-green-600 mb-3">
                            <strong>Potential directions:</strong> {plot.potential}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {plot.genres.map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isSelected(plot, 'plot') ? "default" : "outline"}
                          onClick={() => handleToggleIdea(plot, 'plot')}
                        >
                          {isSelected(plot, 'plot') ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookInspiration;
