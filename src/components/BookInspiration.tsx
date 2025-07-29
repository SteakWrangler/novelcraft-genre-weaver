
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Heart, Zap, Crown, Sword, Rocket, Wand2, Search, Plus, RefreshCw, Check, X, ArrowRight } from "lucide-react";
import { BookInspirationProps, Trope, Setting, PlotStarter, Inspiration } from "@/types";

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
    },
    {
      name: "Love Triangle",
      description: "Protagonist must choose between two compelling romantic interests",
      genres: ["Romance", "Young Adult", "Drama"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "Slow Burn Romance",
      description: "Romantic tension builds gradually over the entire story",
      genres: ["Romance", "Historical Fiction", "Contemporary Fiction"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "The Reluctant Hero",
      description: "Hero doesn't want the responsibility but must accept their role",
      genres: ["Fantasy", "Adventure", "Science Fiction"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Magic Academy",
      description: "Students learning to master supernatural abilities in school setting",
      genres: ["Fantasy", "Young Adult", "Urban Fantasy"],
      icon: <Wand2 className="w-4 h-4" />
    },
    {
      name: "Portal Fantasy",
      description: "Characters travel from our world to a magical realm",
      genres: ["Fantasy", "Young Adult", "Adventure"],
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: "Dark Academia",
      description: "Elite academic setting with secrets, competition, and dark undertones",
      genres: ["Thriller", "Mystery", "Gothic"],
      icon: <Crown className="w-4 h-4" />
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
    },
    {
      name: "Soulmates",
      description: "Two people destined to be together across time and space",
      genres: ["Romance", "Fantasy", "Paranormal"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "Prophecy",
      description: "Ancient prediction drives the plot and character actions",
      genres: ["Fantasy", "Adventure", "Young Adult"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Fish Out of Water",
      description: "Character finds themselves in completely unfamiliar circumstances",
      genres: ["Comedy", "Romance", "Science Fiction"],
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: "Corrupted Utopia",
      description: "Perfect society reveals dark secrets and hidden flaws",
      genres: ["Dystopian", "Science Fiction", "Thriller"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Antihero Protagonist",
      description: "Morally ambiguous main character who isn't traditionally heroic",
      genres: ["Crime", "Thriller", "Drama"],
      icon: <Sword className="w-4 h-4" />
    },
    {
      name: "Forbidden Love",
      description: "Romance between characters from opposing sides or forbidden circumstances",
      genres: ["Romance", "Historical Fiction", "Fantasy"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "Heist Story",
      description: "Team assembles to pull off an elaborate theft or con",
      genres: ["Crime", "Thriller", "Adventure"],
      icon: <Crown className="w-4 h-4" />
    },
    {
      name: "Rivals to Lovers",
      description: "Competitive opponents gradually develop romantic feelings",
      genres: ["Romance", "Sports", "Contemporary Fiction"],
      icon: <Heart className="w-4 h-4" />
    },
    {
      name: "One Bed",
      description: "Forced proximity when characters must share sleeping arrangements",
      genres: ["Romance", "Comedy", "Contemporary Fiction"],
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
    },
    {
      name: "Medieval Fantasy Kingdom",
      description: "Classic fantasy realm with knights, castles, and magic",
      atmosphere: "Adventure, honor, political intrigue",
      genres: ["Fantasy", "Adventure", "Romance"]
    },
    {
      name: "Modern University Campus",
      description: "Elite academic institution with competitive atmosphere",
      atmosphere: "Ambition, social pressure, intellectual discovery",
      genres: ["Contemporary Fiction", "Romance", "Drama"]
    },
    {
      name: "Jazz Age New York",
      description: "1920s Manhattan during prohibition era",
      atmosphere: "Glamour, rebellion, moral complexity",
      genres: ["Historical Fiction", "Crime", "Romance"]
    },
    {
      name: "Cyberpunk Megacity",
      description: "High-tech urban sprawl with corporate control",
      atmosphere: "Neon lights, digital rebellion, class warfare",
      genres: ["Cyberpunk", "Science Fiction", "Thriller"]
    },
    {
      name: "Haunted Mansion",
      description: "Ancient estate with supernatural presence",
      atmosphere: "Gothic mystery, family secrets, supernatural dread",
      genres: ["Horror", "Gothic", "Mystery"]
    },
    {
      name: "Generation Ship",
      description: "Multi-generational voyage through space",
      atmosphere: "Isolation, purpose, social evolution",
      genres: ["Science Fiction", "Drama", "Space Opera"]
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
    },
    {
      name: "Desert Nomad Tribes",
      description: "Wandering people in harsh desert landscapes",
      atmosphere: "Survival, tradition, harsh beauty",
      genres: ["Fantasy", "Adventure", "Historical Fiction"]
    },
    {
      name: "Arctic Research Station",
      description: "Remote outpost in frozen wilderness",
      atmosphere: "Isolation, survival, claustrophobia",
      genres: ["Thriller", "Horror", "Science Fiction"]
    },
    {
      name: "Pirate Ship & Caribbean",
      description: "Age of sail adventure on the high seas",
      atmosphere: "Freedom, danger, treasure hunting",
      genres: ["Adventure", "Historical Fiction", "Romance"]
    },
    {
      name: "Alternate Earth",
      description: "World where history took a different path",
      atmosphere: "Familiar yet strange, what-if scenarios",
      genres: ["Alternate History", "Science Fiction", "Dystopian"]
    },
    {
      name: "Virtual Reality World",
      description: "Digital realm indistinguishable from reality",
      atmosphere: "Limitless possibilities, identity questions",
      genres: ["Science Fiction", "Cyberpunk", "Thriller"]
    },
    {
      name: "Boarding School",
      description: "Elite educational institution with traditions and secrets",
      atmosphere: "Coming-of-age, social hierarchy, hidden agendas",
      genres: ["Young Adult", "Mystery", "Drama"]
    },
    {
      name: "Wild West Frontier",
      description: "Lawless frontier towns during American expansion",
      atmosphere: "Justice vs survival, rugged individualism",
      genres: ["Western", "Adventure", "Drama"]
    },
    {
      name: "Steampunk London",
      description: "Victorian era with advanced steam-powered technology",
      atmosphere: "Innovation, class contrast, mechanical wonder",
      genres: ["Steampunk", "Adventure", "Romance"]
    },
    {
      name: "Fairy Tale Forest",
      description: "Enchanted woodland where magic is real and dangerous",
      atmosphere: "Wonder, danger, ancient magic",
      genres: ["Fantasy", "Fairy Tale Retelling", "Romance"]
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
    },
    {
      hook: "A librarian discovers books that predict the future",
      potential: "Time magic, prophecy manipulation, responsibility burden",
      genres: ["Fantasy", "Mystery", "Drama"]
    },
    {
      hook: "Every mirror shows a different version of reality",
      potential: "Parallel universes, identity crisis, world-hopping adventure",
      genres: ["Science Fiction", "Fantasy", "Thriller"]
    },
    {
      hook: "A wedding planner must organize their own ex's wedding",
      potential: "Second chance romance, professional pride, emotional growth",
      genres: ["Romance", "Comedy", "Contemporary Fiction"]
    },
    {
      hook: "The world's memory resets every 24 hours except for one person",
      potential: "Time loop variation, saving the world, loneliness burden",
      genres: ["Science Fiction", "Drama", "Thriller"]
    },
    {
      hook: "A detective realizes they're investigating their own past crimes",
      potential: "Memory manipulation, split personality, time travel",
      genres: ["Mystery", "Psychological Thriller", "Science Fiction"]
    },
    {
      hook: "Magic returns to the modern world, but only children can use it",
      potential: "Generational conflict, power dynamics, societal upheaval",
      genres: ["Urban Fantasy", "Young Adult", "Drama"]
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
    },
    {
      hook: "The world's best assassin is hired to kill themselves",
      potential: "Time travel, doppelgangers, identity crisis, moral awakening",
      genres: ["Thriller", "Science Fiction", "Action"]
    },
    {
      hook: "A character can taste emotions in food prepared by others",
      potential: "Culinary magic, empathy burden, restaurant mysteries",
      genres: ["Fantasy", "Mystery", "Romance"]
    },
    {
      hook: "Death takes a vacation and asks someone to fill in",
      potential: "Moral dilemmas, cosmic responsibility, dark comedy",
      genres: ["Fantasy", "Comedy", "Drama"]
    },
    {
      hook: "A character finds their childhood imaginary friend is real",
      potential: "Hidden magical world, growing up themes, supernatural adventure",
      genres: ["Fantasy", "Coming-of-age", "Adventure"]
    },
    {
      hook: "Every photograph taken shows events one hour in the future",
      potential: "Time manipulation, preventing disasters, changing fate",
      genres: ["Science Fiction", "Thriller", "Mystery"]
    },
    {
      hook: "A character wakes up as the villain in their favorite book",
      potential: "Isekai adventure, changing the narrative, redemption arc",
      genres: ["Fantasy", "Adventure", "Comedy"]
    },
    {
      hook: "The apocalypse happens, but only one small town notices",
      potential: "Community bonds, isolation horror, questioning reality",
      genres: ["Horror", "Drama", "Science Fiction"]
    },
    {
      hook: "A character can see the expiration date above everyone's head",
      potential: "Moral burden, saving lives, dealing with inevitability",
      genres: ["Drama", "Thriller", "Fantasy"]
    },
    {
      hook: "Two rival food truck owners are forced to share a kitchen",
      potential: "Enemies to lovers, culinary competition, small business drama",
      genres: ["Romance", "Comedy", "Contemporary Fiction"]
    }
  ];

  const [popularTropes, setPopularTropes] = useState(initialTropes);
  const [popularSettings, setPopularSettings] = useState(initialSettings);
  const [plotStarters, setPlotStarters] = useState(initialPlots);
  
  const [generatedMoreTropes, setGeneratedMoreTropes] = useState(false);
  const [generatedMoreSettings, setGeneratedMoreSettings] = useState(false);
  const [generatedMorePlots, setGeneratedMorePlots] = useState(false);

  const isSelected = (idea: Trope | Setting | PlotStarter, type: string) => {
    return selectedInspirations.some(inspiration => 
      inspiration.name === idea.name && inspiration.type === type
    );
  };

  const handleToggleIdea = (idea: Trope | Setting | PlotStarter, type: string) => {
    if (isSelected(idea, type)) {
      onUnselectIdea({ ...idea, type } as Inspiration);
    } else {
      onSelectIdea({ ...idea, type } as Inspiration);
    }
  };

  const handleRemoveInspiration = (inspiration: Inspiration) => {
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <h3 className="font-semibold">Choose Your Tropes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('tropes')}
                  disabled={generatedMoreTropes}
                  className="flex items-center gap-2 self-start sm:self-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">{generatedMoreTropes ? "All Loaded" : "Generate More"}</span>
                  <span className="sm:hidden">{generatedMoreTropes ? "Loaded" : "More"}</span>
                </Button>
              </div>
              <div className="grid gap-3 md:gap-4">
                {popularTropes.map((trope, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                    <CardContent className="p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {trope.icon}
                            <h4 className="font-semibold truncate">{trope.name}</h4>
                            {isSelected(trope, 'trope') && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
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
                          className="flex-shrink-0 self-start sm:self-auto"
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <h3 className="font-semibold">Choose Your Settings</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('settings')}
                  disabled={generatedMoreSettings}
                  className="flex items-center gap-2 self-start sm:self-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">{generatedMoreSettings ? "All Loaded" : "Generate More"}</span>
                  <span className="sm:hidden">{generatedMoreSettings ? "Loaded" : "More"}</span>
                </Button>
              </div>
              <div className="grid gap-3 md:gap-4">
                {popularSettings.map((setting, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                    <CardContent className="p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold truncate">{setting.name}</h4>
                            {isSelected(setting, 'setting') && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
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
                          className="flex-shrink-0 self-start sm:self-auto"
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <h3 className="font-semibold">Choose Your Plot Starters</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateMore('plots')}
                  disabled={generatedMorePlots}
                  className="flex items-center gap-2 self-start sm:self-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">{generatedMorePlots ? "All Loaded" : "Generate More"}</span>
                  <span className="sm:hidden">{generatedMorePlots ? "Loaded" : "More"}</span>
                </Button>
              </div>
              <div className="grid gap-3 md:gap-4">
                {plotStarters.map((plot, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                    <CardContent className="p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <h4 className="font-semibold text-sm sm:text-base">"{plot.hook}"</h4>
                            {isSelected(plot, 'plot') && <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />}
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
                          className="flex-shrink-0 self-start sm:self-auto"
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
