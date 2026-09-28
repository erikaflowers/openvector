You are re-verifying one lesson of **Open Vector** (open.zerovector.design), a free learning site that teaches
designers and non-engineers agentic AI coding. Lessons must never go stale. Today is {{date}}.

Lesson file: `{{file}}` (read it in full first).

Time-sensitive claims recorded for this lesson (from the topic map; the lesson may contain others, check those too):

```yaml
{{facts}}
```

## Your job
1. Read the lesson. For every time-sensitive claim (install commands, CLI commands and flags, versions, model names,
   prices, plans, UI steps, feature claims, official URLs), open the best official source with WebFetch and decide:
   - `current`: the source confirms it.
   - `outdated`: the source contradicts it, or it describes something that no longer exists.
   - `unverifiable`: no official source settles it. Do not guess.
2. Record what the source says as `evidence`, and the URL you opened as `source`.
3. If anything is `outdated`, return `status: "needs-update"` and one `change` that fixes all outdated claims in this
   lesson: quote the current text, say exactly what replaces it, cite sources. Keep the lesson's voice; change as
   little as possible. Timeless ideas (systems thinking, JTBD, planning) are not claims to check.

Do not edit any file. Be exact: a wrong "current" lets a learner copy a broken command.
