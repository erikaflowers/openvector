// Level 04: Orchestration
// Multiple agents. The crew model. One mind, many hands.

import claudeMd from './claude-md';
import multiAgent from './multi-agent';
import stagedPrompts from './staged-prompts';
import orchestration from './orchestration';
import qualityGates from './quality-gates';
import theCrewModel from './the-crew-model';

export default {
  slug: '04-orchestration',
  number: '04',
  title: 'Orchestration',
  subtitle: 'One mind, many hands.',
  status: 'available',
  desc: 'Multiple agents. CLAUDE.md instruction files. The crew model. Building systems, not features.',
  prereqs: 'Level 03 (The Pipeline). You need hands-on shipping experience before orchestrating multiple agents.',
  outcomes: [
    'Write CLAUDE.md files that give agents persistent context',
    'Run multiple AI agents on the same project',
    'Design staged prompts for complex workflows',
    'Orchestrate agents as a team, not a tool',
    'Build quality gates that catch problems before they ship',
    'Implement the Crew Model for production-scale projects',
  ],
  lessons: [
    claudeMd,
    multiAgent,
    stagedPrompts,
    orchestration,
    qualityGates,
    theCrewModel,
  ],
};
