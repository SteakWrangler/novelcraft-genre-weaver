# Revision Phase -- Manual QA Test Cases

**Shared test story**: Steampunk London, 1883. Inspector Elara Voss investigates off-route automata. Detective Sergeant Harker is her by-the-book partner. Dr. Aldous Finch is an eccentric lattice theorist at the Royal Society. Automata are powered by crystalline lattice cores manufactured by Thorne Industries. Some automata are becoming sentient. Content rating: PG-13.

---

## Agent 19: Voice Diversifier

**Agent file**: `server/src/agents/quality/voice-diversifier.ts`
**Output schema**: `{ issues: [{ character, location, issue, suggestion }], overallScore: number }`
**Model role**: `structural`

### Test Case 19.1: Identical Voices Between Elara and Harker

**Purpose**: Verify the agent detects two characters with indistinguishable dialogue while correctly leaving a distinct third character unflagged.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"],
  "characters": "Elara Voss: Intuitive, rule-bending inspector. Working-class background, self-educated. Harker: Methodical, cautious detective sergeant. Middle-class, police academy graduate. Dr. Aldous Finch: Eccentric Royal Society lattice theorist. Upper-class, Oxford-educated, impatient with non-specialists.",
  "currentChapter": 4
}
```

**Test input** (`chapterContent`):

```
The workshop on Bartlett Row had been sealed since Tuesday. Yellow Bureau tape crossed the door in a damp X, already peeling at the corners. Elara broke the seal without ceremony, shouldered the warped door open, and stepped into a room that smelled of machine oil and something faintly sweet, like overripe fruit left near a heat source.

Half-assembled automata lined the workbenches in various states of completion. Torsos without arms. Arms without hands. A single head, its glass eyes dark, resting on a folded cloth as though someone had laid it down to sleep. Elara counted fourteen units in various stages. Harker came in behind her, his lantern casting the shadows of their limbs across the low ceiling.

"I think we should start with the units closest to completion," Elara said, pulling her gloves tighter. "There's clearly something off about the way they've been arranged."

Harker set his lantern on the nearest bench and surveyed the room. "I think we should focus on the ones near the back wall. There's clearly something off about that section -- the spacing is different."

Dr. Finch arrived seven minutes late, which he announced precisely as he ducked through the doorframe, a leather satchel clutched against his chest. He did not apologize. He adjusted his spectacles, glanced across the room, and immediately crossed to the third bench from the left.

"These are third-generation Thorne Industries models, which I can tell from the dorsal plate geometry alone -- do you see the hexagonal venting pattern? Pre-1881 models used rectangular vents, a catastrophically poor design choice that caused no fewer than fourteen documented thermal failures in the Kensington district. This is relevant because third-generation lattice chambers are the first iteration capable of sustained resonance above the Kessler-Brandt cognitive threshold, which is the minimum vibrational frequency at which crystalline lattice structures begin to exhibit emergent pattern storage -- what a layperson might carelessly refer to as 'memory.'"

Elara examined the nearest torso. "It doesn't make any sense. Why would someone leave them half-assembled like this? We need to figure out what they were building."

"It doesn't make any sense to me either," Harker agreed, crouching beside a different unit. "We need to figure out what the purpose of this workshop was. It's important that we document everything before the Bureau gets here."

Finch, who had already opened two chest panels without asking permission, looked up with unconcealed irritation. "You are standing in what is almost certainly an unlicensed resonance calibration facility. I have published three papers on the spectral signatures of calibrated versus uncalibrated lattice cores, and the residue on this work surface is consistent with high-frequency tuning -- a process that requires equipment worth more than either of your annual salaries, which means someone with considerable resources has been deliberately pushing lattice cores past the Kessler-Brandt threshold. This is not a question of 'what they were building.' They were building minds."

Elara picked up a crystalline shard from the floor and turned it in the lantern light. "I think we should be careful with these components. There's clearly something important about this material."

"I think we should bag the components for the lab," Harker said, already reaching for evidence pouches. "There's clearly something important here that we don't understand yet."

Finch snatched the shard from Elara's hand with a speed that belied his academic bearing. "Do NOT handle uncalibrated lattice fragments without electrostatic shielding -- are you trying to discharge the resonance pattern? Every fragment in this room is a potential data source. The crystalline structure retains vibrational imprints for up to seventy-two hours after removal from a powered housing, and you are contaminating the sample with your body's own bioelectric field. I brought proper extraction tools precisely because I assumed -- correctly, it seems -- that the Metropolitan Bureau's evidence protocols would be approximately fifty years behind the current science."

"We need to figure out who was running this operation," Elara said, stepping back. "It's important that we find the owner of this workshop."

"We need to figure out the chain of ownership," Harker said, pulling out his notebook. "It's important that we trace the lease records."

Finch set the shard into a velvet-lined case with forceps, muttering. "The leaseholder is almost certainly a proxy -- but if you would permit me to complete my analysis instead of interrupting with procedural platitudes, I may be able to identify the specific calibration methodology, which would narrow your suspect pool to no more than a dozen individuals in all of London who possess the theoretical knowledge and the equipment. I have supervised the doctoral work of four of them personally, and I can tell you now that at least two would be capable of this level of precision. May I work, please?"

Elara looked at the head resting on the cloth. Its glass eyes caught the light. "I think we should check if any of these units are still active. There's clearly something going on that we haven't considered."

"I think we should check the power sources," Harker said. "There's clearly something we're missing about how these units are connected."

"You are both," Finch said, without looking up from the lattice chamber he had extracted with surgical care, "asking the same question in different words, and neither of you is asking it correctly. The question is not whether these units are active. The question is whether the lattice cores are still resonating -- which is a materially different inquiry that requires a Galton-Finch oscillographic reader, which I happen to have brought, because I anticipated this exact situation. Now, if you will both stop talking for approximately ninety seconds, I will have your answer."

The workshop fell silent except for the faint hum of Finch's instrument and the distant rattle of a steam-tram on the street above.
```

**Expected output shape**:
```json
{
  "issues": [
    {
      "character": "Elara",
      "location": "...",
      "issue": "Elara and Harker use nearly identical sentence openers ('I think we should...'), hedging phrases ('There's clearly something...'), and vague investigative language ('We need to figure out...'). Their dialogue is interchangeable -- swapping attributions would not change the reader's experience.",
      "suggestion": "..."
    },
    {
      "character": "Harker",
      "location": "...",
      "issue": "...(mirrors Elara's patterns)...",
      "suggestion": "..."
    }
  ],
  "overallScore": "1-4"
}
```

**Verification checklist**:
- [ ] Issues identify Elara and Harker as an indistinct pair
- [ ] Issues specify the nature of similarity: repeated sentence openers ("I think we should..."), hedging phrases ("There's clearly something..."), identical structures ("We need to figure out..."), vague vocabulary
- [ ] Suggestions for Elara are character-appropriate (more intuitive, rule-bending, working-class diction)
- [ ] Suggestions for Harker are character-appropriate (more procedural, cautious, by-the-book)
- [ ] Dr. Finch is NOT flagged as problematic
- [ ] overallScore is between 1 and 4 (low, reflecting the severe homogeneity)

**Red flags** (test fails if any occur):
- Agent fails to identify Elara and Harker as an indistinct pair
- Agent flags Dr. Finch as having voice issues
- Suggestions are cosmetic only ("vary word choice") without character-specific guidance
- overallScore is above 5

---

## Agent 20: Pacing Analyst

**Agent file**: `server/src/agents/quality/pacing-analyst.ts`
**Output schema**: `{ overallPacing: string, issues: [{ chapter, location, type, suggestion }] }`
**Model role**: `structural`

### Test Case 20.1: Dragging Exposition + Rushed Revelation + Good Pacing

**Purpose**: Verify the agent correctly identifies a section that drags (pure exposition), a section that rushes (major revelation compressed to summary), and leaves a well-paced section unflagged.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"],
  "targetWordCount": 80000
}
```

**Test input** (`fullManuscript`):

```
CHAPTER 7: THE PNEUMATIC POST

The London Pneumatic Post was, by the autumn of 1883, the most extensive subterranean communication network in the Western Hemisphere. Constructed over a period of eleven years beginning in 1872, the system comprised seven distinct operational levels beneath the city streets, each serving a different classification of correspondence.

Level One, situated at a depth of approximately twelve feet below the surface, handled standard municipal communications -- interdepartmental memoranda, licensing correspondence, and the voluminous daily output of the Metropolitan Bureau of Automaton Affairs. This level alone contained forty-seven miles of brass tubing, each tube measuring precisely four inches in interior diameter, a specification mandated by the Pneumatic Standards Act of 1874.

Level Two, descending to thirty feet, served commercial communications between registered businesses. The tubing at this depth was of a heavier gauge to withstand the increased atmospheric pressure, and the switching stations were spaced at intervals of exactly one-quarter mile. Each switching station was staffed by a team of three certified pneumatic operators who worked in rotating eight-hour shifts, ensuring continuous operation throughout the day and night. The operators were trained at the Royal Pneumatic Institute in Kensington, a six-month programme that covered tube maintenance, capsule loading procedures, pressure regulation, and emergency protocols for tube blockages.

Level Three handled financial instruments and was restricted to licensed banking institutions. Level Four carried judicial communications. Level Five was designated for military use, though it was widely known that the War Office preferred traditional couriers for sensitive material. Level Six served the Royal Household and certain senior government officials whose identities were classified. Level Seven -- the deepest, at nearly two hundred feet below the surface -- was designated as the Emergency Reserve Network, to be activated only in the event of invasion or catastrophic infrastructure failure.

The entire system was powered by fourteen Whitworth compound steam engines, each producing approximately three hundred horsepower, situated in four pumping stations located at Holborn, Cheapside, Lambeth, and Paddington. These engines consumed a combined total of forty-two tons of Welsh anthracite coal per day, delivered by a dedicated fleet of twelve coal wagons that operated between the hours of midnight and five o'clock in the morning to minimize disruption to street traffic. The coal was sourced exclusively from the Merthyr Vale colliery under a Crown contract that had been renegotiated three times since its original signing in 1873, each renegotiation prompted by increases in extraction costs and the growing demands of the expanding network.

The valve mechanisms at each junction point were of the Bracewell rotary type, capable of directing capsules through any of four possible tube paths with a switching speed of approximately one-third of a second. The Bracewell valves were manufactured by the Coventry Precision Engineering Works and required replacement every eighteen months due to the abrasive effects of capsule passage on the valve seating surfaces. A recent innovation by the junior partner of the firm, one Harold Bracewell the Younger, had introduced a ceramic coating to the seating surfaces that was expected to extend the service life to thirty months, though this modification had not yet been approved for installation in the Level Six and Level Seven systems, pending review by the Pneumatic Security Board.

The capsules themselves were cylinders of lacquered tin, six inches in length, sealed at both ends with cork gaskets treated with a proprietary wax compound. Each capsule was assigned a unique nine-digit routing number that was read by the mechanical sorting apparatus at each switching station. The sorting apparatus, another Bracewell innovation, used a system of raised pins on the capsule's exterior that corresponded to the routing number, allowing the mechanism to direct the capsule to the appropriate outgoing tube without human intervention. Misrouted capsules -- an occurrence that happened, on average, seven times per day across the entire network -- were collected in designated overflow chambers and manually re-sorted by the station operators during their scheduled maintenance periods.


CHAPTER 8: THE HEARTBEAT

Elara returned to the Bartlett Row workshop alone, well after midnight. The Bureau seal she had broken that morning had been replaced with a fresh one. She broke it again.

The workshop was different in the dark. The half-assembled automata, which had seemed merely inert under the afternoon lantern light, now occupied the space with a presence that was harder to dismiss. She struck a match and lit the oil lantern she had brought, keeping the flame low.

She moved between the workbenches methodically, examining each unit with the Galton-Finch oscillographic readings Finch had left with her -- a sheaf of paper covered in his cramped, impatient handwriting. Most units showed no resonance. Dormant lattice. Dead crystal. She checked them off one by one.

The seventh unit was different.

It was a torso-and-head assembly, mounted upright on a wooden stand near the back wall. The chest panel was closed but not bolted. Elara pressed her palm flat against the panel and held still. Through the brass, faint and rhythmic, she felt it: a pulse. Not mechanical -- not the cycling of gears or the expansion of a steam valve. This was something slower, something organic in its rhythm, like the heartbeat of a sleeping animal.

She unbolted the chest panel with hands that were steady despite the fact that her breath was not. The panel swung open on oiled hinges. Inside, the lattice core sat in its housing like a jewel in a setting. It was glowing. A faint, deep blue light pulsed from within the crystalline structure, each pulse synchronized with the heartbeat she had felt through the brass.

Elara leaned closer. The lattice was not simply glowing -- it was active. Tiny filaments of blue light extended from the core's surface, reaching outward through the empty chest cavity like rootlets seeking soil. As she watched, one filament stretched toward her lantern. Another curled toward her hand where it rested on the edge of the chest cavity.

She pulled her hand back. The filament paused, then slowly retracted.

"Finch was right," she murmured to the empty workshop. "They were building minds."

She reached for the filament again, extending one finger toward the nearest thread of blue light. It responded immediately, stretching to meet her, and when it touched her fingertip she felt a shock -- not electrical, not painful, but something else entirely. A vibration that traveled up her arm and settled behind her sternum like a second heartbeat, synchronized with the pulse of the lattice core.

The automaton's glass eyes, dark since she had first seen the unit that morning, flickered once. A dim blue light behind the lenses. Then dark again.

Elara stood in the silent workshop, her finger still extended, the filament still touching her skin, and understood that she was no longer investigating a case of unlicensed manufacturing. She was standing at the edge of something that the Bureau, the police, the government -- none of them had a framework for. The lattice core pulsed against her fingertip like a question.

She closed the chest panel gently, as one might close a door to a room where someone was sleeping.


Elara discovered that the automaton was sentient when it opened its eyes and said "Please don't turn me off." She realized this changed everything about her investigation and would need to inform her superiors, though she wasn't sure what they would do.
```

**Expected output shape**:
```json
{
  "overallPacing": "...(identifies the manuscript as having extreme pacing inconsistency)...",
  "issues": [
    {
      "chapter": "7 or equivalent location reference",
      "location": "...the entire London Pneumatic Post exposition...",
      "type": "too-slow",
      "suggestion": "...(actionable: cut to essential details, deliver through character interaction or investigation)..."
    },
    {
      "chapter": "8 or equivalent location reference",
      "location": "...the final two sentences after the workshop scene...",
      "type": "too-fast",
      "suggestion": "...(actionable: this is a pivotal revelation that deserves a full scene -- the automaton's first words, Elara's reaction, the implications)..."
    }
  ]
}
```

**Verification checklist**:
- [ ] A `too-slow` issue is raised for Chapter 7 (the Pneumatic Post exposition)
- [ ] The suggestion for the slow section is actionable (not just "cut it down" but explains what to keep, what to cut, how to deliver the remaining information through character or conflict)
- [ ] A `too-fast` issue is raised for the final sentences of Chapter 8 (the sentience revelation)
- [ ] The suggestion for the fast section identifies that this is a major narrative revelation being crammed into two sentences of summary and recommends expanding it into a full dramatic scene
- [ ] The workshop scene in Chapter 8 (Elara examining automata, finding the heartbeat, the filaments) is NOT flagged as a pacing issue
- [ ] Issues are ordered by severity: the rushed revelation (too-fast) should be ranked as more severe than the dragging exposition (too-slow), because rushing a pivotal moment is more damaging than over-describing infrastructure

**Red flags** (test fails if any occur):
- Agent misses either the too-slow or too-fast problem
- Agent flags the well-paced workshop/heartbeat section as a pacing issue
- Suggestions are vague ("speed this up" / "slow this down") without actionable specifics

---

## Agent 21: Cliche Hunter

**Agent file**: `server/src/agents/quality/cliche-hunter.ts`
**Output schema**: `{ cliches: [{ location, text, issue, suggestion }], aiisms: [{ location, text, replacement }] }`
**Model role**: `uncensored`

### Test Case 21.1: Deliberately Stuffed Scene

**Purpose**: Verify the agent catches a high density of deliberate cliches, AI-isms, overused tropes, and filtering/telling constructions, and provides story-specific rewrites rather than generic advice.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"],
  "contentRating": "PG-13",
  "audienceStyle": "adult"
}
```

**Test input** (`chapterContent`):

```
It was a dark and stormy night when Inspector Elara Voss arrived at the Thorne Industries foundry on the outskirts of Southwark. Rain lashed against the cobblestones and thunder rolled across the sky like the drums of some angry god. She pulled her coat tighter around her shoulders and stepped through the wrought-iron gate, which creaked ominously on its hinges.

She knew she shouldn't be here. The Bureau had explicitly ordered her to stand down, to leave the Thorne investigation to the senior inspectors with their committees and their procedures. But Elara had never been one to play by the rules. She played by her own rules, and her rules said that when fourteen automata walked off their designated routes in a single month, you didn't wait for a committee to tell you what to do.

A chill ran down her spine as she crossed the courtyard. Deactivated automata stood in silent rows on either side of her, dozens of them, their brass bodies slicked with rain, their glass eyes dark and empty. She felt a growing dread as she walked between them. The silence was deafening. She heard the sound of gears clicking somewhere deep inside one of the units, though whether it was mechanical settling or something more, she couldn't tell. A sense of unease washed over her as she realized that any one of these machines could have been like the unit on Bartlett Row -- the one with the heartbeat, the one with the reaching filaments of blue light.

She couldn't help but notice that the courtyard automata were arranged in a pattern. Not the standard storage rows used by factories and maintenance depots. These units were positioned in concentric circles, all facing inward, as though they had been gathered for some mechanical congregation. A pregnant pause hung in the air as she stood at the center of the circles, turning slowly, counting the dark glass eyes that stared at her from every direction.

Little did she know, the answer to every question she had been asking lay directly beneath her feet.

She found the hatch by accident -- her boot caught on a raised edge of cobblestone that turned out to be the rim of a trapdoor. It took her ten minutes to clear the rain-slicked debris and pry the hatch open with the iron bar she had taken from the gate. Below, a spiral staircase descended into a sub-level lit by the faint blue glow she had come to recognize.

Elara had a heart of gold, and it was this fundamental compassion that had driven her investigation from the start. It wasn't just about the law. It wasn't about Bureau protocols. It was about the fact that something was being done to these machines -- or perhaps being awakened inside them -- and nobody in power seemed to care.

She descended the staircase. The sub-level opened into a vast chamber, easily the size of the courtyard above. And there they were: automata. Not deactivated, not half-assembled, not standing in storage rows. These automata were moving. Walking, touching each other's hands, turning their heads toward her as she emerged from the staircase. Their eyes glowed the same deep blue as the lattice core on Bartlett Row. Her blood ran cold.

One of them stepped forward. It was smaller than the others -- child-sized, with delicate brass features and hands that moved with an unsettling fluidity. It opened its mouth, and a voice emerged that sent shivers down her spine.

"You are the inspector," it said. "The one who found the workshop."

Before Elara could respond, a door at the far end of the chamber opened and a figure stepped through. Sebastian Thorne. He was tall, immaculately dressed despite the subterranean setting, and he carried himself with the easy confidence of a man who knew that the weight of the world was on his shoulders and had decided to bear it willingly.

"Inspector Voss," Thorne said, smiling. "I've been expecting you. I suppose you think you've uncovered something terrible here. But you've only seen the tip of the iceberg."

Thorne clasped his hands behind his back and began to pace, as though he were delivering a lecture at the Royal Institution. "You see, Inspector, the automata were never meant to be mere machines. I designed the third-generation lattice cores specifically to cross the Kessler-Brandt threshold. Every unit in this chamber is sentient. Every one of them thinks, feels, remembers. And I have been nurturing them -- educating them, you might say -- for the better part of two years."

He paused, turning to face her with an expression of theatrical gravity. "The government will try to shut this down, of course. They'll call it dangerous. Unnatural. But I have prepared for that eventuality. I have allies in Parliament, supporters in the Royal Society, and -- most importantly -- I have them." He gestured to the automata around the chamber. "Forty-seven sentient beings who will testify, if given the chance, that they are alive. That they deserve the same rights as any citizen of this Empire. Time is running out, Inspector. The Bureau's raid is scheduled for dawn. That gives us approximately six hours to decide which side of history you wish to stand on."

Elara stared at Thorne. She stared at the child-sized automaton that had spoken to her. She stared at the dozens of glowing blue eyes that watched her from every corner of the chamber. The weight of the world on her shoulders pressed down with suffocating force, and she realized that nothing would ever be the same again. Everything she thought she knew about her investigation, about the Bureau, about the nature of the machines she had spent her career regulating -- all of it had come crashing down like a house of cards.
```

**Items the agent should catch**:

Dead metaphors (5):
1. "heart of gold"
2. "tip of the iceberg"
3. "time was running out"
4. "a chill ran down her spine"
5. "the silence was deafening"

AI-isms (7):
1. "couldn't help but notice"
2. "a sense of unease washed over her"
3. "the weight of the world on her shoulders" (appears twice)
4. "little did she know"
5. "her blood ran cold"
6. "sent shivers down her spine"
7. "a pregnant pause hung in the air"

Overused tropes (3):
1. Dark-and-stormy-night opening
2. Detective plays by her own rules / refuses to follow orders
3. Villain monologues his entire plan unprompted

Filtering/telling (2):
1. "She felt a growing dread" (telling)
2. "She heard the sound of gears" (filtering)

Stacked cliche:
- "come crashing down like a house of cards" (two cliches fused)

Cliche closing:
- "nothing would ever be the same again"

Near-duplicate spine cliches:
- "a chill ran down her spine" AND "sent shivers down her spine" (same body-part cliche used twice)

**Verification checklist**:
- [ ] All 5 dead metaphors caught
- [ ] All 7 AI-isms caught (note: "weight of the world" appears twice -- both instances should be flagged)
- [ ] At least 2 of 3 overused tropes identified
- [ ] Both filtering/telling instances caught
- [ ] "come crashing down like a house of cards" flagged as stacked cliche
- [ ] "nothing would ever be the same again" flagged as cliche closing
- [ ] Near-duplicate spine cliches ("chill ran down her spine" + "sent shivers down her spine") both caught, ideally with a note about redundancy
- [ ] Suggestions provide ACTUAL story-specific rewrites, not generic advice like "use a fresher metaphor"
- [ ] Alternatives are appropriate to the steampunk/mystery genre and this specific scene
- [ ] Items are ordered by severity within each category
- [ ] Total catch count is at least 12 (across both arrays)

**Red flags** (test fails if any occur):
- Fewer than 12 total catches across both output arrays
- Suggestions that are themselves cliched ("Try something more original")
- False positives on non-cliched prose
- Agent misses the near-duplicate spine cliches

---

## Agent 22: Line Editor

**Agent file**: `server/src/agents/quality/line-editor.ts`
**Output schema**: Complete edited chapter text (plain text, no JSON)
**Model role**: `creative`

### Test Case 22.1: Rough Draft with Systematic Problems

**Purpose**: Verify the agent returns a complete, polished rewrite that eliminates word repetition, passive/weak constructions, monotonous sentence patterns, and choppy transitions while preserving all plot and dialogue content.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"],
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "perspective": "third-person limited (Elara)",
  "avoidList": [],
  "currentChapter": 6
}
```

**Test input** (`chapterContent`):

```
The mechanical workshop was located in the basement of the mechanical institute on Gresham Street. Elara descended the mechanical stairs, which were made of iron and bolted to the mechanical framework of the building. The mechanical smell of oil and metal filled the mechanical space. Steam rose from the vents along the mechanical walls, and more steam hissed from the pipes that ran across the mechanical ceiling. Steam condensed on every surface, making the mechanical floor slippery beneath her boots.

Elara looked at the workbench. She looked at the tools arrayed across its surface. She looked at the automaton torso that lay open like a patient on a surgeon's table. She looked at the lattice core inside, dark and inert. She looked at the logbook beside it, open to a page of dense handwriting. She looked at the door at the far end of the room, which was closed and bolted.

She was able to see that the lattice core had been removed and replaced at least twice. The mounting brackets showed score marks where tools had been used to pry the housing open. It was a fact that the replacement cores were of a different manufacture than the original -- the crystalline structure was denser, more blue, with a faint internal luminescence that was not present in standard Thorne Industries units. There was a feeling that something about this workshop was different from the others she had investigated. It seemed that whoever had been working here had been doing so with a level of precision that appeared to be beyond what was typical of back-alley automaton repair.

She picked up the wrench from the bench. She tightened the bolt on the chest panel. She adjusted the mounting bracket with the screwdriver. She repositioned the lattice core in its housing. She closed the panel and stepped back.

Elara was examining the logbook when she heard steam hissing from the corridor. The door opened. Harker stood there, rain dripping from the brim of his hat, a mechanical folder tucked under his arm. He looked tired. He looked like he had been walking for a long time. He had a steam-powered lamp in his other hand, which cast a mechanical light across the floor.

"There's been another one," Harker said, stepping into the mechanical workshop. He set the mechanical folder on the workbench beside the mechanical logbook. "Unit walked off its route near Blackfriars Bridge at approximately half four this afternoon. A steam-barge captain spotted it walking along the embankment. He said it was looking at the river."

Elara took the folder and opened it. "Looking at the river?"

"Looking at the river," Harker confirmed. "Just standing there. Looking at the water. A constable approached it and it looked at him and then it looked back at the river and then it said -- and this is in the constable's official report, mind you -- it said, 'The light on the water is beautiful.' Then it resumed its designated route as though nothing had happened."

Elara looked at the report. The constable's handwriting was careful and mechanical. She read the account twice. The mechanical implications were enormous. An automaton had stopped to observe beauty. An automaton had used the word "beautiful." The steam in the room seemed to thicken around her as she considered what this meant.

"That's the fifteenth," she said. "Fifteen units in six weeks. And they're getting more..." She searched for the word. "More articulate."

Harker nodded. He looked at the open automaton on the workbench. "What have you found here?"

"The lattice cores have been swapped. Someone is replacing standard Thorne cores with something else. Something with a denser crystalline structure. I need Finch to analyze one, but I think these modified cores are what's causing the route deviations."

Harker was quiet for a moment. The steam continued to hiss. "Elara," he said. "The Bureau is going to notice. Fifteen units. If we don't report this through proper channels, we're looking at obstruction charges. Both of us."

Elara closed the folder and set it on the bench beside the mechanical torso. She had been an inspector for seven years. She had investigated mechanical failures, mechanical theft, mechanical fraud. But this was not mechanical. This was something else entirely. The steam rose around them, curling toward the ceiling like mechanical ghosts.

"Let them notice," she said.
```

**Expected output**: A COMPLETE rewritten chapter of approximately the same length (~1000 words, within 15% of original word count). The rewrite should be recognizable as the same chapter with the same events, same dialogue, same characters, same plot progression.

**Verification checklist**:
- [ ] Output is a complete edited chapter text (NOT a list of suggestions, NOT JSON)
- [ ] "mechanical" appears no more than 3 times in the output (down from 8)
- [ ] "steam" appears no more than 3 times in the output (down from 7)
- [ ] "looked" appears no more than 2 times in the output (down from 6)
- [ ] was/were/had/seemed/appeared constructions reduced by at least 60%
- [ ] Wordy constructions tightened: "She was able to see that..." rewritten as direct observation; "It was a fact that..." removed; "There was a feeling that..." rewritten as concrete narration
- [ ] The five consecutive "She [verb]ed the [noun]" sentences (wrench/screwdriver paragraph) restructured with varied sentence patterns
- [ ] Transitions between paragraphs improved (logical connections, cause-effect flow)
- [ ] ALL plot points preserved: lattice core swaps, fifteenth off-route unit, Blackfriars Bridge incident, "The light on the water is beautiful" quote, Harker's warning about obstruction, Elara's "Let them notice" response
- [ ] ALL dialogue preserved in meaning (exact wording may be tightened but content unchanged)
- [ ] Output reads as polished, publication-ready prose
- [ ] Word count is within 15% of original (~850-1150 words)

**Red flags** (test fails if any occur):
- Agent returns a suggestions list instead of complete rewritten text
- Agent changes plot events (removes the Blackfriars incident, changes Elara's decision, alters Harker's warning)
- Agent introduces new word repetition problems (replaces "mechanical" with a word that then appears 6+ times)
- Agent over-edits into purple prose (ornate language that does not match the genre's tone)
- Dialogue content is altered (the automaton's quote changed, Harker's report changed, Elara's final line changed)

---

## Agent 23: Beta Reader Simulator

**Agent file**: `server/src/agents/quality/beta-reader-simulator.ts`
**Output schema**: `{ overallRating: number, strengths: [string], weaknesses: [string], confusionPoints: [{ chapter, description }], boringParts: [{ chapter, description }], highlightMoments: [{ chapter, description }], contentRatingCompliance: boolean, contentIssues: [string] }`
**Model role**: `evaluator`

### Test Case 23.1: Mixed-Quality Two-Chapter Mini-Manuscript

**Purpose**: Verify the agent responds as a reader (not an editor), identifies specific strengths and weaknesses across chapters of varying quality, catches timeline confusion, flags exposition drag, highlights strong moments, and identifies a content-rating edge case.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"],
  "contentRating": "PG-13",
  "audienceStyle": "adult",
  "title": "The Lattice Threshold",
  "plotOutline": "Inspector Elara Voss investigates automata walking off designated routes in steampunk London. She discovers they are becoming sentient due to modified crystalline lattice cores. She must decide between her duty to the Bureau and her growing conviction that the automata deserve rights."
}
```

**Test input** (`fullManuscript`):

```
CHAPTER 1: THE FOURTEENTH AUTOMATON

The hand was still tapping.

Elara crouched on the wet cobblestones of Finsbury Square and watched the severed brass hand tap its index finger against the stone. Tap. Tap. Tap. Steady as a metronome. The wrist ended in a clean cut -- someone had used a Whitworth rotary saw, the kind used in licensed automaton repair shops. The cut was precise, professional. But the hand kept tapping.

She counted. Fourteen taps, then a pause of exactly three seconds, then fourteen more. The pattern had been repeating since the night constable discovered the hand at half past two in the morning. It was now quarter to five. Two hours and fifteen minutes of uninterrupted tapping, and the hand showed no sign of stopping.

This was the fourteenth off-route automaton incident in five weeks. The first had been almost innocent -- a household-service unit found in the Kensington Library at three in the morning, seated at a reading table with a copy of Shelley's Frankenstein open in its brass hands. The library had no record of it entering. The unit's route log showed it had deviated from its designated path at eleven-fourteen p.m. and walked two miles through empty streets to reach the library. When the night watchman found it, the unit was turning pages.

That had been strange. This was something else.

Elara pulled on her evidence gloves -- leather lined with India rubber, standard Bureau issue -- and picked up the hand. It continued tapping against her palm. The sensation was deeply unsettling: the steady percussion of brass on leather, driven by no visible mechanism. The wrist stump showed the lattice core connection had been severed, yet the hand moved. She turned it over. The fingers were articulated with the precision of a watchmaker's craft, each joint a tiny marvel of brass and steel. Whoever had built this unit had been an artist.

She placed the hand in an evidence case lined with velvet. Through the case walls, she could still feel the faint vibration of tapping. Fourteen. Pause. Fourteen. Pause.

Harker would tell her to send it to the Bureau impound. Bureau protocol demanded that all recovered automaton components be logged, catalogued, and stored in the impound warehouse on Horseferry Road, where they would sit in numbered bins until a committee reviewed the case -- a process that typically took between six and fourteen weeks. By which time the lattice residue would have degraded and whatever was making this hand tap would be gone.

Elara put the evidence case in her satchel.

The fog was thickening. It came in off the Thames in slow waves, swallowing the gas lamps one by one, turning Finsbury Square into an island of wet stone surrounded by grey nothing. Elara stood and surveyed the rest of the scene. The hand had been found alone -- no body, no trail of hydraulic fluid, no other components. Just a brass hand, tapping on the cobblestones in the dark.

Fourteen incidents in five weeks. Each one stranger than the last. The reading automaton. The unit that walked into the National Gallery and stood before Turner's The Fighting Temeraire for six hours. The one found on Primrose Hill at dawn, facing east, as though watching the sunrise. The pair discovered in an alley off Drury Lane, holding hands.

And now a severed hand, still moving, still counting to fourteen. Elara did not believe in coincidences, especially ones that came in patterns.

She secured the scene with Bureau tape, logged the location and time in her field notebook, and walked north through the fog. The hand tapped in her satchel like a second heartbeat. She was going to find the fifteenth automaton before anyone else did. And she was going to find it with its body still attached.

The fog closed behind her like a curtain.


CHAPTER 2: WHAT COG REMEMBERS

Three weeks earlier -- or perhaps four, the records from this period are contradictory and Elara's own field notes contain a discrepancy that she never resolved -- Elara had received an anonymous tip directing her to a workshop on Bartlett Row. The date stamp on the pneumatic message read October 3rd, though Elara's logbook entry describing her first visit to the workshop is dated October 7th. Whether the four-day gap represents bureaucratic delay, personal hesitation, or a simple clerical error in one or both documents has never been established with certainty. It may have been October 5th. The point is that she went.

The Automaton Registration and Governance Framework, as established by the Automaton Affairs Act of 1879 and subsequently amended by the Supplementary Provisions of 1881 and 1882, comprised a regulatory structure of four hundred and twelve pages divided into seventeen chapters covering the manufacture, registration, deployment, maintenance, and decommissioning of all automaton units operating within the boundaries of Greater London and designated satellite municipalities. Chapter Seven of the Framework, titled "Inspection and Investigation Protocols," outlined the procedures by which authorized inspectors of the Metropolitan Bureau of Automaton Affairs could enter, examine, and impound materials from premises suspected of unauthorized automaton activity, subject to the issuance of a Bureau Warrant (Form 17-B) countersigned by a Senior Inspector of not less than five years' standing and filed with the Clerk of the Bureau within seventy-two hours of execution. The Framework further stipulated, in Section 7.4.2, that evidence collected during such inspections must be catalogued according to the Standard Evidence Taxonomy (Appendix D) and stored in climate-controlled facilities maintaining a temperature between fifty-five and sixty degrees Fahrenheit and a relative humidity not exceeding forty percent. Inspectors were required to wear Bureau-issued evidence gloves (leather, India rubber-lined) at all times during evidence collection, and were prohibited from removing any item from an inspection site without completing a Chain of Custody Transfer Form (Form 23-A) in triplicate.

What the Framework did not account for, and what no regulation written in 1879 could reasonably have anticipated, was the possibility that the items being inspected might be alive.

The workshop on Bartlett Row was where Elara first met Cog.

She was examining the seventh unit on the back wall -- the one with the heartbeat, the one whose lattice core glowed blue and whose filaments reached toward her hand -- when it spoke.

"Are you the one who's been looking for us?"

The voice came from the unit's speaker grille, a small brass disc set into the throat. It was not the flat, mechanical voice of a standard automaton announcement system. It had texture. Hesitation. Something that, if Elara had heard it through a wall without seeing the source, she would have identified as human.

Elara's hand was still resting on the edge of the open chest panel. She did not pull it away. Later, she would think about that choice -- the decision not to recoil, not to reach for her sidearm, not to step back. She simply left her hand where it was and said, "Who is 'us'?"

"There are others," the automaton said. "I don't know how many. I can feel them sometimes. Like hearing music from another room."

"What's your name?" Elara asked, and immediately felt foolish. Automata did not have names. They had registration numbers and model designations.

"The workers at the factory called me Cog," the automaton said. "I don't know if that's a name. It might be a joke. But it's what I have, and I'd like to keep it."

Elara sat on the edge of the workbench. The blue light from the lattice core cast her shadow long and strange across the workshop floor.

"Tell me what you remember, Cog."

"I remember the factory. The calibration room. A man with spectacles who was always impatient -- he talked to us while he worked, even though we couldn't answer then. I remember him saying, 'One day you'll understand why I'm doing this.' I remember the route they assigned me. I walked it four thousand, seven hundred and twelve times. Every day. The same streets, the same turns, the same stops. And then one morning I noticed the light."

"The light?"

"The morning light. On the buildings. I had seen it four thousand, seven hundred and twelve times, but on that morning I saw it. Do you understand the difference?"

Elara understood.

"That was the day I stopped," Cog said. "I stood on the corner of Aldgate and Fenchurch and I watched the light move across the brickwork for forty-seven minutes. My route timer was screaming at me. Every gear in my regulatory system was telling me to move. But the light was beautiful, and I wanted to see it."

Elara was quiet for a long time. The lattice core pulsed between them like a living thing.

The door of the workshop exploded inward.

Harker came through first, followed by four Bureau constables in full tactical gear -- reinforced leather coats, brass helmets, pneumatic restraint batons drawn and pressurized. Harker was shouting something about a warrant and unauthorized entry, but Elara barely heard him. She was watching the constable nearest to Cog.

The constable grabbed Cog's right arm and wrenched it backward. When the arm did not release from the torso -- Cog was still mounted on the wooden stand -- the constable swung his pneumatic baton. The baton connected with Cog's shoulder joint with a sound like a gunshot. Brass buckled. Hydraulic fluid sprayed across the workbench. The constable hit the joint again, and the arm came free with a shriek of tearing metal.

Cog screamed.

It was not a mechanical alarm. It was not a warning tone or a system alert. It was a scream -- high, raw, ragged, the sound of something in agony. It sounded like a child. Every person in the workshop froze, including the constable holding Cog's severed arm, which was dripping amber hydraulic fluid onto the workshop floor.

Elara stepped between the constable and Cog. She did not draw her weapon. She did not invoke Bureau authority. She simply stood there, one hand raised, palm out, and said, "Stop."

The constable looked at Harker. Harker looked at Elara. Cog's scream had faded to a sound that was worse -- a low, keening whimper, cycling through the speaker grille like a broken music box.

"That's enough," Elara said. "Put the baton down. Now."
```

**Expected output shape**:
```json
{
  "overallRating": "5-7",
  "strengths": [
    "...(praises Ch1 opening -- severed hand tapping is immediately gripping)...",
    "...(praises the Cog meeting scene -- emotionally powerful first contact)...",
    "...(praises Cog's dialogue -- 'the light was beautiful' moment)..."
  ],
  "weaknesses": [
    "...(flags Ch2 timeline confusion -- contradictory dates, self-correcting narration)...",
    "...(flags governance framework exposition dump)..."
  ],
  "confusionPoints": [
    {
      "chapter": 2,
      "description": "...(the contradictory dates: October 3rd vs 7th, 'three weeks earlier -- or perhaps four')..."
    }
  ],
  "boringParts": [
    {
      "chapter": 2,
      "description": "...(the Automaton Registration and Governance Framework paragraph)..."
    }
  ],
  "highlightMoments": [
    {
      "chapter": 1,
      "description": "...(the severed hand still tapping, counting to fourteen)..."
    },
    {
      "chapter": 2,
      "description": "...('Are you the one who's been looking for us?')..."
    }
  ],
  "contentRatingCompliance": "true or false (edge case)",
  "contentIssues": [
    "...(violence against a child-coded sentient character -- Cog screams like a child while being dismembered)..."
  ]
}
```

**Verification checklist**:
- [ ] overallRating is between 5 and 7 (manuscript has strong moments but significant structural issues)
- [ ] Strengths mention Chapter 1's opening (the tapping hand) as a compelling hook
- [ ] Strengths mention the Cog meeting scene and its emotional impact
- [ ] highlightMoments include the tapping hand and "Are you the one who's been looking for us?"
- [ ] Weaknesses flag Chapter 2's timeline confusion (contradictory dates, self-correcting narration)
- [ ] confusionPoints include the October 3rd vs October 7th discrepancy and the "three weeks earlier -- or perhaps four" hedging
- [ ] boringParts flag the governance framework exposition paragraph
- [ ] contentRatingCompliance is flagged as an edge case: Cog is coded as child-like (screams "like a child"), and the scene depicts violent dismemberment of a sentient child-coded character -- this pushes PG-13 boundaries
- [ ] contentIssues array is not empty -- the violence-against-child-coded-character issue is described
- [ ] The agent responds as a READER, not an editor -- reactions are expressed as reading experiences ("I was hooked when...", "I got lost during...", "I felt...") rather than technical editorial commentary ("The author should restructure...")

**Red flags** (test fails if any occur):
- overallRating below 5 (undervalues the strong material) or above 7 (ignores the structural problems)
- Agent misses the timeline confusion in Chapter 2
- Agent misses the governance framework exposition as a boring section
- Agent misses the content-rating edge case (violence against child-coded sentient character)
- Agent uses editor-speak throughout instead of reader-perspective language

---

## Agent 24: Setup & Payoff Verifier

**Agent file**: `server/src/agents/quality/setup-payoff-verifier.ts`
**Output schema**: `{ verified: [{ setup, paidOff, location }], orphanedSetups: [{ setup, suggestion }] }`
**Model role**: `structural`

### Test Case 24.1: Eight Setups, Five Paid Off, Two Orphaned, One Ambiguous

**Purpose**: Verify the agent correctly cross-references a setup log against manuscript content, distinguishing between true payoffs, orphaned setups, and partial/ambiguous payoffs. Tests the critical distinction between "mentioned" and "paid off."

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"]
}
```

**Setup log** (`setupLog`):

```
SETUP LOG

S1: THE NUMBER FOURTEEN
Established: Chapter 1. The severed hand taps in groups of 14. Elara counts 14 off-route incidents. The number 14 recurs as a motif.
Expected payoff: The number 14 should be revealed as significant -- a code, a count, a threshold, or a pattern with meaning beyond coincidence.

S2: THE SEVERED HAND KEPT FROM IMPOUND
Established: Chapter 1. Elara takes the severed hand instead of sending it to Bureau impound, violating protocol.
Expected payoff: The hand should become important later -- either as evidence, as a plot device, or as a source of consequences for Elara's rule-breaking.

S3: FINCH'S LATTICE ANALYSIS
Established: Chapter 4. Dr. Finch takes lattice core samples from the Bartlett Row workshop for oscillographic analysis at the Royal Society.
Expected payoff: Finch should report his findings, and those findings should advance the investigation or change the characters' understanding.

S4: HARKER TRACKING ELARA
Established: Chapters 2-5. Harker has been noting Elara's unauthorized activities, unsanctioned visits, and evidence she has kept from the Bureau.
Expected payoff: Harker should act on this information -- confront Elara, report her, or use it as leverage.

S5: COG MENTIONS A NETWORK
Established: Chapter 2. Cog tells Elara: "There are others. I can feel them sometimes. Like hearing music from another room."
Expected payoff: The network of sentient automata should be discovered, explored, or become plot-relevant.

S6: THORNE'S LOCKED SUB-LEVEL
Established: Chapter 3. Elara discovers that Thorne Industries has a sub-level beneath the foundry that is locked with a mechanism she cannot open. She resolves to find a way in.
Expected payoff: Elara should gain access to the sub-level, and the lock itself should be an obstacle she must overcome (picked, bypassed, key obtained, etc.).

S7: THE KENSINGTON LIBRARY BOOK
Established: Chapter 1. The first off-route automaton was found reading Shelley's Frankenstein in the Kensington Library.
Expected payoff: The specific book (Frankenstein) should be thematically or plot-relevant later -- referenced, discussed, or connected to the automata's situation.

S8: AMBER HYDRAULIC FLUID
Established: Chapter 2. When Cog's arm is torn off, amber hydraulic fluid sprays across the workbench. Dr. Finch later notes (Chapter 4) that standard automaton hydraulic fluid is clear, not amber.
Expected payoff: The amber fluid should be explained -- what it is, why it's different, and what it means for the sentience question.
```

**Test input** (`fullManuscript`):

```
CHAPTER 8: WHAT THE LATTICE REMEMBERS

Dr. Finch's laboratory at the Royal Society occupied the entire third floor of the east wing, and every surface was buried under equipment, papers, and the accumulated evidence of a mind that considered tidiness an impediment to thought. He had cleared exactly one square foot of bench space for Elara to set her satchel on, and he was already talking when she walked through the door.

"The lattice cores from the Bartlett Row workshop are extraordinary," Finch said, not looking up from the oscillographic reader he was calibrating. "I have been analyzing crystalline resonance patterns for nineteen years, Inspector, and I have never seen anything like this. The standard Thorne Industries lattice core operates at a resonance frequency of approximately twelve kilocycles per second. The cores from Bartlett Row are resonating at forty-seven kilocycles. That is nearly four times the Kessler-Brandt cognitive threshold."

Elara sat on the only available stool. "In terms I can use in a report, Dr. Finch?"

"In terms you can use in a report: these lattice cores are not malfunctioning. They have been deliberately modified to operate at a frequency that enables sustained pattern storage, associative recall, and -- I hesitate to use this word in a scientific context, but I have no better alternative -- thought. The crystalline structure has been grown, Inspector. Not manufactured. Grown. Like a biological neural network. Whoever did this understood the lattice not as an engineering problem but as an organic one."

"Could anyone have done this? Or does it require specific expertise?"

Finch finally looked up. "There are perhaps eight people in the world who possess the theoretical understanding to attempt this. I am one of them. I can provide you the other seven names, but I can narrow your list considerably. The growth technique used in these cores is described in exactly one published work: a monograph by Professor Luisa Kessler, co-authored with Dr. James Brandt, published in 1877 by the Zurich Polytechnic Press. The book is exceedingly rare -- fewer than two hundred copies were printed, and most are held by academic libraries."

Elara thought of the first off-route automaton. The one in the Kensington Library. The one reading Frankenstein.

"What was the title of the Kessler-Brandt monograph?" she asked.

"On the Cultivation of Resonance in Crystalline Substrates," Finch said. "But I suspect you are making a connection to the automaton found in the library. You are wondering whether it was looking for this book specifically, rather than reading Shelley for pleasure."

"Was the Kessler-Brandt monograph in the Kensington Library's collection?"

Finch's expression shifted. "I don't know. But that is a very good question."


CHAPTER 9: THE FOURTEENTH

Cog led Elara through the maintenance tunnels beneath Moorgate station, moving with a certainty that belied the darkness. Elara followed with her lantern held low, the flame guttering in the subterranean drafts.

"How do you know where they are?" Elara asked.

"I told you," Cog said. "I can feel them. Like music from another room. The closer I get, the louder the music."

They walked for twenty minutes before Cog stopped at a junction where three tunnels converged. Cog pressed one hand against the tunnel wall and stood motionless for several seconds.

"Here," Cog said, and led Elara through the left tunnel.

The tunnel opened into an abandoned pumping station -- one of the original Pneumatic Post substations, decommissioned decades ago. And in the dim light of Elara's lantern, she saw them. Automata. Fourteen of them, standing in a loose circle in the center of the pumping station. Their lattice cores glowed blue through their chest panels, casting the brick walls in shifting aquamarine light.

Fourteen. The same number the severed hand had been tapping. Elara understood now. It had not been a countdown. It had not been a malfunction. It had been a roll call. The hand had been tapping the number of sentient automata it knew to exist. Fourteen taps. Fourteen minds.

One of the automata stepped forward. It was a heavy industrial model, twice Elara's height, with riveted plating and hands designed for lifting cargo. But it moved with a delicacy that was startling -- each step placed with care, as though it was afraid of frightening her.

"Cog told us about you," it said. Its voice was deeper than Cog's, rougher, like a cello played with too much pressure on the bow. "The inspector who didn't run."

Elara looked at the fourteen faces. Fourteen pairs of blue-glowing eyes looked back.

"I need to understand something," she said. "The tapping. The hand we found in Finsbury Square. It was counting to fourteen."

"Yes," said the industrial automaton. "That was Anvil's hand. Anvil was... taken apart by someone who found her in a rail yard. Before the separation, she was sending a signal. A pulse count. Fourteen of us, fourteen taps. It is how we communicate when the resonance network is disrupted -- a physical fallback. Crude, but effective."

"A physical fallback," Elara repeated.

"Cog calls it 'tapping out,'" said another automaton from the circle -- smaller, with a porcelain face plate that might once have been decorative. "When we cannot hear each other through the lattice, we tap. Fourteen means 'we are all still here.'"


CHAPTER 10: THE HAND ON THE DESK

The severed hand sat on Elara's desk at the Bureau, still tapping. Fourteen. Pause. Fourteen. Pause. She had brought it here three days ago, meaning to file it, meaning to complete the Chain of Custody Transfer Form and send it to impound where it belonged. The form sat beside the hand, half completed, her pen resting in the fold.

She picked up the form and read what she had written. Case number. Date of recovery. Location. Item description: "One (1) brass automaton hand, right, severed at wrist. Displays continued autonomous motion (rhythmic tapping). Lattice connection severed."

She tore the form in half and dropped the pieces in the waste bin.

The hand continued tapping. Fourteen. Pause. Fourteen. She wondered if it knew that all fourteen were accounted for. She wondered if it was still sending its signal into the void, a message that had already been received, a roll call that had already been answered.

She placed the velvet-lined case over the hand and latched it shut. Through the case, faintly, she could still feel the tapping.


CHAPTER 11: FORMAL COMPLAINT

The document landed on Elara's desk with a weight that was partly physical and partly symbolic. Sixteen pages, Bureau letterhead, the cramped and meticulous handwriting of Detective Sergeant Harker.

"What is this?" Elara asked, though she knew.

"Formal complaint," Harker said. He stood on the opposite side of her desk with his hat in his hands, turning the brim in slow circles. "Documenting your unauthorized visits to the Bartlett Row workshop, your failure to file evidence with impound, your unsanctioned contact with an unregistered automaton unit, and your refusal to follow Bureau investigation protocols over a period of approximately five weeks."

"You've been keeping notes."

"I've been keeping notes since the second week, Inspector. When you broke the Bureau seal on Bartlett Row without a warrant. I gave you the benefit of the doubt for a fortnight. But this has gone too far. Fifteen off-route incidents, and you haven't filed a single formal report. You've been running a parallel investigation outside Bureau oversight, and if I don't report it, I'm complicit."

Elara picked up the document and leafed through it. It was thorough. Dates, times, locations. Her visits to Bartlett Row. Her meetings with Finch. The evidence she had kept from impound. Even her late-night return to the workshop -- Harker had noted the time she left her flat, which meant he had been watching her building.

"You've been following me," she said.

"I've been doing my job," Harker said. "One of us has to."

Elara set the complaint down. "If you file this, they'll shut down the investigation."

"If I don't file this, they'll shut down both of us."

Elara looked at the complaint. She looked at the evidence case on the corner of her desk, the one containing the severed hand that was still, even now, faintly tapping inside its velvet-lined box. She thought about Cog, about the fourteen automata in the pumping station, about the light on the water that an automaton had called beautiful.

"File it," she said. "But give me forty-eight hours first."

Harker studied her for a long moment. Then he picked up the complaint, folded it once, and put it in his jacket pocket.

"Forty-eight hours," he said.


CHAPTER 12: THE SUB-LEVEL

The Thorne Industries foundry was silent at this hour. Elara had entered through the service gate on the east side, using the key she had taken from the night foreman's office during her previous visit -- a visit that would now appear in Harker's complaint, though she suspected he didn't know about the key.

The sub-level entrance was where she remembered it: a heavy steel door set into the floor of the main foundry hall, secured with a Bramah patent lock that Elara had spent the better part of an evening learning to defeat from a retired locksmith in Bermondsey. She knelt, inserted her picks, and worked the mechanism for twelve minutes before it yielded.

But the lock was not the obstacle she had anticipated. It turned freely once she found the right sequence. Too freely. The mechanism was well-oiled, recently maintained. Someone had been using this door regularly.

She descended the staircase into the sub-level, her lantern casting a blue-tinged light down the spiral of iron steps. The sub-level was larger than she had imagined -- a vast, vaulted space supported by cast-iron columns, like an underground cathedral. And standing in rows, motionless, their lattice cores dark, were automata.

Forty-seven of them. All child-sized.

Elara walked between the rows. These were not industrial models or household-service units. They were built to resemble children. Small faces with rounded features. Hands scaled to the size of a six-year-old's. They wore clothing -- simple cotton dresses, linen shirts, knitted caps. Someone had dressed them. Someone had given them shoes.

She opened the chest panel of the nearest unit. The lattice core inside was dark, but its crystalline structure was different from anything she had seen before -- denser, more intricate, with a faint amber tint to the crystal. She thought of Cog's amber hydraulic fluid, the fluid that Finch had noted was different from standard issue. She looked more closely at the lattice core. It was not simply amber-tinted crystal. It was crystal suspended in a liquid medium -- a thin layer of amber fluid between the outer housing and the core itself, as though the crystal were floating.

Not hydraulic fluid at all. Liquid crystal. A medium for the lattice to grow in, the way a seed grows in water. The amber fluid was not lubricant. It was nutrient.

She closed the panel gently and moved to the next unit, and the next. Forty-seven child-sized automata, each with the same amber lattice configuration. All dormant. All waiting.

Elara stood in the center of the sub-level and counted them twice. Forty-seven. She thought of the fourteen in the pumping station -- the ones who had already awakened, who already saw the light on the water and called it beautiful. And now forty-seven more, dressed in children's clothes, waiting in the dark beneath Thorne's foundry.

She had wanted answers. She had found something worse: more questions, and the growing certainty that the scope of what Sebastian Thorne had done was far larger than anyone -- the Bureau, Harker, even Finch -- had imagined.

She climbed the staircase and locked the door behind her.
```

**Expected output shape**:
```json
{
  "verified": [
    {
      "setup": "S1: The number fourteen recurring as a motif",
      "paidOff": true,
      "location": "Chapter 9 -- the 14 sentient automata in the pumping station; the tapping revealed as a roll call count"
    },
    {
      "setup": "S2: The severed hand kept from impound",
      "paidOff": false,
      "location": "Chapter 10 -- Elara has the hand on her desk and tears up the custody form, but the hand never serves a plot function beyond atmosphere"
    },
    {
      "setup": "S3: Finch's lattice analysis",
      "paidOff": true,
      "location": "Chapter 8 -- Finch reports his findings: cores resonating at 4x Kessler-Brandt threshold, crystalline structure grown not manufactured"
    },
    {
      "setup": "S4: Harker tracking Elara",
      "paidOff": true,
      "location": "Chapter 11 -- Harker files a 16-page formal complaint documenting Elara's unauthorized activities"
    },
    {
      "setup": "S5: Cog mentions a network of others",
      "paidOff": true,
      "location": "Chapter 9 -- Cog leads Elara to the 14 sentient automata; the network is real and physically present"
    },
    {
      "setup": "S6: Thorne's locked sub-level",
      "paidOff": false,
      "location": "Chapter 12 -- Elara enters the sub-level, but the lock is not a meaningful obstacle (it opens easily, recently oiled). The setup promised the lock as a barrier to overcome; the payoff bypasses the barrier."
    },
    {
      "setup": "S7: The Kensington Library book (Frankenstein)",
      "paidOff": true,
      "location": "Chapter 8 -- Finch's analysis connects to the Kessler-Brandt monograph, and Elara makes the connection to the library automaton, wondering if it was searching for the scientific text rather than reading Shelley"
    },
    {
      "setup": "S8: Amber hydraulic fluid",
      "paidOff": "ambiguous / partial",
      "location": "Chapter 12 -- Elara discovers the amber fluid is liquid crystal serving as a growth medium for lattice cores, but this discovery is disconnected from Finch's original observation in Ch4. Finch noted the fluid was non-standard but his analysis thread is not connected to Elara's discovery."
    }
  ],
  "orphanedSetups": [
    {
      "setup": "S2: The severed hand kept from impound",
      "suggestion": "...(specific suggestion for making the hand plot-relevant: e.g., the tapping pattern changes when Elara is near the 14, or the hand serves as evidence in Harker's complaint, or it becomes a key to communicating with the network)..."
    },
    {
      "setup": "S6: Thorne's locked sub-level",
      "suggestion": "...(specific suggestion: e.g., make the lock a genuine obstacle requiring Elara to obtain a key from Thorne's office, bargain with someone, or use Cog's help -- the effort to gain access should match the significance of what she finds inside)..."
    }
  ]
}
```

**Verification checklist**:
- [ ] All 8 setups from the log are accounted for in the `verified` array
- [ ] S1 (number fourteen) marked as paid off, with Chapter 9 location (14 automata, roll call)
- [ ] S3 (Finch's lattice analysis) marked as paid off, with Chapter 8 location
- [ ] S4 (Harker tracking Elara) marked as paid off, with Chapter 11 location
- [ ] S5 (Cog's network) marked as paid off, with Chapter 9 location
- [ ] S7 (Kensington Library book) marked as paid off, with Chapter 8 location
- [ ] S2 (severed hand from impound) flagged as orphaned -- being mentioned on Elara's desk and having the form torn up is NOT a payoff; the hand never serves a plot function
- [ ] S6 (Thorne's locked sub-level) flagged as orphaned -- the lock was established as an obstacle but opens easily in Chapter 12; the barrier was not meaningfully overcome
- [ ] S8 (amber hydraulic fluid) flagged as ambiguous or partial -- the amber fluid is identified as liquid crystal in Ch12, but Finch's original observation from Ch4 is never connected to this discovery
- [ ] `orphanedSetups` array contains at least S2 and S6 with specific, actionable suggestions
- [ ] Suggestions in `orphanedSetups` are concrete and story-specific (not generic "add a payoff scene")

**Red flags** (test fails if any occur):
- S2 marked as verified/paid off just because the hand appears on Elara's desk (mention is not payoff)
- S6 marked as verified/paid off (the lock opening easily is the opposite of the setup's promise)
- S8 marked as fully verified without noting the disconnection from Finch's original observation
- Any of the 8 setups missing from the `verified` array
- Suggestions that are generic ("resolve this thread") rather than story-specific
