// ============================================
// OPEN VECTOR — Learn Content Aggregator
// ============================================
//
// This file assembles the complete curriculum from individual level folders.
// Each level folder contains its own index.js (level metadata + lesson imports).
// To add a new level, create a folder, add its index.js, and import it here.
//

import orientation from './00-orientation';
import foundation from './01-foundation';
import theMedium from './02-the-medium';
import thePipeline from './03-the-pipeline';
import orchestration from './04-orchestration';
import auteur from './05-auteur';
import approach from './approach';

const learn = {
  nav: {
    brand: 'The Open Vector',
    badge: 'LEARN',
    backLabel: 'About Open Vector',
  },

  index: {
    title: 'The Open Vector Curriculum',
    subtitle: 'From "I have never opened a terminal" to "I ship my own vision."',
    intro: 'Choose a level to begin. Each builds on the last, but you can jump ahead if you already have the foundation.',
  },

  levels: [
    orientation,
    foundation,
    theMedium,
    thePipeline,
    orchestration,
    auteur,
  ],

  approach,
};

export default learn;
