// The Desk: Samantha's private go/no-go page for the Open Vector Autopilot.
// Listens on 127.0.0.1 only; published to the tailnet (never Funnel) with `tailscale serve`.
// No dependencies. Decisions call `gh` and append to feedback.jsonl, which the next brief reads.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { STATE, loadYaml, readJson, writeJson } from '../lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = +(process.env.OV_DESK_PORT || 7811);
const config = loadYaml('config.yaml');
const RUNS = path.join(STATE, 'runs');
const PAUSED = path.join(STATE, 'PAUSED');
const FEEDBACK = path.join(STATE, 'feedback.jsonl');
const QUEUE = path.join(STATE, 'queue.jsonl');

const gh = (...args) => execFileSync('gh', [...args, '-R', config.github], { encoding: 'utf8' }).trim();
const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
const validId = (s) => /^[a-z0-9-]{1,60}$/.test(s);
const days = () => (fs.existsSync(RUNS) ? fs.readdirSync(RUNS).filter(validDate).sort().reverse() : []);
const decisions = () => fs.existsSync(FEEDBACK)
  ? fs.readFileSync(FEEDBACK, 'utf8').trim().split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean)
  : [];

function day(date) {
  const d = path.join(RUNS, date);
  const cost = fs.existsSync(path.join(d, 'cost.jsonl'))
    ? fs.readFileSync(path.join(d, 'cost.jsonl'), 'utf8').trim().split('\n').filter(Boolean).reduce((s, l) => s + (JSON.parse(l).usd || 0), 0) : 0;
  return {
    date,
    brief: readJson(path.join(d, 'brief.json'), null),
    prs: readJson(path.join(d, 'prs.json'), []),
    health: readJson(path.join(d, 'health.json'), null),
    learners: readJson(path.join(d, 'learners.json'), null),
    digest: readJson(path.join(d, 'digest.json'), null),
    sweep: readJson(path.join(d, 'sweep.json'), null),
    freshness: readJson(path.join(STATE, 'freshness.json'), {}),
    collected: readJson(path.join(d, 'collected.json'), { count: 0, errors: [] }).count,
    cost,
    decisions: decisions().filter((x) => x.date === date),
  };
}

// Every open autopilot PR, whatever day opened it, joined with the pipeline's record of it.
// Days' briefs can be overwritten or the PR can predate the day being viewed; the Inbox never loses one.
let inboxCache = { at: 0, data: null };
function prRecords() {
  const byNumber = {};
  for (const date of days()) {
    for (const p of readJson(path.join(RUNS, date, 'prs.json'), [])) if (p.pr && !byNumber[p.pr]) byNumber[p.pr] = { ...p, date };
  }
  return byNumber;
}
function inbox() {
  if (inboxCache.data && Date.now() - inboxCache.at < 30e3) return inboxCache.data;
  const open = JSON.parse(gh('pr', 'list', '--state', 'open', '--label', 'ov-autopilot', '--limit', '50',
    '--json', 'number,title,url,isDraft,createdAt,files,body,mergeable'));
  const queuedRefresh = new Set(fs.existsSync(path.join(STATE, 'refresh.jsonl'))
    ? fs.readFileSync(path.join(STATE, 'refresh.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l).pr) : []);
  const recs = prRecords();
  const data = open.map((p) => {
    const r = recs[p.number] || {};
    const section = (h) => (p.body.split(`### ${h}\n`)[1] || '').split('\n### ')[0].trim();
    return {
      pr: p.number, url: p.url, title: p.title, draft: p.isDraft, opened: p.createdAt.slice(0, 10),
      files: p.files.map((f) => f.path).filter((f) => !f.startsWith('content/updates/')),
      date: r.date || null, id: r.id || null, tier: r.tier || (p.body.match(/\*\*Tier:\*\* (T\d)/) || [])[1] || 'T1',
      audit: r.audit || (p.isDraft ? 'fail' : 'pass'), auditSummary: r.auditSummary || section('Audit'),
      publicNote: r.publicNote || section('Learner-facing note').replace(/^> /, ''),
      what: section('What'), why: section('Why'),
      conflict: p.mergeable === 'CONFLICTING' || queuedRefresh.has(p.number),
      confidence: r.change?.confidence || (p.body.match(/\*\*Confidence:\*\* (\w+)/) || [])[1] || 'medium',
    };
  }).sort((a, b) => a.pr - b.pr);
  inboxCache = { at: Date.now(), data };
  return data;
}

function decidePr({ pr, decision, note = '' }) {
  pr = Number(pr);
  if (!Number.isInteger(pr) || !['go', 'nogo', 'note'].includes(decision)) throw new Error('bad request');
  const item = inbox().find((x) => x.pr === pr);
  if (!item) throw new Error(`#${pr} is not an open autopilot PR`);
  let result = 'recorded';
  if (decision === 'go') {
    if (item.draft) gh('pr', 'ready', String(pr));
    try { gh('pr', 'merge', String(pr), '--squash', '--delete-branch'); }
    catch (e) {
      const msg = String(e.stderr || e.message);
      if (/conflict|not mergeable/i.test(msg)) {
        fs.appendFileSync(path.join(STATE, 'refresh.jsonl'), JSON.stringify({ ts: new Date().toISOString(), pr }) + '\n');
        result = `#${pr} conflicts with a change merged since; queued to be redrafted on the current site`;
      } else throw e;
    }
    if (result === 'recorded') result = `merged #${pr}`;
    if (item.date && item.id && result.startsWith('merged')) setPrStatus(item.date, item.id, { status: 'merged', decidedBy: 'desk' });
  } else if (decision === 'nogo') {
    gh('pr', 'close', String(pr), '--delete-branch', '--comment', `No-go from the Desk.${note ? ` ${note}` : ''}`);
    if (item.date && item.id) setPrStatus(item.date, item.id, { status: 'rejected' });
    result = `closed #${pr}`;
  }
  inboxCache.data = null;
  fs.appendFileSync(FEEDBACK, JSON.stringify({
    ts: new Date().toISOString(), date: item.date, id: item.id || `pr-${pr}`, kind: 'change', tier: item.tier, title: item.title, pr, decision, note, result,
  }) + '\n');
  return { ok: true, result };
}

function summary(date) {
  const x = day(date);
  const t1 = x.brief?.changes.filter((c) => c.tier === 'T1').length || 0;
  const decided = new Set(x.decisions.map((d) => d.id));
  const open = (x.brief?.changes || []).filter((c) => c.tier === 'T1' && !decided.has(c.id)).length
    + (x.brief?.proposals || []).filter((p) => !decided.has(p.id)).length;
  return { date, headline: x.brief?.headline || null, t1, merged: x.prs.filter((p) => p.status === 'merged').length, open };
}

function setPrStatus(date, id, patch) {
  const p = path.join(RUNS, date, 'prs.json');
  const prs = readJson(p, []);
  const i = prs.findIndex((x) => x.id === id);
  if (i >= 0) { prs[i] = { ...prs[i], ...patch }; writeJson(p, prs); }
}

function decide({ date, id, kind, decision, note = '' }) {
  if (!validDate(date) || !validId(id) || !['go', 'nogo', 'note'].includes(decision)) throw new Error('bad request');
  const x = day(date);
  const item = kind === 'proposal' ? x.brief?.proposals.find((p) => p.id === id) : x.brief?.changes.find((c) => c.id === id);
  if (!item) throw new Error(`no ${kind} "${id}" on ${date}`);
  const pr = x.prs.find((p) => p.id === id);
  let result = 'recorded';

  if (kind === 'change' && pr?.pr && decision === 'go' && pr.status !== 'merged') {
    if (pr.status === 'audit-failed') gh('pr', 'ready', String(pr.pr));
    gh('pr', 'merge', String(pr.pr), '--squash', '--delete-branch');
    setPrStatus(date, id, { status: 'merged', decidedBy: 'desk' });
    result = `merged #${pr.pr}`;
  } else if (kind === 'change' && pr?.pr && decision === 'nogo' && pr.status !== 'merged') {
    gh('pr', 'close', String(pr.pr), '--delete-branch', '--comment', `No-go from the Desk.${note ? ` ${note}` : ''}`);
    setPrStatus(date, id, { status: 'rejected' });
    result = `closed #${pr.pr}`;
  } else if (decision === 'go' && (kind === 'proposal' || !pr?.pr)) {
    fs.appendFileSync(QUEUE, JSON.stringify({ ts: new Date().toISOString(), date, id, kind, title: item.title, note }) + '\n');
    result = kind === 'proposal' ? 'queued for drafting' : 'queued for retry';
  }

  inboxCache.data = null;
  fs.appendFileSync(FEEDBACK, JSON.stringify({
    ts: new Date().toISOString(), date, id, kind, tier: item.tier || 'T2', title: item.title, decision, note, result,
  }) + '\n');
  return { ok: true, result };
}

const send = (res, code, body, type = 'application/json') => {
  res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
};
const readBody = (req) => new Promise((ok, fail) => {
  let b = ''; req.on('data', (c) => { b += c; if (b.length > 1e5) req.destroy(); });
  req.on('end', () => { try { ok(JSON.parse(b || '{}')); } catch (e) { fail(e); } });
});

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://desk');
  const parts = url.pathname.split('/').filter(Boolean);
  try {
    if (req.method === 'GET' && url.pathname === '/') return send(res, 200, fs.readFileSync(path.join(HERE, 'index.html'), 'utf8'), 'text/html; charset=utf-8');
    if (req.method === 'GET' && url.pathname === '/api/inbox') return send(res, 200, inbox());
    if (req.method === 'GET' && url.pathname === '/api/days') return send(res, 200, days().slice(0, 60).map(summary));
    if (req.method === 'GET' && parts[1] === 'day' && validDate(parts[2])) return send(res, 200, day(parts[2]));
    if (req.method === 'GET' && parts[1] === 'diff' && validDate(parts[2]) && validId(parts[3])) {
      const p = path.join(RUNS, parts[2], 'diffs', `${parts[3]}.diff`);
      return fs.existsSync(p) ? send(res, 200, fs.readFileSync(p, 'utf8'), 'text/plain; charset=utf-8') : send(res, 404, 'no diff', 'text/plain');
    }
    if (req.method === 'GET' && url.pathname === '/api/status') {
      const log = path.join(process.env.HOME, 'Library/Logs/ov-autopilot.log');
      return send(res, 200, { paused: fs.existsSync(PAUSED), phase: config.phase, latest: days()[0] || null, lastLog: fs.existsSync(log) ? fs.readFileSync(log, 'utf8').split('\n').slice(-12).join('\n') : '' });
    }
    if (req.method === 'POST') {
      // Same-origin guard: the page sends this header; a cross-site form cannot.
      if (req.headers['x-desk'] !== '1') return send(res, 403, { error: 'forbidden' });
      const body = await readBody(req);
      if (url.pathname === '/api/decision') return send(res, 200, body.pr ? decidePr(body) : decide(body));
      if (url.pathname === '/api/pause') {
        body.paused ? fs.writeFileSync(PAUSED, `paused from the Desk ${new Date().toISOString()}\n`) : fs.rmSync(PAUSED, { force: true });
        return send(res, 200, { paused: fs.existsSync(PAUSED) });
      }
    }
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, 500, { error: String(e.message).slice(0, 500) });
  }
}).listen(PORT, '127.0.0.1', () => console.log(`desk: http://127.0.0.1:${PORT}`));
