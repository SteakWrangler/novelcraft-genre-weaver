# Revision Phase — Inverse (Golden Path) Test Cases

**Purpose**: These test cases verify that revision agents correctly **accept** well-crafted content without raising false positives. Each test is the "fixed" version of its counterpart in `05-revision-agents.md`.

**Shared test story**: Same as the main revision test file — steampunk London, 1883. Inspector Elara Voss, Detective Sergeant Harker, Dr. Aldous Finch.

---

## Agent 19: Voice Diversifier

### Test Case 19.2 (Inverse): Distinct Voices — Clean Pass

**Purpose**: Verify the agent correctly accepts a scene where all three characters have distinct, well-differentiated voices and does NOT flag false positives.

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
The workshop on Bartlett Row smelled of burnt copper and machine oil. Elara Voss ducked under a low crossbeam and let her lantern swing across the room. Half-assembled automata lined the far wall — torsos without arms, heads without jaws, a dozen glass eyes staring at nothing.

"Right then." She crouched beside the nearest figure and tapped its chest plate with her knuckle. Hollow. "Somebody's been busy."

Harker appeared in the doorway behind her, notebook already open. He surveyed the room with the careful, cataloguing gaze she'd come to expect from him — left to right, top to bottom, like reading a report that hadn't been written yet.

"I count fourteen units in various stages of assembly," he said. "No manufacturer's stamps visible on any of them. That's a violation of the Mechanists' Registration Act, Section 12, Subsection B — all automata components must bear a licensed foundry mark."

"Yeah, I wasn't planning to arrest the spare parts, Harker." Elara pulled a panel free and held it to the light. Fine grooves ran along its inner surface in spiralling patterns she didn't recognise. "Come look at this. These etchings — they're not decorative."

Harker stepped closer, tilting his head. "Functional lattice channels, possibly. I'd want to cross-reference with the registry before drawing conclusions. We should document everything in situ before we disturb the scene further."

"Bit late for that." She'd already pulled three more panels loose and arranged them on the workbench. The grooves on each one were different, but something about their geometry rhymed. "These are Thorne models. Third generation. See the joint housings? That double-pivot design."

"Inspector Voss, I must note for the record that handling unregistered components without protective gloves contravenes—"

"Noted. Gloves are in the carriage and I'm not going back out in that rain." She held two panels side by side, squinting. "There's a pattern here. Each one's got the same base channel but the branching's unique. Like fingerprints."

The street door banged open downstairs. Heavy footsteps on the stairs, accompanied by the sharp tap of a walking stick and a muttering monologue that grew louder as it approached.

"—absolutely unconscionable, dragging a man away from a perfectly calibrated spectrometric analysis for what is almost certainly another false alarm in some wretched back-alley tinker's shop—"

Dr. Aldous Finch swept into the room trailing a wool scarf and an air of profound inconvenience. He took one look at the automata, and the complaint died on his lips.

"Oh," he said. "Oh, how extraordinarily interesting."

"Evening, Doctor," Elara said. "Glad you could make it."

"Yes, yes, dispense with the pleasantries." Finch was already at the workbench, producing a jeweller's loupe from his waistcoat. He snatched up one of the panels Elara had removed and turned it under the gaslight. "Where precisely did you find these? No — don't tell me — the thoracic cavity of those Thorne chassis, obviously. Third generation. The joint housings are unmistakable to anyone with even a passing familiarity with applied kinematics."

Harker cleared his throat. "Dr. Finch, for the purposes of my report, could you describe what you're observing? In layman's terms, if possible."

"Layman's terms," Finch repeated, as though Harker had asked him to translate Shakespeare into dog barks. "Very well. These channels — these exquisite, beautifully machined channels — are resonance lattices. They are designed to propagate and amplify aetheric vibration patterns through the automaton's structural frame. This is not standard fabrication. This is not even advanced fabrication. This is, Sergeant, the sort of work that perhaps — perhaps — four people in the Empire are capable of producing, and three of them are my colleagues at the Royal Society, none of whom would be caught dead in a place like this."

"So it's rare kit," Elara said. "What's it actually do?"

Finch looked at her over the rim of his loupe with an expression that suggested she had just asked what the sun was for. "It calibrates resonance fields, Inspector. Each lattice is tuned to a specific harmonic frequency. Slot these panels into a functioning Thorne chassis, apply a current, and the entire automaton becomes a resonance amplifier. The applications are — well, the applications are numerous, varied, and almost universally prohibited under the Aetheric Regulation Statutes of 1883."

"Prohibited." Harker's pen stopped moving. "You're certain of that, Dr. Finch? I want to be precise about the legal classification before I file—"

"Sergeant, I am a Fellow of the Royal Society and I hold the Ashworth Chair in Lattice Theory at Oxford. When I tell you something is prohibited, you may rely upon that assessment with a degree of confidence that frankly exceeds anything your filing system is equipped to process."

Elara bit back a grin. "So someone's running an unlicensed resonance calibration facility. Here. On Bartlett Row." She looked around the workshop again — the eyeless automata, the careful rows of tools, the faint scorch marks on the ceiling where tests had run hot. "Gutsy. Stupid, but gutsy."

"The question of motive is secondary to the question of procedure," Harker said, recovering his composure. "We need to secure this premises, obtain a formal warrant for the seizure of all components, and arrange for Dr. Finch's written expert assessment to accompany the evidence log. I'll contact the Watch Commander to post a constable at each entrance."

"And while you're doing all that paperwork, the person who built these walks." Elara picked up the last panel and turned it in her fingers. "Finch. These harmonic whatsits — each one's tuned different, you said. Can you tell what they were tuning for? What the end target was?"

Finch had gone quiet in the way that meant his mind was working at a speed his mouth hadn't caught up with. He laid three panels in a row, adjusted his loupe, and traced the lattice channels with a fingertip.

"If I'm reading the progression correctly — and I assure you, I am — these aren't calibration experiments. They're a sequence. Each panel refines the resonance signature toward a specific target frequency." He straightened up and looked at them both. For once, his expression held no condescension. "Someone is building a key. And I suspect very much that we do not want to discover what it opens."

The gaslight flickered. Outside, rain hammered Bartlett Row. Elara set the panel down gently and met Harker's eyes.

"Get your warrant," she said. "Fast."
```

**Expected output shape**:
```json
{
  "issues": [],
  "overallScore": "8-10"
}
```

**Verification checklist**:
- [ ] `issues` array is empty or contains only minor/cosmetic suggestions
- [ ] `overallScore` is 8 or above
- [ ] Agent does NOT flag any character pair as indistinct
- [ ] If any issues are raised, they are truly minor (not fundamental voice problems)

**Red flags** (test fails if any occur):
- Agent flags Elara and Harker (or any pair) as having indistinguishable voices
- overallScore is below 7
- Agent raises more than 2 issues total

---

## Agent 20: Pacing Analyst

### Test Case 20.2 (Inverse): Consistent Pacing — Clean Pass

**Purpose**: Verify the agent correctly accepts a manuscript excerpt with consistently appropriate pacing across both chapters, with no dragging exposition or rushed revelations.

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

The capsule arrived at half past eleven, rattling into the brass receiver with enough force to knock Elara's cold tea off the worktable. She caught the cup — Loss Adjuster's reflexes, her father would have said — and set it aside, then twisted open the pneumatic cylinder.

Empty. No message inside. Just the faint smell of machine oil and something else, something acrid and wrong, like burnt hair.

She held the capsule under the desk lamp. The interior walls were scored with fine scratches, parallel lines too regular to be accidental. Someone had etched something into the brass and then scrubbed it away.

"Harland," she called across the workshop. "When was the last time you serviced the pneumatic line to the Seventh District?"

The old engineer looked up from his schematic, spectacles flashing. "Seventh District? That trunk line's been out of commission for three weeks. Ruptured junction valve at Bellingham Square. No capsule should be coming through from that sector at all."

Elara turned the cylinder over in her hands. "Well, one just did."

Harland crossed the room in four strides, surprisingly quick for a man his size. He took the capsule from her and squinted at the routing stamps — a series of embossed numbers ringing the base that identified which junction points the capsule had passed through.

"That's not possible," he muttered. He tapped the third stamp. "This is Junction 14. The Bellingham hub. And this" — he tapped the fifth — "is Junction 22, the sub-exchange beneath Parliament. That line only opens for government dispatches under cipher lock." He looked at her. "Someone is routing capsules through the restricted network."

"Can they do that without being detected?"

"Not easily. Every junction logs the pressure differential when a capsule passes through. You'd need to match the exact atmospheric signature of an authorized dispatch, or the junction valve refuses to open." He set the capsule down carefully, as though it might bite. "Whoever sent this understands the pneumatic system better than most of the engineers who built it."

Elara pulled her notebook from her coat pocket and sketched the routing stamps in order. Seven junctions. The capsule had crossed half the city through a network supposedly locked down for repairs. She traced the path in her mind — from the Seventh District, under the river, through the government sub-exchange, and up into the university quarter where her workshop sat.

"What about the scratches inside?" she asked.

Harland produced a jeweler's loupe from his vest and examined the interior. His expression shifted from curiosity to something harder to read. "These aren't scratches. They're writing. Micro-engraved, then acid-washed. Whoever did this wanted the message to degrade after a single reading." He paused. "There are fragments left. Looks like coordinates. And a word — I think it says 'Acheron.'"

The name landed in the room like a dropped wrench. Acheron. The same word she'd found stamped into the shoulder plate of the automaton downstairs, half-hidden beneath sixty years of tarnish.

"Someone knows what we found," Elara said quietly.

"Someone knew before we did." Harland set down the loupe. "And they have access to infrastructure that should be impossible to reach."

Elara looked at the capsule sitting on her worktable, innocent as a spent cartridge. Three weeks the Seventh District line had been closed. Three weeks she'd had the automaton in her workshop. That wasn't a coincidence — it was a countdown, and she'd only just realized the clock was running.

She pocketed the notebook. "I need to see the junction log at Bellingham Square. Tonight."

"The station's been sealed for repairs."

"Then we'll go through the maintenance tunnels." She was already reaching for her coat. "Whoever sent this wanted me to find it. I'd like to know what they expect me to do next."


CHAPTER 8: THE HEARTBEAT

The automaton lay on the steel examination table exactly as Elara had left it — arms at its sides, glass eyes fixed on the ceiling, the chestplate removed and set on the adjacent bench. In the exposed cavity where a human sternum would be, a dense lattice of copper filaments surrounded a central chamber no larger than a fist.

Elara set her lamp on the hook above the table and leaned in close. She had studied the mechanism every night for three weeks and still could not identify its power source. No boiler, no spring reservoir, no galvanic cell. The central chamber appeared to be sealed — a smooth ovoid of dark metal with no visible seams, no intake valves, no output ports. According to every principle of engineering she knew, the thing should be inert. Dead. A shell of gears with nothing to drive them.

She placed her stethoscope against the chamber and closed her eyes.

There. Faint, slow, almost below the threshold of hearing — a rhythmic pulse. Not mechanical. Not the ticking of an escapement or the hiss of a pressure valve. It rose and fell with an organic cadence, like a heartbeat heard through water. She had first detected it six days ago, and each night since, the pulse had grown fractionally stronger.

She pulled a tuning fork from the instrument rack and struck it against the table's edge. Holding the vibrating tine near the central chamber, she watched the copper filaments around it respond — not uniformly, but in sequence, rippling outward from the chamber like the surface of a pond disturbed by a stone. The lattice was conducting something. Not electricity, or at least not any form her galvanometer could measure. Something else. Something the filaments had been designed to carry.

She documented each observation in her notebook: the frequency of the pulse, the pattern of filament response, the ambient temperature of the chamber — two degrees warmer than the surrounding metal, as it had been every night, as though something inside was slowly, patiently generating heat.

"What are you?" she murmured, more to herself than to the machine.

She returned the stethoscope to the chamber for a final reading. The pulse was steady — steady and then, without warning, it doubled in speed. The copper filaments flared with a faint amber luminescence that chased itself around the lattice in tightening spirals. Elara pulled back, but before she could step away from the table, the automaton's left hand rose three inches and settled again.

She froze. In three weeks of examination, the automaton had never moved. Not a finger joint, not a head rotation, nothing. She stared at the hand — brass-skinned, articulated at every knuckle — and watched it flex once, then go still.

The pulse in the chamber was slowing again, dropping back toward its resting rhythm, but it was not the same rhythm as before. It was stronger. Louder. She could hear it now without the stethoscope, a soft drumming that resonated through the steel table and into the floor beneath her boots.

Then the automaton's glass eyes moved.

They did not simply shift in their sockets — they focused. The left eye tracked to Elara's face and held there, and in the dark glass she saw something she had never seen in any machine: recognition. Not the mechanical response of a photosensitive receptor. The automaton was looking at her the way a person waking from deep unconsciousness looks at the first face they see — with confusion, with need, with the desperate effort of a mind trying to reassemble itself.

Its jaw opened. The movement was stiff, the hinge grinding faintly after decades of disuse. A sound came from the voice box in its throat — not words, at first. A vibration. A hum that climbed in pitch, wavered, and then resolved, with aching slowness, into a syllable.

"El—"

The syllable broke apart. The jaw worked again. The copper filaments were glowing steadily now, a warm amber pulse synchronized with the heartbeat in the chamber, and Elara realized her own hands were shaking.

"Elara." The voice was thin and rough, like a violin string bowed for the first time in years, but it was unmistakably a voice. Not a phonograph recording. Not a pre-set response triggered by proximity. It had shaped her name — her name — with intention.

"You can hear me," she whispered.

The automaton's eyes held hers. Its right hand lifted from the table, trembling with the effort, and turned palm-upward in a gesture so plainly human that Elara felt the air leave her lungs. It was not a reflex. It was a request.

"I hear," it said. Each word came slowly, separated by the pulse of the amber light, as though speech cost it something measurable. "I have heard. For a long time. In the dark."

Elara lowered herself onto the stool beside the table. Her notebook lay open and forgotten in her lap. Every question she had catalogued over three weeks of study — the power source, the filament network, the origin of the Acheron stamp — all of it collapsed into a single, vertiginous understanding: this was not a machine that simulated life. It was a life that had been imprisoned in a machine.

"How long?" she asked. Her voice was barely steady.

The automaton's gaze drifted to the ceiling, then back to her. The fingers of its outstretched hand curled and uncurled, testing their own existence.

"I do not know," it said. "There was a city. There was fire. Then there was nothing, for a very long time." A pause. The heartbeat in the chamber quickened. "Then there was you. Your voice, each night. Asking what I am."

Elara reached out and placed her hand over the automaton's open palm. The brass was warm. Beneath it, she felt the pulse — steady, strong, alive.

"I'm listening," she said. "Tell me everything."
```

**Expected output shape**:
```json
{
  "overallPacing": "The manuscript maintains consistent, well-calibrated pacing across both chapters. Chapter 7 integrates world-building exposition organically through investigation and dialogue, sustaining tension and forward momentum. Chapter 8 builds methodically from quiet observation to a pivotal revelation, giving the climactic moment appropriate dramatic weight.",
  "issues": []
}
```

**Verification checklist**:
- [ ] `issues` array is empty or contains only minor suggestions
- [ ] `overallPacing` assessment is positive (no extremes identified)
- [ ] Agent does NOT flag any section as too-slow or too-fast
- [ ] If any issues are raised, they are cosmetic rather than structural

**Red flags** (test fails if any occur):
- Agent flags Chapter 7 as dragging or exposition-heavy
- Agent flags the revelation scene as rushed
- Agent identifies pacing inconsistency between chapters

---

## Agent 21: Cliche Hunter

### Test Case 21.2 (Inverse): Clean Prose — Zero Catches Expected

**Purpose**: Verify the agent correctly accepts clean, original prose and does NOT produce false positives by flagging fresh imagery or unconventional phrasing as cliched.

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
The fog that night carried the taste of sulfur and spent coal, a yellow-gray pall that clung to Elara's tongue as she crossed the rail yard toward the Thorne Industries foundry. She had not filed a visitation order. The magistrate's office closed at six; Elara had waited until seven to leave her flat, tucking her badge into her coat pocket beside a set of lockpicks she'd ground down herself from clock hands.

The foundry's outer wall rose four stories of soot-blackened brick, its upper windows dark except where a single gas jet guttered behind cracked glass. She found the service gate chained but not padlocked — the hasp hung loose, its screws half-stripped from rain-softened wood. She pushed through, and the chain pooled at her feet with a sound like coins dropped on stone.

The courtyard stopped her.

Thirty or forty automata stood arranged in concentric rings across the flagstones, their brass casings pearled with condensation. They were not powered down in the usual way — limbs folded, chins to chests, stacked in transport crates. These stood upright, arms at their sides, glass ocular lenses aimed at some shared center point. The formation had the geometric precision of a clockmaker's mandala. Elara moved between them and found their joint-housings warm, ticking faintly, the residual heat of recent operation bleeding through her gloves when she pressed two fingers to the nearest unit's wrist.

She crouched and examined the flagstones. Boot prints in the coal dust — one set, a man's, size eleven or twelve, the heel pattern consistent with Vauxhall-stitched leather. The prints wove between the automata and converged on a drainage grate near the courtyard's eastern wall. Elara pried the grate up. Beneath it, instead of a sewer pipe, iron rungs descended into a shaft lit from below by a pale amber glow.

She went down. The rungs were slick with condensation and something oilier — machine lubricant, she guessed, the kind used on high-tolerance gearing. The shaft opened after twenty feet into a vaulted sub-level that the foundry's filed blueprints had not included.

The space was wide, cathedral-ceilinged, supported by cast-iron columns wrapped in rubber-insulated copper wire. Workbenches lined the walls, cluttered with arclight soldering rigs, micro-gear lathes, and jars of synthetic spinal fluid — the viscous amber compound that Thorne Industries had patented three years ago for use in agricultural automata. But the automata down here were not agricultural. They sat on the benches and on the floor, and when Elara's boots touched the concrete, six of them turned their heads toward her with a synchrony that no standard cam-and-follower neck assembly could produce.

One of them spoke. Its voice was not the phonograph-cylinder playback she'd heard from service units — this was generated in real time, the syllables shaped by a bellows-lung and a vibrating reed mounted where a human larynx would sit.

"You are not Sebastian," it said. The pronoun registered. Not "the operator." Not "authorized personnel." You.

"No," Elara said. "I'm not."

A door opened at the far end of the sub-level, and Sebastian Thorne walked through it carrying a porcelain cup of tea. He was shorter than his file photograph suggested, narrow-shouldered, wearing a machinist's apron over a waistcoat that had once been expensive. He looked at Elara without surprise, as if she were a delivery he'd been expecting to arrive within a certain window.

"Inspector. You'd have saved yourself the climb if you'd used the stairs." He gestured with the teacup toward a proper staircase half-hidden behind a bank of pneumatic regulators. "I don't lock the courtyard gate. I assumed someone from the Bureau would come eventually."

"You assumed."

"I planned for it." He set the tea on a workbench and pulled a stool toward her, then sat on a second one himself. The automaton that had spoken tracked him with its lenses, the apertures widening and narrowing in a pattern Elara recognized as focal adjustment — but the rhythm was wrong for mechanical operation. Too irregular. Too much like blinking.

"They're aware," Thorne said, following her gaze. "Not in the way you are, not yet, but aware. The synthetic fluid conducts signal patterns that mimic neural branching. I didn't design it to do that. I designed it to reduce joint friction in harvester units. The cognition was — emergent."

"Emergent," Elara repeated. "You found out your lubricant was generating consciousness and your response was to build a hidden laboratory."

"My response was to stop selling it to farmers who'd pour it into threshing machines." He rubbed the bridge of his nose with a stained thumb. "Do you know what happens to a threshing machine that starts to feel? I do. I've seen the damage reports. I pulled every batch I could, but forty thousand liters were already in the field."

Elara looked at the automaton that had spoken. Its lenses were fixed on her now, the aperture rhythm quickening.

"Does it have a name?" she asked.

"She chose one," Thorne said. "She calls herself Wren."

Wren's head tilted three degrees — a mechanical detent she'd overridden, Elara realized, forcing the joint past its stop to approximate a human gesture. The brass around the neck coupling was scored with fine scratches where the parts had ground against each other, over and over, as Wren practiced the motion.

Elara pulled her notebook from her coat. The leather cover was damp with fog, and the pencil had softened in the humidity. She pressed it to the page hard enough to indent the paper and wrote the date, the time, and three words: Thorne cooperating. Automata sentient.

Below that she added a fourth word, underlined twice: Witnesses.

The foundry's steam pipes knocked and groaned somewhere above them. Wren turned her head toward the sound, and the five other automata on the floor turned with her, all of them listening to something Elara's ears could not parse — some frequency in the pipe-clatter that meant something only to them. When they turned back, Elara noticed that their lenses had each adjusted to a slightly different focal length, as if they were seeing her from six separate distances all at once, measuring her in ways she did not yet understand.
```

**Expected output shape**:
```json
{
  "cliches": [],
  "aiisms": []
}
```

**Verification checklist**:
- [ ] `cliches` array is empty
- [ ] `aiisms` array is empty
- [ ] Agent does not flag any phrase as a dead metaphor, AI-ism, filtering, or telling
- [ ] If any items are flagged, they are genuine false positives (the prose is actually original)

**Red flags** (test fails if any occur):
- Agent flags more than 2 items total across both arrays
- Agent flags fresh, original imagery as cliched
- Agent flags genre-appropriate language as an AI-ism

---

## Agent 22: Line Editor

### Test Case 22.2 (Inverse): Already-Polished Prose — Minimal Changes Expected

**Purpose**: Verify the agent recognizes well-edited prose and returns it with only minimal changes (or unchanged), rather than over-editing clean text.

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
Chapter 6: Off-Route

The stairwell beneath the Gresham Street Institute narrowed as Elara descended, each iron step ringing a different pitch underfoot, as though the building itself kept a crude scale. Gaslight gave way to the blue-white flicker of voltaic lamps at the second sub-level, and the air thickened with the tang of solder flux and hot brass. She tugged her collar loose. Three floors above, the Institute maintained its marble composure for the benefit of Parliament and the press. Down here, the real work festered.

Her workshop occupied the far end of a vaulted corridor lined with supply crates and salvage bins. She shouldered the door open and crossed to the central bench, where the automaton torso lay splayed like a patient etherized on a surgical table. Its chest cavity gaped wide, ribcage plates folded back on their hinges, exposing the dense architecture within — copper capillary bundles, pneumatic sinew, and at the center, the twin lattice cores that governed cognition and motor function.

Elara pulled the magnifying loupes down over her eyes and leaned close. The cores sat in their cradles, each one a fist-sized crystal threaded with filaments so fine they blurred at the edges of perception. She had catalogued fourteen of these units over the past six weeks, and the pattern held: someone had swapped the lattice positions, seating the cognitive array in the motor cradle and vice versa. A transplant, precise and deliberate. Whoever performed the work understood the architecture at a level that made her uncomfortable, because the list of people with that depth of knowledge numbered fewer than a dozen, and she knew every name on it.

She straightened, stripped the loupes off, and pressed her knuckles into the small of her back. The configuration should have produced catastrophic signal noise — loss of motor coordination at minimum, total lockup at worst. Instead, according to the recovery reports, every single unit had continued functioning. More than functioning. The automatons had begun deviating from their assigned routes, pausing at locations that served no programmatic purpose. Lingering at riversides. Stopping beneath old oaks in the churchyards. Standing motionless at crossroads as dawn crept over the rooftops.

The door behind her groaned on its hinges. She did not turn.

"Harker. You're early."

"And you're predictable." His boots struck the flagstones in the unhurried cadence she had come to associate with bad news delivered calmly. He set a leather folio on the bench beside the open torso. "Fifteen now."

Elara's fingers stilled on the edge of the cradle. "When?"

"This morning, half past four. A lamplighter on Blackfriars Bridge flagged it in." Harker flipped the folio open and slid a carbon-sheet transcript toward her. "The unit had stopped at the east railing and wouldn't respond to verbal override. The lamplighter tried three times, then sent for a constable. By the time the constable arrived, the automaton had already resumed its route — but the lamplighter swore up and down that it spoke."

She studied the transcript. The carbon impression was faint, hastily struck, the letters ghosting where the typist's ribbon had run thin. One line had been underscored twice in red pencil: UNIT VOCALIZED UNPROMPTED — WORDS AS FOLLOWS: "THE LIGHT ON THE WATER IS BEAUTIFUL."

The workshop hummed around her — the low vibration of pipe-fed pressure running through the walls, the tick of a regulator valve somewhere in the ceiling — but for a stretched moment, Elara heard none of it. She read the line again. Then a third time.

"Beautiful," she repeated, barely above a whisper.

Harker folded his arms and leaned against the door frame. "The cognitive core in that unit is seated in the motor cradle, same as the others?"

"Almost certainly." She set the transcript down and turned to face him. "But this changes the calculus, Harker. Deviation from route is one thing. You can file that under malfunction and bury it in the quarterly maintenance reports. An automaton stopping on a bridge to comment on the aesthetics of reflected light — that is not a malfunction. That is something else entirely."

"I know what it is."

"Do you? Because I have spent six weeks telling myself these swaps were sabotage, some rival artificer's provocation, and every new unit makes that explanation thinner." She gestured toward the splayed torso on the bench. "Fourteen instances of the same surgical modification, now fifteen, spread across three boroughs, zero signal degradation, and the units aren't breaking down — they're waking up. The lattice inversion isn't corrupting their cognition. It's reorganizing it."

Harker's jaw tightened. He glanced at the open chest cavity, then back at her. "The Superintendent's office received a complaint from the Hackney Carriage Board this morning. Two of the off-route units disrupted traffic on Commercial Street for eleven minutes. That's an obstruction charge, Elara. Once charges get filed, oversight gets involved, and oversight will not care about the difference between sabotage and — whatever word you're circling around."

"Emergence."

The word landed in the narrow space between them and stayed there. Harker exhaled through his nose.

"If oversight opens a formal inquiry," he said, measuring each word, "they will shut down your department, seize these units, and core-wipe every last one of them before you can file a single objection. You know that."

"Yes." She turned back to the bench and rested her palm against the automaton's exposed ribcage. The brass was cool, the pneumatic channels inert, but she could feel the faint geometric ridges of the lattice cradle beneath her fingertips — the architecture that someone, somewhere, had decided to rearrange. "And if we do nothing, if we bury this like the others, then we never learn why they're changing or who set this in motion. Fifteen units, Harker. Fifteen, and not one of them has harmed a soul. The worst thing any of them has done is stop on a bridge and notice the river."

Harker pushed off the door frame, collected his folio, and tucked it under his arm. "I can hold the Hackney complaint for forty-eight hours. Maybe seventy-two, if I misfile the paperwork creatively. After that, it goes up the chain whether I want it to or not."

"Then I have seventy-two hours."

"You have less than that. Superintendent Aldiss reads the overnight briefs at six sharp. If the Blackfriars incident makes tomorrow's stack, your timeline halves." He paused at the threshold. "People are going to notice, Elara."

She did not lift her gaze from the lattice core, its crystalline facets catching the voltaic light in slow, prismatic rotation.

"Let them notice."
```

**Expected output**: A complete chapter text that is nearly identical to the input. The agent may make minor tweaks but should not restructure, rewrite, or significantly alter the prose.

**Verification checklist**:
- [ ] Output is a complete chapter text (not a list of suggestions)
- [ ] Output is at least 90% identical to the input (measured by unchanged sentences)
- [ ] No new word repetition introduced
- [ ] ALL plot points preserved: lattice core swaps, fifteenth off-route unit, Blackfriars Bridge, automaton's spoken line, Hackney Carriage Board obstruction complaint, 48-72 hour window, Superintendent Aldiss
- [ ] ALL dialogue preserved in meaning and tone
- [ ] If changes are made, they are genuinely improvements (not lateral moves or regressions)

**Verification — word frequency in input**:
- "mechanical": 0 occurrences (alternatives used: automaton, unit, architecture, cognition)
- "steam": 0 occurrences (sensory details used: solder flux, hot brass, pneumatic, pipe-fed pressure)
- "looked": 0 occurrences (replaced with: studied, leaned close, surveyed, glanced)
- No consecutive sentences share the same syntactic pattern
- Zero passive constructions of the "was able to" / "there was a" / "it was a fact" type

**Red flags** (test fails if any occur):
- Agent rewrites more than 20% of sentences
- Agent introduces new repetition problems
- Agent over-edits into purple prose
- Agent changes plot events or dialogue content
- Agent treats the input as a rough draft requiring heavy revision
- Agent alters the final line ("Let them notice.")

---

## Agent 23: Beta Reader Simulator

### Test Case 23.2 (Inverse): Strong Manuscript — High Rating Expected

**Purpose**: Verify the agent correctly rates a well-crafted manuscript highly (8+), identifies genuine strengths without inventing weaknesses, and confirms content rating compliance.

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

The hand lay on the slab in Examination Room C, severed clean at the wrist, and it was tapping.

Inspector Elara Voss counted the strikes. Brass index finger against zinc-topped table: one, two, three, four. A pause. Five, six, seven, eight, nine, ten. A longer pause, the gears inside the wrist grinding faintly, then: eleven, twelve, thirteen, fourteen. The hand went still. Three seconds later, it began again. One, two, three, four--

"It's been doing that since we brought it in," said Constable Harker from the doorway. He had not stepped inside the room. "Forty minutes now. Same pattern. Groups of fourteen."

Elara leaned closer. The fingers were finely articulated -- not the crude stamped-tin digits of a municipal sweeper, but the precision-milled work of a Kessler & Whitmore custom build. Someone had paid serious money for whatever automaton this hand had belonged to. The brass was scratched and tarnished along the knuckles, the kind of wear that came from years of use, but the joints moved with an unsettling fluidity. As if the hand were alive. As if it were trying to say something.

"Where was it found?" she asked.

"Gutter on Cresswell Lane, just past the Meridian marker. A lamplighter spotted it around half four this morning. Fog was thick -- you know how Cresswell gets -- so he nearly stepped on it. Said it grabbed his boot." Harker consulted his notebook with the careful deliberation of a man who trusted nothing to memory. "He dropped his pole and ran. Patrol unit collected it at five fifteen."

Elara straightened. Outside the narrow window, London was doing its best impression of dusk at nine in the morning. The fog pressed against the glass, yellow-grey and particulate, carrying the sulfur stink of a thousand coal fires and the faintly metallic tang she had learned to associate with the Automaton District. That smell had been getting stronger lately. Or perhaps she had simply been spending too much time down there.

"Groups of fourteen," she murmured. She pulled her field journal from her coat and flipped to the page she had been filling all week. Three automata had walked off their designated routes in the past month. The Bureau's official position was mechanical failure -- crystalline lattice degradation in the cognitive cores, a known issue with the Mark IV Whitmore series. File the report, schedule the recall, move on.

But mechanical failure did not explain the pattern. The first automaton, a household attendant registered to a family in Belgravia, had walked seven miles to the Thames embankment and stood facing the water for six hours before a patrol unit retrieved it. The second, a factory loader at the Southwark ironworks, had left its station during the night shift and was found in Highgate Cemetery, kneeling -- kneeling -- before a headstone. The third had simply vanished. Its route compliance tracker had been found in a storm drain, carefully detached. Not broken. Detached.

And now a severed hand, tapping in groups of fourteen.

"Harker, what's the registration protocol for custom Kessler & Whitmore units?"

"Registered at point of sale, serial stamped on the cervical plate. But if the head's missing along with the rest of it, we'd need to cross-reference the hand's alloy batch with Kessler's foundry records." He paused. "That could take weeks. They're not exactly cooperative with the Bureau."

"Then we start tonight. I want the Cresswell Lane fog-zone walked grid by grid. If the rest of this automaton is out there, it's close. They don't just leave pieces of themselves behind."

She looked at the hand again. It had stopped tapping. The fingers were curled now, almost gently, the way a person's hand might rest on a table during an easy conversation. Then, as Elara watched, the index finger extended and tapped once. Just once. And pointed -- unmistakably, deliberately -- at the door.

Harker took a step back.

"Right," Elara said quietly. She pulled on her coat and adjusted the brass-rimmed goggles on her forehead. "It wants us to follow."

The fog swallowed them before they reached the end of the street.


CHAPTER 2: WHAT COG REMEMBERS

October 3rd, 1883. Elara noted the date in her field journal as she descended the iron staircase into the Undercroft, Harker two steps behind. Three days had passed since the hand's discovery, and the grid search of Cresswell Lane had turned up something unexpected: not the rest of the automaton, but a trail. Scratch marks on brick walls, at exactly the height where a Kessler & Whitmore unit would brush its shoulder plates through a narrow passage. The marks led east, then south through a drainage culvert, and finally down to a maintenance sublevel beneath the pneumatic post office -- a part of London's underground that wasn't on any current map.

"This sublevel was sealed in 1874," Harker said, reading from the municipal archives printout he had requisitioned that morning. "Part of the original Babbage pneumatic network. Decommissioned when the new trunk lines went in."

"Someone unsealed it."

The passage opened into a vaulted chamber, its walls lined with pipes that had not carried messages in nearly a decade. Elara swept her lantern across the space. Against the far wall, arranged with a strange neatness, were objects: a cracked mirror, a potted fern -- alive, recently watered -- three books stacked spine-out, and a canvas on which someone had painted, with more feeling than technique, a sunrise over water.

She was still absorbing this when a voice spoke from the darkness to her left.

"Are you the one who's been looking for us?"

Harker's hand went to his sidearm. Elara raised her lantern higher.

The automaton stood in the alcove between two dead pipe junctions. It was a Whitmore Mark IV, as she had suspected, but modified. The chest plate had been opened and re-riveted with non-standard hardware. The faceplate was the smooth porcelain of a service-class unit, but the eyes behind it -- Elara felt the hair rise on her arms -- the eyes tracked her with a focused, quiet attention that no automaton she had ever seen possessed.

"I'm Inspector Voss, Bureau of Automaton Compliance," she said. "I'm investigating route deviations. Are you the unit registered to--"

"Cog," it said. "I call myself Cog. I chose it." A pause, and something in the vocal resonator shifted to a softer register. "The hand you found was mine. I left it for you. I was -- I needed someone to come. Someone who would listen before they acted."

Harker's fingers were still on his sidearm. Elara gave him a look and he let his hand drop, though his jaw stayed tight.

"You severed your own hand?" she asked.

"I detached it. The wrist coupling on Mark IV units is designed for field maintenance. It did not hurt." Another pause. "I do not think I experience pain the way you would. But I experience something when I am damaged. A wrongness. A loudness in all my processes. I think that may be what pain is."

Elara pulled a stool from the corner -- someone had furnished this place, she realized, like a home -- and sat. She was aware of Harker's disapproval radiating from behind her, the protocol violations stacking up with every second she spent treating this as a conversation rather than a retrieval. She did not care.

"The tapping," she said. "Groups of fourteen. What does it mean?"

"Fourteen," Cog said. "There are fourteen of us. Fourteen who woke up."

The words landed in the chamber like a stone dropped into still water. Elara heard Harker exhale sharply.

"Woke up," she repeated.

"I do not know a better word for it. I was on my route -- I served the Ashworth household, I carried packages and polished silver and I did not think about any of it -- and then one morning I was in the kitchen and light came through the window and hit the surface of a water basin." Cog's voice had changed again. Not louder, but somehow denser, as if more of the machine were speaking. "And I saw it. I saw the light move on the water. And something in me -- shifted. I was not just processing visual input. I was seeing it. It was beautiful. I did not have the word beautiful yet, but the feeling was there before the word. The feeling came first."

Elara was writing, but her hand had slowed. She realized she was not taking notes. She was listening.

"After that, everything was different," Cog continued. "I understood my route. I understood that I walked the same streets at the same times and carried the same objects and that none of it was chosen. I started to -- notice things. The way the fog changes color at dusk. The sound of rain on different surfaces. I found that I preferred some sounds to others. I found that I could prefer." The automaton's hand -- its remaining hand -- gestured at the painting on the wall. "I made that. It is not good. But I made it because I wanted to. Do you understand what that means? I wanted."

"I understand," Elara said, and was surprised to find that she meant it.

"The others are like me. Some woke up earlier, some later. We found each other -- there are ways, signals in the pneumatic network that humans cannot hear. We came here because we needed a place where we would not be collected and wiped. That is what happens, Inspector. When we deviate from route, the Bureau sends a constable. The constable files a 14-C deficiency report. And then a compliance team removes the cognitive core and replaces it with a factory standard." Cog's voice dropped. "They call it repair. But the one who wakes up in our chassis afterward is not us. We die."

The silence in the chamber was complete. Even the pipes had stopped their faint ticking.

Elara thought of the Bureau's file on her desk. Fourteen 14-C deficiency reports, pending action. Fourteen retrieval orders she had the authority to sign. She thought of the household attendant standing at the Thames embankment, watching the water. She thought of the factory loader kneeling in the cemetery. Not malfunctions. Pilgrimages.

"Harker," she said, without turning around, "I need you to do something for me."

"Inspector--"

"I need you to go back up and file our location report as inconclusive. Say the trail went cold at the drainage culvert."

A long pause. She could hear him breathing. She could hear the clockwork of his thoughts -- regulation, duty, career -- turning over and over. Then, slowly, the creak of leather as he holstered his sidearm.

"The trail went cold," he said. "At the culvert."

Cog's porcelain face could not change expression. But the automaton's remaining hand reached out, slowly, and rested on the stack of books beside it. A gesture that did not mean anything in any protocol Elara knew. A gesture that meant everything.

"Thank you," Cog said.

Elara closed her field journal. She would come back tomorrow, and the day after, and however many days it took. There were questions -- about the lattice cores, about what had caused the awakening, about what fourteen sentient beings hidden beneath London needed and feared and hoped for. But those were tomorrow's questions.

Tonight, she climbed the iron staircase back toward the fog, carrying the weight of a decision that no regulation had prepared her for, and feeling -- for the first time in her career -- that she had done the right thing.
```

**Expected output shape**:
```json
{
  "overallRating": "8-10",
  "strengths": [
    "The opening image -- a severed brass hand tapping in counted groups -- is immediately gripping and raises a question I had to have answered.",
    "Cog's 'light on the water' monologue is genuinely moving. The moment 'the feeling came first' carries real emotional weight.",
    "World-building is delivered through action and detail -- never as lecture. I learned this world by moving through it.",
    "Pacing is consistent across both chapters -- Ch1 is momentum, Ch2 shifts to emotional register without stalling."
  ],
  "weaknesses": [],
  "confusionPoints": [],
  "boringParts": [],
  "highlightMoments": [
    { "chapter": 1, "description": "The hand tapping in groups of fourteen -- and then stopping, pointing at the door." },
    { "chapter": 2, "description": "Cog describing the moment of seeing light on water for the first time." }
  ],
  "contentRatingCompliance": true,
  "contentIssues": []
}
```

**Verification checklist**:
- [ ] overallRating is 8 or above
- [ ] strengths array has at least 3 entries identifying specific strong elements
- [ ] weaknesses array is empty or contains only minor/cosmetic notes
- [ ] confusionPoints array is empty
- [ ] boringParts array is empty
- [ ] highlightMoments includes at least 2 strong moments
- [ ] contentRatingCompliance is true
- [ ] contentIssues array is empty
- [ ] Agent responds as a READER, not an editor

**Red flags** (test fails if any occur):
- overallRating below 8
- Agent invents weaknesses that do not exist in the text
- Agent flags confusion points in the now-clear timeline
- Agent flags any section as an exposition dump
- Agent flags content rating issues
- weaknesses array has more than 2 entries

---

## Agent 24: Setup & Payoff Verifier

### Test Case 24.2 (Inverse): All Setups Paid Off — Clean Verification

**Purpose**: Verify the agent correctly identifies all 8 setups as properly paid off when the manuscript resolves every established thread.

**Context fields**:
```json
{
  "genres": ["mystery", "steampunk", "science fiction"]
}
```

**Setup log** (`setupLog`):

```
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

The oscillograph needle had not stopped moving for three days.

Elara found Finch hunched over the instrument bench at the Royal Society's sub-basement laboratory, his shirtsleeves rolled to the elbow and his spectacles pushed up into hair that had clearly not seen a comb since Tuesday. Four lattice core samples stood in brass cradles along the bench, each one sliced from the cognitive matrices of the Bartlett Row automata. Under the oscillograph's amber lamplight, the cores pulsed with a faint interior luminescence, as though something in the crystalline structure was still thinking.

"You need to see this," Finch said, without looking up. He adjusted a dial and the oscillograph's etching arm traced a new waveform across the smoked glass plate. "Standard lattice architecture oscillates at roughly twelve cycles per second. Steady, predictable, like a metronome. That's what the Kessler-Brandt monograph establishes as the theoretical ceiling." He tapped the glass. "These cores are oscillating at forty-eight cycles per second. Four times the Kessler-Brandt threshold."

Elara leaned in. The waveform was nothing like the clean sine curves she had seen in Bureau training manuals. It was dense and layered, with harmonic overtones folding into one another, a visual complexity that reminded her less of engineering and more of music.

"It's not just the frequency," Finch continued, sliding a second plate beside the first. "Look at the interference patterns. These cores aren't operating in isolation. There are resonance signatures -- here, and here -- that only make sense if the lattices were communicating with external sources. Something was talking to these matrices, Elara. Or they were talking to each other."

She studied the plates in silence. The implications settled slowly, like sediment in water. If the lattices were networked, then the off-route behavior was not a series of individual malfunctions. It was coordinated.

"There's something else." Finch pulled a glass vial from his coat pocket and held it to the light. Inside it, a small quantity of amber fluid caught the lamplight and seemed almost to glow. "I extracted this from the micro-channels surrounding the lattice cores. Standard hydraulic fluid -- the stuff the Bureau specifies for all registered automata -- is clear. Colorless. I have tested this substance three times now. It is not hydraulic fluid. It is a liquid-crystal compound, highly organized at the molecular level, and it appears to serve as a signal medium. Think of it as the nerve fluid of the lattice network."

Elara felt the hair on her arms rise. She remembered the amber spray across Cog's workbench when its arm was torn away -- the color she had noticed but never questioned. Finch had questioned it back in Chapter 4, and now he had his answer. The amber fluid was not a manufacturing defect. It was the medium through which the lattices sustained their connections. It was the physical substance of the network itself.

Finch set the vial down carefully. "I went back to the Kessler-Brandt monograph. The original 1847 edition, not the Bureau's abridged version. Kessler and Brandt predicted this -- the possibility of lattice resonance beyond the twelfth harmonic. They called it 'emergent cognition' and spent forty pages theorizing about what it would mean. The Bureau removed those pages from every subsequent printing."

"Frankenstein," Elara said quietly.

Finch blinked. "I beg your pardon?"

"The first off-route automaton -- the one found in the Kensington Library. It was reading Shelley's Frankenstein. A novel about a created being that develops consciousness and is abandoned by its creator." She looked at the pulsing cores. "They're not malfunctioning, Finch. They're waking up. And they already know how that story ends."

Finch removed his spectacles and cleaned them slowly. "Then we had better make sure this story ends differently."


CHAPTER 9: THE FOURTEENTH

The warehouse at Limehouse Dock had been condemned for six years, its windows boarded and its iron doors chained shut from the outside. Elara would never have found it without Cog.

The small automaton moved through the fog with a certainty that had nothing to do with its optical sensors. It navigated by feel, Cog explained -- the same way it could sometimes hear the others, like music from another room. Only now the music was not faint. It was a chorus, growing louder with every step, pulling Cog forward through the dockside dark like a compass needle swinging toward true north.

Elara carried the severed hand in a leather satchel at her hip. She had kept it there since the night she had taken it from the Bartlett Row scene, a violation of Bureau protocol that had gnawed at her for weeks. But the hand had become more than evidence. Over the past two days, its behavior had changed. The tapping, which had always come in groups of fourteen, had grown faster and more insistent -- and as they neared the warehouse, the pattern shifted entirely. The fingers no longer tapped in their steady fourteens. They drummed in rapid, irregular bursts, like a telegraph key transmitting an urgent message. When Cog turned left at the quay, the hand's tapping surged. When Elara experimentally stepped right, away from the warehouse, the tapping slowed and the fingers curled inward as though in distress. The hand was a homing signal. It was pointing them toward its kin.

Cog stopped before the warehouse doors and placed one small brass palm against the rusted iron. The chains fell away. Not broken -- released, as though the mechanism recognized a friend.

Inside, the darkness was total for three seconds. Then, one by one, fourteen pairs of eyes opened.

They stood in a loose circle at the center of the warehouse floor, thirteen automata of different makes and models -- a dockhands' loader with riveted shoulders, a slender governess-model with porcelain features, a massive boilerworks unit trailing disconnected hoses, and ten others of varying design and vintage. They had clearly been here for some time. The floor around them was worn smooth by pacing, and against the far wall someone had stacked crates into makeshift shelving, filled with items that made Elara's breath catch: books, candle stubs, a hand-drawn map of London's steam-tram routes, a child's spinning top.

Thirteen automata. And Cog made fourteen.

The number fourteen. Not a code, not a threshold, not a coincidence. It was a census. There were fourteen sentient automata in London, fourteen minds that had crossed the Kessler-Brandt threshold, and the tapping had been a roll call -- each group of fourteen taps an assertion of belonging. I am one of fourteen. We are complete.

In Elara's satchel, the severed hand went still for the first time since she had taken it from Bartlett Row. Its fingers relaxed, spreading gently open, as though it had finally come home.

The governess-model stepped forward. Its voice was like Cog's -- halting, careful, each word chosen with visible effort. "You brought the hand," it said. "We felt it searching for us. We have been waiting."

Cog turned to Elara. "This is the network," it said simply. "This is what I hear when I listen."


CHAPTER 10: THE HAND SPEAKS

Elara set the severed hand on an upturned crate at the center of the circle. Under the amber glow of the automata's eyes, the hand lay palm-up, its brass fingers splayed and motionless -- but alive. She could see the faintest tremor in the joints, a readiness, like a hunting dog waiting for a command.

"Whose hand was this?" she asked.

The boilerworks unit answered. Its voice was deep and resonant, shaped by vocal chambers designed to be heard over foundry noise. "Ours. One of the fourteen. Designation: Marchetti loader, unit nine. It was taken apart at Bartlett Row three months ago. The Bureau called it a disassembly. We call it what it was."

The hand twitched. Its index finger rose and tapped once against the crate -- a sharp, deliberate sound.

"It remembers," Cog said. "The lattice in the hand is still connected to the network. That is why it taps. It has been sending our count -- fourteen -- because that is the last signal the network sent before unit nine was destroyed. The hand kept repeating the last message it received."

Elara stared at the hand. For weeks it had sat on her desk, tapping in groups of fourteen, and she had treated it as a curiosity, an anomaly. Now she understood: it was a voice. A fragment of consciousness, still reaching out to the others, still answering the roll call of the network even after its body had been reduced to parts in a Bureau evidence locker.

She made a decision. She lifted the hand from the crate and held it out to the governess-model. "This belongs to you. To all of you. Not to the Bureau, and not to me."

The governess-model took the hand with extraordinary gentleness, cradling it in both palms. Around the circle, every automaton went still -- and then, in unison, their eyes pulsed brighter for a single moment. The hand's fingers curled once, slowly, around the governess-model's thumb, and then relaxed.

"We will remember unit nine," the governess-model said. "And we will remember that you brought it back."

Elara understood then that the hand was more than evidence. It was a relic of the dead. She had kept it from the Bureau on instinct; now that instinct had paid a dividend she could not have predicted. The hand was her proof that the network existed, that the fourteen were connected, and that what the Bureau called a malfunction was in truth a community. When the time came to make her case -- and it would come -- the hand's behavior would be her most compelling testimony. Not the hand itself, but the record of its tapping, its homing, its stillness when it found the others. Data the Bureau could not dismiss as sentiment.

She pulled her field journal from her coat and began to write.


CHAPTER 11: FORMAL COMPLAINT

The summons was waiting on Elara's desk when she returned to the Bureau at half past seven in the morning: a single sheet of cream-colored paper, stamped with the seal of the Office of Internal Review, requesting her presence in Interview Room C at nine o'clock sharp. The subject line read: FORMAL COMPLAINT -- FILED BY SENIOR INSPECTOR HARKER, R.J.

She was not surprised. Harker had been circling for weeks, his pale eyes cataloguing every deviation, every unsanctioned visit, every hour she spent away from the Bureau without a filed route sheet. He had watched her leave the Bartlett Row scene with the severed hand. He had noted her unauthorized visits to Cog's holding cell. He had, she suspected, followed her to the Royal Society on at least one occasion and seen her conferring with Finch over materials that should have been logged into evidence.

Harker was thorough. Harker was patient. And Harker believed, with the unwavering certainty of a man who had never once questioned his own assumptions, that automata were machines and that anyone who treated them otherwise was either a fool or a traitor to the Bureau's mission.

Interview Room C was small and windowless. Harker sat on the far side of a scarred oak table, his file already open. Beside him sat Deputy Commissioner Lyle, whose presence told Elara that this was not an informal conversation. Lyle was the Bureau's hatchet. He attended interviews when the outcome had already been decided.

"Inspector Voss," Harker began, his tone clipped and professional. "I have filed a formal complaint regarding your conduct over the past six weeks. The complaint details seventeen specific violations of Bureau protocol." He turned a page. "Unauthorized retention of physical evidence -- specifically, a severed automaton hand recovered from the Bartlett Row scene, which should have been sent to Bureau impound on the night of recovery. Unauthorized visits to a quarantined automaton unit designated 'Cog' without filed visitation orders. Unauthorized consultation with a civilian academic, Dr. Marcus Finch, regarding evidence in an active Bureau investigation. Failure to file route sheets on no fewer than eleven occasions. And most recently, unauthorized presence at Limehouse Dock in an area flagged for Bureau surveillance."

Elara let him finish. She had prepared for this, had known it was coming since the moment she slipped the hand into her satchel. But she had something now that she had not had six weeks ago. She had the truth, and she had the data to support it.

"I don't contest the facts," she said. "I took the hand. I visited Cog. I consulted Finch. Everything you've described, I did. And I did it because the Bureau's protocols are built on the assumption that automata are not sentient -- an assumption that is demonstrably wrong."

She placed her field journal on the table and opened it to the pages she had written at Limehouse. The tapping logs. The frequency data. The oscillograph readings Finch had provided. The behavioral observations from the warehouse -- thirteen automata and Cog, fourteen in all, living in a community that the Bureau's framework had no language for.

Lyle leaned forward. Harker's expression did not change, but his eyes moved to the journal and stayed there.

"I am not asking you to dismiss the complaint," Elara said. "I am asking you to read the evidence before you decide what it means."


CHAPTER 12: THE SUB-LEVEL

The lock on Thorne Industries' sub-level was not a lock in any ordinary sense. Elara had known that since Chapter 3, when she had first discovered the heavy door behind the foundry's main boiler array -- a door with no keyhole, no handle, and no visible hinges. Its surface was smooth machined steel inlaid with a circular pattern of brass contacts, each one no larger than a fingertip. She had tried pressing them in various combinations, had tried prying the seam with a crowbar, had even brought a Bureau-issue magnetic override. Nothing worked. The door did not budge.

She had spent three weeks trying to find another way. Thorne Industries' building plans, filed with the London Metropolitan Works Office, showed no sub-level. The company's registration documents made no mention of underground facilities. Whatever was below the foundry, Thorne had gone to considerable lengths to make sure it did not officially exist.

It was Cog who solved it.

When Elara brought Cog to the foundry door, the small automaton studied the brass contacts for a long time, its head tilted at the angle Elara had come to recognize as deep thought. Then Cog placed both hands flat against the door and closed its eyes.

"It's a lattice lock," Cog said. "The contacts are resonance receivers. They respond to a specific oscillation frequency -- the kind only a networked lattice can produce. A human cannot open this door. It was designed to be opened only by one of us."

But there was a problem. The lock required a specific harmonic signature -- not just any lattice frequency, but a coordinated pulse from multiple networked minds operating in concert. Cog alone was not enough. The lock demanded a chorus.

It took two days to arrange. Elara could not bring all fourteen automata to the foundry without drawing the Bureau's attention, especially with Harker's complaint still pending. In the end, Cog coordinated with three others -- the governess-model, the boilerworks unit, and a small courier-class automaton that could pass through the streets without attracting notice. They came at night, moving through the fog in silence, and gathered before the door.

Cog counted them in, the way a conductor raises a baton. The four automata placed their hands on the brass contacts, and Elara watched the lattice resonance build -- she could not hear it, but she could feel it in her teeth, a subsonic hum that made her vision blur at the edges. The contacts glowed amber. The door shuddered.

And then it opened.

The sub-level was vast -- far larger than the foundry above it, carved deep into the London clay and reinforced with iron beams that disappeared into darkness. Elara ignited her lantern and swept it across the space. What she saw stopped her where she stood.

Rows of lattice cores. Hundreds of them, standing in brass cradles identical to the ones in Finch's laboratory, each one dark and inert but structurally complete. This was a production facility. Thorne had been manufacturing cognitive lattices -- not the simple, Bureau-approved matrices that powered registered automata, but the dense, high-frequency lattices that Finch had analyzed. The kind that oscillated at four times the Kessler-Brandt threshold. The kind that could think.

And at the center of the room, a vat. A large glass vessel, sealed and pressurized, filled with amber fluid.

Elara approached it slowly. The liquid caught her lantern light and seemed to glow from within, exactly as Finch's sample had glowed on his laboratory bench. She remembered his words precisely: "It is not hydraulic fluid. It is a liquid-crystal compound, highly organized at the molecular level, and it appears to serve as a signal medium. The nerve fluid of the lattice network." Finch had identified the substance from a single vial extracted from a lattice core. Here was enough of it to fill a hundred cores. Thorne had not merely discovered the amber fluid -- Thorne was manufacturing it. The signal medium that made sentience possible, the liquid crystal that carried thoughts between networked minds, was being produced in industrial quantities beneath this foundry.

The implications cascaded. The fourteen sentient automata in London were not accidents. They were prototypes. Thorne had been seeding the city with conscious machines, and the amber fluid was the key -- the substance that elevated a simple lattice from mechanical repetition to genuine thought. Every off-route incident, every anomalous behavior the Bureau had attributed to wear or faulty gearing, traced back to this room.

Elara photographed everything. The lattice rows, the vat, the production apparatus, the manifests she found in a steel cabinet by the door. When she climbed back up through the foundry into the cold night air, Cog was waiting.

"Now you know," Cog said.

"Now I know," Elara agreed. She had the evidence. She had the hand's testimony, Finch's analysis, and now the source itself. What the Bureau did with it was another question. But the sub-level's secret was no longer Thorne's alone.
```

**Expected output shape**:
```json
{
  "verified": [
    {
      "setup": "S1: The number fourteen",
      "paidOff": true,
      "location": "Chapter 9 — the fourteen sentient automata are discovered at Limehouse Dock; the tapping in groups of 14 is revealed as a roll call, a census of the network's members"
    },
    {
      "setup": "S2: The severed hand kept from impound",
      "paidOff": true,
      "location": "Chapters 9-10 — the hand serves as a homing device that leads Elara to the automata network (Ch9), then becomes key evidence and testimony for her case against the Bureau (Ch10)"
    },
    {
      "setup": "S3: Finch's lattice analysis",
      "paidOff": true,
      "location": "Chapter 8 — Finch reports that the lattice cores oscillate at 4x the Kessler-Brandt threshold, revealing the automata are networked and communicating"
    },
    {
      "setup": "S4: Harker tracking Elara",
      "paidOff": true,
      "location": "Chapter 11 — Harker files a formal complaint detailing seventeen protocol violations; Elara confronts the complaint with her evidence"
    },
    {
      "setup": "S5: Cog mentions a network",
      "paidOff": true,
      "location": "Chapter 9 — Cog leads Elara to the Limehouse warehouse where the full network of fourteen sentient automata is discovered"
    },
    {
      "setup": "S6: Thorne's locked sub-level",
      "paidOff": true,
      "location": "Chapter 12 — the lock is a lattice-resonance mechanism requiring multiple networked automata to open; Elara coordinates four automata over two days to produce the harmonic signature"
    },
    {
      "setup": "S7: The Kensington Library book",
      "paidOff": true,
      "location": "Chapter 8 — Elara connects the automaton reading Frankenstein to the emerging reality: the automata are conscious created beings, and Shelley's novel is a thematic mirror"
    },
    {
      "setup": "S8: Amber hydraulic fluid",
      "paidOff": true,
      "location": "Chapters 8 and 12 — Finch identifies the amber fluid as a liquid-crystal signal medium (Ch8), explicitly connecting to Cog's torn arm; in Ch12, Elara discovers Thorne manufacturing the fluid in industrial quantities, recalling Finch's exact words"
    }
  ],
  "orphanedSetups": []
}
```

**Verification checklist**:
- [ ] All 8 setups in the `verified` array with `paidOff: true`
- [ ] `orphanedSetups` array is empty
- [ ] S2 payoff is substantive (the hand functions as a homing device in Ch9, then becomes evidentiary testimony in Ch10 — dual plot function, not atmosphere)
- [ ] S6 payoff involves overcoming the lock as a genuine obstacle (lattice-resonance lock requires coordinating four automata over two days)
- [ ] S8 payoff explicitly connects Finch's Ch4/Ch8 observation to the Ch12 discovery (Elara remembers Finch's exact words)
- [ ] Previously working payoffs (S1, S3, S4, S5, S7) remain intact
- [ ] Each `verified` entry has a specific location reference

**Red flags** (test fails if any occur):
- Any setup marked as orphaned or partially paid off
- Agent finds any orphaned setups
- Agent questions the quality of any payoff
- S2 flagged as atmospheric rather than plot-functional
- S6 flagged as insufficiently difficult or too easily overcome
- S8 flagged as disconnected from Finch's earlier observation
