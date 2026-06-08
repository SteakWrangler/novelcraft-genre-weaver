import { randomUUID } from 'crypto';
import { jobManager } from '../../jobs/manager.js';
import { saveBookResult, saveProjectDebug } from '../../storage/file-store.js';
import type { BookProject } from '../../types/project.js';
import type { BookResult, Chapter, PhaseMetadata } from '../../types/shared.js';

/**
 * Phase 6: Output
 * Assembles chapters into the final BookResult.
 */
export async function executeOutput(jobId: string, project: BookProject): Promise<BookResult> {
  jobManager.updateProgress(jobId, 'output', 'Assembling final manuscript...', 96);

  const chapterNumbers = Array.from(project.drafts.chapters.keys()).sort((a, b) => a - b);

  // Build chapters array
  const chapters: Chapter[] = chapterNumbers.map(num => {
    const content = project.drafts.chapters.get(num) || '';
    const plan = project.structure.chapterPlans?.find(
      (p: any) => (p.chapterNumber || 0) === num
    );

    return {
      number: num,
      title: plan?.title || `Chapter ${num}`,
      content,
      wordCount: countWords(content),
    };
  });

  // Assemble full manuscript
  const manuscript = chapters.map(ch =>
    `# ${ch.title}\n\n${ch.content}`
  ).join('\n\n---\n\n');

  // Determine title
  const title = project.output.title
    || project.foundation.premise?.logline?.split('.')[0]
    || project.request.settings.description?.split(' ').slice(0, 8).join(' ')
    || 'Untitled Book';

  const duration = Date.now() - project.meta.startedAt.getTime();

  // Build phase metadata
  const phases: PhaseMetadata[] = Object.entries(project.meta.phaseDurations).map(
    ([phase, dur]) => ({
      phase: phase as any,
      duration: dur,
      tokensUsed: 0, // Approximate — we don't track per-phase tokens yet
    })
  );

  const bookResult: BookResult = {
    bookId: randomUUID(),
    title,
    content: manuscript,
    chapters,
    coverImageUrl: project.output.coverImageUrl,
    generationMetadata: {
      totalTokensUsed: project.meta.tokensUsed,
      actualCost: 0, // Ollama Cloud cost tracking TBD
      generationDuration: duration,
      model: 'multiple (Ollama Cloud)',
      phases,
    },
  };

  // Save to disk
  await saveBookResult(bookResult.bookId, bookResult);

  // Save debug data (structure, revision notes, agents run) for diagnostics
  await saveProjectDebug(bookResult.bookId, project);

  console.log(`[Output] Book assembled: "${title}" — ${chapters.length} chapters, ${countWords(manuscript)} words, ${duration}ms`);

  return bookResult;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}
