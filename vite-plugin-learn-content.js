/**
 * Vite Plugin: Learn Content Loader
 *
 * Reads content/manifest.yaml + all referenced .md files,
 * parses frontmatter, and serves the assembled `learn` object
 * as a virtual module: `import learn from 'virtual:learn-content'`
 *
 * In dev mode, watches content/ for changes and triggers reload.
 */

import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:learn-content';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export default function learnContentPlugin() {
  const contentDir = resolve(process.cwd(), 'content');
  const manifestPath = join(contentDir, 'manifest.yaml');

  function headingId(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function extractHeadings(markdownBody) {
    const headings = [];
    const regex = /^## (.+)$/gm;
    let match;
    while ((match = regex.exec(markdownBody)) !== null) {
      headings.push({
        text: match[1],
        id: headingId(match[1]),
      });
    }
    return headings;
  }

  function readLesson(filePath) {
    const raw = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const markdownBody = content.trim();
    const headings = extractHeadings(markdownBody);

    return {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle || '',
      duration: data.duration || '',
      status: data.status || 'available',
      badge: data.badge || null,
      updatedAt: data.updatedAt || null,
      category: data.category || null,
      prerequisites: data.prerequisites || [],
      markdownBody,
      headings,
      knowledgeCheck: data.knowledgeCheck || [],
    };
  }

  function buildLearnObject() {
    const manifestRaw = readFileSync(manifestPath, 'utf-8');
    const manifest = yaml.load(manifestRaw);

    // Build levels
    const levels = manifest.levels.map(level => {
      const lessons = level.lessons.map(slug => {
        const filePath = join(contentDir, 'curriculum', level.slug, `${slug}.md`);
        try {
          return readLesson(filePath);
        } catch (err) {
          console.warn(`[learn-content] Missing lesson: ${level.slug}/${slug}.md`);
          return null;
        }
      }).filter(Boolean);

      return {
        slug: level.slug,
        number: level.number,
        title: level.title,
        subtitle: level.subtitle,
        status: level.status,
        desc: level.desc,
        prereqs: level.prereqs,
        outcomes: level.outcomes || [],
        lessons,
      };
    });

    // Build approach
    const guides = manifest.approach.guides.map(slug => {
      const filePath = join(contentDir, 'approach', `${slug}.md`);
      try {
        return readLesson(filePath);
      } catch (err) {
        console.warn(`[learn-content] Missing guide: approach/${slug}.md`);
        return null;
      }
    }).filter(Boolean);

    const approach = {
      title: manifest.approach.title,
      subtitle: manifest.approach.subtitle,
      intro: manifest.approach.intro,
      categories: manifest.approach.categories || [],
      guides,
    };

    return {
      nav: manifest.nav,
      index: manifest.index,
      levels,
      approach,
    };
  }

  return {
    name: 'learn-content',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const learn = buildLearnObject();
        return `export default ${JSON.stringify(learn)};`;
      }
    },

    configureServer(server) {
      // Watch content directory for changes in dev mode
      server.watcher.add(contentDir);
      server.watcher.on('change', (file) => {
        if (file.startsWith(contentDir)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        }
      });
    },

    // Re-build on changes during build watch mode
    handleHotUpdate({ file, server }) {
      if (file.startsWith(contentDir)) {
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          return [mod];
        }
      }
    },
  };
}
