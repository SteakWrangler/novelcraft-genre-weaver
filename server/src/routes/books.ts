import { Router } from 'express';
import { jobManager } from '../jobs/manager.js';
import { executeWorkflow } from '../workflow/engine.js';
import type { BookRequest } from '../types/shared.js';

const router = Router();

/**
 * POST /api/books/generate
 * Starts a new book generation job. Returns immediately with a jobId.
 */
router.post('/generate', (req, res) => {
  try {
    const request = req.body as BookRequest;

    if (!request.settings) {
      res.status(400).json({ error: 'Missing settings in request body' });
      return;
    }

    const jobId = jobManager.create(request);

    // Fire-and-forget: start workflow in background
    executeWorkflow(jobId, request).catch(error => {
      console.error(`[Books] Workflow failed for job ${jobId}:`, error);
      jobManager.fail(jobId, error.message || 'Unknown error');
    });

    res.json({ jobId });
  } catch (error: any) {
    console.error('[Books] Failed to start generation:', error);
    res.status(500).json({ error: error.message || 'Failed to start generation' });
  }
});

export default router;
