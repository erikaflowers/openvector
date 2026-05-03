---
slug: investiture
title: "Investiture: The Framework"
subtitle: The scaffold that turns your Pipeline work into a structured, AI-ready project. Now with a skill chain that enforces your doctrine.
duration: 20 min
status: available
badge: updated
updatedAt: '2026-03-14'
knowledgeCheck:
  - question: What does the Investiture scaffold give you that a blank project does not?
    hint: Think about structure, documentation, and what an AI agent needs to be effective from the first commit.
  - question: How does your research from the Pipeline phases connect to the scaffold?
    hint: Map each Pipeline phase to a section of VECTOR.md or a folder in the scaffold.
---

## The Scaffold

You have just spent seven lessons walking through the full product development pipeline: research, synthesis, jobs to be done, ideation, prototyping, validation, shipping. That is a lot of thinking. A lot of artifacts. A lot of decisions.

Now what? You open a blank folder and start from scratch?

No. That is what Investiture solves.

Investiture is a project scaffold with a skill chain that enforces your doctrine. Run npx investiture init in any existing project and it injects structured research schemas, architecture skills, and the VECTOR.md convention without touching your code. Or clone the full scaffold for a greenfield project with React, Vite, and the doctrine system built in.

As of v1.3, Investiture includes three executable skills (/invest-backfill, /invest-doctrine, /invest-architecture) that read your doctrine files at runtime and audit your project against them. Backfill surveys your codebase and generates starter doctrine. Doctrine validates it. Architecture enforces it.

The name comes from Brandon Sanderson's Cosmere novels, where Investiture is the fundamental energy that powers all magic systems. In Zero Vector, Investiture is the fundamental structure that powers all projects. Different projects, different features, but the same underlying architecture making it all work.

## The Blank Canvas Problem

Every time you start a new project from scratch, you make hundreds of small decisions: Where do components go? How do I structure the API? What does my folder hierarchy look like? How do I handle environment variables? Where does documentation live?

Most people make these decisions ad hoc. They create folders as needed, name things inconsistently, scatter configuration across multiple files. The project works, technically. But it is held together with implicit knowledge that lives only in the original developer's head.

Now multiply that problem by AI agents. An agent reading a project with no consistent structure, no documentation, no architectural reasoning has to guess at conventions. It guesses wrong. You fix it. It guesses wrong again. You spend more time correcting the agent than you would have spent writing the code yourself.

Investiture eliminates that entire class of problem. The structure is explicit. The conventions are documented. The architecture is explained. An AI agent reading an Investiture project knows where things go, why they go there, and what patterns to follow.

## What the Scaffold Gives You

Run npx investiture init in any project and you get the skill chain and research system injected without touching your existing code. Clone the full scaffold for a greenfield project. Either way, here is what you get:

Three executable skills that read your doctrine at runtime. /invest-backfill surveys your codebase and generates VECTOR.md, CLAUDE.md, and ARCHITECTURE.md. /invest-doctrine validates those files for completeness and consistency. /invest-architecture checks every source file against your declared layers, naming, and import rules.

VECTOR.md captures your project intent, users, architecture, and constraints. CLAUDE.md frames contributor onboarding for both humans and AI agents. ARCHITECTURE.md declares your layers, stack, and conventions. These are not templates you fill in once and forget. The skill chain audits them continuously.

Six research schemas in the /vector directory: persona, jobs to be done, assumption, interview, competitive analysis, and blue ocean strategy. All in machine-readable JSON that any AI tool can consume.

Architecture Decision Records in /vector/decisions/ and audit reports in /vector/audits/. Structured places for structured thinking.

> The best projects are not the ones with the most features. They are the ones where every file knows why it exists. Investiture gives you that from the first commit. Your AI agents read the structure and immediately understand the conventions. The skill chain ensures those conventions stay enforced as the project grows.

## Everything Feeds In

Look at what you produced during this level:

In Research, you gathered information about the problem space, the users, the competitive landscape. That research feeds into VECTOR.md's Project Overview and Users sections.

In Synthesis, you distilled raw research into patterns and insights. Those patterns become the architectural reasoning in VECTOR.md.

In Jobs to Be Done, you identified the core tasks your product enables. Those JTBD become the backbone of your feature set and inform the data model.

In Ideation, you explored solution spaces. The winning ideas become the architecture decisions documented in VECTOR.md.

In Prototyping and Validation, you tested assumptions. The results refine your constraints and current state.

In Shipping, you learned deployment. Investiture pre-configures the deployment pipeline.

Investiture is not a separate thing you learn after the Pipeline. It is the container for everything the Pipeline produced. All that thinking, all those artifacts, all those decisions: they have a home now.

```
your-project/
├── VECTOR.md                 # Project doctrine (read first)
├── CLAUDE.md                 # Contributor onboarding (read second)
├── ARCHITECTURE.md           # Technical guide (read third)
├── .claude/skills/           # Skill chain
│   ├── invest-backfill/      # Survey codebase, generate doctrine
│   ├── invest-doctrine/      # Validate doctrine files
│   └── invest-architecture/  # Enforce architecture rules
│
├── vector/
│   ├── schemas/              # 6 research schemas (JSON)
│   ├── research/             # Your structured findings
│   ├── decisions/            # Architecture Decision Records
│   └── audits/               # Skill chain audit reports
│
└── (your existing code)      # Investiture does not touch your code
```

:::exercise{title="Try It"}
- Create a test directory: `mkdir investiture-test && cd investiture-test && git init`.
- Run `npx investiture init`. Watch what it installs.
- Browse the `.claude/skills/` directory and read one of the `SKILL.md` files. Notice how each skill declares what it reads, what it checks, and what it produces.
- Open `vector/schemas/` and pick a schema. Notice the machine-readable structure.
- Open Claude Code in that directory and run `/invest-backfill`. Watch it survey the (empty) project and generate starter doctrine.
- Read the `VECTOR.md` it creates.
- Ask yourself: if an AI agent read these files, how much would it understand before writing a single line of code? That is the power of a structured scaffold.
:::

:::resources{title="Go Deeper"}
- [Investiture on GitHub](https://github.com/erikaflowers/investiture). npx investiture init, or clone the full scaffold.
- [Investiture Framework Page](https://zerovector.design/investiture). The Investiture deep dive on Zero Vector.
- [VECTOR.md Lesson (Level 01)](/learn/curriculum/01-foundation/vector-md). The artifact that gives agents project context.
:::
