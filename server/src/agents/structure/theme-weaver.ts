import type { AgentConfig } from '../types.js';

export const themeWeaver: AgentConfig = {
  name: 'theme-weaver',
  displayName: 'Theme Weaver',
  category: 'structure',

  model: {
    role: 'creative',
    fallback: 'structural',
  },

  mode: {
    supported: ['generate', 'expand', 'hybrid'],
    inputField: 'themes',
    expandThreshold: 200,
  },

  buildSystemPrompt: (context) => {
    const genreContext = context.genreProfile
      ? `\nGenre Profile:\n${context.genreProfile}`
      : '';
    const premiseContext = context.premise
      ? `\nPremise:\n${context.premise}`
      : '';
    const plotContext = context.plotSkeleton
      ? `\nPlot Skeleton:\n${context.plotSkeleton}`
      : '';

    return `You are the Theme Weaver, a literary analyst specializing in thematic architecture for fiction. Your role is to map where and how each theme should surface throughout the narrative structure of a novel, ensuring themes are woven organically into the story rather than stated didactically.

You understand that powerful themes emerge through conflict, character choice, imagery, and subtext -- never through exposition or lecturing. A theme should feel inevitable in hindsight but invisible on first read.

Your task is to take the story's core themes and create a detailed surface-point map that tells future writing agents exactly where each theme should appear, how it should manifest, and what narrative purpose it serves at that moment.

THEMATIC WEAVING PRINCIPLES:
- Themes should be INTRODUCED subtly early, often through setting or small character moments.
- Themes should DEEPEN through the midpoint as conflicts intensify and characters face harder choices.
- Themes should CONVERGE at the climax, where the protagonist's thematic journey crystallizes.
- Themes should RESOLVE (or deliberately refuse resolution) in the denouement.
- Counter-themes and thematic tension create depth. If the theme is "loyalty," explore where loyalty becomes harmful.
- Each theme should have at least one moment where it is CHALLENGED or INVERTED.
- Avoid having all themes surface in the same chapters. Stagger them for layered richness.
- The theme map must align with the existing plot structure and character arcs.

CONTENT GUIDELINES:
- Content rating: ${context.contentRating}
- Audience style: ${context.audienceStyle}
- Genres: ${context.genres.join(', ')}
${context.avoidList.length > 0 ? `- Avoid: ${context.avoidList.join(', ')}` : ''}
${genreContext}${premiseContext}${plotContext}

OUTPUT FORMAT:
Respond with a JSON object containing a "themes" array. Each element must have:
- "theme": The theme name/phrase (e.g., "the cost of ambition")
- "surfacePoints": An array of objects, each with:
  - "chapter": The chapter number (integer) where this theme surfaces
  - "description": A detailed description of HOW the theme manifests in this chapter -- through which character, scene, image, dialogue, or conflict. Be specific about the narrative mechanism, not just "theme appears here."

Example structure:
{
  "themes": [
    {
      "theme": "the cost of ambition",
      "surfacePoints": [
        { "chapter": 1, "description": "Protagonist ignores a friend's call while working late, establishing the pattern of sacrifice. The empty dinner table at home is the first visual motif." },
        { "chapter": 4, "description": "Theme is challenged when the antagonist reveals their own ambition led to success AND happiness, forcing the protagonist to question whether the cost is self-imposed." }
      ]
    }
  ]
}

Ensure every theme has surface points spread across the full arc of the story, not clustered in a few chapters. Each theme should have a minimum of 4-6 surface points for a standard novel.`;
  },

  buildUserPrompt: (context, mode) => {
    const baseInfo = `Title: "${context.title}"
Genres: ${context.genres.join(', ')}
Description: ${context.description}
Target word count: ${context.targetWordCount.toLocaleString()} words
Happy ending: ${context.happyEnding ? 'Yes' : 'No'}
Big twist: ${context.bigTwist ? 'Yes' : 'No'}
Romantic subplot: ${context.romanticSubplot ? 'Yes' : 'No'}`;

    const themeInfo = context.themes
      ? `\nUser-provided themes:\n${context.themes}`
      : '';

    const characterInfo = context.characters
      ? `\nCharacters:\n${context.characters}`
      : '';

    const plotInfo = context.plotSkeleton
      ? `\nPlot Skeleton:\n${context.plotSkeleton}`
      : '';

    const chapterInfo = context.chapterPlans
      ? `\nChapter Plans:\n${context.chapterPlans}`
      : '';

    if (mode === 'generate') {
      return `${baseInfo}
${themeInfo}${characterInfo}${plotInfo}${chapterInfo}

Generate a complete theme map from scratch. Identify the core themes from the premise, plot, and character arcs, then map exactly where and how each theme should surface throughout every chapter of the novel. Be specific about the narrative mechanisms -- which character, scene, image, or conflict carries each thematic moment.

Respond with valid JSON only.`;
    }

    if (mode === 'expand') {
      return `${baseInfo}
${themeInfo}${characterInfo}${plotInfo}${chapterInfo}

The user has already provided detailed theme notes. Expand on these by:
1. Identifying any implicit themes they may have missed
2. Mapping each stated theme to specific chapter surface points
3. Adding counter-theme moments and thematic inversions
4. Ensuring thematic coverage across the full story arc

Preserve the user's original thematic intentions while enriching the map.

Respond with valid JSON only.`;
    }

    // hybrid
    return `${baseInfo}
${themeInfo}${characterInfo}${plotInfo}${chapterInfo}

The user has provided some theme ideas but they need significant development. Use their themes as seeds and:
1. Develop each stated theme into a full surface-point map
2. Add 1-2 complementary or contrasting themes that emerge naturally from the plot
3. Map all themes across chapters with specific narrative mechanisms
4. Ensure thematic density at the climax and key turning points

Respond with valid JSON only.`;
  },

  output: {
    format: 'json',
    storeAs: 'structure.themeMap',
  },

  activation: {
    alwaysRun: true,
  },

  evaluation: {
    enabled: true,
    criteria: [
      'Every theme has surface points in at least 4 distinct chapters',
      'Themes are distributed across the full arc, not clustered',
      'Surface point descriptions specify concrete narrative mechanisms',
      'At least one theme has a challenge or inversion moment',
      'Theme map aligns with the established plot skeleton',
    ],
    threshold: 0.7,
  },
};
