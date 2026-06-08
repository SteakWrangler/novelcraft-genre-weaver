import { jobManager } from '../jobs/manager.js';
import { createBookProject } from '../types/project.js';
import { executeFoundation } from './phases/foundation.js';
import { executeStructure } from './phases/structure.js';
import { executeSeriesOrchestration } from './phases/series.js';
import { executeDrafting } from './phases/drafting.js';
import { executeRevision } from './phases/revision.js';
import { executeImage } from './phases/image.js';
import { executeOutput } from './phases/output.js';
import { deriveAudienceStyle } from './mode-resolver.js';
import type { BookRequest, BookResult } from '../types/shared.js';

/**
 * Main workflow engine. Executes the 6-phase book generation pipeline.
 * Called asynchronously — the API route fires and forgets.
 */
export async function executeWorkflow(jobId: string, request: BookRequest): Promise<BookResult> {
  console.log(`[Workflow] Starting job ${jobId}`);
  const project = createBookProject(request);

  // Derive audience style from format
  project.derived.audienceStyle = deriveAudienceStyle(request.settings);

  try {
    // Phase 1: Foundation
    const foundationStart = Date.now();
    jobManager.updateProgress(jobId, 'foundation', 'Starting foundation phase...', 1);
    await executeFoundation(jobId, project);
    project.meta.phaseDurations.foundation = Date.now() - foundationStart;

    // Phase 2: Structure
    const structureStart = Date.now();
    jobManager.updateProgress(jobId, 'structure', 'Starting structure phase...', 19);
    await executeStructure(jobId, project);
    project.meta.phaseDurations.structure = Date.now() - structureStart;

    // Series Orchestrator (conditional — only if series mode is active)
    if (project.request.seriesFields?.seriesMode) {
      jobManager.updateProgress(jobId, 'structure', 'Building series bible...', 34);
      await executeSeriesOrchestration(jobId, project);
    }

    // Phase 3: Drafting
    const draftingStart = Date.now();
    jobManager.updateProgress(jobId, 'drafting', 'Starting drafting phase...', 35);
    await executeDrafting(jobId, project);
    project.meta.phaseDurations.drafting = Date.now() - draftingStart;

    // Phase 4: Revision
    const revisionStart = Date.now();
    jobManager.updateProgress(jobId, 'revision', 'Starting revision phase...', 76);
    await executeRevision(jobId, project);
    project.meta.phaseDurations.revision = Date.now() - revisionStart;

    // Phase 5: Image
    const imageStart = Date.now();
    jobManager.updateProgress(jobId, 'image', 'Starting image phase...', 90);
    await executeImage(jobId, project);
    project.meta.phaseDurations.image = Date.now() - imageStart;

    // Phase 6: Output
    const outputStart = Date.now();
    jobManager.updateProgress(jobId, 'output', 'Assembling final output...', 95);
    const result = await executeOutput(jobId, project);
    project.meta.phaseDurations.output = Date.now() - outputStart;

    // Mark complete
    jobManager.complete(jobId, result);
    console.log(`[Workflow] Job ${jobId} completed successfully`);
    return result;

  } catch (error: any) {
    if (error.message === 'Job cancelled by user') {
      console.log(`[Workflow] Job ${jobId} was cancelled`);
      // Job already marked cancelled by the cancel handler
    } else {
      console.error(`[Workflow] Job ${jobId} failed:`, error);
      jobManager.fail(jobId, error.message || 'Unknown workflow error');
    }
    throw error;
  }
}
