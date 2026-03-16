export default {
  slug: 'revision-history',
  title: 'Managing Revision History',
  subtitle: 'Git workflow for AI-assisted projects. Commit strategy, branch management, and reviewing changes.',
  category: 'working-with-agents',
  duration: '20 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['00-orientation/git-basics', '00-orientation/repos'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Learn',
        body: [
          'How to use git as a safety net when AI is writing code. When to commit, how to review AI-generated changes, how to branch for experiments, and how to revert when something goes wrong. This is not a git tutorial — it is a workflow guide for the specific challenges of AI-assisted development.',
          'AI agents write code fast. That is both the power and the danger. Without disciplined version control, you can find yourself three hundred lines deep in changes you do not understand, with no way back to the version that worked.',
        ],
      },
      {
        type: 'callout',
        body: 'The checkpoint commit is the most important habit in AI-assisted development. Before you tell Claude Code to make a change, commit what you have. If the change goes wrong, you can always get back to the last checkpoint.',
      },
      {
        type: 'step',
        number: '01',
        title: 'The Checkpoint Commit Pattern',
        body: [
          'Before every significant Claude Code instruction, make a commit. Not after — before. This gives you a known-good state to return to if the AI produces something you do not want.',
          'The workflow is: commit what works, then ask Claude to change something, then review the changes, then commit again if they are good. If they are not good, revert to the checkpoint.',
        ],
      },
      {
        type: 'code',
        body: '# Before asking Claude to make a change:\ngit add .\ngit commit -m "checkpoint: contact form working, before adding validation"\n\n# Now give Claude the instruction to add validation\n# ...\n\n# After reviewing the changes:\ngit add .\ngit commit -m "add client-side validation to contact form"',
      },
      {
        type: 'step',
        number: '02',
        title: 'Review Every AI-Generated Change',
        body: [
          'After Claude Code modifies files, look at what changed before you commit. Use git diff to see exactly what was added, removed, or modified:',
        ],
      },
      {
        type: 'code',
        body: '# See what changed (unstaged)\ngit diff\n\n# See a summary of which files changed\ngit diff --stat\n\n# See changes in a specific file\ngit diff src/components/ContactForm.jsx',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'You do not need to understand every line of code. But you should understand the shape of the changes. Did Claude only touch the files you expected? Did it add files you did not ask for? Did it modify something in a completely different part of the project? These are red flags.',
          'Look for: unexpected file modifications (especially package.json, config files, or unrelated components), large amounts of deleted code, new dependencies you did not request, and hardcoded values where variables should be.',
        ],
      },
      {
        type: 'step',
        number: '03',
        title: 'Write Meaningful Commit Messages',
        body: [
          'When AI is writing the code, your commit messages become even more important. They are the narrative thread that explains why changes were made, since the code itself might not be in your personal style.',
          'Good commit messages describe intent, not action. Not "update ContactForm.jsx" but "add email validation to contact form." Not "modify styles" but "increase card padding for readability on mobile." Your future self will thank you.',
        ],
      },
      {
        type: 'template',
        title: 'Commit Message Patterns',
        body: '# Good commit messages for AI-assisted projects:\n\nadd testimonials section to homepage\nfix contact form not submitting on Safari\nrefactor nav to support mobile hamburger menu\ncheckpoint: project gallery working, before adding filters\nrevert: undo search feature, broke existing routing\npolish: adjust spacing and typography on about page\nwip: blog list renders, individual posts not yet linked',
      },
      {
        type: 'step',
        number: '04',
        title: 'Branch for Experiments',
        body: [
          'When you want Claude Code to try something risky — a major refactor, a new approach to a component, or a feature you are not sure about — create a branch first. This is your experimental sandbox.',
        ],
      },
      {
        type: 'code',
        body: '# Create a branch for the experiment\ngit checkout -b experiment/search-feature\n\n# Work with Claude Code on the experiment...\n# Make commits as you go...\n\n# If it works: merge it back\ngit checkout main\ngit merge experiment/search-feature\n\n# If it does not work: abandon it\ngit checkout main\ngit branch -D experiment/search-feature',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'The branch is free insurance. It takes five seconds to create and saves you from the nightmare of trying to manually undo a failed experiment across fifteen files.',
        ],
      },
      {
        type: 'step',
        number: '05',
        title: 'Revert When Things Go Wrong',
        body: [
          'Things will go wrong. Claude will produce code that breaks something else, or it will refactor your entire file structure when you asked for a small change. Knowing how to revert is not optional.',
          'There are three levels of reverting, from gentle to nuclear:',
        ],
      },
      {
        type: 'code',
        body: '# Level 1: Undo changes to a specific file (discard all uncommitted changes)\ngit checkout -- src/components/ContactForm.jsx\n\n# Level 2: Undo all uncommitted changes (back to last commit)\ngit checkout .\n\n# Level 3: Go back to a specific commit (the nuclear option)\ngit log --oneline   # find the commit hash you want to go back to\ngit reset --hard abc1234   # replace abc1234 with the actual hash',
      },
      {
        type: 'callout',
        body: 'Level 3 destroys everything after that commit. Only use it when you are sure. This is why checkpoint commits matter — they give you a recent, safe point to reset to instead of going all the way back to the beginning.',
      },
      {
        type: 'step',
        number: '06',
        title: 'Use Git Log to Understand Your History',
        body: [
          'Your git log tells the story of your project. When you need to understand when something broke or what changed last Tuesday, the log is your timeline.',
        ],
      },
      {
        type: 'code',
        body: '# See recent commits (compact)\ngit log --oneline -20\n\n# See what changed in a specific commit\ngit show abc1234\n\n# See what changed between two commits\ngit diff abc1234..def5678\n\n# Find the commit that introduced a specific file\ngit log --follow src/components/ContactForm.jsx',
      },
      {
        type: 'step',
        number: '07',
        title: 'The Daily Workflow',
        body: [
          'Here is the complete git workflow for an AI-assisted development session. This becomes second nature after a few days:',
        ],
      },
      {
        type: 'template',
        title: 'Daily Git Workflow',
        body: '1. START OF SESSION\n   git status              (see where you left off)\n   git log --oneline -5    (remember what you did last time)\n\n2. BEFORE EACH CLAUDE CODE TASK\n   git add .\n   git commit -m "checkpoint: [what currently works]"\n\n3. AFTER EACH CLAUDE CODE TASK\n   git diff --stat          (see what files changed)\n   git diff                 (review the actual changes)\n   # If good:\n   git add .\n   git commit -m "[what this change does]"\n   # If bad:\n   git checkout .           (undo everything back to checkpoint)\n\n4. END OF SESSION\n   git add .\n   git commit -m "end of session: [summary of what got done]"\n   git push                 (back up to remote)',
      },
      {
        type: 'step',
        number: '08',
        title: 'Stage Selectively',
        body: [
          'Claude sometimes modifies files you did not intend. Instead of committing everything with git add ., stage only the files you reviewed and approved:',
        ],
      },
      {
        type: 'code',
        body: '# Stage specific files only\ngit add src/components/ContactForm.jsx src/styles/contact.css\n\n# See what is staged vs what is not\ngit status\n\n# Commit only the staged files\ngit commit -m "add contact form component and styles"\n\n# Discard the changes you did not want\ngit checkout -- src/pages/Home.jsx',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Selective staging is a superpower. It lets you accept the changes you want and reject the ones you did not ask for, all in one step.',
        ],
      },
      {
        type: 'step',
        number: '09',
        title: 'Push to Remote Regularly',
        body: [
          'Your local git history only exists on your machine. If your laptop dies, your project dies with it. Push to a remote repository (GitHub, GitLab, or similar) at least once per work session.',
          'If you have not set up a remote yet, this is a two-minute task:',
        ],
      },
      {
        type: 'code',
        body: '# Create a repo on GitHub, then:\ngit remote add origin https://github.com/yourusername/your-project.git\ngit push -u origin main\n\n# After that, just:\ngit push',
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'Start a Claude Code session with a project that has at least a few files. Make a checkpoint commit. Ask Claude to make a visible change (add a section, modify a component). Before committing, run git diff and review every line. Then practice: commit the good changes, revert one file you did not want changed, and check git log to see your history.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Git Basics (Curriculum)', url: '/learn/curriculum/00-orientation/git-basics', note: 'The foundational lesson on how version control works.' },
          { title: 'Repos (Curriculum)', url: '/learn/curriculum/00-orientation/repos', note: 'Understanding repositories, remotes, and collaboration.' },
          { title: 'Oh Shit, Git!?!', url: 'https://ohshitgit.com/', note: 'A practical guide to getting out of git messes, in plain language.' },
          { title: 'Git Documentation', url: 'https://git-scm.com/doc', note: 'The official git reference — dense but comprehensive.' },
        ],
      },
    ],
  },
};
