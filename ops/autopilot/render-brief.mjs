// Stage 7: BRIEF. Turns runs/<date>/{brief,health,collected}.json + cost.jsonl into
// runs/<date>/brief.md (the private go/no-go changelog) and runs/<date>/telegram.txt (the ping).
import fs from 'node:fs';
import path from 'node:path';
import { STATE, readJson, writeJson, runDir, loadYaml, globToRe } from './lib.mjs';

const dir = runDir();
const date = path.basename(dir);
const brief = readJson(path.join(dir, 'brief.json'), null);
const health = readJson(path.join(dir, 'health.json'), { summary: {} });
const collected = readJson(path.join(dir, 'collected.json'), { count: 0, errors: [] });
const cost = fs.existsSync(path.join(dir, 'cost.jsonl'))
  ? fs.readFileSync(path.join(dir, 'cost.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l))
  : [];
const usd = cost.reduce((s, c) => s + (c.usd || 0), 0);
const hs = health.summary;

// Guardrail in code, not in the prompt: T0 may only touch allowlisted files. Anything else becomes T1.
const allow = loadYaml('config.yaml').allowlist.map(globToRe);
if (brief) {
  for (const c of brief.changes) {
    const outside = c.files.filter((f) => !allow.some((re) => re.test(f)));
    if (c.tier === 'T0' && outside.length) {
      c.tier = 'T1';
      c.why += ` [Promoted from T0: ${outside.join(', ')} ${outside.length > 1 ? 'are' : 'is'} outside the auto-merge allowlist.]`;
    }
  }
  writeJson(path.join(dir, 'brief.json'), brief);
}

const L = [];
L.push(`# Open Vector Updates: ${date}`, '');
if (!brief) {
  L.push('> The brief stage did not produce output today. See run.log.', '');
} else {
  L.push(`> ${brief.headline}`, '');
  const t0 = brief.changes.filter((c) => c.tier === 'T0');
  const t1 = brief.changes.filter((c) => c.tier === 'T1');
  const section = (title, list) => {
    if (!list.length) return;
    L.push(`## ${title}`, '');
    for (const c of list) {
      L.push(`### [${c.tier}] ${c.title}`, '');
      L.push(`- **Files:** ${c.files.map((f) => `\`${f}\``).join(', ')}`);
      L.push(`- **Change:** ${c.what}`);
      L.push(`- **Why:** ${c.why}`);
      L.push(`- **Sources:** ${c.sources.join(' · ')}`);
      L.push(`- **Confidence:** ${c.confidence}`);
      L.push(`- **Decision:** ☐ Go ☐ No-go  (id \`${c.id}\`)`, '');
    }
  };
  section('Needs your call (T1)', t1);
  section('Mechanical fixes (T0, will auto-merge in Phase 2)', t0);
  if (brief.proposals.length) {
    L.push('## Proposals (T2)', '');
    for (const p of brief.proposals) {
      L.push(`### ${p.type}: ${p.title}`, '', p.rationale, '');
      p.outline.forEach((o) => L.push(`1. ${o}`));
      L.push('', `Sources: ${p.sources.join(' · ')}`, `Decision: ☐ Write it ☐ Not now  (id \`${p.id}\`)`, '');
    }
  }
  if (brief.fyi.length) {
    L.push('## FYI (no site change)', '');
    brief.fyi.forEach((f) => L.push(`- [${f.title}](${f.link}): ${f.note}`));
    L.push('');
  }
  L.push('## Site health', '', brief.healthNote, '');
}
L.push(`| Lessons | Stale (>90d) | No updatedAt | Links | Broken | Moved | Unverified |`, `|---|---|---|---|---|---|---|`,
  `| ${hs.lessons} | ${hs.stale} | ${hs.missingUpdatedAt} | ${hs.links} | ${hs.broken} | ${hs.moved} | ${hs.unverified} |`, '');
L.push('---', `Crawl: ${collected.count} new items${collected.errors.length ? `, ${collected.errors.length} source errors (${collected.errors.map((e) => e.source).join(', ')})` : ''}. Cost: $${usd.toFixed(2)}.`);
fs.writeFileSync(path.join(dir, 'brief.md'), L.join('\n') + '\n');

const n = (tier) => brief ? brief.changes.filter((c) => c.tier === tier).length : 0;
const tg = brief
  ? [`Open Vector Updates, ${date}`, '', brief.headline, '',
     `${n('T1')} need your call · ${n('T0')} mechanical · ${brief.proposals.length} proposals · ${brief.fyi.length} FYI`,
     `Health: ${hs.broken} broken, ${hs.moved} moved links; ${hs.stale}/${hs.lessons} lessons stale.`].join('\n')
  : `Open Vector Updates, ${date}: the brief stage failed. Check ${path.join(dir, 'run.log')}`;
fs.writeFileSync(path.join(dir, 'telegram.txt'), tg + '\n');
fs.writeFileSync(path.join(STATE, 'latest'), date + '\n');
console.log(`render: brief.md (${brief ? brief.changes.length : 0} changes), telegram.txt, $${usd.toFixed(2)} today`);
