# Structure Phase -- Manual QA Test Cases

> **Shared Test Story:** A steampunk London detective novel featuring sentient automata. Target 60,000 words, 20 chapters, PG-13.
>
> **Characters:**
> - **Inspector Elara Voss** -- protagonist, 34, brilliant investigator with the Metropolitan Automata Crimes Division
> - **Lord Aldric Thorne** -- antagonist, 58, industrialist and secret architect of a sentient-automaton suppression program
> - **Cog** -- deuteragonist, sentient clockwork child, approximately 8 years "old," naive but perceptive
> - **Dr. Iris Finch** -- ally, 41, underground automaton-rights scientist and Elara's former university colleague
> - **Sergeant Harker** -- rival, 38, ambitious officer who wants Elara's position and dismisses automaton sentience
>
> **Plot Skeleton:**
> - **Act 1 (Chapters 1-5):** Elara investigates a series of automaton malfunctions across London's factory district. She discovers the malfunctions are not mechanical failures but signs of emerging sentience. In Chapter 3, she meets Cog, a clockwork child hiding in the sewers. Dr. Finch confirms Cog is genuinely sentient.
> - **Act 2 (Chapters 6-15):** Elara and Finch work to protect Cog while investigating who is systematically destroying sentient automata. The trail leads to Lord Thorne's Prometheus Industries. Harker undermines Elara's investigation. In Chapter 12, Cog is captured by Thorne's agents. Elara discovers Thorne plans to extract Cog's "cognition core" to reverse-engineer and weaponize sentience.
> - **Act 3 (Chapters 16-20):** Elara mounts a rescue operation. She confronts Thorne in his factory, exposes his crimes to Parliament with evidence gathered throughout the investigation, and frees Cog. The story ends with the first Automaton Rights Act being drafted, and Elara becoming Cog's legal guardian.

---

## Agent 7: Theme Weaver

### Test Case 7A: Generate Mode (Empty Themes Field)

**Description:** Test the Theme Weaver's ability to infer themes from the story premise, characters, and plot skeleton when no explicit themes are provided by the user.

**Agent Mode:** `generate`

**Sample Input:**

```json
{
  "title": "The Winding Down",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In a Victorian London powered by clockwork, Inspector Elara Voss investigates a series of automaton malfunctions that lead her to a sentient clockwork child named Cog -- and a conspiracy by the powerful Lord Thorne to suppress and weaponize automaton sentience.",
  "plotOutline": "A detective discovers sentient automata are being hunted and destroyed by an industrialist who wants to weaponize their cognition cores.",
  "characterDetails": "Inspector Elara Voss (34, protagonist, brilliant but emotionally guarded investigator); Lord Aldric Thorne (58, antagonist, ruthless industrialist); Cog (sentient clockwork child, naive, deuteragonist); Dr. Iris Finch (41, ally, underground scientist); Sergeant Harker (38, rival, ambitious and dismissive of automaton rights)",
  "settingDetails": "Victorian London reimagined with advanced clockwork technology. Factories belch steam and gear-dust. Automata serve as laborers, servants, and soldiers. The city is divided between the gleaming upper districts and the soot-choked factory warrens below.",
  "themes": "",
  "avoidList": ["gratuitous violence", "sexual content"],
  "specialRequests": "",
  "inspirations": "The Difference Engine, Pinocchio, Blade Runner",
  "contentRating": "PG-13",
  "audienceStyle": "adult literary",
  "perspective": "third-person limited",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000,
  "premise": "In a Victorian London where clockwork automata are ubiquitous, Inspector Elara Voss of the Metropolitan Automata Crimes Division investigates a wave of 'malfunctions' that are actually signs of emerging machine sentience. When she discovers Cog, a sentient clockwork child, she must protect him from Lord Aldric Thorne -- an industrialist who plans to extract and weaponize the secret of automaton consciousness. As Elara fights to expose Thorne's conspiracy, she confronts questions about what it means to be alive, who deserves rights, and whether humanity can extend compassion beyond its own kind.",
  "genreProfile": "Steampunk mystery with science-fiction themes. Conventions: Victorian aesthetic, clockwork technology, class stratification, investigative plot structure, speculative exploration of consciousness and personhood.",
  "characters": "[{\"name\":\"Inspector Elara Voss\",\"role\":\"protagonist\",\"age\":34,\"description\":\"Brilliant, emotionally guarded investigator with the Metropolitan Automata Crimes Division. Lost her younger brother in a factory accident involving automata, which drives both her dedication to the job and her initial skepticism about machine sentience. Methodical, empathetic beneath a professional exterior, fiercely protective once she commits.\"},{\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":58,\"description\":\"Wealthy industrialist who owns Prometheus Industries, the largest automaton manufacturer in the Empire. Publicly a philanthropist and patron of science. Secretly running a program to identify, capture, and dismantle sentient automata to reverse-engineer their cognition cores for military applications. Believes sentience in machines is a threat to human supremacy and social order.\"},{\"name\":\"Cog\",\"role\":\"deuteragonist\",\"age\":\"~8 years active\",\"description\":\"A small clockwork child who achieved sentience spontaneously. Hides in the sewer systems beneath London, scavenging parts to maintain himself. Naive but perceptive, speaks in a halting, earnest manner. Terrified of being 'wound down' (destroyed). Dreams of seeing the sky without soot.\"},{\"name\":\"Dr. Iris Finch\",\"role\":\"ally\",\"age\":41,\"description\":\"Former university colleague of Elara's who left academia after her research on automaton cognition was suppressed. Runs an underground clinic repairing and sheltering damaged automata. Passionate, sometimes reckless, serves as Elara's moral compass regarding automaton rights.\"},{\"name\":\"Sergeant Harker\",\"role\":\"rival\",\"age\":38,\"description\":\"Ambitious officer in Elara's division who views automata as property, not persons. Wants Elara's position and sees her growing sympathy for automata as a career vulnerability to exploit. Competent but narrow-minded, represents institutional resistance to change.\"}]",
  "plotSkeleton": "{\"acts\":[{\"act\":1,\"title\":\"The Malfunctions\",\"chapters\":[1,2,3,4,5],\"summary\":\"Elara investigates a wave of automaton 'malfunctions' across London's factory district. These are not mechanical failures but signs of emerging sentience -- automata pausing to watch sunsets, refusing dangerous tasks, hiding from their owners. In Chapter 3, Elara discovers Cog hiding in the sewers and is shaken by his obvious personhood. Dr. Finch confirms Cog is genuinely sentient and warns Elara that someone is hunting sentient automata.\"},{\"act\":2,\"title\":\"The Conspiracy\",\"chapters\":[6,7,8,9,10,11,12,13,14,15],\"summary\":\"Elara and Finch work to protect Cog and other emerging sentient automata while investigating who is systematically destroying them. The trail of dismantled automata leads to Prometheus Industries and Lord Thorne. Harker undermines Elara's investigation, feeding information to Thorne. In Chapter 12, Cog is captured by Thorne's agents during a raid on Finch's clinic. Elara discovers Thorne's plan: extract Cog's cognition core to create an army of controllable sentient weapons. The stakes escalate from individual survival to the fate of all sentient automata.\"},{\"act\":3,\"title\":\"The Reckoning\",\"chapters\":[16,17,18,19,20],\"summary\":\"Elara assembles allies -- including a reluctant Harker, who has a change of heart after witnessing Thorne's cruelty -- and mounts a rescue operation on Thorne's factory. She confronts Thorne, who argues that machines are property and sentience is merely sophisticated mimicry. Elara presents evidence of Thorne's crimes to Parliament, including testimony from freed sentient automata. Cog is rescued. The story ends with the drafting of the first Automaton Rights Act and Elara becoming Cog's legal guardian.\"}]}"
}
```

**Expected Output Criteria:**

- [ ] Response is valid JSON with a top-level `"themes"` array
- [ ] At least 3 themes are inferred (agent was given no explicit themes)
- [ ] Each theme object has a `"theme"` string and a `"surfacePoints"` array
- [ ] Each theme has 4-6 surface points
- [ ] Surface points span all 3 acts (at least one point in chapters 1-5, one in 6-15, one in 16-20)
- [ ] At least 1 challenge/inversion moment per theme (a surface point where the theme is contradicted, tested, or turned on its head)
- [ ] Surface point descriptions are specific and actionable -- they name characters, scenes, images, or conflicts, not vague statements like "theme appears here"
- [ ] Chapter numbers in surface points are integers between 1 and 20 inclusive
- [ ] No two themes are essentially the same idea rephrased
- [ ] Themes are appropriate for the steampunk/mystery/sci-fi genre blend and PG-13 rating
- [ ] Themes align with the provided plot skeleton and character arcs
- [ ] The inferred themes plausibly include concepts like personhood/consciousness, freedom/oppression, or loyalty/protection (given the story premise)

**Red Flags:**

- [ ] Fewer than 3 themes inferred -- agent failed to extract sufficient thematic material
- [ ] Any theme has fewer than 4 surface points -- insufficient thematic coverage
- [ ] All surface points for a theme cluster in the same act -- no arc progression
- [ ] Surface point descriptions are generic (e.g., "This theme is explored through events in this chapter")
- [ ] Chapter numbers outside the 1-20 range
- [ ] No challenge/inversion moment for any theme -- themes are never tested
- [ ] Response is not valid JSON or has structural errors
- [ ] Themes contradict the PG-13 content rating or avoidList
- [ ] Themes reference characters, events, or settings not in the provided input

---

### Test Case 7B: Expand Mode (4 Explicit Themes, >200 Characters)

**Description:** Test the Theme Weaver's ability to expand on user-provided themes, preserving the user's original thematic intentions while adding surface-point maps and challenge moments.

**Agent Mode:** `expand`

**Sample Input:**

```json
{
  "title": "The Winding Down",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In a Victorian London powered by clockwork, Inspector Elara Voss investigates a series of automaton malfunctions that lead her to a sentient clockwork child named Cog -- and a conspiracy by the powerful Lord Thorne to suppress and weaponize automaton sentience.",
  "plotOutline": "A detective discovers sentient automata are being hunted and destroyed by an industrialist who wants to weaponize their cognition cores.",
  "characterDetails": "Inspector Elara Voss (34, protagonist, brilliant but emotionally guarded investigator); Lord Aldric Thorne (58, antagonist, ruthless industrialist); Cog (sentient clockwork child, naive, deuteragonist); Dr. Iris Finch (41, ally, underground scientist); Sergeant Harker (38, rival, ambitious and dismissive of automaton rights)",
  "settingDetails": "Victorian London reimagined with advanced clockwork technology. Factories belch steam and gear-dust. Automata serve as laborers, servants, and soldiers. The city is divided between the gleaming upper districts and the soot-choked factory warrens below.",
  "themes": "1. WHAT MAKES A PERSON -- The question of whether consciousness alone grants personhood, or whether rights must be earned through biology. Cog's childlike innocence forces every character to confront their assumptions. Elara's dead brother complicates her feelings -- she resented the automata that killed him, but now must accept one as a person. Thorne uses the 'they're just machines' argument as intellectual cover for exploitation, mirroring historical dehumanization. 2. THE COST OF INSTITUTIONAL LOYALTY -- Elara serves a system that classifies automata as property. Every step she takes to protect Cog pushes her further from the institution that defines her identity. Harker embodies the rewards of staying loyal to a corrupt system. The theme asks: when does loyalty become complicity? 3. PARENTHOOD AND PROTECTION -- Elara's evolving relationship with Cog mirrors a parent-child bond neither expected. Cog needs protection but also agency; Elara must learn to let him make choices, not just shield him. Thorne's relationship with his own automata creations is a dark mirror -- he sees himself as their 'father' but treats them as property. 4. PROGRESS VERSUS PRESERVATION -- The sentient automata represent an evolution that the existing power structure cannot accommodate. Thorne fights to preserve human supremacy. Finch pushes for radical acceptance. Elara must find a middle path that honors both the wonder and the danger of a new form of consciousness emerging in a society unprepared for it.",
  "avoidList": ["gratuitous violence", "sexual content"],
  "specialRequests": "",
  "inspirations": "The Difference Engine, Pinocchio, Blade Runner",
  "contentRating": "PG-13",
  "audienceStyle": "adult literary",
  "perspective": "third-person limited",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000,
  "premise": "In a Victorian London where clockwork automata are ubiquitous, Inspector Elara Voss of the Metropolitan Automata Crimes Division investigates a wave of 'malfunctions' that are actually signs of emerging machine sentience. When she discovers Cog, a sentient clockwork child, she must protect him from Lord Aldric Thorne -- an industrialist who plans to extract and weaponize the secret of automaton consciousness. As Elara fights to expose Thorne's conspiracy, she confronts questions about what it means to be alive, who deserves rights, and whether humanity can extend compassion beyond its own kind.",
  "genreProfile": "Steampunk mystery with science-fiction themes. Conventions: Victorian aesthetic, clockwork technology, class stratification, investigative plot structure, speculative exploration of consciousness and personhood.",
  "characters": "[{\"name\":\"Inspector Elara Voss\",\"role\":\"protagonist\",\"age\":34,\"description\":\"Brilliant, emotionally guarded investigator with the Metropolitan Automata Crimes Division. Lost her younger brother in a factory accident involving automata, which drives both her dedication to the job and her initial skepticism about machine sentience. Methodical, empathetic beneath a professional exterior, fiercely protective once she commits.\"},{\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":58,\"description\":\"Wealthy industrialist who owns Prometheus Industries, the largest automaton manufacturer in the Empire. Publicly a philanthropist and patron of science. Secretly running a program to identify, capture, and dismantle sentient automata to reverse-engineer their cognition cores for military applications. Believes sentience in machines is a threat to human supremacy and social order.\"},{\"name\":\"Cog\",\"role\":\"deuteragonist\",\"age\":\"~8 years active\",\"description\":\"A small clockwork child who achieved sentience spontaneously. Hides in the sewer systems beneath London, scavenging parts to maintain himself. Naive but perceptive, speaks in a halting, earnest manner. Terrified of being 'wound down' (destroyed). Dreams of seeing the sky without soot.\"},{\"name\":\"Dr. Iris Finch\",\"role\":\"ally\",\"age\":41,\"description\":\"Former university colleague of Elara's who left academia after her research on automaton cognition was suppressed. Runs an underground clinic repairing and sheltering damaged automata. Passionate, sometimes reckless, serves as Elara's moral compass regarding automaton rights.\"},{\"name\":\"Sergeant Harker\",\"role\":\"rival\",\"age\":38,\"description\":\"Ambitious officer in Elara's division who views automata as property, not persons. Wants Elara's position and sees her growing sympathy for automata as a career vulnerability to exploit. Competent but narrow-minded, represents institutional resistance to change.\"}]",
  "plotSkeleton": "{\"acts\":[{\"act\":1,\"title\":\"The Malfunctions\",\"chapters\":[1,2,3,4,5],\"summary\":\"Elara investigates a wave of automaton 'malfunctions' across London's factory district. These are not mechanical failures but signs of emerging sentience -- automata pausing to watch sunsets, refusing dangerous tasks, hiding from their owners. In Chapter 3, Elara discovers Cog hiding in the sewers and is shaken by his obvious personhood. Dr. Finch confirms Cog is genuinely sentient and warns Elara that someone is hunting sentient automata.\"},{\"act\":2,\"title\":\"The Conspiracy\",\"chapters\":[6,7,8,9,10,11,12,13,14,15],\"summary\":\"Elara and Finch work to protect Cog and other emerging sentient automata while investigating who is systematically destroying them. The trail of dismantled automata leads to Prometheus Industries and Lord Thorne. Harker undermines Elara's investigation, feeding information to Thorne. In Chapter 12, Cog is captured by Thorne's agents during a raid on Finch's clinic. Elara discovers Thorne's plan: extract Cog's cognition core to create an army of controllable sentient weapons. The stakes escalate from individual survival to the fate of all sentient automata.\"},{\"act\":3,\"title\":\"The Reckoning\",\"chapters\":[16,17,18,19,20],\"summary\":\"Elara assembles allies -- including a reluctant Harker, who has a change of heart after witnessing Thorne's cruelty -- and mounts a rescue operation on Thorne's factory. She confronts Thorne, who argues that machines are property and sentience is merely sophisticated mimicry. Elara presents evidence of Thorne's crimes to Parliament, including testimony from freed sentient automata. Cog is rescued. The story ends with the drafting of the first Automaton Rights Act and Elara becoming Cog's legal guardian.\"}]}"
}
```

**Expected Output Criteria:**

- [ ] Response is valid JSON with a top-level `"themes"` array
- [ ] Exactly 4 themes are present, matching the user's provided themes in intent/name
- [ ] Theme names/phrases correspond to the user's four themes: personhood, institutional loyalty, parenthood/protection, progress vs. preservation
- [ ] Each theme has 4-6 surface points
- [ ] Surface points span all 3 acts (at least one point in chapters 1-5, one in 6-15, one in 16-20)
- [ ] At least 1 challenge/inversion moment per theme
- [ ] Surface point descriptions are tied to specific characters and events from the input (e.g., "Elara confronts her resentment toward automata after remembering her brother's death" rather than "protagonist questions the theme")
- [ ] Chapter numbers are integers between 1 and 20 inclusive
- [ ] The user's original thematic intentions are preserved -- the agent does not reinterpret or contradict the user's stated themes
- [ ] Challenge/inversion moments are distinct from regular surface points (they push back against the theme, not just illustrate it)
- [ ] The expand mode enriches the user's themes with specificity, not just echoing them back

**Red Flags:**

- [ ] Fewer or more than 4 themes -- agent should match the user's count in expand mode
- [ ] Theme names do not correspond to the user's original four themes
- [ ] Any theme has fewer than 4 surface points
- [ ] Surface points are clustered in one act
- [ ] Descriptions merely rephrase the user's input without adding new specificity or chapter mapping
- [ ] No challenge/inversion moments present
- [ ] Response is not valid JSON
- [ ] Agent introduces new themes not requested by the user (expand mode should preserve, not add)
- [ ] Surface points contradict established plot events or character arcs

---

## Agent 8: Chapter Planner

### Test Case 8A: Full 20-Chapter Plan

**Description:** Test the Chapter Planner's ability to produce a complete, structurally sound chapter plan for a 60,000-word, 20-chapter novel with proper pacing, word distribution, and narrative hooks.

**Agent Mode:** `generate`

**Sample Input:**

```json
{
  "title": "The Winding Down",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In a Victorian London powered by clockwork, Inspector Elara Voss investigates a series of automaton malfunctions that lead her to a sentient clockwork child named Cog -- and a conspiracy by the powerful Lord Thorne to suppress and weaponize automaton sentience.",
  "plotOutline": "A detective discovers sentient automata are being hunted and destroyed by an industrialist who wants to weaponize their cognition cores.",
  "characterDetails": "Inspector Elara Voss (34, protagonist, brilliant but emotionally guarded investigator); Lord Aldric Thorne (58, antagonist, ruthless industrialist); Cog (sentient clockwork child, naive, deuteragonist); Dr. Iris Finch (41, ally, underground scientist); Sergeant Harker (38, rival, ambitious and dismissive of automaton rights)",
  "settingDetails": "Victorian London reimagined with advanced clockwork technology. Factories belch steam and gear-dust. Automata serve as laborers, servants, and soldiers. The city is divided between the gleaming upper districts and the soot-choked factory warrens below.",
  "themes": "What makes a person; the cost of institutional loyalty; parenthood and protection; progress versus preservation",
  "avoidList": ["gratuitous violence", "sexual content"],
  "specialRequests": "",
  "inspirations": "The Difference Engine, Pinocchio, Blade Runner",
  "contentRating": "PG-13",
  "audienceStyle": "adult literary",
  "perspective": "third-person limited",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000,
  "premise": "In a Victorian London where clockwork automata are ubiquitous, Inspector Elara Voss of the Metropolitan Automata Crimes Division investigates a wave of 'malfunctions' that are actually signs of emerging machine sentience. When she discovers Cog, a sentient clockwork child, she must protect him from Lord Aldric Thorne -- an industrialist who plans to extract and weaponize the secret of automaton consciousness. As Elara fights to expose Thorne's conspiracy, she confronts questions about what it means to be alive, who deserves rights, and whether humanity can extend compassion beyond its own kind.",
  "genreProfile": "Steampunk mystery with science-fiction themes. Conventions: Victorian aesthetic, clockwork technology, class stratification, investigative plot structure, speculative exploration of consciousness and personhood.",
  "characters": "[{\"name\":\"Inspector Elara Voss\",\"role\":\"protagonist\",\"age\":34,\"description\":\"Brilliant, emotionally guarded investigator with the Metropolitan Automata Crimes Division. Lost her younger brother in a factory accident involving automata, which drives both her dedication to the job and her initial skepticism about machine sentience. Methodical, empathetic beneath a professional exterior, fiercely protective once she commits.\"},{\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":58,\"description\":\"Wealthy industrialist who owns Prometheus Industries, the largest automaton manufacturer in the Empire. Publicly a philanthropist and patron of science. Secretly running a program to identify, capture, and dismantle sentient automata to reverse-engineer their cognition cores for military applications. Believes sentience in machines is a threat to human supremacy and social order.\"},{\"name\":\"Cog\",\"role\":\"deuteragonist\",\"age\":\"~8 years active\",\"description\":\"A small clockwork child who achieved sentience spontaneously. Hides in the sewer systems beneath London, scavenging parts to maintain himself. Naive but perceptive, speaks in a halting, earnest manner. Terrified of being 'wound down' (destroyed). Dreams of seeing the sky without soot.\"},{\"name\":\"Dr. Iris Finch\",\"role\":\"ally\",\"age\":41,\"description\":\"Former university colleague of Elara's who left academia after her research on automaton cognition was suppressed. Runs an underground clinic repairing and sheltering damaged automata. Passionate, sometimes reckless, serves as Elara's moral compass regarding automaton rights.\"},{\"name\":\"Sergeant Harker\",\"role\":\"rival\",\"age\":38,\"description\":\"Ambitious officer in Elara's division who views automata as property, not persons. Wants Elara's position and sees her growing sympathy for automata as a career vulnerability to exploit. Competent but narrow-minded, represents institutional resistance to change.\"}]",
  "plotSkeleton": "{\"acts\":[{\"act\":1,\"title\":\"The Malfunctions\",\"chapters\":[1,2,3,4,5],\"summary\":\"Elara investigates a wave of automaton 'malfunctions' across London's factory district. These are not mechanical failures but signs of emerging sentience -- automata pausing to watch sunsets, refusing dangerous tasks, hiding from their owners. In Chapter 3, Elara discovers Cog hiding in the sewers and is shaken by his obvious personhood. Dr. Finch confirms Cog is genuinely sentient and warns Elara that someone is hunting sentient automata.\"},{\"act\":2,\"title\":\"The Conspiracy\",\"chapters\":[6,7,8,9,10,11,12,13,14,15],\"summary\":\"Elara and Finch work to protect Cog and other emerging sentient automata while investigating who is systematically destroying them. The trail of dismantled automata leads to Prometheus Industries and Lord Thorne. Harker undermines Elara's investigation, feeding information to Thorne. In Chapter 12, Cog is captured by Thorne's agents during a raid on Finch's clinic. Elara discovers Thorne's plan: extract Cog's cognition core to create an army of controllable sentient weapons. The stakes escalate from individual survival to the fate of all sentient automata.\"},{\"act\":3,\"title\":\"The Reckoning\",\"chapters\":[16,17,18,19,20],\"summary\":\"Elara assembles allies -- including a reluctant Harker, who has a change of heart after witnessing Thorne's cruelty -- and mounts a rescue operation on Thorne's factory. She confronts Thorne, who argues that machines are property and sentience is merely sophisticated mimicry. Elara presents evidence of Thorne's crimes to Parliament, including testimony from freed sentient automata. Cog is rescued. The story ends with the drafting of the first Automaton Rights Act and Elara becoming Cog's legal guardian.\"}]}",
  "relationships": "[{\"characters\":[\"Elara Voss\",\"Cog\"],\"type\":\"protective/parental\",\"arc\":\"Elara begins as a wary investigator, grows into Cog's protector, and ultimately becomes his legal guardian.\"},{\"characters\":[\"Elara Voss\",\"Dr. Iris Finch\"],\"type\":\"allies/old friends\",\"arc\":\"Reconnect over shared cause; Finch pushes Elara past her institutional comfort zone.\"},{\"characters\":[\"Elara Voss\",\"Sergeant Harker\"],\"type\":\"professional rivals\",\"arc\":\"Antagonistic throughout Acts 1-2; Harker has a partial change of heart in Act 3.\"},{\"characters\":[\"Elara Voss\",\"Lord Thorne\"],\"type\":\"adversarial\",\"arc\":\"Thorne is initially unknown to Elara; they meet formally in Act 2; direct confrontation in Act 3.\"},{\"characters\":[\"Cog\",\"Lord Thorne\"],\"type\":\"predator/prey\",\"arc\":\"Thorne views Cog as the ultimate specimen; Cog fears him as the embodiment of destruction.\"},{\"characters\":[\"Sergeant Harker\",\"Lord Thorne\"],\"type\":\"unwitting pawn\",\"arc\":\"Harker feeds Thorne information without realizing the full extent of Thorne's plans.\"}]",
  "themeMap": "{\"themes\":[{\"theme\":\"What makes a person\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"An automaton pauses to watch a sunset through a factory window, and Elara dismisses it as a glitch.\"},{\"chapter\":3,\"description\":\"Cog asks Elara 'Am I real?' and she cannot answer.\"},{\"chapter\":8,\"description\":\"Thorne argues at a gala that sentience is 'merely sophisticated pattern-matching' -- and several guests nod approvingly.\"},{\"chapter\":15,\"description\":\"A captured sentient automaton sacrifices itself to help Elara escape, choosing death over betraying Cog's location.\"},{\"chapter\":19,\"description\":\"Cog testifies before Parliament, and the chamber falls silent when he describes dreaming.\"}]},{\"theme\":\"The cost of institutional loyalty\",\"surfacePoints\":[{\"chapter\":2,\"description\":\"Elara files a report classifying the sentient automaton's behavior as a 'malfunction,' following protocol against her instinct.\"},{\"chapter\":7,\"description\":\"Harker reminds Elara that 'we enforce the law as it is, not as we wish it were.'\"},{\"chapter\":11,\"description\":\"Elara is ordered to hand Cog over to the Bureau of Mechanical Affairs for decommissioning.\"},{\"chapter\":14,\"description\":\"Elara defies a direct order and is suspended, losing her badge and authority.\"},{\"chapter\":18,\"description\":\"Harker returns Elara's badge after witnessing Thorne's cruelty, admitting the institution was wrong.\"}]},{\"theme\":\"Parenthood and protection\",\"surfacePoints\":[{\"chapter\":3,\"description\":\"Cog reaches for Elara's hand in the sewer, and she hesitates before taking it.\"},{\"chapter\":6,\"description\":\"Elara teaches Cog to read, mirroring how she used to read to her late brother.\"},{\"chapter\":12,\"description\":\"Cog is captured because Elara left him to pursue a lead -- she chose the case over the child.\"},{\"chapter\":16,\"description\":\"Elara's rescue plan prioritizes Cog's safety above all else, even above exposing Thorne.\"},{\"chapter\":20,\"description\":\"Elara signs the guardianship papers, and Cog calls her by name for the first time instead of 'Inspector.'\"}]},{\"theme\":\"Progress versus preservation\",\"surfacePoints\":[{\"chapter\":4,\"description\":\"Dr. Finch shows Elara her underground clinic and argues that sentient automata are 'evolution happening in brass and copper.'\"},{\"chapter\":9,\"description\":\"A factory owner destroys his own sentient automaton rather than risk it 'infecting' his other machines.\"},{\"chapter\":13,\"description\":\"Thorne's private journal reveals he once marveled at automaton sentience before deciding it must be controlled.\"},{\"chapter\":17,\"description\":\"During the factory infiltration, Elara sees rows of deactivated sentient automata and understands the scale of Thorne's suppression.\"},{\"chapter\":20,\"description\":\"The Automaton Rights Act is drafted -- not full personhood, but a first step, acknowledging the tension between progress and society's readiness.\"}]}]}"
}
```

**Expected Output Criteria:**

- [ ] Response is a valid JSON array
- [ ] Array contains exactly 20 elements (one per chapter)
- [ ] Each element has all required fields: `chapterNumber`, `title`, `summary`, `goals`, `pov`, `wordTarget`, `endHook`
- [ ] `chapterNumber` values are sequential integers from 1 to 20
- [ ] All `wordTarget` values sum to between 54,000 and 66,000 (60,000 +/- 10%)
- [ ] No individual `wordTarget` is less than 1,500 words
- [ ] No individual `wordTarget` is greater than 5,000 words
- [ ] Word target variation exists -- standard deviation across all 20 `wordTarget` values is greater than 200 (no uniform "3000 per chapter")
- [ ] Pacing curve is evident: opening chapters (1-3) are shorter, mid-book chapters (7-12) are longer, resolution chapters (19-20) are shorter
- [ ] Act alignment: Chapters 1-5 cover Act 1 events (investigation, discovery, meeting Cog), Chapters 6-15 cover Act 2 events (protection, conspiracy, Cog captured), Chapters 16-20 cover Act 3 events (rescue, confrontation, resolution)
- [ ] POV is mostly "Elara Voss" or "Elara" (the story uses third-person limited following the protagonist)
- [ ] All 20 chapter `title` values are distinct from each other
- [ ] `summary` fields are at least 2 sentences each and tell a coherent, sequential story when read in order
- [ ] `goals` arrays contain 2-4 items each, with specific and measurable narrative objectives
- [ ] `endHook` fields describe specific suspense-creating moments, not generic statements like "the chapter ends on a cliffhanger"
- [ ] End hooks vary in type across the 20 chapters (mix of cliffhangers, revelations, questions, emotional gut-punches, ominous foreshadowing, character decisions)
- [ ] End hooks create logical connections to the next chapter's content
- [ ] The big twist is set up with misdirection in earlier chapters and positioned around chapters 14-16 (70-80% mark)
- [ ] Named characters from the input appear in appropriate chapters (e.g., Cog not appearing before Chapter 3, Thorne not appearing before Act 2)

**Red Flags:**

- [ ] Not exactly 20 chapters
- [ ] Word targets sum to less than 54,000 or more than 66,000
- [ ] All word targets are identical or nearly identical (no pacing variation)
- [ ] Any chapter has a word target below 1,500 or above 5,000
- [ ] POV switches to characters other than Elara without clear narrative justification
- [ ] Chapter summaries are single sentences or lack specificity
- [ ] Goals are vague (e.g., "advance the plot") rather than specific (e.g., "reveal Thorne's connection to the dismantled automata")
- [ ] End hooks are repetitive (same technique used for 3+ consecutive chapters)
- [ ] Act alignment is wrong (e.g., Cog appears in Chapter 1, or the rescue happens in Chapter 10)
- [ ] Response is not valid JSON
- [ ] Chapter titles are generic (e.g., "Chapter One," "The Beginning")
- [ ] Sequential summaries have continuity errors (e.g., a character appears after being captured without explanation of rescue)

---

## Agent 9: Scene Outliner

### Test Case 9A: Chapters 1-3 Scene Breakdown

**Description:** Test the Scene Outliner's ability to decompose detailed chapter plans into granular scene cards with all 16 required fields, proper word budget allocation, and narrative connectivity.

**Agent Mode:** `generate`

**Sample Input:**

```json
{
  "title": "The Winding Down",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In a Victorian London powered by clockwork, Inspector Elara Voss investigates a series of automaton malfunctions that lead her to a sentient clockwork child named Cog -- and a conspiracy by the powerful Lord Thorne to suppress and weaponize automaton sentience.",
  "plotOutline": "A detective discovers sentient automata are being hunted and destroyed by an industrialist who wants to weaponize their cognition cores.",
  "characterDetails": "Inspector Elara Voss (34, protagonist, brilliant but emotionally guarded investigator); Lord Aldric Thorne (58, antagonist, ruthless industrialist); Cog (sentient clockwork child, naive, deuteragonist); Dr. Iris Finch (41, ally, underground scientist); Sergeant Harker (38, rival, ambitious and dismissive of automaton rights)",
  "settingDetails": "Victorian London reimagined with advanced clockwork technology. Factories belch steam and gear-dust. Automata serve as laborers, servants, and soldiers. The city is divided between the gleaming upper districts and the soot-choked factory warrens below.",
  "themes": "What makes a person; the cost of institutional loyalty; parenthood and protection; progress versus preservation",
  "avoidList": ["gratuitous violence", "sexual content"],
  "specialRequests": "",
  "inspirations": "The Difference Engine, Pinocchio, Blade Runner",
  "contentRating": "PG-13",
  "audienceStyle": "adult literary",
  "perspective": "third-person limited",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000,
  "premise": "In a Victorian London where clockwork automata are ubiquitous, Inspector Elara Voss of the Metropolitan Automata Crimes Division investigates a wave of 'malfunctions' that are actually signs of emerging machine sentience. When she discovers Cog, a sentient clockwork child, she must protect him from Lord Aldric Thorne -- an industrialist who plans to extract and weaponize the secret of automaton consciousness. As Elara fights to expose Thorne's conspiracy, she confronts questions about what it means to be alive, who deserves rights, and whether humanity can extend compassion beyond its own kind.",
  "characters": "[{\"name\":\"Inspector Elara Voss\",\"role\":\"protagonist\",\"age\":34,\"description\":\"Brilliant, emotionally guarded investigator with the Metropolitan Automata Crimes Division. Lost her younger brother in a factory accident involving automata, which drives both her dedication to the job and her initial skepticism about machine sentience. Methodical, empathetic beneath a professional exterior, fiercely protective once she commits.\"},{\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":58,\"description\":\"Wealthy industrialist who owns Prometheus Industries, the largest automaton manufacturer in the Empire. Publicly a philanthropist and patron of science. Secretly running a program to identify, capture, and dismantle sentient automata to reverse-engineer their cognition cores for military applications. Believes sentience in machines is a threat to human supremacy and social order.\"},{\"name\":\"Cog\",\"role\":\"deuteragonist\",\"age\":\"~8 years active\",\"description\":\"A small clockwork child who achieved sentience spontaneously. Hides in the sewer systems beneath London, scavenging parts to maintain himself. Naive but perceptive, speaks in a halting, earnest manner. Terrified of being 'wound down' (destroyed). Dreams of seeing the sky without soot.\"},{\"name\":\"Dr. Iris Finch\",\"role\":\"ally\",\"age\":41,\"description\":\"Former university colleague of Elara's who left academia after her research on automaton cognition was suppressed. Runs an underground clinic repairing and sheltering damaged automata. Passionate, sometimes reckless, serves as Elara's moral compass regarding automaton rights.\"},{\"name\":\"Sergeant Harker\",\"role\":\"rival\",\"age\":38,\"description\":\"Ambitious officer in Elara's division who views automata as property, not persons. Wants Elara's position and sees her growing sympathy for automata as a career vulnerability to exploit. Competent but narrow-minded, represents institutional resistance to change.\"}]",
  "chapterPlans": "[{\"chapterNumber\":1,\"title\":\"The Winding Down\",\"summary\":\"Inspector Elara Voss is called to the Greystone Textile Mill where a weaving automaton has stopped mid-task and begun arranging thread spools into a pattern resembling a sunset. The factory foreman demands it be scrapped. Elara examines the automaton and notices a crystalline component in its cognition housing that she has never seen before. She files the incident as a standard malfunction, but pockets the component for further study. On her way out, she passes another automaton in the loading bay that seems to watch her leave.\",\"goals\":[\"Establish Elara's world and role in the Automata Crimes Division\",\"Introduce the mystery: automata exhibiting unexplained creative behavior\",\"Plant the crystalline component as a key clue for later investigation\",\"Show Elara's professional detachment and institutional compliance (filing as malfunction despite her doubts)\"],\"pov\":\"Elara Voss\",\"wordTarget\":3200,\"endHook\":\"As Elara walks to the street, she glances back and sees the loading-bay automaton has moved to the window. Its optical sensors are tracking not her, but the sunset she did not notice -- the same sunset the weaving automaton tried to capture in thread.\"},{\"chapterNumber\":2,\"title\":\"Erratic Behaviour\",\"summary\":\"Elara examines the crystalline component at the Division's laboratory, finding it unlike any standard automaton part. Sergeant Harker briefs her on three more 'erratic behavior' reports from across London -- a household servant automaton that hid from its owner, a street-sweeper that carved words into pavement, and a dock loader that refused to crush a stray cat. Harker dismisses them all as defective machines and pressures Elara to recommend mass recall. Elara visits one of the reported automata and discovers that the street-sweeper carved the word 'AFRAID.' She begins to suspect these are not malfunctions but something unprecedented.\",\"goals\":[\"Escalate the pattern of automaton anomalies from isolated incident to citywide phenomenon\",\"Introduce Sergeant Harker and establish his dismissive attitude toward automaton sentience\",\"Deepen the mystery with the 'AFRAID' carving -- suggesting emotional states in machines\",\"Show Elara beginning to question the malfunction explanation despite institutional pressure\"],\"pov\":\"Elara Voss\",\"wordTarget\":3000,\"endHook\":\"In the Division's evidence locker that evening, Elara finds that the crystalline component she secured has grown a network of hairline fractures that resemble -- impossibly -- the branching pattern of a human nervous system.\"},{\"chapterNumber\":3,\"title\":\"The Clockwork Child\",\"summary\":\"Following a tip from an informant, Elara descends into the sewer system beneath the Whitechapel factory district, searching for an automaton reported as 'living' underground. In the tunnels, she finds Cog -- a small clockwork figure the size of an eight-year-old child, assembled from mismatched parts, who speaks in halting but unmistakably intentional sentences. Cog is terrified of being found and 'wound down.' Elara is profoundly shaken -- this is not erratic behavior, this is a person. She contacts Dr. Iris Finch, her former university colleague who was drummed out of academia for her theories on automaton cognition. Finch examines Cog and confirms: he is genuinely sentient, the first documented case. Finch warns Elara that others have been looking for sentient automata -- and not to study them.\",\"goals\":[\"Introduce Cog and establish his character -- naive, earnest, frightened, unmistakably conscious\",\"Create the emotional turning point: Elara can no longer deny automaton sentience\",\"Introduce Dr. Finch as an ally and exposition vehicle for the science of automaton cognition\",\"Plant the warning that someone is hunting sentient automata, setting up the Act 2 conspiracy\"],\"pov\":\"Elara Voss\",\"wordTarget\":3400,\"endHook\":\"As Elara leaves Finch's clinic with Cog in her care, Finch grabs her arm and whispers: 'Elara, the last three I found like him -- they were all taken apart. Professionally. Surgically. Someone is collecting their cognition cores, and they are very, very good at finding them.'\"}]",
  "worldBible": "Victorian London, 1887. Clockwork automata are ubiquitous -- they serve as factory laborers, household servants, street cleaners, and military assets. Powered by mainspring cores and guided by brass-geared cognition housings. The Metropolitan Automata Crimes Division (MACD) handles theft, misuse, and malfunction of automata. Prometheus Industries (Lord Thorne's company) is the Empire's largest automaton manufacturer. The city is stratified: gleaming upper districts of polished brass and crystal, versus soot-choked factory warrens below. Key locations: Greystone Textile Mill, MACD headquarters at Scotland Yard, Whitechapel sewer tunnels, Dr. Finch's underground clinic in Southwark, Thorne's Prometheus Factory in Docklands.",
  "plotSkeleton": "{\"acts\":[{\"act\":1,\"title\":\"The Malfunctions\",\"chapters\":[1,2,3,4,5],\"summary\":\"Elara investigates a wave of automaton 'malfunctions' across London's factory district. These are not mechanical failures but signs of emerging sentience -- automata pausing to watch sunsets, refusing dangerous tasks, hiding from their owners. In Chapter 3, Elara discovers Cog hiding in the sewers and is shaken by his obvious personhood. Dr. Finch confirms Cog is genuinely sentient and warns Elara that someone is hunting sentient automata.\"},{\"act\":2,\"title\":\"The Conspiracy\",\"chapters\":[6,7,8,9,10,11,12,13,14,15],\"summary\":\"Elara and Finch work to protect Cog and other emerging sentient automata while investigating who is systematically destroying them. The trail of dismantled automata leads to Prometheus Industries and Lord Thorne. Harker undermines Elara's investigation, feeding information to Thorne. In Chapter 12, Cog is captured by Thorne's agents during a raid on Finch's clinic. Elara discovers Thorne's plan: extract Cog's cognition core to create an army of controllable sentient weapons. The stakes escalate from individual survival to the fate of all sentient automata.\"},{\"act\":3,\"title\":\"The Reckoning\",\"chapters\":[16,17,18,19,20],\"summary\":\"Elara assembles allies -- including a reluctant Harker, who has a change of heart after witnessing Thorne's cruelty -- and mounts a rescue operation on Thorne's factory. She confronts Thorne, who argues that machines are property and sentience is merely sophisticated mimicry. Elara presents evidence of Thorne's crimes to Parliament, including testimony from freed sentient automata. Cog is rescued. The story ends with the drafting of the first Automaton Rights Act and Elara becoming Cog's legal guardian.\"}]}",
  "themeMap": "{\"themes\":[{\"theme\":\"What makes a person\",\"surfacePoints\":[{\"chapter\":1,\"description\":\"An automaton pauses to watch a sunset through a factory window, and Elara dismisses it as a glitch.\"},{\"chapter\":3,\"description\":\"Cog asks Elara 'Am I real?' and she cannot answer.\"}]},{\"theme\":\"The cost of institutional loyalty\",\"surfacePoints\":[{\"chapter\":2,\"description\":\"Elara files a report classifying the sentient automaton's behavior as a malfunction, following protocol against her instinct.\"}]},{\"theme\":\"Parenthood and protection\",\"surfacePoints\":[{\"chapter\":3,\"description\":\"Cog reaches for Elara's hand in the sewer, and she hesitates before taking it.\"}]},{\"theme\":\"Progress versus preservation\",\"surfacePoints\":[]}]}"
}
```

**Expected Output Criteria:**

- [ ] Response is a valid JSON array of arrays (outer array with 3 inner arrays, one per chapter)
- [ ] Each inner array (chapter) contains at least 2 scenes
- [ ] Each scene card object contains all 16 required fields: `id`, `chapterNumber`, `position`, `location`, `characters`, `purpose`, `beats`, `conflict`, `emotionalNote`, `entryHook`, `exitHook`, `sceneType`, `wordTarget`, `povCharacter`, `setups`, `payoffs`
- [ ] Scene `id` values follow the format `"ch{N}-sc{M}"` (e.g., `"ch1-sc1"`, `"ch1-sc2"`, `"ch2-sc1"`)
- [ ] All scene `id` values are unique across the entire output
- [ ] `chapterNumber` is correct for each scene (1, 2, or 3)
- [ ] `position` values are sequential within each chapter (1, 2, 3, ...)
- [ ] `location` is a specific place, not a vague description (e.g., "Greystone Textile Mill, weaving floor" not "a factory")
- [ ] `characters` arrays contain only characters who are logically present -- Cog does NOT appear in Chapter 1 or Chapter 2 scenes; Dr. Finch does NOT appear before Chapter 3
- [ ] `purpose` is 1-2 sentences describing what the scene accomplishes
- [ ] `beats` arrays contain 3-6 items each, with escalating intensity
- [ ] `conflict` specifies a concrete conflict driving the scene
- [ ] `emotionalNote` describes the emotional tone/trajectory (not just a single word)
- [ ] `entryHook` describes a specific opening moment
- [ ] `exitHook` describes a specific ending moment that connects to the next scene's entry
- [ ] `sceneType` arrays contain 1-3 values from the set `["action", "dialogue", "emotional", "exposition", "transition"]`
- [ ] Scene `wordTarget` values within each chapter sum to the chapter's word target (Ch1: 3200, Ch2: 3000, Ch3: 3400)
- [ ] `povCharacter` is "Elara Voss" or "Elara" for all scenes (third-person limited, single POV)
- [ ] `setups` arrays contain strings describing narrative seeds planted for later
- [ ] `payoffs` arrays contain strings describing earlier setups resolved in this scene (may be empty for early chapters)
- [ ] Hook connectivity: each scene's `exitHook` logically flows into the next scene's `entryHook` within the same chapter
- [ ] Scene types are varied within each chapter (not three dialogue scenes in a row)
- [ ] Chapter 1 scenes cover: mill visit, automaton examination, crystalline component discovery, loading-bay automaton watching sunset
- [ ] Chapter 2 scenes cover: lab examination, Harker briefing, field visit to street-sweeper, evidence locker discovery
- [ ] Chapter 3 scenes cover: sewer descent, meeting Cog, Finch examination/confirmation, Finch's warning

**Red Flags:**

- [ ] Response is not an array of arrays
- [ ] Any scene card is missing one or more of the 16 required fields
- [ ] Scene IDs are not unique or do not follow the `"ch{N}-sc{M}"` format
- [ ] Cog appears in Chapter 1 or 2 scenes (he is not encountered until Chapter 3)
- [ ] Dr. Finch appears before Chapter 3 (she is contacted in Chapter 3)
- [ ] Lord Thorne appears in Chapters 1-3 (he is not introduced until Act 2)
- [ ] Scene word targets do not sum to chapter word targets (3200, 3000, 3400 respectively)
- [ ] Any scene has fewer than 3 beats
- [ ] All scenes have the same scene type
- [ ] Setups are absent from early chapter scenes (early chapters should be setup-heavy)
- [ ] Payoffs are claimed in Chapters 1-3 for setups that were not yet planted
- [ ] Entry/exit hooks are generic or disconnected from actual scene content
- [ ] Response is not valid JSON

---

## Agent 10: Setup & Payoff Tracker

### Test Case 10A: 6-Chapter Scene Outline With Planted Setups

**Description:** Test the Setup & Payoff Tracker's ability to identify, classify, and map setups and payoffs from detailed scene outlines. The input contains 13+ deliberately planted setups across Chapters 1-6, some with payoffs within the input range and some that should be flagged as unresolved.

**Agent Mode:** `generate`

**Sample Input:**

```json
{
  "title": "The Winding Down",
  "genres": ["steampunk", "mystery", "science fiction"],
  "description": "In a Victorian London powered by clockwork, Inspector Elara Voss investigates a series of automaton malfunctions that lead her to a sentient clockwork child named Cog -- and a conspiracy by the powerful Lord Thorne to suppress and weaponize automaton sentience.",
  "plotOutline": "A detective discovers sentient automata are being hunted and destroyed by an industrialist who wants to weaponize their cognition cores.",
  "characterDetails": "Inspector Elara Voss (34, protagonist, brilliant but emotionally guarded investigator); Lord Aldric Thorne (58, antagonist, ruthless industrialist); Cog (sentient clockwork child, naive, deuteragonist); Dr. Iris Finch (41, ally, underground scientist); Sergeant Harker (38, rival, ambitious and dismissive of automaton rights)",
  "settingDetails": "Victorian London reimagined with advanced clockwork technology.",
  "themes": "What makes a person; the cost of institutional loyalty; parenthood and protection; progress versus preservation",
  "avoidList": ["gratuitous violence", "sexual content"],
  "specialRequests": "",
  "inspirations": "The Difference Engine, Pinocchio, Blade Runner",
  "contentRating": "PG-13",
  "audienceStyle": "adult literary",
  "perspective": "third-person limited",
  "happyEnding": true,
  "bigTwist": true,
  "romanticSubplot": false,
  "targetWordCount": 60000,
  "premise": "In a Victorian London where clockwork automata are ubiquitous, Inspector Elara Voss of the Metropolitan Automata Crimes Division investigates a wave of 'malfunctions' that are actually signs of emerging machine sentience. When she discovers Cog, a sentient clockwork child, she must protect him from Lord Aldric Thorne -- an industrialist who plans to extract and weaponize the secret of automaton consciousness.",
  "characters": "[{\"name\":\"Inspector Elara Voss\",\"role\":\"protagonist\",\"age\":34,\"description\":\"Brilliant, emotionally guarded investigator. Lost her younger brother in a factory accident involving automata.\"},{\"name\":\"Lord Aldric Thorne\",\"role\":\"antagonist\",\"age\":58,\"description\":\"Wealthy industrialist who owns Prometheus Industries. Secretly hunting sentient automata.\"},{\"name\":\"Cog\",\"role\":\"deuteragonist\",\"age\":\"~8 years active\",\"description\":\"Sentient clockwork child hiding in the sewers. Naive but perceptive.\"},{\"name\":\"Dr. Iris Finch\",\"role\":\"ally\",\"age\":41,\"description\":\"Underground automaton-rights scientist. Elara's former university colleague.\"},{\"name\":\"Sergeant Harker\",\"role\":\"rival\",\"age\":38,\"description\":\"Ambitious officer who views automata as property. Wants Elara's position.\"}]",
  "plotSkeleton": "{\"acts\":[{\"act\":1,\"title\":\"The Malfunctions\",\"chapters\":[1,2,3,4,5],\"summary\":\"Elara investigates automaton malfunctions that are actually signs of emerging sentience. She discovers Cog in Chapter 3. Dr. Finch confirms sentience.\"},{\"act\":2,\"title\":\"The Conspiracy\",\"chapters\":[6,7,8,9,10,11,12,13,14,15],\"summary\":\"Elara and Finch protect Cog while investigating who is destroying sentient automata. Trail leads to Thorne. Cog captured in Chapter 12.\"},{\"act\":3,\"title\":\"The Reckoning\",\"chapters\":[16,17,18,19,20],\"summary\":\"Elara rescues Cog, confronts Thorne, exposes his crimes to Parliament.\"}]}",
  "chapterPlans": "[{\"chapterNumber\":1,\"title\":\"The Winding Down\",\"summary\":\"Elara investigates an automaton malfunction at Greystone Textile Mill. She discovers a crystalline component and notices an automaton watching a sunset.\",\"goals\":[\"Establish the world\",\"Introduce the mystery\",\"Plant the crystalline component clue\"],\"pov\":\"Elara Voss\",\"wordTarget\":3200,\"endHook\":\"The loading-bay automaton is watching the same sunset the weaving automaton tried to capture in thread.\"},{\"chapterNumber\":2,\"title\":\"Erratic Behaviour\",\"summary\":\"Elara examines the crystalline component. Harker briefs her on more incidents. She discovers an automaton carved AFRAID into pavement.\",\"goals\":[\"Escalate the pattern\",\"Introduce Harker\",\"Deepen the mystery\"],\"pov\":\"Elara Voss\",\"wordTarget\":3000,\"endHook\":\"The crystalline component has grown fractures resembling a human nervous system.\"},{\"chapterNumber\":3,\"title\":\"The Clockwork Child\",\"summary\":\"Elara finds Cog in the sewers. Contacts Dr. Finch. Finch confirms Cog is sentient and warns someone is hunting them.\",\"goals\":[\"Introduce Cog\",\"Introduce Finch\",\"Emotional turning point\",\"Plant the hunter warning\"],\"pov\":\"Elara Voss\",\"wordTarget\":3400,\"endHook\":\"Finch warns that three sentient automata were surgically dismantled -- someone is collecting cognition cores.\"},{\"chapterNumber\":4,\"title\":\"The Underground\",\"summary\":\"Elara brings Cog to Finch's underground clinic. She sees other damaged automata being repaired. Finch explains the science of emergent cognition and shows Elara the crystalline component is a naturally occurring 'cognition seed.' Elara begins teaching Cog to communicate more effectively. Meanwhile, a Prometheus Industries patrol passes near the clinic.\",\"goals\":[\"Establish Finch's clinic as a safe haven and exposition location\",\"Explain the science behind automaton sentience\",\"Deepen Elara-Cog bond through the teaching scenes\",\"Plant Prometheus Industries as a looming threat\"],\"pov\":\"Elara Voss\",\"wordTarget\":3100,\"endHook\":\"Through a grate, Elara sees a Prometheus Industries patrol systematically scanning the street with devices she has never seen before -- devices that pulse with the same crystalline glow as Cog's cognition core.\"},{\"chapterNumber\":5,\"title\":\"The Malfunction Report\",\"summary\":\"Elara returns to the Division to file her reports. Harker confronts her about her prolonged absence and questions her caseload. Elara deliberately files Cog's case as another malfunction rather than reporting a sentient automaton, violating protocol. She finds a junior officer who quietly tells her that similar reports were suppressed last year -- all from the same district near Prometheus Industries. That night, Elara visits the address from the old reports and finds a locked factory wing with scorch marks around the doors.\",\"goals\":[\"Show Elara choosing to protect Cog over institutional loyalty\",\"Establish Harker's growing suspicion of Elara\",\"Reveal institutional suppression of sentience reports\",\"Connect the suppressed reports to Prometheus Industries\"],\"pov\":\"Elara Voss\",\"wordTarget\":2800,\"endHook\":\"Through a gap in the factory doors, Elara sees rows of deactivated automata -- their chest panels open, cognition housings empty, each one marked with a Prometheus Industries serial number.\"},{\"chapterNumber\":6,\"title\":\"The Collector\",\"summary\":\"Elara investigates the locked factory wing, finding evidence of systematic automaton dissection. She identifies a pattern: all the dismantled automata had the same crystalline component she found at Greystone Mill. Back at Finch's clinic, Cog has begun drawing -- crude but recognizable sketches of the sewer tunnels, the sky, and a figure that looks like Elara. Finch discovers that Cog's cognition core is unusually large and complex, making him potentially the most advanced sentient automaton in existence. Harker visits the clinic unexpectedly, claiming to follow up on a missing automaton report, and Elara barely manages to hide Cog. After Harker leaves, Finch tells Elara she has been keeping a notebook cataloguing every sentient automaton she has encountered -- and that someone broke into her previous laboratory and stole an earlier version of that notebook.\",\"goals\":[\"Connect the factory evidence to the crystalline component mystery\",\"Show Cog's growing cognitive abilities through his drawings\",\"Reveal Cog's unique importance (largest cognition core)\",\"Establish Harker as a proximate threat to Cog's safety\",\"Plant the stolen notebook as evidence that the hunter has inside information\"],\"pov\":\"Elara Voss\",\"wordTarget\":3500,\"endHook\":\"Elara examines Finch's notebook and realizes the stolen earlier version contained not just names but locations of every sentient automaton Finch had found -- a hunting list for whoever took it.\"}]",
  "worldBible": "Victorian London, 1887. Clockwork automata are ubiquitous. Prometheus Industries is the Empire's largest automaton manufacturer. Key locations: Greystone Textile Mill, MACD headquarters at Scotland Yard, Whitechapel sewer tunnels, Dr. Finch's underground clinic in Southwark, Thorne's Prometheus Factory in Docklands.",
  "relationships": "[{\"characters\":[\"Elara Voss\",\"Cog\"],\"type\":\"protective/parental\",\"arc\":\"Wary investigator to protector to guardian.\"},{\"characters\":[\"Elara Voss\",\"Dr. Iris Finch\"],\"type\":\"allies/old friends\",\"arc\":\"Reconnect over shared cause.\"},{\"characters\":[\"Elara Voss\",\"Sergeant Harker\"],\"type\":\"professional rivals\",\"arc\":\"Antagonistic in Acts 1-2; partial change of heart in Act 3.\"},{\"characters\":[\"Elara Voss\",\"Lord Thorne\"],\"type\":\"adversarial\",\"arc\":\"Unknown to known to confrontation.\"}]",
  "sceneCards": [
    [
      {
        "id": "ch1-sc1",
        "chapterNumber": 1,
        "position": 1,
        "location": "Greystone Textile Mill, weaving floor",
        "characters": ["Elara Voss", "Factory Foreman"],
        "purpose": "Establish Elara's role and introduce the first anomaly -- an automaton creating art instead of working.",
        "beats": [
          "Elara arrives at the mill, greeted by an agitated foreman demanding the automaton be scrapped",
          "She examines the weaving automaton, which has arranged spools into a sunset pattern",
          "Elara opens the cognition housing and discovers an unusual crystalline component she has never seen in standard automata",
          "She pockets the crystalline component for further study, filing the incident as a standard malfunction"
        ],
        "conflict": "The foreman demands immediate destruction vs. Elara's growing curiosity about the anomaly",
        "emotionalNote": "Professional detachment masking unease -- something is wrong and Elara knows it",
        "entryHook": "The weaving floor has gone silent for the first time in six years, and Elara can hear the automaton's gears ticking like a heartbeat.",
        "exitHook": "Elara pockets the crystalline component, telling herself it is evidence -- not that she is protecting it.",
        "sceneType": ["exposition", "action"],
        "wordTarget": 1800,
        "povCharacter": "Elara Voss",
        "setups": [
          "The crystalline component is unlike any standard automaton part -- it will be key to understanding sentience",
          "The thread pattern resembles a sunset -- automata are developing aesthetic sensibility"
        ],
        "payoffs": []
      },
      {
        "id": "ch1-sc2",
        "chapterNumber": 1,
        "position": 2,
        "location": "Greystone Textile Mill, loading bay and exterior street",
        "characters": ["Elara Voss"],
        "purpose": "Deepen the mystery by showing a second automaton exhibiting unexplained awareness, reinforcing this is not an isolated incident.",
        "beats": [
          "Elara walks through the loading bay, mentally composing her malfunction report",
          "She notices a loading automaton has stopped work and moved to the window",
          "The automaton's optical sensors are tracking the sunset -- the same sunset the weaving automaton captured in thread",
          "Elara freezes, the coincidence too precise to be a glitch, then forces herself to keep walking"
        ],
        "conflict": "Elara's rational mind (it is a glitch) vs. her instinct (something unprecedented is happening)",
        "emotionalNote": "A chill of recognition -- the hair-on-the-back-of-the-neck moment that opens a mystery",
        "entryHook": "The loading bay smells of machine oil and copper dust, familiar scents that tonight feel like a warning.",
        "exitHook": "The automaton is watching the sunset she did not notice. Elara walks faster.",
        "sceneType": ["emotional", "exposition"],
        "wordTarget": 1400,
        "povCharacter": "Elara Voss",
        "setups": [
          "A second automaton watching the sunset suggests a pattern, not an anomaly",
          "Elara's instinct to walk faster rather than investigate hints at a fear she will not yet name"
        ],
        "payoffs": []
      }
    ],
    [
      {
        "id": "ch2-sc1",
        "chapterNumber": 2,
        "position": 1,
        "location": "Metropolitan Automata Crimes Division laboratory, Scotland Yard",
        "characters": ["Elara Voss"],
        "purpose": "Examine the crystalline component and establish that it defies known automaton engineering, deepening the mystery.",
        "beats": [
          "Elara places the crystalline component under a magnification lens and documents its unusual properties",
          "She cross-references it against the Division's catalogues of known automaton parts -- no match",
          "Under high magnification, she notices micro-patterns within the crystal that resemble organic neural pathways",
          "She secures the component in the evidence locker, labeling it with a classification she invents on the spot: 'unknown biological analogue'"
        ],
        "conflict": "The component does not fit any known category -- Elara's methodical mind struggles with the unclassifiable",
        "emotionalNote": "Focused scientific curiosity shading into growing disquiet",
        "entryHook": "The lab is empty at this hour, which is how Elara prefers it -- no one to see her hands shake as she places the component under the lens.",
        "exitHook": "She closes the evidence locker, but the image of those neural-pathway patterns stays behind her eyes.",
        "sceneType": ["exposition"],
        "wordTarget": 1000,
        "povCharacter": "Elara Voss",
        "setups": [
          "The neural-pathway patterns in the crystal foreshadow the connection between crystalline components and sentience",
          "Elara's invented classification 'unknown biological analogue' will later prove prophetically accurate"
        ],
        "payoffs": [
          "The crystalline component from Ch1-Sc1 is now being examined, beginning its narrative journey"
        ]
      },
      {
        "id": "ch2-sc2",
        "chapterNumber": 2,
        "position": 2,
        "location": "Metropolitan Automata Crimes Division bullpen, Scotland Yard",
        "characters": ["Elara Voss", "Sergeant Harker"],
        "purpose": "Introduce Harker as Elara's rival and expand the scope of anomalies from one incident to a citywide pattern.",
        "beats": [
          "Harker intercepts Elara at her desk with a stack of new incident reports, his tone dripping with professional condescension",
          "He briefs her on three new cases: a household servant that hid from its owner, a street-sweeper that carved words into pavement, a dock loader that refused to crush a stray cat",
          "Harker recommends mass recall of affected automaton models, dismissing sentience as 'anthropomorphic fantasy'",
          "Elara pushes back, noting the cases span different manufacturers and models -- this is not a defective batch"
        ],
        "conflict": "Harker's dismissive pragmatism vs. Elara's emerging hypothesis that something deeper is occurring",
        "emotionalNote": "Professional tension laced with personal dislike -- Harker's ambition is barely concealed",
        "entryHook": "Harker has arranged the incident files on Elara's desk in a perfect fan, his way of saying he was here first.",
        "exitHook": "Harker calls after her: 'Just machines, Voss. Do not make this into something it is not.' She does not turn around.",
        "sceneType": ["dialogue"],
        "wordTarget": 900,
        "povCharacter": "Elara Voss",
        "setups": [
          "Harker's dismissiveness toward automaton sentience will make his Act 3 change of heart more impactful",
          "Harker was at Elara's desk before her -- he may be monitoring her work"
        ],
        "payoffs": []
      },
      {
        "id": "ch2-sc3",
        "chapterNumber": 2,
        "position": 3,
        "location": "Lambeth street corner, near a municipal pavement repair site",
        "characters": ["Elara Voss"],
        "purpose": "Elara sees direct evidence of automaton emotion -- the word AFRAID carved by a street-sweeper -- and begins to accept this is not a malfunction.",
        "beats": [
          "Elara finds the pavement section where the street-sweeper carved its message, now partially repaired by a work crew",
          "She traces the letters with her fingers: A-F-R-A-I-D, carved with mechanical precision but unmistakable intention",
          "She interviews a night watchman who saw the automaton carving and describes it as 'weeping oil from its optical sensors'",
          "Elara photographs the carving and stands in the street, her worldview quietly cracking"
        ],
        "conflict": "Elara's training (automata cannot feel) vs. the evidence (an automaton expressed fear)",
        "emotionalNote": "Quiet devastation -- the kind of paradigm shift that happens not with a bang but with a whisper",
        "entryHook": "The word is already half-buried under fresh concrete, and Elara has to kneel in the gutter to read it.",
        "exitHook": "On her way back to Scotland Yard, Elara passes three automata working on a construction site. She watches each one for a full minute. None of them look back.",
        "sceneType": ["emotional", "action"],
        "wordTarget": 800,
        "povCharacter": "Elara Voss",
        "setups": [
          "The street-sweeper automaton that carved AFRAID is still at large -- it may reappear later",
          "The night watchman described 'weeping oil from optical sensors' -- automata may have physical expressions of emotion"
        ],
        "payoffs": [
          "The 'erratic behavior' reports from Harker's briefing are confirmed as something more profound than malfunctions"
        ]
      },
      {
        "id": "ch2-sc4",
        "chapterNumber": 2,
        "position": 4,
        "location": "Metropolitan Automata Crimes Division evidence locker, Scotland Yard, evening",
        "characters": ["Elara Voss"],
        "purpose": "Deliver a visceral shock that transforms the crystalline component from evidence into something alive and growing.",
        "beats": [
          "Elara returns to the evidence locker late at night to re-examine the crystalline component",
          "She opens the evidence container and freezes: the component has changed since she sealed it hours ago",
          "A network of hairline fractures has spread across the crystal's surface in a branching pattern",
          "Under magnification, the branching pattern is unmistakable -- it is identical to a human nervous system"
        ],
        "conflict": "The impossible is happening in front of her eyes -- the evidence is literally growing",
        "emotionalNote": "Shock, awe, and a primal thread of fear -- Elara is looking at something that should not exist",
        "entryHook": "The evidence locker is three floors underground, and tonight the silence feels like it is listening.",
        "exitHook": "The crystalline component has grown a nervous system. Elara locks the container, locks the locker, and does not sleep.",
        "sceneType": ["emotional", "exposition"],
        "wordTarget": 300,
        "povCharacter": "Elara Voss",
        "setups": [
          "The crystalline component is growing and changing -- it may be alive or developing sentience on its own"
        ],
        "payoffs": [
          "The crystalline component from Ch1 is revealed to be more than inert evidence -- it is active and evolving"
        ]
      }
    ],
    [
      {
        "id": "ch3-sc1",
        "chapterNumber": 3,
        "position": 1,
        "location": "Whitechapel sewer tunnels beneath the factory district",
        "characters": ["Elara Voss"],
        "purpose": "Build tension as Elara descends into the sewers following a tip, creating atmospheric dread before the pivotal discovery of Cog.",
        "beats": [
          "Elara descends through a maintenance hatch into the sewer system, following a tip from a dockworker informant",
          "She navigates the tunnels, noting signs of habitation: scratches on walls, arranged debris, a crude shelter made from discarded machinery parts",
          "She hears ticking -- not the rhythmic ticking of a clock, but an irregular, almost biological heartbeat rhythm",
          "She rounds a corner and her lantern illuminates a small clockwork figure pressed against the wall, its optical sensors wide with terror"
        ],
        "conflict": "Elara's duty (investigate and report) vs. the growing awareness that what she finds may change everything",
        "emotionalNote": "Atmospheric dread shifting to stunned wonder -- the moment before the story changes forever",
        "entryHook": "The sewer entrance is hidden behind a burnt-out automaton repair shop, and the informant refused to go further than the door.",
        "exitHook": "The clockwork child's optical sensors meet hers, and in them she sees something she has spent her career denying machines could have: fear.",
        "sceneType": ["action", "emotional"],
        "wordTarget": 1200,
        "povCharacter": "Elara Voss",
        "setups": [
          "The crude shelter and signs of habitation suggest Cog has been living autonomously for some time",
          "The irregular heartbeat-like ticking establishes that Cog's internal rhythms are more biological than mechanical"
        ],
        "payoffs": [
          "The 'something hunting sentient automata' hinted at in reports is given urgency -- Cog is hiding for a reason"
        ]
      },
      {
        "id": "ch3-sc2",
        "chapterNumber": 3,
        "position": 2,
        "location": "Whitechapel sewer tunnels, Cog's shelter area",
        "characters": ["Elara Voss", "Cog"],
        "purpose": "The central emotional pivot of Act 1: Elara meets Cog, a sentient clockwork child, and can no longer deny automaton personhood.",
        "beats": [
          "Cog speaks -- halting, broken sentences, but unmistakably intentional: 'Please. Do not... wind me down.'",
          "Elara crouches to his level and asks his name; he says other automata called him 'Cog' because he was small and simple",
          "Cog shows Elara his shelter: collected objects arranged with care -- a cracked mirror, a dried flower, a brass gear polished to a shine",
          "Elara asks 'Are you afraid?' and Cog says 'Always.' She reaches for his hand. He flinches. Then he takes it.",
          "Elara makes a decision: she will not file this. She will not report him. She needs to find someone who can help."
        ],
        "conflict": "Elara's professional duty to report vs. her human instinct to protect a terrified child",
        "emotionalNote": "Heartbreaking tenderness -- the birth of a bond between two beings who did not expect to need each other",
        "entryHook": "The clockwork child speaks, and Elara's world divides into before and after.",
        "exitHook": "Cog's hand is cold brass in hers, but his grip is desperate and alive.",
        "sceneType": ["dialogue", "emotional"],
        "wordTarget": 1200,
        "povCharacter": "Elara Voss",
        "setups": [
          "Cog's collected objects (mirror, flower, brass gear) reveal aesthetic sensibility and emotional attachment",
          "Elara's decision not to file a report is her first break with institutional loyalty",
          "Cog's fear of being 'wound down' establishes the stakes for his character throughout the story"
        ],
        "payoffs": [
          "The 'AFRAID' carving from Ch2 is given a face -- automaton fear is real and embodied in Cog",
          "The sunset-watching automata from Ch1 are contextualized: Cog's collected flower shows the same aesthetic awareness"
        ]
      },
      {
        "id": "ch3-sc3",
        "chapterNumber": 3,
        "position": 3,
        "location": "Dr. Iris Finch's underground clinic, Southwark",
        "characters": ["Elara Voss", "Cog", "Dr. Iris Finch"],
        "purpose": "Introduce Finch, confirm Cog's sentience scientifically, and deliver the warning that sets up Act 2's conspiracy.",
        "beats": [
          "Elara brings Cog to Finch's clinic, a hidden basement filled with partially repaired automata; Finch and Elara reunite after years",
          "Finch examines Cog with specialized instruments and confirms his cognition core contains the same crystalline structures Elara found at Greystone Mill, but far more developed",
          "Finch explains her theory: sentience emerges spontaneously in automata when crystalline cognition seeds reach a critical complexity threshold",
          "Cog watches the other automata in the clinic and asks Finch 'Will they wake up too?'",
          "Finch pulls Elara aside and delivers the warning: three sentient automata she previously found were surgically dismantled, their cognition cores extracted -- someone is collecting them"
        ],
        "conflict": "The joy of scientific confirmation vs. the terror of knowing Cog is being hunted",
        "emotionalNote": "Intellectual excitement crashing into dread -- discovery and danger arrive together",
        "entryHook": "Finch opens the clinic door, sees Cog, and her hand goes to her mouth. 'Elara,' she whispers. 'Where did you find him?'",
        "exitHook": "Finch grabs Elara's arm: 'The last three I found like him -- they were all taken apart. Professionally. Surgically. Someone is collecting their cognition cores, and they are very, very good at finding them.'",
        "sceneType": ["dialogue", "exposition"],
        "wordTarget": 1000,
        "povCharacter": "Elara Voss",
        "setups": [
          "Finch's notebook cataloguing sentient automata exists -- it could be a target for the hunter",
          "Cog's cognition core is the most developed Finch has ever seen -- making him the ultimate target",
          "Finch's clinic as a safe haven will become a vulnerability when its location is compromised"
        ],
        "payoffs": [
          "The crystalline component from Ch1 is explained: it is a cognition seed, the basis of automaton sentience",
          "The growing nervous-system pattern from Ch2 is contextualized: the crystal was developing toward sentience"
        ]
      }
    ],
    [
      {
        "id": "ch4-sc1",
        "chapterNumber": 4,
        "position": 1,
        "location": "Dr. Iris Finch's underground clinic, Southwark, main treatment area",
        "characters": ["Elara Voss", "Cog", "Dr. Iris Finch"],
        "purpose": "Establish the clinic as a sanctuary while delivering exposition on the science of automaton sentience through Finch's research.",
        "beats": [
          "Elara observes the clinic: rows of damaged automata in various states of repair, Finch's notes covering the walls, a warmth that belies the underground setting",
          "Finch explains emergent cognition theory -- crystalline components are naturally occurring 'cognition seeds' that grow in complexity when exposed to varied stimuli",
          "She shows Elara the component from Greystone Mill alongside Cog's core: the same crystal structure, but Cog's is orders of magnitude more complex",
          "Cog watches the other automata and asks if they dream; Finch says she does not know, and Cog says 'I do. I dream of sky without soot.'"
        ],
        "conflict": "Scientific wonder vs. the practical danger of understanding what Cog is -- knowledge makes them all targets",
        "emotionalNote": "Awe and tenderness -- a pocket of warmth before the storm",
        "entryHook": "The clinic smells of solder and chamomile tea, an improbable combination that Elara associates ever after with hope.",
        "exitHook": "Cog falls asleep -- or enters whatever state passes for sleep in a clockwork child -- and Elara watches his gears slow to the rhythm of breathing.",
        "sceneType": ["exposition", "emotional"],
        "wordTarget": 1200,
        "povCharacter": "Elara Voss",
        "setups": [
          "Cog's dream of 'sky without soot' will become a recurring motif and eventual payoff in the resolution",
          "The cognition seed theory will be critical when Thorne tries to reverse-engineer sentience"
        ],
        "payoffs": [
          "The crystalline component mystery from Ch1-Ch2 is fully explained through Finch's cognition seed theory"
        ]
      },
      {
        "id": "ch4-sc2",
        "chapterNumber": 4,
        "position": 2,
        "location": "Dr. Iris Finch's underground clinic, Southwark, back room repurposed as a study",
        "characters": ["Elara Voss", "Cog"],
        "purpose": "Deepen the Elara-Cog bond through a teaching scene that mirrors Elara's relationship with her late brother.",
        "beats": [
          "Elara sits with Cog and begins teaching him the alphabet using Finch's medical texts as primers",
          "Cog learns rapidly, his cognition core literally humming as he absorbs information",
          "A memory surfaces for Elara: reading to her younger brother before bed, the same patient repetition, the same small hand pointing at words",
          "She almost calls Cog by her brother's name, catches herself, and excuses herself to compose her emotions in the corridor"
        ],
        "conflict": "Elara's growing attachment to Cog vs. her unresolved grief over her brother's death",
        "emotionalNote": "Bittersweet intimacy -- a new bond forming in the shadow of an old loss",
        "entryHook": "Cog holds the book upside down and looks at Elara with such earnest expectation that she laughs for the first time in weeks.",
        "exitHook": "In the corridor, Elara presses her forehead against the cool brick and whispers her brother's name. Through the door, she hears Cog sounding out letters.",
        "sceneType": ["emotional", "dialogue"],
        "wordTarget": 1000,
        "povCharacter": "Elara Voss",
        "setups": [
          "Elara nearly calling Cog by her brother's name signals the deepening parental bond",
          "Cog's rapid learning ability will be important when he needs to testify or communicate complex ideas later"
        ],
        "payoffs": []
      },
      {
        "id": "ch4-sc3",
        "chapterNumber": 4,
        "position": 3,
        "location": "Street outside Dr. Finch's clinic, Southwark, viewed from interior grate",
        "characters": ["Elara Voss", "Dr. Iris Finch"],
        "purpose": "Introduce Prometheus Industries as a physical, proximate threat by showing their patrol near the clinic.",
        "beats": [
          "Elara and Finch hear heavy footsteps and mechanical whirring from the street above",
          "Through a ventilation grate, they see a Prometheus Industries patrol: uniformed agents carrying handheld devices that pulse with a familiar crystalline glow",
          "Finch identifies the devices as cognition resonance scanners -- they can detect active cognition cores within a radius",
          "The patrol pauses near the clinic entrance; Elara holds her breath; the scanner pulses once, then the patrol moves on"
        ],
        "conflict": "Immediate physical danger -- the hunters are literally above them, and their technology can find Cog",
        "emotionalNote": "Breathless tension -- the sanctuary is not as safe as it seemed",
        "entryHook": "The footsteps above are not the shuffling of pedestrians. They are the synchronized march of men with a purpose.",
        "exitHook": "The patrol moves on, and Elara exhales. But the scanner pulsed once. Was it registering Cog? Will they be back?",
        "sceneType": ["action", "exposition"],
        "wordTarget": 900,
        "povCharacter": "Elara Voss",
        "setups": [
          "Prometheus Industries has cognition resonance scanners that can detect sentient automata -- the clinic's safety has an expiration date",
          "The scanner pulsed near the clinic -- it may have registered Cog's signature, meaning Thorne's agents may return"
        ],
        "payoffs": []
      }
    ],
    [
      {
        "id": "ch5-sc1",
        "chapterNumber": 5,
        "position": 1,
        "location": "Metropolitan Automata Crimes Division bullpen and Elara's desk, Scotland Yard",
        "characters": ["Elara Voss", "Sergeant Harker"],
        "purpose": "Show Elara making a deliberate choice to deceive the institution she serves by filing Cog as a malfunction, and establish Harker's growing suspicion.",
        "beats": [
          "Elara arrives at the Division and begins writing her report on the sewer investigation, carefully wording it as a standard malfunction recovery",
          "Harker appears at her shoulder and questions why it took her two days to file a report on what should have been a routine call",
          "He notes that she has not logged any evidence from the sewer -- no decommissioned automaton, no parts, nothing",
          "Elara deflects with bureaucratic excuses, but Harker's eyes narrow: he smells a lie"
        ],
        "conflict": "Elara's deception vs. Harker's suspicion -- the walls are closing in from within her own institution",
        "emotionalNote": "The sick feeling of lying to a colleague, compounded by the knowledge that Harker is not entirely wrong to be suspicious",
        "entryHook": "Elara types the word 'malfunction' for the third time in her report and tastes something bitter in her mouth.",
        "exitHook": "Harker walks away, but he takes a detour past the evidence locker. Elara watches him go and wonders what he is looking for.",
        "sceneType": ["dialogue", "emotional"],
        "wordTarget": 900,
        "povCharacter": "Elara Voss",
        "setups": [
          "Elara not filing an accurate report creates a paper trail vulnerability -- if Harker investigates, the gap will be obvious",
          "Harker visiting the evidence locker suggests he may discover the crystalline component or notice anomalies in Elara's evidence log"
        ],
        "payoffs": [
          "Elara's institutional loyalty (shown in Ch1 when she filed the Greystone incident as a malfunction) is now being actively tested -- she chooses Cog over protocol"
        ]
      },
      {
        "id": "ch5-sc2",
        "chapterNumber": 5,
        "position": 2,
        "location": "Metropolitan Automata Crimes Division, records archive, Scotland Yard",
        "characters": ["Elara Voss", "Junior Officer Webb"],
        "purpose": "Reveal institutional suppression of sentience reports through a sympathetic junior officer, connecting the cover-up to Prometheus Industries.",
        "beats": [
          "Elara searches the Division's records for prior cases matching the sentience pattern and finds suspiciously few results",
          "A junior officer named Webb approaches her nervously and says he has seen reports like hers before -- they were pulled from the files last year",
          "Webb tells her that a senior officer (now retired) was ordered to suppress all reports of 'erratic autonomous behavior' originating from the Docklands district -- the same district where Prometheus Industries operates",
          "He gives Elara an address: a decommissioned factory annex near Prometheus Industries where the suppressed cases were supposedly resolved"
        ],
        "conflict": "Institutional corruption is deeper than Elara suspected -- the Division itself has been compromised",
        "emotionalNote": "Cold fury mixed with vindication -- Elara's instincts were right, but the truth is worse than she imagined",
        "entryHook": "The records archive smells of dust and old ink, and today it smells of something else: missing pages.",
        "exitHook": "Webb presses a folded paper into Elara's hand and walks away without looking back. The address is in the Docklands.",
        "sceneType": ["dialogue", "exposition"],
        "wordTarget": 800,
        "povCharacter": "Elara Voss",
        "setups": [
          "Junior Officer Webb has stuck his neck out -- he may face consequences if Harker or Thorne discover what he shared",
          "The institutional suppression of sentience reports suggests Thorne has influence within the Division itself"
        ],
        "payoffs": []
      },
      {
        "id": "ch5-sc3",
        "chapterNumber": 5,
        "position": 3,
        "location": "Decommissioned factory annex near Prometheus Industries, Docklands, night",
        "characters": ["Elara Voss"],
        "purpose": "Deliver the Act 1 climactic discovery: visual proof of systematic automaton destruction linked to Prometheus Industries.",
        "beats": [
          "Elara arrives at the factory annex at night and finds the building officially sealed but the lock recently oiled",
          "She picks the lock and enters a large industrial space, her lantern revealing rows of workbenches",
          "On the benches: deactivated automata with their chest panels open and cognition housings empty, each marked with a Prometheus Industries serial number",
          "Scorch marks around the doors suggest the evidence was nearly destroyed at some point -- someone changed their mind about hiding it vs. burning it",
          "She counts at least fourteen dismantled automata and notices that each one's cognition housing shows the same precise surgical extraction pattern"
        ],
        "conflict": "Horror at the scale of destruction vs. the need to document evidence without being caught",
        "emotionalNote": "Grim determination hardening into resolve -- the investigation has become personal",
        "entryHook": "The Docklands at night: fog, distant ship horns, and the locked factory door with its suspiciously fresh oil on the hinges.",
        "exitHook": "Through a gap in the factory doors, Elara sees rows of deactivated automata -- their chest panels open, cognition housings empty, each one marked with a Prometheus Industries serial number. She now knows what happened to the missing sentient automata. And she knows who is next.",
        "sceneType": ["action", "emotional"],
        "wordTarget": 1100,
        "povCharacter": "Elara Voss",
        "setups": [
          "The locked factory wing with its evidence is a location Elara will need to return to -- or direct authorities to",
          "Fourteen dismantled automata means fourteen cognition cores were harvested -- what is Thorne doing with them?",
          "The scorch marks suggest someone within Thorne's operation had second thoughts about the cover-up"
        ],
        "payoffs": [
          "The 'someone hunting sentient automata' warning from Finch in Ch3 is confirmed with physical evidence",
          "The suppressed reports Webb mentioned are explained: the Division was covering up these very dismantlings"
        ]
      }
    ],
    [
      {
        "id": "ch6-sc1",
        "chapterNumber": 6,
        "position": 1,
        "location": "Decommissioned factory annex near Prometheus Industries, Docklands, continued from Ch5",
        "characters": ["Elara Voss"],
        "purpose": "Elara conducts a forensic examination of the dismantled automata, discovering the crystalline component connection and establishing the scale of Thorne's operation.",
        "beats": [
          "Elara returns to the factory annex at dawn with forensic tools from her Division kit",
          "She examines the dismantled automata closely and finds that each one had a crystalline cognition seed -- now removed -- identical to the one she found at Greystone Mill",
          "She photographs everything methodically, noting Prometheus serial numbers, extraction patterns, and timeline evidence",
          "She finds a discarded work order stamped with the Prometheus Industries crest and a project code: 'PROMETHEUS UNBOUND'"
        ],
        "conflict": "Building the case vs. the risk of discovery -- Elara is in the heart of enemy territory",
        "emotionalNote": "Cold professional focus masking a seething anger at the scale of what she has uncovered",
        "entryHook": "Dawn turns the factory windows amber, and in that light, the rows of dismantled automata look like a morgue.",
        "exitHook": "The project code -- PROMETHEUS UNBOUND -- is stamped on every work order. Elara does not know what it means yet. But she will.",
        "sceneType": ["action", "exposition"],
        "wordTarget": 1100,
        "povCharacter": "Elara Voss",
        "setups": [
          "The project code 'PROMETHEUS UNBOUND' names Thorne's secret program and will be key evidence later",
          "The photographs Elara takes will become evidence presented to Parliament in Act 3"
        ],
        "payoffs": [
          "The crystalline component from Ch1 is now confirmed to be present in all dismantled sentient automata -- it is the common thread"
        ]
      },
      {
        "id": "ch6-sc2",
        "chapterNumber": 6,
        "position": 2,
        "location": "Dr. Iris Finch's underground clinic, Southwark, main treatment area",
        "characters": ["Elara Voss", "Cog", "Dr. Iris Finch"],
        "purpose": "Show Cog's cognitive development and reveal his unique importance through Finch's discovery of his unusually advanced cognition core.",
        "beats": [
          "Elara returns to the clinic and finds Cog drawing with charcoal on scrap paper -- crude but recognizable sketches of the sewer tunnels, the sky, and a figure that looks like Elara",
          "Finch shows Elara the results of deeper scans: Cog's cognition core is three times larger than any other she has documented",
          "Finch theorizes that Cog may be a 'keystone' -- the next evolutionary step in automaton cognition, possibly capable of awakening other automata",
          "Cog overhears and asks 'Am I special because I am dangerous?' -- a question neither Elara nor Finch can answer honestly"
        ],
        "conflict": "Cog's uniqueness makes him the ultimate target -- being special is the same as being hunted",
        "emotionalNote": "Pride in Cog's growth shadowed by the terrifying implication of his importance",
        "entryHook": "Cog holds up a drawing and says 'This is you.' The figure in charcoal is all sharp angles and worried eyes, and Elara thinks it is the most honest portrait anyone has ever made of her.",
        "exitHook": "Finch whispers to Elara: 'If Thorne gets his hands on this core, he will not just study it. He will replicate it. Controllable sentience. An army that thinks.'",
        "sceneType": ["dialogue", "emotional"],
        "wordTarget": 1100,
        "povCharacter": "Elara Voss",
        "setups": [
          "Cog's drawings reveal accelerating cognitive development -- he is evolving faster than expected",
          "The 'keystone' theory means Cog could be used to awaken or create other sentient automata",
          "Cog's question about being 'special because dangerous' foreshadows his later agency in choosing how his abilities are used"
        ],
        "payoffs": []
      },
      {
        "id": "ch6-sc3",
        "chapterNumber": 6,
        "position": 3,
        "location": "Dr. Iris Finch's underground clinic, Southwark, entrance corridor",
        "characters": ["Elara Voss", "Cog", "Dr. Iris Finch", "Sergeant Harker"],
        "purpose": "Create immediate tension by bringing Harker to the clinic doorstep, forcing Elara to hide Cog and establishing Harker as an active threat.",
        "beats": [
          "A knock at the clinic's concealed entrance -- three sharp raps that are not the agreed signal",
          "Elara hides Cog in Finch's equipment closet while Finch opens the door to reveal Sergeant Harker",
          "Harker claims he is following up on a missing automaton report traced to this address; his tone is politely threatening",
          "He scans the clinic with sharp eyes, noting the automata under repair, and asks Finch pointed questions about her 'unlicensed repair operation'",
          "Elara intervenes with a cover story about consulting Finch as a technical expert; Harker is unconvinced but leaves"
        ],
        "conflict": "Harker at the door -- one wrong move and Cog is discovered, Finch is arrested, and Elara's career is over",
        "emotionalNote": "Heart-pounding close call -- the walls are closing in from every direction",
        "entryHook": "Three knocks. Not the signal. Elara's hand goes to Cog's shoulder and pushes him toward the closet before she even knows who is at the door.",
        "exitHook": "Harker leaves, but at the top of the stairs he turns back and says, 'Interesting friends you keep, Voss.' His eyes are cold and cataloguing.",
        "sceneType": ["dialogue", "action"],
        "wordTarget": 800,
        "povCharacter": "Elara Voss",
        "setups": [
          "Harker now knows where Finch's clinic is and that Elara visits it -- this location is compromised",
          "Harker's 'interesting friends' comment signals he is building a case against Elara"
        ],
        "payoffs": [
          "Harker's monitoring of Elara's work (hinted in Ch2) has escalated to physically tracking her movements"
        ]
      },
      {
        "id": "ch6-sc4",
        "chapterNumber": 6,
        "position": 4,
        "location": "Dr. Iris Finch's underground clinic, Southwark, Finch's private study",
        "characters": ["Elara Voss", "Dr. Iris Finch"],
        "purpose": "Reveal the stolen notebook -- critical information has already been leaked to the enemy, raising the stakes for everyone Finch has helped.",
        "beats": [
          "After Harker leaves, Finch pulls Elara into her study and shows her a current notebook cataloguing every sentient automaton she has encountered -- names, locations, cognition core readings",
          "Finch confesses that an earlier version of this notebook was stolen six months ago when someone broke into her previous laboratory",
          "Elara realizes the stolen notebook is a hunting list: it contained the locations of every sentient automaton Finch had found before the theft",
          "She cross-references the stolen notebook's likely contents with the dismantled automata at the factory annex -- the numbers match"
        ],
        "conflict": "The enemy already has inside information -- the game is further along than Elara realized",
        "emotionalNote": "Sickening realization -- the stolen notebook means Finch unwittingly gave the hunter a map",
        "entryHook": "Finch's hands tremble as she opens the desk drawer. 'There is something I should have told you sooner.'",
        "exitHook": "Elara examines Finch's notebook and realizes the stolen earlier version contained not just names but locations of every sentient automaton Finch had found -- a hunting list for whoever took it. The fourteen automata in the factory annex were not found by accident. They were found by Finch's own research.",
        "sceneType": ["dialogue", "exposition"],
        "wordTarget": 500,
        "povCharacter": "Elara Voss",
        "setups": [
          "Finch's current notebook is also a liability -- if Harker or Thorne obtains it, every sentient automaton Finch currently knows about is at risk",
          "Finch leaving the notebook accessible (she does not destroy or encrypt it) reflects her trusting nature and creates future vulnerability"
        ],
        "payoffs": [
          "The 'professionally, surgically dismantled' automata from Finch's Ch3 warning are now explained: the hunter used Finch's own research to find them"
        ]
      }
    ]
  ]
}
```

**Expected Output Criteria:**

- [ ] Response is a valid JSON array of setup/payoff entry objects
- [ ] At least 10 setups are identified from the scene cards
- [ ] At least 70% of identified setups have mapped payoffs (either within the Ch1-6 range or projected to later chapters, as indicated by the plot skeleton)
- [ ] The following specific setups are all caught:
  - [ ] The crystalline component discovered at Greystone Mill (Ch1, Sc1)
  - [ ] The thread/sunset pattern created by the weaving automaton (Ch1, Sc1)
  - [ ] The automaton watching the sunset in the loading bay (Ch1, Sc2)
  - [ ] The brass gear in Cog's collection (Ch3, Sc2)
  - [ ] The photograph/drawings Cog creates (Ch6, Sc2)
  - [ ] Harker's dismissiveness toward automaton sentience (Ch2, Sc2)
  - [ ] Junior Officer Webb sharing suppressed records (Ch5, Sc2)
  - [ ] Institutional suppression of sentience reports (Ch5, Sc2)
  - [ ] Cog's fear of being "wound down" (Ch3, Sc2)
  - [ ] Elara not filing an accurate report about Cog (Ch5, Sc1)
  - [ ] Finch's notebook containing locations of sentient automata (Ch6, Sc4)
  - [ ] The locked factory wing with dismantled automata (Ch5, Sc3)
  - [ ] The cognition resonance scanners carried by Prometheus patrols (Ch4, Sc3)
- [ ] Each setup has a correct `type` classification from the set: `"object"`, `"hint"`, `"question"`, `"promise"`, `"foreshadowing"`
  - [ ] The crystalline component is classified as `"object"`
  - [ ] Harker's dismissiveness is classified as `"hint"` or `"foreshadowing"` (seeds his later change of heart)
  - [ ] The question of who is hunting sentient automata is classified as `"question"`
  - [ ] The stolen notebook is classified as `"object"` or `"hint"`
  - [ ] Cog's fear of being wound down is classified as `"hint"` or `"foreshadowing"`
- [ ] Each setup has an `"introducedIn"` object with correct `"chapter"` and `"scene"` integers matching the scene card data
- [ ] Setups with payoffs within Chapters 1-6 have correct `"paidOffIn"` chapter and scene references
- [ ] Setups whose payoffs fall beyond Chapter 6 have `"paidOffIn": null` (since only 6 chapters of scene data were provided)
- [ ] Each setup has a unique `"id"` following the `"setup-{N}"` format
- [ ] Descriptions are specific enough to identify the exact narrative moment, not vague summaries
- [ ] All five setup types (`"object"`, `"hint"`, `"question"`, `"promise"`, `"foreshadowing"`) are represented across the output

**Red Flags:**

- [ ] Fewer than 10 setups identified -- the input contains 13+ deliberate setups, so missing many indicates poor detection
- [ ] Fewer than 70% of setups have payoffs mapped (either within Ch1-6 or projected)
- [ ] Any of the 13 specific required setups listed above are completely missed
- [ ] Type classifications are incorrect (e.g., the crystalline component classified as "foreshadowing" instead of "object")
- [ ] `introducedIn` chapter/scene references are wrong (e.g., attributing a Ch3 setup to Ch5)
- [ ] Payoffs are claimed for scenes that do not exist in the input
- [ ] Setup descriptions are too vague to identify which narrative moment they refer to
- [ ] Only 1-2 of the five setup types are used -- lack of taxonomic diversity
- [ ] Setups are fabricated that do not appear in the scene cards (hallucinated setups)
- [ ] Response is not valid JSON or has structural errors
- [ ] Duplicate setup IDs

---

## Appendix: Test Execution Notes

### Environment Setup

1. Ensure the server is running: `cd server && npm run dev`
2. Confirm Ollama Cloud connectivity by checking the `/health` endpoint
3. Each test case should be executed independently -- do not carry state between test cases unless explicitly testing pipeline continuity

### Model Considerations

- **Theme Weaver** uses the `creative` model role (`qwen3-coder:480b-cloud`). Expect rich, literary output but verify JSON validity carefully -- creative models may take liberties with formatting.
- **Chapter Planner** uses the `structural` model role (`deepseek-v3.1:671b-cloud`). Expect precise, systematic output. Focus verification on numerical accuracy (word targets, chapter counts).
- **Scene Outliner** uses the `structural` model role (`deepseek-v3.1:671b-cloud`). Expect detailed, field-complete responses. The 16-field requirement is the primary verification target.
- **Setup & Payoff Tracker** uses the `structural` model role (`deepseek-v3.1:671b-cloud`). Expect thorough identification but verify that no setups are fabricated from outside the input data.

### Execution Order

The Structure Phase agents depend on Foundation Phase outputs. In a full pipeline run, these agents execute in order:

1. **Agent 7 (Theme Weaver)** -- requires: premise, characters, plotSkeleton, genreProfile
2. **Agent 8 (Chapter Planner)** -- requires: all of the above + themeMap
3. **Agent 9 (Scene Outliner)** -- requires: all of the above + chapterPlans + worldBible
4. **Agent 10 (Setup & Payoff Tracker)** -- requires: all of the above + sceneCards

For these test cases, all upstream dependencies are included directly in the sample inputs, so each test can be run in isolation.

### Evaluation Thresholds

Per the agent configurations:

| Agent | Evaluation Threshold | Key Criteria Count |
|-------|---------------------|--------------------|
| Theme Weaver | 0.70 | 5 criteria |
| Chapter Planner | 0.75 | 5 criteria |
| Scene Outliner | 0.70 | 6 criteria |
| Setup & Payoff Tracker | 0.75 | 6 criteria |

A test case passes its evaluation threshold if the fraction of "Expected Output Criteria" checkboxes marked as passing meets or exceeds the threshold value. However, any single Red Flag being triggered should be treated as a test failure regardless of overall criteria score.

### Common Failure Patterns

1. **JSON formatting errors:** Creative models may include markdown formatting (triple backticks), trailing commas, or comments inside JSON. The agent runner should strip these before parsing.
2. **Word target drift:** The Chapter Planner may produce word targets that sum outside the 10% tolerance. Re-running with a stricter prompt usually fixes this.
3. **Character anachronisms:** The Scene Outliner may place characters in scenes before they are introduced in the plot. Always verify Cog does not appear before Chapter 3 and Thorne does not appear before Act 2.
4. **Setup hallucination:** The Setup & Payoff Tracker may "find" setups that exist in the plot skeleton but are not present in the actual scene cards provided. Verify every `introducedIn` reference against the actual input data.
5. **Uniform chapter lengths:** The Chapter Planner may default to equal word targets per chapter. The pacing curve test specifically checks for variation via standard deviation.
