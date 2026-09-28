// Stage 1: COLLECT. Pulls every source, keeps only items not seen before.
// No LLM. Output: runs/<date>/collected.json
import fs from 'node:fs';
import path from 'node:path';
import { STATE, loadYaml, readJson, writeJson, runDir, fetchText, parseFeed, stripTags, sha } from './lib.mjs';

const { sources } = loadYaml('sources.yaml');
const config = loadYaml('config.yaml');
const seenPath = path.join(STATE, 'seen.json');
const seen = readJson(seenPath, {});
const firstRun = Object.keys(seen).length === 0;
const cutoff = Date.now() - config.lookbackDays * 864e5;
const SEEN_CAP = 500;

async function collectFeed(src) {
  const { ok, status, text } = await fetchText(src.url);
  if (!ok) throw new Error(`HTTP ${status}`);
  return parseFeed(text).map((e) => ({ ...e, key: e.id || e.link }));
}

async function collectPage(src) {
  const { ok, status, text } = await fetchText(src.url);
  if (!ok) throw new Error(`HTTP ${status}`);
  const body = stripTags(text);
  const snapDir = path.join(STATE, 'pages');
  const snapPath = path.join(snapDir, `${src.id}.txt`);
  const prev = fs.existsSync(snapPath) ? fs.readFileSync(snapPath, 'utf8') : null;
  fs.mkdirSync(snapDir, { recursive: true });
  fs.writeFileSync(snapPath, body);
  if (prev === null || prev === body) return [];
  // Lines present now that were not present before: the "what is new" on the page.
  const old = new Set(prev.split('\n'));
  const added = body.split('\n').filter((l) => l.length > 20 && !old.has(l));
  if (!added.length) return [];
  return [{
    key: `${src.id}:${sha(body)}`,
    title: `${src.id} changed`,
    link: src.url,
    date: new Date().toISOString(),
    summary: added.join('\n').slice(0, 2500),
  }];
}

async function collectHn(src) {
  const since = Math.floor((Date.now() - 3 * 864e5) / 1000);
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30`
    + `&query=${encodeURIComponent(src.query)}`
    + `&numericFilters=${encodeURIComponent(`points>${src.minPoints},created_at_i>${since}`)}`;
  const { ok, status, text } = await fetchText(url);
  if (!ok) throw new Error(`HTTP ${status}`);
  return JSON.parse(text).hits.map((h) => ({
    key: `hn:${h.objectID}`,
    title: h.title,
    link: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    date: h.created_at,
    summary: `${h.points} points, ${h.num_comments} comments. Discussion: https://news.ycombinator.com/item?id=${h.objectID}`,
  }));
}

const collectors = { feed: collectFeed, page: collectPage, hn: collectHn };
const items = [];
const errors = [];

await Promise.all(sources.map(async (src) => {
  try {
    const entries = await collectors[src.type](src);
    const known = new Set(seen[src.id] || []);
    const fresh = entries.filter((e) => !known.has(e.key));
    for (const e of fresh) {
      // Anything older than the lookback window is not news, even if the feed only just exposed it.
      const tooOld = e.date && Date.parse(e.date) < cutoff;
      if (!tooOld) items.push({ source: src.id, weight: src.weight, ...e });
    }
    seen[src.id] = [...entries.map((e) => e.key), ...(seen[src.id] || [])]
      .filter((k, i, a) => a.indexOf(k) === i)
      .slice(0, Math.max(SEEN_CAP, entries.length));
  } catch (err) {
    errors.push({ source: src.id, error: String(err.message || err) });
  }
}));

const newCount = items.length;
// A second run on the same day adds to that day's items instead of replacing them.
const outPath = path.join(runDir(), 'collected.json');
const earlier = readJson(outPath, { items: [] }).items.filter((e) => !items.some((i) => i.key === e.key));
items.push(...earlier);
items.sort((a, b) => b.weight - a.weight || String(b.date).localeCompare(String(a.date)));
const out = { collectedAt: new Date().toISOString(), firstRun, count: items.length, errors, items };
writeJson(outPath, out);
if (!process.env.OV_NO_SEEN) writeJson(seenPath, seen);
console.log(`collect: ${newCount} new items (${items.length} today) from ${sources.length} sources, ${errors.length} errors${firstRun ? ' (first run)' : ''}`);
for (const e of errors) console.log(`  ! ${e.source}: ${e.error}`);
