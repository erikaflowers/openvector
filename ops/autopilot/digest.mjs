// Stage 8: DIGEST (weekly). Builds "What's new on Open Vector" from update notes merged in the last
// 7 days and saves it as a Buttondown DRAFT. It never sends. Samantha reviews, picks the audience, sends.
// Needs BUTTONDOWN_API_KEY in $OV_STATE/.env. Output: runs/<date>/digest.json (+ digest.md)
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { REPO, loadEnv, writeJson, runDir } from './lib.mjs';

const SITE = 'https://open.zerovector.design';
const dir = runDir();
const env = loadEnv();
const since = Date.now() - 7 * 864e5;

const updatesDir = path.join(REPO, 'content/updates');
const updates = (fs.existsSync(updatesDir) ? fs.readdirSync(updatesDir) : [])
  .filter((f) => f.endsWith('.md'))
  .map((f) => { const { data, content } = matter(fs.readFileSync(path.join(updatesDir, f), 'utf8')); return { ...data, note: content.trim() }; })
  .filter((u) => Date.parse(u.date) >= since)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

// Approach guides live under their category: /learn/approach/<category>/<slug>.
const lessonUrl = (k) => {
  if (!k.startsWith('approach/')) return `${SITE}/learn/curriculum/${k}`;
  const slug = k.slice(9);
  const { data } = matter(fs.readFileSync(path.join(REPO, 'content/approach', `${slug}.md`), 'utf8'));
  return `${SITE}/learn/approach/${data.category}/${slug}`;
};

if (!updates.length) {
  writeJson(path.join(dir, 'digest.json'), { status: 'Nothing merged this week, so no digest.' });
  console.log('digest: nothing this week');
  process.exit(0);
}

const week = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
const subject = `What's new on Open Vector (week of ${week})`;
const body = [
  `Here is what changed on [Open Vector](${SITE}/learn) this week. The tools move fast; the lessons now keep up.`,
  '',
  ...updates.map((u) => `- ${u.note}${(u.lessons || []).length ? ` ${u.lessons.map((k) => `[Open the lesson](${lessonUrl(k)})`).join(' · ')}` : ''}`),
  '',
  `Everything is on the [changelog](${SITE}/learn/changelog). Pick up where you left off at [open.zerovector.design/learn](${SITE}/learn).`,
].join('\n');
fs.writeFileSync(path.join(dir, 'digest.md'), `# ${subject}\n\n${body}\n`);

if (!env.BUTTONDOWN_API_KEY) {
  writeJson(path.join(dir, 'digest.json'), { status: `Digest written (${updates.length} updates) but BUTTONDOWN_API_KEY is not set, so no draft was created.`, subject });
  console.log('digest: written locally, no Buttondown key');
  process.exit(0);
}

const r = await fetch('https://api.buttondown.com/v1/emails', {
  method: 'POST',
  headers: { authorization: `Token ${env.BUTTONDOWN_API_KEY}`, 'content-type': 'application/json' },
  body: JSON.stringify({ subject, body, status: 'draft' }),
});
const j = await r.json().catch(() => ({}));
if (!r.ok) {
  writeJson(path.join(dir, 'digest.json'), { status: `Buttondown refused the draft (HTTP ${r.status}): ${JSON.stringify(j).slice(0, 300)}`, subject });
  console.log(`digest: Buttondown HTTP ${r.status}`);
  process.exit(1);
}
writeJson(path.join(dir, 'digest.json'), {
  status: `Draft ready (${updates.length} updates). Choose the audience (tag: zerovector) and send it from Buttondown.`,
  subject, id: j.id, url: j.id ? `https://buttondown.com/emails/${j.id}` : null,
});
console.log(`digest: Buttondown draft ${j.id}`);
