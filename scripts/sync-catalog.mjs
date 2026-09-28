// Sync the curriculum catalog into Supabase (public.ov_lessons).
//
// Lesson content stays authored in src/content/learn/. This script
// flattens it into one row per lesson so other ZV surfaces (My ZV on
// zerovector.design) can join learner progress to titles, levels,
// ordering, and totals. Schema: zerovector repo,
// supabase/migrations/20260927000000_ov_lessons_catalog.sql
//
// Runs after `vite build` on Netlify production deploys only. It
// NEVER fails the build: any problem logs a warning and exits 0.
//
// Local run:  SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… node scripts/sync-catalog.mjs
// Dry run:    node scripts/sync-catalog.mjs --dry-run

import { build } from 'esbuild';
import { createClient } from '@supabase/supabase-js';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE_URL = 'https://open.zerovector.design/learn';
// Approach guides are a separate section but record progress the same
// way (key 'approach/<guide>'). They sort after every curriculum level.
const APPROACH_ORDER = 100;
const dryRun = process.argv.includes('--dry-run');

function warn(msg) {
  console.warn(`[sync-catalog] ${msg}`);
}

async function loadCurriculum() {
  // Content files use extensionless ESM imports, which Node can't
  // resolve directly. Bundle the aggregator to a temp file first.
  const dir = mkdtempSync(join(tmpdir(), 'ov-catalog-'));
  const outfile = join(dir, 'learn.mjs');
  try {
    await build({
      entryPoints: ['src/content/learn/index.js'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      logLevel: 'silent',
    });
    const mod = await import(pathToFileURL(outfile).href);
    return mod.default;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function toRows(learn, syncedAt) {
  const lessons = learn.levels.flatMap((level, levelIndex) =>
    level.lessons.map((lesson, lessonIndex) => ({
      lesson_key: `${level.slug}/${lesson.slug}`,
      level_slug: level.slug,
      level_number: level.number,
      level_title: level.title,
      level_order: levelIndex,
      lesson_slug: lesson.slug,
      lesson_title: lesson.title,
      lesson_order: lessonIndex,
      duration: lesson.duration || null,
      status: lesson.status || 'available',
      url: `${BASE_URL}/curriculum/${level.slug}/${lesson.slug}`,
      active: true,
      synced_at: syncedAt,
    }))
  );

  const guides = (learn.approach?.guides || []).map((guide, i) => ({
    lesson_key: `approach/${guide.slug}`,
    level_slug: 'approach',
    level_number: 'A',
    level_title: learn.approach.title || 'The Approach',
    level_order: APPROACH_ORDER,
    lesson_slug: guide.slug,
    lesson_title: guide.title,
    lesson_order: i,
    duration: guide.duration || null,
    status: guide.status || 'available',
    url: `${BASE_URL}/approach/${guide.category}/${guide.slug}`,
    active: true,
    synced_at: syncedAt,
  }));

  return [...lessons, ...guides];
}

async function main() {
  const isNetlify = !!process.env.NETLIFY;
  if (isNetlify && process.env.CONTEXT !== 'production') {
    console.log(`[sync-catalog] skipped (context: ${process.env.CONTEXT})`);
    return;
  }

  const learn = await loadCurriculum();
  const syncedAt = new Date().toISOString();
  const rows = toRows(learn, syncedAt);
  console.log(`[sync-catalog] ${learn.levels.length} levels + approach guides, ${rows.length} rows`);

  if (dryRun) {
    rows.forEach((r) => console.log(`  ${r.level_order}.${r.lesson_order}  ${r.lesson_key}  "${r.lesson_title}"`));
    return;
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    warn('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set; skipping');
    return;
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { error: upsertError } = await supabase
    .from('ov_lessons')
    .upsert(rows, { onConflict: 'lesson_key' });
  if (upsertError) throw upsertError;

  // Anything not touched by this sync was removed from the curriculum.
  // Keep it (old progress still needs a title) but mark it inactive.
  const { error: staleError, count } = await supabase
    .from('ov_lessons')
    .update({ active: false }, { count: 'exact' })
    .lt('synced_at', syncedAt)
    .eq('active', true);
  if (staleError) throw staleError;

  console.log(`[sync-catalog] upserted ${rows.length}, deactivated ${count ?? 0}`);
}

main().catch((err) => {
  warn(`failed, build continues: ${err.message || err}`);
});
