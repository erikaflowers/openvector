export default {
  slug: 'deployment',
  title: 'Deployment',
  subtitle: 'From your computer to the internet.',
  duration: '18 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What Does "Deployed" Mean?',
        body: [
          'Your project works on your computer at localhost:3000. You can see it, click around, and it feels real. But nobody else can see it. Your computer is not a web server — it is not listening for requests from the outside world.',
          'Deployment means putting your project on a server that is connected to the internet, so anyone with the URL can access it. That is the gap between "it works on my machine" and "it is live." Closing that gap is one of the most satisfying moments in building.',
        ],
      },
      {
        type: 'callout',
        body: 'Deployment is not the finish line. It is the starting line. The moment your work is live is the moment real feedback begins.',
      },
      {
        type: 'text',
        heading: 'Static vs Dynamic',
        body: [
          'There are two kinds of websites, and the distinction matters for deployment:',
          'A static site is a collection of pre-built files — HTML, CSS, JavaScript — served as-is. The server does not think. It just hands over files when asked. Blogs, portfolios, documentation sites, and marketing pages are usually static. This entire Zero Vector site is static.',
          'A dynamic site runs code on the server for every request. It talks to databases, processes user input, and generates pages on the fly. Web apps with login systems, dashboards, and real-time features are dynamic.',
          'Most things you build early will be static, and that is fine. Static sites are faster, cheaper (often free), simpler to deploy, and more secure. You can go surprisingly far before needing a server.',
        ],
      },
      {
        type: 'text',
        heading: 'The Build Step',
        body: [
          'When you write code in React, Vue, or any modern framework, your browser cannot read it directly. JSX is not HTML. Sass is not CSS. Your source code needs to be compiled into plain HTML, CSS, and JavaScript that browsers understand.',
          'This is the build step. You run a command — usually npm run build — and your build tool (Vite, Webpack, etc.) processes everything, optimizes it, and outputs the result into a dist/ or build/ folder.',
          'The dist/ folder is what gets deployed. Not your source code, not your node_modules, not your .env file. Just the clean, compiled output. This is why deployment and development are separate steps — what you work with is not what you ship.',
        ],
      },
      {
        type: 'code',
        body: '# Build your project for production\nnpm run build\n\n# This creates a dist/ folder with the compiled files:\n# dist/\n# ├── index.html\n# ├── assets/\n# │   ├── index-abc123.js    (your compiled code)\n# │   └── style-def456.css   (your compiled styles)\n# └── images/',
      },
      {
        type: 'text',
        heading: 'Hosting Platforms',
        body: [
          'The easiest way to deploy a static site is through a platform that connects to your GitHub repo, watches for pushes, and auto-deploys your latest code. The three most popular:',
          'Netlify — Generous free tier, excellent for static sites and simple serverless functions. Zero Vector is deployed on Netlify. Drag-and-drop deploy is available, but Git-based deploy is better.',
          'Vercel — Built by the creators of Next.js. Great developer experience, fast CDN, similar free tier. Particularly good for Next.js and React projects.',
          'GitHub Pages — Free hosting directly from a GitHub repository. More limited than Netlify or Vercel, but zero configuration for simple projects. Good for portfolios and documentation.',
          'All three follow the same pattern: connect your repo, set the build command (npm run build) and publish directory (dist), and every push to main automatically builds and deploys. This is called continuous deployment — you push code, it goes live.',
        ],
      },
      {
        type: 'text',
        heading: 'Your First Deploy',
        body: [
          'Let us walk through the Netlify workflow, since it is what we use:',
          '1. Sign up at netlify.com with your GitHub account.',
          '2. Click "Add new site" → "Import an existing project" → select GitHub.',
          '3. Pick your repository from the list.',
          '4. Set the build command: npm run build.',
          '5. Set the publish directory: dist (or build, depending on your tool).',
          '6. Click "Deploy." Netlify clones your repo, runs the build, and publishes the output.',
          'In about 90 seconds, you have a live URL like your-project-name.netlify.app. That is it. Your project is on the internet.',
          'From this point on, every time you push to main, Netlify rebuilds and redeploys automatically. You do not need to manually deploy again. Push code → it goes live.',
        ],
      },
      {
        type: 'text',
        heading: 'Custom Domains',
        body: [
          'The auto-generated URL (your-project.netlify.app) works, but for real projects you want your own domain. The process is straightforward:',
          '1. Buy a domain from a registrar (Namecheap, Cloudflare, Google Domains).',
          '2. In Netlify, go to Site settings → Domain management → Add custom domain.',
          '3. Netlify tells you what DNS records to set (we cover DNS in the next lesson).',
          '4. Set those records at your registrar. Wait for propagation.',
          '5. Netlify automatically provisions an SSL certificate (HTTPS). Your site is live on your domain, with encryption, for free.',
        ],
      },
      {
        type: 'text',
        heading: 'When Deployment Fails',
        body: [
          'Your deploy will fail eventually. This is normal. The build log tells you exactly what went wrong.',
          'The most common failures: a missing dependency (you installed something locally but forgot to save it to package.json), a build error (something in your code that works in development but fails in production), or an environment variable that is set locally but not on the hosting platform.',
          'Read the build log from the bottom up. The last error is usually the cause. Fix it, push again, and the platform rebuilds automatically. This loop — push, fail, read the log, fix, push again — is completely normal. Even experienced developers go through it.',
        ],
      },
      {
        type: 'exercise',
        title: 'Deploy Something',
        body: 'If you have a project with a package.json and a build command, deploy it to Netlify following the steps above. If you do not have a project yet, create the simplest possible one: make a folder, run npm create vite@latest my-site -- --template vanilla, cd into it, push to a new GitHub repo, and deploy that. The goal is not a polished product — it is experiencing the act of going from local to live. Get something on the internet. You can always improve it later.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Netlify Docs — Get Started', url: 'https://docs.netlify.com/get-started/', note: 'Step-by-step guide to deploying your first site on Netlify.' },
          { title: 'Vercel Docs — Deployments', url: 'https://vercel.com/docs/deployments/overview', note: 'Vercel\'s deployment concepts explained clearly.' },
          { title: 'GitHub Pages Docs', url: 'https://docs.github.com/en/pages', note: 'How to deploy directly from a GitHub repository for free.' },
          { title: 'Vite Deploying a Static Site', url: 'https://vite.dev/guide/static-deploy', note: 'Vite\'s official guide covers deployment to every major platform.' },
        ],
      },
    ],
  },
  knowledgeCheck: [
    { question: 'What does deployment actually accomplish? Why is "it works on my machine" not the same as "it is live"?', hint: 'Think about what localhost means — who can access it, and who cannot.' },
    { question: 'The build step compiles your source code into a dist/ folder. Why do you ship the compiled output instead of your original source files?', hint: 'Consider what browsers can and cannot understand natively, and what you would not want exposed publicly.' },
    { question: 'Why would deploying directly from your local machine be risky compared to using a platform like Netlify that builds from your Git repository?', hint: 'Think about reproducibility — what if your local machine has something installed that the server does not?' },
    { question: 'When a deploy fails, the lesson says to read the build log from the bottom up. Why the bottom, and what kind of information does a build log give you that you would not get from just looking at your code?' },
  ],
};
