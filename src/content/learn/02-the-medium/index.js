// Level 02: The Medium
// Hands on the rock. Working in code with AI agents.

import claudeCode from './claude-code';
import prompting from './prompting';
import iteration from './iteration';
import reactBasics from './react-basics';
import deploy from './deploy';
import yourFirstShip from './your-first-ship';

export default {
  slug: '02-the-medium',
  number: '02',
  title: 'The Medium',
  subtitle: 'Hands on the rock. No gloves.',
  status: 'available',
  desc: 'Working in code with AI agents. Claude Code, prompting, iteration. Building your first real thing that lives on the internet.',
  prereqs: 'Level 01 (Foundation). You should be comfortable with systems thinking and planning before you start building.',
  outcomes: [
    'Work with Claude Code as your AI engineering partner',
    'Write effective prompts that produce real results',
    'Iterate on code through conversation, not memorization',
    'Understand React well enough to read and direct it',
    'Deploy a real project to production',
    'Ship something real that you built with AI',
  ],
  lessons: [
    claudeCode,
    prompting,
    iteration,
    reactBasics,
    deploy,
    yourFirstShip,
  ],
};
