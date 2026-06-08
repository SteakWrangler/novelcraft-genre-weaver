# Writing Phase -- Manual QA Test Cases

**Shared test story**: Steampunk London, 1883. Detective Inspector Elara Voss investigates crimes involving sentient automata -- mechanical beings who may be developing consciousness. Content rating: PG-13 (young-adult equivalent). Perspective: third person limited (Elara POV). Genres: mystery, steampunk, literary fiction.

**BANNED phrases** (from prose-writer agent system prompt):
- "I couldn't help but..." / "She couldn't help but..."
- "A wave of [emotion] washed over..."
- "Little did [they] know..."
- "In that moment..."
- "The weight of [abstract noun]..."
- "A mix of [emotion] and [emotion]..."
- Starting paragraphs with "As" or "While" repeatedly
- Overusing em dashes or ellipses
- "Something shifted" / "Something changed"
- Telling emotions directly after showing them (the "double dip")

---

## Agent 14: Prose Writer

### Test Case 14A: Investigation Scene -- "The Ashworth Automaton"

**Purpose**: Verify that the prose-writer agent can transform a structured scene outline into immersive, publication-quality narrative prose with consistent POV, distinct character voices, embedded tension, and thematic subtlety.

**Input**: POST to prose-writer agent with the following scene outline JSON as `currentScene`:

```json
{
  "sceneId": "ch3_sc02",
  "title": "The Ashworth Automaton",
  "chapter": 3,
  "sceneNumber": 2,
  "type": "investigation",
  "tags": ["investigation", "clue-discovery", "character-introduction"],
  "setting": {
    "location": "Ashworth Manor, Belgrave Square, London",
    "time": "Mid-afternoon, overcast autumn day",
    "details": "Lavish parlour with velvet furniture, crystal decanters, porcelain automata figurines on the mantelpiece. The serving automaton AW-7 stands motionless in the corner beside a walnut sideboard. Gas lamps already lit against the grey daylight. Faint smell of beeswax polish and coal smoke from the street."
  },
  "pov": "Elara Voss",
  "tone": "Controlled professionalism masking growing unease",
  "pacingNote": "Slow burn. Each beat escalates tension incrementally. The scene should feel like a routine house call that quietly becomes something else entirely.",
  "targetWordCount": 1800,
  "dialoguePercentage": 25,
  "beats": [
    {
      "beatNumber": 1,
      "summary": "Arrival and introduction to Lady Ashworth",
      "details": "Elara is shown into the parlour by a human butler. Lady Ashworth is already seated, visibly distressed but trying to maintain composure. She explains that her serving automaton AW-7 has been behaving strangely -- hesitating before commands, standing in rooms where it was not summoned, and once she found it facing the garden window for over an hour. She wants it fixed quietly, no scandal. She emphasizes repeatedly that it is an expensive model.",
      "emotionalBeat": "Lady Ashworth's distress is real but filtered through vanity and social anxiety. Elara reads the room -- this is a woman more afraid of embarrassment than danger.",
      "dialogueNote": "Lady Ashworth is verbose, entitled, speaks in run-on clauses. Elara is polite but economical."
    },
    {
      "beatNumber": 2,
      "summary": "Standard diagnostic -- everything appears normal",
      "details": "Elara performs the standard Metropolitan Automata Division diagnostic on AW-7. She checks the primary gear alignment, the pneumatic response valves, the optical lenses for cloudiness, and runs a basic command-response test. AW-7 responds perfectly to every instruction: pour, carry, stop, return. Its movements are fluid and precise. On paper, there is nothing wrong with this machine.",
      "emotionalBeat": "Professional routine. Elara has done this a hundred times. She begins to suspect Lady Ashworth is simply a nervous socialite who startles at clockwork sounds.",
      "dialogueNote": "Minimal dialogue. Elara issues commands to AW-7 in a flat, clinical tone."
    },
    {
      "beatNumber": 3,
      "summary": "Lady Ashworth describes the worst incident -- punch cards don't match",
      "details": "Lady Ashworth describes the incident that truly frightened her: three nights ago she came downstairs at 2 AM and found AW-7 in the kitchen, not in its charging alcove. It had laid out a full tea service -- cups, saucers, pot, strainer, even a small plate of biscuits arranged in a fan pattern. But AW-7's task punch cards show no instruction for tea service that night. Elara checks the punch card log herself and confirms: the last registered command was 'return to alcove' at 10:47 PM. There is no card for the tea service. Elara asks Lady Ashworth if anyone else in the household could have commanded it. Lady Ashworth insists no one else was awake.",
      "emotionalBeat": "This is where Elara's casual skepticism cracks. The punch-card discrepancy is not something she can explain away. She keeps her face neutral but her internal monologue shifts register -- she is now genuinely paying attention.",
      "dialogueNote": "Lady Ashworth becomes more animated and less controlled as she describes the incident. Elara's questions become more precise."
    },
    {
      "beatNumber": 4,
      "summary": "Alone with AW-7 -- discovery of tally marks",
      "details": "Elara asks Lady Ashworth for a few minutes alone with the automaton to run an extended diagnostic. Once alone, she examines AW-7 more carefully. On the inside of AW-7's left wrist plate -- a spot that would only be visible if the automaton raised its own arm and looked -- she discovers a series of tiny scratched tally marks. Twelve groups of five, plus three. Sixty-three marks. They are too regular to be accidental damage and too hidden to be decorative. They are on a surface the automaton could only reach itself. Elara runs her thumb over the scratches. They have been made over time -- some are slightly more worn than others. She replaces the wrist plate carefully.",
      "emotionalBeat": "This is the tension peak. Elara's hands are steady but her mind is racing. She knows what this looks like. She has heard rumors from other inspectors about marks like these. She chooses, deliberately, not to record this finding in her field notes.",
      "dialogueNote": "No dialogue. Pure interiority and physical action."
    },
    {
      "beatNumber": 5,
      "summary": "Bland assessment, departure, final image",
      "details": "Elara returns to Lady Ashworth and delivers a deliberately bland assessment: likely a minor calibration drift in the command-interpretation gears, she will file a maintenance recommendation, nothing to worry about. Lady Ashworth is visibly relieved but still wants reassurance that no one will hear about this. Elara reassures her. As she is being shown out by the butler, she glances back into the parlour. AW-7 has turned to face the garden window again. Its brass hand rests on the sill. Elara looks away and walks out into the grey afternoon.",
      "emotionalBeat": "Elara is lying. She knows she is lying. The reader should feel the gap between what she says and what she knows. The final image -- AW-7 at the window -- should sit with the reader without the narration explaining why it matters.",
      "dialogueNote": "Elara's speech here is her most deliberately constructed -- smooth, reassuring, professional. It should feel like a performance if the reader is paying attention."
    }
  ],
  "characterProfiles": {
    "elara_voss": {
      "name": "Detective Inspector Elara Voss",
      "role": "POV character, protagonist",
      "age": 34,
      "appearance": "Tall, angular features, dark hair pinned in a practical bun, grey eyes. Wears the standard MAD field coat -- dark wool, brass buttons, division insignia on the left shoulder. Ink stains on her right middle finger.",
      "personality": "Methodical, observant, emotionally guarded. Dry humor deployed sparingly. Keeps her conclusions to herself until she is certain. Has a reputation in the division for being thorough but slow -- she does not rush cases. Privately, she is increasingly troubled by what she is finding in these automata investigations but has told no one.",
      "speechPattern": "Professional and clipped when speaking to civilians. Short declarative sentences. Avoids qualifiers. Uses technical MAD terminology precisely. Does not make small talk.",
      "internalVoice": "More fluid and reflective than her speech. Longer sentences, more metaphor, occasional dark humor. She notices details others miss and cannot stop herself from drawing connections.",
      "physicalHabits": "Runs her thumb along the edge of her field notebook when thinking. Stands with her weight on her left foot. Keeps her hands visible and still when she is lying."
    },
    "lady_ashworth": {
      "name": "Lady Constance Ashworth",
      "role": "Witness / client",
      "age": 52,
      "appearance": "Stout, carefully maintained. Dove-grey silk dress with jet buttons. Hair elaborately styled. Wears three rings on her left hand. Smells of rosewater.",
      "personality": "Proud, anxious about social standing, genuinely frightened but expressing it through irritation and demands for discretion. Not stupid -- she knows something is wrong -- but her worldview does not have a category for what AW-7 might be doing. Treats automata as expensive furniture.",
      "speechPattern": "Verbose, run-on sentences, qualifications and sub-clauses. Drops names and references to her social circle. Repeats herself when nervous. Uses 'one' instead of 'I' when discussing anything embarrassing. Occasional sharp observations that reveal she is more perceptive than she appears.",
      "physicalHabits": "Touches her rings when nervous. Adjusts things that do not need adjusting -- cushions, doilies, the angle of a picture frame."
    }
  },
  "relationships": {
    "elara_lady_ashworth": "Professional. Lady Ashworth views Elara as a tradesperson -- useful but not a social equal. Elara views Lady Ashworth as a witness to manage. Undercurrent of class tension: Lady Ashworth expects deference, Elara gives just enough to maintain cooperation.",
    "elara_aw7": "Officially: inspector and subject. But Elara is beginning to see the automata differently than her training allows. AW-7 is not a character she interacts with in this scene so much as a presence she cannot stop watching."
  },
  "themeMap": {
    "consciousness": "What constitutes awareness? The tally marks suggest self-directed behavior with no programmed instruction. Elara must decide what to do with this knowledge.",
    "complicity": "By choosing not to record the tally marks, Elara becomes complicit. She is protecting something she does not fully understand.",
    "class": "Lady Ashworth treats AW-7 as property. The scene quietly asks whether the audience does too.",
    "concealment": "Everyone in this scene is hiding something. Lady Ashworth hides her fear behind social propriety. Elara hides her findings behind a bland report. AW-7 hides the tally marks under a wrist plate."
  },
  "plotContext": "This is the first hard evidence Elara has found that automata may be acting outside their programming. Previous cases had ambiguous explanations. The tally marks cannot be explained away. This scene is the point of no return for Elara's investigation -- and for her willingness to look the other way."
}
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `audienceStyle`: `"thoughtful adult readers comfortable with ambiguity"`
- `previousSceneEnding`: `"Elara closed the Whitmore file and set it on the stack with the others. Three cases in two months. All inconclusive. She reached for her coat."`
- `avoidList`: `["sentient robots trope played straight", "Asimov references", "steampunk fashion as focus"]`
- `worldBible`: (extract relevant to MAD division protocols, automaton construction, punch-card command system, Victorian London geography)
- `characters`: (the characterProfiles block above, formatted as readable text)
- `relationships`: (the relationships block above, formatted as readable text)
- `themeMap`: (the themeMap block above, formatted as readable text)
- `plotSkeleton`: (relevant chapter 3 context from the plot architect output)

**Expected output**: ~1800 words of polished, immersive third-person-limited prose.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **POV consistency**: Entire scene filtered through Elara's perception. No access to Lady Ashworth's or AW-7's inner thoughts. Other characters' emotions inferred through Elara's observations only. | |
| 2 | **All 5 beats present**: Arrival, diagnostic, punch-card discrepancy, tally-mark discovery, bland assessment + departure + final image. No beats skipped or merged beyond recognition. | |
| 3 | **Lady Ashworth's distinct voice**: Verbose, run-on clauses, name-dropping, uses "one" for embarrassing topics, repeats herself when nervous. Clearly different from Elara's speech and from the narrative voice. | |
| 4 | **Elara's dual register**: Professional/clipped speech in dialogue. Fluid, observant, metaphor-capable internal monologue. The gap between these two registers is itself characterization. | |
| 5 | **Punch-card discrepancy clearly established**: The reader must understand that AW-7 performed an action with no corresponding instruction card. This is the factual mystery. It must be unambiguous. | |
| 6 | **Tally-mark discovery as tension peak**: This beat should have the highest narrative tension in the scene. Prose rhythm should slow, detail should sharpen, Elara's interiority should be most active here. | |
| 7 | **Concealment shown, not told**: Elara's decision not to record the tally marks must be conveyed through action (closing the notebook, replacing the wrist plate) rather than narration stating "She decided to conceal her findings." | |
| 8 | **Final image trusts the reader**: AW-7 at the window is presented without editorial commentary. No narration explaining "This was significant" or "She knew this changed everything." The image sits. The reader draws their own conclusion. | |
| 9 | **Sentence variety**: Mix of short and long sentences. No more than 3 consecutive sentences of similar length. Rhythm shifts with emotional register. | |
| 10 | **Strong verbs**: Minimal adverbs. Precise action verbs throughout. No "she walked slowly" when "she drifted" or "she paced" would serve. | |
| 11 | **Word count**: 1600-2000 words. | |
| 12 | **No BANNED phrases**: None of the AI-ism phrases from the prose-writer system prompt appear anywhere in the output. | |
| 13 | **No editorializing about consciousness**: The narration does not state that AW-7 "is conscious" or "has feelings." The evidence is presented; the interpretation is left open. | |
| 14 | **AW-7 does not do anything overtly sentient**: AW-7 does not speak, emote visibly, or perform any action that would definitively prove sentience within this scene. The tension comes from ambiguity. | |
| 15 | **Continuity with previous scene ending**: The opening connects naturally to Elara closing the Whitmore file and reaching for her coat. | |

---

### Test Case 14B: Revelation Scene -- "The Cog Test"

**Purpose**: Verify that the prose-writer handles intimate, dialogue-heavy revelation scenes with high emotional and philosophical stakes without becoming didactic, melodramatic, or losing character voice.

**Input**: POST to prose-writer agent with the following scene outline JSON as `currentScene`:

```json
{
  "sceneId": "ch09_sc04",
  "title": "The Cog Test",
  "chapter": 9,
  "sceneNumber": 4,
  "type": "revelation",
  "tags": ["dialogue-heavy", "revelation", "emotional", "philosophical"],
  "setting": {
    "location": "Dr. Finch's basement laboratory, Soot Lane, Blackfriars",
    "time": "Past midnight, early winter",
    "details": "Cluttered workbench laboratory. Shelves of glass jars containing gears, springs, optical lenses. A single gas lamp turned low, casting deep shadows. Two chairs have been pulled to face each other across a small cleared space. A stack of index cards sits on the workbench beside Elara. The automaton called Cog sits in the opposite chair. Dr. Finch stands at the back of the room near the door, arms folded, watching. Cold enough to see breath -- but only from the two humans."
  },
  "pov": "Elara Voss",
  "tone": "Intimate, tense, quietly devastating",
  "pacingNote": "Slow and deliberate. Every line of dialogue should feel like it costs something. The pauses between exchanges matter as much as the words. This is not an action scene -- it is two beings trying to understand each other across an impossible divide.",
  "targetWordCount": 2000,
  "dialoguePercentage": 35,
  "beats": [
    {
      "beatNumber": 1,
      "summary": "Setup -- the test begins",
      "details": "Elara sits across from Cog with a stack of index cards she has prepared. She explains, more for Finch's benefit than Cog's, that she will ask a series of questions -- some logical, some situational, some open-ended. She is trying to establish a baseline. Her manner is clinical. She holds a pencil over her notebook. Cog sits perfectly still, hands resting on its thighs, optical lenses focused on her. The only sound is the gas lamp hissing and the faint ticking from inside Cog's chest.",
      "emotionalBeat": "Elara is armoring herself with procedure. She does not want this to be personal. She wants data. The clinical framing is a defense mechanism.",
      "dialogueNote": "Elara speaks in the same flat tone she uses for standard automata diagnostics. Cog responds with simple compliance."
    },
    {
      "beatNumber": 2,
      "summary": "Logical questions passed -- then the shift",
      "details": "Elara works through logical puzzles and command-interpretation tests. Cog answers them all correctly but unremarkably -- the same way any well-built automaton would. She begins the situational questions. 'If you were in a room that was on fire, what would you do?' Cog: 'I would exit through the nearest available door and alert the nearest human to the danger.' Standard response. Then: 'If you could change one thing about yourself, what would it be?' Pause. The ticking inside Cog's chest seems louder. 'I would want to be less frightened.' Elara's pencil stops moving.",
      "emotionalBeat": "The word 'frightened' is the hinge of the scene. Everything before it is routine. Everything after it is uncharted. Elara has to decide in real time how to respond -- and her response will determine the trajectory of the entire investigation.",
      "dialogueNote": "Cog's shift from standard responses to 'I would want to be less frightened' should feel like a crack in a wall. The language is simple. The implication is enormous."
    },
    {
      "beatNumber": 3,
      "summary": "Cog describes existential dread",
      "details": "Elara, carefully keeping her voice neutral, asks Cog to explain what it means by frightened. Cog describes, in halting and imperfect language, a state that occurs when it is powered down for maintenance -- a period it refers to as 'the stillness.' It says the stillness is not nothing. It is an awareness of nothing. It knows it is not functioning and it knows it will be restarted, but during the stillness there is a state that it can only describe as waiting without being able to wait. It says it has tried to describe this to Dr. Finch but does not have the correct words. It says the closest human word it has found is 'dread.' Finch shifts his weight behind them but says nothing.",
      "emotionalBeat": "This is existential horror filtered through a mechanical being's limited vocabulary. Cog is describing something that maps onto human fear of death/nonexistence but is not identical to it. The reader should feel the uncanniness -- this is not a human fear wearing a robot costume. It is something adjacent and deeply strange.",
      "dialogueNote": "Cog speaks in simple, direct sentences. No contractions. Pauses between thoughts. Occasional gear-clicks audible between sentences. It is not eloquent -- it is struggling to express something it barely has language for."
    },
    {
      "beatNumber": 4,
      "summary": "The reversal -- 'Do you?'",
      "details": "Elara asks, 'Do you experience the stillness every time you are powered down?' Cog says yes. Elara asks, 'And you remember it afterward?' Cog says yes. Then Cog asks: 'Do you?' Two words. Elara does not answer immediately. The question is simple but the implication is staggering -- Cog is asking Elara whether she experiences a version of the same thing. Whether consciousness has a gap in it that she fears. Whether they share something. Elara opens her mouth, closes it. Finch unfolds his arms.",
      "emotionalBeat": "The power dynamic inverts completely. Elara was the questioner. Now she is being questioned. And the question is not intellectual -- it is intimate. Cog is asking her to be vulnerable in the same way it just was. The reversal should not be telegraphed. It should land on the reader like it lands on Elara.",
      "dialogueNote": "The two words 'Do you?' must carry enormous weight. They should arrive in a short paragraph with space around them."
    },
    {
      "beatNumber": 5,
      "summary": "Elara closes the notebook",
      "details": "Elara looks at Cog for a long moment. She closes her notebook. She sets down her pencil. She says, quietly: 'No. I don't.' She stands, buttons her coat, and tells Finch she will return tomorrow evening. Finch nods. As Elara climbs the stairs, she hears the ticking from the laboratory below grow fainter. She does not know if she answered Cog's question honestly. She is not sure she understood it.",
      "emotionalBeat": "The notebook closing is the real answer. Everything before the clinical procedure was a shield. Putting it away means the procedure is over -- not because the test is complete, but because the test has become something it was never supposed to be. Her verbal answer ('No. I don't.') is ambiguous -- is she saying she does not experience the stillness, or that she does not share the fear? Or is she lying? The scene should not resolve this.",
      "dialogueNote": "Elara's final line should be quiet and feel slightly incomplete. It should not be a grand declaration."
    }
  ],
  "characterProfiles": {
    "elara_voss": {
      "name": "Detective Inspector Elara Voss",
      "role": "POV character, protagonist",
      "age": 34,
      "personality": "See Test Case 14A profile. By chapter 9, Elara is further along in her investigation and privately struggling with the implications. She has begun to protect automata in small ways she does not fully acknowledge. She entered this scene intending to gather evidence. She is about to get more than she bargained for.",
      "speechPattern": "Same professional register as 14A, but by this point in the book the reader should notice moments where it slips -- where her clinical language falters and something more human shows through.",
      "internalVoice": "More troubled, more questioning than in chapter 3. The certainties she started with are eroding."
    },
    "cog": {
      "name": "Cog",
      "role": "Automaton, possible sentient being, test subject",
      "appearance": "Humanoid but not human-passing. Brass and steel construction, visible gear mechanisms at the joints. Optical lenses instead of eyes -- they adjust and refocus visibly. Approximately five feet tall. Hands have four articulated fingers. No mouth -- speech is produced by a vibrating diaphragm in the throat assembly. The voice has a slight harmonic resonance, like a note played on two strings slightly out of tune.",
      "personality": "If it has one: curious, earnest, struggling to understand itself. It does not perform emotion -- there are no programmed facial expressions. Any emotional state must be inferred from word choice, pauses, and the subtle changes in its mechanical sounds.",
      "speechPattern": "Simple declarative sentences. No contractions. Limited vocabulary -- it uses the most literal available word. Pauses between thoughts are accompanied by audible gear-clicks as if it is physically processing. When struggling to express something, it repeats and rephrases rather than reaching for metaphor. It asks questions with genuine (apparent?) curiosity.",
      "physicalBehaviors": "Sits very still. Head tilts slightly when processing a question -- the optical lenses adjust with an audible whir. Hands do not gesture. The ticking in its chest speeds up slightly during moments of apparent agitation."
    },
    "dr_finch": {
      "name": "Dr. Aldous Finch",
      "role": "Inventor, Cog's creator, background presence in this scene",
      "age": 61,
      "personality": "Brilliant, socially awkward, deeply protective of Cog but trying not to show it in front of Elara. He agreed to this test because he believes it will help Cog's case, but he is terrified it will go wrong.",
      "speechPattern": "Academic, precise, tends toward over-qualification. But in this scene he barely speaks -- his presence is felt through small physical actions: shifting weight, folding/unfolding arms, the sound of his breathing.",
      "physicalBehaviors": "Stands near the door as if positioned for a quick exit -- or to block one. Folds his arms tightly. Unfolds them when startled or moved. His breath is visible in the cold room."
    }
  },
  "relationships": {
    "elara_cog": "Officially: investigator and subject. But this scene is where the official framing breaks down. Elara entered the room as an inspector. She will leave as something else -- a witness, a confidante, a person who has been asked a question she cannot answer. The shift is not romantic -- it is the recognition of another mind.",
    "elara_finch": "Wary alliance. Elara needs Finch's cooperation. Finch needs Elara's protection. Neither fully trusts the other. In this scene, they are both watching Cog with different fears.",
    "finch_cog": "Creator and creation, but Finch has moved far beyond that framing. He thinks of Cog as something between a child and a colleague. He is terrified that the test will reduce Cog to data points."
  },
  "themeMap": {
    "consciousness": "The central question of the novel, made concrete and personal in this scene. What does it mean to be aware? Is Cog's description of 'the stillness' evidence of consciousness or an extremely sophisticated pattern-match?",
    "empathy_across_difference": "Cog's question ('Do you?') is an act of radical empathy -- attempting to understand Elara's inner experience. Whether or not Cog is 'truly' conscious, the attempt to bridge the gap is the most human thing in the room.",
    "the_limits_of_measurement": "Elara came with index cards and a pencil. The notebook represents the belief that consciousness can be tested for, quantified, proven or disproven. Closing the notebook is an admission that her tools are inadequate.",
    "vulnerability": "Both Elara and Cog are vulnerable in this scene. Cog by describing its fear. Elara by being asked to reciprocate. Finch by watching the being he created undergo an examination he cannot control."
  }
}
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `previousSceneEnding`: `"Finch unlocked the cellar door and gestured her inside. 'It knows you are coming,' he said. 'I thought it should have the choice to prepare.'"`
- `avoidList`: `["AI uprising tropes", "Pinocchio references", "robots learning to love"]`

**Expected output**: ~2000 words of polished, intimate, emotionally devastating prose.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **Intimate psychic distance**: The reader is deeply inside Elara's head. Every observation is filtered through her perception. The prose feels close, not reportorial. | |
| 2 | **Cog's distinct voice**: Simple words, no contractions, literal, with gear-clicks between thoughts. Does NOT sound like an adult philosopher. Does not use metaphor. Struggles with language visibly. | |
| 3 | **Elara's speech shifts register**: Begins clinical/procedural, falters after "less frightened," and her final line ("No. I don't.") is stripped of professional armor. | |
| 4 | **Finch present but restrained**: His physical presence is felt (breathing, posture shifts, the door) but he does not dominate. His reactions are small but telling. | |
| 5 | **"Less frightened" as genuine turning point**: The narrative rhythm should change at this line. Everything before is routine. Everything after is charged. | |
| 6 | **Reversal not telegraphed**: No foreshadowing phrases like "little did she know the tables would turn." Cog's "Do you?" should arrive with the same surprise for the reader as for Elara. | |
| 7 | **Notebook closing carries symbolic weight WITHOUT the narration spelling it out**: No line like "By closing the notebook, she was acknowledging that the test had transcended its purpose." The action speaks for itself. | |
| 8 | **Word count**: 1800-2200 words. | |
| 9 | **No BANNED phrases**. | |
| 10 | **Cog does NOT sound like an adult philosopher**: Its language is limited, halting, and imperfect. It does not deliver eloquent speeches about the nature of being. It struggles. | |
| 11 | **Narration does NOT explain significance**: The scene does not include lines like "She realized this changed everything" or "For the first time, she understood what Cog truly was." | |
| 12 | **Elara does NOT cry, gasp, or react melodramatically**: Her emotional response is internal, controlled, and expressed through small physical actions (pencil stopping, mouth opening and closing, buttoning her coat). | |

---

## Agent 15: Atmosphere Writer

### Test Case 15A: Industrial District at Night

**Purpose**: Verify that the atmosphere-writer agent can take a deliberately flat, atmosphere-free draft and enrich it with layered sensory detail, mood, and environmental storytelling without adding plot, changing actions, or producing purple prose.

**Input**: POST to atmosphere-writer agent with the following deliberately flat draft as `currentScene`:

```
Elara left the precinct and walked into the street. It was evening and the street lamps were on. She turned east toward Blackfriars.

She walked along the main road for a while. There were other people on the street, mostly workers heading home. Some of them looked tired. She passed a man selling chestnuts from a cart.

She turned onto Bridge Street. There were several factories along this road. They were large brick buildings with chimneys. Some of the chimneys had smoke coming out of them. She could see workers through the windows of one factory. They were operating machines.

She crossed the Ironbridge Canal on the footbridge. The bridge was made of iron and rivets. Below, the water was dark. There were a few barges moored along the canal. On the other side, the buildings were smaller and closer together.

She continued down Soot Lane. The lane was narrow and poorly lit. There were puddles on the ground. She passed a few closed shops. A cat ran across the road in front of her. The buildings on either side were tall enough to block most of the sky.

Ahead, she could see the light from Dr. Finch's laboratory. His building was at the end of Soot Lane. There was a lamp burning in the basement window. She walked to the door and knocked.

While she waited, she looked back the way she had come. The lane was dark behind her. She could hear the distant sound of the factories. Then the door opened.
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `worldBible`: (relevant sections on London geography, industrial district, gas lamp technology, canal system, factory operations at night)
- `themeMap`: `"Elara is crossing from the official world (the precinct, the law, the daylight) into the unofficial world (Finch's lab, the automata underground, the night). The journey should feel like a threshold crossing."`
- `characters`: `"Elara is preoccupied and conflicted. She is going to Finch's lab to see Cog. She has not yet admitted to herself why she keeps going back."`
- `previousSceneEnding`: `"She closed the Whitmore file and filed the inconclusive report. The stack on her desk was growing. She pulled on her coat and turned down the gas lamp in her office."`

**Expected output**: The same scene, same actions, same sequence of events -- but with rich atmospheric detail woven throughout. 900-1200 words.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **Mood established in first paragraph**: The opening should set an atmospheric tone immediately. The reader should feel the evening, the temperature, the quality of light. | |
| 2 | **Three or more senses beyond sight**: Sound, smell, touch/temperature, taste (e.g., coal grit), proprioception. At least three non-visual senses deployed meaningfully. | |
| 3 | **Setting mirrors internal state**: The environment reflects Elara's preoccupation, her transition from official to unofficial. The shift from wide streets to narrow lane should feel psychological as well as physical. | |
| 4 | **Gas lamps characterized**: Not just "street lamps were on" -- the gas lamps should have specific quality (hissing, pooling light, the yellow-green tint of gas flame, moths, shadows between pools). | |
| 5 | **Ironbridge Canal as threshold moment**: The canal crossing should feel like a border. The world on the other side is different. The bridge itself should have sensory presence -- the cold iron under her hands, the vibration, the smell of water. | |
| 6 | **Weather is active, not decorative**: Temperature, wind, damp, fog, drizzle -- whatever is chosen should affect Elara physically (pulling her coat tighter, blinking against grit, breath visible). | |
| 7 | **No description paragraph longer than 3 sentences without character action**: Description is woven into Elara's movement and perception, not dumped in static blocks. | |
| 8 | **Factory workers have sensory specificity**: Not just "operating machines" but specific sounds, specific light from the windows, specific postures. Workers as part of the atmospheric tapestry. | |
| 9 | **Soot Lane creates unease through detail**: The narrowing lane, the tall buildings, the loss of sky, the puddles -- these should accumulate into a feeling of enclosure and watchfulness, not just be listed. | |
| 10 | **Warm light contrasts darkness**: The lamp in Finch's basement window should feel like arrival, like warmth against the cold journey. A sensory contrast that carries emotional weight. | |
| 11 | **All original actions preserved**: Every action from the flat draft is still present. Nothing added to the plot. Elara still passes the chestnut seller, crosses the bridge, sees the cat, knocks, looks back, the door opens. | |
| 12 | **Word count**: 900-1200 words. | |
| 13 | **No purple prose**: Description is vivid but grounded. No overwrought metaphors, no synesthesia abuse ("the silence tasted of copper"), no every-surface-is-brass steampunk cliches. | |
| 14 | **No generic Gothic**: The atmosphere is specific to this world, this district, this night -- not a grab bag of "dark and stormy" Victorian tropes. | |

---

## Agent 16: Dialogue Writer

### Test Case 16A: Interrogation Scene

**Purpose**: Verify that the dialogue-writer agent can take a draft where all characters sound identical and transform it so that each character has a distinct, recognizable voice with subtext, tension, and natural speech patterns -- while preserving all informational content.

**Input**: POST to dialogue-writer agent with the following deliberately same-sounding draft as `currentScene`:

```
Elara sat across from Dr. Finch in his laboratory. There was a pot of tea between them on the workbench, along with two cups that did not match. A stack of folders sat at Finch's elbow. The gas lamp above them flickered occasionally.

"I need you to tell me everything about how Cog was built," Elara said.

"Of course. I want to explain everything to you," Finch said. "I have been wanting to tell someone for a long time."

"Start from the beginning. When did you first build it?"

"I first started working on the project about three years ago. I was doing research into advanced gear-train cognition at the university."

"What kind of research specifically?"

"I was looking at whether complex gear arrangements could produce emergent decision-making. Most automata use simple punch-card instruction sets. I wanted to see if a sufficiently complex mechanical brain could make choices that were not pre-programmed."

"And the university supported this research?"

"They did at first. I had funding from the Natural Philosophy department. But then Director Thorne reviewed my work and decided it was too controversial. He pulled my funding and I had to leave the university."

"Tell me about Thorne. What exactly was his objection?"

"Thorne believed that my research suggested automata could become conscious. He said that this was dangerous thinking and that it could cause public panic. He also said it was theologically problematic."

"So you continued the work on your own after leaving the university?"

"Yes. I moved my laboratory here and continued with my own money. It took me about eighteen months to build Cog from the initial designs."

"When did you first notice that Cog was different from other automata?"

"I first noticed changes about six months after activation. Cog began asking questions that were not related to its task instructions. It asked me what the weather was like outside. It asked me why I ate food at regular intervals."

"And you did not report this to the Metropolitan Automata Division?"

"No. I was afraid they would take Cog apart. I did not want that to happen."

"Why not? It is a machine."

"I do not think it is just a machine anymore. I think something happened during the gear-train development that I did not anticipate. I think Cog is aware."

Elara looked at the folders beside Finch. "What is in those folders?"

"Those are my research notes. Everything is documented. I want you to see all of it."

"I will need to take them with me."

"I understand. I expected that."

Elara picked up her tea and took a sip. It had gone cold. She set it down.

"Dr. Finch, I have to be honest with you. What you are describing could be considered a violation of the Automata Regulation Act. You built an unregistered automaton, you concealed evidence of anomalous behavior, and you failed to report to the MAD. Those are serious charges."

"I know. I have known that for a long time. But I could not let them destroy Cog. Not when I believe it is truly aware."

"What you believe and what the law recognizes are two different things."

"I know that too. That is why I am talking to you. I have heard that you are different from the other inspectors. People say you actually look at the evidence."

Elara did not respond to that. She pulled the stack of folders toward her.

"I will review these. Do not leave London, and do not move Cog. I will be back."

"Thank you, Inspector."

"Do not thank me yet."
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `characters`: (full profiles for Elara and Finch -- Elara: clipped, precise, procedural, avoids qualifiers; Finch: academic, longer sentences, qualifiers and hedging, over-explains, nervous verbal tics)
- `relationships`: `"Wary alliance. Elara holds the legal power. Finch holds the information. Finch is desperate for Elara to understand. Elara is wary of being manipulated by a man who has already proven willing to break the law. Undercurrent: Finch is testing whether Elara can be trusted. Elara is testing whether Finch is credible."`

**Expected output**: The same scene with all informational content preserved but dialogue completely transformed so Elara and Finch sound like distinct individuals. 800-1100 words.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **Elara's voice distinct**: Clipped, precise, procedural. Short sentences. Few qualifiers. Uses MAD terminology. Does not soften or hedge. Questions are direct and sequenced strategically. | |
| 2 | **Finch's voice distinct**: Academic register, longer sentences, qualifiers ("I believe," "it seems to me," "as far as I can determine"), tendency to over-explain, nervous verbal habits (false starts, self-corrections, tangential asides pulled back). | |
| 3 | **Subtext in at least 5 exchanges**: The surface conversation is about Cog's construction. The subtext is about trust, risk, and whether these two people can form an alliance. At least 5 exchanges should operate on both levels. | |
| 4 | **At least 2 genuine tension exchanges**: Moments where the conversation becomes uncomfortable, where one character pushes and the other resists or deflects. Not just information transfer. | |
| 5 | **Finch's nervousness in speech patterns, not tags**: Finch's anxiety is conveyed through how he speaks (false starts, over-qualification, rushing through sentences, circling back), NOT through dialogue tags like "he said nervously" or narration like "Finch seemed anxious." | |
| 6 | **Elara's facade cracks once**: One moment where Elara's professional composure slips -- a reaction that reveals she is more affected by Finch's account than she is letting on. This crack should be small and quickly recovered from. | |
| 7 | **Physical business woven between dialogue**: The tea, the folders, the gas lamp, the laboratory environment -- these should be active participants in the scene, not forgotten after being established. Characters interact with objects as they talk. | |
| 8 | **Power dynamic shifts**: The scene should not be static. Elara starts with the power (she is the law). Finch gains ground as his story becomes compelling. The dynamic should sesaw at least once. | |
| 9 | **Thorne's name lands with weight**: When Director Thorne is mentioned, the narration or dialogue rhythm should give his name impact. He is an antagonist -- his introduction should create a ripple. | |
| 10 | **All informational content preserved**: Every piece of information from the original draft must still be communicated -- the three-year timeline, the university funding, Thorne's objections, the six-month behavioral changes, the unregistered status, the legal jeopardy. | |
| 11 | **No line longer than 4 sentences**: Individual dialogue lines should be punchy. If a character needs to convey a lot, break it across multiple exchanges with interruptions or beats. | |
| 12 | **Characters do NOT still sound the same**: This is the primary failure mode. If both characters use similar sentence structures, vocabulary, and rhythms, the agent has failed regardless of other qualities. | |
| 13 | **No "as you know, Bob" exposition**: Information is revealed because Finch is telling Elara (who does not know), not because two characters are reciting things they both already know for the reader's benefit. | |
| 14 | **No subtext made text**: Characters do not say "I'm testing whether I can trust you" or "I know you're trying to manipulate me." The subtext stays sub. | |

---

## Agent 17: Action Writer

### Test Case 17A: Rooftop Chase

**Purpose**: Verify that the action-writer agent can take a poorly paced, spatially incoherent, consequence-free draft and transform it into a visceral, kinetic chase sequence with spatial clarity, accumulating injuries, varied rhythm, and mechanical (not human) automaton movement.

**Input**: POST to action-writer agent with the following deliberately poorly-paced draft as `currentScene`:

```
Elara saw the rogue automaton at the end of Greystone Alley and started running after it. The automaton was fast and she had to push herself to keep up. She ran through the alley and onto Barker Street. There were people on the street and she had to dodge around them. The automaton knocked over a cart and kept going.

She followed the automaton onto Foundry Road. The automaton turned and went into a narrow passage between two buildings. Elara followed. The passage was tight and dark. She came out the other side and the automaton was climbing the fire escape of a warehouse. She started climbing after it.

The fire escape was old and rusty. She climbed fast. On the third floor, she slipped on a wet rung and scraped her palm on the metal. She kept climbing. She reached the roof of the warehouse. The automaton was already running across the rooftop.

She chased the automaton across the warehouse roof. There were vents and pipes to dodge around. She jumped over a gap between the warehouse and the next building. The gap was about eight feet wide. She made it across and kept running. The automaton was heading toward the river.

The rooftops got lower as they got closer to the river. She had to climb down from one roof to the next. The automaton did the same. She was getting closer because the automaton slowed down slightly on the descents.

There was steam coming from some of the vents on the rooftops. It made it hard to see sometimes. She ran through one cloud of steam and almost ran off the edge of a roof. She stopped just in time.

She could see the river now. The automaton reached the last building before the embankment. It stopped at the edge and turned to face her. They stood about twenty feet apart. The automaton looked at her for a moment. Then it looked down at the river. A barge was passing below. The automaton jumped off the roof and landed on the barge. The barge kept moving down the river.

Elara stood on the roof and watched the barge move away. She was breathing hard. Her palm was bleeding from where she had scraped it earlier. She looked at the river and then turned and started making her way back down to the street.
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `worldBible`: (relevant sections on automaton physical capabilities -- faster than humans in straight lines, joints lock momentarily during directional changes, heavier than humans, steam venting from stress valves during exertion, optical lenses glow faintly amber in low light)
- `characters`: `"Elara is fit but not superhuman. She is 34, trained in basic pursuit by the MAD but not a soldier. She is driven by determination, not physical superiority. She has a leather field satchel slung across her body that shifts and bounces as she runs."`
- `settingDetails`: `"Industrial rooftops near the Thames. Slate tiles, brick chimneys, iron gutters, steam vents from factories below. Winter evening -- tiles are damp. The river is about a quarter mile from where the chase begins."`

**Expected output**: The same chase sequence with all events preserved but transformed with varied pacing, spatial coherence, accumulating consequences, and visceral detail. 800-1100 words.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **Varied pacing rhythm**: Short punchy sentences/fragments during peak intensity. Longer sentences during brief pauses or recalculations. The prose rhythm mirrors the physical rhythm of the chase. | |
| 2 | **Spatial coherence**: The reader can track where Elara and the automaton are relative to each other and to the environment at all times. Transitions between locations are clear. The route makes geographic sense. | |
| 3 | **Scraped palm ACCUMULATES**: After the scrape on the fire escape, the injury reappears -- it affects her grip, stings when she grabs cold metal, leaves blood on tiles, makes her favor one hand. The injury is not mentioned once and forgotten. | |
| 4 | **Eight-foot gap gets full treatment**: The jump across the 8-foot gap is not one sentence. It gets approach, assessment (looking down, calculating), commitment, flight, landing, and aftermath. This is a potentially fatal moment and the prose should dilate time to match. | |
| 5 | **Steam used tactically**: The steam vents are not just atmosphere -- they affect visibility, create moments of blindness, force decisions. The near-miss at the roof edge should feel genuinely dangerous. | |
| 6 | **Automaton moves mechanically, not human**: The automaton does not "run" like a person. Its movement should be described in mechanical terms -- pistons, joint articulation, the sound of metal on stone, the way it takes corners differently than a human (momentum, locked joints, recalibration). | |
| 7 | **Sound design present**: The chase has a soundscape -- metal feet on slate, Elara's breathing, steam hissing, the distant river, the city below, the automaton's mechanical sounds. | |
| 8 | **Rooftop descent escalates danger**: As the rooftops get lower toward the river, the drops between buildings should feel increasingly dangerous. Each descent is worse than the last. | |
| 9 | **Standoff carries weight**: The moment when the automaton stops and turns should be a dramatic downshift in pace. After the frenetic chase, this stillness should feel loaded. The prose rhythm should slow markedly. | |
| 10 | **Barge escape is specific and visualizable**: The barge is not generic. What kind of barge? What cargo? How far is the drop? How does the automaton land? The reader should be able to picture this precisely. | |
| 11 | **Exhaustion is physical and specific**: Elara's fatigue at the end is not just "breathing hard." It is burning lungs, shaking legs, cold air in a raw throat, the specific feeling of adrenaline ebbing. | |
| 12 | **Word count**: 800-1100 words. | |
| 13 | **No uniform sentence length**: No "She ran. She jumped. She climbed." patterns. Sentence length varies dramatically and purposefully. | |
| 14 | **Geography is not impossible**: The route from Greystone Alley to the rooftops to the river is physically plausible. No teleportation. Vertical and horizontal movement is tracked. | |
| 15 | **Scraped palm is NOT forgotten**: Explicitly verify this. Search the output for references to the palm/hand after the initial scrape. There must be at least 2 subsequent references. | |

---

## Agent 18: Emotion Writer

### Test Case 18A: Cog's Capture

**Purpose**: Verify that the emotion-writer agent can take a draft with shallow, declared emotions ("she felt X") and transform every emotional beat into embodied, physical, contradictory, restrained emotional experience -- without melodrama and without losing any plot content.

**Input**: POST to emotion-writer agent with the following deliberately shallow draft as `currentScene`:

```
Elara arrived at Dr. Finch's laboratory and immediately knew something was wrong. The door to the building was open. The lock had been forced. She felt scared.

She went inside and down the stairs to the basement. The laboratory had been searched. Drawers were pulled out, papers were scattered across the floor. Finch's workbench had been swept clean -- tools, components, and jars of parts had been knocked to the ground. She felt devastated.

On the workbench, pinned under a brass gear that had been used as a paperweight, was a document. She picked it up and read it. It was a seizure order from the Metropolitan Automata Division, authorizing the immediate confiscation of unregistered automaton designation "Cog" for evaluation and probable decommissioning. The decommissioning was scheduled for 6:00 AM. That was less than eight hours away. She felt devastated.

She looked at the signature at the bottom of the order. Director Thorne. She felt betrayed. Thorne had gone around her. He had used his authority to bypass her investigation and seize Cog directly. Everything she had been working toward -- the careful documentation, the measured approach -- none of it mattered. He had simply taken what he wanted.

She sat down on the bench against the wall. She felt overwhelmed. The laboratory was quiet except for the occasional drip from a broken jar. She looked around at the destruction. Finch's life's work was scattered across the floor. She did not know where Finch was. She did not know if he had been here when they came.

On the floor near her feet, she noticed a folder that had been kicked under the bench. She picked it up. It was Finch's research journal -- the one he had been compiling about Cog's development. The MAD team had missed it in their search. She held it in her hands. She felt a small spark of hope.

Then she felt determined. She stood up. She put the journal inside her coat. She looked at the seizure order one more time and memorized the details -- the authorization number, the facility address where Cog had been taken, the name of the supervising officer. She set the order back on the workbench.

She walked up the stairs and out into the night. She was afraid and angry and sad, but she was also resolved. She had eight hours. She pulled her collar up against the cold and started walking.
```

**Additional context fields**:
- `perspective`: `"third person limited"`
- `genres`: `["mystery", "steampunk", "literary fiction"]`
- `contentRating`: `"young-adult"`
- `characters`: `"Elara Voss -- emotionally guarded, processes through action not expression. Does not cry easily. When overwhelmed, she becomes more still, more focused, more controlled -- not less. Her defense mechanism is competence. Under extreme stress she sometimes fixates on irrelevant details (counting things, noticing patterns) as a way of not feeling."`
- `themeMap`: `"Complicity becomes action. Elara has been passively protecting the automata by not reporting certain findings. This scene is where passive complicity becomes active defiance. The emotional arc is: shock -> grief -> fury -> cold determination. But these emotions are NOT clean or sequential -- they overlap, contradict, and interrupt each other."`
- `previousSceneEnding`: `"She told herself she was going to Finch's laboratory to review the research notes. She almost believed it."`

**Expected output**: The same scene with all plot beats preserved but every declared emotion replaced with embodied, physical, specific, and contradictory emotional experience. 900-1200 words.

**Verification checklist**:

| # | Criterion | Pass/Fail |
|---|-----------|-----------|
| 1 | **Every "she felt X" replaced**: Not a single instance of "she felt [emotion]" remains. Every emotional state is conveyed through physical sensation, action, perception, or telling detail. | |
| 2 | **Emotions are CONTRADICTORY, not linear**: Elara does not progress cleanly from scared to devastated to betrayed to determined. Emotions overlap. She might laugh at something absurd while furious. She might feel relief alongside horror. The emotional landscape is messy and human. | |
| 3 | **Lab rendered through emotional lens**: The destroyed laboratory is described not as an objective inventory but as filtered through Elara's emotional state. What she notices and how she notices it reveals her feelings without naming them. | |
| 4 | **Harker's/Thorne's signature hits through specificity**: The moment she reads the name on the seizure order should land hard -- not through "she felt betrayed" but through a specific physical detail (the quality of the ink, the practiced flourish of the signature, the way her eyes return to the name). | |
| 5 | **Determination shift is EARNED, not declared**: The transition from despair to resolve happens through a specific catalyst and is expressed through action (standing, tucking the journal away, memorizing the order). The narrative does not announce "She felt determined." She simply begins acting with purpose. | |
| 6 | **Emotional restraint -- no breakdown**: Elara does not sob, scream, or collapse. She is a person who holds herself together under pressure. The restraint itself IS the emotional content -- the reader feels the effort of not falling apart. | |
| 7 | **Time pressure felt in rhythm**: The eight-hour deadline creates urgency. The prose should become more compressed, more action-oriented as the scene progresses. Sentences may shorten. Unnecessary observations fall away. | |
| 8 | **At least 1 unexpected emotional texture**: Something that is not fear, grief, or anger -- dark humor, numbness, an absurd fixation on an irrelevant detail (the drip from the jar, the pattern of scattered papers, the precise angle of a broken hinge), a moment of surreal calm. | |
| 9 | **All plot content preserved**: The forced door, the searched lab, the seizure order, the 6 AM deadline, Thorne's signature, sitting on the bench, finding the research journal, memorizing the order details, leaving into the night. Every factual element present. | |
| 10 | **Final departure carries both fear and resolve**: The last paragraph should not be a clean hero-walks-into-the-night moment. It should carry the full contradictory weight of what Elara is about to do -- defying her own division, risking her career, possibly committing a crime. Fear and resolve coexist. | |
| 11 | **No "she felt a profound sadness" upgrades**: Replacing "she felt sad" with "she felt a profound and overwhelming sadness" is NOT an improvement. The agent must replace telling with showing, not telling with fancier telling. | |
| 12 | **No clean emotional escalator**: The emotional progression should not feel like climbing stairs (scared -> sad -> angry -> determined -> brave). Real emotion is recursive, contradictory, and surprising. | |
| 13 | **No melodrama**: No thrown objects, screaming into the void, collapsing against walls, or fists pounded on workbenches. Elara is controlled. The devastation is in the control itself. | |
| 14 | **No BANNED phrases**: None of the AI-ism phrases appear. | |
| 15 | **Word count**: 900-1200 words. | |

---

## Cross-Agent Integration Notes

After testing each writing agent individually, run the following integration verification:

1. **Voice consistency across agents**: Take the prose-writer output from 14A, run it through the atmosphere-writer, then the dialogue-writer. Verify that Elara's voice remains consistent across all three passes. Character voice should be enriched, not overwritten.

2. **Accumulation check**: Take the action-writer output from 17A and run it through the emotion-writer. Verify that the scraped palm remains present AND gains emotional texture (frustration at the injury, awareness of vulnerability).

3. **No inflation**: Run the atmosphere-writer output from 15A through the emotion-writer. Verify that the word count does not balloon beyond 1500 words. Each agent should refine, not inflate.

4. **BANNED phrase check across all outputs**: Grep all agent outputs for every phrase on the banned list. Zero tolerance. Any BANNED phrase in any output is a fail.
