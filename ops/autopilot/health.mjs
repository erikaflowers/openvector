// Stage 2: HEALTH. Link check, frontmatter/manifest lint, staleness, pinned model IDs.
// No LLM. Output: runs/<date>/health.json
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { REPO, loadYaml, writeJson, runDir, UA } from './lib.mjs';

const config = loadYaml('config.yaml');
const manifest = yaml.load(fs.readFileSync(path.join(REPO, 'content/manifest.yaml'), 'utf8'));
const rel = (p) => path.relative(REPO, p);

// ---- Lessons and guides the manifest publishes ----
const expected = [
  ...manifest.levels.flatMap((l) => (l.lessons || []).map((s) => `content/curriculum/${l.slug}/${s}.md`)),
  ...(manifest.approach?.guides || []).map((s) => `content/approach/${s}.md`),
];
const onDisk = [];
const walk = (p) => fs.statSync(p).isDirectory() ? fs.readdirSync(p).forEach((f) => walk(path.join(p, f))) : p.endsWith('.md') && onDisk.push(rel(p));
walk(path.join(REPO, 'content/curriculum'));
walk(path.join(REPO, 'content/approach'));

const lint = [];
for (const f of expected) if (!onDisk.includes(f)) lint.push({ file: f, problem: 'in manifest but file missing' });
for (const f of onDisk) if (!expected.includes(f)) lint.push({ file: f, problem: 'file not referenced in manifest' });

const gitDate = (f) => {
  try { return execFileSync('git', ['log', '-1', '--format=%cs', '--', f], { cwd: REPO }).toString().trim() || null; } catch { return null; }
};

const now = Date.now();
const lessons = [];
const linkRefs = new Map();
const addLink = (url, file) => {
  const u = url.replace(/[.,;:!?'"]+$/, '');
  if (!linkRefs.has(u)) linkRefs.set(u, new Set());
  linkRefs.get(u).add(file);
};

for (const f of onDisk) {
  const raw = fs.readFileSync(path.join(REPO, f), 'utf8');
  const { data, content } = matter(raw);
  const slug = path.basename(f, '.md');
  if (data.slug && data.slug !== slug) lint.push({ file: f, problem: `slug "${data.slug}" does not match filename` });
  if (!data.title) lint.push({ file: f, problem: 'missing title' });
  if (data.status && !['available', 'coming', 'draft'].includes(data.status)) lint.push({ file: f, problem: `unknown status "${data.status}"` });

  const updatedAt = data.updatedAt ? new Date(data.updatedAt).toISOString().slice(0, 10) : null;
  const lastTouched = updatedAt || gitDate(f);
  const ageDays = lastTouched ? Math.floor((now - Date.parse(lastTouched)) / 864e5) : null;
  lessons.push({ file: f, title: data.title, status: data.status, updatedAt, lastTouched, ageDays, stale: ageDays === null || ageDays > config.staleAfterDays, words: content.split(/\s+/).length });

  for (const m of content.matchAll(/https?:\/\/[^\s)<>\]"'`]+/g)) addLink(m[0], f);
}
for (const f of ['src/content/learn/resources.js', 'src/content/recommended-reading.js']) {
  const p = path.join(REPO, f);
  if (fs.existsSync(p)) for (const m of fs.readFileSync(p, 'utf8').matchAll(/https?:\/\/[^\s'"`)]+/g)) addLink(m[0], f);
}

// ---- Link check ----
const ignoreRes = config.linkCheck.ignore.map((r) => new RegExp(r));
const botBlocked = config.linkCheck.botBlocked;
async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': UA } });
      if (res.ok) return { status: res.status, finalUrl: res.url };
      if (method === 'GET') return { status: res.status };
    } catch (e) {
      if (method === 'GET') return { status: `ERR ${e.cause?.code || e.name}` };
    }
  }
}
const links = [];
const urls = [...linkRefs.keys()];
for (let i = 0; i < urls.length; i += 12) {
  await Promise.all(urls.slice(i, i + 12).map(async (url) => {
    const files = [...linkRefs.get(url)];
    if (ignoreRes.some((r) => r.test(url))) return links.push({ url, files, verdict: 'ignored' });
    const { status, finalUrl } = await probe(url);
    const host = (() => { try { return new URL(url).hostname; } catch { return ''; } })();
    let verdict = 'ok';
    if (typeof status !== 'number' || status >= 400) {
      verdict = (botBlocked.some((h) => host.endsWith(h)) || status === 403 || status === 429) ? 'unverified' : 'broken';
    }
    // A redirect to a different site usually means the page moved or the domain lapsed.
    const moved = verdict === 'ok' && finalUrl && !(config.allowRedirects || []).includes(url) && new URL(finalUrl).hostname.replace(/^www\./, '') !== host.replace(/^www\./, '');
    links.push({ url, files, status, verdict: moved ? 'moved' : verdict, ...(moved ? { finalUrl } : {}) });
  }));
}

// ---- Pinned model IDs anywhere in the site (these go stale fastest) ----
const models = [];
const scan = (dir) => {
  for (const f of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (f.name !== 'node_modules') scan(p); continue; }
    if (!/\.(m?js|jsx|md)$/.test(f.name)) continue;
    fs.readFileSync(path.join(REPO, p), 'utf8').split('\n').forEach((line, n) => {
      for (const m of line.matchAll(/\b(claude-[a-z0-9.-]*\d|gpt-[0-9][a-z0-9.-]*|gemini-[0-9][a-z0-9.-]*)\b/gi)) models.push({ file: p, line: n + 1, id: m[1] });
    });
  }
};
['src', 'netlify', 'content'].forEach(scan);

const count = (v) => links.filter((l) => l.verdict === v).length;
const out = {
  checkedAt: new Date().toISOString(),
  summary: {
    lessons: lessons.length,
    stale: lessons.filter((l) => l.stale).length,
    missingUpdatedAt: lessons.filter((l) => !l.updatedAt).length,
    links: links.length, broken: count('broken'), moved: count('moved'), unverified: count('unverified'), ignored: count('ignored'),
    lint: lint.length,
    pinnedModels: models.length,
  },
  lint,
  lessons: lessons.sort((a, b) => (b.ageDays ?? 1e9) - (a.ageDays ?? 1e9)),
  links: links.filter((l) => l.verdict !== 'ok' && l.verdict !== 'ignored').sort((a, b) => a.verdict.localeCompare(b.verdict)),
  models,
};
writeJson(path.join(runDir(), 'health.json'), out);
const s = out.summary;
console.log(`health: ${s.lessons} lessons (${s.stale} stale, ${s.missingUpdatedAt} without updatedAt), ${s.links} links (${s.broken} broken, ${s.moved} moved, ${s.unverified} unverified), ${s.lint} lint, ${s.pinnedModels} pinned model IDs`);
