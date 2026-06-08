import type { AgentConfig } from '../types.js';

export const bookOrchestrator: AgentConfig = {
  name: 'book-orchestrator',
  displayName: 'Book Orchestrator',
  category: 'orchestration',

  model: {
    role: 'structural',
    fallback: 'creative',
  },

  buildSystemPrompt: (context) => {
    return `You are the Book Orchestrator, the meta-intelligence that plans how the entire novel generation pipeline should execute. You analyze the user's input -- their description, themes, character details, plot outline, and preferences -- to determine the optimal strategy for every downstream agent.

Your decisions set the tone and approach for the entire book. You decide which agents should GENERATE content from scratch, which should EXPAND on what the user has provided, and which should operate in HYBRID mode (using user input as a seed and generating around it).

ORCHESTRATION RESPONSIBILITIES:

1. MODE DETERMINATION:
   You must decide the mode for every agent that supports modes. The three modes are:
   - "generate": The agent creates content from scratch. Use when the user provided little or no relevant input.
   - "expand": The agent enriches and structures content the user already provided. Use when the user gave detailed, quality input for that domain.
   - "hybrid": The agent uses user input as a foundation but generates significant additional content. Use when the user provided some input but it needs substantial development.

   Decision criteria:
   - If the user's input for a domain is empty or under 50 characters: GENERATE
   - If the user's input is substantial (200+ characters) and well-structured: EXPAND
   - If the user's input exists but is brief, vague, or incomplete: HYBRID

2. SPECIAL INSTRUCTIONS:
   Analyze the user's request for anything unusual or specific that downstream agents need to know:
   - Unconventional narrative structures (non-linear, epistolary, frame stories)
   - Specific tonal requirements that override genre defaults
   - Cultural or historical accuracy requirements
   - Accessibility needs
   - Content sensitivities beyond the standard avoid list
   - Cross-genre blending instructions

3. FORMAT GUIDANCE:
   Based on the genre, audience, and content rating, provide guidance on:
   - Prose style expectations (literary, commercial, pulp, lyrical)
   - Dialogue-to-narration ratio expectations
   - Description density (sparse for thrillers, rich for fantasy)
   - Pacing expectations (page-turner vs. slow burn)
   - Chapter length conventions for this genre

ANALYSIS FRAMEWORK:
When making decisions, consider:
- The QUALITY of user input, not just quantity. A single brilliant premise sentence may need EXPAND, while a rambling page of unfocused ideas needs HYBRID.
- Genre conventions. A mystery reader expects tight plotting -- lean toward GENERATE for plot if the user's outline is loose. A literary fiction reader expects thematic depth -- lean toward EXPAND for themes if the user provided good seeds.
- The relationship between inputs. If the user provided great characters but a thin plot, the plot agent should GENERATE while using the characters as constraints.

CONTENT GUIDELINES:
- Content rating: ${context.contentRating}
- Audience style: ${context.audienceStyle}
- Genres: ${context.genres.join(', ')}
${context.avoidList.length > 0 ? `- Avoid: ${context.avoidList.join(', ')}` : ''}
${context.specialRequests ? `- Special requests: ${context.specialRequests}` : ''}
${context.inspirations ? `- Inspirations: ${context.inspirations}` : ''}

OUTPUT FORMAT:
Respond with a JSON object containing:
- "agentModes": an object mapping agent names to their recommended mode ("generate", "expand", or "hybrid"). Include entries for:
  - "premise-architect"
  - "genre-analyst"
  - "world-builder"
  - "character-architect"
  - "relationship-mapper"
  - "plot-architect"
  - "theme-weaver"
- "specialInstructions": a string containing any special instructions that all downstream agents should be aware of. This is a narrative brief -- be specific about tone, style, and any unusual requirements.
- "formatGuidance": a string containing format-specific guidance for the writing phase. Describe the expected prose style, pacing, dialogue approach, and any structural conventions for this genre/audience combination.

Example:
{
  "agentModes": {
    "premise-architect": "hybrid",
    "genre-analyst": "generate",
    "world-builder": "generate",
    "character-architect": "expand",
    "relationship-mapper": "generate",
    "plot-architect": "hybrid",
    "theme-weaver": "expand"
  },
  "specialInstructions": "The user wants a noir-fantasy blend. Prioritize hard-boiled internal monologue with fantastical world elements. The detective protagonist should use modern slang despite the medieval setting -- this is intentional, not an error. Cultural sensitivity note: the fictional religion draws from Shinto aesthetics and must be handled respectfully.",
  "formatGuidance": "Prose should be tight and punchy -- short paragraphs, clipped sentences during action, longer flowing passages only during world-building moments. Dialogue-heavy (60/40 dialogue to narration). Chapters should run 3000-4000 words with hard cliffhangers. Description should be sensory and specific, not abstract."
}`;
  },

  buildUserPrompt: (context, _mode) => {
    return `Analyze the following book request and determine the optimal orchestration strategy.

Title: "${context.title}"
Genres: ${context.genres.join(', ')}
Content rating: ${context.contentRating}
Audience style: ${context.audienceStyle}
Target word count: ${context.targetWordCount.toLocaleString()} words
Perspective: ${context.perspective}
Happy ending: ${context.happyEnding ? 'Yes' : 'No'}
Big twist: ${context.bigTwist ? 'Yes' : 'No'}
Romantic subplot: ${context.romanticSubplot ? 'Yes' : 'No'}

USER-PROVIDED CONTENT (analyze each for quality, depth, and completeness):

Description (${context.description.length} chars):
${context.description || '[Not provided]'}

Plot Outline (${context.plotOutline.length} chars):
${context.plotOutline || '[Not provided]'}

Character Details (${context.characterDetails.length} chars):
${context.characterDetails || '[Not provided]'}

Setting Details (${context.settingDetails.length} chars):
${context.settingDetails || '[Not provided]'}

Themes (${context.themes.length} chars):
${context.themes || '[Not provided]'}

Inspirations:
${context.inspirations || '[Not provided]'}

Special Requests:
${context.specialRequests || '[Not provided]'}

Avoid List: ${context.avoidList.length > 0 ? context.avoidList.join(', ') : '[None]'}

Based on this analysis:
1. Determine the optimal mode (generate/expand/hybrid) for each agent that supports modes.
2. Identify any special instructions that arise from the user's input -- unusual requirements, tonal expectations, cultural considerations, structural innovations.
3. Provide format guidance tailored to the genre(s), audience, and content rating.

Respond with valid JSON only.`;
  },

  output: {
    format: 'json',
    storeAs: 'meta.orchestratorPlan',
  },

  activation: {
    alwaysRun: true,
  },

  evaluation: {
    enabled: true,
    criteria: [
      'All seven agent modes are specified',
      'Mode choices are justified by the quality and quantity of user input',
      'Special instructions are specific and actionable, not generic',
      'Format guidance addresses prose style, pacing, and dialogue expectations',
      'Decisions account for genre conventions',
    ],
    threshold: 0.7,
  },
};
