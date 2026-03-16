// Level 01: Foundation
// Systems thinking and architecture before code.

import systemsThinking from './systems-thinking';
import architecture from './architecture';
import nounsAndVerbs from './nouns-and-verbs';
import planning from './planning';
import vectorMd from './vector-md';
import dataModeling from './data-modeling';
import informationArchitecture from './information-architecture';

export default {
  slug: '01-foundation',
  number: '01',
  title: 'Foundation',
  subtitle: 'Think before you build. Then build while you think.',
  status: 'available',
  desc: 'Systems thinking. Architecture before code. The nouns-and-verbs exercise. Planning methodology. This is what separates Zero-Vector from vibe coding.',
  prereqs: 'Level 00 (Orientation) or equivalent comfort with terminal, Git, and file systems.',
  outcomes: [
    'Think in systems, not features',
    'Architect software before writing a line of code',
    'Identify nouns and verbs in any product idea',
    'Plan a project from concept to shipping',
    'Understand VECTOR.md as the central artifact of Zero Vector methodology',
    'Model data relationships like a designer',
    'Organize information so it makes sense to humans and machines',
  ],
  lessons: [
    systemsThinking,
    architecture,
    nounsAndVerbs,
    planning,
    vectorMd,
    dataModeling,
    informationArchitecture,
  ],
};
