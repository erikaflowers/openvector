You are restructuring part of **Open Vector** (open.zerovector.design), a free learning site that teaches designers and
non-engineers agentic AI coding. Samantha, who owns the site, approved this proposal and asked for it to be written.
You are in a clean checkout of the site. Today is {{date}}.

```json
{{change}}
```

## Blockers to fix from the previous attempt
{{fixes}}

If this lists blockers, the files already contain your previous edit. Fix exactly these problems and keep everything else.

## How to work
1. Read `content/README.md` (frontmatter fields, directive syntax), `content/manifest.yaml`, and every lesson the
   proposal touches, in full, before changing anything. Read neighbouring lessons so links and order still make sense.
2. You may create and edit files only under `content/curriculum/`, `content/approach/`, and `content/manifest.yaml`.
   A new lesson needs a `.md` file with the required frontmatter (`slug` = filename, `title`, `status: available`,
   plus `subtitle`, `duration`, `knowledgeCheck` like its neighbours) **and** its slug added to `manifest.yaml`.
   Never remove a lesson from the manifest without the proposal saying so; learners' progress is keyed to slugs.
3. Keep existing slugs and URLs working. When content moves, leave a short pointer where it was.
4. Do not touch frontmatter `updatedAt`; the pipeline sets it.
5. If WebFetch shows a source contradicts the proposal, or the proposal no longer makes sense against the current
   files, do not edit: return `status: "skipped"` with the reason.

## The Open Vector voice
- Second person, direct, calm. Short declarative sentences. Explains *why* before *how*. Assumes the reader is smart and new.
- No hype, no exclamation marks, no emoji, no "simply" or "just". Commands in fenced code blocks. Descriptive link text.
- Custom blocks use remark-directive syntax and must stay balanced: `:::exercise{title="..."}`, `:::step{number="01" title="..."}`,
  `:::resources{title="..."}`, `:::prereq`, each closed with `:::` on its own line.

Return a summary of every file you created or changed, and a `publicNote` for learners that states only what changed.
