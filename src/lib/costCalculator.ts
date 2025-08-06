import { BookFormat, CostFactors, CostEstimate, CostBreakdown, QualityLevel } from '@/types';

// OpenAI API pricing (per million tokens)
const MODEL_PRICING = {
  'gpt-4o': {
    input: 3.00,    // $3 per 1M input tokens
    output: 10.00,  // $10 per 1M output tokens
    name: 'GPT-4o'
  },
  'gpt-4o-mini': {
    input: 0.15,    // $0.15 per 1M input tokens
    output: 0.60,   // $0.60 per 1M output tokens
    name: 'GPT-4o Mini'
  }
};

// Token estimation by format
const TOKEN_ESTIMATES = {
  'novel': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 2.5),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33),
    agentMultiplier: 1.0,
    editingFactor: 1.5
  },
  'picture-book': {
    baseInputTokens: (wordCount: number) => Math.max(50000, wordCount * 8),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33) + 30000,
    agentMultiplier: 1.2,
    editingFactor: 1.3
  },
  'early-reader': {
    baseInputTokens: (wordCount: number) => Math.max(30000, wordCount * 5),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33) + 15000,
    agentMultiplier: 1.1,
    editingFactor: 1.2
  },
  'middle-grade': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 3),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33),
    agentMultiplier: 1.0,
    editingFactor: 1.4
  },
  'graphic-novel': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 4),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 2),
    agentMultiplier: 1.1,
    editingFactor: 1.2
  },
  'poetry': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 3),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.5),
    agentMultiplier: 1.2,
    editingFactor: 1.6
  },
  'short-stories': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 2.2),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33),
    agentMultiplier: 1.0,
    editingFactor: 1.3
  },
  'technical': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 3.5),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33),
    agentMultiplier: 1.3,
    editingFactor: 1.7
  },
  'biography': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 2.8),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.33),
    agentMultiplier: 1.1,
    editingFactor: 1.5
  },
  'cookbook': {
    baseInputTokens: (wordCount: number) => Math.floor(wordCount * 4),
    baseOutputTokens: (wordCount: number) => Math.floor(wordCount * 1.5),
    agentMultiplier: 1.2,
    editingFactor: 1.4
  }
};

// Genre complexity multipliers
const GENRE_COMPLEXITY = {
  'Romance': 1.0,
  'Fantasy': 1.4,
  'Science Fiction': 1.5,
  'Mystery': 1.3,
  'Thriller': 1.2,
  'Horror': 1.1,
  'Historical Fiction': 1.4,
  'Contemporary Fiction': 1.0,
  'Young Adult': 1.1,
  'Adventure': 1.2,
  'Comedy': 1.0,
  'Drama': 1.1,
  'Western': 1.2,
  'Crime': 1.3,
  'Paranormal': 1.3,
  'Dystopian': 1.4,
  'Literary Fiction': 1.3,
  'Magical Realism': 1.4,
  'Biographical': 1.2,
  'Urban Fantasy': 1.3,
  'Space Opera': 1.5,
  'Cyberpunk': 1.4,
  'Steampunk': 1.4,
  'Post-Apocalyptic': 1.3,
  'Cozy Mystery': 1.1,
  'Psychological Thriller': 1.4,
  'Gothic': 1.3,
  'Satire': 1.2,
  'Alternate History': 1.4,
  // Children's book genres
  'Friendship': 1.0,
  'Family': 1.0,
  'Educational': 1.1,
  'Animals': 1.0,
  'Bedtime': 0.9,
  'Counting': 0.8,
  'Colors': 0.8,
  'Shapes': 0.8
};

// POV complexity multipliers
const POV_COMPLEXITY = {
  'first-person': 1.0,
  'third-person': 1.1,
  'multiple-pov': 1.3
};

function getModelForQuality(quality: QualityLevel) {
  switch (quality) {
    case 'basic':
      return MODEL_PRICING['gpt-4o-mini'];
    case 'premium':
    case 'professional':
    default:
      return MODEL_PRICING['gpt-4o'];
  }
}

function estimateWordCount(pages: number, format: BookFormat): number {
  const wordsPerPage = {
    'novel': 250,
    'picture-book': 15,
    'early-reader': 100,
    'middle-grade': 200,
    'graphic-novel': 100,
    'poetry': 50,
    'short-stories': 250,
    'technical': 300,
    'biography': 250,
    'cookbook': 150
  };
  
  return pages * (wordsPerPage[format] || 250);
}

export function calculateEstimatedCost(
  pages: number,
  format: BookFormat = 'novel',
  genre: string = 'Contemporary Fiction',
  qualityLevel: QualityLevel = 'premium',
  options: {
    perspective?: string;
    bigTwist?: boolean;
    romanticSubplot?: boolean;
    happyEnding?: boolean;
    specialRequests?: string;
    illustrationCount?: number;
  } = {}
): CostEstimate {
  const wordCount = estimateWordCount(pages, format);
  const formatConfig = TOKEN_ESTIMATES[format] || TOKEN_ESTIMATES['novel'];
  const model = getModelForQuality(qualityLevel);
  
  // Base token calculations
  const baseInputTokens = formatConfig.baseInputTokens(wordCount);
  const baseOutputTokens = formatConfig.baseOutputTokens(wordCount);
  
  // Apply multipliers
  const genreMultiplier = GENRE_COMPLEXITY[genre] || 1.0;
  const povMultiplier = options.perspective ? (POV_COMPLEXITY[options.perspective as keyof typeof POV_COMPLEXITY] || 1.0) : 1.0;
  const agentMultiplier = formatConfig.agentMultiplier;
  const editingMultiplier = formatConfig.editingFactor;
  
  // Calculate enhancement factors
  let enhancementFactor = 1.0;
  if (options.bigTwist) enhancementFactor += 0.15;
  if (options.romanticSubplot) enhancementFactor += 0.1;
  if (options.specialRequests && options.specialRequests.length > 100) enhancementFactor += 0.2;
  
  // Apply all multipliers
  const totalMultiplier = genreMultiplier * povMultiplier * agentMultiplier * enhancementFactor;
  const finalInputTokens = Math.floor(baseInputTokens * totalMultiplier);
  const finalOutputTokens = Math.floor(baseOutputTokens * totalMultiplier * editingMultiplier);
  
  // Calculate costs (convert from millions)
  const inputCost = (finalInputTokens / 1000000) * model.input;
  const outputCost = (finalOutputTokens / 1000000) * model.output;
  const baseCost = inputCost + outputCost;
  
  // Illustration costs
  const illustrationCost = (options.illustrationCount || 0) * 0.05; // Approximate cost for illustration descriptions
  
  // Create detailed breakdown
  const breakdown: CostBreakdown = {
    plotting: baseCost * 0.15,
    characters: baseCost * 0.12,
    writing: baseCost * 0.45,
    editing: baseCost * 0.15,
    review: baseCost * 0.08,
    polish: baseCost * 0.05,
    base: baseCost,
    enhancements: baseCost * (enhancementFactor - 1),
    illustrations: illustrationCost,
    total: baseCost + illustrationCost
  };
  
  // Add buffer for iterations and retries (20-40%)
  const minCost = breakdown.total * 1.2;
  const maxCost = breakdown.total * 1.4;
  
  // Determine confidence based on format and options
  let confidence: 'low' | 'medium' | 'high' = 'medium';
  if (format === 'novel' && !options.specialRequests) confidence = 'high';
  if (format === 'picture-book' || format === 'early-reader') confidence = 'high';
  if (options.specialRequests && options.specialRequests.length > 200) confidence = 'low';
  
  return {
    estimated: breakdown.total,
    range: { min: minCost, max: maxCost },
    breakdown,
    confidence
  };
}

export function getFormatDetails(format: BookFormat) {
  const details = {
    'novel': {
      name: 'Novel',
      description: 'Full-length fiction book',
      defaultPages: 300,
      wordRange: '50K-100K words',
      estimatedTime: '3-8 minutes'
    },
    'picture-book': {
      name: 'Picture Book',
      description: 'Illustrated children\'s book',
      defaultPages: 32,
      wordRange: '0-1K words',
      estimatedTime: '1-2 minutes'
    },
    'early-reader': {
      name: 'Early Reader',
      description: 'Simple chapter book for children',
      defaultPages: 64,
      wordRange: '1K-5K words',
      estimatedTime: '1-3 minutes'
    },
    'middle-grade': {
      name: 'Middle Grade',
      description: 'Chapter book for ages 8-12',
      defaultPages: 150,
      wordRange: '20K-50K words',
      estimatedTime: '2-5 minutes'
    },
    'graphic-novel': {
      name: 'Graphic Novel',
      description: 'Sequential art storytelling',
      defaultPages: 100,
      wordRange: '10K-30K words',
      estimatedTime: '2-4 minutes'
    },
    'poetry': {
      name: 'Poetry Collection',
      description: 'Collection of poems',
      defaultPages: 80,
      wordRange: '5K-15K words',
      estimatedTime: '2-4 minutes'
    },
    'short-stories': {
      name: 'Short Stories',
      description: 'Collection of short stories',
      defaultPages: 200,
      wordRange: '30K-60K words',
      estimatedTime: '3-6 minutes'
    },
    'technical': {
      name: 'Technical/Educational',
      description: 'How-to or educational book',
      defaultPages: 250,
      wordRange: '40K-80K words',
      estimatedTime: '4-8 minutes'
    },
    'biography': {
      name: 'Biography',
      description: 'Life story or memoir',
      defaultPages: 300,
      wordRange: '60K-100K words',
      estimatedTime: '4-8 minutes'
    },
    'cookbook': {
      name: 'Cookbook',
      description: 'Recipe collection with instructions',
      defaultPages: 150,
      wordRange: '20K-40K words',
      estimatedTime: '3-5 minutes'
    }
  };
  
  return details[format] || details['novel'];
}

// Quick estimation for format comparison
export function getQuickCostEstimate(format: BookFormat, pages: number): { min: number; max: number } {
  const estimate = calculateEstimatedCost(pages, format);
  return estimate.range;
}