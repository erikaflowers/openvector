# The Open Vector

A free, open learning platform for design-led engineering with AI. Six levels. Forty lessons. From terminal basics to Systems Auteur.

**Live at [open.zerovector.design](https://open.zerovector.design)**

## What This Is

The Open Vector is the curriculum arm of [Zero Vector](https://zerovector.design) — a design philosophy for building with AI that treats craft as non-negotiable. This platform teaches you how to go from zero to shipping real products using AI agents as crew, not crutches.

**Six levels:**

| Level | Name | Focus |
|-------|------|-------|
| 00 | Orientation | Terminal, files, Git, deployment, DNS |
| 01 | Foundation | Systems thinking, architecture, data modeling, VECTOR.md |
| 02 | The Medium | Claude Code, prompting, React, your first ship |
| 03 | The Pipeline | Research, synthesis, JTBD, ideation, validation, shipping |
| 04 | Orchestration | Multi-agent workflows, CLAUDE.md, staged prompts, crew model |
| 05 | Auteur | Personal methodology, framework design, teaching, contribution |

Plus 11 **Approach guides** — step-by-step walkthroughs for common tasks like scaffolding a project, writing a PRD, or debugging with AI.

## Running Locally

```bash
git clone git@github.com:erikaflowers/openvector.git
cd openvector
npm install
```

Create a `.env` file (see `.env.example`):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Start the dev server:

```bash
npm run dev          # Vite on port 5174
```

For Netlify Functions (AI chat):

```bash
npm run dev:netlify  # Netlify Dev proxy on port 3007
```

## Stack

- **React 19** + **Vite 7** SPA
- **React Router 7** — client-side routing
- **Supabase** — Google OAuth + progress tracking
- **Fuse.js** — client-side lesson search
- **Netlify Functions** — AI learning companion (Claude Sonnet)
- **Custom CSS** — no frameworks, prefixed `.ov-` (landing) and `.ovl-` (learn)

## Project Structure

Lesson content lives in the top-level `content/` directory as markdown files — that is where to go to add or edit a lesson.

```
content/                         Markdown lesson content (source of truth for curriculum)
├── manifest.yaml                Defines levels, lessons, approach guides, and their order
├── curriculum/                  One folder per level, one .md file per lesson
│   ├── 00-orientation/
│   ├── 01-foundation/
│   ├── 02-the-medium/
│   ├── 03-the-pipeline/
│   ├── 04-orchestration/
│   └── 05-auteur/
└── approach/                    Step-by-step guide markdown files

src/                             React application source
├── App.jsx                      Root component, all route definitions
├── main.jsx                     Entry point
├── pages/
│   ├── OpenVectorPage.jsx       Landing page (/)
│   └── learn/                   All /learn/* page components
├── layouts/
│   └── LearnLayout.jsx          Learn shell (nav, sidebar, breadcrumbs, pagination)
├── components/
│   ├── learn/                   Learn-specific components (MarkdownRenderer, LearnNav, LearnSidebar, LearnSearch, RightRail, KnowledgeCheck)
│   └── (shared)                 Animate.jsx, AnonWelcomeModal.jsx, DecryptText.jsx, ErrorBoundary.jsx, icons.jsx, NotifyForm.jsx, WelcomeModal.jsx
├── contexts/                    UserContext, ProgressContext, ThemeContext
├── hooks/                       useInView.js, useMousePosition.js, useSEO.js
├── lib/
│   └── supabase.js              Supabase client
├── content/                     Static JS config for non-lesson pages (en.js, open.js, recommended-reading.js); learn/ subtree holds changelog, glossary, resources, themes (NOT lesson markdown)
├── utils/
│   └── remark-custom-directives.js  Remark plugin for custom block directives
└── styles/
    └── site.css                 All styles (single file, CSS custom properties)

vite-plugin-learn-content.js     Custom Vite plugin: reads manifest + markdown, serves as virtual:learn-content
netlify/
└── functions/
    └── learn-chat.js            Serverless function for AI chat feature
```

## Contributing

The Open Vector is open source and contributions are welcome. Lessons are markdown files with YAML frontmatter — no JavaScript, no CMS. See `content/README.md` for the full content authoring guide.

To contribute a lesson or guide:
1. Fork the repo
2. Create a markdown file in `content/curriculum/{level-slug}/` (or `content/approach/` for approach guides)
3. Add the lesson slug to `content/manifest.yaml` under the appropriate level
4. Submit a PR

## License

Content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Code is MIT.

## Credits

Created by [Erika Flowers](https://helloerikaflowers.com) — 31 years of design leadership, ex-NASA, published author. Built with AI agents using the [Zero Vector](https://zerovector.design) methodology.
