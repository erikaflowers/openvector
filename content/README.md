# Open Vector Content Guide

This directory contains all learning content for The Open Vector platform. Lessons are markdown files with YAML frontmatter. The hierarchy is defined in `manifest.yaml`.

---

## File Structure

```
content/
├── manifest.yaml              ← Defines level order, lesson order, approach categories
├── curriculum/
│   ├── 00-orientation/        ← Level folders match manifest slugs
│   │   ├── terminal.md        ← One file per lesson, filename = slug
│   │   └── ...
│   └── ...
└── approach/
    ├── first-session.md       ← One file per guide
    └── ...
```

---

## Frontmatter

Every lesson starts with a YAML frontmatter block:

```yaml
---
slug: terminal
title: The Terminal
subtitle: Your first interface was a command line. It still is.
duration: 20 min
status: available
badge: new
knowledgeCheck:
  - question: "What does cd stand for?"
    hint: "Think about moving between folders."
---
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL segment. Must match the filename (without `.md`). |
| `title` | string | Lesson display title. |
| `status` | string | `available`, `coming`, or `draft`. Only `available` lessons are published. |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `subtitle` | string | One-line description shown on cards and lesson headers. |
| `duration` | string | Estimated reading time, e.g. `"20 min"`. |
| `badge` | string | `new` or `updated`. Shows a badge in the sidebar and lesson header. |
| `updatedAt` | string | ISO date, e.g. `"2026-03-21"`. Used for "Recently Updated" sorting. |
| `knowledgeCheck` | array | Self-assessment questions shown at the end of the lesson. Each item has `question` (required) and `hint` (optional). |

### Approach Guide Fields

Approach guides use two additional fields:

| Field | Type | Description |
|-------|------|-------------|
| `category` | string | One of: `getting-started`, `planning`, `working-with-agents`, `build-workflow`. Must match a category key in `manifest.yaml`. |
| `prerequisites` | array | List of lesson paths, e.g. `["00-orientation/terminal", "00-orientation/file-systems"]`. Rendered as links on the guide page. |

---

## Standard Markdown

Most content uses standard markdown. These elements are styled automatically:

### Headings

```markdown
## Section Heading

Used for major sections. Generates the Table of Contents in the right rail.
Only use `##` (h2) for section breaks. Avoid `#` (h1) — the lesson title is the h1.
```

### Paragraphs

```markdown
Just write text. Each paragraph separated by a blank line becomes its own `<p>`.
```

### Code Blocks

````markdown
```bash
curl -fsSL https://claude.ai/install.sh | bash
```
````

Fenced code blocks render in a dark monospace container. The language tag (e.g. `bash`, `javascript`) is optional but recommended for readability.

### Blockquotes → Callouts

```markdown
> Claude Code does not replace thinking. It replaces typing.
```

Blockquotes render as **callout boxes** with a blue accent border and subtle background. Use them for key takeaways, principles, or important notes. One callout per concept.

### Links

```markdown
[Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/overview)
```

External links (starting with `http`) automatically open in a new tab. Internal links (starting with `/`) use client-side navigation.

### Lists

```markdown
- Item one
- Item two
- Item three
```

Standard unordered and ordered lists work as expected.

---

## Custom Block Directives

For content that needs special styling beyond standard markdown, we use **container directives**. These use the `:::` fence syntax:

```
:::directiveName{key="value" anotherKey="value"}
Content goes here. Standard markdown works inside.
:::
```

### Exercise

A labeled practice block with green accent styling.

```markdown
:::exercise{title="Navigate, Create, Explore"}
Open your terminal. Run `pwd` to see where you are. Run `mkdir test` to create a folder. Run `ls` to confirm it exists.
:::
```

**Attributes:**
- `title` (optional): Exercise name displayed as a subheading.

**Renders as:** Green-bordered box with "Exercise" label.

### Template

A copyable prompt or template block styled as monospace.

```markdown
:::template{title="Your First Prompt"}
Create a simple personal homepage with my name, a short bio, and three links to my favorite websites. Use a clean, minimal design with a dark background and light text.
:::
```

**Attributes:**
- `title` (optional): Template name displayed in the header.

**Renders as:** Labeled box with "Template" tag, styled for copying.

### Step

A numbered procedural step with a circular badge.

```markdown
:::step{number="01" title="Open Your Terminal"}
On macOS, press Command + Space, type "Terminal", and hit Enter.

You should see a dark window with a blinking cursor.
:::
```

**Attributes:**
- `number` (required): Step number displayed in the circular badge (e.g. `"01"`, `"02"`).
- `title` (optional): Step heading. Added to the Table of Contents.

**Renders as:** Numbered circle + title + body paragraphs. Used in Approach guides for IKEA-style walkthroughs.

### Resources

A list of external links with descriptions.

```markdown
:::resources{title="Go Deeper"}
- [The Missing Semester](https://missing.csail.mit.edu/) — MIT course on tools nobody teaches you.
- [Command Line Power User](https://commandlinepoweruser.com/) — Free video series by Wes Bos.
- [explainshell.com](https://explainshell.com/) — Paste any command to see what it does.
:::
```

**Attributes:**
- `title` (optional): Section heading (e.g. "Go Deeper", "Links"). Added to the Table of Contents.

**Format:** Each item is a markdown list item with a link followed by a period and a description. The link text becomes the resource title, the URL becomes the link, and everything after the period becomes the note.

**Renders as:** Blue-accented box with a heading and a styled link list. All links open in a new tab.

### Prereq

A prerequisite block nested inside an `:::exercise` directive. Use it to surface setup or verification steps the reader must complete before attempting the exercise.

```markdown
::::exercise{title="Your First Repository"}

:::prereq
Confirm Git is installed: run `git --version` in your terminal. If you see a version number, you are ready. If not:

- **Mac:** Run `xcode-select --install`. When it finishes, Git will be available.
- **Windows:** Download Git for Windows from [git-scm.com](https://git-scm.com/download/win) and run the installer with default settings.
:::

- Open your terminal
- Create a project folder: `mkdir git-practice && cd git-practice`
::::
```

**Attributes:** None.

**Usage note:** `prereq` is a nested directive, so the outer `:::exercise` fence must use four colons (`::::`) to distinguish it from the inner `:::prereq` fence.

**Renders as:** A styled block inside the exercise container, visually separated from the exercise steps. Signals to the reader that this must be true before proceeding.

---

## Adding a New Directive

To add a new custom block type:

### 1. Choose a name

Pick a lowercase name for your directive (e.g. `warning`, `quiz`, `video`).

### 2. Register it in the remark plugin

Edit `src/utils/remark-custom-directives.js` and add your name to the `nameMap`:

```javascript
const nameMap = {
  exercise: 'exercise',
  template: 'template-block',
  step: 'step',
  resources: 'resources',
  warning: 'warning',        // ← add here
};
```

If your name conflicts with an HTML element, use a different mapped name (like we do with `template` → `template-block` to avoid the HTML `<template>` element).

### 3. Create the React component

Edit `src/components/learn/MarkdownRenderer.jsx`. Add a component function:

```jsx
function WarningBlock({ children, title }) {
  return (
    <div className="ovl-block ovl-block-warning">
      <div className="ovl-warning-label">Warning</div>
      {title && <h3 className="ovl-warning-title">{title}</h3>}
      <div className="ovl-warning-body">{children}</div>
    </div>
  );
}
```

Then add it to the `components` map:

```javascript
const components = {
  // ... existing components ...
  warning: WarningBlock,
};
```

### 4. Add CSS styles

Edit `src/styles/site.css` and add styles following the existing pattern:

```css
.ovl-block-warning {
  border-left: 3px solid var(--color-warning, #e5a100);
  background: var(--color-warning-bg, rgba(229, 161, 0, 0.06));
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 6px;
}

.ovl-warning-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-warning, #e5a100);
  margin-bottom: 0.5rem;
}
```

### 5. Use it in markdown

```markdown
:::warning{title="Destructive Command"}
The `rm` command permanently deletes files. There is no Trash and no undo.
:::
```

---

## The Manifest

`manifest.yaml` controls what appears on the site and in what order. Lesson metadata (title, duration, etc.) lives in each `.md` file's frontmatter; the manifest only controls **hierarchy and ordering**.

### Adding a Lesson

1. Create the `.md` file in the appropriate level folder
2. Add the slug to the level's `lessons` list in `manifest.yaml`
3. The lesson appears in the sidebar, pagination, and level page automatically

### Reordering Lessons

Change the position in the `lessons` array. First item = first in sidebar.

### Moving a Lesson Between Levels

Move the slug from one level's `lessons` list to another. Move the `.md` file to the corresponding folder.

### Adding a New Level

Add a new entry to the `levels` array in the manifest with all required fields (slug, number, title, subtitle, status, desc, prereqs, outcomes, lessons). Create the corresponding folder in `content/curriculum/`.

### Adding an Approach Guide

1. Create the `.md` file in `content/approach/`
2. Include `category` in the frontmatter
3. Add the slug to the `guides` list in `manifest.yaml`

### Adding an Approach Category

Add a new entry to `approach.categories` in the manifest. Guides with a matching `category` value in their frontmatter will be grouped under it.

---

## Tips

- **One `##` per topic.** Each `##` heading creates a TOC entry. Use them to break the lesson into scannable sections.
- **Callouts are for key ideas.** Don't overuse blockquotes. One callout per major concept keeps them impactful.
- **Steps are for procedures.** Use `:::step` when the reader should follow along in order. Use regular headings for conceptual sections.
- **Keep exercises actionable.** Every exercise should end with the reader having done something on their own machine.
- **Resources go at the end.** The `:::resources` block is typically the last section in a lesson.
- **Frontmatter stays flat.** Don't nest objects in frontmatter beyond `knowledgeCheck`. Keep metadata simple.
