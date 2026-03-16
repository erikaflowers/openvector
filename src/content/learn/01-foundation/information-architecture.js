export default {
  slug: 'information-architecture',
  title: 'Information Architecture',
  subtitle: 'Organizing what people need to find.',
  duration: '18 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What Is Information Architecture?',
        body: [
          'Information architecture (IA) is the art and science of organizing, structuring, and labeling content so that people can find what they need and understand where they are.',
          'When you walk into a library, the books are organized by subject, then by author. There are signs telling you which section you are in. There is a catalog system for searching. You can browse or search, and both work. That is information architecture — applied to physical space.',
          'On the web, IA is your site structure, your navigation, your URLs, your headings, your categories, your search. It is every decision about where things go and what they are called. It is invisible when it is good and infuriating when it is bad.',
        ],
      },
      {
        type: 'callout',
        body: 'Information architecture is the user experience of finding things. If people cannot find it, you did not build it — as far as they are concerned.',
      },
      {
        type: 'text',
        heading: 'Why IA Matters for Builders',
        body: [
          'If you are coming from design, you already think about IA — navigation menus, page hierarchy, content grouping. But when you start building, IA becomes structural. Your folder structure is IA. Your URL scheme is IA. Your component hierarchy is IA.',
          'Consider this URL: /learn/curriculum/01-foundation/information-architecture. That path tells you exactly where you are: you are in the Open Vector section, in the Learn area, in the Curriculum, in the Foundation level, reading the Information Architecture lesson. The URL is not just an address. It is a map.',
          'When your IA is solid, everything downstream benefits. Navigation writes itself. Breadcrumbs work automatically. Search indexing is clean. Users build accurate mental models of your site. When IA is weak, you end up with a flat mess of pages, confusing navigation, and users who cannot find what they saw five minutes ago.',
        ],
      },
      {
        type: 'text',
        heading: 'Hierarchy',
        body: [
          'The most fundamental IA pattern is hierarchy — organizing content from broad to specific, like a tree. A site has sections. Sections have pages. Pages have content areas. This nesting is natural to how humans categorize information.',
          'The Open Vector curriculum is a hierarchy: Levels (Orientation, Foundation, The Medium...) contain Lessons (Terminal, File Systems, Git Basics...), and Lessons contain Sections (headings, text, exercises). Each layer narrows the focus.',
          'The key decision in hierarchy is depth vs. breadth. A wide, shallow hierarchy means lots of top-level categories with few items each. A narrow, deep hierarchy means fewer categories but more layers to navigate through. Neither is inherently better — it depends on how much content you have and how people look for it.',
          'The rule of thumb: most users should reach their destination in three clicks or fewer. If your hierarchy is deeper than that, consider flattening it or adding shortcuts (search, cross-links, popular items).',
        ],
      },
      {
        type: 'text',
        heading: 'Labeling',
        body: [
          'Labels are the words you put on things — menu items, headings, button text, category names. They are deceptively important. A label that makes sense to you may mean nothing to your users.',
          '"Resources" could mean help articles, downloadable files, or external links. "Dashboard" could be an overview, analytics, or settings. "Settings" on one app controls your profile; on another, it controls the application.',
          'Good labels are specific, predictable, and consistent. "Account Settings" is better than "Settings." "Your Reading List" is better than "Library." Use the language your users use, not the language your database uses.',
          'Test your labels. Show someone your navigation without the rest of the site and ask them to guess what is behind each label. If they guess wrong, the label is wrong — not the user.',
        ],
      },
      {
        type: 'text',
        heading: 'Navigation Patterns',
        body: [
          'Navigation is how users move through your information architecture. The structure and the navigation are not the same thing — structure is how content is organized; navigation is how users traverse that organization.',
          'Global navigation appears on every page and shows top-level sections. This is your main menu. It answers: "What are the major areas of this site?"',
          'Local navigation shows where you are within a section. The sidebar in this curriculum is local navigation — it shows the lessons within the current level. It answers: "What else is in this area?"',
          'Breadcrumbs show the path from the top to where you are now. Open Vector > 01 Foundation > Information Architecture. They answer: "How did I get here, and how do I go back up?"',
          'These three patterns together — global, local, breadcrumbs — give users full spatial awareness. They know where they are, what is nearby, and how to get anywhere else. This is the navigation trifecta.',
        ],
      },
      {
        type: 'text',
        heading: 'URLs as Architecture',
        body: [
          'In web applications, URLs are a direct expression of your information architecture. A well-structured URL scheme is readable, predictable, and hierarchical.',
          '/products/shoes/running — you know exactly what you will find. You can edit the URL to /products/shoes and see all shoes. You can go to /products and see all product categories. The URL is navigable.',
          '/app?view=3&tab=2&id=a7f3e — you know nothing. You cannot edit it meaningfully. You cannot share it with someone and have them understand what it points to.',
          'When you design your routes, think of them as an outline. Each segment adds specificity. /blog is all posts. /blog/2026 is posts from this year. /blog/2026/systems-thinking is a specific post. The URL tells a story.',
        ],
      },
      {
        type: 'code',
        body: '# Good URL architecture — readable, hierarchical, predictable:\n/learn                                    # Learning hub\n/learn/curriculum                         # All levels\n/learn/curriculum/01-foundation           # Specific level\n/learn/curriculum/01-foundation/planning  # Specific lesson\n/learn/resources                          # External resources\n\n# The pattern: /section/area/category/item\n# Each segment narrows the scope.\n# Users can navigate by editing the URL.\n\n# Bad URL architecture — opaque, flat, meaningless:\n/page?id=47\n/content/view/3829\n/app#/module/sub/detail/7',
      },
      {
        type: 'text',
        heading: 'Card Sorting: Let Users Organize',
        body: [
          'Card sorting is a research technique where you write content items on cards and ask users to group them into categories. It reveals how your audience naturally organizes information — which is almost never how you, the builder, would organize it.',
          'Open card sort: users create their own categories. This reveals their mental models. You might learn that users group "Account Settings" and "Billing" together (they are both "my stuff"), even though your database treats them as completely different systems.',
          'Closed card sort: you provide the categories and users sort items into them. This tests whether your existing structure makes sense.',
          'You do not need expensive tools for this. Index cards on a table work. A shared spreadsheet works. The insight comes from watching where people hesitate, where they disagree, and where they are surprised.',
        ],
      },
      {
        type: 'text',
        heading: 'Information Architecture in Zero Vector',
        body: [
          'Information architecture in Zero Vector extends beyond the user interface. It applies to your codebase as well. How you organize files, name folders, and structure components determines how effectively AI agents can navigate and contribute to your project.',
          'An agent reading a project with clear information architecture — components grouped by domain, services separated from UI, utilities in a predictable location — can find what it needs and place new code where it belongs. An agent reading a project that grew organically with no IA will scatter new files randomly, duplicate existing utilities it could not find, and create the kind of structural debt that compounds with every session. Your project\'s IA is not just for human developers anymore. It is for your entire crew.',
        ],
      },
      {
        type: 'exercise',
        title: 'Audit an IA You Use',
        body: 'Pick a website you use regularly — not one you have built. Open it and write down the top-level navigation items. For each one, try to predict what you will find inside before clicking. Now click. Were you right? Were you surprised? Find one label that could be clearer. Find one piece of content that feels like it is in the wrong section. Sketch a URL scheme that would make the site structure obvious. You have just done an IA audit. This is how you build the instinct for good information architecture.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Information Architecture by Rosenfeld, Morville & Arango', url: 'https://www.oreilly.com/library/view/information-architecture-4th/9781491911686/', note: 'The definitive book on IA. The "polar bear book." If you read one book on this topic, make it this one.' },
          { title: 'Abby Covert: How to Make Sense of Any Mess', url: 'https://www.howtomakesenseofanymess.com/', note: 'A free, visual, beginner-friendly book on IA principles. Excellent starting point.' },
          { title: 'Nielsen Norman Group: IA Articles', url: 'https://www.nngroup.com/topic/information-architecture/', note: 'Research-backed articles on IA from the world\'s leading UX research firm.' },
          { title: 'OptimalSort (Card Sorting Tool)', url: 'https://www.optimalworkshop.com/optimalsort/', note: 'A professional tool for running remote card sorts with real users.' },
        ],
      },
    ],
  },
  knowledgeCheck: [
    { question: 'Information architecture and UI design are often confused. What does IA focus on that UI design does not, and why does IA need to come first?', hint: 'Think about what problems IA solves — finding things, understanding structure — versus what UI solves.' },
    { question: 'Why does naming (labeling) matter so much in IA? What happens when a navigation label makes sense to the builder but not to the user?' },
    { question: 'How does hierarchy affect a user\'s understanding of your site? What is the tradeoff between a deep hierarchy (many layers) and a shallow one (many top-level items)?', hint: 'Consider the "three clicks" rule of thumb and what happens when content is buried too deep.' },
    { question: 'The lesson says URLs are "a direct expression of your information architecture." What makes a URL like /products/shoes/running better than /app?view=3&tab=2, and who benefits from the readable version?' },
  ],
};
