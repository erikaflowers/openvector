# The Open Vector

A free, open learning platform for design-led engineering with AI. Six levels. Sixty lessons. From terminal basics to Systems Auteur.

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

Plus 12 **Approach guides** — step-by-step walkthroughs for common tasks like scaffolding a project, writing a PRD, or debugging with AI.

Plus **Workflows** — paid video courses with sequential pages, video walkthroughs, and written content. Purchase once, lifetime access. Built on Stripe + Mux.

## Running Locally

```bash
git clone git@github.com:erikaflowers/openvector.git
cd openvector
npm install
```

Create a `.env` file (see `.env.example`):

```
# Supabase (shared with zerovector.design)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI learning companion
ANTHROPIC_API_KEY=

# Stripe (for paid workflows)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
VITE_STRIPE_PUBLISHABLE_KEY=

# Mux (for workflow video hosting)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_SIGNING_KEY_ID=
MUX_SIGNING_KEY_PRIVATE=
```

Start the dev server:

```bash
npm run dev          # Vite on port 5174
```

For Netlify Functions (AI chat, Stripe, Mux):

```bash
npm run dev:netlify  # Netlify Dev proxy on port 3007
```

For testing Stripe purchases locally, run in a second terminal:

```bash
stripe listen --forward-to localhost:3007/.netlify/functions/stripe-webhook
```

## Stack

- **React 19** + **Vite 7** SPA
- **React Router 7** — client-side routing
- **Supabase** — Google OAuth, progress tracking, workflow content + purchases (shared DB with zerovector.design)
- **Stripe** — Checkout Sessions + webhooks for workflow purchases
- **Mux** — signed, domain-locked video hosting for workflow content
- **Fuse.js** — client-side lesson search
- **Netlify Functions** — AI learning companion (Claude Sonnet), Stripe integration, protected content delivery
- **Custom CSS** — no frameworks, prefixed `.ov-` (landing) and `.ovl-` (learn)

## Project Structure

```
src/
├── pages/                  # Page components
│   ├── OpenVectorPage.jsx  # Landing page (/)
│   └── learn/              # All /learn/* pages (curriculum, workflows, admin)
├── components/
│   └── learn/              # OV-specific components (nav, sidebar, search, workflow, admin)
├── layouts/
│   └── LearnLayout.jsx     # Learn shell (nav, sidebar, breadcrumbs)
├── content/                # Curriculum markdown (parsed by vite-plugin-learn-content)
├── contexts/               # Auth, progress, workflows, theme
├── hooks/                  # useSEO, useInView
├── lib/
│   └── supabase.js         # Supabase client
└── styles/
    └── site.css            # All styles
netlify/
└── functions/              # learn-chat, workflow content/purchase/admin, Stripe webhook
supabase/
└── migrations/             # SQL schema for paid workflows
```

## Paid Workflows

Open Vector supports paid, structured video courses. Admins create workflows at `/learn/admin/workflows` — each creates a Stripe Product + Price automatically. Users purchase via Stripe Checkout and get lifetime access. Content is stored in Supabase and gated server-side. Videos are served via signed Mux URLs (15-minute expiry, domain-locked).

The first page of every workflow is a free preview — no purchase required.

See `CLAUDE.md` for full architecture details, gotchas, and admin instructions.

## Contributing

The Open Vector is open source and contributions are welcome. Lessons are plain JavaScript objects in `src/content/learn/` — no markdown, no CMS. See `src/content/learn/_template.js` for the lesson format.

To contribute a lesson or guide:
1. Fork the repo
2. Create a new file in the appropriate level directory
3. Add it to the level's `index.js`
4. Submit a PR

## License

Content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Code is MIT.

## Credits

Created by [Erika Flowers](https://helloerikaflowers.com) — 31 years of design leadership, ex-NASA, published author. Built with AI agents using the [Zero Vector](https://zerovector.design) methodology.
