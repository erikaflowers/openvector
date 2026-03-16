// Level 05: Auteur
// Your practice. Your framework. Your contribution.

import personalMethodology from './personal-methodology';
import frameworkDesign from './framework-design';
import teaching from './teaching';
import contribution from './contribution';
import community from './community';
import auteurPractice from './auteur-practice';

export default {
  slug: '05-auteur',
  number: '05',
  title: 'Auteur',
  subtitle: 'Your practice. Your framework. Your contribution.',
  status: 'available',
  desc: 'You are no longer following the curriculum. You are building your own. The student becomes the practitioner. The practitioner becomes the auteur.',
  prereqs: 'Level 04 (Orchestration). This level assumes you have built and shipped real projects with AI agents.',
  outcomes: [
    'Develop your own personal methodology',
    'Design frameworks that others can follow',
    'Teach Zero-Vector principles to your team or community',
    'Contribute back to the open source movement',
    'Build and lead a community of practice',
    'Practice as a Systems Auteur — one mind, complete vision',
  ],
  lessons: [
    personalMethodology,
    frameworkDesign,
    teaching,
    contribution,
    community,
    auteurPractice,
  ],
};
