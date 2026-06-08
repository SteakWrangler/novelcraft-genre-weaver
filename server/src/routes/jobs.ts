import { Router } from 'express';
import { jobManager } from '../jobs/manager.js';

const router = Router();

/**
 * GET /api/jobs/:jobId/progress
 * Returns current progress for a generation job.
 */
router.get('/:jobId/progress', (req, res) => {
  const { jobId } = req.params;
  const progress = jobManager.getProgress(jobId);

  if (!progress) {
    res.status(404).json({ error: `Job not found: ${jobId}` });
    return;
  }

  res.json(progress);
});

/**
 * GET /api/jobs/:jobId/result
 * Returns the completed book result.
 */
router.get('/:jobId/result', (req, res) => {
  const { jobId } = req.params;
  const result = jobManager.getResult(jobId);

  if (!result) {
    const progress = jobManager.getProgress(jobId);
    if (!progress) {
      res.status(404).json({ error: `Job not found: ${jobId}` });
      return;
    }
    if (progress.status !== 'completed') {
      res.status(409).json({ error: `Job is not completed yet (status: ${progress.status})` });
      return;
    }
    res.status(404).json({ error: 'Result not available' });
    return;
  }

  res.json(result);
});

/**
 * DELETE /api/jobs/:jobId
 * Cancels a running generation job.
 */
router.delete('/:jobId', (req, res) => {
  const { jobId } = req.params;
  const progress = jobManager.getProgress(jobId);

  if (!progress) {
    res.status(404).json({ error: `Job not found: ${jobId}` });
    return;
  }

  jobManager.cancel(jobId);
  res.json({ message: 'Job cancelled' });
});

export default router;
