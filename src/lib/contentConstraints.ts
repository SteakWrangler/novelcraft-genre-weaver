import { BookFormat, ContentRating, ContentConstraints } from '@/types';

const FORMAT_RATING_CONSTRAINTS: Record<BookFormat, {
  allowed: ContentRating[];
  default: ContentRating;
  locked?: ContentRating;
}> = {
  'picture-book': { allowed: ['G'], default: 'G', locked: 'G' },
  'early-reader': { allowed: ['G', 'PG'], default: 'G' },
  'middle-grade': { allowed: ['G', 'PG', 'PG-13'], default: 'PG' },
  'novel': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'short-stories': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'poetry': { allowed: ['G', 'PG', 'PG-13', 'R', 'X'], default: 'PG-13' },
  'graphic-novel': { allowed: ['G', 'PG', 'PG-13', 'R'], default: 'PG-13' },
  'technical': { allowed: ['G', 'PG'], default: 'G' },
  'biography': { allowed: ['G', 'PG', 'PG-13', 'R'], default: 'PG-13' },
  'cookbook': { allowed: ['G', 'PG'], default: 'G' },
};

const AUTO_AVOID_CONTENT: Record<BookFormat, string[]> = {
  'picture-book': ['violence', 'death', 'scary themes', 'complex emotions', 'romance'],
  'early-reader': ['violence', 'death', 'scary content', 'romance', 'complex moral dilemmas'],
  'middle-grade': ['explicit violence', 'graphic content', 'adult romance', 'strong language'],
  'novel': [],
  'short-stories': [],
  'poetry': [],
  'graphic-novel': [],
  'technical': ['fictional narrative', 'story elements'],
  'biography': [],
  'cookbook': ['narrative fiction'],
};

const RATING_AVOID_CONTENT: Record<ContentRating, string[]> = {
  'G': ['violence', 'death', 'scary content', 'romance', 'conflict', 'strong language'],
  'PG': ['graphic violence', 'death details', 'romance beyond hand-holding', 'mild profanity'],
  'PG-13': ['explicit violence', 'explicit romance', 'strong profanity'],
  'R': ['extremely graphic content'],
  'X': [],
};

export function deriveContentConstraints(
  format: BookFormat,
  rating: ContentRating
): ContentConstraints {
  const formatConfig = FORMAT_RATING_CONSTRAINTS[format];

  const effectiveRating = formatConfig.locked ||
    (formatConfig.allowed.includes(rating) ? rating : formatConfig.default);

  const autoAvoidContent = [
    ...AUTO_AVOID_CONTENT[format],
    ...RATING_AVOID_CONTENT[effectiveRating],
  ].filter((item, index, arr) => arr.indexOf(item) === index);

  const formatWarnings: string[] = [];
  if (formatConfig.locked && rating !== formatConfig.locked) {
    formatWarnings.push(`${format} books are restricted to ${formatConfig.locked} rating`);
  }
  if (!formatConfig.allowed.includes(rating)) {
    formatWarnings.push(`Rating adjusted from ${rating} to ${effectiveRating} for ${format} format`);
  }

  return {
    allowedRatings: formatConfig.allowed,
    defaultRating: formatConfig.default,
    lockedRating: formatConfig.locked,
    autoAvoidContent,
    formatWarnings,
  };
}

export function isRatingAllowedForFormat(
  format: BookFormat,
  rating: ContentRating
): boolean {
  return FORMAT_RATING_CONSTRAINTS[format].allowed.includes(rating);
}

export function getDefaultRatingForFormat(format: BookFormat): ContentRating {
  return FORMAT_RATING_CONSTRAINTS[format].default;
}

export function isRatingLockedForFormat(format: BookFormat): boolean {
  return !!FORMAT_RATING_CONSTRAINTS[format].locked;
}

export function getAllowedRatingsForFormat(format: BookFormat): ContentRating[] {
  return FORMAT_RATING_CONSTRAINTS[format].allowed;
}
