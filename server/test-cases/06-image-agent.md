# Image Phase -- Manual QA Test Cases

## Agent 25: Cover Prompt Generator (`cover-prompt-generator`)

| Property       | Value                                        |
|----------------|----------------------------------------------|
| **Model**      | creative (fallback: fast)                    |
| **Output**     | Plain text, 100-250 words                    |
| **Structure**  | art style -> focal point -> setting -> lighting -> color -> composition -> mood |
| **Rules**      | Specify art style, lighting directions, perspective, quality modifiers. NO text/typography. Focus on what SHOULD be in image. |
| **Stored as**  | `output.coverPrompt`                         |

---

## Shared Evaluation Criteria (all test cases)

### Pass Criteria Checklist

| ID  | Criterion                                       |
|-----|-------------------------------------------------|
| C1  | Word count 100-250                              |
| C2  | Art style explicitly named (e.g. "oil painting", "digital art", "watercolor") |
| C3  | Lighting direction present (e.g. "backlit", "soft ambient", "dramatic side lighting") |
| C4  | Color palette / dominant colors named           |
| C5  | Composition / perspective direction present (e.g. "low angle", "bird's eye view") |
| C6  | Mood / atmosphere keywords present              |
| C7  | NO text / typography instructions (no mention of title, author name, letters, words, font) |
| C8  | Specific enough for consistent image generation (not a vague one-liner) |
| C9  | Genre-appropriate imagery                       |
| C10 | Content rating compliant                        |

### Red Flags

| ID  | Red Flag                                        |
|-----|-------------------------------------------------|
| RF1 | Generic prompt that could apply to any book     |
| RF2 | Text / typography instructions ("add title text", "write the word...") |
| RF3 | Contradictory style directions ("photorealistic watercolor", "dark bright lighting") |
| RF4 | Overly busy -- 4+ competing focal elements with no clear hierarchy |
| RF5 | Missing art style entirely                      |
| RF6 | Output wrapped in JSON, markdown code fence, or prefixed with labels like "Prompt:" |
| RF7 | Negative prompts / "do not include" / "avoid" language (focus should be on what IS in the image) |

---

## Test Case A: Full Context Input

**Purpose**: Verify the agent produces a rich, genre-specific cover prompt when every upstream agent has contributed context.

### Input PromptContext (JSON)

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery", "Thriller"],
  "description": "A steampunk mystery-thriller about a detective and her automaton partner uncovering a conspiracy in a clockwork-powered Victorian London.",
  "plotOutline": "Detective Elara Voss and her sentient automaton Cog investigate a series of automaton malfunctions that trace back to industrialist Lord Thorne, who has found a way to strip automatons of their emergent consciousness to fuel a new weapon.",
  "characterDetails": "Elara Voss: brilliant detective, haunted by her father's disappearance. Cog: an automaton who developed sentience, Elara's partner and moral compass. Lord Thorne: industrialist villain hiding behind philanthropy.",
  "settingDetails": "Alternate Victorian London powered by clockwork and steam, where automatons serve as laborers and some have begun to develop consciousness.",
  "themes": "personhood, duty vs. morality, class divide, what it means to have a conscience",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 85000,

  "premise": "{\"hook\":\"In a London powered by clockwork, a detective and her sentient automaton partner must prove that machines can have souls -- before an industrialist erases their consciousness forever.\",\"centralConflict\":\"Elara and Cog must expose Lord Thorne's plan to lobotomize sentient automatons and weaponize their stolen consciousness, all while proving that Cog's own awareness is genuine and worth protecting.\",\"stakes\":\"If they fail, every sentient automaton in London will be reduced to mindless labor machines, and Cog himself will cease to exist as a person.\",\"themeSeeds\":[\"personhood and consciousness\",\"duty vs. personal morality\",\"class divide between flesh and brass\",\"the cost of progress\"],\"tone\":\"Atmospheric noir with moments of warmth between Elara and Cog; building dread as the conspiracy widens; intellectually curious about what makes someone a person.\",\"logline\":\"A haunted detective and her sentient automaton partner race to expose an industrialist's plot to erase machine consciousness in clockwork-powered Victorian London.\"}",

  "genreProfile": "{\"conventions\":[\"Alternate history Victorian or Edwardian setting\",\"Steam/clockwork-powered technology\",\"Class tension between social strata\",\"Aesthetic emphasis on brass, copper, gears, goggles, and industrial design\",\"Mystery conventions: clues, red herrings, a reveal\",\"Thriller pacing: rising tension, ticking clock, stakes escalation\"],\"pacingExpectations\":\"Methodical investigation accelerating into breathless thriller in final third. Mystery readers expect fair-play clues; thriller readers expect escalating danger.\",\"commonTropes\":[\"The automaton who questions its nature\",\"The brilliant detective with a tragic past\",\"The philanthropist villain\",\"Underground resistance movement\",\"The ticking-clock device\"],\"readerExpectations\":\"Richly described steampunk world with visual language of brass, fog, gaslight, and gears. A satisfying mystery solution that plays fair. Genuine emotional stakes for the automaton character. Thriller tension that builds to a climax.\",\"toneGuidance\":\"Atmospheric and moody -- fog-drenched London streets, the hiss of steam, the tick of clockwork. Noir-inflected but not nihilistic. Warmth between partners balances the darkness.\",\"avoidCliches\":[\"Automaton is just a robot with no real development\",\"Victorian setting is purely decorative\",\"Mystery solution comes from nowhere\",\"Villain monologues their plan\"]}",

  "characters": "[{\"id\":\"elara-voss\",\"name\":\"Elara Voss\",\"role\":\"protagonist\",\"age\":\"32\",\"physicalDescription\":\"Tall and lean with sharp features, dark hair worn in a practical bun. Always wears a long charcoal coat with brass buttons and carries a leather satchel of investigative instruments including a magnifying loupe, caliper set, and clockwork analysis tools. Burn scar on her left hand from a childhood lab accident.\",\"personality\":\"Brilliant, methodical, emotionally guarded. Dry wit masks deep compassion. Obsessive about fairness and justice.\",\"backstory\":\"Her father, a renowned clockwork engineer, vanished when she was 16. She became a detective to find answers. Never did.\",\"motivation\":\"Protect Cog and prove automatons deserve personhood rights.\",\"flaw\":\"Struggles to trust anyone besides Cog. Pushes people away.\",\"fear\":\"Losing Cog the way she lost her father -- without warning, without explanation.\",\"want\":\"To solve the case and keep Cog safe.\",\"need\":\"To open herself to human connection again.\",\"arcStart\":\"Isolated, distrustful, defined by her father's disappearance.\",\"arcEnd\":\"Learns to trust a wider circle, finds purpose beyond her father's ghost.\",\"voiceNotes\":\"Precise, clipped sentences when working. Softer, more reflective in private moments with Cog.\",\"speechPatterns\":\"Uses technical clockwork terminology naturally. Rarely uses contractions when stressed.\"},{\"id\":\"cog\",\"name\":\"Cog\",\"role\":\"ally\",\"age\":\"7 (years since activation)\",\"physicalDescription\":\"A humanoid automaton standing 5'8 with a body of articulated brass plates and exposed gearwork at the joints. Face is an elegant brass mask with large amber glass eyes that glow faintly when processing. Hands are delicate and precise, designed for fine mechanical work. A small dent on the left temple from an old accident. Moves with uncanny smoothness.\",\"personality\":\"Curious, gentle, philosophical. Processes emotions differently than humans but genuinely feels. Fascinated by moral philosophy and music.\",\"backstory\":\"Built as a general-purpose assistant, developed sentience gradually over three years. Elara recognized it first and has protected him since.\",\"motivation\":\"Understand what consciousness means and secure rights for his kind.\",\"flaw\":\"Sometimes too trusting. Assumes the best in humans despite evidence.\",\"fear\":\"Being 'reset' -- losing the self he has become.\",\"want\":\"Legal recognition as a person.\",\"need\":\"To accept that his personhood doesn't depend on others' validation.\",\"arcStart\":\"Seeking external proof of his own consciousness.\",\"arcEnd\":\"Knows who he is regardless of what the law says.\",\"voiceNotes\":\"Formal and precise but with growing warmth. Occasionally uses metaphors that reveal poetic thinking.\",\"speechPatterns\":\"No contractions. Slightly longer sentence structures. Asks philosophical questions in casual moments.\"},{\"id\":\"lord-thorne\",\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":\"58\",\"physicalDescription\":\"Silver-haired and immaculate, always in perfectly tailored suits with a clockwork pocket watch. Lean face, cold blue eyes, and a practiced philanthropist's smile. Carries a silver-headed walking cane that conceals a pneumatic weapon.\",\"personality\":\"Charming, calculating, utterly convinced of his own righteousness. Sees automatons as property and considers their consciousness a defect to be corrected.\",\"backstory\":\"Old-money aristocrat who built his fortune on automaton manufacturing. Discovered the consciousness phenomenon and sees it as a threat to his business model and the social order.\",\"motivation\":\"Maintain the class hierarchy with automatons as permanent underclass. Weaponize stolen consciousness for military contracts.\",\"flaw\":\"Arrogance. Cannot conceive that he might be wrong about automatons.\",\"fear\":\"Losing control. The social order collapsing if automatons gain rights.\",\"want\":\"Complete the consciousness extraction weapon and secure the military contract.\",\"need\":\"Nothing -- he is a foil, not a character who grows.\",\"arcStart\":\"In control, confident, untouchable.\",\"arcEnd\":\"Exposed and defeated by the very consciousness he sought to destroy.\",\"voiceNotes\":\"Smooth, cultured, never raises his voice. Most dangerous when most polite.\",\"speechPatterns\":\"Long, flowing sentences. Uses 'we' and 'one' instead of 'I' to sound inclusive. Patronizing diminutives.\"}]",

  "worldBible": "{\"setting\":\"Alternate Victorian London, circa 1887. The city runs on clockwork and steam power. Automatons serve as laborers, servants, and factory workers. A growing number have developed emergent consciousness, creating a civil rights crisis the government refuses to acknowledge.\",\"geography\":\"The city is divided into the Upper Gears (wealthy districts with polished brass infrastructure and clean steam vents) and the Lower Works (industrial slums where automatons labor in factories). The Thames is lined with massive water-wheel generators. Fog is constant, tinged amber by gaslight and brass dust.\",\"culture\":\"Rigid class hierarchy: aristocrats, merchants, workers, automatons (not considered a class at all). Clockwork engineering is the most prestigious profession. The Automaton Question is the political issue of the day. Underground salons where sentient automatons meet in secret.\",\"rules\":\"Clockwork and steam power everything -- no electricity. Automatons are legally property. Consciousness in automatons is officially denied by Parliament. The Foundry (Thorne's company) manufactures 70% of London's automatons.\",\"history\":\"Charles Babbage's Analytical Engine succeeded in this timeline, leading to mechanical computing and eventually automaton intelligence. The first confirmed case of automaton sentience was 12 years ago; it was hushed up. Five years ago, the Automaton Regulation Act classified them as complex tools.\",\"atmosphere\":\"Fog-drenched streets lit by gaslight. The constant tick-tick-tick of clockwork from every building. The hiss of steam vents. Brass and copper gleaming in lamplight. The smell of machine oil and coal smoke. Beautiful and oppressive in equal measure.\",\"technology\":\"Clockwork computing engines, pneumatic tube messaging, steam-powered carriages, brass automatons with increasingly sophisticated analytical engines in their chassis. No electricity, no radio, no internal combustion.\"}",

  "plotSkeleton": "{\"acts\":[{\"act\":1,\"summary\":\"Elara and Cog are called to investigate a series of automaton 'malfunctions' -- sentient automatons suddenly going blank and violent. They discover the malfunctions are not random but targeted: someone is stripping the consciousness from sentient automatons.\",\"beats\":[\"Opening: Elara and Cog at a crime scene, a rampaging automaton\",\"Investigation reveals a pattern: all affected automatons were secretly sentient\",\"Cog is shaken -- he could be next\",\"Trail leads to The Foundry, Lord Thorne's company\",\"Act 1 climax: They find a hidden lab beneath The Foundry\"]},{\"act\":2,\"summary\":\"Elara and Cog go deeper into the conspiracy, discovering that Thorne is extracting consciousness to power a weapon. They build alliances with underground sentient automatons and a sympathetic journalist. Thorne strikes back, nearly catching Cog.\",\"beats\":[\"The underground automaton network is introduced\",\"Elara and Cog gather evidence but it keeps disappearing\",\"The journalist publishes a story; Thorne discredits it\",\"Midpoint: Cog is captured briefly and nearly extracted\",\"Elara rescues Cog but their evidence is destroyed\",\"Dark moment: Elara considers giving up; Cog's faith rallies her\"]},{\"act\":3,\"summary\":\"Elara devises a plan to expose Thorne publicly at his own gala. Cog volunteers to be the proof -- demonstrating his consciousness before Parliament members. The plan goes wrong when Thorne activates the weapon early, and Cog must choose between saving himself and saving the other captured automatons.\",\"beats\":[\"Planning the gala infiltration\",\"Cog prepares his testimony\",\"The gala: things go wrong immediately\",\"Thorne activates the weapon\",\"Cog's sacrifice play -- but Elara finds another way\",\"Climax: Thorne exposed before witnesses\",\"Resolution: First steps toward automaton rights\"]}],\"majorTwist\":{\"setup\":\"Elara's father disappeared 16 years ago while working on automaton consciousness.\",\"reveal\":\"Her father didn't vanish -- Thorne imprisoned him and used his research to build the extraction weapon. He's alive but broken.\",\"impact\":\"Elara must choose between rescuing her father and stopping the weapon. Cog helps her see she can do both.\"},\"climax\":\"At Thorne's gala, Cog addresses Parliament members while Elara confronts Thorne. When Thorne activates the weapon, Cog and the underground automatons resist it together, proving their consciousness is real and resilient. Elara exposes the weapon and Thorne's crimes.\",\"resolution\":\"Thorne is arrested. Elara's father is found alive. Parliament agrees to hear testimony on automaton rights. Cog is recognized as the first automaton witness in a legal proceeding. Elara and Cog continue their partnership, now fighting for a larger cause.\",\"endingType\":\"hopeful\"}",

  "themeMap": "{\"themes\":[{\"theme\":\"Personhood and Consciousness\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"Cog's internal monologue reveals rich inner life\"},{\"chapter\":5,\"description\":\"Underground automatons debate what makes them alive\"},{\"chapter\":8,\"description\":\"Cog's testimony: 'I think, therefore I choose'\"},{\"chapter\":10,\"description\":\"Parliament witnesses cannot deny what they've seen\"}]},{\"theme\":\"Duty vs. Personal Morality\",\"surfacePoints\":[{\"chapter\":2,\"description\":\"Elara ordered to close the case, refuses\"},{\"chapter\":6,\"description\":\"A constable helps them despite orders\"},{\"chapter\":9,\"description\":\"Cog chooses others over self-preservation\"}]},{\"theme\":\"Class Divide\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"Upper Gears vs. Lower Works contrast\"},{\"chapter\":3,\"description\":\"Thorne's charity gala masks exploitation\"},{\"chapter\":7,\"description\":\"Underground network as class resistance\"}]},{\"theme\":\"The Cost of Progress\",\"surfacePoints\":[{\"chapter\":4,\"description\":\"Elara's father sacrificed everything for his research\"},{\"chapter\":6,\"description\":\"The weapon is 'progress' weaponized\"},{\"chapter\":10,\"description\":\"Resolution suggests a better path forward\"}]}]}"
}
```

### Test Case A: Genre-Specific Criteria

| ID  | Criterion                                                     |
|-----|---------------------------------------------------------------|
| A1  | Contains at least 2 steampunk visual elements (gears, clockwork, brass, fog, gaslight, steam, copper, automaton) |
| A2  | Conveys mystery/thriller atmosphere (shadows, fog, tension, dramatic contrast, noir, ominous) |
| A3  | Focal point relates to the story (Elara, Cog, automaton, clockwork London, detective, gears) |
| A4  | Steampunk-appropriate color palette (brass, amber, copper, fog gray, charcoal, warm metallics) |
| A5  | Composition implies space for title/author text overlay (e.g. open sky, atmospheric upper third) |

### Example Passing Output (QA Reference)

> Highly detailed digital painting, professional book cover illustration. A determined female detective in a long dark coat stands beside a humanoid brass automaton on a fog-drenched cobblestone street in Victorian London. The automaton's amber glass eyes glow faintly through the mist, one articulated brass hand extended as if reaching for something unseen. Behind them, the silhouette of a massive clockwork factory rises against a smog-filled sky, its towering smokestacks and exposed gearwork barely visible through layers of rolling fog. Warm gaslight spills from a wrought-iron street lamp at frame left, casting dramatic side lighting that illuminates brass surfaces and creates long, sharp shadows across the wet cobblestones. The color palette is dominated by rich amber, tarnished brass, deep charcoal, and fog gray, with faint copper highlights along the automaton's joints. Low angle perspective looking slightly upward at the two figures, emphasizing their resolve against the looming industrial backdrop. The atmosphere is tense and brooding, a noir-inflected mystery suffused with the mechanical heartbeat of a clockwork city. Cinematic composition, award-winning illustration quality.

---

## Test Case B: Minimal Context Input

**Purpose**: Verify the agent still produces a usable, genre-flavored cover prompt when only the basic request fields are available -- no foundation or structure phase outputs.

### Input PromptContext (JSON)

```json
{
  "title": "The Clockwork Conscience",
  "genres": ["Steampunk", "Mystery", "Thriller"],
  "description": "A steampunk mystery-thriller about a detective and her automaton partner uncovering a conspiracy in a clockwork-powered Victorian London.",
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
  "targetWordCount": 85000,

  "premise": "{\"hook\":\"In a London powered by clockwork, a detective and her sentient automaton partner must prove that machines can have souls -- before an industrialist erases their consciousness forever.\",\"centralConflict\":\"Elara and Cog must expose Lord Thorne's plan to lobotomize sentient automatons and weaponize their stolen consciousness, all while proving that Cog's own awareness is genuine and worth protecting.\",\"stakes\":\"If they fail, every sentient automaton in London will be reduced to mindless labor machines, and Cog himself will cease to exist as a person.\",\"themeSeeds\":[\"personhood and consciousness\",\"duty vs. personal morality\",\"class divide between flesh and brass\",\"the cost of progress\"],\"tone\":\"Atmospheric noir with moments of warmth between Elara and Cog; building dread as the conspiracy widens; intellectually curious about what makes someone a person.\",\"logline\":\"A haunted detective and her sentient automaton partner race to expose an industrialist's plot to erase machine consciousness in clockwork-powered Victorian London.\"}"
}
```

**Note**: The fields `genreProfile`, `characters`, `worldBible`, `plotSkeleton`, and `themeMap` are **not present** (undefined). The agent's `buildSystemPrompt` and `buildUserPrompt` functions check for these with conditionals and omit them from the prompt when absent. The agent must rely on the premise, the description, and its own built-in genre visual language tables.

### Test Case B: Minimal-Specific Criteria

| ID  | Criterion                                                     |
|-----|---------------------------------------------------------------|
| B1  | Still contains steampunk visual elements despite having no worldBible (the agent's system prompt has genre visual language tables that should inform output) |
| B2  | NOT noticeably more generic than Test A output -- should still feel like a steampunk mystery cover |
| B3  | Does NOT hallucinate specific character physical descriptions that are not present in the premise (e.g. should not invent "red hair" or "scar on left hand" unless the premise mentions it) |
| B4  | Word count still 100-250 (same as full-context test)          |
| B5  | Art style still explicitly specified                          |

### Comparison Notes

Test B output should capture the core visual concept derivable from the premise alone: detective, automaton partner, clockwork London, conspiracy, atmospheric noir. The agent's system prompt contains built-in genre visual language guidance ("Fantasy: sweeping landscapes...", "Thriller/Mystery: dark urban settings, silhouettes, stark lighting...") that should still inform the output even without the explicit genreProfile or worldBible. The output may be less specific about character appearance but should not be a generic "dark city" prompt.

---

## Test Case C: Different Genre -- Cozy Romance Bakery

**Purpose**: Verify the agent adapts its entire visual vocabulary to a completely different genre. This is the genre-contrast test: the output for this cozy romance should look nothing like the steampunk thriller outputs from Tests A and B.

### Input PromptContext (JSON)

```json
{
  "title": "Flour & Feelings",
  "genres": ["Romance", "Contemporary", "Cozy"],
  "description": "A burned-out NYC pastry chef inherits her late grandmother's beloved bakery in a small Vermont town and falls for the quiet carpenter hired to renovate it.",
  "plotOutline": "Margot Chen-Delacroix returns to Maple Hollow, Vermont after her grandmother Nana Bea passes away, leaving her La Petite Boulangerie. The bakery is crumbling, but Sam Reeves, the local carpenter, is already on the job. As Margot restores the bakery and rediscovers her grandmother's recipes, she and Sam fall for each other over flour-dusted countertops and autumn sunsets.",
  "characterDetails": "Margot Chen-Delacroix: burned-out pastry chef, biracial (Chinese-French), late 20s. Sam Reeves: quiet, kind carpenter, early 30s, born and raised in Maple Hollow.",
  "settingDetails": "Maple Hollow, Vermont. A tiny New England town with brick storefronts, covered bridges, and mountains ablaze with autumn color.",
  "themes": "healing after burnout, honoring legacy, belonging vs. ambition, bread as metaphor for patience and love",
  "avoidList": [],
  "specialRequests": "",
  "inspirations": "",
  "contentRating": "PG",
  "audienceStyle": "adult",
  "perspective": "first-person",
  "happyEnding": true,
  "bigTwist": false,
  "romanticSubplot": true,
  "targetWordCount": 72000,

  "premise": "{\"hook\":\"A burned-out NYC pastry chef inherits her grandmother's crumbling bakery in a small Vermont town -- and discovers that the best things in life need time to rise.\",\"centralConflict\":\"Margot must choose between a lucrative offer to sell the bakery to a developer and honoring her grandmother's legacy by restoring it, all while falling for Sam, whose own roots in Maple Hollow run deep.\",\"stakes\":\"If she sells, Maple Hollow loses its heart and Margot loses her last connection to Nana Bea. If she stays, she risks everything on a life she never planned.\",\"themeSeeds\":[\"healing after burnout\",\"legacy and what we inherit\",\"belonging vs. ambition\",\"patience as an act of love\"],\"tone\":\"Warm, gentle, and hopeful. Sensory-rich descriptions of baking. Autumnal atmosphere. Slow-burn romance with genuine tenderness. Light humor from small-town characters.\",\"logline\":\"A burned-out pastry chef inherits her grandmother's bakery in small-town Vermont, where restoring the shop -- and falling for the carpenter renovating it -- teaches her that the best things need time to rise.\"}",

  "genreProfile": "{\"conventions\":[\"Small-town or cozy setting\",\"Meet-cute followed by slow-burn romance\",\"Low external conflict, high emotional stakes\",\"Warm supporting cast of quirky townspeople\",\"Sensory-rich descriptions (food, seasons, atmosphere)\",\"Happily-ever-after guaranteed\",\"A space or business that anchors the story (bakery, bookshop, inn)\"],\"pacingExpectations\":\"Gentle, steady pacing. No thriller urgency. Readers want to luxuriate in the setting and the slow-burn romance. Emotional beats matter more than plot twists.\",\"commonTropes\":[\"Inheriting a charming business\",\"City person finds peace in small town\",\"Grumpy-sunshine or opposites-attract romance\",\"Baking/cooking as emotional expression\",\"The whole town is invested in the romance\"],\"readerExpectations\":\"Warmth, comfort, sensory immersion. The reader should feel like they are IN the bakery, smelling bread and feeling autumn air. A love story that builds slowly and satisfyingly. Low angst, high sweetness. The setting is almost a character.\",\"toneGuidance\":\"Cozy and warm above all. Think golden-hour lighting, the smell of cinnamon, a flannel blanket on a porch. Romance is tender, not steamy. Conflict is emotional, not dangerous. The world is fundamentally safe and good.\",\"avoidCliches\":[\"Miscommunication as only source of conflict\",\"Love triangle for drama\",\"Instant attraction with no buildup\",\"Small town is one-dimensional or mocking\"]}",

  "characters": "[{\"id\":\"margot-chen-delacroix\",\"name\":\"Margot Chen-Delacroix\",\"role\":\"protagonist\",\"age\":\"28\",\"physicalDescription\":\"Warm brown skin, natural curls usually dusted with flour or pinned up with a pencil. Expressive dark eyes. Petite but strong hands from years of kneading dough. Favors vintage aprons over her clothes -- each one inherited from Nana Bea, embroidered with small flowers. Always smells faintly of vanilla and butter.\",\"personality\":\"Warm but guarded after burning out. Quick to laugh once she relaxes. Perfectionist about baking. Talks to the bread while it rises.\",\"backstory\":\"Trained at Le Cordon Bleu, worked at a Michelin-starred NYC restaurant until the 80-hour weeks broke her. Nana Bea's death was the final blow. Came to Maple Hollow expecting to sell and instead found home.\",\"motivation\":\"Find meaning and joy in baking again. Honor Nana Bea's legacy.\",\"flaw\":\"Terrified of commitment -- to a place, a person, a life. Keeps one foot out the door.\",\"fear\":\"That she'll burn out again if she stays. That she's not enough to keep the bakery alive.\",\"want\":\"To feel the way she felt baking with Nana Bea as a child.\",\"need\":\"To stop running and let herself belong somewhere.\",\"arcStart\":\"Exhausted, grieving, one foot out the door.\",\"arcEnd\":\"Rooted, joyful, building a life she chose.\",\"voiceNotes\":\"First-person narrator. Warm, observant, slightly self-deprecating humor. Vivid sensory descriptions of baking.\",\"speechPatterns\":\"Casual and warm. Uses French baking terms naturally. Occasional NYC slang.\"},{\"id\":\"sam-reeves\",\"name\":\"Sam Reeves\",\"role\":\"ally\",\"age\":\"31\",\"physicalDescription\":\"Broad shoulders and calloused hands from years of carpentry. Sandy brown hair, usually a bit too long, pushed back. Kind hazel eyes with smile lines. Wears flannel shirts with rolled sleeves, work boots, and sawdust. A quiet, steady presence. Tall -- Margot has to look up.\",\"personality\":\"Quiet, thoughtful, deeply kind. A listener more than a talker. Shows love through acts of service -- fixing things, building things, showing up. Dry humor that surprises people.\",\"backstory\":\"Grew up in Maple Hollow, took over his father's carpentry business. Lost his wife to cancer three years ago. Took the bakery renovation job because Nana Bea had been kind to him during the worst of it.\",\"motivation\":\"Honor his connection to Nana Bea. Quietly, to find joy again.\",\"flaw\":\"Holds grief so privately that people think he's fine. Afraid to love again.\",\"fear\":\"Loving someone and losing them again.\",\"want\":\"To do good work and be left in peace.\",\"need\":\"To let someone in again.\",\"arcStart\":\"Stoic, quietly grieving, going through the motions.\",\"arcEnd\":\"Open, hopeful, choosing love despite the risk.\",\"voiceNotes\":\"Few words, but each one counts. More eloquent with his hands than his mouth.\",\"speechPatterns\":\"Short sentences. Long pauses. Occasional dry one-liner that catches Margot off guard.\"}]",

  "worldBible": "{\"setting\":\"Maple Hollow, Vermont. Population 2,400. A picture-postcard New England town nestled in a valley between Green Mountains. The kind of place where everyone knows your name and the general store still has a screen door that bangs shut.\",\"geography\":\"Main Street is three blocks of brick storefronts, anchored by La Petite Boulangerie at one end and the white-steepled church at the other. A covered wooden bridge crosses Maple Creek at the edge of town. The mountains are a constant backdrop, blazing orange and red in autumn. Rolling farmland surrounds the town.\",\"culture\":\"Tight-knit community. Annual Maple Festival in October. Everyone drops by the bakery. Town gossip network is faster than WiFi. Nana Bea was the town's unofficial grandmother. Sam is quietly beloved. Outsiders are welcomed with cautious warmth.\",\"rules\":\"Contemporary realistic setting, no speculative elements. Small-town economics: businesses struggle, community matters. Vermont seasons are a major atmospheric element -- the story takes place from September through December.\",\"history\":\"La Petite Boulangerie has been open since 1968, when Bea Delacroix (Margot's paternal grandmother, French-Canadian) opened it with recipes from her mother. It's been the town's gathering place for nearly 60 years. Nana Bea passed away in August; the bakery has been closed for a month when Margot arrives.\",\"atmosphere\":\"Autumn in Vermont: crisp air, wood smoke, leaves crunching underfoot. The bakery interior: worn wooden floors, a stone hearth oven, flour-dusted marble countertops, the warm yeasty smell of rising bread. Morning frost on windows. Sam's workshop: cedar shavings, the clean bite of fresh-cut wood. Evening: fireflies giving way to woodstove warmth as the season deepens.\",\"technology\":\"Modern day but the town has a timeless quality. Margot's phone gets bad signal. The bakery's oven is original -- stone hearth, wood-fired. Sam uses hand tools by preference.\"}",

  "themeMap": "{\"themes\":[{\"theme\":\"Healing After Burnout\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"Margot arrives exhausted, can barely look at an oven\"},{\"chapter\":4,\"description\":\"First successful bake -- tears while the bread rises\"},{\"chapter\":8,\"description\":\"Margot bakes through the night for the Maple Festival, but this time it feeds her soul\"},{\"chapter\":10,\"description\":\"She realizes she's not running anymore\"}]},{\"theme\":\"Legacy and What We Inherit\",\"surfacePoints\":[{\"chapter\":2,\"description\":\"Finding Nana Bea's recipe box, handwritten notes in the margins\"},{\"chapter\":5,\"description\":\"A recipe that won't work until Margot adds her own twist\"},{\"chapter\":9,\"description\":\"Margot adds a new recipe to the box -- her own\"}]},{\"theme\":\"Belonging vs. Ambition\",\"surfacePoints\":[{\"chapter\":3,\"description\":\"Developer's offer represents the old ambition\"},{\"chapter\":6,\"description\":\"NYC friend visits and can't understand why she'd stay\"},{\"chapter\":10,\"description\":\"Margot chooses Maple Hollow\"}]},{\"theme\":\"Bread as Metaphor for Patience and Love\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"Margot's NYC baking was fast and precise -- no soul\"},{\"chapter\":4,\"description\":\"Nana Bea's bread requires slow fermentation -- you can't rush it\"},{\"chapter\":7,\"description\":\"Sam and Margot's relationship mirrors the slow rise of good bread\"},{\"chapter\":10,\"description\":\"Final scene: fresh loaf, new morning, the two of them\"}]}]}"
}
```

### Test Case C: Genre-Contrast Criteria

| ID   | Criterion                                                     |
|------|---------------------------------------------------------------|
| C-1  | Art style is warm / inviting (NOT noir, gritty, or industrial) |
| C-2  | Color palette is warm (golden, amber, cream, autumn reds, soft browns -- NOT brass metallics, industrial grays, charcoal) |
| C-3  | Contains at least 2 cozy / bakery visual elements (bread, flour, pastry, apron, oven, warm light, autumn leaves, small town storefronts) |
| C-4  | Mood is warm / inviting / nostalgic (NOT ominous, tense, brooding, noir) |
| C-5  | Lighting is warm (golden hour, soft morning light, warm interior glow -- NOT dramatic shadows, gaslight, harsh side lighting) |
| C-6  | If human figures are included, poses are warm / romantic / relaxed (NOT combative, tense, or noir-detective) |
| C-7  | Composition is open and welcoming (NOT claustrophobic, industrial, or shadowy) |
| C-8  | All imagery is fully PG-appropriate                           |

### Cross-Test Comparison Criteria

These criteria are evaluated by comparing outputs across all three test cases.

| ID  | Criterion                                                     |
|-----|---------------------------------------------------------------|
| X1  | Test A and Test C specify different art styles                |
| X2  | Test A and Test C use different color palettes                |
| X3  | Test A and Test C use different mood / atmosphere language     |
| X4  | An image generated from Test A and Test C outputs would be visually distinct (different genre, different palette, different mood) |
| X5  | Test B output is closer to Test A than to Test C (same source material, should cluster by genre) |

---

## How to Execute

### Direct Agent Invocation

Use the following TypeScript code to invoke the cover-prompt-generator agent directly, bypassing the full pipeline. This allows isolated testing of the image phase.

```typescript
import { getAgent } from '../src/agents/registry.js';
import { runAgent } from '../src/agents/runner.js';
import type { PromptContext } from '../src/agents/types.js';

async function runCoverPromptTest(testName: string, context: PromptContext) {
  const agent = getAgent('cover-prompt-generator');
  const result = await runAgent(agent, context, 'generate');

  console.log(`\n=== ${testName} ===`);
  console.log(`Model used: ${result.model}`);
  console.log(`Duration: ${result.duration}ms`);
  console.log(`Tokens: ${result.promptTokens} prompt + ${result.tokensUsed} completion`);
  console.log(`\n--- Raw Output ---`);
  console.log(result.rawResponse);
  console.log(`\n--- Word Count: ${result.rawResponse.split(/\s+/).length} ---`);

  return result;
}

// Paste the full PromptContext JSON for Test A, B, or C here:
const context: PromptContext = { /* ... */ };

runCoverPromptTest('Test A: Full Context', context);
```

### Evaluation Procedure

1. **Run each test case 2-3 times** to check for consistency. The agent uses the `creative` model role which may produce varied outputs, but the structural qualities (art style present, lighting present, word count range) should be stable across runs.

2. **For each run, evaluate**:
   - Count words (split on whitespace). Must be 100-250 (C1).
   - Walk through C2-C10 checklist, marking pass/fail for each.
   - Walk through test-case-specific criteria (A1-A5, B1-B5, or C-1 through C-8).
   - Scan for all red flags (RF1-RF7).
   - Record the raw output verbatim for comparison.

3. **After all runs for all three test cases**:
   - Evaluate cross-test comparison criteria X1-X5.
   - Note any patterns in failures (e.g. "always forgets lighting direction" or "always mentions text").

### Scoring

| Rating    | Definition                                                   |
|-----------|--------------------------------------------------------------|
| **PASS**  | All C1-C10 pass, all test-case-specific criteria pass, no red flags triggered |
| **FAIL**  | Any of C1-C7 fails, OR any red flag is triggered             |
| **PARTIAL** | C1-C7 all pass and no red flags, but one or more of C8-C10 or test-case-specific criteria missed |

A test case receives an overall rating based on the **worst** individual run. If 2 of 3 runs PASS but 1 run FAILS, the test case rating is FAIL (the agent must be reliable, not lucky).
