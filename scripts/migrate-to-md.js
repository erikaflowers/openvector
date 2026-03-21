#!/usr/bin/env node

/**
 * Migration Script: JS Content → Markdown
 *
 * Reads all lesson/guide JS files from src/content/learn/
 * and converts them to markdown files with YAML frontmatter
 * in the content/ directory.
 *
 * Usage: node scripts/migrate-to-md.js
 */

import { readdir, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_LEARN = join(ROOT, 'src', 'content', 'learn');
const OUT_CURRICULUM = join(ROOT, 'content', 'curriculum');
const OUT_APPROACH = join(ROOT, 'content', 'approach');

// Level folders to process
const LEVEL_DIRS = [
  '00-orientation',
  '01-foundation',
  '02-the-medium',
  '03-the-pipeline',
  '04-orchestration',
  '05-auteur',
];

/**
 * Convert a sections array to markdown body text.
 */
function sectionsToMarkdown(sections) {
  if (!sections?.length) return '';

  const parts = [];

  for (const section of sections) {
    switch (section.type) {
      case 'text': {
        if (section.heading) {
          parts.push(`## ${section.heading}`);
          parts.push('');
        }
        for (const p of section.body) {
          parts.push(p);
          parts.push('');
        }
        break;
      }

      case 'callout': {
        parts.push(`> ${section.body}`);
        parts.push('');
        break;
      }

      case 'code': {
        parts.push('```');
        parts.push(section.body);
        parts.push('```');
        parts.push('');
        break;
      }

      case 'exercise': {
        const attrs = section.title ? `{title="${escapeAttr(section.title)}"}` : '';
        parts.push(`:::exercise${attrs}`);
        parts.push(section.body);
        parts.push(':::');
        parts.push('');
        break;
      }

      case 'template': {
        const attrs = section.title ? `{title="${escapeAttr(section.title)}"}` : '';
        parts.push(`:::template${attrs}`);
        parts.push(section.body);
        parts.push(':::');
        parts.push('');
        break;
      }

      case 'step': {
        const attrParts = [];
        if (section.number) attrParts.push(`number="${section.number}"`);
        if (section.title) attrParts.push(`title="${escapeAttr(section.title)}"`);
        const attrs = attrParts.length ? `{${attrParts.join(' ')}}` : '';
        parts.push(`:::step${attrs}`);
        for (const p of section.body) {
          parts.push(p);
          parts.push('');
        }
        // Remove trailing blank line inside directive
        if (parts[parts.length - 1] === '') parts.pop();
        parts.push(':::');
        parts.push('');
        break;
      }

      case 'resources': {
        const attrs = section.heading ? `{title="${escapeAttr(section.heading)}"}` : '';
        parts.push(`:::resources${attrs}`);
        for (const item of section.items) {
          const note = item.note ? ` — ${item.note}` : '';
          parts.push(`- [${item.title}](${item.url})${note}`);
        }
        parts.push(':::');
        parts.push('');
        break;
      }

      default:
        console.warn(`  Unknown section type: ${section.type}`);
        break;
    }
  }

  // Trim trailing blank lines
  while (parts.length && parts[parts.length - 1] === '') parts.pop();

  return parts.join('\n');
}

/**
 * Escape double quotes in directive attribute values.
 */
function escapeAttr(str) {
  return str.replace(/"/g, '\\"');
}

/**
 * Build frontmatter YAML from lesson metadata.
 */
function buildFrontmatter(lesson) {
  const meta = {};

  // Core fields
  meta.slug = lesson.slug;
  meta.title = lesson.title;
  if (lesson.subtitle) meta.subtitle = lesson.subtitle;
  if (lesson.duration) meta.duration = lesson.duration;
  if (lesson.status) meta.status = lesson.status;
  if (lesson.badge) meta.badge = lesson.badge;
  if (lesson.updatedAt) meta.updatedAt = lesson.updatedAt;

  // Approach-specific fields
  if (lesson.category) meta.category = lesson.category;
  if (lesson.prerequisites?.length) meta.prerequisites = lesson.prerequisites;

  // Knowledge check
  if (lesson.knowledgeCheck?.length) {
    meta.knowledgeCheck = lesson.knowledgeCheck;
  }

  return yaml.dump(meta, {
    lineWidth: -1,  // Don't wrap lines
    quotingType: "'",
    forceQuotes: false,
  }).trim();
}

/**
 * Convert a single lesson object to a markdown file string.
 */
function lessonToMarkdown(lesson) {
  const frontmatter = buildFrontmatter(lesson);
  const body = sectionsToMarkdown(lesson.content?.sections || []);
  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

/**
 * Process a single level directory.
 */
async function processLevel(levelDir) {
  const srcDir = join(SRC_LEARN, levelDir);
  const outDir = join(OUT_CURRICULUM, levelDir);
  await mkdir(outDir, { recursive: true });

  const files = await readdir(srcDir);
  const lessonFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');

  let count = 0;
  for (const file of lessonFiles) {
    const filePath = join(srcDir, file);
    try {
      const mod = await import(filePath);
      const lesson = mod.default;
      if (!lesson?.slug) {
        console.warn(`  Skipping ${file}: no slug`);
        continue;
      }

      const md = lessonToMarkdown(lesson);
      const outPath = join(outDir, `${lesson.slug}.md`);
      await writeFile(outPath, md, 'utf-8');
      count++;
      console.log(`  ✓ ${levelDir}/${lesson.slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err.message);
    }
  }

  return count;
}

/**
 * Process approach guides.
 */
async function processApproach() {
  const srcDir = join(SRC_LEARN, 'approach');
  const outDir = OUT_APPROACH;
  await mkdir(outDir, { recursive: true });

  const files = await readdir(srcDir);
  const guideFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js' && f !== '_template.js');

  let count = 0;
  for (const file of guideFiles) {
    const filePath = join(srcDir, file);
    try {
      const mod = await import(filePath);
      const guide = mod.default;
      if (!guide?.slug) {
        console.warn(`  Skipping ${file}: no slug`);
        continue;
      }

      const md = lessonToMarkdown(guide);
      const outPath = join(outDir, `${guide.slug}.md`);
      await writeFile(outPath, md, 'utf-8');
      count++;
      console.log(`  ✓ approach/${guide.slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err.message);
    }
  }

  return count;
}

// Main
async function main() {
  console.log('🔄 Migrating JS content to Markdown...\n');

  let total = 0;

  for (const levelDir of LEVEL_DIRS) {
    console.log(`📁 ${levelDir}/`);
    total += await processLevel(levelDir);
  }

  console.log(`\n📁 approach/`);
  total += await processApproach();

  console.log(`\n✅ Migration complete: ${total} files converted`);
  console.log(`   Output: content/curriculum/ and content/approach/`);
  console.log(`   Manifest: content/manifest.yaml (already created)`);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
