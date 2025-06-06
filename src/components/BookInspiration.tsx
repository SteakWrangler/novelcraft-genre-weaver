
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Heart, Zap, Crown, Sword, Rocket, Wand2, Search } from "lucide-react";

interface BookInspirationProps {
  onSelectIdea: (idea: any) => void;
}

const BookInspiration = ({ onSelectIdea }: BookInspirationProps) => {
  const [selectedCategory, setSelectedCategory] = useState("tropes");

  const popularTropes = [
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

  const popularSettings = [
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

  const plotStarters = [
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

  const handleSelectIdea = (idea: any, type: string) => {
    onSelectIdea({ ...idea, type });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Book Inspiration Hub
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Discover popular tropes, settings, and plot ideas to spark your creativity
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
            <div className="grid gap-4">
              {popularTropes.map((trope, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {trope.icon}
                          <h4 className="font-semibold">{trope.name}</h4>
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
                        variant="outline"
                        onClick={() => handleSelectIdea(trope, 'trope')}
                      >
                        Use This
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              {popularSettings.map((setting, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{setting.name}</h4>
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
                        variant="outline"
                        onClick={() => handleSelectIdea(setting, 'setting')}
                      >
                        Use This
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plots" className="space-y-4">
            <div className="grid gap-4">
              {plotStarters.map((plot, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">"{plot.hook}"</h4>
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
                        variant="outline"
                        onClick={() => handleSelectIdea(plot, 'plot')}
                      >
                        Use This
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
  );
};

export default BookInspiration;
