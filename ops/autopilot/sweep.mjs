// Stage 5b: FRESHNESS SWEEP. Stale-proofing does not wait for the news.
// Every day, re-verify the `sweep.perDay` lessons verified longest ago (never-verified first, most volatile
// first) against their official sources. Outdated claims become T1 changes appended to today's brief, so
// publish.mjs drafts, audits and opens them for the Desk. Every lesson checked gets a dated entry in the
// freshness ledger ($OV_STATE/freshness.json); coverage = lessons verified within `sweep.targetDays`.
// Output: runs/<date>/sweep.json, verify/<slug>.json. Runs after the brief, before publish.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { HERE, REPO, STATE, loadYaml, readJson, writeJson, runDir } from './lib.mjs';
import { runStage } from './stage.mjs';

const config = loadYaml('config.yaml');
const { perDay = 4, targetDays = 30 } = config.sweep || {};
const dir = runDir();
const date = path.basename(dir);
const ledgerPath = path.join(STATE, 'freshness.json');
const ledger = readJson(ledgerPath, {});
const topic = yaml.load(fs.readFileSync(path.join(HERE, 'topic-map.yaml'), 'utf8'));
const briefPath = path.join(dir, 'brief.json');
const brief = readJson(briefPath, null);

// Skip lessons that an open PR or today's brief already touches: no overlapping edits.
const busy = new Set([
  ...readJson(path.join(dir, 'pending.json'), []).flatMap((p) => p.files),
  ...(brief?.changes || []).flatMap((c) => c.files),
]);

const score = (l) => l.facts.filter((f) => f.volatility === 'high').length * 3 + l.facts.filter((f) => f.volatility === 'medium').length;
const candidates = topic.lessons
  .filter((l) => l.facts.length && fs.existsSync(path.join(REPO, l.file)) && !busy.has(l.file))
  .sort((a, b) => {
    // A lesson found outdated whose fix never became a PR (it is not "busy") goes back to the front.
    const key = (l) => (ledger[l.file]?.status === 'needs-update' ? '' : ledger[l.file]?.verifiedAt || '');
    const va = key(a), vb = key(b);
    return va.localeCompare(vb) || score(b) - score(a);
  })
  .filter((l) => ledger[l.file]?.verifiedAt !== date)
  .slice(0, Number(process.env.OV_SWEEP_N || perDay));

const results = [];
for (const l of candidates) {
  const slug = l.file.replace(/^content\//, '').replace(/\.md$/, '').replace(/\//g, '--');
  console.log(`sweep: ${l.file}`);
  try {
    const v = runStage('verify', {
      cwd: REPO,
      vars: { file: l.file, facts: yaml.dump(l.facts, { lineWidth: 120 }) },
      outPath: path.join(dir, 'verify', `${slug}.json`),
    });
    const counts = Object.fromEntries(['current', 'outdated', 'unverifiable'].map((k) => [k, v.checked.filter((c) => c.verdict === k).length]));
    ledger[l.file] = { verifiedAt: date, status: v.status, ...counts, summary: v.summary };
    results.push({ file: l.file, status: v.status, ...counts, summary: v.summary, change: v.change?.id || null });
    if (v.status === 'needs-update' && v.change && brief) {
      brief.changes.push({
        ...v.change,
        id: `fresh-${v.change.id}`.replace(/[^a-z0-9-]/g, '-').slice(0, 50),
        tier: 'T1',
        files: [l.file],
        origin: 'sweep',
      });
    }
  } catch (e) {
    results.push({ file: l.file, status: 'error', error: String(e.message).slice(0, 300) });
    console.log(`  ! ${String(e.message).slice(0, 200)}`);
  }
}

writeJson(ledgerPath, ledger);
if (brief) writeJson(briefPath, brief);

const cutoff = new Date(Date.now() - targetDays * 864e5).toLocaleDateString('en-CA');
const total = topic.lessons.filter((l) => l.facts.length).length;
const covered = Object.values(ledger).filter((x) => x.verifiedAt >= cutoff).length;
const out = { date, checked: results, coverage: { covered, total, targetDays } };
writeJson(path.join(dir, 'sweep.json'), out);
console.log(`sweep: ${results.length} lessons re-verified (${results.filter((r) => r.status === 'current').length} current, ${results.filter((r) => r.status === 'needs-update').length} need updates); coverage ${covered}/${total} within ${targetDays} days`);
