export default {
  slug: 'teaching',
  title: 'Teaching',
  subtitle: 'The best way to learn is to teach.',
  duration: '18 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Why Teach?',
        body: [
          'Teaching is not a generous add-on to your practice. It is a core part of it. When you teach something, you are forced to organize your knowledge, identify your gaps, and explain things clearly enough for someone else to understand. Teaching is the most rigorous form of learning.',
          'You cannot teach what you do not understand. The moment you try to explain JTBD to someone and they ask "why not just ask people what they want?" you discover whether you truly understand the concept or just memorized the words. Teaching exposes shallow knowledge ruthlessly.',
          'Every level of this curriculum was designed to build on the last. Level 00 gave you tools. Level 01 gave you thinking. Level 02 gave you a medium. Level 03 gave you a process. Level 04 gave you a system. Now Level 05 asks you to close the loop: take what you have learned and give it to someone else.',
        ],
      },
      {
        type: 'callout',
        body: 'If you cannot explain it simply, you do not understand it well enough. Teaching is not the output of understanding — it is the test of understanding.',
      },
      {
        type: 'text',
        heading: 'Teaching as Thinking',
        body: [
          'Writing a tutorial is a thinking exercise. You have to decide: what is the essential concept? What is the right order? What is the right analogy? What can I skip? Every decision forces clarity.',
          'The Feynman Technique makes this explicit: take a concept, explain it as if teaching a beginner, identify where your explanation breaks down, go back to the source material, simplify, repeat. By the time you can teach it clearly, you understand it deeply.',
          'This is why many of the best practitioners are also teachers. Richard Feynman taught physics. Steve Krug taught usability. Seth Godin teaches marketing. Teaching did not distract from their practice — it sharpened it.',
        ],
      },
      {
        type: 'text',
        heading: 'Formats That Work',
        body: [
          'You do not need a classroom or a YouTube channel. Teaching takes many forms:',
          'Writing. A blog post explaining how you built something. A tutorial walking through a technique. A case study analyzing a decision. Writing is the most accessible form of teaching — you need nothing but a text editor and a place to publish.',
          'Showing. A screen recording of your process. A before-and-after comparison. A demo with narration. Showing is powerful because it includes the messy parts — the debugging, the wrong turns, the "wait, that is not right" moments that tutorials often hide.',
          'Pairing. Sit with someone (in person or remotely) and build something together. This is the most intensive form of teaching and the most effective. The learner sees your actual process, not the idealized version.',
          'Open source. Publishing your code, your templates, your CLAUDE.md files. This is teaching by example. People learn from reading real code that solves real problems.',
        ],
      },
      {
        type: 'text',
        heading: 'The Curse of Knowledge',
        body: [
          'The biggest obstacle to good teaching is the curse of knowledge. Once you understand something, you cannot remember what it was like not to understand it. You skip steps that seem obvious. You use jargon without realizing it. You move too fast through the parts that took you weeks to learn.',
          'Fight this by remembering your own confusion. What tripped you up when you first learned Git? What made file systems click? When did you finally understand why components need state? Those moments of confusion are the exact places where your learners need the most help.',
          'Another strategy: teach someone and watch their face. The moment of confusion is visible — a furrowed brow, a hesitation, a "wait, what?" That is your signal to slow down, try a different angle, or add an example.',
        ],
      },
      {
        type: 'text',
        heading: 'Scaffolding',
        body: [
          'Good teaching meets people where they are and gives them a path to where they need to be. This is scaffolding — providing just enough structure for the learner to reach the next level.',
          'Too much scaffolding: step-by-step instructions so detailed that the learner never thinks for themselves. They can follow the recipe but cannot cook without one.',
          'Too little scaffolding: "figure it out" with no guidance. Some learners thrive here, but most get frustrated and quit. The gap between where they are and where they need to be is too large to cross alone.',
          'The right scaffolding: explain the concept, show an example, let them try, be available when they get stuck. This is the pattern of every good lesson in this curriculum: concept → callout → details → exercise. It is also the pattern of good mentoring.',
        ],
      },
      {
        type: 'text',
        heading: 'Building in Public as Teaching',
        body: [
          'You do not have to create formal educational content to teach. Building in public — sharing your process, your decisions, your mistakes — is a form of teaching that is often more valuable than polished tutorials.',
          'A tweet thread about a debugging session teaches more about real development than a clean tutorial that pretends everything works the first time. A blog post about why you chose one architecture over another teaches decision-making. A video of you and an AI agent building a feature teaches orchestration.',
          'The authenticity is the value. Polished content is useful. Raw process is transformative. Learners need to see that experts struggle too — that confusion and mistakes are not signs of failure but features of the process.',
        ],
      },
      {
        type: 'text',
        heading: 'The Multiplier Effect',
        body: [
          'When you teach one person, two people learn: them and you. When you publish a tutorial, hundreds or thousands might learn. Teaching is the highest-leverage activity a practitioner can do.',
          'But the leverage goes beyond knowledge transfer. Teaching builds reputation. People who teach are recognized as experts. Teaching builds community — learners become peers, then collaborators, then friends. Teaching builds legacy — your tutorial might help someone ten years from now.',
          'The Zero Vector philosophy says: design is not a solitary pursuit. It is a craft practiced in community. Teaching is how you contribute to that community. You learned from others. Now others learn from you. The cycle continues.',
        ],
      },
      {
        type: 'exercise',
        title: 'Teach One Thing',
        body: 'Pick one concept from this curriculum that you now understand well. Write a 500-word explanation of it, aimed at someone who has never encountered it. Use one analogy, one concrete example, and zero jargon (or define every term you use). Publish it — on a blog, on social media, in a Slack channel, anywhere someone might read it. Teaching one thing, one time, to one audience is how you start.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'The Feynman Technique', url: 'https://fs.blog/feynman-technique/', note: 'The learning-through-teaching method, explained clearly. Practice this with every new concept you learn.' },
          { title: 'Show Your Work by Austin Kleon', url: 'https://austinkleon.com/show-your-work/', note: 'On sharing your process publicly. Short, visual, and immediately actionable.' },
          { title: 'Teaching Tech Together by Greg Wilson', url: 'https://teachtogether.tech/', note: 'Evidence-based techniques for teaching programming. Free online. Dense but invaluable.' },
        ],
      },
    ],
  },
};
