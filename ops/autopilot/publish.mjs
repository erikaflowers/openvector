// Stage 6: PUBLISH (Phase 2). For each change in today's brief:
//   worktree off origin/main → draft agent (may edit only the listed files) → scope check in code →
//   updatedAt + public update note → npm run build → audit agent → commit, push, PR →
//   T0 that passes audit: squash-merge. T1: left open for the Desk. Audit failures: draft PR.
// Output: runs/<date>/prs.json (the Desk reads it), diffs/<id>.diff, drafts/<id>.json, audits/<id>.json.
//   node publish.mjs            normal
//   OV_DRY=1 node publish.mjs   do everything up to the commit; no push, no PR (worktrees removed; diffs, drafts and audits kept)
//   node publish.mjs pending    only refresh runs/<date>/pending.json (open PRs), for the brief stage
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { HERE, STATE, loadYaml, readJson, writeJson, runDir, enforceTiers, lessonKey } from './lib.mjs';
import { runStage } from './stage.mjs';

const config = loadYaml('config.yaml');
const CODE_REPO = path.resolve(HERE, '../..');
const DRY = !!process.env.OV_DRY;
const dir = runDir();
const date = path.basename(dir);
const LABEL = 'ov-autopilot';

const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'], ...opts }).trim();
const gh = (...args) => sh('gh', [...args, '-R', config.github]);
const git = (cwd, ...args) => sh('git', ['-C', cwd, ...args]);

function refreshPending() {
  const open = JSON.parse(gh('pr', 'list', '--state', 'open', '--limit', '100', '--json', 'number,title,url,author,labels,files,headRefName,isDraft'));
  const pending = open.map((p) => ({
    number: p.number, title: p.title, url: p.url, author: p.author?.login, draft: p.isDraft,
    autopilot: p.labels.some((l) => l.name === LABEL),
    files: (p.files || []).map((f) => f.path),
  }));
  writeJson(path.join(dir, 'pending.json'), pending);
  return pending;
}

if (process.argv[2] === 'pending') {
  const p = refreshPending();
  console.log(`pending: ${p.length} open PRs (${p.filter((x) => x.autopilot).length} autopilot)`);
  process.exit(0);
}

// ---------------------------------------------------------------------------------------------
const brief = enforceTiers(readJson(path.join(dir, 'brief.json'), null), config);
if (!brief) { console.log('publish: no brief today, nothing to do'); process.exit(0); }

const prsPath = path.join(dir, 'prs.json');
const prs = readJson(prsPath, []);
const record = (r) => { const i = prs.findIndex((p) => p.id === r.id); i >= 0 ? (prs[i] = { ...prs[i], ...r }) : prs.push(r); writeJson(prsPath, prs); };

const pending = refreshPending();
const humanFiles = new Set(pending.filter((p) => !p.autopilot).flatMap((p) => p.files));
const openAutopilot = pending.filter((p) => p.autopilot);
const createdToday = prs.filter((p) => p.pr).length;
let budget = config.limits.maxPrsPerDay - createdToday;

try { gh('label', 'create', LABEL, '--color', '5319e7', '--description', 'Opened by the Open Vector Autopilot', '--force'); } catch { /* exists or no rights; PR creation will tell */ }

const setUpdatedAt = (file) => {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return;
  const fm = /^updatedAt:.*$/m.test(m[1]) ? m[1].replace(/^updatedAt:.*$/m, `updatedAt: "${date}"`) : `${m[1]}\nupdatedAt: "${date}"`;
  fs.writeFileSync(file, src.replace(m[0], `---\n${fm}\n---`));
};

const yamlStr = (s) => JSON.stringify(String(s));

// Remark directives must stay balanced: every `:::name` opener has a lone `:::` closer, and no
// `:::` may be glued onto a line of text. Markdown still builds when this breaks, so check it here.
function directiveProblems(wt, files) {
  const problems = [];
  for (const f of files.filter((f) => f.endsWith('.md'))) {
    const p = path.join(wt, f);
    if (!fs.existsSync(p)) continue;
    // Fences are 3+ colons (longer fences nest, e.g. `::::`). Lines inside ``` code blocks are ignored.
    let depth = 0, inCode = false;
    fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
      if (/^\s*```/.test(line)) { inCode = !inCode; return; }
      if (inCode) return;
      if (/^:{3,}\s*[a-z]/i.test(line)) depth++;
      else if (/^:{3,}\s*$/.test(line)) depth--;
      else if (/[^:\s]\s*:{3,}\s*$/.test(line)) problems.push({ severity: 'blocker', file: f, problem: `Line ${i + 1}: a closing \`:::\` is glued onto text; it must be on its own line.` });
      if (depth < 0) { problems.push({ severity: 'blocker', file: f, problem: `Line ${i + 1}: \`:::\` closes a block that was never opened.` }); depth = 0; }
    });
    if (depth > 0) problems.push({ severity: 'blocker', file: f, problem: `${depth} remark directive block(s) are never closed with \`:::\`.` });
  }
  return problems;
}

// Changes Samantha sent back with "Go: queue it" on the Desk (no PR existed that day) run again today.
const QUEUE = path.join(STATE, 'queue.jsonl');
const DONE = path.join(STATE, 'queue-done.json');
const doneQueue = new Set(readJson(DONE, []));
const queued = (fs.existsSync(QUEUE) ? fs.readFileSync(QUEUE, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [])
  .filter((q) => q.kind === 'change' && q.date !== date && !doneQueue.has(`${q.date}:${q.id}`))
  .map((q) => {
    const c = readJson(path.join(STATE, 'runs', q.date, 'brief.json'), { changes: [] }).changes.find((x) => x.id === q.id);
    if (c) doneQueue.add(`${q.date}:${q.id}`);
    return c && { ...c, fromDate: q.date };
  })
  .filter(Boolean);
if (!DRY) writeJson(DONE, [...doneQueue]);

for (const change of [...queued, ...brief.changes]) {
  const id = change.id.replace(/[^a-z0-9-]/g, '-').slice(0, 50);
  if (process.env.OV_ONLY && process.env.OV_ONLY !== id) continue;
  const done = prs.find((p) => p.id === id);
  if (done && ['merged', 'awaiting', 'audit-failed', 'skipped', 'no-op'].includes(done.status)) continue;

  const base = { id, tier: change.tier, title: change.title, files: change.files, ...(change.fromDate ? { fromDate: change.fromDate } : {}) };
  if (budget <= 0) { record({ ...base, status: 'deferred', reason: `daily PR limit (${config.limits.maxPrsPerDay}) reached` }); continue; }
  const clash = change.files.filter((f) => humanFiles.has(f));
  if (clash.length) { record({ ...base, status: 'deferred', reason: `open human PR touches ${clash.join(', ')}` }); continue; }
  const dupe = openAutopilot.find((p) => p.files.some((f) => change.files.includes(f)) && p.title.includes(change.title.slice(0, 30)));
  if (dupe) { record({ ...base, status: 'deferred', reason: `already pending as #${dupe.number}` }); continue; }

  const branch = `feature/ov-auto-${date}-${id}`.slice(0, 90);
  const wt = path.join(STATE, 'work', `${date}-${id}`);
  console.log(`publish: ${change.tier} ${id}`);
  try {
    if (fs.existsSync(wt)) { try { git(CODE_REPO, 'worktree', 'remove', '--force', wt); } catch {} }
    try { git(CODE_REPO, 'branch', '-D', branch); } catch {}
    git(CODE_REPO, 'worktree', 'add', '--quiet', '-b', branch, wt, 'origin/main');
    fs.symlinkSync(path.join(CODE_REPO, 'node_modules'), path.join(wt, 'node_modules'));

    const draftTools = [...config.stages.draft.tools, ...change.files.map((f) => `Edit(/${f})`)];
    const changeJson = JSON.stringify(change, null, 2);
    const lessonsOf = (files) => files.map(lessonKey).filter(Boolean);
    let draft, audit, diff, changed = [], failure = null;

    // Up to two rounds: draft → scope check → pipeline edits → build → structure check → audit.
    // If round one has blockers (from the checks or the audit), the editor gets them back once.
    for (let round = 1; round <= 2; round++) {
      const fixes = round === 1 ? '(none: this is the first attempt)'
        : JSON.stringify(audit ? audit.issues.filter((i) => i.severity === 'blocker') : failure, null, 2);
      failure = null;

      // 1. Draft: the agent may edit only the files this change names.
      git(wt, 'reset', '--quiet');  // unstage any previous round; the working tree keeps its edits
      if (round > 1) fs.rmSync(path.join(wt, 'content/updates', `${date}-${id}.md`), { force: true });
      draft = runStage('draft', { cwd: wt, vars: { change: changeJson, fixes }, tools: draftTools, outPath: path.join(dir, 'drafts', `${id}${round > 1 ? '.r2' : ''}.json`) });
      if (draft.status === 'skipped') break;

      // 2. Scope check in code. Anything the agent touched outside the list aborts the change.
      const touched = [...git(wt, 'diff', '--name-only', 'HEAD').split('\n'), ...git(wt, 'ls-files', '--others', '--exclude-standard').split('\n')]
        .filter(Boolean);
      const outside = touched.filter((f) => !change.files.includes(f) && f !== 'node_modules' && f !== `content/updates/${date}-${id}.md`);
      if (outside.length) { failure = `edited files outside the change: ${outside.join(', ')}`; break; }
      changed = touched.filter((f) => f !== 'node_modules' && !f.startsWith('content/updates/'));
      if (!changed.length) break;

      // 3. Pipeline-owned edits: updatedAt on lessons, and a public update note.
      changed.filter(lessonKey).forEach((f) => setUpdatedAt(path.join(wt, f)));
      const note = path.join(wt, 'content/updates', `${date}-${id}.md`);
      fs.mkdirSync(path.dirname(note), { recursive: true });
      fs.writeFileSync(note, [
        '---', `date: "${date}"`, `title: ${yamlStr(change.title)}`, `kind: ${change.tier === 'T0' ? 'fix' : 'update'}`,
        `lessons: [${lessonsOf(changed).map((l) => yamlStr(l)).join(', ')}]`, `sources: [${change.sources.map(yamlStr).join(', ')}]`, '---', '',
        draft.publicNote, '',
      ].join('\n'));

      // 4. Build must pass; directive structure must be intact.
      try { sh('npm', ['run', 'build', '--silent'], { cwd: wt }); } catch (e) {
        failure = [{ severity: 'blocker', problem: `npm run build failed: ${String(e.stdout || e.stderr || e.message).slice(-800)}` }];
        audit = null; if (round === 1) continue; break;
      }
      const structural = directiveProblems(wt, changed);
      if (structural.length) { failure = structural; audit = null; if (round === 1) continue; break; }

      // 5. Audit the full diff (including the note, excluding node_modules).
      git(wt, 'add', '-A', '--', '.', ':!node_modules');
      diff = git(wt, 'diff', '--cached');
      fs.mkdirSync(path.join(dir, 'diffs'), { recursive: true });
      fs.writeFileSync(path.join(dir, 'diffs', `${id}.diff`), diff + '\n');
      audit = runStage('audit', { cwd: wt, vars: { change: changeJson, diff }, outPath: path.join(dir, 'audits', `${id}.json`) });
      if (audit.verdict === 'pass' || round === 2) break;
      console.log(`  audit found ${audit.issues.filter((i) => i.severity === 'blocker').length} blocker(s); one repair round`);
    }

    if (draft.status === 'skipped') { record({ ...base, status: 'skipped', reason: draft.skipReason || draft.summary }); continue; }
    if (typeof failure === 'string') { record({ ...base, status: 'failed', reason: failure }); continue; }
    if (!changed.length) { record({ ...base, status: 'no-op', reason: 'the draft made no edits' }); continue; }
    if (failure) { record({ ...base, status: 'failed', reason: failure.map((f) => f.problem).join(' ') }); continue; }
    const lessons = lessonsOf(changed);
    const passed = audit.verdict === 'pass';

    if (DRY) { record({ ...base, status: 'dry-run', audit: audit.verdict, auditSummary: audit.summary, publicNote: draft.publicNote, worktree: wt }); continue; }

    // 6. Commit, push, PR.
    git(wt, 'commit', '--quiet', '-m', `${change.title}\n\n${change.why}\n\nSources:\n${change.sources.map((s) => `- ${s}`).join('\n')}\n\nOpened by the Open Vector Autopilot (${change.tier}, audit: ${audit.verdict}).\n\nCo-Authored-By: Siddig (Claude) <noreply@anthropic.com>`);
    git(wt, 'push', '--quiet', '-u', 'origin', branch);
    const body = [
      `<!-- ov-autopilot id=${id} date=${date} tier=${change.tier} -->`,
      `**Tier:** ${change.tier}${change.tier === 'T0' ? ' (mechanical)' : ' (needs Samantha: Go / No-go on the Desk)'} · **Audit:** ${passed ? 'pass' : '**FAIL**'} · **Confidence:** ${change.confidence}`,
      '', '### What', change.what, '', '### Why', change.why, '',
      '### Sources', ...change.sources.map((s) => `- ${s}`), '',
      '### Editor', draft.summary, '',
      '### Audit', audit.summary, ...audit.issues.map((i) => `- **${i.severity}**${i.file ? ` \`${i.file}\`` : ''}: ${i.problem}`), '',
      '### Learner-facing note', `> ${draft.publicNote}`, '',
      '🤖 Opened by the Open Vector Autopilot ([Claude Code](https://claude.com/claude-code))',
    ].join('\n');
    const prUrl = gh('pr', 'create', '--head', branch, '--base', 'main', '--title', change.title, '--body', body, '--label', LABEL, ...(passed ? [] : ['--draft']));
    const number = +prUrl.split('/').pop();
    budget--;

    let status = passed ? 'awaiting' : 'audit-failed';
    if (change.tier === 'T0' && passed) {
      gh('pr', 'merge', String(number), '--squash', '--delete-branch');
      status = 'merged';
    }
    record({ ...base, status, pr: number, url: prUrl, branch, audit: audit.verdict, auditSummary: audit.summary, publicNote: draft.publicNote });
    console.log(`  → #${number} ${status}`);
  } catch (e) {
    record({ ...base, status: 'failed', reason: String(e.message).slice(0, 800) });
    console.log(`  ! ${id}: ${String(e.message).slice(0, 300)}`);
  } finally {
    if (fs.existsSync(wt)) { try { git(CODE_REPO, 'worktree', 'remove', '--force', wt); git(CODE_REPO, 'branch', '-D', branch); } catch {} }
  }
}

const by = (s) => prs.filter((p) => p.status === s).length;
console.log(`publish: ${by('merged')} merged, ${by('awaiting')} awaiting, ${by('audit-failed')} audit-failed, ${by('skipped') + by('no-op')} skipped, ${by('deferred')} deferred, ${by('failed')} failed${DRY ? `, ${by('dry-run')} dry-run ready (not pushed)` : ''}`);
