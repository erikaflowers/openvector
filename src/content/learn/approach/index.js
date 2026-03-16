// ============================================
// OPEN VECTOR — Approach Content Aggregator
// ============================================
//
// The Approach section contains step-by-step walkthroughs — IKEA instructions
// for the Zero Vector workflow. Unlike the Curriculum (conceptual, progressive),
// these are procedural guides grouped by category.
//

import firstSession from './first-session';
import scaffoldProject from './scaffold-project';
import writingAPrd from './writing-a-prd';
import buildingUseCases from './building-use-cases';
import projectPlan from './project-plan';
import effectiveInstructions from './effective-instructions';
import multipleAgents from './multiple-agents';
import revisionHistory from './revision-history';
import scaffoldFeature from './scaffold-feature';
import debuggingWithAi from './debugging-with-ai';

export const approachCategories = [
  { key: 'getting-started', label: 'Getting Started' },
  { key: 'planning', label: 'Planning' },
  { key: 'working-with-agents', label: 'Working with Agents' },
  { key: 'build-workflow', label: 'The Build Workflow' },
];

const approach = {
  title: 'The Approach',
  subtitle: 'IKEA instructions for the Zero Vector workflow.',
  intro: 'The curriculum teaches you to think. The Approach shows you what to do. Step-by-step walkthroughs for every part of the design-led engineering workflow — from your first terminal session to coordinating a crew of AI agents.',

  guides: [
    firstSession,
    scaffoldProject,
    writingAPrd,
    buildingUseCases,
    projectPlan,
    effectiveInstructions,
    multipleAgents,
    revisionHistory,
    scaffoldFeature,
    debuggingWithAi,
  ],
};

export default approach;
