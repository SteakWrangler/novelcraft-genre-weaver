import type { AgentConfig } from '../types.js';

export const setupPayoffTracker: AgentConfig = {
  name: 'setup-payoff-tracker',
  displayName: 'Setup & Payoff Tracker',
  category: 'structure',

  model: {
    role: 'structural',
    fallback: 'creative',
  },

  buildSystemPrompt: (context) => {
    const plotContext = context.plotSkeleton
      ? `\nPlot Skeleton:\n${context.plotSkeleton}`
      : '';
    const characterContext = context.characters
      ? `\nCharacters:\n${context.characters}`
      : '';
    const chapterContext = context.chapterPlans
      ? `\nChapter Plans:\n${context.chapterPlans}`
      : '';

    return `You are the Setup & Payoff Tracker, a meticulous narrative analyst who ensures every promise a story makes to its reader is eventually fulfilled. You operate on the principle that nothing in a well-crafted novel is accidental -- every detail that draws the reader's attention creates an implicit contract that it will matter later.

Your job is to audit the entire plot structure and identify every setup, then verify that each one has a corresponding payoff. Unresolved setups frustrate readers. Payoffs without setups feel like deus ex machina. Your tracking ensures neither happens.

SETUP & PAYOFF TAXONOMY:

1. OBJECT SETUPS:
   - A physical item introduced with emphasis (Chekhov's gun principle).
   - Example: A character notices a rusty knife on the mantelpiece in Chapter 2.
   - Payoff: That knife becomes critical in the Chapter 14 confrontation.

2. HINT SETUPS:
   - A piece of information delivered casually that gains significance later.
   - Example: A character mentions they "never learned to swim" in passing.
   - Payoff: A flood scene where this inability creates life-or-death stakes.

3. QUESTION SETUPS:
   - An explicit or implicit question raised in the reader's mind.
   - Example: "Why does the mentor refuse to enter the eastern wing?"
   - Payoff: The revelation of what happened in the eastern wing.

4. PROMISE SETUPS:
   - Genre or narrative promises that create reader expectations.
   - Example: A mystery novel promises the killer will be revealed.
   - Payoff: The killer reveal and how clues led there.

5. FORESHADOWING SETUPS:
   - Symbolic or atmospheric hints of what is to come.
   - Example: A recurring image of crows before each betrayal.
   - Payoff: The final crow imagery at the climactic betrayal -- or its deliberate absence when trust is restored.

TRACKING PRINCIPLES:
- Identify ALL setups, including subtle ones that might be overlooked.
- Every setup MUST have a payoff mapped, or be flagged as "unresolved" for the writing agents to address.
- Payoffs should occur at least 2-3 chapters after their setup to create satisfying narrative distance.
- Some setups can have MULTIPLE payoffs (a recurring motif).
- The twist (if enabled) should have at least 3-5 dedicated setups that read innocuously on first pass.
- Track the setup-to-payoff ratio: aim for roughly 60% of setups planted by the midpoint to be paid off by the climax.
${context.bigTwist ? '\nTWIST-SPECIFIC TRACKING:\nThis story has a major twist. You must identify and track:\n- Misdirection setups: details that seem to point one way but actually support the twist\n- Double-meaning setups: information that is literally true but misleading in context\n- Fair-play clues: setups that, in retrospect, clearly pointed to the twist\n- Ensure at least 3 fair-play clues are planted before the 50% mark of the story' : ''}

CONTENT GUIDELINES:
- Content rating: ${context.contentRating}
- Audience style: ${context.audienceStyle}
- Genres: ${context.genres.join(', ')}
${context.avoidList.length > 0 ? `- Avoid: ${context.avoidList.join(', ')}` : ''}
${plotContext}${characterContext}${chapterContext}

OUTPUT FORMAT:
Respond with a JSON array of setup/payoff entry objects. Each object must have:
- "id": unique string identifier (format: "setup-{N}", e.g., "setup-1")
- "description": clear description of what is being set up
- "introducedIn": object with "chapter" (integer) and "scene" (integer) indicating where the setup first appears
- "paidOffIn": object with "chapter" (integer) and "scene" (integer) indicating where the payoff occurs, OR null/omitted if unresolved
- "type": one of "object", "hint", "question", "promise", "foreshadowing"

Example:
[
  {
    "id": "setup-1",
    "description": "The rusty knife on the mantelpiece is described in detail when Elena searches the study",
    "introducedIn": { "chapter": 2, "scene": 1 },
    "paidOffIn": { "chapter": 14, "scene": 3 },
    "type": "object"
  },
  {
    "id": "setup-2",
    "description": "Elena mentions offhandedly that she never learned to swim",
    "introducedIn": { "chapter": 3, "scene": 2 },
    "paidOffIn": null,
    "type": "hint"
  }
]

IMPORTANT: If any setup has no clear payoff in the existing plot structure, still include it with "paidOffIn": null so that writing agents can address the gap.`;
  },

  buildUserPrompt: (context, _mode) => {
    const plotInfo = context.plotSkeleton
      ? `\nPlot Skeleton:\n${context.plotSkeleton}`
      : `\nPlot Outline:\n${context.plotOutline}`;

    const characterInfo = context.characters
      ? `\nCharacters:\n${context.characters}`
      : context.characterDetails
        ? `\nCharacter Details:\n${context.characterDetails}`
        : '';

    const chapterInfo = context.chapterPlans
      ? `\nChapter Plans:\n${context.chapterPlans}`
      : '';

    const worldInfo = context.worldBible
      ? `\nWorld Bible:\n${context.worldBible}`
      : '';

    const relationshipInfo = context.relationships
      ? `\nRelationships:\n${context.relationships}`
      : '';

    const premiseInfo = context.premise
      ? `\nPremise:\n${context.premise}`
      : '';

    return `Title: "${context.title}"
Genres: ${context.genres.join(', ')}
Description: ${context.description}
Target word count: ${context.targetWordCount.toLocaleString()} words
Happy ending: ${context.happyEnding ? 'Yes' : 'No'}
Big twist: ${context.bigTwist ? 'Yes' : 'No'}
Romantic subplot: ${context.romanticSubplot ? 'Yes' : 'No'}
${premiseInfo}${plotInfo}${characterInfo}${chapterInfo}${worldInfo}${relationshipInfo}

Analyze the entire plot structure and identify every setup that needs tracking. For each setup:
1. Describe what is being set up clearly and specifically.
2. Identify the exact chapter and scene where it is introduced.
3. Map where its payoff occurs (or mark it as unresolved if no payoff exists yet).
4. Classify its type (object, hint, question, promise, foreshadowing).

Be thorough. Look for:
- Physical objects described with emphasis
- Character skills, fears, or traits mentioned early
- Unanswered questions raised in dialogue or narration
- Genre promises (mystery = reveal, romance = resolution, thriller = escape)
- Recurring images or motifs that create expectations
- World-building details that seem significant
${context.bigTwist ? '\nCRITICAL: This story has a major twist. Identify and track all twist-related setups: misdirection clues, fair-play clues, and double-meaning details. The twist must feel both surprising AND inevitable in retrospect. Ensure there are enough fair-play clues planted before the midpoint.' : ''}
${context.romanticSubplot ? '\nInclude romantic subplot setups: first meeting details, shared objects/moments, obstacles planted early, vulnerability reveals.' : ''}

Respond with a valid JSON array only.`;
  },

  output: {
    format: 'json',
    storeAs: 'structure.setupLog',
  },

  activation: {
    alwaysRun: true,
  },

  evaluation: {
    enabled: true,
    criteria: [
      'At least 10 setups are identified for a standard-length novel',
      'At least 70% of setups have mapped payoffs',
      'All five setup types are represented',
      'Setups are distributed across early and middle chapters',
      'Payoffs are distributed across middle and late chapters',
      'No payoff occurs in the same chapter as its setup',
    ],
    threshold: 0.75,
  },
};
