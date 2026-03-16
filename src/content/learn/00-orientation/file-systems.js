export default {
  slug: 'file-systems',
  title: 'File Systems',
  subtitle: 'Where your stuff lives, and why it matters.',
  duration: '15 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What Is a File System?',
        body: [
          'Everything on your computer is a file inside a folder. A photo is a file. A Word document is a file. The application you used to open that document? Also files — hundreds of them — living inside a folder.',
          'Folders can contain other folders, which can contain other folders, forming a tree. Your operating system shows you a visual representation of this tree — Finder on Mac, File Explorer on Windows — but underneath the interface, it is all paths. Every file has an address, and learning to read that address is like learning to read a map.',
        ],
      },
      {
        type: 'callout',
        body: 'Every file on your computer has an address. When you can read that address, you can find anything, reference anything, and fix almost any "file not found" error you will ever encounter.',
      },
      {
        type: 'text',
        heading: 'Paths',
        body: [
          'A path is the full address of a file or folder. On Mac and Linux, paths use forward slashes: /Users/yourname/Desktop/project/index.html. On Windows, it is backslashes: C:\\Users\\yourname\\Desktop\\project\\index.html. The concept is the same.',
          'There are two kinds of paths. An absolute path starts from the very top of the tree (the root) and spells out the full address: /Users/yourname/Desktop/project. A relative path starts from wherever you currently are: ./src/App.jsx means "from here, go into src, find App.jsx."',
          'Why does this matter? Every import statement in code uses paths. Every file reference in a config file uses paths. Every terminal command that targets a file uses a path. If you understand paths, you understand how code finds things.',
        ],
      },
      {
        type: 'code',
        body: '# Absolute paths — full address from root\n/Users/yourname/Desktop/project/index.html\nC:\\Users\\yourname\\Desktop\\project\\index.html\n\n# Relative paths — from wherever you are right now\n./src/App.jsx          # Current folder → src → App.jsx\n../images/logo.png     # Up one folder → images → logo.png\n../../package.json     # Up two folders → package.json',
      },
      {
        type: 'text',
        heading: 'Your Home Directory',
        body: [
          'Every user on a computer has a home directory. This is your personal space — where your Desktop, Documents, Downloads, and project folders live.',
          'On Mac: /Users/yourname. On Linux: /home/yourname. On Windows: C:\\Users\\yourname. In the terminal, the tilde symbol (~) is a shortcut for your home directory. So ~/Desktop means /Users/yourname/Desktop. You will see the tilde everywhere.',
          'The root directory (just /) is the very top of the entire file system. Everything branches down from there — system files, applications, user directories, all of it. You will rarely need to go to root, but knowing it exists helps you read absolute paths.',
        ],
      },
      {
        type: 'text',
        heading: 'Hidden Files and Dotfiles',
        body: [
          'Files and folders that start with a dot (.) are hidden by default. You will not see them in Finder or File Explorer unless you ask. But they are there, and they matter enormously.',
          '.gitignore tells Git which files to ignore. .env stores secret keys and passwords. .eslintrc configures your code linter. CLAUDE.md gives instructions to AI agents. These "dotfiles" are configuration — they control how your tools behave.',
          'To see hidden files in the terminal: ls -a. To see them in Mac Finder: press Cmd+Shift+Period. To see them in Windows Explorer: View → Show → Hidden items.',
          'A word of caution: .env files often contain passwords and API keys. Never commit them to Git. Never share them publicly. The .gitignore file exists specifically to prevent this.',
        ],
      },
      {
        type: 'text',
        heading: 'Project Structure',
        body: [
          'When you work on a web project, you will see a common pattern in how files are organized. Understanding this pattern means you can open any project and quickly find what you need.',
          'src/ — Source code. Your components, pages, styles, and logic live here. This is where you do your work.',
          'public/ — Static assets served as-is. Images, fonts, favicon. These do not get processed by the build tool.',
          'node_modules/ — Every library your project depends on. This folder is enormous and auto-generated. Never edit it. Never commit it to Git.',
          'package.json — Your project\'s identity card. Lists its name, dependencies, and scripts (commands like "npm run dev").',
          'dist/ or build/ — The compiled output. When you build your project for production, the optimized files land here. This is what gets deployed.',
          'You do not need to memorize this. You need to recognize it. When you see src/, you know where the real code is. When you see node_modules/, you know to leave it alone.',
        ],
      },
      {
        type: 'code',
        body: 'my-project/\n├── src/                # Your source code\n│   ├── components/     # Reusable UI pieces\n│   ├── pages/          # Page-level components\n│   ├── styles/         # CSS files\n│   └── App.jsx         # Main application file\n├── public/             # Static assets (images, fonts)\n├── node_modules/       # Dependencies (auto-generated)\n├── package.json        # Project identity card\n├── .gitignore          # Files Git should ignore\n├── .env                # Secret keys (never commit!)\n└── README.md           # Project documentation',
      },
      {
        type: 'exercise',
        title: 'Explore Your File System',
        body: 'Open your terminal. Run pwd to see where you are. Run ls -la to see everything in your current directory, including hidden files. Count the dotfiles — you will probably see more than you expected. Now navigate to your Desktop: cd ~/Desktop. Create a practice project structure: mkdir -p my-project/src my-project/public. Run ls my-project to see the folders you created. Navigate inside: cd my-project. Run touch package.json .gitignore README.md to create the key files. Run ls -a to see everything, including the hidden .gitignore. You just built a project skeleton by hand.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'The Missing Semester — Files and Directories', url: 'https://missing.csail.mit.edu/2020/course-shell/', note: 'The shell lecture covers navigating and manipulating files in depth.' },
          { title: 'MDN: Dealing with Files', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files', note: 'Mozilla\'s guide to file structure for web projects. Clear and beginner-friendly.' },
          { title: 'How to Organize Your Project', url: 'https://vite.dev/guide/', note: 'Vite\'s getting started guide shows the standard project layout you will see in modern web apps.' },
        ],
      },
    ],
  },
  knowledgeCheck: [
    { question: 'What is the difference between an absolute path and a relative path, and when would you use each one?', hint: 'Think about what happens when you move a project to a different computer. Which type of path would break?' },
    { question: 'The tilde (~) is a shortcut for your home directory. Why is this useful instead of always typing the full path like /Users/yourname?' },
    { question: 'Why does folder structure matter for projects? Could you just put every file in a single folder and let the build tool sort it out?', hint: 'Consider what happens when a project grows to hundreds of files, or when another person (or an AI agent) needs to navigate your code.' },
    { question: 'The .env file is hidden (starts with a dot) and should never be committed to Git. Why is it hidden by default, and what could go wrong if you accidentally shared it publicly?' },
  ],
};
