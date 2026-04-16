# Open Vector

The Open Vector is a free learning platform for design-led engineering, hosted at **open.zerovector.design**. It is the educational arm of the Zero Vector design manifesto (zerovector.design).

## Stack

- **Framework:** React 19 + Vite 7 SPA
- **Routing:** React Router v7 (client-side, SPA catch-all redirect in netlify.toml)
- **Markdown:** react-markdown + remark-gfm + remark-directive (custom directives for exercise, template, step, resources blocks)
- **Auth:** Google OAuth via Supabase (shared database with zerovector.design)
- **Search:** Fuse.js (client-side fuzzy search)
- **AI Chat:** Anthropic SDK, runs through Netlify Functions
- **Payments:** Stripe Checkout (hosted), webhooks via Netlify Functions
- **Video:** Mux (signed playback URLs, HLS streaming, domain-locked)
- **Deploy:** Netlify auto-deploys on push to main. Build: `npm run build` → `dist/`
- **Dev:** `npm run dev` (Vite on port 5174) or `npm run dev:netlify` (Netlify Dev on port 3007, needed for functions). `netlify.toml` has `targetPort = 5174` to bridge Vite and the Netlify proxy.

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
supabase/
  migrations/
    001_workflows.sql     Full schema for paid workflows (profiles, workflows, workflow_pages, purchases, workflow_progress) + RLS + triggers
src/
  App.jsx                 Root component, all route definitions
  main.jsx                Entry point (UserProvider > ProgressProvider > WorkflowProvider)
  layouts/
    LearnLayout.jsx       Main layout wrapper (nav, sidebar, breadcrumbs, pagination)
  pages/
    OpenVectorPage.jsx    Landing page (/)
    learn/                All /learn/* page components (lessons, workflows, admin)
  components/
    learn/
      MarkdownRenderer.jsx    Renders lesson markdown with custom directive components
      RightRail.jsx           Right sidebar (TOC, sign-in, bug report link)
      LearnSidebar.jsx        Left navigation sidebar (context-aware: workflows branch fetches live catalog)
      LearnNav.jsx            Top navigation bar
      LearnSearch.jsx         Fuzzy search (Fuse.js)
      KnowledgeCheck.jsx      End-of-lesson reflection questions
      WorkflowCard.jsx        Catalog card for paid workflows
      WorkflowVideoPlayer.jsx Mux player wrapper (signed playback)
      WorkflowPageNav.jsx     Prev/next page navigation
      WorkflowProgress.jsx    Completion progress bar
      PurchaseButton.jsx      Stripe Checkout redirect handler
      AdminGuard.jsx          is_admin check wrapper for admin routes
  contexts/
    UserContext.jsx        Auth state (Supabase Google OAuth)
    ProgressContext.jsx    Lesson completion tracking
    WorkflowContext.jsx    Workflow purchase state (hasPurchased, refreshPurchases)
    ThemeContext.jsx       Light/dark theme
  utils/
    remark-custom-directives.js   Remark plugin for :::exercise, :::template, :::step, :::resources
  styles/
    site.css              All styles (single file, CSS custom properties)
netlify/
  functions/
    learn-chat.js           AI chat feature
    create-checkout.js      Creates Stripe Checkout Session for workflow purchase
    stripe-webhook.js       Handles checkout.session.completed + charge.refunded
    workflow-content.js     Serves protected content + signed Mux playback tokens
    workflow-purchases.js   Returns authenticated user's purchases
    admin-workflow.js       Admin CRUD for workflows + pages + auto Stripe product creation
    lib/
      auth.js               verifyUser(), verifyAdmin(), supabaseAdmin client, response helpers
      rate-limit.js         Supabase RPC for IP-based rate limiting
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
| `/learn/workflows` | LearnWorkflowsPage | Paid workflow catalog |
| `/learn/workflows/:workflowSlug` | WorkflowDetailPage | Single workflow overview + purchase CTA |
| `/learn/workflows/:workflowSlug/:pageSlug` | WorkflowPageView | Protected content viewer (video + markdown) |
| `/learn/admin/workflows` | AdminWorkflowsPage | Admin: list + create workflows (is_admin only) |
| `/learn/admin/workflows/:workflowSlug` | AdminWorkflowEditPage | Admin: edit metadata + manage pages |
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
```

## Paid Workflows

Open Vector sells structured video courses (workflows) via Stripe Checkout. Content is stored in Supabase and gated server-side — never sent to the client without a verified purchase.

### Architecture

```
User clicks Buy → create-checkout Netlify Function → Stripe Checkout Session
→ User pays on Stripe → redirect to success URL
→ Stripe webhook → stripe-webhook function → updates purchases.status = 'completed'
→ Frontend polls (up to 30s) for webhook → UI flips to post-purchase state

Content requests:
WorkflowPageView → workflow-content function (verifies JWT + purchase)
→ Returns markdown + signed Mux playback token (15min expiry)
→ Frontend renders <MuxPlayer> with playbackId + tokens
```

### Database Tables (shared ZV/OV Supabase)

- **profiles** — extends auth.users. `is_admin` flag, `stripe_customer_id`. Auto-created via `on_auth_user_created` trigger.
- **workflows** — catalog (title, slug, price_cents, stripe_price_id, status). Admin-managed.
- **workflow_pages** — sequential lessons within a workflow. Page 1 is always the free preview.
- **purchases** — user_id + workflow_id + Stripe session/intent IDs. RLS: users see own, service role writes.
- **workflow_progress** — per-user page completion tracking.

RLS enforces access: `workflow_pages.content_md` only visible if `page_number = 1` OR user has completed purchase OR is_admin.

### Critical Gotchas

- **protect_admin_flag trigger:** Silently resets `is_admin` back to old value on update from `authenticated` role. Allows changes from `postgres` (SQL Editor) and service role. To promote a user to admin, use the SQL Editor — a direct UPDATE from the app will be silently reverted.
- **Stripe test vs live:** Products created with live keys only exist in live mode; swap `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY` to test keys and create a separate test workflow to test with `4242 4242 4242 4242`.
- **Webhook locally:** Use `stripe listen --forward-to localhost:3007/.netlify/functions/stripe-webhook` in a second terminal, or manually set `purchases.status = 'completed'` in Supabase for dev. The detail page polls for ~30s after purchase success redirect, so small webhook delays are handled.
- **Mux playback policy:** Must be **Signed**, not Public. Public defeats the whole purpose.
- **Mux player props:** `@mux/mux-player-react` needs `playbackId` + `tokens={{ playback, thumbnail }}` — NOT a composed `src` URL.
- **supabase.auth.getUser() destructuring:** Returns `{ data: { user } }`. If you destructure as `const { data: user }`, access with `user.user.id` — NOT `user.data.user.id`. Easy off-by-one mistake.

### Admin Interface

`/learn/admin/workflows` — protected by `AdminGuard` (checks `profiles.is_admin`). Lets you create workflows (auto-creates Stripe Product + Price), add/edit/reorder pages with a markdown textarea, set prices, publish/unpublish.

### Cover Images

Host in Supabase Storage (bucket: `workflow-covers`, public). Standard dimensions: **1280 x 720** (16:9). Paste the public URL into the Cover Image URL field in the admin editor.

### Videos (Mux)

1. Upload video in Mux Dashboard with **Signed** playback policy
2. Copy the **Playback ID** (not Asset ID)
3. Paste into the Mux Playback ID field when adding/editing a page
4. Set video duration in seconds for the page list display

## Environment Variables

- `ANTHROPIC_API_KEY` — AI chat Netlify Function
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — frontend Supabase
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — backend Supabase (Netlify Functions)
- `STRIPE_SECRET_KEY` — Stripe API (swap live/test for different modes)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signature verification
- `VITE_STRIPE_PUBLISHABLE_KEY` — frontend Stripe
- `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET` — Mux API
- `MUX_SIGNING_KEY_ID`, `MUX_SIGNING_KEY_PRIVATE` — Mux signed URL generation (private is base64-encoded RSA key)
- Set locally in `.env`, in production via Netlify dashboard

## Common Tasks

**Run locally:** `npm run dev` (port 5174). Use `npm run dev:netlify` (port 3007) if testing AI chat or other functions.

**Add a lesson:** Create `content/curriculum/{level-slug}/{lesson-slug}.md` with frontmatter, add slug to `content/manifest.yaml`.

**Add an approach guide:** Create `content/approach/{guide-slug}.md` with frontmatter, add slug to `manifest.yaml` under `approach.guides`.

**Build for production:** `npm run build` outputs to `dist/`.

**Deploy:** Push to main. Netlify auto-builds and deploys.

**Create a paid workflow:**
1. Sign in with an admin account at `/learn/admin/workflows`
2. Click "New Workflow", enter title, slug, subtitle, description, price (USD) — Stripe Product + Price auto-created
3. Add pages: title, slug, Mux Playback ID, video duration, markdown content
4. Toggle status to "Published" when ready

**Promote a user to admin:**
```sql
UPDATE public.profiles SET is_admin = true WHERE email = 'their-email@example.com';
```
Must run via Supabase SQL Editor — the `protect_admin_flag` trigger blocks changes from the app.

**Run migrations:** `supabase/migrations/001_workflows.sql` is idempotent — can be re-run safely. Handles existing ZV database gracefully via `CREATE TABLE IF NOT EXISTS` + `ADD COLUMN IF NOT EXISTS`.

**Test Stripe purchases locally:**
```bash
stripe listen --forward-to localhost:3007/.netlify/functions/stripe-webhook
```
In another terminal: `npm run dev:netlify`. Use Stripe test mode keys and test card `4242 4242 4242 4242`.
