// Shared by useSEO (in the browser) and scripts/prerender.mjs (at build time),
// so the static HTML and the running app always agree on titles and defaults.
export const SITE = 'The Open Vector';
export const BASE_URL = 'https://open.zerovector.design';
export const DEFAULT_DESC = 'Learn to build software with AI agents, free. Six levels from your first terminal command to shipping your own vision, kept current as the tools change.';
export const DEFAULT_IMAGE = `${BASE_URL}/og/open-vector.png`;

// "Claude Code" → "Claude Code — The Open Vector". Titles that already carry the site name
// (some pages pass "FAQ — The Open Vector") are not suffixed twice.
export function fullTitle(title, path = '/') {
  if (path === '/' || !title) return SITE;
  return `${String(title).replace(/\s+—\s+(The\s+)?Open Vector$/, '')} — ${SITE}`;
}
