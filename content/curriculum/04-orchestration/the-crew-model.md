---
slug: the-crew-model
title: The Crew Model
subtitle: They are not assistants. They are crew.
duration: 22 min
status: available
---

## From Assistants to Crew

Most people use AI agents as assistants. They ask a question, get an answer, move on. The agent has no memory between sessions, no persistent identity, no area of ownership. Every conversation starts from scratch.

The crew model is different. Each agent has a name, a role, a domain, and a persistent briefing (CLAUDE.md). They are not interchangeable helpers — they are specialists with continuity. When you open a session with your frontend agent, it already knows the project, the conventions, and its responsibilities. It picks up where it left off.

This is the difference between hiring a random contractor every day and having a team. The contractor needs a full briefing every morning. The team member walks in, checks the board, and starts working.

> A crew is not a metaphor. It is an architecture. Each agent has a defined role, defined boundaries, and defined communication channels. You are the director. They are the crew. The project is the production.

## Anatomy of a Crew Member

Every crew member has five elements:

Name and identity. Not for fun — for clarity. When you say "Heavy handles the frontend," everyone (including you, six months from now) knows what that means. Names make agent architectures readable.

Role description. What does this agent do? "Frontend specialist: owns components, styling, accessibility, and client-side performance." The role is the lens through which the agent makes decisions.

Domain boundaries. What files and systems does this agent own? "Everything in src/components/ and src/styles/. Does not modify API code or database schemas." Boundaries prevent conflicts.

Communication style. How does this agent talk? Some agents should be terse and technical. Others should be explanatory and thorough. The style should match the domain — a code reviewer should be direct, a documentation writer should be clear.

Coordination rules. How does this agent interact with others? "Check STATUS.md before starting work. Commit with descriptive messages. Flag breaking changes in the commit message."

## Designing Your Crew

Start from the work, not from the agents. What are the major domains in your project? A typical web application has: frontend (UI, components, styling), backend (API, database, business logic), infrastructure (deployment, CI/CD, configuration), and quality (testing, code review, documentation).

Each domain is a potential crew member. You do not need all of them immediately. Start with the split that gives you the most benefit — usually the one where you find yourself switching context the most.

For a solo builder, a practical starting crew is three agents: a builder (writes features), a reviewer (critiques code), and a planner (designs approaches before building). This trio covers the three modes of work — creation, evaluation, and strategy — that are hardest for one mind to do simultaneously.

```
# Example: Three-Agent Crew

## Heavy (Builder)
Role: Frontend specialist
Domain: src/components/, src/styles/, public/
Style: Concise, action-oriented
Rules: Follow design system. Components under 150 lines.
       Commit after each feature.

## Qin (Reviewer)
Role: Code quality inspector
Domain: Read-only access to entire codebase
Style: Direct, thorough, ranked by severity
Rules: Never modify code. Report issues only.
       Check accessibility, performance, security.

## Julian (Planner)
Role: Technical architect
Domain: docs/, CLAUDE.md files, architecture decisions
Style: Strategic, explanatory
Rules: Write plans before building. Define contracts.
       Document decisions with rationale.
```

## The Director's Role

In a crew model, you are not the developer. You are the director. Your job shifts from writing code to making decisions: what gets built, in what order, to what standard, and by which agent.

This is a profound shift in how you work. Instead of thinking "how do I implement this feature," you think "which agent should implement this feature, and what do they need to succeed?" Instead of debugging code, you review code. Instead of writing prompts, you write briefs.

The director role requires different skills than hands-on building: prioritization, delegation, quality assessment, and integration thinking. These are leadership skills. You are learning to lead a team — the fact that the team is made of AI agents does not change the nature of the skill.

Some people resist this shift. They want to write the code themselves, and the agents are just helpers. That is fine for small projects. But for ambitious work — the kind that used to require a team of ten — the crew model is how one person scales.

## Crew Communication

Crew members do not talk to each other directly. You are the routing layer. Agent A produces output. You review it. You give the relevant parts to Agent B as input. This keeps you in the loop and prevents miscommunication between agents.

The communication artifacts are: commit messages (what was done and why), status documents (what is in progress, what is blocked), decision records (what was decided and the rationale), and contracts (agreed interfaces between systems).

A practical daily flow: check the status document. Decide the priority. Brief the appropriate agent. Review the output. Update the status. Brief the next agent. This is project management — compressed into a workflow one person can execute.

The status document does not need to be complex. A simple text file with three sections — Done, In Progress, Next — updated after each work block, is enough to maintain coherence across sessions and agents.

## Scaling the Crew

Start with one agent. Add a second when you feel the pain of context switching. Add a third when you need a capability the first two do not cover.

Common scaling path: Start with a builder. Add a reviewer (the quality jump is immediate). Add a planner when projects get complex enough to need upfront design. Add a specialist when one domain (testing, documentation, DevOps) is consistently underserved.

The ceiling for most solo operators is four to six agents. Beyond that, the coordination cost exceeds the benefit. You spend more time directing than producing. If you reach that point, consider whether the project has outgrown the solo builder model.

Each new agent should have a clear CLAUDE.md, a clear domain, and a clear reason for existing. If you cannot articulate why this agent needs to be separate from an existing one, it probably does not.

## The Crew in Practice

Here is what a real session looks like with a three-agent crew building a new feature:

You decide the feature: "Add recipe search with real-time filtering." You brief the planner: "Design the search approach. Consider where the search logic lives, what data it needs, and how the UI should behave." The planner produces a plan.

You review the plan. It makes sense. You brief the builder: "Implement search following this plan." You include the plan in the prompt. The builder writes the code.

You do the five-minute review. It works but you notice some edge cases. You brief the reviewer: "Review the search implementation. Pay attention to empty states, special characters in search terms, and performance with a large recipe list." The reviewer finds three issues.

You brief the builder again with the reviewer's findings: "Fix these three issues." The builder addresses them. You verify. You commit. Feature complete.

Total wall clock time: maybe 45 minutes. The quality is higher than if one agent had done everything because each step was focused and verified.

:::exercise{title="Design Your Crew"}
Write the CLAUDE.md for a three-agent crew for a project you care about. Define each agent's name, role, domain (specific files and directories), communication style, and coordination rules. Be specific — "owns the frontend" is too vague. "Owns src/components/, src/hooks/, and src/styles/. Does not modify files in api/ or scripts/" is clear. Then run one work session using at least two of the three agents on a real task. Notice how the separation changes the quality of the output.
:::

:::resources{title="Go Deeper"}
- [Team Topologies by Skelton & Pais](https://teamtopologies.com/) — The best book on team structure and interaction patterns. Directly applicable to designing agent crews.
- [The Manager's Path by Camille Fournier](https://www.oreilly.com/library/view/the-managers-path/9781491973882/) — On transitioning from individual contributor to technical leader. The same shift happens when you move from solo coding to directing a crew.
- [Anthropic Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) — Official documentation on project files, context management, and multi-session workflows.
:::
