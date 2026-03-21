---
slug: building-use-cases
title: Building Use Cases
subtitle: How to decompose what your product should do into concrete, buildable scenarios.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
category: planning
prerequisites:
  - 01-foundation/planning
  - 03-the-pipeline/jtbd
---

## What You Will Build

By the end of this guide, you will have a set of use cases that break your PRD into buildable scenarios. Each use case describes one thing a user does with your product — who they are, what they want, and the exact steps they take to get it.

Use cases are the bridge between "what should this product do?" and "what should I tell Claude Code to build next?" They turn a wall of requirements into a task list.

## Why Use Cases Matter

A PRD says "the product should have a contact form." A use case says "a potential client visits the portfolio site, scrolls to the contact section, fills in their name, email, and a short message, clicks Send, sees a confirmation, and the site owner receives the message in their inbox." See the difference?

The PRD tells you what. The use case tells you how it actually works from the user's perspective. And that is exactly the level of detail you need to give an AI agent a clear instruction.

:::step{number="01" title="Open Your PRD and List the Features"}
Pull up the PRD you wrote (if you have not written one, do the Writing a PRD guide first). Look at your feature list. Each feature is a candidate for one or more use cases.

Write each feature on its own line. For a portfolio site, your list might look like: homepage with bio, project gallery, individual project pages, contact form, resume download.
:::

:::step{number="02" title="Identify the Actors"}
An actor is anyone who interacts with your product. For most personal projects, there is one actor: the visitor. For more complex products, you might have multiple: the writer, the reader, the admin, the subscriber.

Write down every distinct actor. Be specific. "User" is too vague. "Freelance designer browsing for inspiration" is useful. "Hiring manager evaluating candidates" is useful. These are real people with real goals.
:::

:::step{number="03" title="Write the First Use Case"}
Pick the most important feature in your list — the one that, if it did not work, the product would be pointless. For a portfolio site, that is probably "a visitor views my work and understands what I do."

Now write it using this structure: Actor, Goal, Preconditions, Steps, and Outcome. Do not overthink the format. The value is in thinking through the steps, not in making it look pretty.
:::

:::template{title="Use Case Template"}
## Use Case: [Short Name]

**Actor:** [Who is performing this action?]
**Goal:** [What do they want to accomplish?]
**Precondition:** [What must be true before this starts?]

### Steps
1. [First thing the actor does]
2. [What the system shows or does in response]
3. [Next thing the actor does]
4. [System response]
5. [Continue until the goal is reached...]

### Outcome
[What is true when this use case is complete?]

### Edge Cases
- [What if the actor does something unexpected?]
- [What if required data is missing?]
- [What if the network is slow?]
:::

:::step{number="04" title="Walk Through a Concrete Example"}
Here is a real use case for a portfolio site contact form. Notice how specific the steps are — each one maps to something that needs to actually exist in the code.
:::

:::template{title="Example: Contact Form"}
## Use Case: Send a Message

**Actor:** Potential client (hiring manager, project lead)
**Goal:** Send a message to the site owner without opening an email client
**Precondition:** Visitor is on any page of the portfolio site

### Steps
1. Visitor clicks "Contact" in the navigation bar
2. Page scrolls to (or navigates to) the contact section
3. Visitor sees a form with fields: Name, Email, Message
4. Visitor fills in all three fields
5. Visitor clicks "Send Message"
6. System validates the fields (name not empty, email format valid, message not empty)
7. If validation fails: show inline error messages next to the invalid fields
8. If validation passes: send the message, show a success confirmation
9. Visitor sees "Message sent! I'll get back to you within 48 hours."

### Outcome
Site owner receives the message in their inbox. Visitor knows the message was sent.

### Edge Cases
- Empty fields: show validation errors, do not submit
- Invalid email: show "Please enter a valid email address"
- Network failure: show "Something went wrong. Please try again or email me directly at [address]"
- Double submit: disable the button after first click
:::

> Each step in a use case either describes something the user does or something the system does. Alternate between them. This back-and-forth is exactly how software actually works — input, response, input, response.

:::step{number="05" title="Write Use Cases for Every Feature"}
Go through your feature list and write at least one use case per feature. Some features need multiple use cases. A "project gallery" feature might need: view all projects, filter by category, and view a single project detail page.

You do not need to go deep on every edge case for every use case right now. Get the happy path written first — the scenario where everything works as intended. You will discover edge cases when you build.
:::

:::step{number="06" title="Prioritize the Use Cases"}
Not all use cases are equal. Some are core to the product, some are nice-to-have. Mark each one as: Must Have (the product does not work without this), Should Have (expected but could launch without it), or Nice to Have (enhances the experience).

Your Must Have use cases become your first sprint. They are what you build first and test first. Everything else comes after the core works.
:::

:::step{number="07" title="Turn Use Cases into Build Tasks"}
Now translate each use case into specific things Claude Code needs to build. Look at the steps — each one implies components, pages, or logic that must exist.

For the contact form example: Step 2 means the contact section needs to exist on the page, or there needs to be a /contact route. Steps 3-5 mean you need a form component with three fields and a submit button. Step 6 means you need client-side validation. Step 8 means you need a backend endpoint or a form service like Formspree.
:::

:::template{title="Use Case to Build Tasks"}
## Use Case: Send a Message

### Build Tasks
- [ ] Create ContactForm component with Name, Email, Message fields
- [ ] Add client-side validation (required fields, email format)
- [ ] Add inline error message display
- [ ] Connect form to Formspree (or Netlify Forms, or backend endpoint)
- [ ] Add success confirmation message with 48-hour response promise
- [ ] Add error state for network failures with fallback email link
- [ ] Disable submit button after first click to prevent double-submit
- [ ] Add "Contact" link to navigation that scrolls to or navigates to the form
:::

:::step{number="08" title="Save Your Use Cases in the Project"}
Create a use-cases.md file in your project root, alongside your PRD. This becomes a reference document you can point Claude Code to when you need to build a specific feature.

When you start a Claude Code session and say "Build the contact form. See use-cases.md for the full specification," the AI has everything it needs to build exactly what you described. No ambiguity. No guessing.
:::

```
# In your project root
touch use-cases.md

# Reference it in your CLAUDE.md
## Documentation
See PRD.md for product requirements.
See use-cases.md for detailed user scenarios and build tasks.
```

:::exercise{title="Try It"}
Take one feature from your PRD and write a complete use case for it. Include at least five steps, identify two edge cases, and translate it into a build task list. If you do not have a PRD yet, use this feature: "A reader can browse blog posts by category and read a full post on its own page."
:::

:::resources{title="Go Deeper"}
- [JTBD (Curriculum)](/learn/curriculum/03-the-pipeline/jtbd) — Jobs to Be Done — the framework for understanding what users actually need, which feeds directly into use cases.
- [Planning (Curriculum)](/learn/curriculum/01-foundation/planning) — How to scope and shape work before building.
- [Writing a PRD (Approach)](/learn/approach/writing-a-prd) — The guide that comes before this one — your PRD feeds your use cases.
- [Alistair Cockburn — Writing Effective Use Cases](https://www.amazon.com/Writing-Effective-Cases-Alistair-Cockburn/dp/0201702258) — The definitive book on use case writing, if you want to go deep.
:::
