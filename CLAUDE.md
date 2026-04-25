# Open Vector

The Open Vector is a free learning platform for design-led engineering, hosted at **open.zerovector.design**. It is the educational arm of the Zero Vector design manifesto (zerovector.design).

## Stack

- **Framework:** React 19 + Vite 7 SPA
- **Routing:** React Router v7 (client-side, SPA catch-all redirect in netlify.toml)
- **Markdown:** react-markdown + remark-gfm + remark-directive (custom directives for exercise, template, step, resources, prereq blocks)
- **Auth:** Google OAuth via Supabase
- **Search:** Fuse.js (client-side fuzzy search)
- **AI Chat:** Anthropic SDK, runs through Netlify Functions
- **Deploy:** Netlify auto-deploys on push to main. Build: `npm run build` → `dist/`
- **Dev:** `npm run dev` (Vite on port 5174) or `npm run dev:netlify` (Netlify Dev on port 3007, needed for functions)

## Live Domain

**https://open.zerovector.design**

## GitHub

**erikaflowers/openvector**

## Key Directories

```
content/                  Markdown lesson content + manifest
  manifest.yaml           Defines all levels, lessons, approach guides, and their order
  curriculum/             Lesson markdown files, organized by level
    00-orientation/       Level 00: Terminal, files, git, deployment, DNS
    01-foundation/        Level 01: Systems thinking, architecture, planning
    02-the-medium/        Level 02: Claude Code, prompting, React, shipping
    03-the-pipeline/      Level 03: Research, synthesis, JTBD, prototyping, validation
    04-orchestration/     Level 04: CLAUDE.md, multi-agent, crew model
    05-auteur/            Level 05: Personal methodology, teaching, community
  approach/               Step-by-step "how to" guides (separate from curriculum)
src/
  App.jsx                 Root component, all route definitions
  main.jsx                Entry point
  layouts/
    LearnLayout.jsx       Main layout wrapper (nav, sidebar, breadcrumbs, pagination)
  pages/
    OpenVectorPage.jsx    Landing page (/)
    learn/                All /learn/* page components
  components/
    learn/
      MarkdownRenderer.jsx  Renders lesson markdown with custom directive components
      RightRail.jsx         Right sidebar (TOC, sign-in, bug report link)
      LearnSidebar.jsx      Left navigation sidebar
      LearnNav.jsx          Top navigation bar
      LearnSearch.jsx       Fuzzy search (Fuse.js)
      KnowledgeCheck.jsx    End-of-lesson reflection questions
    Animate.jsx           Shared animation component
    AnonWelcomeModal.jsx  Modal shown to signed-out users
    DecryptText.jsx       Shared text reveal effect
    ErrorBoundary.jsx     React error boundary
    icons.jsx             Icon library
    NotifyForm.jsx        Email notification form
    WelcomeModal.jsx      Post-sign-in welcome modal
  contexts/
    UserContext.jsx        Auth state (Supabase Google OAuth)
    ProgressContext.jsx    Lesson completion tracking
    ThemeContext.jsx       Light/dark theme
  hooks/
    useInView.js           Intersection observer hook
    useMousePosition.js    Mouse position tracking hook
    useSEO.js              Page metadata / SEO hook
  lib/
    supabase.js            Supabase client
  content/                 Static JS config for non-lesson pages (NOT lesson markdown — that lives in the top-level content/ directory)
    en.js                  i18n-style copy strings
    open.js                Landing page copy
    recommended-reading.js Reading list data
    learn/                 Legacy curriculum files (changelog.js, glossary.js, resources.js, themes.js, index.js are live; remaining files are dead code pending cleanup)
  utils/
    remark-custom-directives.js   Remark plugin for :::exercise, :::template, :::step, :::resources, :::prereq
  styles/
    site.css              All styles (single file, CSS custom properties)
netlify/
  functions/
    learn-chat.js         Serverless function for AI chat feature
vite-plugin-learn-content.js   Custom Vite plugin: reads manifest + markdown, serves as virtual:learn-content
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | OpenVectorPage | Landing page |
| `/learn` | LearnHubPage | Learning hub home |
| `/learn/curriculum` | LearnIndexPage | All levels overview |
| `/learn/curriculum/:levelSlug` | LevelPage | Single level with its lessons |
| `/learn/curriculum/:levelSlug/:lessonSlug` | LessonPage | Individual lesson |
| `/learn/approach` | ApproachIndexPage | Step-by-step guides index |
| `/learn/approach/:guideSlug` | GuidePage | Individual guide |
| `/learn/chat` | LearnChatPage | AI chat companion |
| `/learn/resources` | LearnResourcesPage | External resources |
| `/learn/progress` | LearnProgressPage | User progress dashboard |
| `/learn/workflows` | LearnWorkflowsPage | Workflow guides |
| `/learn/contribute` | LearnContributePage | How to contribute |
| `/learn/about` | LearnAboutPage | About the project |
| `/learn/faq` | LearnFAQPage | FAQ |
| `/learn/changelog` | LearnChangelogPage | What's new |
| `/learn/glossary` | LearnGlossaryPage | Terms glossary |
| `/learn/enterprise` | LearnEnterprisePage | Enterprise info |

## Content System

Lesson content lives in `content/` as markdown files with YAML frontmatter. The `content/manifest.yaml` controls hierarchy and ordering. A custom Vite plugin (`vite-plugin-learn-content.js`) reads the manifest + all referenced `.md` files at build time and serves them as `virtual:learn-content`.

To add a lesson: create the `.md` file in the appropriate level folder, then add its slug to `manifest.yaml`.

### Custom Markdown Directives

Lessons use remark-directive syntax for special blocks:

```markdown
:::exercise{title="Do the Thing"}
Instructions here.
:::

:::template{title="Starter Code"}
Raw preformatted content here (not rendered as markdown).
:::

:::step{number="01" title="First Step"}
Step content.
:::

:::resources{title="Go Deeper"}
- [Link](url). Description of the resource.
:::

:::prereq
Confirm the required tool is installed before continuing. Instructions for each OS if needed.
:::
```

## Environment Variables

- `ANTHROPIC_API_KEY` — for the AI chat Netlify Function
- Supabase keys — for Google OAuth and progress tracking
- Set locally in `.env`, in production via Netlify dashboard

## Common Tasks

**Run locally:** `npm run dev` (port 5174). Use `npm run dev:netlify` (port 3007) if testing AI chat or other functions.

**Add a lesson:** Create `content/curriculum/{level-slug}/{lesson-slug}.md` with frontmatter, add slug to `content/manifest.yaml`.

**Add an approach guide:** Create `content/approach/{guide-slug}.md` with frontmatter, add slug to `manifest.yaml` under `approach.guides`.

**Build for production:** `npm run build` outputs to `dist/`.

**Deploy:** Push to main. Netlify auto-builds and deploys.
