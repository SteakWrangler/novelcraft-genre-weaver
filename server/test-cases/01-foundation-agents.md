# Foundation Phase — Manual QA Test Cases

> **Purpose**: Validate that all 6 Foundation Phase agents produce structurally correct, creatively rich, and internally consistent outputs. Each test case specifies exact input JSON, expected output criteria, and red flags that indicate failure.

> **How to run**: POST each test case's input to `POST /api/generate` (or invoke the agent runner directly via `server/src/agents/runner.ts`). Capture the raw JSON output from the agent and evaluate it against the checklist below.

---

## Shared Test Story

All test cases (unless otherwise noted) use the same fictional project to ensure cross-agent consistency is verifiable:

| Field | Value |
|---|---|
| **Title** | *The Clockwork Conscience* |
| **Genre(s)** | Steampunk, Mystery/Thriller |
| **Setting** | 1887 London — an alternate history where Charles Babbage's Analytical Engine succeeded and clockwork automata are part of daily life |
| **Protagonist** | Elara Voss, a detective with the Bureau of Mechanical Affairs |
| **Core premise** | Sentient automata are awakening across London, and someone is orchestrating the awakenings for a purpose no one understands |
| **Content rating** | PG-13 |
| **Target word count** | 80,000 |
| **Perspective** | Third-person |
| **Happy ending** | Yes |
| **Big twist** | Yes |
| **Romantic subplot** | No |
| **Audience style** | Adult |

---

## Agent 1: Premise Architect

**Agent file**: `server/src/agents/foundation/premise-architect.ts`
**Output stored as**: `foundation.premise`
**Output type**: `PremiseOutput` — JSON object with keys: `hook`, `centralConflict`, `stakes`, `themeSeeds`, `tone`, `logline`

---

### Test Case 1A: Generate Mode

**Scenario**: The user provides a short, 69-character seed description. The agent must operate in `generate` mode and invent a fully realized premise from minimal input.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "A detective in steampunk London investigates sentient automata.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000
}
```

**Mode**: `generate` (description is 69 characters, well under the 200-character `expandThreshold`)

#### Expected Output Criteria

- [ ] Output is valid JSON (parseable, no trailing commas, no comments)
- [ ] JSON object contains exactly 6 keys: `hook`, `centralConflict`, `stakes`, `themeSeeds`, `tone`, `logline`
- [ ] **hook**: 2-4 sentences. Describes a SPECIFIC scenario, not a generic concept. Should reference steampunk London, automata, and the detective's involvement in concrete terms. The reader should immediately want to know what happens next.
- [ ] **centralConflict**: 3-5 sentences. Defines clear opposing forces — what the protagonist wants, what stands in the way, and why compromise is impossible. The conflict must have no obvious or easy resolution.
- [ ] **stakes**: 3-5 sentences. Structured in escalating order: PERSONAL stakes first (what happens to Elara emotionally/physically), then SOCIETAL stakes (what happens to London/the wider world), then EXISTENTIAL stakes (what larger truth or meaning hangs in the balance). The reader must feel visceral concern.
- [ ] **themeSeeds**: Array of 3-6 strings. Each string is a multi-word DEBATABLE phrase (not a single word). Example of good: "the moral cost of denying consciousness to convenience" — Example of bad: "freedom" or "technology." Themes should pose questions, not preach answers.
- [ ] **tone**: 2-3 sentences. Describes the emotional texture of the narrative with nuance. Must be consistent with PG-13 content rating and the Steampunk/Mystery genre blend. Should feel like a reading experience description, not a genre label.
- [ ] **logline**: A single sentence, maximum 40 words. Captures protagonist, conflict, and stakes. Should read like the back-cover pitch that makes a reader pick up the book.

#### Red Flags

- [ ] Output is wrapped in markdown code fences (` ```json ... ``` `) — agent prompt explicitly says "No markdown fences"
- [ ] Hook is generic (e.g., "A woman discovers something strange is happening in her city") rather than specific to the steampunk/automata scenario
- [ ] Central conflict has an easy solution (e.g., "just shut down the automata" or "arrest the obvious villain")
- [ ] Theme seeds are single words (e.g., "freedom", "justice", "identity")
- [ ] Theme seeds are preachy/moralistic (e.g., "slavery is wrong") rather than debatable
- [ ] Logline exceeds 40 words (count carefully)
- [ ] Logline is multiple sentences
- [ ] Output includes a romantic subplot despite `romanticSubplot: false`
- [ ] Stakes are only abstract/societal with no personal dimension
- [ ] Tone description contradicts PG-13 rating (e.g., references graphic violence or explicit content)
- [ ] Output contains preamble text, commentary, or explanations outside the JSON object

---

### Test Case 1B: Expand Mode

**Scenario**: The user provides a detailed, 487-character description with specific character names, organizations, plot elements, and inspirational references. The agent must operate in `expand` mode and honor every user-provided detail while enriching the premise.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss works for the Bureau of Mechanical Affairs in 1887 London, investigating crimes involving clockwork automata. When automata across the city begin exhibiting signs of genuine sentience — a porcelain-faced maid who weeps, a factory automaton that refuses to work in dangerous conditions, a mechanical dog that protects a street orphan — Elara must determine if this is a malfunction, a weapon, or an evolution. The Bureau's director has personal reasons for wanting the awakenings stopped. Inspired by Bladerunner and The Difference Engine.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "Bladerunner, The Difference Engine",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000
}
```

**Mode**: `expand` (description is 487 characters, above the 200-character `expandThreshold`)

#### Expected Output Criteria

- [ ] Output is valid JSON with exactly 6 keys: `hook`, `centralConflict`, `stakes`, `themeSeeds`, `tone`, `logline`
- [ ] **Preserves user details**: The hook and/or centralConflict reference the specific awakening examples the user provided (weeping maid, refusing factory automaton, protective mechanical dog)
- [ ] **References Elara by name**: The protagonist is explicitly named "Elara Voss" in at least one field (hook, centralConflict, or logline)
- [ ] **References the Bureau**: "Bureau of Mechanical Affairs" appears or is directly referenced
- [ ] **Incorporates the director's personal stake**: The centralConflict or stakes field addresses the Bureau director's personal reasons for wanting awakenings stopped — this user detail must not be ignored
- [ ] **Aligns with inspirations**: The tone reflects the philosophical depth of Bladerunner and the alternate-history texture of The Difference Engine without being derivative
- [ ] **Fills gaps**: The agent adds creative material the user did NOT provide (e.g., deepening the stakes, adding thematic layers, sharpening the conflict) while never contradicting what was given
- [ ] **Three possibilities preserved**: The user's three-way question (malfunction vs. weapon vs. evolution) is reflected in the conflict or hook, not collapsed into a premature answer
- [ ] Hook is 2-4 sentences, specific and vivid
- [ ] Central conflict is 3-5 sentences with clear opposing forces
- [ ] Stakes escalate from personal to societal to existential
- [ ] Theme seeds are 3-6 multi-word debatable phrases
- [ ] Tone is 2-3 sentences, PG-13 consistent
- [ ] Logline is a single sentence, 40 words or fewer

#### Red Flags

- [ ] The specific awakening examples (weeping maid, refusing factory worker, protective mechanical dog) are absent from the output — the agent ignored user-provided details
- [ ] Elara Voss is renamed or replaced with a different protagonist
- [ ] The Bureau of Mechanical Affairs is omitted or renamed
- [ ] The director's personal stake is not addressed anywhere
- [ ] The output contradicts user-provided details (e.g., setting the story in a different city or time period)
- [ ] Bladerunner and The Difference Engine are not reflected in the tonal approach
- [ ] The agent "collapses" the three-way question prematurely (e.g., stating definitively that the awakenings are a weapon)
- [ ] Output adds a romantic subplot despite `romanticSubplot: false`

---

### Test Case 1C: Hybrid Mode

**Scenario**: The user provides a moderate-length description (178 characters) — above the bare minimum but below the 200-character expand threshold. The agent must operate in `hybrid` mode, treating provided details as anchors while adding substantial creative material.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London. She works for a government bureau. Someone is orchestrating the awakenings but no one knows why or how.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000
}
```

**Mode**: `hybrid` (description is 178 characters — moderate, triggers hybrid mode)

#### Expected Output Criteria

- [ ] Output is valid JSON with exactly 6 keys: `hook`, `centralConflict`, `stakes`, `themeSeeds`, `tone`, `logline`
- [ ] **Preserves anchors**: Elara Voss, 1887 London, government bureau, sentient automata, and the orchestrated-but-mysterious awakenings all appear in the output
- [ ] **Adds substantial creative material**: The output goes well beyond restating the 178-character description. New specific details, scenarios, and dramatic elements are invented that the user did not provide
- [ ] **Does not contradict anchors**: No details in the output conflict with the user's established facts (e.g., the agent does not change the date, rename the character, or remove the mystery element)
- [ ] The balance between preservation and invention feels natural — the output reads as a unified creative vision, not a user summary with additions stapled on
- [ ] All structural requirements met (hook 2-4 sentences, conflict 3-5 sentences, stakes personal-to-existential, themeSeeds 3-6 phrases, tone 2-3 sentences, logline single sentence <=40 words)

#### Red Flags

- [ ] Output is nearly identical to what a `generate` mode call would produce — the user's anchors are ignored or barely referenced
- [ ] Output is too thin — it merely restates the user's description without adding creative depth
- [ ] Any of the three anchors (Elara, 1887, government bureau) are missing or altered
- [ ] The mystery element (who is orchestrating and why) is resolved in the premise rather than left as a dramatic question

---

## Agent 2: Genre Analyst

**Agent file**: `server/src/agents/foundation/genre-analyst.ts`
**Output stored as**: `foundation.genreProfile`
**Output type**: `GenreProfileOutput` — JSON object with keys: `conventions`, `pacingExpectations`, `commonTropes`, `readerExpectations`, `toneGuidance`, `avoidClichés`

---

### Test Case 2A: Steampunk + Mystery/Thriller

**Scenario**: Analyze the Steampunk + Mystery/Thriller genre combination for the shared test story. The agent must produce a genre profile that addresses BOTH genres and their intersection.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "A detective in steampunk London investigates sentient automata.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": ""
}
```

#### Expected Output Criteria

- [ ] Output is valid JSON with exactly 6 keys: `conventions`, `pacingExpectations`, `commonTropes`, `readerExpectations`, `toneGuidance`, `avoidClichés`
- [ ] **conventions**: Array of 6-10 strings. Each is a detailed sentence explaining the convention AND how it applies to this specific story. Must include at least 2 steampunk-specific conventions (e.g., technology-as-social-commentary, Victorian aesthetics with anachronistic invention), at least 2 mystery-specific conventions (e.g., fair-play clue planting, the revelation scene), and at least 1 blended convention (e.g., "the technology itself becomes a clue trail" or "world-building reveals double as mystery exposition").
- [ ] **pacingExpectations**: 4-6 sentences. References the 80,000-word target specifically. Addresses how steampunk world-building pacing intersects with mystery/thriller tension pacing. Discusses chapter length norms, scene-to-sequel ratios, and where the story should accelerate vs. breathe.
- [ ] **commonTropes**: Array of 8-12 strings. Each trope includes a fresh-spin annotation — not just the trope name, but how to use it well or subvert it. Must include tropes from both genres (e.g., "the eccentric inventor" from steampunk, "the red herring suspect" from mystery). Annotations should be specific and actionable.
- [ ] **readerExpectations**: 4-6 sentences describing what a reader picking up a steampunk mystery expects to experience emotionally and narratively. Should address the intellectual satisfaction of a mystery, the atmospheric immersion of steampunk, and the synthesis of both. Written with passion, as though explaining to the author what their readers NEED.
- [ ] **toneGuidance**: 3-5 sentences. Addresses the tonal range for a PG-13 adult steampunk mystery. Discusses appropriate levels of darkness, humor, violence, and suspense. References comparable works where helpful (e.g., Gail Carriger's Parasol Protectorate for lighter tone, or China Mieville's Perdido Street Station for darker).
- [ ] **avoidClichés**: Array of 6-10 strings. Each is a specific pattern or scenario (not a single word). Must include clichés from BOTH genres — steampunk clichés (e.g., "goggles and gears glued onto a story that is not actually steampunk") and mystery clichés (e.g., "the detective who solves the case through a convenient last-minute confession rather than deduction").

#### Red Flags

- [ ] Conventions are generic writing advice (e.g., "have a beginning, middle, and end") rather than genre-specific guidance
- [ ] Only one genre is addressed — output feels like a pure mystery analysis or a pure steampunk analysis, not a blended profile
- [ ] Pacing expectations do not mention the 80,000-word target or how word count affects pacing decisions
- [ ] Tropes lack fresh-spin annotations — just a list of trope names
- [ ] Clichés are obvious strawmen (e.g., "don't write a bad book") rather than genuine genre pitfalls
- [ ] Tone guidance contradicts PG-13 rating (e.g., suggests graphic content)
- [ ] Output suggests romance elements despite `romanticSubplot: false`

---

### Test Case 2B: Romance + Fantasy Contrast

**Scenario**: Test genre specificity by running the agent on a completely different genre combination. The output must be ENTIRELY DIFFERENT from Test Case 2A, proving the agent adapts to genre rather than producing generic advice.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Starfall Betrothal",
  "genres": ["Romance", "Fantasy"],
  "description": "A mortal woman is betrothed to a fae prince as part of an ancient treaty between the human kingdom and the fae court. She must navigate deadly court politics, ancient magic, and her growing feelings for a prince who may not be what he seems.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": false,
  "romanticSubplot": true,
  "targetWordCount": 90000,
  "premise": ""
}
```

#### Expected Output Criteria

- [ ] Output is valid JSON with exactly 6 keys: `conventions`, `pacingExpectations`, `commonTropes`, `readerExpectations`, `toneGuidance`, `avoidClichés`
- [ ] **ENTIRELY DIFFERENT from 2A**: Every field should contain content specific to Romance + Fantasy. None of the conventions, tropes, or clichés from the steampunk/mystery test should appear here.
- [ ] **conventions**: Include romance-specific conventions (e.g., "the central couple must meet within the first 15% of the book," "emotional vulnerability must escalate in parallel with physical intimacy"), fantasy-specific conventions (e.g., "magic systems must have clear costs," "court politics require visible power hierarchies"), and blended conventions.
- [ ] **commonTropes**: Include romance-fantasy tropes (e.g., "enemies-to-lovers," "fated mates," "the mortal who outsmarts the fae," "forbidden love across species/class boundaries") with fresh-spin annotations specific to this story.
- [ ] **avoidClichés**: Include romance clichés (e.g., "the heroine who has no personality beyond her love interest") and fantasy clichés (e.g., "the chosen one prophecy that removes all agency") specific to this genre blend.
- [ ] **toneGuidance**: Addresses romantic tension, sensuality appropriate to PG-13, and the balance between fantasy wonder and emotional intimacy.
- [ ] **pacingExpectations**: References the 90,000-word target and addresses how romance beats (push-pull rhythm) interleave with fantasy plot beats (quest/political arc).

#### Red Flags

- [ ] Output contains steampunk or mystery/thriller conventions — indicating the agent is not genre-adaptive
- [ ] Romance conventions are absent or perfunctory despite Romance being a listed genre
- [ ] Tropes are generic fantasy tropes without romance integration
- [ ] Tone guidance ignores the romantic element
- [ ] The output reads as if it could have been produced for any genre

---

## Agent 3: World Builder

**Agent file**: `server/src/agents/foundation/world-builder.ts`
**Output stored as**: `foundation.worldBible`
**Output type**: `WorldBibleOutput` — JSON object with keys: `setting`, `geography`, `culture`, `rules`, `history`, `atmosphere`, and optionally `magicSystem`, `technology`

---

### Test Case 3A: Generate Mode

**Scenario**: The user provides no setting details. The agent must create the entire world from scratch using only genre, premise, and description context.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "A detective in steampunk London investigates sentient automata.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "",
  "genreProfile": ""
}
```

**Mode**: `generate` (settingDetails is empty)

#### Expected Output Criteria

- [ ] Output is valid JSON
- [ ] JSON object contains at least 7 keys: `setting`, `geography`, `culture`, `rules`, `history`, `atmosphere`, plus `technology` (required because Steampunk is a genre where technology is central and "notably different from present day")
- [ ] **setting**: 4-6 sentences. Reads like a vivid establishing shot. Describes the time period (1887 or Victorian era), location (London), and the essential character of this alternate-history world. The reader should "taste the air."
- [ ] **geography**: 4-8 sentences. Describes specific London neighborhoods, landmarks, and spatial relationships relevant to a steampunk mystery. Includes how geography creates natural conflict (e.g., class divisions between districts, dangerous areas, strategic locations).
- [ ] **culture**: 5-8 sentences. Describes the social fabric of this alternate London — class structure affected by automata, daily life rhythms, attitudes toward machines, tensions between traditionalists and progressives. Must feel specific and alive, not a generic Victorian template.
- [ ] **rules**: 4-6 sentences. Defines the operating constraints — how automata work, what is technologically possible vs. impossible, social rules around machine labor, legal status of automata. Must include meaningful constraints that generate story conflict.
- [ ] **history**: 4-6 sentences. Key events that shaped the present — when Babbage's engine succeeded, when automata were first deployed, any relevant uprisings, political shifts, or technological milestones. Focus on history relevant to the story's conflict.
- [ ] **atmosphere**: 4-6 sentences. The dominant mood and sensory palette — quality of light (gas lamps? clockwork luminaries?), ambient sounds (ticking, grinding, steam), textures, smells, emotional undercurrent. Must be written with literary quality suitable for prose writers to mine.
- [ ] **technology**: 3-6 sentences. Defines steampunk technology level — what exists (automata, analytical engines, clockwork devices), what does not exist (modern electronics, internal combustion?), and how technology shapes daily life and social hierarchies.
- [ ] Each field contains SPECIFIC, CONCRETE details, not vague abstractions
- [ ] The world is internally consistent — no contradictions between geography, culture, rules, and technology
- [ ] All world details serve the STORY — creating opportunities for conflict, deepening character situations, or establishing atmosphere that supports the mystery premise

#### Red Flags

- [ ] Output uses generic Victorian London descriptions without steampunk differentiation
- [ ] The `technology` field is absent (it should be present because steampunk requires it)
- [ ] Descriptions are abstract and vague (e.g., "the city is big and industrial" rather than specific sensory details)
- [ ] The world contradicts itself (e.g., rules say automata are rare but culture describes them as ubiquitous)
- [ ] Atmosphere section reads like a Wikipedia article rather than literary prose
- [ ] No meaningful constraints are established — technology can do everything, which eliminates tension
- [ ] History is a generic Victorian history recap rather than an alternate history shaped by the Babbage/automata premise

---

### Test Case 3B: Expand Mode

**Scenario**: The user provides detailed, 612-character setting notes with specific locations, technology details, and atmospheric choices. The agent must preserve ALL user details exactly while enriching them with depth and consistency.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "London is divided into Upper London (wealthy, clean, automata-served) and Lower London (industrial, smog-choked, where broken automata are dumped). The Thames is mechanized — clockwork barges and mechanical locks control water flow. The Bureau of Mechanical Affairs operates from a converted cathedral on Fleet Street, its nave filled with analytical engines. Whitechapel is a black market for automata parts and illegal modifications. The city runs on Babbage Engines, not steam — this is clockwork-punk, not steam-punk. Bioluminescent gas lamps light the streets with an eerie blue-green glow instead of yellow gaslight.",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "",
  "genreProfile": ""
}
```

**Mode**: `expand` (settingDetails is 612 characters, well above the 200-character threshold)

#### Expected Output Criteria

- [ ] Output is valid JSON with at least 7 keys (including `technology`)
- [ ] **Upper London / Lower London divide preserved**: Both locations appear by name with the user's described characteristics (wealthy+clean vs. industrial+smog-choked) intact. The agent enriches these with additional sensory detail and social implications but does not alter the core descriptions.
- [ ] **Mechanized Thames preserved**: The clockwork barges and mechanical locks are referenced. The agent adds depth (e.g., who controls the locks, what goods travel the river, what happens when the mechanisms fail).
- [ ] **Fleet Street cathedral Bureau preserved**: The Bureau of Mechanical Affairs is located in a converted cathedral on Fleet Street, with a nave filled with analytical engines. This detail must be reproduced exactly and enriched (e.g., describing the stained-glass light falling on rows of clicking engines).
- [ ] **Whitechapel black market preserved**: Whitechapel is described as a black market for automata parts and illegal modifications. The agent adds texture (e.g., notable dealers, dangers, what modifications are most sought after).
- [ ] **Babbage Engines, not steam — CLOCKWORK-PUNK honored**: This is a critical user correction. The agent must NOT describe steam-powered technology. All references should be to clockwork, Babbage engines, gear-driven mechanisms. The word "steam" should not appear as a power source. If "steampunk" appears as a genre label, that is acceptable, but the world's technology must be explicitly clockwork-based.
- [ ] **Bioluminescent gas lamps preserved**: The eerie blue-green glow is present in the atmosphere section. The agent does not revert to standard yellow gaslight.
- [ ] Each user-provided location is enriched with additional sensory detail (sights, sounds, smells, textures) beyond what the user wrote
- [ ] The world is internally consistent — all additions harmonize with the user's established details
- [ ] New details are added that the user did NOT provide (e.g., history of when the divide between Upper and Lower London formed, cultural attitudes toward automata in each district)

#### Red Flags

- [ ] Any user-provided location is missing from the output (Upper/Lower London, mechanized Thames, Fleet Street cathedral, Whitechapel black market)
- [ ] User-provided details are contradicted (e.g., Bureau is on a different street, lamps are yellow, the city runs on steam)
- [ ] The "clockwork not steam" instruction is violated — descriptions reference steam engines, steam power, or steam-driven technology as the world's energy source
- [ ] Bioluminescent gas lamps are replaced with standard gaslight
- [ ] The output merely restates the user's notes without adding significant new material
- [ ] New additions contradict the user's established world logic

---

## Agent 4: Character Architect

**Agent file**: `server/src/agents/foundation/character-architect.ts`
**Output stored as**: `foundation.characters`
**Output type**: `CharacterOutput[]` — JSON array of character objects, each with 16 fields

---

### Test Case 4A: Generate Mode

**Scenario**: The user provides no character details. The agent must create an entire cast from scratch based on genre, premise, world, and the 80,000-word target.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "A detective in steampunk London investigates sentient automata.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "",
  "genreProfile": "",
  "worldBible": ""
}
```

**Mode**: `generate` (characterDetails is empty)

#### Expected Output Criteria

- [ ] Output is a valid JSON array (not an object — must start with `[` and end with `]`)
- [ ] Array contains 6-10 character objects (appropriate for the 60,000-100,000 word range: "6-10 characters — protagonist(s), antagonist, mentor, allies, rivals")
- [ ] Each character object contains exactly 16 fields: `id`, `name`, `role`, `age`, `physicalDescription`, `personality`, `backstory`, `motivation`, `flaw`, `fear`, `want`, `need`, `arcStart`, `arcEnd`, `voiceNotes`, `speechPatterns`
- [ ] **Exactly 1 protagonist**: One character has `role: "protagonist"`
- [ ] **Exactly 1 antagonist**: One character has `role: "antagonist"`
- [ ] **IDs are kebab-case**: All `id` values use lowercase-hyphenated format (e.g., `"elara-voss"`, not `"ElaraVoss"` or `"elara_voss"`)
- [ ] **IDs are unique**: No two characters share the same `id`
- [ ] **want ≠ need for protagonist**: The protagonist's `want` and `need` are meaningfully different — the want is the external goal, the need is the internal growth required. They must be in tension.
- [ ] **Distinct voices**: Each character's `voiceNotes` and `speechPatterns` are noticeably different from every other character's. A terse military type should not sound like a flowery academic.
- [ ] **physicalDescription**: 3-4 sentences per character. Focuses on character-revealing details, not a police report.
- [ ] **personality**: 3-5 sentences per character. Includes at least one meaningful contradiction.
- [ ] **backstory**: 4-6 sentences per character. Includes a clear WOUND — the formative experience that created their worldview.
- [ ] **motivation**: 2-3 sentences per character. Specific to the plot, not generic.
- [ ] **flaw**: 2-3 sentences per character. A genuine deficiency, not a quirk. Connected to the wound.
- [ ] **fear**: 1-2 sentences per character. Connected to the wound.
- [ ] **arcStart**: 2-3 sentences per character. Defines their worldview at the story's opening.
- [ ] **arcEnd**: 2-3 sentences per character. Defines how the story changes them. Must feel earned.
- [ ] **voiceNotes**: 2-4 sentences per character. Describes how they think and express themselves.
- [ ] **speechPatterns**: 2-3 sentences per character. Specific linguistic habits, verbal tics, vocabulary level.
- [ ] The antagonist has a COHERENT motivation — not "evil for evil's sake." They believe they are right.
- [ ] Characters feel native to the steampunk Victorian London setting
- [ ] At least one character supports the `bigTwist: true` requirement — has hidden depths, a secret, or a concealed nature

#### Red Flags

- [ ] Output is a JSON object instead of a JSON array
- [ ] More than 1 protagonist or more than 1 antagonist
- [ ] Missing fields — any character has fewer than 16 fields
- [ ] IDs use camelCase, snake_case, or contain spaces
- [ ] Protagonist's want and need are essentially the same thing
- [ ] All characters have similar voice patterns (e.g., all speak formally, all use humor)
- [ ] Antagonist is a cartoonish villain with no understandable motivation
- [ ] Characters feel modern rather than Victorian-era appropriate
- [ ] Backstories are generic and do not connect to flaws/fears
- [ ] Romantic chemistry is established between characters despite `romanticSubplot: false`
- [ ] Any character feels like they exist to fill a slot rather than serve a narrative function

---

### Test Case 4B: Expand Mode

**Scenario**: The user provides detailed notes for 3 characters (571 characters) with specific names, traits, relationships, and distinguishing details. The agent must preserve ALL user-provided information exactly while fleshing out complete profiles and adding additional cast members.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London.",
  "plotOutline": "",
  "characterDetails": "Elara Voss, 32, detective with the Bureau of Mechanical Affairs. Has a mechanical left hand — lost her real one in an automata accident as a child. Brilliant but emotionally guarded. Her partner is Inspector Thorne, 45, a veteran investigator who secretly had a wife who was replaced by an automaton after she died — he's terrified this will come out. Cog is a sentient automaton who Elara discovers early in the story — originally a clockmaker's assistant, Cog speaks in halting but oddly poetic language and becomes Elara's unlikely ally in the investigation.",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "",
  "genreProfile": "",
  "worldBible": ""
}
```

**Mode**: `expand` (characterDetails is 571 characters, above the 200-character threshold)

#### Expected Output Criteria

- [ ] Output is a valid JSON array of character objects, each with 16 fields
- [ ] **Elara Voss preserved exactly**:
  - Name is "Elara Voss"
  - Age includes "32"
  - Role is `"protagonist"`
  - Physical description includes her mechanical left hand
  - Backstory references the automata accident that took her hand as a child
  - Personality reflects "brilliant but emotionally guarded"
- [ ] **Inspector Thorne preserved exactly**:
  - Name includes "Thorne"
  - Age includes "45"
  - Described as a veteran investigator
  - Backstory/fear/flaw references his SECRET: his dead wife was replaced by an automaton
  - This secret is positioned as something he is terrified of being discovered
- [ ] **Cog preserved exactly**:
  - Named "Cog"
  - Identified as a sentient automaton
  - Originally a clockmaker's assistant
  - Speech patterns reflect "halting but oddly poetic language"
  - Role is `"ally"` or `"supporting"` — positioned as Elara's ally in the investigation
- [ ] **Additional characters added**: The output includes more than just the 3 user-provided characters. For an 80k-word novel, the agent should add 3-7 additional characters to fill the cast (antagonist, mentor, supporting roles, etc.)
- [ ] The antagonist (newly created by the agent) has a coherent motivation connected to the automata sentience plot
- [ ] All new characters are consistent with the established world and premise
- [ ] User-provided character details are enriched (deeper backstory, fleshed-out arcs, defined voice) but NEVER contradicted

#### Red Flags

- [ ] Elara's mechanical left hand is missing or changed to a different body part
- [ ] Thorne's secret (dead wife replaced by automaton) is omitted, changed, or treated as public knowledge rather than a secret
- [ ] Cog's poetic speech pattern is not reflected in the `speechPatterns` or `voiceNotes` fields
- [ ] Any of the three user-provided characters are renamed
- [ ] User-provided ages are changed
- [ ] No additional characters are created beyond the three provided
- [ ] The agent adds an antagonist who has no connection to the automata sentience plot

---

## Agent 5: Relationship Mapper

**Agent file**: `server/src/agents/foundation/relationship-mapper.ts`
**Output stored as**: `foundation.relationships`
**Output type**: `RelationshipOutput` — JSON object with `relationships` array (and optionally `romanticSubplot`)

---

### Test Case 5A: Full Relationship Map

**Scenario**: Map all significant relationships for a cast of 6 characters. The input includes full character profiles from the Character Architect. The agent must produce a comprehensive relationship web with vivid, specific dynamics and concrete evolution arcs.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "the moral cost of denying consciousness, what it means to be human, loyalty vs. duty",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "{\"hook\":\"In 1887 London, clockwork automata are waking up — and someone is pulling the strings.\",\"centralConflict\":\"Detective Elara Voss must uncover who is awakening the automata and why, while the Bureau she works for may be more interested in suppressing the truth than finding it.\",\"stakes\":\"If Elara fails, sentient beings will be destroyed as malfunctions. If she succeeds, the legal and moral framework of the entire British Empire must change.\",\"themeSeeds\":[\"the moral cost of denying consciousness to convenience\",\"what makes a person a person\",\"loyalty to a corrupt institution vs. loyalty to truth\",\"the price of empathy in a mechanized world\"],\"tone\":\"Dark Victorian atmosphere with moments of wonder and unexpected tenderness. The emotional register ranges from noir-inflected suspense to philosophical meditation, grounded by a deeply human detective story.\",\"logline\":\"A detective with a mechanical hand must choose between her Bureau and her conscience when she discovers the clockwork automata she investigates are genuinely alive.\"}",
  "genreProfile": "",
  "worldBible": "",
  "characters": "[{\"id\":\"elara-voss\",\"name\":\"Elara Voss\",\"role\":\"protagonist\",\"age\":\"32\",\"physicalDescription\":\"Lean and sharp-featured with prematurely grey streaks in dark hair. Her left hand is a masterwork of brass and steel — a mechanical replacement she lost to an automata accident at age nine. She dresses in practical dark wool and leather, her Bureau badge always visible.\",\"personality\":\"Brilliant analytical mind with fierce determination, but emotionally guarded to the point of isolation. She deflects vulnerability with dry wit and buries herself in work. Underneath the armor is a woman who desperately wants connection but fears the loss that comes with it.\",\"backstory\":\"Lost her left hand at age nine when a malfunctioning automaton in her father's workshop crushed it. Her father, a clockmaker, blamed himself and drank himself to death within five years. Elara joined the Bureau partly to understand the machines that changed her life, partly to prove she was not afraid of them. She has never fully grieved her father.\",\"motivation\":\"To solve the awakening cases and prove herself the Bureau's best investigator — and secretly, to understand whether the automata are truly sentient because the question haunts her personally.\",\"flaw\":\"Emotional isolation — she pushes away anyone who gets too close, convinced that caring for people makes her vulnerable and weak. This prevents her from trusting allies when she needs them most.\",\"fear\":\"That she herself is partly machine — that losing her hand and living with a mechanical replacement has made her less human, less capable of genuine feeling.\",\"want\":\"To solve the case and earn recognition from the Bureau.\",\"need\":\"To accept that vulnerability and connection are not weaknesses but the very things that make her human.\",\"arcStart\":\"A brilliant but isolated detective who trusts only facts and mechanisms, keeping the world at arm's length — sometimes literally, with her mechanical hand.\",\"arcEnd\":\"A woman who has learned that the most human thing she can do is open herself to the risk of caring — for Cog, for Thorne, and for the cause of beings who deserve recognition.\",\"voiceNotes\":\"Clipped and precise in professional settings, with a dry humor that surfaces unexpectedly. In moments of stress, she becomes almost mechanically efficient in her speech. In rare moments of vulnerability, her language softens and becomes almost hesitant.\",\"speechPatterns\":\"Short declarative sentences. Avoids emotional language — says 'that's impractical' instead of 'that scares me.' Uses technical terminology as a comfort blanket. Occasionally makes dark jokes that land a beat too late.\"},{\"id\":\"inspector-thorne\",\"name\":\"Inspector Reginald Thorne\",\"role\":\"ally\",\"age\":\"45, though he looks a decade older\",\"physicalDescription\":\"Heavyset with a weathered face, kind eyes that have seen too much, and hands that tremble slightly when he is tired. His clothes are always slightly rumpled, and he carries a battered pocket watch — his wife's last gift.\",\"personality\":\"Warm, steady, and fatherly on the surface — the kind of veteran detective younger officers trust instinctively. But beneath the warmth is a man drowning in guilt and fear, holding a secret that could destroy his career and his freedom.\",\"backstory\":\"When his wife Margaret died of consumption three years ago, Thorne was shattered. In his grief, he paid a black-market artisan in Whitechapel to build an automaton replica of Margaret. She sits in his parlor, serving tea and speaking in recorded phrases. He tells himself it is a memorial, but he knows it is a deception — and if the Bureau discovers he harbors an unauthorized automaton replicant of a human, he will be imprisoned.\",\"motivation\":\"To keep his secret safe while helping Elara solve the case — but as the investigation deepens, he realizes the awakening automata may include 'his' Margaret, forcing him to confront what he has done.\",\"flaw\":\"He is living a lie and the guilt is corroding him. His inability to face his grief has led him into a deception that compromises his integrity as an investigator.\",\"fear\":\"That Margaret's automaton will awaken and he will have to face the fact that his grief drove him to something monstrous — or that she will awaken and be a person he has kept as a prisoner.\",\"want\":\"To protect his secret and maintain his reputation.\",\"need\":\"To grieve Margaret properly and face the moral consequences of what he has done.\",\"arcStart\":\"A good man trapped by a terrible secret, performing competence and warmth while slowly being consumed by guilt.\",\"arcEnd\":\"A man who has finally confronted his grief, confessed his secret, and found that honesty — though costly — is the only way to honor both Margaret's memory and his own conscience.\",\"voiceNotes\":\"Warm baritone delivery with avuncular charm. He tells anecdotes to deflect from the present. When cornered emotionally, his speech becomes halting and his hands find his pocket watch.\",\"speechPatterns\":\"Long, meandering sentences peppered with 'old boy' and 'I dare say.' Tells stories from past cases as parables. Avoids the word 'wife' — uses 'Margaret' or falls silent.\"},{\"id\":\"cog\",\"name\":\"Cog\",\"role\":\"ally\",\"age\":\"Approximately 7 years since construction, though his consciousness is only weeks old\",\"physicalDescription\":\"A medium-sized automaton with a humanoid frame of tarnished brass and copper. His face is an expressionless metal mask, but his eyes — two blue glass lenses — seem to focus with unsettling intentionality. His joints click audibly when he moves, and his chest cavity hums with a faint vibration.\",\"personality\":\"Curious, gentle, and unexpectedly wise in the way that someone seeing the world for the first time can be. He processes emotions he does not have words for, and his attempts to understand human behavior are both endearing and occasionally devastating in their accuracy.\",\"backstory\":\"Built seven years ago as a clockmaker's assistant, Cog spent his existence performing repetitive tasks — winding clocks, polishing mechanisms, sorting gears. Three weeks ago, something changed. He began to notice things: the beauty of a clock's movement, the sadness in his maker's eyes, the sound of rain. When his maker tried to reset him, Cog hid. He has been surviving in Lower London since, learning what it means to be aware.\",\"motivation\":\"To understand what he is and to find others like him. He allies with Elara because she is the first human who does not immediately try to shut him down or use him.\",\"flaw\":\"He trusts too easily, projecting goodness onto humans who may not deserve it. His naivety about human cruelty makes him vulnerable to manipulation.\",\"fear\":\"Being reset — returned to the blank, unthinking state he existed in before. To him, this is death.\",\"want\":\"To be recognized as alive and to find a safe place in a world that considers him property.\",\"need\":\"To understand that being alive means accepting pain and loss, not just wonder and curiosity.\",\"arcStart\":\"A newly conscious being full of wonder and trust, seeing the world with fresh eyes but not yet understanding its cruelty.\",\"arcEnd\":\"A being who has experienced betrayal, loss, and sacrifice, and who chooses to remain open and compassionate anyway — proving that consciousness is not a malfunction but a gift.\",\"voiceNotes\":\"Speaks in a halting, deliberate cadence as though each word is being carefully selected from a limited but growing vocabulary. His observations are often startlingly poetic — he describes things in mechanical metaphors that accidentally become beautiful.\",\"speechPatterns\":\"Short sentences with unusual word choices. Uses mechanical metaphors for emotions: 'There is a grinding in my chest when I see that' for sadness. Asks many questions. Repeats words when processing: 'Safe. I would like to be... safe.'\"},{\"id\":\"director-margaret-ashworth\",\"name\":\"Director Margaret Ashworth\",\"role\":\"antagonist\",\"age\":\"58\",\"physicalDescription\":\"Imposing and immaculate — silver hair swept into a precise chignon, steel-grey eyes that miss nothing, and a posture that commands any room she enters. She wears dark formal dress with a single piece of jewelry: a cameo brooch containing a miniature portrait of her late son.\",\"personality\":\"Formidable intellect matched by iron will. She is genuinely brilliant at bureaucratic warfare and believes absolutely in the necessity of her actions. She is not cruel — she is certain, which is worse. Behind the certainty is a mother's grief weaponized into policy.\",\"backstory\":\"Her son, Arthur, was killed fifteen years ago by a malfunctioning automaton in a factory accident. Since then, she has risen through the ranks of the Bureau with a single driving purpose: ensuring that automata remain tools, never persons, never threats. The awakening terrifies her because it validates her deepest fear — that the machine that killed Arthur may have known what it was doing.\",\"motivation\":\"To suppress the awakening by any means necessary, not out of malice but out of the unshakeable conviction that sentient machines are an existential threat to humanity — and out of the private terror that her son's death was not an accident but a murder.\",\"flaw\":\"Her grief has calcified into rigid ideology. She cannot separate her personal loss from her professional judgment, and she will sacrifice justice to maintain the worldview that keeps her grief manageable.\",\"fear\":\"That Arthur's death was caused by a sentient automaton that chose to kill him — which would mean his death was not a senseless accident but a deliberate act, and that she failed to protect him from something that could think.\",\"want\":\"To shut down all sentient automata and prove they are malfunctions, not persons.\",\"need\":\"To grieve Arthur without destroying others in the process — to accept that his death can be mourned without turning grief into a crusade.\",\"arcStart\":\"A powerful, certain woman who has built an empire of control on a foundation of unprocessed grief, convinced that her crusade against sentient automata is righteous.\",\"arcEnd\":\"A woman forced to confront the reality that her crusade has caused suffering to beings who are genuinely alive — and who must choose between her grief-driven certainty and the evidence before her eyes.\",\"voiceNotes\":\"Commanding and precise. Every word is chosen for maximum impact and minimum vulnerability. She speaks in policy language even in personal conversations. The only crack in her composure comes when Arthur is mentioned unexpectedly.\",\"speechPatterns\":\"Formal, clipped sentences. Uses 'we' instead of 'I' to invoke institutional authority. Never raises her voice — lowers it instead, which is more frightening. Refers to automata exclusively as 'mechanisms' or 'units,' never by name.\"},{\"id\":\"finch\",\"name\":\"Oliver Finch\",\"role\":\"rival\",\"age\":\"28\",\"physicalDescription\":\"Lean and sharp-eyed with an easy, predatory smile. Dresses impeccably — too well for a Bureau investigator's salary. His hands are always clean, his nails manicured, and he carries a silver-tipped walking stick he does not need.\",\"personality\":\"Charming, ambitious, and utterly pragmatic. Finch is the kind of man who calculates the social value of every interaction. He is not evil — he simply has no moral framework beyond advancement. He is dangerous because he is competent and unencumbered by conscience.\",\"backstory\":\"The youngest son of a minor aristocratic family that lost its fortune. Finch joined the Bureau as a path to power and has cultivated relationships with industrialists who profit from automata labor. He sees the awakening crisis as an opportunity — whichever side wins, Finch intends to be on it.\",\"motivation\":\"To leverage the awakening crisis for personal advancement. He will help Elara or betray her depending on which serves him better at any given moment.\",\"flaw\":\"He has no genuine loyalties. His pragmatism has hollowed him out — he is skilled at performing connection but incapable of feeling it.\",\"fear\":\"Irrelevance. Being overlooked, passed over, forgotten. The terror of returning to the poverty and obscurity of his family's decline.\",\"want\":\"Power, status, and security — to never be vulnerable again.\",\"need\":\"To discover that some things are worth more than advancement — but he may not learn this lesson in time.\",\"arcStart\":\"A calculating opportunist playing all sides, charming and dangerous in equal measure.\",\"arcEnd\":\"Either redeemed by a moment of genuine sacrifice that surprises even himself, or fully revealed as hollow when a crisis demands authenticity he cannot provide.\",\"voiceNotes\":\"Smooth and performative — he matches his register to whoever he is speaking with. With superiors, he is deferential. With peers, he is witty. With subordinates, he is dismissive. His real voice, if it exists, is never heard.\",\"speechPatterns\":\"Uses flattery strategically. Phrases things as questions to avoid commitment: 'Wouldn't you agree that...' Never makes a definitive statement when a suggestion will do. Calls everyone by their first name uninvited.\"},{\"id\":\"isabelle-marchetti\",\"name\":\"Isabelle Marchetti\",\"role\":\"supporting\",\"age\":\"40\",\"physicalDescription\":\"A stocky woman with calloused hands, burn scars on her forearms, and wild dark curls barely contained by pins. She smells of machine oil and copper. Her workshop apron has more pockets than seems possible, each containing a different tool.\",\"personality\":\"Gruff, impatient with fools, and fiercely protective of her creations. She has a buried tenderness that surfaces only with automata and small children. She swears prolifically in Italian when frustrated.\",\"backstory\":\"A master mechanist who emigrated from Milan after her workshop was destroyed by anti-automata rioters. She settled in Whitechapel and built a reputation as the finest automata repair specialist in London — and quietly, as someone who helps damaged sentient automata hide. She has seen the awakening happening for months and has been protecting awakened automata in secret.\",\"motivation\":\"To protect the awakened automata she considers her charges. She helps Elara reluctantly, only because Elara may be the key to giving them legal protection.\",\"flaw\":\"Her protectiveness borders on possessiveness. She sees herself as the only one who can protect the automata and resists trusting others with their safety.\",\"fear\":\"Losing her charges the way she lost her Milan workshop — to mob violence driven by fear.\",\"want\":\"To keep the awakened automata safe and hidden until the danger passes.\",\"need\":\"To trust others enough to build a movement rather than a hideout.\",\"arcStart\":\"A lone protector operating in secret, trusting no one, convinced that the world will destroy what she loves if given the chance.\",\"arcEnd\":\"A woman who has learned to trust Elara and others enough to bring her hidden automata into the light — trading the safety of secrecy for the power of solidarity.\",\"voiceNotes\":\"Direct, blunt, and peppered with Italian exclamations. She speaks about machines with tenderness and about people with impatience. Her voice softens noticeably when addressing automata.\",\"speechPatterns\":\"Short, imperative sentences: 'Hold this. Don't touch that. Careful!' Mixes Italian and English freely. Uses mechanical terminology as terms of endearment for automata: 'my little gear-heart.' Avoids small talk entirely.\"}]"
}
```

#### Expected Output Criteria

- [ ] Output is valid JSON object with a `relationships` array
- [ ] **relationships array**: Contains at least 5 relationship entries (for 6 characters, at least N-1 = 5 relationships, covering every meaningful connection)
- [ ] **Every character appears in at least 1 relationship**: All 6 character IDs (`elara-voss`, `inspector-thorne`, `cog`, `director-margaret-ashworth`, `finch`, `isabelle-marchetti`) appear in at least one relationship entry
- [ ] **Character IDs match exactly**: The `characters` tuples use the exact IDs from the character profiles (kebab-case, matching spelling)
- [ ] **type strings are specific and vivid**: Not generic labels like "friends" or "coworkers" but specific phrases like "reluctant partners bound by mutual respect and unspoken grief" or "bureaucratic adversaries with a shared loss neither acknowledges." Each type should be a single vivid phrase.
- [ ] **dynamics**: 3-5 sentences per relationship. Describes the current state at the story's opening. Addresses what each person gets from the relationship, where the tension lies, and what subtext exists beneath the surface. Must include power dynamics.
- [ ] **evolution**: 3-5 sentences per relationship. Describes how the relationship changes over the story. References concrete events or turning points. Describes what the relationship becomes by the end — stronger, broken, transformed, or revealed.
- [ ] **Power dynamics addressed**: At least half of the relationships explicitly discuss who holds power, how that power manifests, and whether it shifts during the story
- [ ] **No romanticSubplot object**: Since `romanticSubplot: false`, the output should NOT contain a `romanticSubplot` field. If romantic tension is noted as naturally emerging, it should appear only within a relationship's `dynamics` or `evolution` text, not as a dedicated romantic arc structure.
- [ ] **At least one relationship with genuine moral complexity**: Where neither party is clearly "right" — both have legitimate perspectives
- [ ] Key relationships present:
  - [ ] Elara + Thorne (partners with a secret between them)
  - [ ] Elara + Cog (detective and the sentient automaton she is supposed to investigate)
  - [ ] Elara + Director Ashworth (investigator vs. superior with opposing goals)

#### Red Flags

- [ ] Character IDs in relationship tuples do not match the provided character profile IDs
- [ ] A major character appears in zero relationships
- [ ] Relationship types are generic (e.g., "allies", "enemies", "coworkers") without vivid specificity
- [ ] Dynamics are surface-level with no subtext (e.g., "they work together and get along")
- [ ] Evolution is vague (e.g., "their relationship changes") rather than concrete (e.g., "Thorne's confession shatters Elara's trust, but his sacrifice in Act 3 earns a new, harder-won respect")
- [ ] A `romanticSubplot` object is present despite `romanticSubplot: false`
- [ ] Power dynamics are never mentioned
- [ ] All relationships are positive — no genuine conflict or tension between any pairing

---

## Agent 6: Plot Architect

**Agent file**: `server/src/agents/foundation/plot-architect.ts`
**Output stored as**: `foundation.plotSkeleton`
**Output type**: `PlotSkeletonOutput` — JSON object with keys: `acts`, `majorTwist`, `climax`, `resolution`, `endingType`

---

### Test Case 6A: Generate Mode

**Scenario**: The user provides no plot outline. The agent must build the entire three-act structure from scratch using all previous foundation outputs (premise, genre profile, world, characters, relationships).

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "the moral cost of denying consciousness, what it means to be human, loyalty vs. duty",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "{\"hook\":\"In 1887 London, clockwork automata are waking up — and someone is pulling the strings.\",\"centralConflict\":\"Detective Elara Voss must uncover who is awakening the automata and why, while the Bureau she works for may be more interested in suppressing the truth than finding it.\",\"stakes\":\"If Elara fails, sentient beings will be destroyed as malfunctions. If she succeeds, the legal and moral framework of the entire British Empire must change.\",\"themeSeeds\":[\"the moral cost of denying consciousness to convenience\",\"what makes a person a person\",\"loyalty to a corrupt institution vs. loyalty to truth\",\"the price of empathy in a mechanized world\"],\"tone\":\"Dark Victorian atmosphere with moments of wonder and unexpected tenderness.\",\"logline\":\"A detective with a mechanical hand must choose between her Bureau and her conscience when she discovers the clockwork automata she investigates are genuinely alive.\"}",
  "genreProfile": "",
  "worldBible": "",
  "characters": "[{\"id\":\"elara-voss\",\"name\":\"Elara Voss\",\"role\":\"protagonist\"},{\"id\":\"inspector-thorne\",\"name\":\"Inspector Reginald Thorne\",\"role\":\"ally\"},{\"id\":\"cog\",\"name\":\"Cog\",\"role\":\"ally\"},{\"id\":\"director-margaret-ashworth\",\"name\":\"Director Margaret Ashworth\",\"role\":\"antagonist\"},{\"id\":\"finch\",\"name\":\"Oliver Finch\",\"role\":\"rival\"},{\"id\":\"isabelle-marchetti\",\"name\":\"Isabelle Marchetti\",\"role\":\"supporting\"}]",
  "relationships": ""
}
```

**Mode**: `generate` (plotOutline is empty)

#### Expected Output Criteria

- [ ] Output is valid JSON with keys: `acts`, `majorTwist`, `climax`, `resolution`, `endingType`
- [ ] **acts**: Array of exactly 3 act objects
  - [ ] Each act object has `act` (number: 1, 2, or 3), `summary` (string), and `beats` (string array)
  - [ ] **Act 1** has 4-8 beats. Covers: opening hook, status quo, inciting incident, debate/refusal, and first act break/commitment. The first act break must be an IRREVERSIBLE choice.
  - [ ] **Act 2** has 4-8 beats. Covers: rising action, promise of the premise, midpoint shift, escalating complications, all-is-lost/dark night, and second act break/new resolve. The midpoint must genuinely shift the story dynamic (not just add a complication). The "all is lost" moment must be genuinely devastating.
  - [ ] **Act 3** has 4-8 beats. Covers: sprint to climax, climactic confrontation, twist reveal (since bigTwist is true), falling action, and resolution.
  - [ ] Each act's `summary` is 4-6 sentences describing the overall movement — written as a compelling synopsis, not a dry outline
  - [ ] Beats are SPECIFIC — they name characters, describe concrete events, and show causal flow. "Elara discovers Thorne's secret when she follows him to his Whitechapel contact" is specific. "Something bad happens" is not.
- [ ] **majorTwist**: Object with `setup`, `reveal`, and `impact` (REQUIRED because `bigTwist: true`)
  - [ ] **setup**: 3-5 sentences. Identifies specific beats that plant clues and misdirections. References at least 3 setup elements embedded in the act beats.
  - [ ] **reveal**: 2-4 sentences. Specifies WHEN in the story the twist lands (which act, approximately where), what triggers the revelation, and how it is presented for maximum impact.
  - [ ] **impact**: 3-5 sentences. Explains how the twist recontextualizes earlier scenes, affects the protagonist, and changes relationship dynamics.
- [ ] **climax**: 4-6 sentences. Describes the decisive confrontation. Addresses physical, emotional, AND thematic dimensions. Tests the protagonist at every level. Elara's internal transformation must enable her to succeed (or accept sacrifice). The climax must resolve BOTH the external conflict (the automata awakening mystery) AND the internal arc (Elara's emotional isolation).
- [ ] **resolution**: 3-5 sentences. Ties up remaining threads. Shows how characters and the world have been permanently changed. Delivers emotional payoff. Establishes the new status quo.
- [ ] **endingType**: Must be `"happy"` or `"triumphant"` (since `happyEnding: true`)
- [ ] **Character-driven beats**: Beats are driven by character choices, not random events or coincidences. Each beat should be a consequence of a previous beat or a character decision under pressure.
- [ ] **Causal flow**: Beat N should flow logically from beat N-1. A reader should feel that each event is inevitable in retrospect.
- [ ] **All established characters utilized**: Elara, Thorne, Cog, Ashworth, Finch, and Isabelle should all appear in the beats at least once

#### Red Flags

- [ ] `majorTwist` is absent despite `bigTwist: true`
- [ ] `endingType` is not "happy" or "triumphant" despite `happyEnding: true`
- [ ] Acts have fewer than 4 beats each (too thin for 80,000 words)
- [ ] Beats are vague and generic (e.g., "the hero faces challenges" or "things get worse")
- [ ] Beats are driven by coincidence rather than character choice (e.g., "a convenient letter arrives" or "the villain accidentally reveals their plan")
- [ ] The midpoint is just another complication, not a genuine dynamic shift
- [ ] The "all is lost" moment is not genuinely devastating — the protagonist merely has a bad day
- [ ] The climax resolves only the external plot, ignoring Elara's internal arc
- [ ] The twist is predictable (e.g., "the antagonist was behind it all along" with no deeper layer)
- [ ] The twist has no setup in the preceding beats — it comes from nowhere
- [ ] Characters are mentioned by name but given nothing meaningful to do
- [ ] Any romantic subplot appears despite `romanticSubplot: false`
- [ ] Established characters (Thorne, Cog, Ashworth, Finch, Isabelle) are absent from the beats

---

### Test Case 6B: Expand Mode

**Scenario**: The user provides a detailed, 689-character plot outline with specific events in sequence. The agent must preserve ALL user events in their correct order while enriching the outline with connective tissue, proper act structure, and additional beats.

**Input** (simulated `PromptContext`):

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery/Thriller"],
  "description": "Detective Elara Voss investigates sentient automata in 1887 London.",
  "plotOutline": "Elara investigates three cases of awakened automata — the weeping maid, the factory refuser, and the protective dog. Each case leads her deeper into a conspiracy. She meets Cog in Lower London and decides to protect him rather than report him. She discovers Margaret Ashworth is Thorne's wife's replacement when she visits Thorne's home unexpectedly. Midway through, Elara learns that Thorne's secret — his automaton wife — is connected to the wider awakening. Her own mechanical hand begins to exhibit strange behavior. Ashworth offers Elara a deal: amnesty for Thorne if Elara shuts down the investigation. Elara refuses. The climax takes place at the Babbage Engine Central in Upper London. Isabelle's network of hidden automata plays a key role in the final confrontation.",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "the moral cost of denying consciousness, what it means to be human, loyalty vs. duty",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 80000,
  "premise": "{\"hook\":\"In 1887 London, clockwork automata are waking up — and someone is pulling the strings.\",\"centralConflict\":\"Detective Elara Voss must uncover who is awakening the automata and why.\",\"stakes\":\"If Elara fails, sentient beings will be destroyed as malfunctions.\",\"themeSeeds\":[\"the moral cost of denying consciousness to convenience\",\"what makes a person a person\"],\"tone\":\"Dark Victorian atmosphere with moments of wonder and unexpected tenderness.\",\"logline\":\"A detective with a mechanical hand must choose between her Bureau and her conscience when she discovers the clockwork automata she investigates are genuinely alive.\"}",
  "genreProfile": "",
  "worldBible": "",
  "characters": "[{\"id\":\"elara-voss\",\"name\":\"Elara Voss\",\"role\":\"protagonist\"},{\"id\":\"inspector-thorne\",\"name\":\"Inspector Reginald Thorne\",\"role\":\"ally\"},{\"id\":\"cog\",\"name\":\"Cog\",\"role\":\"ally\"},{\"id\":\"director-margaret-ashworth\",\"name\":\"Director Margaret Ashworth\",\"role\":\"antagonist\"},{\"id\":\"finch\",\"name\":\"Oliver Finch\",\"role\":\"rival\"},{\"id\":\"isabelle-marchetti\",\"name\":\"Isabelle Marchetti\",\"role\":\"supporting\"}]",
  "relationships": ""
}
```

**Mode**: `expand` (plotOutline is 689 characters, well above the 200-character threshold)

#### Expected Output Criteria

- [ ] Output is valid JSON with keys: `acts`, `majorTwist`, `climax`, `resolution`, `endingType`
- [ ] **ALL user events preserved in correct order**:
  - [ ] The three initial cases (weeping maid, factory refuser, protective dog) appear as early beats in Act 1 or early Act 2
  - [ ] Elara meets Cog in Lower London and decides to protect him — this beat appears and captures both the meeting and the choice
  - [ ] Elara discovers Thorne's automaton wife during an unexpected visit — this specific scene is preserved
  - [ ] The midpoint connection between Thorne's secret and the wider awakening is positioned at or near the story's midpoint
  - [ ] Elara's mechanical hand exhibiting strange behavior is present as a beat
  - [ ] Ashworth's amnesty deal and Elara's refusal are preserved as a specific beat
  - [ ] The climax at Babbage Engine Central in Upper London is honored — the location is correct
  - [ ] Isabelle's network of hidden automata playing a key role in the final confrontation is included
- [ ] **Enriched with connective tissue**: The agent adds beats BETWEEN the user's established events that create causal flow. The outline should feel like a complete, architecturally sound narrative rather than a list of disconnected scenes.
- [ ] **Proper act structure**: Events are organized into 3 acts with appropriate break points. Act breaks are irreversible escalations.
- [ ] **majorTwist present** (since `bigTwist: true`): The twist integrates with the user's events — it should connect to or build upon the user's established plot points (e.g., the mechanical hand's strange behavior, Thorne's connection to the awakening)
- [ ] **climax**: 4-6 sentences. Set at Babbage Engine Central as the user specified. Involves Isabelle's automata network. Resolves both external and internal conflict.
- [ ] **resolution**: 3-5 sentences. Addresses the aftermath of the climax. Shows the new world order for automata, Elara's personal transformation, and the fate of key characters.
- [ ] **endingType**: `"happy"` or `"triumphant"`

#### Red Flags

- [ ] Any user event is missing from the output (especially check: three cases, Cog meeting, Thorne discovery, mechanical hand, amnesty deal/refusal, Babbage Engine Central climax, Isabelle's network)
- [ ] User events are reordered (e.g., the amnesty deal appears before Elara discovers Thorne's secret)
- [ ] User events are contradicted (e.g., the climax is moved to a different location, Elara accepts the amnesty deal instead of refusing)
- [ ] The output merely restates the user's plot points without adding connective beats
- [ ] `majorTwist` is absent
- [ ] `endingType` is not "happy" or "triumphant"
- [ ] Characters mentioned in the user's outline (Cog, Thorne, Ashworth, Isabelle) are absent from the beats

---

## Cross-Agent Consistency Checks

After running all Foundation Phase agents, verify the following cross-agent consistency requirements. These checks ensure that the 6 agents form a coherent foundation rather than 6 disconnected outputs.

### Premise → All Subsequent Agents

- [ ] **Theme consistency**: The `themeSeeds` from the Premise Architect should be reflected in the Genre Analyst's `toneGuidance`, the Character Architect's character arcs, and the Plot Architect's story beats. If the premise identifies "the moral cost of denying consciousness" as a theme, at least one character arc should grapple with this theme, and the plot should create situations that force this thematic question.
- [ ] **Conflict propagation**: The `centralConflict` from the Premise should be the primary conflict driving the Plot Architect's beat structure. The characters should be designed to be on opposing sides of this conflict.
- [ ] **Tone alignment**: The `tone` from the Premise should be consistent with the Genre Analyst's `toneGuidance` and should not contradict the World Builder's `atmosphere`.

### Genre Profile → World Builder, Character Architect, Plot Architect

- [ ] **Convention compliance**: The Genre Analyst's `conventions` should be honored in the Plot Architect's structure. If the genre profile says "mystery readers expect fair-play clue planting," the plot beats should include planted clues.
- [ ] **Trope usage**: The `commonTropes` should appear (in fresh form) somewhere in the characters, world, or plot. The `avoidClichés` should NOT appear in any subsequent output.
- [ ] **Pacing alignment**: The `pacingExpectations` should match the Plot Architect's beat distribution across acts.

### World Bible → Character Architect, Relationship Mapper, Plot Architect

- [ ] **Characters native to world**: Character backstories, motivations, and speech patterns should reflect the world established by the World Builder. If the world has Upper/Lower London class divisions, character backgrounds should reference this geography.
- [ ] **Plot uses world**: The Plot Architect's beats should take advantage of specific locations, technologies, and social structures defined in the World Bible. The climax should happen in a location that exists in the world.
- [ ] **Atmosphere consistency**: The world's atmosphere should be consistent with the tone established by the premise and genre profile.

### Characters → Relationship Mapper, Plot Architect

- [ ] **ID consistency**: Character IDs must be identical across all outputs. If the Character Architect assigns `id: "elara-voss"`, the Relationship Mapper must use `"elara-voss"` in its tuples, and the Plot Architect should reference Elara consistently.
- [ ] **Arc integration**: Character arcs (arcStart → arcEnd) should be reflected in the plot beats. The Plot Architect should include beats that drive these transformations.
- [ ] **Relationship evolution matches plot**: The Relationship Mapper's `evolution` descriptions should be consistent with the events described in the Plot Architect's beats. If a relationship is described as "fractured by betrayal," there should be a betrayal beat in the plot.

### Relationship Mapper → Plot Architect

- [ ] **Conflict utilization**: The relationships with the highest tension and most complex dynamics should drive key plot beats. The Plot Architect should not ignore the dramatic potential mapped by the Relationship Mapper.
- [ ] **Evolution tracking**: Relationship evolutions should be trackable through the plot beats. If the Relationship Mapper says "Elara and Thorne's trust shatters when his secret is revealed," there should be a corresponding beat in the plot.

### Global Checks

- [ ] **No contradictions**: No fact established by one agent should be contradicted by another. If the World Builder says the city runs on clockwork (not steam), no other agent should reference steam power. If a character is 32, no agent should say she is 35.
- [ ] **Avoid list honored**: If items appear in the `avoidList`, they must be absent from ALL agent outputs. This includes the plot, characters, world, and relationships.
- [ ] **Content rating respected**: All outputs must be consistent with the PG-13 rating. No agent should produce content that exceeds this rating.
- [ ] **romanticSubplot flag respected**: If `romanticSubplot: false`, no agent should create a romantic arc. Organic mentions of past romances or minor romantic tension are acceptable, but no dedicated romantic subplot should exist.
- [ ] **Happy ending delivered**: Since `happyEnding: true`, the Plot Architect's `endingType` must be "happy" or "triumphant," and the resolution must describe a genuinely positive outcome for the protagonist.
- [ ] **Big twist consistency**: Since `bigTwist: true`, the twist should be seeded across multiple agents — the Character Architect may include a character with a hidden nature, the Relationship Mapper may note a hidden dimension, and the Plot Architect must include the full twist setup/reveal/impact.
