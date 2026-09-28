// Pre-renders every public route to static HTML after `vite build`, plus sitemap.xml.
//
// Open Vector is a single-page app, so without this every URL serves the same index.html:
// one title, one description, no lesson text. Link previews (LinkedIn, X, Slack) never run
// JavaScript and search engines render it late. Each route now gets its own <title>,
// description, canonical, Open Graph/Twitter tags, JSON-LD and the lesson text as real HTML.
// React still mounts with createRoot and replaces #root, so the app behaves exactly as before.
// Netlify serves these files before the SPA fallback redirect.
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import learnContentPlugin from '../vite-plugin-learn-content.js';
import { fullTitle, SITE, BASE_URL, DEFAULT_DESC, DEFAULT_IMAGE } from '../src/hooks/seo-config.js';

const DIST = path.resolve('dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// The same data the app gets from virtual:learn-content.
const plugin = learnContentPlugin();
const code = plugin.load(plugin.resolveId('virtual:learn-content'));
const learn = JSON.parse(code.replace(/^export default /, '').replace(/;\s*$/, ''));

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = (text) => renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkDirective] }, text));
const plain = (text) => text.replace(/^#{1,6} .*$/gm, '').replace(/^:::.*$/gm, '').replace(/```[\s\S]*?```/g, '').replace(/[#>*_`[\]]|\(https?:[^)]*\)/g, '').replace(/\s+/g, ' ').trim();
const describe = (subtitle, body) => {
  const lead = plain(body).slice(0, 220);
  const text = subtitle ? `${subtitle} ${lead}` : lead;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, '')}…` : text;
};

// ---- Routes -------------------------------------------------------------------------------
const pages = [];
const lessonLinks = [];

for (const level of learn.levels) {
  const levelPath = `/learn/curriculum/${level.slug}`;
  pages.push({
    path: levelPath,
    title: `${level.number} ${level.title}`,
    description: describe(level.subtitle, level.desc || ''),
    body: `<h1>${esc(level.number)} ${esc(level.title)}</h1><p>${esc(level.subtitle)}</p><p>${esc(level.desc)}</p>
      <ol>${level.lessons.map((l) => `<li><a href="${levelPath}/${l.slug}">${esc(l.title)}</a>: ${esc(l.subtitle)}</li>`).join('')}</ol>`,
  });
  for (const l of level.lessons) {
    const p = `${levelPath}/${l.slug}`;
    lessonLinks.push({ path: p, title: l.title, group: `${level.number} ${level.title}` });
    pages.push({
      path: p, lesson: l, group: `${level.number} ${level.title}`,
      title: l.title,
      description: describe(l.subtitle, l.markdownBody),
      body: `<p>${esc(level.number)} ${esc(level.title)}${l.duration ? ` · ${esc(l.duration)}` : ''}</p><h1>${esc(l.title)}</h1><p>${esc(l.subtitle)}</p>${md(l.markdownBody)}`,
    });
  }
}

const categories = learn.approach.categories || [];
for (const cat of categories) {
  const guides = learn.approach.guides.filter((g) => g.category === cat.key);
  pages.push({
    path: `/learn/approach/${cat.key}`,
    title: cat.label,
    description: describe(cat.subtitle, cat.desc || ''),
    body: `<h1>${esc(cat.label)}</h1><p>${esc(cat.subtitle)}</p><ul>${guides.map((g) => `<li><a href="/learn/approach/${cat.key}/${g.slug}">${esc(g.title)}</a>: ${esc(g.subtitle)}</li>`).join('')}</ul>`,
  });
}
for (const g of learn.approach.guides) {
  const p = `/learn/approach/${g.category}/${g.slug}`;
  lessonLinks.push({ path: p, title: g.title, group: 'Approach' });
  pages.push({
    path: p, lesson: g, group: 'Approach',
    title: g.title,
    description: describe(g.subtitle, g.markdownBody),
    body: `<p>Approach guide${g.duration ? ` · ${esc(g.duration)}` : ''}</p><h1>${esc(g.title)}</h1><p>${esc(g.subtitle)}</p>${md(g.markdownBody)}`,
  });
}

// Static pages: title/description/path come from each page's own useSEO({ ... }) literal.
const pagesDir = path.resolve('src/pages/learn');
for (const f of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.jsx'))) {
  const src = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  const m = src.match(/useSEO\(\{\s*title:\s*(['"`])((?:\\.|(?!\1).)*)\1,\s*description:\s*(['"`])((?:\\.|(?!\3).)*)\3,\s*path:\s*['"]([^'"]+)['"]/s);
  if (!m || m[5] === '/learn/progress' || pages.some((p) => p.path === m[5])) continue;
  const title = m[2].replace(/\\'/g, "'"), description = m[4].replace(/\\'/g, "'");
  const extra = m[5] === '/learn/curriculum'
    ? learn.levels.map((l) => `<h2><a href="/learn/curriculum/${l.slug}">${esc(l.number)} ${esc(l.title)}</a></h2><p>${esc(l.subtitle)}</p>`).join('')
    : '';
  pages.push({ path: m[5], title, description, body: `<h1>${esc(title.replace(/ — (The )?Open Vector$/, ''))}</h1><p>${esc(description)}</p>${extra}` });
}

// ---- Render -------------------------------------------------------------------------------
const nav = `<nav aria-label="All lessons"><h2>The Open Vector curriculum</h2><ul>${lessonLinks.map((l) => `<li><a href="${l.path}">${esc(l.title)}</a> <small>${esc(l.group)}</small></li>`).join('')}</ul></nav>`;

const setTag = (html, re, tag) => (re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`));

function renderPage(p) {
  const title = fullTitle(p.title, p.path);
  const url = `${BASE_URL}${p.path}`;
  const desc = p.description || DEFAULT_DESC;
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(desc)}" />`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(desc)}" />`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${p.lesson ? 'article' : 'website'}" />`);
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(desc)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  if (p.lesson) {
    const ld = {
      '@context': 'https://schema.org', '@type': 'LearningResource',
      name: p.lesson.title, description: desc, url, inLanguage: 'en', isAccessibleForFree: true,
      learningResourceType: p.group === 'Approach' ? 'Guide' : 'Lesson',
      ...(p.lesson.duration ? { timeRequired: `PT${parseInt(p.lesson.duration, 10) || 0}M` } : {}),
      ...(p.lesson.updatedAt ? { dateModified: String(p.lesson.updatedAt).slice(0, 10) } : {}),
      isPartOf: { '@type': 'Course', name: SITE, url: `${BASE_URL}/learn/curriculum` },
      publisher: { '@type': 'Organization', name: 'Zero Vector Design', url: 'https://zerovector.design' },
      image: DEFAULT_IMAGE,
    };
    if (p.lesson.updatedAt) html = setTag(html, /<meta property="article:modified_time"[^>]*>/, `<meta property="article:modified_time" content="${String(p.lesson.updatedAt).slice(0, 10)}" />`);
    html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n  </head>`);
  }
  // Content inside #root: replaced by React on load, read by crawlers and previews.
  html = html.replace(/<div id="root"><\/div>/, `<div id="root"><main class="ov-prerender">${p.body}</main>${nav}</div>`);
  const out = path.join(DIST, p.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

if (!/<div id="root"><\/div>/.test(template)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
pages.forEach(renderPage);

// ---- sitemap.xml --------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const lastmod = (p) => (p.lesson?.updatedAt ? String(p.lesson.updatedAt).slice(0, 10) : p.path === '/learn/changelog' ? (learn.updates?.[0]?.date || today) : null);
const urls = [{ path: '/' }, ...pages].map((p) => `  <url><loc>${BASE_URL}${p.path}</loc>${lastmod(p) ? `<lastmod>${lastmod(p)}</lastmod>` : ''}</url>`);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);

console.log(`prerender: ${pages.length} pages + sitemap.xml (${urls.length} urls)`);
