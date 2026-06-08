# Agent Test Cases — Manual QA Plan

Comprehensive test cases for all 23 context agents in the NovelCraft pipeline.
Each file contains sample inputs, expected output criteria checklists, and red flags.

**Shared test story**: A detective in steampunk London discovers clockwork automata are gaining sentience.

## Files

| File | Phase | Agents | Test Cases |
|------|-------|--------|------------|
| [01-foundation-agents.md](01-foundation-agents.md) | Foundation | 6 (Premise Architect, Genre Analyst, World Builder, Character Architect, Relationship Mapper, Plot Architect) | 12 |
| [02-structure-agents.md](02-structure-agents.md) | Structure | 4 (Theme Weaver, Chapter Planner, Scene Outliner, Setup & Payoff Tracker) | 5 |
| [03-orchestration-agents.md](03-orchestration-agents.md) | Orchestration | 3 (Book Orchestrator, Continuity Keeper, Series Orchestrator) | 6 |
| [04-writing-agents.md](04-writing-agents.md) | Writing | 5 (Prose Writer, Atmosphere Writer, Dialogue Writer, Action Writer, Emotion Writer) | 6 |
| [05-revision-agents.md](05-revision-agents.md) | Revision | 6 (Voice Diversifier, Pacing Analyst, Cliche Hunter, Line Editor, Beta Reader Simulator, Setup & Payoff Verifier) | 6 |
| [05b-revision-agents-inverse.md](05b-revision-agents-inverse.md) | Revision (Inverse) | 6 (same agents, golden-path inputs) | 6 |
| [06-image-agent.md](06-image-agent.md) | Image | 1 (Cover Prompt Generator) | 3 |
| **Total** | **6 phases** | **25 agents** | **44 test cases** |

## How to use

1. Pick an agent file matching the pipeline phase you want to test
2. Copy the sample input JSON for the test case
3. Feed it to the agent (via API endpoint or direct invocation)
4. Walk through the **Expected Output Criteria** checklist — each item is pass/fail
5. Check the **Red Flags** list — any match is a failure
6. For LLM nondeterminism, run each test 2-3 times and evaluate consistency

## Test case types

- **Schema validation**: Does the output match the expected JSON structure?
- **Content quality**: Are field values specific, actionable, and genre-appropriate?
- **Mode behavior**: Does generate/expand/hybrid produce correctly different outputs?
- **Preservation**: Does expand mode honor user-provided details without contradiction?
- **Cross-agent consistency**: Do outputs from sequential agents align with each other?

## Prose samples included

The Writing and Revision test files contain **deliberately flawed prose** as inputs:
- A flat, atmosphere-free scene (for Atmosphere Writer)
- Same-sounding dialogue between two characters (for Dialogue Writer)
- A poorly-paced chase with no spatial coherence (for Action Writer)
- An emotionally shallow scene using "she felt X" throughout (for Emotion Writer)
- A scene saturated with 17+ cliches and AI-isms (for Cliche Hunter)
- A rough draft with systematic word repetition (for Line Editor)
- A 2000-word mini-manuscript with mixed quality (for Beta Reader Simulator)
- Clean and error-laden manuscripts (for Continuity Keeper)

These drafts are functional enough to follow the story but deliberately weak in the specific dimension each agent targets.

## Inverse (golden-path) test cases

The file `05b-revision-agents-inverse.md` contains **fixed versions** of the flawed prose from the revision tests. These "golden path" inputs should **pass** each revision agent without triggering issues:

- Distinct voices for all three characters (Voice Diversifier should score 8+)
- Consistently well-paced chapters with no dragging or rushing (Pacing Analyst should find zero issues)
- Clean, cliche-free prose with fresh imagery throughout (Cliche Hunter should return empty arrays)
- Already-polished prose with varied vocabulary and structure (Line Editor should return text ~90% unchanged)
- A strong two-chapter manuscript rated 8+ with no confusion points or boring parts (Beta Reader Simulator)
- A manuscript where all 8 setups are properly and satisfyingly paid off (Setup & Payoff Verifier should find zero orphans)

These tests verify that agents don't produce **false positives** — flagging good content as problematic.
