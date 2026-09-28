// Shared helpers for the Open Vector Autopilot scripts.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import yaml from 'js-yaml';
import { fileURLToPath } from 'node:url';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
// The site being inspected. run.sh points this at a clean origin/main worktree; defaults to this checkout.
export const REPO = process.env.OV_REPO || path.resolve(HERE, '../..');
export const STATE = process.env.OV_STATE || path.join(os.homedir(), 'Library/Application Support/ov-autopilot');
export const UA = 'Mozilla/5.0 (Macintosh) OpenVector-Autopilot/1.0';

// Local calendar date (the Mini's timezone), matching run.sh's `date +%F`.
export const today = () => new Date().toLocaleDateString('en-CA');
export const runDir = (date = process.env.OV_RUN_DATE || today()) => {
  const d = path.join(STATE, 'runs', date);
  fs.mkdirSync(d, { recursive: true });
  return d;
};

export const loadYaml = (name) => yaml.load(fs.readFileSync(path.join(HERE, name), 'utf8'));
export const readJson = (p, fallback) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; } };
export const writeJson = (p, data) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n'); };
export const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

export async function fetchText(url, { timeout = 20000, method = 'GET' } = {}) {
  const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(timeout), headers: { 'user-agent': UA } });
  return { status: res.status, ok: res.ok, text: method === 'HEAD' ? '' : await res.text() };
}

const decode = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');

export const stripTags = (html) => decode(html)
  .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[ \t\r\f\v]+/g, ' ')
  .replace(/\s*\n\s*/g, '\n')
  .trim();

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]).trim() : '';
};

// Minimal RSS 2.0 / Atom parser. Good enough for release and news feeds; no dependencies.
export function parseFeed(xml) {
  const blocks = xml.match(/<(entry|item)\b[\s\S]*?<\/\1>/gi) || [];
  return blocks.map((b) => {
    const atomLink = b.match(/<link\b[^>]*href="([^"]+)"/i);
    const link = atomLink ? decode(atomLink[1]) : tag(b, 'link');
    const date = tag(b, 'published') || tag(b, 'updated') || tag(b, 'pubDate') || tag(b, 'dc:date');
    const summary = stripTags(tag(b, 'content') || tag(b, 'summary') || tag(b, 'description')).slice(0, 800);
    return {
      id: tag(b, 'id') || tag(b, 'guid') || link,
      title: stripTags(tag(b, 'title')),
      link,
      date: date ? new Date(date).toISOString() : null,
      summary,
    };
  });
}

// Glob → RegExp for the allowlist (supports ** and *).
export const globToRe = (g) => new RegExp('^' + g
  .replace(/[.+^${}()|[\]\\]/g, '\\$&')
  .replace(/\*\*\//g, '(?:.*/)?')
  .replace(/\*\*/g, '.*')
  .replace(/\*/g, '[^/]*') + '$');

// Guardrail in code, not in the prompt: T0 may only touch allowlisted files. Anything else becomes T1.
export function enforceTiers(brief, config) {
  const allow = config.allowlist.map(globToRe);
  for (const c of brief?.changes || []) {
    const outside = c.files.filter((f) => !allow.some((re) => re.test(f)));
    if (c.tier === 'T0' && outside.length) {
      c.tier = 'T1';
      c.why += ` [Promoted from T0: ${outside.join(', ')} ${outside.length > 1 ? 'are' : 'is'} outside the auto-merge allowlist.]`;
    }
  }
  return brief;
}

// content/curriculum/<level>/<slug>.md → "<level>/<slug>" (the progress table's lesson_key); approach → "approach/<slug>".
export function lessonKey(file) {
  let m = file.match(/^content\/curriculum\/([^/]+)\/([^/]+)\.md$/);
  if (m) return `${m[1]}/${m[2]}`;
  m = file.match(/^content\/approach\/([^/]+)\.md$/);
  return m ? `approach/${m[1]}` : null;
}

// Secrets live in $OV_STATE/.env (written by Samantha off camera). Values are never logged.
export function loadEnv() {
  const p = path.join(STATE, '.env');
  const env = {};
  if (!fs.existsSync(p)) return env;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}
