# Curriculum formatting audit (issue #14)

Step 1 of the Open Vector improvement plan — a per-lesson punch list of formatting deviations from canon. Fixes ship lesson-by-lesson against this checklist on separate branches; tick each box as its branch merges.

## Canon

1. **Frontmatter — required keys (any order):** `slug`, `title`, `subtitle`, `duration`, `status`. Optional, not a deviation if absent: `badge`, `updatedAt`, `knowledgeCheck`. ✅ All 40 files conform.
2. **Code fences — language hints** when content is identifiably one of `bash`, `javascript`/`js`, `jsx`, `css`, `json`, `yaml`, `markdown`. **Bare fences are correct** for ASCII diagrams, file-tree drawings, terminal prompt examples that aren't commands, freeform output, prompt/dialogue text, and pseudocode outlines.
3. **`:::resources` directive title:** canon is `"Go Deeper"`. `"Links"` is a deviation.
4. **Heading hierarchy:** body uses `##` for sections, `###` for subsections. No body H1; the title comes from frontmatter. ✅ All 40 files conform.
5. **List bullets:** unordered lists use `-` (hyphen). ✅ All 40 files conform.
6. **Spacing:** single blank line between sections, no triple blank lines. ✅ All 40 files conform.

## Cross-cutting

- **Code fences:** every code block in the curriculum (45 blocks across 20 lessons) uses bare ` ``` `. The fixes per lesson below add language hints only where content is identifiably a language; diagrams, prompts, and pseudocode stay bare.
- **`:::resources{title="Links"}`:** 3 lessons deviate from "Go Deeper" canon. Listed inline below.
- **Lessons with no code blocks** are clean by default unless flagged for the resources-title issue.

## Lessons

### 00-orientation
- [ ] **what-is-zero-vector.md** — L87: `:::resources{title="Links"}` → `"Go Deeper"`.
- [ ] **terminal.md** — L85: bash fence (commands with `#` comments) needs ` ```bash`. L38, L45, L51 stay bare (login banner / shell prompt examples).
- [ ] **file-systems.md** — clean. (L43, L60 paths and L95 file tree all stay bare.)
- [ ] **git-basics.md** — L70: bash fence (`git init` etc.) needs ` ```bash`. L47 stays bare (numbered explanation, not commands).
- [ ] **repos.md** — L34, L86: bash fences (`git clone`, `git push`) need ` ```bash`.
- [ ] **deployment.md** — L52: bash fence (`npm run build` + comments) needs ` ```bash`.
- [ ] **dns.md** — L102: bash fence (`dig`) needs ` ```bash`. L52 stays bare (DNS record examples, not executable).

### 01-foundation
- [ ] **systems-thinking.md** — clean.
- [ ] **architecture.md** — clean. (L39 ASCII architecture diagram stays bare.)
- [ ] **nouns-and-verbs.md** — clean. (L40 text breakdown stays bare.)
- [ ] **planning.md** — clean. (L49 decomposition outline stays bare.)
- [ ] **vector-md.md** — L58: markdown sample (a VECTOR.md example) needs ` ```markdown`. L139: `:::resources{title="Links"}` → `"Go Deeper"`.
- [ ] **data-modeling.md** — L98: JSON example needs ` ```json`. L31 stays bare (schema pseudocode, not strict JSON).
- [ ] **information-architecture.md** — clean. (L78 URL examples with `#` comments stay bare — illustrative paths, not bash.)

### 02-the-medium
- [ ] **claude-code.md** — L33, L45: bash fences (`curl ... | bash`, `cd`/`claude`) need ` ```bash`.
- [ ] **prompting.md** — clean. (L31 weak-vs-better prompt examples stay bare — dialogue, not code.)
- [ ] **iteration.md** — clean (no code blocks).
- [ ] **react-basics.md** — L27, L68, L100: JSX examples need ` ```jsx`.
- [ ] **deploy.md** — L29: bash fence (deploy checklist with `npm run build` etc.) needs ` ```bash`.
- [ ] **your-first-ship.md** — clean (no code blocks).

### 03-the-pipeline
- [ ] **research.md** — clean.
- [ ] **synthesis.md** — clean.
- [ ] **jtbd.md** — clean.
- [ ] **ideation.md** — clean.
- [ ] **prototyping.md** — clean.
- [ ] **validation.md** — clean.
- [ ] **shipping.md** — clean.
- [ ] **investiture.md** — L95: `:::resources{title="Links"}` → `"Go Deeper"`. L72 file tree stays bare.

### 04-orchestration
- [ ] **claude-md.md** — L33: markdown sample (a CLAUDE.md example) needs ` ```markdown`.
- [ ] **multi-agent.md** — clean.
- [ ] **staged-prompts.md** — clean. (L55 prompt text stays bare.)
- [ ] **orchestration.md** — clean.
- [ ] **quality-gates.md** — clean.
- [ ] **the-crew-model.md** — L41: markdown sample (a crew-config example) needs ` ```markdown`.

### 05-auteur
- [ ] **personal-methodology.md** — clean.
- [ ] **framework-design.md** — clean.
- [ ] **teaching.md** — clean.
- [ ] **contribution.md** — clean.
- [ ] **community.md** — clean.
- [ ] **auteur-practice.md** — clean.

## Tally

- **40 lessons audited.**
- **17 lessons need changes** (16 for code-fence hints + 3 for `:::resources` title; some overlap).
- **23 lessons clean.**
- Estimated unique fence-hint additions: ~17 across the 16 affected files.

## Out of scope (per issue #14, Step 1)

Approach guides under `content/approach/`; screenshots (Step 2); prose rewrites; section restructuring; fact-checking.
