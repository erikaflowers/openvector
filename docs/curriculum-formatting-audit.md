# Curriculum formatting audit (issue #14)

Step 1 of the Open Vector improvement plan — a per-lesson punch list of formatting deviations from canon. Tick each box as its file is fixed.

## Workflow

Fixes ship as a **single PR** covering all levels — one commit per file inside one branch. The change type is uniform across the curriculum (bulletize exercises, add code-fence hints, add inline code, fix `:::resources` title), so a single review pass against this audit doc is faster for the reviewer than six separate per-level reviews.

- Branch: `fix-curriculum-formatting-02may`.
- One commit per file (33 commits total), each ticking off its checkbox below.
- Open one PR when every box is ticked.

(Default curriculum workflow remains one-file-per-branch. This single-PR-for-the-whole-sweep packaging is specific to issue #14 because the changes are uniform and audit-driven.)

## Canon

1. **Frontmatter — required keys (any order):** `slug`, `title`, `subtitle`, `duration`, `status`. Optional, not a deviation if absent: `badge`, `updatedAt`, `knowledgeCheck`. ✅ All 40 files conform.
2. **Code fences — language hints** when content is identifiably one of `bash`, `javascript`/`js`, `jsx`, `css`, `json`, `yaml`, `markdown`. **Bare fences are correct** for ASCII diagrams, file-tree drawings, terminal prompt examples that aren't commands, freeform output, prompt/dialogue text, and pseudocode outlines.
3. **`:::resources` directive title:** canon is `"Go Deeper"`. `"Links"` is a deviation.
4. **Heading hierarchy:** body uses `##` for sections, `###` for subsections. No body H1; the title comes from frontmatter. ✅ All 40 files conform.
5. **List bullets:** unordered lists use `-` (hyphen). ✅ All 40 files conform.
6. **Spacing:** single blank line between sections, no triple blank lines. ✅ All 40 files conform.
7. **Bulletized exercises:** `:::exercise{title="..."}` content is a bulleted action list (lines starting with `-`), not paragraph prose. Levels 00 and 01 already conform; levels 02–05 are mostly prose and need conversion.
8. **Inline code in prose:** wrap in single backticks for literal commands (`npm run build`, `git push`), CLI flags (`--version`), file/folder names (`.env`, `dist/`, `CLAUDE.md`), file paths (`/Users/...`, `~/projects`), code identifiers (`useState`, `BookList`), API endpoints/payloads, and environment variable names (`BUTTONDOWN_API_KEY`). **Do not** backtick general concepts ("the database"), product names in prose (React, Git, Vite, Netlify), or capitalized concept names. Apply this rule both in main prose **and** inside the new exercise bullets.

## Cross-cutting

- **Code fences:** every code block in the curriculum (45 blocks across 20 lessons) uses bare ` ``` `. The fixes per lesson below add language hints only where content is identifiably a language; diagrams, prompts, and pseudocode stay bare.
- **`:::resources{title="Links"}`:** 3 lessons deviate from "Go Deeper" canon. Listed inline below.
- **Bulletized exercises:** 25 of the 26 exercises in levels 02–05 are paragraph prose. The lone exception is `02-the-medium/claude-code.md`. Levels 00 and 01 are already done. The fix per lesson is the same shape: convert the prose paragraph(s) inside `:::exercise` into a bulleted action list, matching the canon set in `01-foundation/architecture.md`.
- **Inline code in prose:** levels 00–01 already done. In 02–05, most files are clean but a handful have specific gaps in main prose; flagged inline below. When bulletizing exercises, also apply inline-code formatting to literal commands, paths, and identifiers within the new bullets — these are not flagged exhaustively below since they fall out naturally from the bulletization pass.

## Lessons

### 00-orientation
- [x] **what-is-zero-vector.md** — L87: `:::resources{title="Links"}` → `"Go Deeper"`.
- [x] **terminal.md** — L85: bash fence (commands with `#` comments) needs ` ```bash`. L38, L45, L51 stay bare (login banner / shell prompt examples).
- [ ] **file-systems.md** — clean. (L43, L60 paths and L95 file tree all stay bare.)
- [x] **git-basics.md** — L70: bash fence (`git init` etc.) needs ` ```bash`. L47 stays bare (numbered explanation, not commands).
- [x] **repos.md** — L34, L86: bash fences (`git clone`, `git push`) need ` ```bash`.
- [x] **deployment.md** — L52: bash fence (`npm run build` + comments) needs ` ```bash`.
- [x] **dns.md** — L102: bash fence (`dig`) needs ` ```bash`. L52 stays bare (DNS record examples, not executable).

### 01-foundation
- [ ] **systems-thinking.md** — clean.
- [ ] **architecture.md** — clean. (L39 ASCII architecture diagram stays bare.)
- [ ] **nouns-and-verbs.md** — clean. (L40 text breakdown stays bare.)
- [ ] **planning.md** — clean. (L49 decomposition outline stays bare.)
- [x] **vector-md.md** — L58: markdown sample (a VECTOR.md example) needs ` ```markdown`. L139: `:::resources{title="Links"}` → `"Go Deeper"`.
- [x] **data-modeling.md** — L98: JSON example needs ` ```json`. L31 stays bare (schema pseudocode, not strict JSON).
- [ ] **information-architecture.md** — clean. (L78 URL examples with `#` comments stay bare — illustrative paths, not bash.)

### 02-the-medium
- [x] **claude-code.md** — L33, L45: bash fences (`curl ... | bash`, `cd`/`claude`) need ` ```bash`. Exercise already bulletized ✓.
- [x] **prompting.md** — Bulletize exercise (L92 prose). L31 prompt examples stay bare.
- [x] **iteration.md** — Bulletize exercise (L75 prose; convert the inline `(1)…(5)` steps into bullets).
- [x] **react-basics.md** — L27, L68, L100: JSX examples need ` ```jsx`. L126 prose: backtick `src/components/`, `src/pages/`, `src/styles/`, `src/content/`. Bulletize exercise (L146 prose).
- [x] **deploy.md** — L29: bash fence needs ` ```bash`. Bulletize exercise (L96 prose); within bullets, backtick `npm create vite@latest...`, `npm run build`, `dist`, etc.
- [x] **your-first-ship.md** — Bulletize exercise (L85 prose; convert the inline numbered five-step process into bullets).

### 03-the-pipeline
- [x] **research.md** — Bulletize exercise (L63 prose).
- [x] **synthesis.md** — Bulletize exercise (L67 prose).
- [x] **jtbd.md** — Bulletize exercise (L69 prose).
- [x] **ideation.md** — Bulletize exercise (L65 prose).
- [x] **prototyping.md** — Bulletize exercise (L69 prose).
- [x] **validation.md** — Bulletize exercise (L73 prose).
- [x] **shipping.md** — Bulletize exercise (L81 prose).
- [x] **investiture.md** — L95: `:::resources{title="Links"}` → `"Go Deeper"`. L72 file tree stays bare. Bulletize exercise (L91 prose); within bullets, backtick `mkdir investiture-test && cd ... && git init`, `npx investiture init`, `.claude/skills/`, `SKILL.md`, `vector/schemas/`, `/invest-backfill`, `VECTOR.md`.

### 04-orchestration
- [x] **claude-md.md** — L33: markdown sample needs ` ```markdown`. Bulletize exercise (L112 prose).
- [x] **multi-agent.md** — L39 prose: backtick `src/components/`, `api/`. Bulletize exercise (L75 prose).
- [x] **staged-prompts.md** — Bulletize exercise (L96 prose). L55 prompt text stays bare.
- [x] **orchestration.md** — L48 prose: backtick `GET /api/recipes/search?q=pasta`, the response-shape JSON, and the `"items"` / `"results"` field-name examples. Bulletize exercise (L89 prose).
- [x] **quality-gates.md** — Bulletize exercise (L85 prose).
- [x] **the-crew-model.md** — L41: markdown sample needs ` ```markdown`. L27 prose: backtick `src/components/`, `src/styles/`. Bulletize exercise (L110 prose); within bullets, backtick `src/components/`, `src/hooks/`, `src/styles/`, `api/`, `scripts/`.

### 05-auteur
- [x] **personal-methodology.md** — Bulletize exercise (L75 prose).
- [ ] **framework-design.md** — Bulletize exercise (L73 prose).
- [ ] **teaching.md** — Bulletize exercise (L73 prose).
- [ ] **contribution.md** — Bulletize exercise (L63 prose; convert the inline `(1)/(2)/(3)` options into bullets).
- [ ] **community.md** — Bulletize exercise (L61 prose).
- [ ] **auteur-practice.md** — Bulletize exercise (L81 prose).

## Tally

- **40 lessons audited.**
- **33 lessons need changes** across all 6 levels.
- **7 lessons clean** (all in 00-orientation and 01-foundation).
- Levels 00 and 01: code-fence hints + 3 `:::resources` title fixes only (already inline-coded and bulletized).
- Levels 02–05: 25 of 26 exercises need bulletizing; plus code-fence hints, the third `:::resources` fix, and a handful of inline-code gaps in main prose.

## Out of scope (per issue #14, Step 1)

Approach guides under `content/approach/`; screenshots (Step 2); prose rewrites; section restructuring; fact-checking.
