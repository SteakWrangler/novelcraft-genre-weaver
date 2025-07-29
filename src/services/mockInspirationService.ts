import { InspirationService, Trope, Setting, PlotStarter } from '@/types';
import { Heart, Crown, Sword, Zap, Wand2 } from 'lucide-react';

// Mock implementation of InspirationService with static data
export class MockInspirationService implements InspirationService {
  private tropes: Trope[] = [
    {
      type: 'trope',
      name: "Enemies to Lovers",
      description: "Two characters who start as adversaries gradually fall in love",
      genres: ["Romance", "Fantasy", "Contemporary Fiction"],
      icon: Heart({ className: "w-4 h-4" })
    },
    {
      type: 'trope',
      name: "Chosen One",
      description: "A seemingly ordinary person discovers they're destined for greatness",
      genres: ["Fantasy", "Young Adult", "Science Fiction"],
      icon: Crown({ className: "w-4 h-4" })
    },
    {
      type: 'trope',
      name: "Found Family",
      description: "Characters who aren't related by blood become a tight-knit family unit",
      genres: ["Fantasy", "Adventure", "Contemporary Fiction"],
      icon: Heart({ className: "w-4 h-4" })
    },
    {
      type: 'trope',
      name: "Time Loop",
      description: "Character relives the same day/period until they learn something important",
      genres: ["Science Fiction", "Comedy", "Drama"],
      icon: Zap({ className: "w-4 h-4" })
    },
    {
      type: 'trope',
      name: "Mentor's Death",
      description: "The wise guide dies, forcing the protagonist to continue alone",
      genres: ["Fantasy", "Adventure", "Young Adult"],
      icon: Sword({ className: "w-4 h-4" })
    },
    {
      type: 'trope',
      name: "Fake Relationship",
      description: "Characters pretend to be in a relationship for mutual benefit",
      genres: ["Romance", "Comedy", "Contemporary Fiction"],
      icon: Heart({ className: "w-4 h-4" })
    }
  ];

  private settings: Setting[] = [
    {
      type: 'setting',
      name: "Magic Academy",
      description: "A school where students learn to harness magical abilities",
      atmosphere: "Wonder, coming-of-age, academic pressure",
      genres: ["Fantasy", "Young Adult"]
    },
    {
      type: 'setting',
      name: "Post-Apocalyptic Wasteland",
      description: "Earth after civilization has collapsed",
      atmosphere: "Survival, hope vs despair, rebuilding",
      genres: ["Science Fiction", "Dystopian", "Thriller"]
    },
    {
      type: 'setting',
      name: "Space Station",
      description: "A confined environment in the vast emptiness of space",
      atmosphere: "Isolation, technological wonder, claustrophobia",
      genres: ["Science Fiction", "Thriller", "Horror"]
    },
    {
      type: 'setting',
      name: "Victorian London",
      description: "The fog-shrouded streets of 19th century London",
      atmosphere: "Mystery, class divide, industrial revolution",
      genres: ["Historical Fiction", "Mystery", "Horror"]
    },
    {
      type: 'setting',
      name: "Small Town with Secrets",
      description: "A seemingly perfect community hiding dark truths",
      atmosphere: "Nostalgia, paranoia, close-knit community",
      genres: ["Mystery", "Thriller", "Horror"]
    },
    {
      type: 'setting',
      name: "Corporate Dystopia",
      description: "A world dominated by mega-corporations",
      atmosphere: "Technology, surveillance, rebellion",
      genres: ["Science Fiction", "Dystopian", "Thriller"]
    }
  ];

  private plotStarters: PlotStarter[] = [
    {
      type: 'plot',
      hook: "A character receives a mysterious package with no return address",
      potential: "Mystery box, secret admirer, dangerous conspiracy",
      genres: ["Mystery", "Thriller", "Romance"]
    },
    {
      type: 'plot',
      hook: "The last human on Earth discovers they're not actually alone",
      potential: "Hidden survivors, aliens, time travel, parallel dimensions",
      genres: ["Science Fiction", "Horror", "Drama"]
    },
    {
      type: 'plot',
      hook: "A character can suddenly hear everyone's thoughts",
      potential: "Mind reading curse/gift, conspiracy discovery, relationship drama",
      genres: ["Fantasy", "Science Fiction", "Drama"]
    },
    {
      type: 'plot',
      hook: "Two sworn enemies are forced to work together to survive",
      potential: "Natural disaster, common threat, unlikely alliance",
      genres: ["Adventure", "Romance", "Thriller"]
    },
    {
      type: 'plot',
      hook: "A character wakes up with no memory in an unfamiliar place",
      potential: "Amnesia, witness protection, alternate reality, kidnapping",
      genres: ["Thriller", "Mystery", "Science Fiction"]
    },
    {
      type: 'plot',
      hook: "The new neighbor seems too perfect to be real",
      potential: "Secret identity, supernatural being, con artist, spy",
      genres: ["Mystery", "Thriller", "Paranormal"]
    }
  ];

  async getTropes(): Promise<Trope[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.tropes];
  }

  async getSettings(): Promise<Setting[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.settings];
  }

  async getPlotStarters(): Promise<PlotStarter[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.plotStarters];
  }
}