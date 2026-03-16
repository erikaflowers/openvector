// Open Vector Landing Page, Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const open = {
  nav: {
    brand: 'Zero-Vector / The Open Vector',
    badge: 'LIVE! FREE. ALWAYS FREE.',
  },

  hero: {
    label: 'The Source Code of Zero-Vector Design',
    title: ['The', 'Open', 'Vector'],
    body1: 'Every course behind a paywall. Every workshop with a ticket price. Every guru atop a tower.',
    body1Bold: "'AI is coming for your job. You must pay me to teach you to survive.'",
    body2: 'We reject that. Completely.',
    declaration: "The knowledge to become a Zero-Vector practitioner is free. It will always be free. No paywall. No premium tier. No 'sign up for the good stuff.' All of it. Open.",
    freeIndicator: 'Free. Always free. Open source knowledge.',
  },

  pledge: {
    label: 'The Open Vector Pledge',
    items: [
      { lead: 'The curriculum is open.', body: 'Every lesson, every framework, every resource. Fork it. Teach it. Adapt it. Build on it. It belongs to everyone.' },
      { lead: 'No knowledge is gated by money.', body: 'The information is free, and the discipline and field benefits when it is shared. The commons grows. The walls come down.' },
      { lead: 'Time is the only honest cost.', body: "One-on-one coaching, organizational consulting, and speaking engagements cost money because a human being's hours are finite. The knowledge itself? Infinite. Free." },
      { lead: 'We make everyone around us better.', body: 'That is the job. Not gatekeeping. Not profiting off fear. Not building towers. The job is to teach people to long for the sea.' },
    ],
  },

  curriculum: {
    label: 'The Curriculum',
    intro: "From 'I have never opened a terminal' to 'I ship my own vision.' Structured. Progressive. Durable. Not a YouTube playlist. A real path.",
    levels: [
      {
        number: '00',
        title: 'Orientation',
        subtitle: 'What is this machine, actually?',
        status: 'available',
        desc: 'The foundational understanding that got skipped. What is a terminal. What is a file system. What is Git (and why it is not Google Drive). What is a repo. What is deployment. The early computer stuff that nobody teaches designers because everyone assumes someone else already did.',
        topics: ['terminal', 'file systems', 'git basics', 'repos', 'deployment', 'DNS'],
      },
      {
        number: '01',
        title: 'Foundation',
        subtitle: 'Think before you build. Then build while you think.',
        status: 'available',
        desc: 'Systems thinking. Architecture before code. The nouns-and-verbs exercise: what are the things, what do the things do? Planning methodology. How to think about a problem before you touch a tool. This is what separates Zero-Vector from vibe coding.',
        topics: ['systems thinking', 'architecture', 'nouns & verbs', 'planning', 'data modeling', 'information architecture'],
      },
      {
        number: '02',
        title: 'The Medium',
        subtitle: 'Hands on the rock. No gloves.',
        status: 'available',
        desc: 'Working in code with AI agents. Claude Code, prompting for code, iterating on output. Building your first real thing. Not a trinket. Something with a file structure, a repo, a deployment pipeline. Something that lives on the internet and does what you intended.',
        topics: ['Claude Code', 'prompting', 'iteration', 'React basics', 'deployment', 'your first ship'],
      },
      {
        number: '03',
        title: 'The Pipeline',
        subtitle: 'Every phase. Every handoff. Collapsed.',
        status: 'available',
        desc: 'Applying Zero-Vector across the entire concept-to-customer arc. Market research, customer research, JTBD, ideation, prototyping, validation, shipping. One project, end to end. Not theory. Practice. You will build something real and ship it.',
        topics: ['research', 'synthesis', 'JTBD', 'ideation', 'prototyping', 'validation', 'shipping'],
      },
      {
        number: '04',
        title: 'Orchestration',
        subtitle: 'One mind, many hands.',
        status: 'available',
        desc: 'Multiple agents. CLAUDE.md instruction files. Staged prompt engineering. The crew model. Building systems, not features. How to decompose work, assign agents, coordinate handoffs, and maintain quality across a multi-agent operation.',
        topics: ['CLAUDE.md', 'multi-agent', 'staged prompts', 'orchestration', 'quality gates', 'the crew model'],
      },
      {
        number: '05',
        title: 'Auteur',
        subtitle: 'Your practice. Your framework. Your contribution.',
        status: 'available',
        desc: 'You are no longer following the curriculum. You are building your own. Develop your personal methodology. Define your agents. Ship your vision. Teach others. Contribute back to the Open Vector. The student becomes the practitioner. The practitioner becomes the auteur.',
        topics: ['personal methodology', 'framework design', 'teaching', 'contribution', 'community', 'auteur practice'],
      },
    ],
  },

  contrast: {
    label: 'The Difference',
    them: {
      label: 'The Industry',
      lines: [
        "Expensive courses on 'AI for Designers'",
        'Gated masterclass bootcamps',
        'Certification programs that certify nothing',
        'Gurus selling fear from towers',
        "'Exclusive' communities behind paywalls",
        'Knowledge hoarded as competitive advantage',
        'Teaching people to gather wood',
      ],
    },
    us: {
      label: 'The Open Vector',
      lines: [
        'Free curriculum, always',
        'Open source methodology',
        'Your work is your credential',
        'Practitioners who ship, not gurus who lecture',
        'A commons that belongs to everyone',
        'Knowledge shared as collective leverage',
        'Teaching people to long for the sea',
      ],
    },
  },

  exupery: {
    quote: "If you want to build a ship, don't drum up the men to gather wood, divide the work, and give orders. Instead, teach them to yearn for the vast and endless sea.",
    cite: 'Antoine de Saint-Exupery',
    punch: 'You cannot teach someone to long for the sea when you are charging them for the view.',
    close: 'The Open Vector is the ocean. Come sail.',
  },

  cta: {
    title: 'Build With Us',
    body: 'The Open Vector is a commons. It grows when practitioners contribute. Teach what you know. Share what you build. Make everyone around you better. That is the job.',
    primaryCta: 'Start Learning',
    secondaryCta: 'Contribute',
    backCta: 'Back to Manifesto',
  },
};

export default open;
