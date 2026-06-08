import { Router } from 'express';
import { listSeriesBibles, getSeriesBible, saveSeriesBible } from '../storage/file-store.js';
import { randomUUID } from 'crypto';
import type { SeriesBible } from '../types/shared.js';

const router = Router();

/**
 * GET /api/series
 * Returns all series bibles.
 */
router.get('/', async (_req, res) => {
  try {
    const bibles = await listSeriesBibles();
    res.json(bibles);
  } catch (error: any) {
    console.error('[Series] Failed to list series:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/series/:id
 * Returns a specific series bible.
 */
router.get('/:id', async (req, res) => {
  try {
    const bible = await getSeriesBible(req.params.id);
    if (!bible) {
      res.status(404).json({ error: 'Series bible not found' });
      return;
    }
    res.json(bible);
  } catch (error: any) {
    console.error('[Series] Failed to get series:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/series
 * Creates a new series bible.
 */
router.post('/', async (req, res) => {
  try {
    const bible: SeriesBible = {
      id: randomUUID(),
      seriesName: req.body.seriesName || 'Untitled Series',
      books: req.body.books || [],
      overallArc: req.body.overallArc || '',
      characters: req.body.characters || [],
      worldDetails: req.body.worldDetails || '',
      timeline: req.body.timeline || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await saveSeriesBible(bible);
    res.status(201).json(bible);
  } catch (error: any) {
    console.error('[Series] Failed to create series:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
