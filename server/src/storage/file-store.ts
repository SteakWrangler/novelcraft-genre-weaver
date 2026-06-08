import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { config } from '../config.js';
import type { SeriesBible, BookResult } from '../types/shared.js';
import type { BookProject } from '../types/project.js';

async function ensureDir(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

// Series Bibles

export async function listSeriesBibles(): Promise<SeriesBible[]> {
  const dir = config.storage.seriesBiblesDir;
  await ensureDir(dir);

  try {
    const files = await readdir(dir);
    const bibles: SeriesBible[] = [];

    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      try {
        const data = await readFile(join(dir, file), 'utf-8');
        bibles.push(JSON.parse(data));
      } catch {
        console.warn(`[FileStore] Failed to read series bible: ${file}`);
      }
    }

    return bibles;
  } catch {
    return [];
  }
}

export async function getSeriesBible(id: string): Promise<SeriesBible | null> {
  const filePath = join(config.storage.seriesBiblesDir, `${id}.json`);
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function saveSeriesBible(bible: SeriesBible): Promise<void> {
  await ensureDir(config.storage.seriesBiblesDir);
  const filePath = join(config.storage.seriesBiblesDir, `${bible.id}.json`);
  await writeFile(filePath, JSON.stringify(bible, null, 2), 'utf-8');
  console.log(`[FileStore] Saved series bible: ${bible.id}`);
}

// Generated Books

export async function saveBookResult(bookId: string, result: BookResult): Promise<void> {
  await ensureDir(config.storage.generatedBooksDir);
  const filePath = join(config.storage.generatedBooksDir, `${bookId}.json`);
  await writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[FileStore] Saved book result: ${bookId}`);
}

export async function saveProjectDebug(bookId: string, project: BookProject): Promise<void> {
  await ensureDir(config.storage.generatedBooksDir);
  const filePath = join(config.storage.generatedBooksDir, `${bookId}-debug.json`);

  // Serialize Maps and extract relevant debug data
  const debugData = {
    chapterPlans: project.structure.chapterPlans,
    sceneCards: project.structure.sceneCards,
    continuityLog: project.structure.continuityLog,
    setupLog: project.structure.setupLog,
    revision: {
      voiceNotes: project.revision.voiceNotes,
      pacingNotes: project.revision.pacingNotes,
      clicheNotes: project.revision.clicheNotes,
      setupPayoffNotes: project.revision.setupPayoffNotes,
      betaReaderReport: project.revision.betaReaderReport,
    },
    meta: {
      agentsRun: project.meta.agentsRun,
      tokensUsed: project.meta.tokensUsed,
      errors: project.meta.errors,
    },
  };

  await writeFile(filePath, JSON.stringify(debugData, null, 2), 'utf-8');
  console.log(`[FileStore] Saved project debug: ${bookId}`);
}

export async function getBookResult(bookId: string): Promise<BookResult | null> {
  const filePath = join(config.storage.generatedBooksDir, `${bookId}.json`);
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}
