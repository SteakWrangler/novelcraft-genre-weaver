import { Router } from 'express';
import { getAgent, getAllAgents } from '../agents/registry.js';
import { runAgent } from '../agents/runner.js';
import type { PromptContext } from '../agents/types.js';
import type { AgentMode } from '../types/project.js';

const router = Router();

/**
 * GET /api/test/agents
 * Lists all available agents with their metadata.
 */
router.get('/agents', (_req, res) => {
  const agents = getAllAgents().map(a => ({
    name: a.name,
    displayName: a.displayName,
    category: a.category,
    model: a.model,
    outputFormat: a.output.format,
    storeAs: a.output.storeAs,
    supportedModes: a.mode?.supported || ['generate'],
    inputField: a.mode?.inputField,
    expandThreshold: a.mode?.expandThreshold,
  }));
  res.json({ count: agents.length, agents });
});

/**
 * POST /api/test/agent/:name
 * Invokes a single agent with a PromptContext and returns the result.
 *
 * Body: {
 *   context: Partial<PromptContext>,  // merged with defaults
 *   mode?: "generate" | "expand" | "hybrid"  // defaults to "generate"
 * }
 */
router.post('/agent/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const agentConfig = getAgent(name);
    const mode: AgentMode = req.body.mode || 'generate';
    const contextInput = req.body.context || {};

    // Merge with defaults so agents don't crash on missing fields
    const context: PromptContext = {
      title: '',
      genres: [],
      description: '',
      plotOutline: '',
      characterDetails: '',
      settingDetails: '',
      themes: '',
      avoidList: [],
      specialRequests: '',
      inspirations: '',
      contentRating: 'PG-13',
      audienceStyle: 'adult',
      perspective: 'third-person',
      happyEnding: true,
      bigTwist: false,
      romanticSubplot: false,
      targetWordCount: 80000,
      ...contextInput,
    };

    console.log(`\n[Test] Invoking ${agentConfig.displayName} in ${mode} mode`);
    const startTime = Date.now();

    const result = await runAgent(agentConfig, context, mode);

    res.json({
      agent: agentConfig.name,
      displayName: agentConfig.displayName,
      mode,
      model: result.model,
      duration: result.duration,
      tokensUsed: result.tokensUsed,
      promptTokens: result.promptTokens,
      outputFormat: agentConfig.output.format,
      output: result.output,
      rawResponse: result.rawResponse,
    });
  } catch (error: any) {
    console.error(`[Test] Agent ${name} failed:`, error);
    res.status(error.message?.includes('not found') ? 404 : 500).json({
      error: error.message || 'Agent execution failed',
    });
  }
});

export default router;
