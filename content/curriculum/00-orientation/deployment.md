---
slug: deployment
title: Deployment
subtitle: From your computer to the internet.
duration: 10 min
status: available
badge: new
updatedAt: "2026-09-30"
knowledgeCheck:
  - question: What does deployment actually accomplish? Why is "it works on my machine" not the same as "it is live"?
    hint: Think about what localhost means, who can access it, and who cannot.
  - question: What is the difference between a static site and a dynamic site, and why is a static site simpler to deploy?
    hint: Think about whether the server has to run any code when someone visits the page.
  - question: The build step compiles your source code into a dist/ folder. Why do you ship the compiled output instead of your original source files?
    hint: Consider what browsers can and cannot understand natively, and what you would not want exposed publicly.
  - question: Dragging a folder onto Netlify Drop puts it online in seconds. What would you have to do every time you changed the site, and why might connecting a Git repository be better later on?
    hint: Think about who remembers to re-upload, and what happens when you push a commit.
---

## What Does "Deployed" Mean?

Your project works on your computer at an address like `localhost:5173` (the default for Vite, a tool you will meet later). You can see it, click around, and it feels real. But nobody else can see it. Your computer is not a web server; it is not listening for requests from the outside world.

Deployment means putting your project on a server that is connected to the internet, so anyone with the URL can access it. That is the gap between "it works on my machine" and "it is live." Closing that gap is one of the most satisfying moments in building.

> Deployment is not the finish line. It is the starting line. The moment your work is live is the moment real feedback begins.

## Static vs Dynamic

There are two kinds of websites, and the distinction matters for deployment:

A static site is a collection of pre-built files (HTML, CSS, JavaScript) served as-is. The server does not think. It hands over files when asked. Blogs, portfolios, documentation sites, and marketing pages are usually static. This entire Zero Vector site is static.

A dynamic site runs code on the server for every request. It talks to databases, processes user input, and generates pages on the fly. Web apps with login systems, dashboards, and real-time features are dynamic.

Most things you build early will be static, and that is fine. Static sites are faster, cheaper (often free), simpler to deploy, and more secure. You can go surprisingly far before needing a server.

## The Build Step

When you write code in React, Vue, or any modern framework, your browser cannot read it directly. JSX is not HTML. Sass is not CSS. Your source code needs to be compiled into plain HTML, CSS, and JavaScript that browsers understand.

This is the build step. You run a command, usually `npm run build`, and your build tool (Vite, Webpack, etc.) processes everything, optimizes it, and outputs the result into a `dist/` or `build/` folder.

The `dist/` folder is what gets deployed. Not your source code, not your `node_modules`, not your `.env` file. Just the clean, compiled output. This is why deployment and development are separate steps: what you work with is not what you ship.

```bash
# Build your project for production
npm run build

# This creates a dist/ folder with the compiled files:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-abc123.js    (your compiled code)
# │   └── style-def456.css   (your compiled styles)
# └── images/
```

You do not need to run a build today. A plain `index.html` file is already something a browser understands, so it can be deployed as it is. That is what you will do below.

## Hosting Platforms

A hosting platform is a company that runs the servers for you. You hand it your files, and it gives you a public URL. The three most popular for static sites:

**Netlify** offers a generous free tier, excellent for static sites and simple serverless functions. Zero Vector is deployed on Netlify.

**Vercel** was built by the creators of Next.js. Great developer experience, fast CDN, similar free tier. Particularly good for Next.js and React projects.

**GitHub Pages** provides free hosting directly from a GitHub repository. More limited than Netlify or Vercel, but zero configuration for simple projects. Good for portfolios and documentation.

There are two ways to hand over your files. The first is to upload a folder by hand. The second is to connect a Git repository, so the platform rebuilds and redeploys every time you push to `main`. That second way is called continuous deployment, and it is how real projects are run. You will set it up in Level 02. Today you will use the first way, because it needs nothing but a browser.

## Your First Live URL

Netlify Drop lets you drag a folder from your computer into a browser window and get a live URL back. There is no Git, no GitHub setup, and no build command involved. You only need a free Netlify account, and you can sign up with an email address.

Netlify serves whatever is inside the folder you drop. For a plain HTML site, that is the folder holding your `index.html`. For a built project, it is the `dist/` folder.

::::exercise{title="Put a Page on the Internet"}

:::prereq
Create a free account at [netlify.com](https://www.netlify.com) and make sure you are logged in. Signing up with an email address is enough.
:::

- Open your terminal and create a folder: `mkdir ~/Desktop/my-first-site && cd ~/Desktop/my-first-site`
- Create a page inside it: `echo "<h1>Hello from my first deploy</h1>" > index.html`
- Open the file in your browser to check it: `open index.html` on Mac, or `start index.html` on Windows
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag the `my-first-site` folder from your Desktop into the drop area on the page
- Wait a few seconds. Netlify gives you a URL ending in `.netlify.app`. Open it, then send it to a friend or open it on your phone.

That page is on the internet. To change it, edit `index.html`, open your site in Netlify, go to its Deploys page, and drag the folder onto the dropzone at the bottom. Dropping it on app.netlify.com/drop again would create a new site with a different URL. The goal is not a polished product. It is experiencing the act of going from local to live.
::::

## Where This Goes Next

Dragging a folder works, but it depends on you remembering to do it after every change. In Level 02, once you have been building with Claude Code, the [hands-on Deployment lesson](/learn/curriculum/02-the-medium/deploy) connects a GitHub repository to Netlify. From then on, every push goes live on its own, and you will learn to read a build log when a deploy fails.

You have not skipped anything. The concepts in this lesson are the foundation for that pipeline, and the next lesson, DNS, shows how a domain name like `my-project.com` can point at the site you deployed today.

:::resources{title="Go Deeper"}
- [Netlify Drop](https://app.netlify.com/drop). Drag and drop a folder to deploy it instantly.
- [Netlify Docs: Get Started](https://docs.netlify.com/get-started/). Netlify's guide to deploying your first site, including drag-and-drop and Git-based deploys.
- [Vercel Docs: Deployments](https://vercel.com/docs/deployments/overview). Vercel's deployment concepts explained clearly.
- [GitHub Pages Docs](https://docs.github.com/en/pages). How to deploy directly from a GitHub repository for free.
:::
