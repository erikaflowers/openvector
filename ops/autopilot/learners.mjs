// Stage 2b: LEARNERS. Aggregate, anonymous learner signal from Supabase (+ Buttondown list size).
// Needs SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (and optionally BUTTONDOWN_API_KEY) in $OV_STATE/.env.
// Stores counts only: no emails, no user IDs. Output: runs/<date>/learners.json
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { REPO, loadEnv, writeJson, runDir } from './lib.mjs';

const env = loadEnv();
const out = { generatedAt: new Date().toISOString() };
const days = (n) => Date.now() - n * 864e5;

if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
  const base = env.SUPABASE_URL.replace(/\/$/, '');
  const headers = { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` };

  // Users: counts only.
  let users = [];
  for (let page = 1; page < 50; page++) {
    const r = await fetch(`${base}/auth/v1/admin/users?page=${page}&per_page=1000`, { headers });
    if (!r.ok) { out.usersError = `HTTP ${r.status}`; break; }
    const j = await r.json();
    const batch = j.users || [];
    users.push(...batch.map((u) => ({ c: Date.parse(u.created_at), s: Date.parse(u.last_sign_in_at || 0) })));
    if (batch.length < 1000) break;
  }
  if (!out.usersError) {
    out.users = users.length;
    out.newUsers7d = users.filter((u) => u.c > days(7)).length;
    out.newUsers30d = users.filter((u) => u.c > days(30)).length;
    out.signedIn30d = users.filter((u) => u.s > days(30)).length;
  }

  // Progress: completions per lesson and distinct learners.
  const rows = [];
  for (let from = 0; from < 1e6; from += 1000) {
    const r = await fetch(`${base}/rest/v1/progress?select=lesson_key,user_id`, { headers: { ...headers, range: `${from}-${from + 999}` } });
    if (!r.ok) { out.progressError = `HTTP ${r.status}`; break; }
    const batch = await r.json();
    rows.push(...batch);
    if (batch.length < 1000) break;
  }
  if (!out.progressError) {
    const per = {};
    for (const r of rows) per[r.lesson_key] = (per[r.lesson_key] || 0) + 1;
    out.activeLearners = new Set(rows.map((r) => r.user_id)).size;
    out.completions = rows.length;
    const perUser = {};
    for (const r of rows) perUser[r.user_id] = (perUser[r.user_id] || 0) + 1;
    const dist = Object.values(perUser);
    out.lessonsPerLearner = { median: dist.sort((a, b) => a - b)[Math.floor(dist.length / 2)] || 0, max: Math.max(0, ...dist) };

    // Drop-off along the curriculum order in the manifest.
    const manifest = yaml.load(fs.readFileSync(path.join(REPO, 'content/manifest.yaml'), 'utf8'));
    const order = manifest.levels.flatMap((l) => (l.lessons || []).map((s) => `${l.slug}/${s}`));
    out.perLesson = order.map((k) => ({ lesson: k, completions: per[k] || 0 }));
    out.dropoff = out.perLesson.map((x, i) => {
      const prev = i ? out.perLesson[i - 1].completions : null;
      return { ...x, dropPct: prev ? Math.round((1 - x.completions / prev) * 100) : null };
    }).filter((x) => x.dropPct !== null && x.dropPct > 0).sort((a, b) => b.dropPct - a.dropPct).slice(0, 10);
    out.untrackedKeys = Object.keys(per).filter((k) => !order.includes(k)).length;
  }
} else {
  out.note = 'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set';
}

if (env.BUTTONDOWN_API_KEY) {
  out.subscribersByTag = {};
  for (const tag of ['zerovector', 'workflows']) {
    const r = await fetch(`https://api.buttondown.com/v1/subscribers?tag=${tag}&type=regular`, { headers: { authorization: `Token ${env.BUTTONDOWN_API_KEY}` } });
    out.subscribersByTag[tag] = r.ok ? (await r.json()).count ?? null : `HTTP ${r.status}`;
  }
  const all = await fetch('https://api.buttondown.com/v1/subscribers?type=regular', { headers: { authorization: `Token ${env.BUTTONDOWN_API_KEY}` } });
  out.subscribers = all.ok ? (await all.json()).count ?? null : `HTTP ${all.status}`;
}

writeJson(path.join(runDir(), 'learners.json'), out);
console.log(`learners: ${out.users ?? '?'} users, ${out.activeLearners ?? '?'} with progress, ${out.completions ?? '?'} completions, ${out.subscribers ?? '?'} subscribers${out.usersError || out.progressError ? ` (errors: ${out.usersError || ''} ${out.progressError || ''})` : ''}`);
