import type { AgentConfig } from './types.js';

// Foundation agents
import { premiseArchitect } from './foundation/premise-architect.js';
import { genreAnalyst } from './foundation/genre-analyst.js';
import { worldBuilder } from './foundation/world-builder.js';
import { characterArchitect } from './foundation/character-architect.js';
import { relationshipMapper } from './foundation/relationship-mapper.js';
import { plotArchitect } from './foundation/plot-architect.js';

// Structure agents
import { themeWeaver } from './structure/theme-weaver.js';
import { chapterPlanner } from './structure/chapter-planner.js';
import { sceneOutliner } from './structure/scene-outliner.js';
import { setupPayoffTracker } from './structure/setup-payoff-tracker.js';

// Orchestration agents
import { bookOrchestrator } from './orchestration/book-orchestrator.js';
import { continuityKeeper } from './orchestration/continuity-keeper.js';
import { seriesOrchestrator } from './orchestration/series-orchestrator.js';

// Writing agents
import { proseWriter } from './writing/prose-writer.js';
import { atmosphereWriter } from './writing/atmosphere-writer.js';
import { dialogueWriter } from './writing/dialogue-writer.js';
import { actionWriter } from './writing/action-writer.js';
import { emotionWriter } from './writing/emotion-writer.js';

// Quality agents
import { voiceDiversifier } from './quality/voice-diversifier.js';
import { pacingAnalyst } from './quality/pacing-analyst.js';
import { clicheHunter } from './quality/cliche-hunter.js';
import { lineEditor } from './quality/line-editor.js';
import { betaReaderSimulator } from './quality/beta-reader-simulator.js';
import { setupPayoffVerifier } from './quality/setup-payoff-verifier.js';

// Image agents
import { coverPromptGenerator } from './image/cover-prompt-generator.js';

const allAgents: AgentConfig[] = [
  // Foundation
  premiseArchitect,
  genreAnalyst,
  worldBuilder,
  characterArchitect,
  relationshipMapper,
  plotArchitect,
  // Structure
  themeWeaver,
  chapterPlanner,
  sceneOutliner,
  setupPayoffTracker,
  // Orchestration
  bookOrchestrator,
  continuityKeeper,
  seriesOrchestrator,
  // Writing
  proseWriter,
  atmosphereWriter,
  dialogueWriter,
  actionWriter,
  emotionWriter,
  // Quality
  voiceDiversifier,
  pacingAnalyst,
  clicheHunter,
  lineEditor,
  betaReaderSimulator,
  setupPayoffVerifier,
  // Image
  coverPromptGenerator,
];

const agentMap = new Map<string, AgentConfig>();
for (const agent of allAgents) {
  agentMap.set(agent.name, agent);
}

export function getAgent(name: string): AgentConfig {
  const agent = agentMap.get(name);
  if (!agent) {
    throw new Error(`Agent not found: ${name}`);
  }
  return agent;
}

export function getAllAgents(): AgentConfig[] {
  return allAgents;
}

export function getAgentsByCategory(category: string): AgentConfig[] {
  return allAgents.filter(a => a.category === category);
}
