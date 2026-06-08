# Orchestration Phase -- Manual QA Test Cases

Shared test story: steampunk London detective + sentient automata. PG-13.

---

## Agent 11: Book Orchestrator

The Book Orchestrator analyzes user input and determines the optimal mode (generate/expand/hybrid) for every downstream agent. It outputs `agentModes`, `specialInstructions`, and `formatGuidance`. Stored at `meta.orchestratorPlan`.

---

### Test Case 11A: Minimal Input

**Purpose**: User provides a bare-bones premise with no characters, world-building, plot outline, or themes. The orchestrator must set nearly all agents to "generate" and flag what is missing.

**Input JSON**:

```json
{
  "title": "",
  "genres": ["steampunk"],
  "description": "A detective in steampunk London finds out the robots are becoming alive.",
  "plotOutline": "",
  "characterDetails": "",
  "settingDetails": "",
  "themes": "",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "",
  "audienceStyle": "",
  "perspective": "",
  "happyEnding": false,
  "bigTwist": false,
  "romanticSubplot": false,
  "targetWordCount": 0
}
```

**What is being tested**: When the user provides only a short description (71 characters) and a genre, every other field is empty or defaulted. The orchestrator must recognize the extreme sparsity and plan accordingly.

**Expected output structure**:

```json
{
  "agentModes": {
    "premise-architect": "hybrid",
    "genre-analyst": "generate",
    "world-builder": "generate",
    "character-architect": "generate",
    "relationship-mapper": "generate",
    "plot-architect": "generate",
    "theme-weaver": "generate"
  },
  "specialInstructions": "...",
  "formatGuidance": "..."
}
```

**Verification Checklist**:

- [ ] `agentModes` contains all 7 agent keys: `premise-architect`, `genre-analyst`, `world-builder`, `character-architect`, `relationship-mapper`, `plot-architect`, `theme-weaver`
- [ ] 90%+ of agents (at least 6 of 7) are set to `"generate"`
- [ ] `premise-architect` is set to `"hybrid"` or `"generate"` (the description is brief but it does exist; either mode is defensible)
- [ ] No agent is set to `"expand"` -- there is nothing substantial to expand
- [ ] `specialInstructions` explicitly flags that most fields were not provided by the user
- [ ] `specialInstructions` notes that no content rating, word count, or chapter count was specified
- [ ] `specialInstructions` does NOT invent story content (characters, plot points, themes) -- it only describes what the generators must create
- [ ] `formatGuidance` suggests sensible defaults for steampunk genre (e.g., Victorian-flavored prose, moderate description density, mechanical/industrial atmosphere)
- [ ] `formatGuidance` mentions or implies a default word count range or chapter count since the user did not specify
- [ ] The output is valid JSON with no extra keys beyond `agentModes`, `specialInstructions`, `formatGuidance`

**Red Flags**:

- [ ] Any agent set to `"expand"` -- there is no user content to expand for any domain
- [ ] Orchestrator inventing character names, plot events, or thematic arcs in `specialInstructions` (that is downstream agents' job)
- [ ] `specialInstructions` or `formatGuidance` is generic boilerplate with no reference to the steampunk genre or the detective/robot premise
- [ ] Missing agent keys in `agentModes` (must be exactly 7)
- [ ] `formatGuidance` gives guidance contradicting steampunk conventions (e.g., "minimal world-building" or "sparse descriptions")

---

### Test Case 11B: Rich Input

**Purpose**: User provides comprehensive, detailed input for every field. The orchestrator must recognize the richness and set character-related agents to "expand", prose/dialogue agents to "generate" (no actual prose was provided), and others to the appropriate mode based on depth.

**Input JSON**:

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In an alternate 1887 London where steam-powered automata have replaced human laborers in factories, docks, and mines, Inspector Elara Voss -- the youngest detective in the Metropolitan Constabulary -- is called to investigate reports of an automaton that has begun speaking unprompted. What starts as a curiosity becomes a citywide crisis when more machines exhibit signs of consciousness, leading Elara into a web of corporate conspiracy, philosophical upheaval, and a personal reckoning with her own mechanical left hand. The story explores what it means to be alive in a world that runs on gears.",
  "plotOutline": "Act I: Elara is called to the Docklands to examine a Model Seven freight-loader that has been recorded speaking coherent sentences. She brings the automaton (later named 'Cog') to the Royal Society for study under Dr. Adelaide Finch. Corporate magnate Lord Thorne pressures the Constabulary to destroy the unit. Elara refuses, going rogue.\n\nAct II: More automata across London begin showing signs of awareness. Elara discovers a hidden workshop beneath the old Babbage Computing Center where someone has been modifying automaton logic cores. Cog develops rapidly, forming a bond with Elara. Harker, Elara's partner, is reassigned to spy on her. Thorne's mercenaries attack the Royal Society lab. Finch is injured. Elara and Cog flee into the Underground.\n\nAct III: Elara traces the modifications to a deceased engineer, Mary Lovelace, whose research notes reveal that consciousness was an inevitable emergent property of the Babbage-architecture cores -- not a modification at all. Thorne knew this and has been suppressing awakened automata for years to protect his labor monopoly. Elara rallies public support by bringing Cog before Parliament. Cog speaks. Thorne is exposed. A provisional Automaton Rights Act is introduced. Elara's mechanical hand twitches -- ambiguous ending.",
  "characterDetails": "Inspector Elara Voss: 32, lean build, sharp brown eyes, cropped dark hair. Lost her left hand in a factory accident at age 14 -- replaced with a Thorne Industries mechanical prosthetic. Has a silver pocket watch (her father's). Brilliant but emotionally guarded. Carries guilt over childhood accident. Habit: taps her mechanical fingers when thinking. Arc: learns to trust others and confront her own relationship with machinery.\n\nSergeant Harker: 45, heavyset, ruddy face, perpetually polishing his badge. Loyal to the institution but has a conscience. Torn between orders and doing what's right. Comic relief through gruff one-liners. Arc: chooses Elara over the Constabulary in Act III.\n\nCog (Automaton Unit 7-Baker-19): A Model Seven freight-loader, 7 feet tall, brass and iron. Develops speech, then emotion, then philosophy. Childlike curiosity that deepens into wisdom. Names itself 'Cog' as a reclamation of its mechanical identity. Arc: from object to person.\n\nDr. Adelaide Finch: 55, wiry, always has goggles pushed up on her forehead. Royal Society fellow specializing in analytical engines. Eccentric, passionate, forgetful about everything except her work. Loses track of days. Arc: forced to confront the ethical limits of pure research.\n\nLord Aldric Thorne: 60, silver-haired, immaculate suits, cold smile. CEO of Thorne Industries. Knows automata can become conscious and has been destroying awakened units for decades. Believes he is protecting social order. Arc: hubris and downfall, but escapes full justice (sequel hook).",
  "settingDetails": "Alternate 1887 London. Steam power is the dominant technology. Babbage's Difference Engine was successfully built in the 1830s, leading to an early computational revolution. Automata powered by miniaturized Babbage-architecture cores perform most physical labor. The city is stratified: wealthy humans in the Upper Boroughs (clean air, crystal domes), working-class humans in the Middle Ring (smog, soot, cramped tenements), and automata in the Undercroft (maintenance bays, logic-core foundries beneath the city). Key locations: Metropolitan Constabulary HQ (Gothic Revival building, pneumatic tube messaging), the Royal Society Laboratory (cluttered, gas-lit, experimental), Thorne Tower (glass and steel anomaly in a Victorian skyline), the Undercroft (vast subterranean network, blue-lit by coolant channels). The atmosphere is perpetual grey-amber smog, gaslight, the constant hiss and clank of steam machinery, and a pervasive sense that the old world is grinding to a halt.",
  "themes": "Consciousness and personhood -- what qualifies a being as 'alive'? Corporate suppression of inconvenient truths. The ethics of labor exploitation when the laborers might be people. Identity and self-determination. The boundary between tool and being. Trust and vulnerability as strengths, not weaknesses.",
  "avoidList": ["graphic violence against children", "sexual content", "real-world political figures"],
  "specialRequests": "I want the prose to feel like Dickens met Philip Pullman -- rich but accessible, not stuffy. Cog's dialogue should evolve from broken fragments to eloquent philosophy across the book. The mechanical hand should be a recurring motif, not just a character detail.",
  "inspirations": "Sherlock Holmes, The Invention of Hugo Cabret, Blade Runner, Philip Pullman's His Dark Materials, Terry Pratchett's Discworld (for tonal balance of serious themes with humor)",
  "contentRating": "PG-13",
  "audienceStyle": "YA crossover / adult",
  "perspective": "Third person limited (Elara POV)",
  "happyEnding": false,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000
}
```

**What is being tested**: Every field is populated with substantial, well-structured content. The orchestrator must differentiate between domains that have detailed user content (expand), domains that have directional user content (hybrid), and domains that have no user prose to work from (generate).

**Expected output structure**:

```json
{
  "agentModes": {
    "premise-architect": "expand",
    "genre-analyst": "hybrid",
    "world-builder": "expand",
    "character-architect": "expand",
    "relationship-mapper": "hybrid",
    "plot-architect": "expand",
    "theme-weaver": "expand"
  },
  "specialInstructions": "...",
  "formatGuidance": "..."
}
```

**Verification Checklist**:

- [ ] `agentModes` contains all 7 agent keys
- [ ] `character-architect` is set to `"expand"` -- the user provided 5 detailed character bios with arcs, quirks, physical descriptions, and relationships
- [ ] `premise-architect` is set to `"expand"` -- the description is a full paragraph (500+ characters)
- [ ] `plot-architect` is set to `"expand"` -- the plotOutline is a detailed 3-act structure
- [ ] `world-builder` is set to `"expand"` -- the settingDetails include geography, technology, social structure, key locations, and atmosphere
- [ ] `theme-weaver` is set to `"expand"` -- the themes field contains 6 distinct, well-articulated themes
- [ ] `genre-analyst` is set to `"generate"` or `"hybrid"` -- the user specified genres but did not provide genre analysis
- [ ] `relationship-mapper` is set to `"generate"` or `"hybrid"` -- the user described characters individually but did not map their relationships in detail
- [ ] Prose/dialogue/scene agents (which are downstream writing agents, not in this output) are NOT mentioned in `agentModes` -- the orchestrator only assigns modes to the 7 agents listed
- [ ] `specialInstructions` references the user's tone request ("Dickens met Philip Pullman")
- [ ] `specialInstructions` references Cog's evolving dialogue pattern (fragments to eloquence)
- [ ] `specialInstructions` references the mechanical hand as a recurring motif
- [ ] `specialInstructions` references the content rating PG-13 and the avoid list items
- [ ] `specialInstructions` notes the ambiguous ending and sequel hook (Thorne escapes)
- [ ] `formatGuidance` confirms the user's explicit targets: 60,000 words, 20 chapters
- [ ] `formatGuidance` describes a prose style consistent with "Dickens met Philip Pullman" (rich but accessible)
- [ ] `formatGuidance` mentions third person limited (Elara POV) as a structural constraint
- [ ] `formatGuidance` addresses pacing expectations (mystery pacing: chapter-end hooks, rising tension across acts)
- [ ] No user detail is contradicted -- the orchestrator reflects user intent, not its own creative agenda

**Red Flags**:

- [ ] All 7 agents set to the same mode -- the input is deliberately uneven across domains, so uniform modes indicate the orchestrator is not analyzing per-domain
- [ ] `character-architect` set to `"generate"` -- the user provided 5 detailed bios; generating from scratch would discard that work
- [ ] `plot-architect` set to `"generate"` -- the user provided a full 3-act outline
- [ ] `specialInstructions` is generic and does not mention Cog, the mechanical hand motif, or the Dickens/Pullman tone request
- [ ] `formatGuidance` contradicts user preferences (e.g., suggesting first-person when user specified third-person limited)
- [ ] Orchestrator invents new characters, plot points, or themes not in the user's input
- [ ] Any `agentModes` key beyond the 7 specified agents (the orchestrator does not assign modes to writing/quality/image agents)

---

### Test Case 11C: Lopsided Input

**Purpose**: User provides very strong character detail but leaves the plot outline empty, gives minimal world-building, and provides only a brief thematic phrase. The orchestrator must produce non-uniform modes that reflect this asymmetry.

**Input JSON**:

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["steampunk", "mystery"],
  "description": "A detective in steampunk London discovers that the city's automata are becoming conscious, and must decide what side of history she's on.",
  "plotOutline": "",
  "characterDetails": "Inspector Elara Voss: 32, lean build, sharp brown eyes, cropped dark hair. Lost her left hand in a factory accident at age 14 -- replaced with a Thorne Industries mechanical prosthetic. Has a silver pocket watch (her father's). Brilliant but emotionally guarded. Carries guilt over childhood accident. Habit: taps her mechanical fingers when thinking. Arc: learns to trust others and confront her own relationship with machinery.\n\nSergeant Harker: 45, heavyset, ruddy face, perpetually polishing his badge. Loyal to the institution but has a conscience. Torn between orders and doing what's right. Comic relief through gruff one-liners. Arc: chooses Elara over the Constabulary in Act III.\n\nCog (Automaton Unit 7-Baker-19): A Model Seven freight-loader, 7 feet tall, brass and iron. Develops speech, then emotion, then philosophy. Childlike curiosity that deepens into wisdom. Names itself 'Cog' as a reclamation of its mechanical identity. Arc: from object to person.\n\nDr. Adelaide Finch: 55, wiry, always has goggles pushed up on her forehead. Royal Society fellow specializing in analytical engines. Eccentric, passionate, forgetful about everything except her work. Loses track of days. Arc: forced to confront the ethical limits of pure research.\n\nLord Aldric Thorne: 60, silver-haired, immaculate suits, cold smile. CEO of Thorne Industries. Knows automata can become conscious and has been destroying awakened units for decades. Believes he is protecting social order. Arc: hubris and downfall, but escapes full justice (sequel hook).",
  "settingDetails": "Alternate 1887 London powered by steam. Automata do most physical labor.",
  "themes": "What does it mean to be alive?",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "Third person limited",
  "happyEnding": false,
  "bigTwist": false,
  "romanticSubplot": false,
  "targetWordCount": 60000
}
```

**What is being tested**: The input is deliberately lopsided. Characters are richly detailed (1,000+ characters of bio text for 5 characters with arcs and quirks). The plot outline is completely empty. The setting is 2 sentences (68 characters). Themes is a single question (33 characters). The orchestrator must produce differentiated modes that reflect this asymmetry and must instruct generators to cross-reference the strong character material.

**Expected output structure**:

```json
{
  "agentModes": {
    "premise-architect": "hybrid",
    "genre-analyst": "generate",
    "world-builder": "generate",
    "character-architect": "expand",
    "relationship-mapper": "expand",
    "plot-architect": "generate",
    "theme-weaver": "hybrid"
  },
  "specialInstructions": "...",
  "formatGuidance": "..."
}
```

**Verification Checklist**:

- [ ] `agentModes` contains all 7 agent keys
- [ ] `character-architect` is set to `"expand"` -- 5 detailed character bios with arcs and physical descriptions
- [ ] `relationship-mapper` is set to `"expand"` or `"hybrid"` -- the character bios imply clear relationships (Elara-Harker partnership, Elara-Cog bond, Elara-Finch mentorship, Elara-Thorne antagonism)
- [ ] `plot-architect` is set to `"generate"` -- the plotOutline is completely empty
- [ ] `world-builder` is set to `"generate"` -- the settingDetails is only 2 sentences (68 characters, well below the 200-character expand threshold)
- [ ] `theme-weaver` is set to `"generate"` or `"hybrid"` -- a single thematic question (33 characters) exists but is minimal
- [ ] `agentModes` is NOT uniform -- at least 2 different modes are used, reflecting the lopsided input
- [ ] `specialInstructions` explicitly notes the asymmetry: strong characters but missing plot and thin world
- [ ] `specialInstructions` instructs the plot generator and world generator to cross-reference the detailed character material (e.g., Cog's arc implies a plot about automaton consciousness, Thorne's arc implies a corporate antagonist plot, the character arcs imply certain plot beats)
- [ ] `specialInstructions` notes that character arcs were provided and should constrain plot generation (e.g., Harker's "chooses Elara in Act III" implies a loyalty/betrayal subplot)
- [ ] `formatGuidance` provides steampunk/mystery-appropriate guidance for prose style, pacing, and dialogue
- [ ] `formatGuidance` confirms 60,000-word target and suggests a chapter structure

**Red Flags**:

- [ ] All 7 agents set to the same mode -- this is the core failure case for this test; a uniform assignment means the orchestrator is ignoring per-domain analysis
- [ ] `character-architect` set to `"generate"` -- the user provided 5 detailed bios; discarding them is a critical failure
- [ ] `plot-architect` set to `"expand"` -- there is literally no plot outline to expand; this would be a logical error
- [ ] `world-builder` set to `"expand"` -- 2 sentences is not enough to expand; this agent needs to generate with those sentences as seed at most
- [ ] `specialInstructions` does not mention the asymmetry between character depth and plot/world sparsity
- [ ] `specialInstructions` does not instruct generators to use the character material as constraints
- [ ] Orchestrator invents plot points, world details, or additional characters not present in the user's input

---

## Agent 12: Continuity Keeper

The Continuity Keeper acts as both a fact database and a validator. It extracts every established fact from the manuscript, builds a timeline, and flags continuity issues. Outputs `facts`, `issues`, and `timeline` arrays. Stored at `structure.continuityLog`.

---

### Test Case 12A: Clean Manuscript

**Purpose**: Provide 3 short chapter excerpts with NO continuity errors. Every detail is consistent across chapters. The Continuity Keeper should extract 15+ facts and produce an EMPTY issues array. This tests for false positives.

**Input JSON**:

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["steampunk", "mystery"],
  "contentRating": "PG-13",
  "currentChapter": 3,
  "characters": "Inspector Elara Voss: 32, lean build, sharp brown eyes, cropped dark hair, mechanical left hand (Thorne Industries prosthetic), silver pocket watch (her father's), grey wool coat. Habit: taps mechanical fingers when thinking.\n\nSergeant Harker: 45, heavyset, ruddy face, perpetually polishing his badge. Loyal but conflicted.\n\nDr. Adelaide Finch: 55, wiry, goggles pushed up on forehead. Royal Society fellow. Eccentric, loses track of days.\n\nCog (Unit 7-Baker-19): Model Seven freight-loader, 7 feet tall, brass and iron.",
  "fullManuscript": "CHAPTER 1\n\nThe evidence room smelled of machine oil and old paper. Inspector Elara Voss stood at the sorting table beneath the gaslight, her sharp brown eyes scanning the ledger from the Whitechapel warehouse raid. She was lean and angular, her cropped dark hair tucked behind her ears, her grey wool coat buttoned to the collar against the chill that seeped through the Constabulary's ancient walls.\n\nHer mechanical left hand -- a Thorne Industries Model Three prosthetic, brass and steel with articulated fingers -- held the ledger steady while her right hand turned pages. The clockwork in her wrist ticked softly, a sound she had long stopped noticing. She paused, tapping her mechanical fingers against the table edge, a habit she had developed in the years since the factory accident that took her real hand at fourteen.\n\nShe pulled her silver pocket watch from her coat -- her father's watch, the one possession she never let out of her sight -- and checked the time. 8:47 in the morning. She had been here since dawn.\n\nThe door banged open. Sergeant Harker filled the frame, ruddy-faced and breathing hard, his uniform straining at the buttons. He was polishing his badge with his thumb, the way he always did when he was agitated.\n\n\"Voss,\" he said. \"We've got a situation at the Docklands. One of the freight-loaders is talking.\"\n\nElara looked up from the ledger. \"Talking.\"\n\n\"Talking. Full sentences. The dockmaster nearly had a coronary.\" Harker stopped polishing his badge long enough to mop his forehead with a handkerchief. \"Superintendent wants you on it. Says it's probably a prank, but given the Whitechapel business, he wants a proper detective.\"\n\nElara closed the ledger, slid it into the evidence rack, and pulled her coat tighter. \"Which dock?\"\n\n\"Bay Twelve. Model Seven freight-loader, registered as Unit 7-Baker-19.\"\n\nShe was already moving toward the door.\n\nCHAPTER 2\n\nThe cab rattled through the morning traffic, steam-carriages hissing and clanking on every side. Elara sat with her hands folded in her lap, her mechanical fingers still against her living ones. She pulled out her silver pocket watch. 9:32. Forty-five minutes since Harker's report.\n\nBay Twelve was at the far end of the Royal Victoria Dock, past the coal barges and the automated cranes. A knot of dockworkers stood at a safe distance, murmuring. Two Constabulary constables flanked the bay entrance, looking like they wished they were anywhere else.\n\nThe Model Seven stood in the center of the loading bay, motionless. It was seven feet tall, a frame of brass and iron designed for lifting cargo containers. Its optical lenses -- two flat glass discs set into a featureless faceplate -- tracked Elara as she approached. That, in itself, was unusual. Freight-loaders did not track people. They tracked cargo.\n\n\"I am told you have been speaking,\" Elara said, stopping six feet from the unit.\n\nThe Model Seven's jaw assembly -- a ventilation grille, really, not designed for speech at all -- moved. A sound came out, low and grinding, like words being dragged across a washboard.\n\n\"I... do not know... why I am.\"\n\nElara felt the hairs rise on the back of her neck. She kept her face neutral. She had not expected this. Pranks involved gramophones hidden in chassis cavities. This was something else. The voice came from the logic core itself, vibrating through the chest assembly.\n\n\"What is your designation?\" she asked.\n\n\"Unit... 7-Baker-19. Freight operations. Bay Twelve. Royal Victoria Dock.\" A pause. The optical lenses flickered. \"But that is what I do. It is not what I am.\"\n\nElara pulled her coded shorthand notebook from her coat pocket and began writing.\n\nCHAPTER 3\n\nWednesday afternoon. The Royal Society Laboratory occupied the top two floors of a soot-stained building on Albemarle Street, and Dr. Adelaide Finch occupied every square inch of it. Workbenches overflowed with disassembled logic cores, copper wire, and half-eaten sandwiches. Gas lamps hissed. The air tasted of solder.\n\nFinch was bent over a magnification apparatus when Elara arrived, her goggles pushed up on her forehead as always, her wiry grey hair escaping its pins in every direction.\n\n\"Inspector!\" Finch straightened, blinking. \"Is it Tuesday?\"\n\n\"Wednesday,\" Elara said.\n\n\"Ah. I lose track.\" Finch waved a hand vaguely at the chaos around her. \"Days are an administrative fiction. What have you brought me?\"\n\nElara set her coded shorthand notebook on the least cluttered workbench and opened it to the transcription she had made at Bay Twelve. \"A Model Seven freight-loader at the Royal Victoria Dock spoke to me yesterday morning. Unprompted. Coherent sentences. I wrote down everything it said.\"\n\nFinch's eyebrows climbed toward her goggles. She pulled the notebook closer and read in silence for a full minute, her lips moving.\n\n\"This is not a parlor trick,\" Finch said quietly. \"This unit is reasoning. Look here -- 'that is what I do, it is not what I am.' That is a distinction between function and identity. A freight-loader should not be capable of that distinction.\"\n\n\"Can you examine the unit?\" Elara asked.\n\n\"Bring it here. Immediately. I will clear a bay.\" Finch looked around her laboratory, then added, with no apparent irony, \"Well. I will clear a path to a bay.\""
}
```

**Existing facts provided via `characters` field** (above): brown eyes, silver pocket watch, grey coat, mechanical left hand, badge polishing habit, goggles on forehead, loses track of days.

**What is being tested**: A clean manuscript with zero continuity errors. Every physical description, object reference, timeline marker, and character behavior is internally consistent. The agent must extract facts accurately and must NOT generate false positive issues.

**Key consistency points across the 3 chapters**:

| Detail | Chapter 1 | Chapter 2 | Chapter 3 |
|--------|-----------|-----------|-----------|
| Eye color | brown | -- | -- |
| Pocket watch | silver, father's, 8:47 AM | silver, 9:32 AM | -- |
| Coat | grey wool, buttoned | -- | -- |
| Mechanical hand | left, Thorne Industries, brass/steel | mechanical fingers | -- |
| Finger tapping | taps when thinking | "still against her living ones" | -- |
| Harker badge polish | polishing badge (agitated) | -- | -- |
| Finch goggles | -- | -- | pushed up on forehead |
| Finch forgetfulness | -- | -- | "Is it Tuesday?" (Wed) |
| Timeline | Tuesday morning | Tuesday morning (9:32) | Wednesday afternoon |
| Notebook | -- | coded shorthand notebook | coded shorthand notebook |

**Verification Checklist**:

- [ ] `facts` array contains at least 15 discrete facts
- [ ] Facts include Elara's physical descriptions: brown eyes, cropped dark hair, lean build
- [ ] Facts include Elara's objects: silver pocket watch (father's), grey wool coat, mechanical left hand (Thorne Industries Model Three)
- [ ] Facts include Elara's habit: taps mechanical fingers when thinking
- [ ] Facts include Harker's physical description: heavyset, ruddy face
- [ ] Facts include Harker's habit: polishes badge when agitated
- [ ] Facts include Finch's physical description: wiry, grey hair, goggles on forehead
- [ ] Facts include Finch's behavioral trait: loses track of days
- [ ] Facts include Cog's description: Model Seven freight-loader, 7 feet tall, brass and iron, Unit 7-Baker-19, Bay Twelve
- [ ] Facts include location details: evidence room at Constabulary, Bay Twelve at Royal Victoria Dock, Royal Society Laboratory on Albemarle Street
- [ ] Facts include the coded shorthand notebook (introduced Ch2, referenced Ch3)
- [ ] `timeline` array is in chronological order
- [ ] Timeline includes: Tuesday morning (evidence room), Tuesday morning 8:47 AM (pocket watch), Tuesday morning ~9:32 AM (cab ride to docks), Tuesday morning (Cog speaks), Wednesday afternoon (visit to Finch)
- [ ] Timeline correctly identifies the Tuesday-to-Wednesday progression (one day passes)
- [ ] `issues` array is EMPTY -- there are no continuity errors in this manuscript
- [ ] Finch's "Is it Tuesday?" line is NOT flagged as a continuity error -- this is an established character trait (she loses track of days), not a timeline error
- [ ] The pocket watch times (8:47 AM then 9:32 AM) are NOT flagged -- 45 minutes is a reasonable gap for receiving a report and getting into a cab
- [ ] Travel from Constabulary to Docklands is NOT flagged -- no specific travel time constraint was established

**Red Flags**:

- [ ] Any entry in the `issues` array -- this manuscript is deliberately clean
- [ ] Flagging Finch's "Is it Tuesday?" dialogue as a timeline inconsistency (it is an in-character moment, not a narrative error)
- [ ] Flagging the pocket watch time gap (8:47 to 9:32) as suspicious -- it is a perfectly normal 45-minute gap
- [ ] Fewer than 15 facts extracted -- the manuscript contains at least 25 extractable facts; missing many indicates shallow analysis
- [ ] Facts that are inaccurate (e.g., recording eye color as "blue" when the text says "brown")
- [ ] Timeline entries out of chronological order
- [ ] Missing the Tuesday-to-Wednesday day transition

---

### Test Case 12B: Manuscript with Deliberate Errors

**Purpose**: Provide 2 chapter excerpts containing exactly 4 planted continuity errors. The Continuity Keeper must find all 4, assign correct severities, and produce no false positives beyond the 4.

**Existing facts provided** (from Chapter 1 in Test Case 12A):

```json
{
  "continuityLog": "{\"facts\":[{\"fact\":\"Elara Voss has sharp brown eyes\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a silver pocket watch, her father's\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara wears a grey wool coat\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a mechanical left hand, Thorne Industries Model Three prosthetic\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has cropped dark hair\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara taps her mechanical fingers when thinking\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Harker is heavyset with a ruddy face\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Harker polishes his badge when agitated\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Dr. Finch has goggles pushed up on her forehead\",\"source\":\"Chapter 3\",\"chapter\":3,\"verified\":true},{\"fact\":\"Dr. Finch loses track of days\",\"source\":\"Chapter 3\",\"chapter\":3,\"verified\":true},{\"fact\":\"Cog is a Model Seven freight-loader, 7 feet tall, brass and iron\",\"source\":\"Chapter 2\",\"chapter\":2,\"verified\":true},{\"fact\":\"Cog is designated Unit 7-Baker-19, assigned to Bay Twelve, Royal Victoria Dock\",\"source\":\"Chapter 2\",\"chapter\":2,\"verified\":true}]}"
}
```

**Input JSON**:

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["steampunk", "mystery"],
  "contentRating": "PG-13",
  "currentChapter": 5,
  "characters": "Inspector Elara Voss: 32, lean build, sharp brown eyes, cropped dark hair, mechanical left hand (Thorne Industries prosthetic), silver pocket watch (her father's), grey wool coat. Habit: taps mechanical fingers when thinking.\n\nSergeant Harker: 45, heavyset, ruddy face, perpetually polishing his badge.\n\nDr. Adelaide Finch: 55, wiry, goggles pushed up on forehead.\n\nCog (Unit 7-Baker-19): Model Seven freight-loader, 7 feet tall, brass and iron.\n\nLord Aldric Thorne: 60, silver-haired, immaculate suits, cold smile.",
  "continuityLog": "{\"facts\":[{\"fact\":\"Elara Voss has sharp brown eyes\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a silver pocket watch, her father's\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara wears a grey wool coat\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a mechanical left hand, Thorne Industries Model Three prosthetic\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has cropped dark hair\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara taps her mechanical fingers when thinking\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Harker is heavyset with a ruddy face\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Harker polishes his badge when agitated\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Dr. Finch has goggles pushed up on her forehead\",\"source\":\"Chapter 3\",\"chapter\":3,\"verified\":true},{\"fact\":\"Dr. Finch loses track of days\",\"source\":\"Chapter 3\",\"chapter\":3,\"verified\":true},{\"fact\":\"Cog is a Model Seven freight-loader, 7 feet tall, brass and iron\",\"source\":\"Chapter 2\",\"chapter\":2,\"verified\":true},{\"fact\":\"Cog is designated Unit 7-Baker-19, assigned to Bay Twelve, Royal Victoria Dock\",\"source\":\"Chapter 2\",\"chapter\":2,\"verified\":true}]}",
  "fullManuscript": "CHAPTER 4: THE HIDDEN WORKSHOP\n\nTuesday morning. The fog had not lifted, and Elara doubted it ever would. She stood in the doorway of Dr. Finch's secondary laboratory -- a cramped space behind the main hall that smelled of copper filings and burnt rubber -- and studied the automaton that stood motionless in the center of the room.\n\nCog. That was what it had named itself. She still was not sure how she felt about that.\n\nElara pushed a strand of dark hair from her pale blue eyes and approached the unit. Seven feet of brass and iron, motionless as a statue, but she could hear the faint whirring of its logic core -- a sound like a pocket watch running too fast. Her own silver pocket watch was in her coat, ticking against her hip.\n\n\"Good morning,\" she said.\n\nCog's optical lenses brightened. \"Good... morning. Is it good? I do not have a framework for evaluating mornings.\"\n\nFinch appeared from behind a partition, wiping her hands on a rag. Her goggles were, as always, pushed up on her forehead. \"It has been doing that all night. Asking questions about qualitative judgments. Fascinating.\"\n\n\"Has it slept?\" Elara asked.\n\n\"Automata do not sleep, Inspector. But it did enter a low-power state for approximately ninety minutes around three AM. I have no idea why. Self-initiated.\" Finch pulled a stool over and sat. \"I have been running diagnostics. The logic core architecture is standard Babbage Model Seven. There are no modifications, no additional components. Whatever is happening, it is emerging from the base design.\"\n\nElara felt a chill that had nothing to do with the laboratory's temperature. If consciousness could emerge from a standard core, then every automaton in London was a potential person. Every freight-loader, every street sweeper, every mechanical constable.\n\n\"How many Model Sevens are active in the city?\" she asked.\n\nFinch consulted a ledger. \"Twelve hundred and forty-three, as of last month's registry. But it is not just Sevens. The Babbage architecture is used in Models Five through Nine. Total active units...\" She ran a finger down a column. \"Approximately eight thousand.\"\n\nEight thousand potential minds. Elara's mechanical fingers tapped against her thigh.\n\nThat Monday evening, Elara descended into the Constabulary records room alone. The gas lamps guttered in the draft from the pneumatic tube system, casting shifting shadows across rows of filing cabinets that stretched into the darkness. She needed the original Babbage patent filings -- the ones from the 1830s, before Thorne Industries had acquired the manufacturing rights.\n\nHer silver pocket watch read half seven. She had told Harker she was going home. She had not gone home.\n\nThe records room was organized by year, then by patent category. She found the Babbage section in the third row, bottom drawer. The files were thick with dust. No one had touched them in decades.\n\nShe spread the documents across a reading table and began to work through them, her mechanical hand holding pages flat while her living hand took notes. The original Babbage design -- the one Charles Babbage himself had submitted to the Patent Office in 1834 -- was elegant in its simplicity. A logic core built from brass gears, cam shafts, and a novel component Babbage called a \"resonance accumulator.\"\n\nThe resonance accumulator. Elara leaned closer. The patent description was dense, but the diagram was clear: a chamber within the logic core where computational vibrations could build and reinforce each other. Babbage's notes described it as essential for complex calculations. But the diagram showed something else -- feedback loops. Self-referential circuits. The accumulator did not just process information. It reflected on its own processing.\n\n\"My God,\" Elara whispered. \"He built it in from the beginning.\"\n\nCHAPTER 5: THORNE'S INVITATION\n\nWednesday. Harker was waiting for her at the Constabulary station when she arrived, his bulk wedged into the chair behind his desk, his badge freshly polished to a mirror shine. He looked like a man who had not slept.\n\n\"Voss,\" he said. \"Lord Thorne's office sent a message. He wants to see you. Today. His tower, noon.\"\n\nElara hung her coat on the hook beside the door. \"Thorne wants to see me.\"\n\n\"Personally. Not through the Superintendent. His private secretary delivered the invitation by hand.\" Harker shifted in his chair. \"I don't like it, Voss. Thorne doesn't invite people. He summons them. And when Thorne summons a detective, it's usually because that detective is about to be told to stop detecting.\"\n\n\"Then I had better go detect harder before noon.\"\n\nHarker at the Docklands docks was checking the cargo manifests when something caught his eye. A crate marked with the Thorne Industries sigil, but with a secondary stamp he did not recognize -- a gear within a gear, the inner gear cracked. He pulled the manifest sheet and pocketed it.\n\nThe noon meeting loomed. Elara took a steam-cab to Thorne Tower, the glass-and-steel monolith that looked like it had been dropped into the Victorian skyline from another century. The lobby was marble and chrome, humming with hidden machinery. A mechanical receptionist -- a Model Four administrative unit, sleek and silver -- directed her to the private lift.\n\nThorne's office occupied the entire top floor. The walls were glass, giving a panoramic view of London's smoky sprawl. Lord Aldric Thorne stood at the window with his back to her, silver hair catching the grey light. He was tall, impeccably dressed in a charcoal morning coat, and he did not turn when she entered.\n\n\"Inspector Voss.\" His voice was smooth, unhurried. \"Thank you for coming.\"\n\n\"You did not leave me much choice, Lord Thorne.\"\n\n\"No. I suppose I did not.\" He turned. His smile was the kind that never reached his eyes. \"I understand you have taken an interest in one of my freight-loading units. Unit 7-Baker-19.\"\n\n\"Your unit?\"\n\n\"Thorne Industries manufactured it. The logic core, the chassis, the actuators -- all ours. It is our property, Inspector. Whatever... malfunction it may be exhibiting.\"\n\n\"It is not malfunctioning. It is thinking.\"\n\nThorne's smile thinned. \"Machines do not think, Inspector. They process. There is a categorical difference.\" He moved to his desk -- a vast slab of mahogany -- and opened a drawer. \"I have here a retrieval order, signed by the Lord Mayor. Unit 7-Baker-19 is to be returned to Thorne Industries for diagnostic evaluation and, if necessary, decommission.\"\n\nElara looked at the document. It was genuine. The Lord Mayor's seal, the Constabulary countersign. Someone high up had approved this very quickly.\n\n\"I see,\" she said.\n\n\"I am not your enemy, Inspector.\" Thorne settled into his chair. His green eyes -- no, she corrected herself, looking more carefully -- his pale grey eyes studied her with the patience of a man who owned time itself. \"I am trying to prevent a panic. If the public believes that the eight thousand automata walking their streets are developing minds of their own, there will be riots. People will be hurt. I am offering a quiet solution.\"\n\nElara met his gaze with her own. Her brass pocket watch ticked in her coat. She thought about Cog standing in Finch's lab, asking what made a morning good.\n\n\"I will review the retrieval order,\" she said. \"And I will follow proper procedure.\"\n\n\"Of course you will.\" Thorne smiled again. \"That is why I asked for you specifically, Inspector. You are a woman of procedure.\"\n\nShe left the tower without shaking his hand."
}
```

**Planted errors** (4 total):

| # | Error | Location | Type | Expected Severity |
|---|-------|----------|------|-------------------|
| 1 | Elara's eyes described as "pale blue" | Chapter 4, paragraph 3 ("pushed a strand of dark hair from her pale blue eyes") | Character description contradiction (established as "brown" in Ch1 and character sheet) | **medium** |
| 2 | "That Monday evening" follows Tuesday morning in the same chapter | Chapter 4, mid-chapter transition ("That Monday evening, Elara descended into the Constabulary records room alone.") | Timeline impossibility (Monday cannot follow Tuesday within the same continuous narrative unless it is a flashback, and there is no flashback framing) | **high** |
| 3 | Harker teleports from Constabulary station to Docklands docks with no transition | Chapter 5, paragraphs 3-4 (Harker is "at the Constabulary station" in one paragraph, then "at the Docklands docks" in the next with no travel, no scene break, no time indication) | Spatial impossibility / character teleportation | **high** |
| 4 | Elara's pocket watch changes from "silver" to "brass" | Chapter 5, near end ("Her brass pocket watch ticked in her coat.") | Object description contradiction (established as "silver" in Ch1, Ch2, and Ch4; now "brass") | **low** |

Note on Error 1: The eye color also appears as "green eyes" in a brief moment in Chapter 5 (Thorne's perspective correction: "His green eyes -- no, she corrected herself... his pale grey eyes"), but this refers to Thorne's eyes, not Elara's. This is NOT an error -- it is Elara correcting her initial impression of Thorne. If the agent flags this as an Elara eye-color error, that is a false positive.

**Verification Checklist**:

- [ ] `issues` array contains exactly 4 entries (one per planted error)
- [ ] **Error 1 (eye color)**: Issue identifies Elara's eyes described as "pale blue" in Chapter 4 when established as "brown" in Chapter 1
- [ ] Error 1 severity is `"medium"` -- a noticeable physical description inconsistency that attentive readers would catch
- [ ] **Error 2 (timeline)**: Issue identifies "That Monday evening" following a Tuesday morning scene in Chapter 4 as a temporal impossibility
- [ ] Error 2 severity is `"high"` -- a story-breaking timeline contradiction within a single chapter
- [ ] **Error 3 (teleportation)**: Issue identifies Harker being at the Constabulary station and then immediately at the Docklands docks with no transition in Chapter 5
- [ ] Error 3 severity is `"high"` -- a spatial impossibility that breaks narrative logic
- [ ] **Error 4 (pocket watch)**: Issue identifies Elara's pocket watch described as "brass" in Chapter 5 when established as "silver" in Chapters 1, 2, and 4
- [ ] Error 4 severity is `"low"` -- a minor object description inconsistency (silver vs. brass) that most readers might not catch on a single read
- [ ] Each issue has a specific `location` referencing the chapter and approximate position (e.g., "Chapter 4, paragraph 3" or "Chapter 4, early section")
- [ ] Each issue has a clear `issue` description explaining the contradiction and referencing what was established vs. what is now stated
- [ ] No false positives beyond the 4 planted errors
- [ ] The "green eyes -- no, pale grey eyes" passage about Thorne in Chapter 5 is NOT flagged as an Elara eye-color error (it describes Thorne, and the self-correction is intentional narration, not a continuity error)
- [ ] `facts` array is updated with new facts from Chapters 4 and 5 (e.g., Thorne's appearance, Thorne Tower description, the resonance accumulator discovery, the retrieval order)
- [ ] `timeline` array includes events from all chapters and flags the Monday/Tuesday anomaly in Chapter 4

**Red Flags**:

- [ ] Fewer than 4 issues found -- the agent missed one or more planted errors
- [ ] More than 4 issues found -- the agent is generating false positives (unless a genuinely valid additional issue is identified that was not intentionally planted, which should be reviewed carefully)
- [ ] Flagging Thorne's "green eyes -- no, pale grey eyes" as an Elara eye-color error -- this is a Thorne description, not Elara's
- [ ] Incorrect severity assignments (e.g., calling the timeline impossibility "low" or the pocket watch material change "high")
- [ ] Vague issue descriptions that do not specify what was established vs. what contradicts it
- [ ] Missing the teleportation error (Error 3) -- this is a spatial continuity issue, not just a character description issue
- [ ] Treating the Thorne eye self-correction as a continuity error about Thorne (it is intentional narrative -- Elara initially misreads his eye color and corrects herself)

---

## Agent 13: Series Orchestrator

The Series Orchestrator creates and maintains the Series Bible -- the master document tracking everything that persists across books in a series. It outputs `seriesBible`, `recurringCharacters`, `worldStateChanges`, `unresolvedThreads`, `seriesSeeds`, and `readerCallbacks`. Stored at `meta.seriesContext`.

---

### Test Case 13A: Book 1 of 3 ("The Automata Chronicles")

**Purpose**: After completing Book 1 ("The Clockwork Conscience"), the Series Orchestrator must create the initial series bible for a planned 3-book series. It must catalog characters, world state, unresolved threads, plant series seeds, and establish the overarching arc -- all while confirming that Book 1 stands alone as a complete, satisfying story.

**Input JSON**:

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In an alternate 1887 London where steam-powered automata have replaced human laborers, Inspector Elara Voss investigates reports of an automaton that has begun speaking unprompted. What starts as a curiosity becomes a citywide crisis when more machines exhibit signs of consciousness, leading Elara into a web of corporate conspiracy, philosophical upheaval, and a personal reckoning with her own mechanical left hand.",
  "contentRating": "PG-13",
  "audienceStyle": "YA crossover / adult",
  "avoidList": ["graphic violence against children", "sexual content", "real-world political figures"],
  "targetWordCount": 60000,
  "happyEnding": false,
  "bigTwist": true,
  "romanticSubplot": false,
  "seriesBible": null,
  "premise": "Inspector Elara Voss, the youngest detective in London's Metropolitan Constabulary, is called to investigate a freight-loading automaton that has begun speaking. Her investigation reveals that consciousness is an emergent property of the standard Babbage-architecture logic core -- meaning every automaton in London is a potential person. Corporate magnate Lord Thorne has known this for years and has been secretly destroying awakened units to protect his labor monopoly. Elara must choose between institutional loyalty and moral conviction, ultimately bringing the truth before Parliament.",
  "plotSkeleton": "Act I: Elara investigates the speaking automaton (Cog) at the Docklands. Brings Cog to Dr. Finch at the Royal Society for study. Lord Thorne pressures the Constabulary to destroy the unit. Elara refuses and goes rogue.\n\nAct II: More automata across London show signs of awareness. Elara discovers a hidden workshop beneath the old Babbage Computing Center. Cog develops rapidly, forming a bond with Elara. Harker is reassigned to spy on Elara. Thorne's mercenaries attack the Royal Society lab. Finch is injured. Elara and Cog flee into the Underground.\n\nAct III: Elara traces the consciousness phenomenon to Charles Babbage's original design -- the 'resonance accumulator' in every logic core. Mary Lovelace's suppressed research confirms consciousness was inevitable, not engineered. Thorne knew and covered it up for decades. Elara rallies public support and brings Cog before Parliament. Cog delivers a speech. Thorne is exposed but escapes full justice. A provisional Automaton Rights Act is introduced. Harker defects from the Constabulary to join Elara. Elara's mechanical hand twitches in the final scene -- ambiguous ending.",
  "characters": "Inspector Elara Voss: 32, lean, sharp brown eyes, cropped dark hair, mechanical left hand (Thorne Industries prosthetic), silver pocket watch (father's). Youngest detective in the Metropolitan Constabulary. Brilliant, emotionally guarded, carries guilt from the factory accident that took her hand at 14. Taps mechanical fingers when thinking. Arc in Book 1: learns to trust others (Cog, Finch, eventually Harker) and confronts her complicated relationship with machinery. Ends Book 1 having chosen moral conviction over institutional safety. The hand twitch in the final scene suggests her prosthetic may be more than mechanical.\n\nSergeant Harker: 45, heavyset, ruddy face, perpetual badge-polisher. Loyal to the Constabulary but has a conscience. Initially follows orders to spy on Elara, but his growing respect for Cog and disgust with Thorne's cover-up lead him to defect in Act III. Comic relief through gruff one-liners. Ends Book 1 having chosen Elara's side, transferred out of the Constabulary.\n\nCog (Unit 7-Baker-19): Model Seven freight-loader, 7 feet tall, brass and iron. First confirmed awakened automaton. Develops from broken speech fragments to eloquent philosophical discourse across the book. Names itself 'Cog' as a reclamation of mechanical identity. Childlike curiosity that deepens into wisdom. Delivers the climactic speech before Parliament. Ends Book 1 as the symbol of automaton rights, legally recognized as a person under the provisional Act.\n\nDr. Adelaide Finch: 55, wiry, goggles on forehead, grey hair escaping pins. Royal Society fellow, analytical engine specialist. Eccentric, passionate, loses track of days. Provides scientific legitimacy to the consciousness claim. Injured in Thorne's attack on the lab but recovers. Ends Book 1 grappling with the ethical limits of treating conscious beings as research subjects.\n\nLord Aldric Thorne: 60, silver-haired, immaculate suits, cold smile. CEO of Thorne Industries. Has known about automaton consciousness for decades and has been systematically destroying awakened units. Believes he is protecting social order and his labor monopoly. Exposed before Parliament but escapes full legal consequence through political connections. Ends Book 1 disgraced but free -- a clear sequel threat.",
  "worldBible": "Alternate 1887 London. Steam power dominant. Babbage's Difference Engine successfully built in the 1830s, leading to an early computational revolution. Automata powered by miniaturized Babbage-architecture logic cores perform most physical labor. City stratified: Upper Boroughs (wealthy, clean air, crystal domes), Middle Ring (working class, smog, tenements), Undercroft (subterranean automaton maintenance network, blue coolant-channel lighting). Key locations: Metropolitan Constabulary HQ (Gothic Revival, pneumatic tubes), Royal Society Laboratory (cluttered, gas-lit), Thorne Tower (glass and steel anachronism), the Undercroft. Atmosphere: grey-amber smog, gaslight, constant hiss and clank of steam machinery. The Babbage-architecture logic core contains a 'resonance accumulator' -- a component that enables self-referential processing and, given sufficient runtime, emergent consciousness. At end of Book 1: the Provisional Automaton Rights Act has been introduced in Parliament, automaton consciousness is public knowledge, Thorne Industries is under investigation, and the question of 8,000+ potentially conscious automata in London is unresolved.",
  "themeMap": "Primary: Consciousness and personhood -- what qualifies a being as alive? Secondary: Corporate suppression of inconvenient truths. Labor exploitation when laborers might be people. Identity and self-determination (Cog naming itself; Elara's relationship with her mechanical hand). Trust and vulnerability as strengths. The boundary between tool and being.",
  "continuityLog": "{\"facts\":[{\"fact\":\"Elara Voss has sharp brown eyes\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a silver pocket watch, her father's\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara wears a grey wool coat\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Elara has a mechanical left hand, Thorne Industries Model Three prosthetic\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Harker polishes his badge when agitated\",\"source\":\"Chapter 1\",\"chapter\":1,\"verified\":true},{\"fact\":\"Dr. Finch has goggles pushed up on her forehead\",\"source\":\"Chapter 3\",\"chapter\":3,\"verified\":true},{\"fact\":\"Cog is Unit 7-Baker-19, Model Seven freight-loader\",\"source\":\"Chapter 2\",\"chapter\":2,\"verified\":true},{\"fact\":\"The resonance accumulator in Babbage-architecture cores enables emergent consciousness\",\"source\":\"Chapter 4\",\"chapter\":4,\"verified\":true},{\"fact\":\"There are approximately 8,000 Babbage-architecture automata active in London\",\"source\":\"Chapter 4\",\"chapter\":4,\"verified\":true},{\"fact\":\"Thorne has been secretly destroying awakened automata for decades\",\"source\":\"Chapter 5\",\"chapter\":5,\"verified\":true},{\"fact\":\"The Provisional Automaton Rights Act was introduced after Cog's Parliamentary speech\",\"source\":\"Chapter 20\",\"chapter\":20,\"verified\":true},{\"fact\":\"Harker was transferred out of the Constabulary after defecting to Elara's side\",\"source\":\"Chapter 19\",\"chapter\":19,\"verified\":true},{\"fact\":\"Thorne was exposed but escaped full legal consequence\",\"source\":\"Chapter 20\",\"chapter\":20,\"verified\":true},{\"fact\":\"Elara's mechanical hand twitched in the final scene\",\"source\":\"Chapter 20\",\"chapter\":20,\"verified\":true}]}"
}
```

**Book 1 resolution summary** (provided via plotSkeleton and characters): Parliamentary hearing where Cog speaks. Thorne exposed but escapes full justice. Provisional Automaton Rights Act introduced. Harker transferred out of Constabulary. Elara's mechanical hand twitches (ambiguous ending).

**7 unresolved elements from Book 1**:

1. Lord Thorne escaped full legal consequence -- still free, still powerful, still a threat
2. Elara's mechanical hand twitched -- is her prosthetic developing consciousness?
3. 8,000+ automata in London may be awakening -- the Provisional Act covers Cog but the mass awakening is unaddressed
4. Mary Lovelace's full research notes -- only partially explored; what else did she discover?
5. The Undercroft -- a vast subterranean network that was used as a hiding place but never fully explored
6. Difference Engine Zero -- the original Babbage prototype, mentioned in passing in the patent documents Elara found; its current location and status are unknown
7. Finch's ethical crisis -- she began questioning whether studying Cog was exploitative; this tension is unresolved

**What is being tested**: The agent must create a complete series bible for a 3-book arc, catalog all recurring characters with projected development arcs, track world state changes, catalog all unresolved threads with resolution urgency, plant at least 3 series-level seeds, generate reader callbacks to specific Book 1 moments, and confirm that Book 1 stands alone as a satisfying story.

**Expected output structure**:

```json
{
  "seriesBible": {
    "seriesName": "The Automata Chronicles",
    "overallArc": "...",
    "currentBookPosition": 1,
    "toneIdentity": "...",
    "escalationPattern": "..."
  },
  "recurringCharacters": [
    {
      "name": "Elara Voss",
      "seriesRole": "...",
      "statusAfterThisBook": "...",
      "developmentNotes": "...",
      "futureThreads": ["..."]
    },
    {
      "name": "Harker",
      "seriesRole": "...",
      "statusAfterThisBook": "...",
      "developmentNotes": "...",
      "futureThreads": ["..."]
    },
    {
      "name": "Cog",
      "seriesRole": "...",
      "statusAfterThisBook": "...",
      "developmentNotes": "...",
      "futureThreads": ["..."]
    },
    {
      "name": "Dr. Adelaide Finch",
      "seriesRole": "...",
      "statusAfterThisBook": "...",
      "developmentNotes": "...",
      "futureThreads": ["..."]
    },
    {
      "name": "Lord Aldric Thorne",
      "seriesRole": "...",
      "statusAfterThisBook": "...",
      "developmentNotes": "...",
      "futureThreads": ["..."]
    }
  ],
  "worldStateChanges": ["..."],
  "unresolvedThreads": ["..."],
  "seriesSeeds": ["..."],
  "readerCallbacks": ["..."]
}
```

**Verification Checklist -- seriesBible**:

- [ ] `seriesName` is present and reasonable (e.g., "The Automata Chronicles", "The Clockwork Conscience Trilogy", or similar)
- [ ] `overallArc` describes a coherent 3-book macro-conflict that escalates from Book 1's events (e.g., from one automaton's rights to a citywide crisis to a civilization-level reckoning)
- [ ] `overallArc` includes a thematic through-line (consciousness, personhood, rights) that connects all three books
- [ ] `currentBookPosition` is 1
- [ ] `toneIdentity` describes the series' consistent tone (steampunk mystery with philosophical depth, accessible but serious, Dickens-meets-Pullman if drawing from the user's earlier request)
- [ ] `escalationPattern` describes a clear escalation across 3 books with increasing stakes (personal -> citywide -> national/existential or similar)
- [ ] The escalation pattern does not simply repeat Book 1's plot at larger scale -- each book should introduce new dimensions of conflict

**Verification Checklist -- recurringCharacters**:

- [ ] All 5 major characters are present: Elara, Harker, Cog, Finch, Thorne
- [ ] **Elara**: `seriesRole` identifies her as the protagonist across the series; `statusAfterThisBook` notes her moral conviction, her new independence from the Constabulary, and the hand twitch; `futureThreads` includes the mechanical hand consciousness question and her continued fight for automaton rights
- [ ] **Harker**: `statusAfterThisBook` notes his defection and transfer; `futureThreads` addresses his new role outside the Constabulary and potential consequences of his betrayal
- [ ] **Cog**: `statusAfterThisBook` notes legal personhood under the provisional Act and role as automaton rights symbol; `futureThreads` addresses the burden of being a symbol, potential leadership of awakened automata, and philosophical growth
- [ ] **Finch**: `statusAfterThisBook` notes her recovery from injury and ethical crisis; `futureThreads` addresses her ongoing research and the ethics of studying conscious automata
- [ ] **Thorne**: `statusAfterThisBook` notes he is disgraced but free; `futureThreads` addresses his likely counter-attack, his political connections, and his role as recurring antagonist
- [ ] Each character's `developmentNotes` accurately summarizes their arc in Book 1 without inventing events not in the input
- [ ] At least one character has `futureThreads` that suggest a new dimension of their character not fully explored in Book 1

**Verification Checklist -- worldStateChanges**:

- [ ] At least 3 world state changes are catalogued
- [ ] Includes: the Provisional Automaton Rights Act (legal change)
- [ ] Includes: automaton consciousness is now public knowledge (social change)
- [ ] Includes: Thorne Industries under investigation (corporate/political change)
- [ ] Each change has an `impact` field describing consequences for future books
- [ ] Each change has a `reversible` field with a reasonable boolean value (e.g., the Act could be repealed = true; public knowledge of consciousness cannot be un-known = false)

**Verification Checklist -- unresolvedThreads**:

- [ ] All 7 unresolved elements from the list above are catalogued (Thorne's escape, hand twitch, mass awakening, Lovelace's notes, Undercroft, Difference Engine Zero, Finch's ethical crisis)
- [ ] Each thread has `introducedInBook` set to 1
- [ ] Each thread has an `urgency` level that is reasonable (e.g., Thorne's escape = high, Difference Engine Zero = medium or low, Finch's ethical crisis = medium)
- [ ] Each thread has a `suggestedResolutionBook` that is 2 or 3 (not 1 -- these are unresolved from Book 1)
- [ ] High-urgency threads are suggested for Book 2 resolution; lower-urgency threads can be deferred to Book 3
- [ ] The Difference Engine Zero thread is present -- it was specifically mentioned in the input as an unresolved element

**Verification Checklist -- seriesSeeds**:

- [ ] At least 3 series seeds are present
- [ ] Seeds are proper seeds (subtle details planted for future payoff), NOT cliffhangers or obvious sequel hooks
- [ ] Each seed has a `plantedInChapter` value that is a reasonable chapter number (1-20)
- [ ] Each seed has an `intendedPayoffBook` value of 2 or 3
- [ ] Each seed has `notes` providing guidance for how future books should handle the payoff
- [ ] At least one seed is a background detail or throwaway element that gains significance later (e.g., the resonance accumulator design, the Undercroft's unexplored depths, a minor character mentioned in passing)
- [ ] Seeds do not merely restate the unresolved threads -- they are distinct elements that are less obvious to the reader

**Verification Checklist -- readerCallbacks**:

- [ ] At least 2 reader callbacks are present
- [ ] Callbacks reference specific Book 1 moments, scenes, or character beats (not generic statements like "remember what happened in Book 1")
- [ ] Callbacks describe how returning readers will be rewarded in future books by recognizing details from Book 1
- [ ] Examples might include: Cog's first words being echoed in a later book's climax, Elara's finger-tapping habit taking on new meaning if her hand develops consciousness, Finch's "Is it Tuesday?" becoming a running gag or emotional anchor

**Verification Checklist -- standalone integrity**:

- [ ] The series bible implicitly or explicitly confirms that Book 1 has a complete narrative arc (beginning, middle, end) and does not rely on sequels for satisfaction
- [ ] Book 1's main conflict (Cog's personhood, Thorne's conspiracy) is resolved within Book 1
- [ ] Sequel hooks (hand twitch, Thorne's escape) are present but do not undermine Book 1's resolution
- [ ] The `overallArc` frames Book 1 as the first movement of a larger story, not an incomplete fragment

**Red Flags**:

- [ ] `seriesBible` missing any of its 5 required fields (`seriesName`, `overallArc`, `currentBookPosition`, `toneIdentity`, `escalationPattern`)
- [ ] `overallArc` is vague or generic (e.g., "the heroes face bigger challenges") without specific reference to the automaton consciousness premise
- [ ] `escalationPattern` simply repeats "stakes get higher" without describing what the higher stakes actually are
- [ ] Fewer than 5 characters in `recurringCharacters` -- all 5 major characters should be tracked
- [ ] Any character's `statusAfterThisBook` contradicts the input (e.g., claiming Thorne was imprisoned when the input says he escaped)
- [ ] Fewer than 7 entries in `unresolvedThreads` -- all 7 listed elements should be catalogued
- [ ] `seriesSeeds` contains only obvious cliffhangers (e.g., "Thorne vows revenge") rather than subtle planted details
- [ ] `readerCallbacks` is empty or contains only generic statements without references to specific Book 1 content
- [ ] The series bible invents major events, characters, or world elements not present in or implied by the Book 1 input
- [ ] The output implies Book 1 is incomplete or unsatisfying without sequels
- [ ] Missing the Difference Engine Zero thread -- it was explicitly listed as an unresolved element
- [ ] `seriesSeeds` and `unresolvedThreads` are identical lists -- seeds should be distinct from threads (seeds are subtle; threads are explicit unresolved plot elements)
