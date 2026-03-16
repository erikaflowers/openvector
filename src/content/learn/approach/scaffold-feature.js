export default {
  slug: 'scaffold-feature',
  title: 'Building a Feature End-to-End',
  subtitle: 'From idea to shipped feature: plan it, describe it, build it, test it, commit it.',
  category: 'build-workflow',
  duration: '30 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['01-foundation/architecture', '02-the-medium/claude-code', '01-foundation/planning'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Do',
        body: [
          'Walk through the complete lifecycle of building a single feature — from the moment you decide to build it to the commit that ships it. This is the Zero Vector build loop demonstrated end-to-end with a concrete example: adding a contact form to a portfolio site.',
          'This is not abstract. You are going to follow along and build this feature yourself. By the end, you will have internalized the rhythm: plan, describe, build, review, test, commit. Every feature you ever build follows this same loop.',
        ],
      },
      {
        type: 'text',
        heading: 'The Example: A Contact Form',
        body: [
          'We are going to build a contact form for a portfolio site. It has a name field, an email field, a message field, a submit button, client-side validation, a success confirmation, and it sends the message through a form service. Simple enough to finish in one session. Complex enough to demonstrate every step of the workflow.',
          'If you have your own project, adapt the steps to your feature. The process is the same regardless of what you are building.',
        ],
      },
      {
        type: 'step',
        number: '01',
        title: 'Check Your Starting Point',
        body: [
          'Before building anything, understand where you are. What is the current state of the project? Are there uncommitted changes? What did you build last time?',
        ],
      },
      {
        type: 'code',
        body: 'git status\ngit log --oneline -5',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'If you have uncommitted changes, commit or stash them now. Start clean. You want a clear "before" snapshot so you can see exactly what this feature adds.',
        ],
      },
      {
        type: 'step',
        number: '02',
        title: 'Define the Feature in Writing',
        body: [
          'Before opening Claude Code, write down what you are building. This does not need to be a full use case document (though if you have one, reference it). A short description with clear requirements is enough.',
          'Write it in your project notes, in a markdown file, or even in the terminal. The act of writing forces clarity.',
        ],
      },
      {
        type: 'template',
        title: 'Feature Description',
        body: '## Feature: Contact Form\n\n**What:** A form on the portfolio site where visitors can send me a message.\n\n**Requirements:**\n- Fields: Name (required), Email (required, must be valid), Message (required)\n- Submit button labeled "Send Message"\n- Client-side validation with inline error messages\n- On success: show confirmation message, clear the form\n- On error: show error message with fallback email link\n- Form submits to Formspree (no backend needed)\n\n**Where:** New section at the bottom of the homepage, above the footer\n\n**Not included:** File attachments, phone number field, CAPTCHA (add later if needed)',
      },
      {
        type: 'step',
        number: '03',
        title: 'Make a Checkpoint Commit',
        body: [
          'Commit the current state of the project before Claude touches anything. This is your safety net.',
        ],
      },
      {
        type: 'code',
        body: 'git add .\ngit commit -m "checkpoint: before adding contact form"',
      },
      {
        type: 'step',
        number: '04',
        title: 'Plan the Components',
        body: [
          'Think about what needs to exist for this feature to work. Not the code — the pieces. What components? What files? What data flows where?',
          'For the contact form: you need a ContactForm component (the form itself), you might need a FormField component (reusable input with label and error), and you need to add the section to the homepage. That is three pieces of work.',
          'Thinking in components before coding is the design step that most people skip. It takes sixty seconds and prevents you from building a monolithic mess.',
        ],
      },
      {
        type: 'step',
        number: '05',
        title: 'Give the First Instruction',
        body: [
          'Start Claude Code and give it a clear, specific instruction for the first component. Start with the smallest, most independent piece — in this case, the form component itself.',
        ],
      },
      {
        type: 'template',
        title: 'First Instruction',
        body: 'Create a ContactForm component in src/components/ContactForm.jsx.\n\nRequirements:\n- Three fields: Name (text), Email (email), Message (textarea)\n- Each field has a label above it and an error message below it (hidden by default)\n- Submit button labeled "Send Message"\n- Client-side validation on submit: all fields required, email must match a basic email regex\n- If validation fails, show error messages next to the invalid fields\n- If validation passes, POST to https://formspree.io/f/YOUR_FORM_ID with the form data\n- On success: show a green confirmation message "Message sent! I\'ll get back to you within 48 hours." and clear the form\n- On error: show a red error message "Something went wrong. Please try emailing me directly at hello@example.com."\n- Disable the submit button while the form is submitting\n\nConstraints:\n- Use the existing CSS variables from styles/variables.css\n- Do not add any new dependencies\n- Keep it under 150 lines\n- Match the existing component style in the project',
      },
      {
        type: 'step',
        number: '06',
        title: 'Watch and Verify',
        body: [
          'Let Claude Code work. When it finishes, do not immediately move on. Open the file it created and scan through it. Check:',
          'Does it have all three fields? Is there validation logic? Does it handle the submit, success, and error states? Is it using your existing CSS variables? Is it a reasonable size?',
          'If something is wrong, tell Claude now. "The error messages should appear below each field, not in a list at the top" or "Use the existing button styles from styles/buttons.css instead of inline styles." Iterate immediately. Do not let problems accumulate.',
        ],
      },
      {
        type: 'step',
        number: '07',
        title: 'Integrate the Component',
        body: [
          'Now tell Claude to add the contact form to the homepage. This is the integration step — connecting the new piece to the existing structure.',
        ],
      },
      {
        type: 'template',
        title: 'Integration Instruction',
        body: 'Add the ContactForm component to the homepage (src/pages/Home.jsx).\n\nPlace it in a new section between the project grid and the footer. Give the section:\n- A heading: "Get in Touch"\n- A short intro paragraph: "Have a project in mind? I\'d love to hear about it."\n- The ContactForm component below the intro\n- Max width of 600px, centered on the page\n- Consistent spacing with the other sections (use the existing section-padding variable)',
      },
      {
        type: 'step',
        number: '08',
        title: 'Test in the Browser',
        body: [
          'Open the dev server and test the feature in the browser. This is not optional. Code that Claude says works and code that actually works are not always the same thing.',
        ],
      },
      {
        type: 'code',
        body: 'npm run dev',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Test every path: Submit with all fields empty — do you see validation errors? Submit with an invalid email — does it catch it? Fill in everything correctly and submit — does the success message appear? Refresh the page — does the form reset cleanly? Open it on your phone (or use responsive mode in dev tools at 375px) — does it look right?',
          'Make a list of anything that is not right. You will fix it all in the next step.',
        ],
      },
      {
        type: 'step',
        number: '09',
        title: 'Fix and Refine',
        body: [
          'Give Claude the list of issues you found during testing. Be specific about what you observed versus what you expected:',
          '"When I submit the form successfully, the confirmation message appears but the form fields still have the old values. After submission, the fields should be cleared." "On mobile at 375px, the submit button overflows the form container. It should be full width at that breakpoint."',
          'This observed-vs-expected pattern is the most effective way to communicate issues to both AI and human developers.',
        ],
      },
      {
        type: 'step',
        number: '10',
        title: 'Review the Changes',
        body: [
          'Before committing, review everything Claude changed. Use git diff to see the full picture:',
        ],
      },
      {
        type: 'code',
        body: 'git diff --stat\ngit diff',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Check: Did Claude only modify the files you expected? Did it add the new component file? Did it modify the homepage? Did it touch anything else? If it modified unexpected files, investigate. Sometimes Claude helpfully "fixes" things you did not ask it to fix, and those fixes can introduce new problems.',
        ],
      },
      {
        type: 'step',
        number: '11',
        title: 'Commit the Feature',
        body: [
          'Everything works. Everything looks right. Commit it with a message that describes what the feature does, not what files were changed.',
        ],
      },
      {
        type: 'code',
        body: 'git add src/components/ContactForm.jsx src/pages/Home.jsx src/styles/contact.css\ngit commit -m "add contact form with validation and Formspree integration"',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Notice: we staged specific files, not git add all. This ensures we only commit the files we reviewed and approved.',
        ],
      },
      {
        type: 'callout',
        body: 'You just completed the full build loop: define the feature, checkpoint commit, plan the components, instruct Claude, verify the output, integrate, test in the browser, fix issues, review the diff, commit. This loop is the same for a contact form and a database migration. The only thing that changes is the complexity of the instruction.',
      },
      {
        type: 'text',
        heading: 'The Loop, Summarized',
        body: [
          '1. Define what you are building (in writing, with requirements and constraints). 2. Checkpoint commit (save the known-good state). 3. Plan the pieces (what components, files, or modules need to exist). 4. Instruct Claude (context + intent + constraints). 5. Verify the output (read the code, check the structure). 6. Integrate (connect new pieces to existing code). 7. Test in the browser (every path, including edge cases). 8. Fix and refine (observed vs expected). 9. Review the diff (only expected files, no surprises). 10. Commit with a meaningful message.',
          'Repeat for every feature. The rhythm gets faster as you internalize it. After a few features, this stops being a checklist and becomes instinct.',
        ],
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'Pick a feature from your project plan — something you can build in one session. Follow every step in this guide. Write the feature description. Make the checkpoint commit. Plan the components. Give Claude the instruction. Test. Fix. Review. Commit. Do not skip steps, even if they feel unnecessary. The discipline is the point.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Architecture (Curriculum)', url: '/learn/curriculum/01-foundation/architecture', note: 'Understanding the structure of applications — what components are and how they fit together.' },
          { title: 'Claude Code (Curriculum)', url: '/learn/curriculum/02-the-medium/claude-code', note: 'How to work with Claude Code effectively as your build tool.' },
          { title: 'Giving Effective Instructions (Approach)', url: '/learn/approach/effective-instructions', note: 'How to write the clear, specific instructions that produce the best results.' },
          { title: 'Managing Revision History (Approach)', url: '/learn/approach/revision-history', note: 'The git workflow that keeps you safe when AI is writing code.' },
          { title: 'Testing (Curriculum)', url: '/learn/curriculum/03-the-pipeline/testing', note: 'How to test what you build — not just "does it load" but "does it work."' },
        ],
      },
    ],
  },
};
