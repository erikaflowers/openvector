---
slug: scaffold-feature
title: Building a Feature End-to-End
subtitle: 'From idea to shipped feature: plan it, describe it, build it, test it, commit it.'
duration: 30 min
status: available
badge: new
updatedAt: '2026-02-14'
category: build-workflow
prerequisites:
  - 01-foundation/architecture
  - 02-the-medium/claude-code
  - 01-foundation/planning
---

## What You Will Do

Walk through the complete lifecycle of building a single feature — from the moment you decide to build it to the commit that ships it. This is the Zero Vector build loop demonstrated end-to-end with a concrete example: adding a contact form to a portfolio site.

This is not abstract. You are going to follow along and build this feature yourself. By the end, you will have internalized the rhythm: plan, describe, build, review, test, commit. Every feature you ever build follows this same loop.

## The Example: A Contact Form

We are going to build a contact form for a portfolio site. It has a name field, an email field, a message field, a submit button, client-side validation, a success confirmation, and it sends the message through a form service. Simple enough to finish in one session. Complex enough to demonstrate every step of the workflow.

If you have your own project, adapt the steps to your feature. The process is the same regardless of what you are building.

:::step{number="01" title="Check Your Starting Point"}
Before building anything, understand where you are. What is the current state of the project? Are there uncommitted changes? What did you build last time?
:::

```
git status
git log --oneline -5
```

If you have uncommitted changes, commit or stash them now. Start clean. You want a clear "before" snapshot so you can see exactly what this feature adds.

:::step{number="02" title="Define the Feature in Writing"}
Before opening Claude Code, write down what you are building. This does not need to be a full use case document (though if you have one, reference it). A short description with clear requirements is enough.

Write it in your project notes, in a markdown file, or even in the terminal. The act of writing forces clarity.
:::

:::template{title="Feature Description"}
## Feature: Contact Form

**What:** A form on the portfolio site where visitors can send me a message.

**Requirements:**
- Fields: Name (required), Email (required, must be valid), Message (required)
- Submit button labeled "Send Message"
- Client-side validation with inline error messages
- On success: show confirmation message, clear the form
- On error: show error message with fallback email link
- Form submits to Formspree (no backend needed)

**Where:** New section at the bottom of the homepage, above the footer

**Not included:** File attachments, phone number field, CAPTCHA (add later if needed)
:::

:::step{number="03" title="Make a Checkpoint Commit"}
Commit the current state of the project before Claude touches anything. This is your safety net.
:::

```
git add .
git commit -m "checkpoint: before adding contact form"
```

:::step{number="04" title="Plan the Components"}
Think about what needs to exist for this feature to work. Not the code — the pieces. What components? What files? What data flows where?

For the contact form: you need a ContactForm component (the form itself), you might need a FormField component (reusable input with label and error), and you need to add the section to the homepage. That is three pieces of work.

Thinking in components before coding is the design step that most people skip. It takes sixty seconds and prevents you from building a monolithic mess.
:::

:::step{number="05" title="Give the First Instruction"}
Start Claude Code and give it a clear, specific instruction for the first component. Start with the smallest, most independent piece — in this case, the form component itself.
:::

:::template{title="First Instruction"}
Create a ContactForm component in src/components/ContactForm.jsx.

Requirements:
- Three fields: Name (text), Email (email), Message (textarea)
- Each field has a label above it and an error message below it (hidden by default)
- Submit button labeled "Send Message"
- Client-side validation on submit: all fields required, email must match a basic email regex
- If validation fails, show error messages next to the invalid fields
- If validation passes, POST to https://formspree.io/f/YOUR_FORM_ID with the form data
- On success: show a green confirmation message "Message sent! I'll get back to you within 48 hours." and clear the form
- On error: show a red error message "Something went wrong. Please try emailing me directly at hello@example.com."
- Disable the submit button while the form is submitting

Constraints:
- Use the existing CSS variables from styles/variables.css
- Do not add any new dependencies
- Keep it under 150 lines
- Match the existing component style in the project
:::

:::step{number="06" title="Watch and Verify"}
Let Claude Code work. When it finishes, do not immediately move on. Open the file it created and scan through it. Check:

Does it have all three fields? Is there validation logic? Does it handle the submit, success, and error states? Is it using your existing CSS variables? Is it a reasonable size?

If something is wrong, tell Claude now. "The error messages should appear below each field, not in a list at the top" or "Use the existing button styles from styles/buttons.css instead of inline styles." Iterate immediately. Do not let problems accumulate.
:::

:::step{number="07" title="Integrate the Component"}
Now tell Claude to add the contact form to the homepage. This is the integration step — connecting the new piece to the existing structure.
:::

:::template{title="Integration Instruction"}
Add the ContactForm component to the homepage (src/pages/Home.jsx).

Place it in a new section between the project grid and the footer. Give the section:
- A heading: "Get in Touch"
- A short intro paragraph: "Have a project in mind? I'd love to hear about it."
- The ContactForm component below the intro
- Max width of 600px, centered on the page
- Consistent spacing with the other sections (use the existing section-padding variable)
:::

:::step{number="08" title="Test in the Browser"}
Open the dev server and test the feature in the browser. This is not optional. Code that Claude says works and code that actually works are not always the same thing.
:::

```
npm run dev
```

Test every path: Submit with all fields empty — do you see validation errors? Submit with an invalid email — does it catch it? Fill in everything correctly and submit — does the success message appear? Refresh the page — does the form reset cleanly? Open it on your phone (or use responsive mode in dev tools at 375px) — does it look right?

Make a list of anything that is not right. You will fix it all in the next step.

:::step{number="09" title="Fix and Refine"}
Give Claude the list of issues you found during testing. Be specific about what you observed versus what you expected:

"When I submit the form successfully, the confirmation message appears but the form fields still have the old values. After submission, the fields should be cleared." "On mobile at 375px, the submit button overflows the form container. It should be full width at that breakpoint."

This observed-vs-expected pattern is the most effective way to communicate issues to both AI and human developers.
:::

:::step{number="10" title="Review the Changes"}
Before committing, review everything Claude changed. Use git diff to see the full picture:
:::

```
git diff --stat
git diff
```

Check: Did Claude only modify the files you expected? Did it add the new component file? Did it modify the homepage? Did it touch anything else? If it modified unexpected files, investigate. Sometimes Claude helpfully "fixes" things you did not ask it to fix, and those fixes can introduce new problems.

:::step{number="11" title="Commit the Feature"}
Everything works. Everything looks right. Commit it with a message that describes what the feature does, not what files were changed.
:::

```
git add src/components/ContactForm.jsx src/pages/Home.jsx src/styles/contact.css
git commit -m "add contact form with validation and Formspree integration"
```

Notice: we staged specific files, not git add all. This ensures we only commit the files we reviewed and approved.

> You just completed the full build loop: define the feature, checkpoint commit, plan the components, instruct Claude, verify the output, integrate, test in the browser, fix issues, review the diff, commit. This loop is the same for a contact form and a database migration. The only thing that changes is the complexity of the instruction.

## The Loop, Summarized

1. Define what you are building (in writing, with requirements and constraints). 2. Checkpoint commit (save the known-good state). 3. Plan the pieces (what components, files, or modules need to exist). 4. Instruct Claude (context + intent + constraints). 5. Verify the output (read the code, check the structure). 6. Integrate (connect new pieces to existing code). 7. Test in the browser (every path, including edge cases). 8. Fix and refine (observed vs expected). 9. Review the diff (only expected files, no surprises). 10. Commit with a meaningful message.

Repeat for every feature. The rhythm gets faster as you internalize it. After a few features, this stops being a checklist and becomes instinct.

:::exercise{title="Try It"}
Pick a feature from your project plan — something you can build in one session. Follow every step in this guide. Write the feature description. Make the checkpoint commit. Plan the components. Give Claude the instruction. Test. Fix. Review. Commit. Do not skip steps, even if they feel unnecessary. The discipline is the point.
:::

:::resources{title="Go Deeper"}
- [Architecture (Curriculum)](/learn/curriculum/01-foundation/architecture) — Understanding the structure of applications — what components are and how they fit together.
- [Claude Code (Curriculum)](/learn/curriculum/02-the-medium/claude-code) — How to work with Claude Code effectively as your build tool.
- [Giving Effective Instructions (Approach)](/learn/approach/effective-instructions) — How to write the clear, specific instructions that produce the best results.
- [Managing Revision History (Approach)](/learn/approach/revision-history) — The git workflow that keeps you safe when AI is writing code.
- [Testing (Curriculum)](/learn/curriculum/03-the-pipeline/testing) — How to test what you build — not just "does it load" but "does it work."
:::
