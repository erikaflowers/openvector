// Level 03: The Pipeline
// Every phase of concept-to-customer, collapsed.

import research from './research';
import synthesis from './synthesis';
import jtbd from './jtbd';
import ideation from './ideation';
import prototyping from './prototyping';
import validation from './validation';
import shipping from './shipping';
import investiture from './investiture';

export default {
  slug: '03-the-pipeline',
  number: '03',
  title: 'The Pipeline',
  subtitle: 'Every phase. Every handoff. Collapsed.',
  status: 'available',
  desc: 'Applying Zero-Vector across the entire concept-to-customer arc. One project, end to end. Not theory. Practice.',
  prereqs: 'Level 02 (The Medium). You should have shipped at least one project before tackling the full pipeline.',
  outcomes: [
    'Conduct real user research without a research team',
    'Synthesize findings into actionable insights',
    'Frame a product around jobs-to-be-done',
    'Ideate, prototype, and validate with AI as your crew',
    'Ship a product through the complete concept-to-customer arc',
    'Use the Investiture scaffold to structure a new project from day one',
  ],
  lessons: [
    research,
    synthesis,
    jtbd,
    ideation,
    prototyping,
    validation,
    shipping,
    investiture,
  ],
};
