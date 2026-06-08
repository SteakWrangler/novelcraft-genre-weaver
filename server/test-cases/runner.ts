/**
 * Test Case Runner — parses markdown test case files, invokes agents via the test harness API,
 * and saves results to a JSON file.
 *
 * Usage: npx tsx test-cases/runner.ts [--file 01-foundation-agents.md] [--agent premise-architect] [--dry-run]
 */

import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:8000/api/test';

interface TestCase {
  id: string;
  file: string;
  agentSlug: string;
  agentDisplayName: string;
  mode: string;
  description: string;
  context: Record<string, any>;
}

interface TestResult {
  testCase: TestCase;
  status: 'pass' | 'fail' | 'error';
  duration: number;
  tokensUsed: number;
  model: string;
  output: any;
  rawResponse?: string;
  error?: string;
}

// --- Markdown Parser ---

function displayNameToSlug(name: string): string {
  // "Theme Weaver" → "theme-weaver", "Setup & Payoff Tracker" → "setup-payoff-tracker"
  return name
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\band\b/g, '')   // "Setup and Payoff" → "Setup  Payoff"
    .replace(/-{2,}/g, '-')    // collapse double hyphens
    .replace(/^-|-$/g, '');    // trim leading/trailing hyphens
}

function extractAgentSlug(agentFileStr: string): string {
  const match = agentFileStr.match(/\/([^/]+)\.ts/);
  return match ? match[1] : '';
}

function resolveAgentSlug(section: string, headerDisplayName: string): string {
  // 1. Try explicit **Agent file**: line
  const agentFileMatch = section.match(/\*\*Agent file\*\*:\s*`?([^`\n]+)`?/);
  if (agentFileMatch) {
    const slug = extractAgentSlug(agentFileMatch[1]);
    if (slug) return slug;
  }

  // 2. Try backtick slug in agent header: "Cover Prompt Generator (`cover-prompt-generator`)"
  const backtickMatch = headerDisplayName.match(/\(`([^)]+)`\)/);
  if (backtickMatch) return backtickMatch[1];

  // 3. Derive from display name
  const cleanName = headerDisplayName.replace(/\s*\(.*\)/, '').trim();
  return displayNameToSlug(cleanName);
}

function inferMode(headerText: string, bodyText: string): string {
  // Check header first
  if (/generate\s+mode/i.test(headerText)) return 'generate';
  if (/expand\s+mode/i.test(headerText)) return 'expand';
  if (/hybrid\s+mode/i.test(headerText)) return 'hybrid';

  // Check for explicit mode line in body
  const modeMatch = bodyText.match(/\*\*(?:Agent\s+)?Mode\*\*:\s*`(\w+)`/i);
  if (modeMatch) return modeMatch[1];

  // Check for **Mode**: `mode` pattern
  const modeMatch2 = bodyText.match(/\*\*Mode\*\*:\s*`(\w+)`/);
  if (modeMatch2) return modeMatch2[1];

  return 'generate';
}

function extractCodeBlocks(text: string): { lang: string; content: string }[] {
  const blocks: { lang: string; content: string }[] = [];
  const regex = /```(\w*)\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ lang: match[1] || '', content: match[2].trim() });
  }
  return blocks;
}

/**
 * Extracts inline context fields from markdown text like:
 *   - `perspective`: `"third person limited"`
 *   - `genres`: `["mystery", "steampunk"]`
 *   - `characters`: (full profiles for Elara and Finch -- description text)
 */
function extractInlineFields(text: string): Record<string, any> {
  const fields: Record<string, any> = {};

  // Match: - `fieldName`: `value` or - `fieldName`: `"value"` or - `fieldName`: (description)
  const regex = /[-*]\s*`(\w+)`\s*:\s*(?:`([^`]+)`|"([^"]+)"|(\([^)]+\))|(.+?)(?:\n|$))/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const fieldName = match[1];
    const rawValue = (match[2] || match[3] || match[4] || match[5] || '').trim();

    // Skip if it looks like a section header or instruction, not a field value
    if (!rawValue || rawValue.startsWith('POST') || rawValue.startsWith('**')) continue;

    // Try to parse as JSON (handles arrays, objects, quoted strings)
    try {
      fields[fieldName] = JSON.parse(rawValue);
    } catch {
      // Strip surrounding quotes if present
      const unquoted = rawValue.replace(/^["']|["']$/g, '');
      fields[fieldName] = unquoted;
    }
  }

  return fields;
}

function getInputSection(testSection: string): string {
  // Get text before "Expected Output" or "Pass Criteria" or "Red Flags" sections
  const cutoffs = [
    /^#{2,4}\s*Expected Output/im,
    /^#{2,4}\s*Pass Criteria/im,
    /^#{2,4}\s*Red Flags/im,
    /^#{2,4}\s*Evaluation/im,
  ];

  let text = testSection;
  for (const cutoff of cutoffs) {
    const parts = text.split(cutoff);
    if (parts.length > 1) text = parts[0];
  }

  // Also strip "Expected output structure" JSON blocks (03-orchestration has these)
  // by cutting at "**Expected output" or "**What the output should"
  const expectedIdx = text.search(/\*\*Expected output/i);
  if (expectedIdx > 0) text = text.substring(0, expectedIdx);

  return text;
}

function parseTestCaseFile(filePath: string): TestCase[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const testCases: TestCase[] = [];

  // Split by agent sections — match both "## Agent N:" and standalone agent headers
  const agentSplitRegex = /^## Agent \d+:\s*/m;
  const agentHeaders = [...content.matchAll(/^## Agent \d+:\s*(.+)/gm)];
  const agentSections = content.split(agentSplitRegex);

  // The first split chunk is the file preamble, skip it
  for (let i = 1; i < agentSections.length; i++) {
    const section = agentSections[i];
    const headerDisplayName = agentHeaders[i - 1]?.[1]?.trim() || '';
    const agentSlug = resolveAgentSlug(section, headerDisplayName);
    const agentDisplayName = headerDisplayName.replace(/\s*\(.*\)/, '').trim();

    if (!agentSlug) continue;

    // Split by test cases — handle both ### and ## Test Case headers
    const testSplitRegex = /^#{2,3}\s*Test Case\s*/m;
    const testHeaders = [...section.matchAll(/^#{2,3}\s*Test Case\s*(.+)/gm)];
    const testSections = section.split(testSplitRegex);

    for (let j = 1; j < testSections.length; j++) {
      const testSection = testSections[j];
      const testHeaderLine = testHeaders[j - 1]?.[1]?.trim() || '';

      // Parse test ID and description: "1A: Generate Mode" or "19.1: Description" or "A: Full Context"
      const headerMatch = testHeaderLine.match(/^([\w.]+(?:\s*\(Inverse\))?)\s*:\s*(.+)/);
      if (!headerMatch) continue;

      const testId = headerMatch[1].trim();
      const description = headerMatch[2].trim();

      // Get only the input section (before expected output criteria)
      const inputSection = getInputSection(testSection);
      const mode = inferMode(description, inputSection);

      // Extract all code blocks from input section
      const codeBlocks = extractCodeBlocks(inputSection);

      // Also extract inline context fields from markdown: `- \`field\`: \`value\``
      // or `- \`field\`: "value"` or `- \`field\`: (description text)`
      const inlineFields = extractInlineFields(inputSection);

      if (codeBlocks.length === 0 && Object.keys(inlineFields).length === 0) continue;

      // Merge into a single context object
      let context: Record<string, any> = {};
      for (const block of codeBlocks) {
        if (block.lang === 'json' || block.content.startsWith('{')) {
          try {
            const parsed = JSON.parse(block.content);
            // If parsed is an object, merge; if it's something else, wrap it
            if (typeof parsed === 'object' && !Array.isArray(parsed)) {
              context = { ...context, ...parsed };
            }
          } catch {
            // JSON parse failed — could be non-standard JSON, skip it
          }
        } else if (block.content.length > 100) {
          // Non-JSON code block with prose content — use chapterContent for scene drafts,
          // fullManuscript only when explicitly marked with "CHAPTER" dividers
          if (context.currentChapter !== undefined) {
            context.chapterContent = (context.chapterContent || '') + block.content;
          } else if (block.content.includes('CHAPTER') || block.content.includes('--- Chapter')) {
            context.fullManuscript = block.content;
          } else {
            context.chapterContent = block.content;
          }
        }
      }

      // Merge inline fields (these override code block values if there's a conflict)
      context = { ...context, ...inlineFields };

      if (Object.keys(context).length === 0) continue;

      testCases.push({
        id: testId,
        file: fileName,
        agentSlug,
        agentDisplayName,
        mode,
        description,
        context,
      });
    }
  }

  return testCases;
}

// --- API Client ---

async function invokeAgent(testCase: TestCase): Promise<TestResult> {
  const url = `${API_BASE}/agent/${testCase.agentSlug}`;
  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: testCase.mode,
        context: testCase.context,
      }),
    });

    const data = await response.json() as any;
    const duration = Date.now() - startTime;

    if (!response.ok) {
      return {
        testCase,
        status: 'error',
        duration,
        tokensUsed: 0,
        model: '',
        output: null,
        error: data.error || `HTTP ${response.status}`,
      };
    }

    // Basic validation: did we get output?
    const hasOutput = data.output !== null && data.output !== undefined;
    const isJsonAgent = data.outputFormat === 'json';
    const gotValidJson = isJsonAgent ? (typeof data.output === 'object' && !data.output.rawText) : true;

    return {
      testCase,
      status: hasOutput && gotValidJson ? 'pass' : 'fail',
      duration: data.duration || duration,
      tokensUsed: data.tokensUsed || 0,
      model: data.model || '',
      output: data.output,
      rawResponse: data.rawResponse,
      error: !hasOutput ? 'No output received' : (!gotValidJson ? 'JSON parsing failed' : undefined),
    };
  } catch (error: any) {
    return {
      testCase,
      status: 'error',
      duration: Date.now() - startTime,
      tokensUsed: 0,
      model: '',
      output: null,
      error: error.message || 'Fetch failed',
    };
  }
}

// --- Main Runner ---

async function main() {
  const args = process.argv.slice(2);
  const fileFilter = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
  const agentFilter = args.includes('--agent') ? args[args.indexOf('--agent') + 1] : null;
  const dryRun = args.includes('--dry-run');

  const testDir = path.dirname(new URL(import.meta.url).pathname);
  const mdFiles = fs.readdirSync(testDir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .filter(f => !fileFilter || f === fileFilter || f.includes(fileFilter))
    .sort();

  console.log(`\n  Test Case Runner`);
  console.log(`  ${'='.repeat(50)}`);
  console.log(`  Files: ${mdFiles.join(', ')}`);
  if (agentFilter) console.log(`  Agent filter: ${agentFilter}`);
  console.log('');

  // Parse all test cases
  let allTestCases: TestCase[] = [];
  for (const file of mdFiles) {
    const filePath = path.join(testDir, file);
    const cases = parseTestCaseFile(filePath);
    allTestCases.push(...cases);
    console.log(`  Parsed ${file}: ${cases.length} test cases`);
  }

  if (agentFilter) {
    allTestCases = allTestCases.filter(tc => tc.agentSlug === agentFilter || tc.agentSlug.includes(agentFilter));
  }

  console.log(`\n  Total test cases to run: ${allTestCases.length}`);

  if (dryRun) {
    console.log('\n  [DRY RUN] Test cases found:\n');
    for (const tc of allTestCases) {
      console.log(`  ${tc.id.padEnd(16)} ${tc.agentSlug.padEnd(25)} ${tc.mode.padEnd(10)} ${tc.file}`);
    }
    return;
  }

  // Check server is reachable (Ollama ping may fail even when API works — /api root returns 404)
  try {
    const health = await fetch(`${API_BASE.replace('/test', '/health')}`);
    if (!health.ok) throw new Error(`HTTP ${health.status}`);
    console.log('  Server: connected\n');
  } catch {
    console.error('\n  ERROR: Cannot reach server at localhost:8000. Start the server first.');
    process.exit(1);
  }

  // Run test cases sequentially
  const results: TestResult[] = [];
  let passed = 0, failed = 0, errors = 0;

  for (let i = 0; i < allTestCases.length; i++) {
    const tc = allTestCases[i];
    const progress = `[${i + 1}/${allTestCases.length}]`;
    process.stdout.write(`  ${progress} ${tc.agentSlug} (${tc.id}, ${tc.mode})... `);

    const result = await invokeAgent(tc);
    results.push(result);

    if (result.status === 'pass') {
      passed++;
      console.log(`PASS (${(result.duration / 1000).toFixed(1)}s, ${result.tokensUsed} tokens)`);
    } else if (result.status === 'fail') {
      failed++;
      console.log(`FAIL — ${result.error || 'invalid output'}`);
    } else {
      errors++;
      console.log(`ERROR — ${result.error}`);
    }
  }

  // Summary
  console.log(`\n  ${'='.repeat(50)}`);
  console.log(`  Results: ${passed} passed, ${failed} failed, ${errors} errors (${allTestCases.length} total)`);

  const totalTokens = results.reduce((sum, r) => sum + r.tokensUsed, 0);
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  console.log(`  Tokens: ${totalTokens.toLocaleString()} | Duration: ${(totalDuration / 1000).toFixed(0)}s\n`);

  // Save results
  const outPath = path.join(testDir, 'results.json');
  const serializable = results.map(r => ({
    ...r,
    rawResponse: undefined, // omit raw response from saved file to keep it manageable
  }));
  fs.writeFileSync(outPath, JSON.stringify(serializable, null, 2));
  console.log(`  Results saved to ${outPath}\n`);

  // Print failures/errors
  const problemResults = results.filter(r => r.status !== 'pass');
  if (problemResults.length > 0) {
    console.log('  Failed/errored test cases:');
    for (const r of problemResults) {
      console.log(`    ${r.testCase.id} (${r.testCase.agentSlug}): ${r.error}`);
    }
    console.log('');
  }

  process.exit(errors > 0 ? 2 : failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Runner crashed:', err);
  process.exit(2);
});
