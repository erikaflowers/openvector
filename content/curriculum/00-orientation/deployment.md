---
slug: deployment
title: Deployment
subtitle: From your computer to the internet.
duration: 18 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: What does deployment actually accomplish? Why is "it works on my machine" not the same as "it is live"?
    hint: Think about what localhost means, who can access it, and who cannot.
  - question: The build step compiles your source code into a dist/ folder. Why do you ship the compiled output instead of your original source files?
    hint: Consider what browsers can and cannot understand natively, and what you would not want exposed publicly.
  - question: Why would deploying directly from your local machine be risky compared to using a platform like Netlify that builds from your Git repository?
    hint: Think about reproducibility. What if your local machine has something installed that the server does not?
  - question: When a deploy fails, the lesson says to read the build log from the bottom up. Why the bottom, and what kind of information does a build log give you that you would not get from just looking at your code?
---

:::prereq
You will need two things set up before starting this lesson:

- **GitHub credentials configured locally.** You need to be able to push code from your terminal to GitHub. If you have not done this yet, follow GitHub's guide to [setting up authentication](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git#authenticating-with-github-from-git). The easiest option is HTTPS with a personal access token or the GitHub CLI (`gh auth login`).
- **A Netlify account.** Sign up at [netlify.com](https://www.netlify.com) using your GitHub account. The free tier is all you need.
:::

## What Does "Deployed" Mean?

Your project works on your computer at `localhost:3000`. You can see it, click around, and it feels real. But nobody else can see it. Your computer is not a web server; it is not listening for requests from the outside world.

Deployment means putting your project on a server that is connected to the internet, so anyone with the URL can access it. That is the gap between "it works on my machine" and "it is live." Closing that gap is one of the most satisfying moments in building.

> Deployment is not the finish line. It is the starting line. The moment your work is live is the moment real feedback begins.

## Static vs Dynamic

There are two kinds of websites, and the distinction matters for deployment:

A static site is a collection of pre-built files (HTML, CSS, JavaScript) served as-is. The server does not think. It just hands over files when asked. Blogs, portfolios, documentation sites, and marketing pages are usually static. This entire Zero Vector site is static.

A dynamic site runs code on the server for every request. It talks to databases, processes user input, and generates pages on the fly. Web apps with login systems, dashboards, and real-time features are dynamic.

Most things you build early will be static, and that is fine. Static sites are faster, cheaper (often free), simpler to deploy, and more secure. You can go surprisingly far before needing a server.

## The Build Step

When you write code in React, Vue, or any modern framework, your browser cannot read it directly. JSX is not HTML. Sass is not CSS. Your source code needs to be compiled into plain HTML, CSS, and JavaScript that browsers understand.

This is the build step. You run a command, usually `npm run build`, and your build tool (Vite, Webpack, etc.) processes everything, optimizes it, and outputs the result into a `dist/` or `build/` folder.

The `dist/` folder is what gets deployed. Not your source code, not your `node_modules`, not your `.env` file. Just the clean, compiled output. This is why deployment and development are separate steps: what you work with is not what you ship.

```
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

## Hosting Platforms

The easiest way to deploy a static site is through a platform that connects to your GitHub repo, watches for pushes, and auto-deploys your latest code. The three most popular:

**Netlify** offers a generous free tier, excellent for static sites and simple serverless functions. Zero Vector is deployed on Netlify. Drag-and-drop deploy is available, but Git-based deploy is better.

**Vercel** was built by the creators of Next.js. Great developer experience, fast CDN, similar free tier. Particularly good for Next.js and React projects.

**GitHub Pages** provides free hosting directly from a GitHub repository. More limited than Netlify or Vercel, but zero configuration for simple projects. Good for portfolios and documentation.

All three follow the same pattern: connect your repo, set the build command (`npm run build`) and publish directory (`dist`), and every push to `main` automatically builds and deploys. This is called continuous deployment: you push code, it goes live.

## Your First Deploy

Let us walk through the Netlify workflow, since it is what we use:

1. Click "Add new site" → "Import an existing project" → select GitHub.

2. Pick the repository you want to deploy from the list of your existing GitHub repos.

3. Set the build command: `npm run build`.

4. Set the publish directory: `dist` (or `build`, depending on your tool).

5. Click "Deploy." Netlify clones your repo, runs the build, and publishes the output.

In about 90 seconds, you have a live URL like `your-project-name.netlify.app`. That is it. Your project is on the internet.

From this point on, every time you push to `main`, Netlify rebuilds and redeploys automatically. You do not need to manually deploy again. Push code → it goes live.

## When Deployment Fails

Your deploy will fail eventually. This is normal. The build log tells you exactly what went wrong.

The most common failures: a missing dependency (you installed something locally but forgot to save it to `package.json`), a build error (something in your code that works in development but fails in production), or an environment variable that is set locally but not on the hosting platform.

Read the build log from the bottom up. The last error is usually the cause. Fix it, push again, and the platform rebuilds automatically. This loop (push, fail, read the log, fix, push again) is completely normal. Even experienced developers go through it.

:::exercise{title="Deploy Something"}
If you have a project with a `package.json` and a build command, deploy it to Netlify following the steps above. If you do not have a project yet, create the simplest possible one:

- Run `npm create vite@latest my-site -- --template vanilla`
- `cd my-site` and run `npm install`
- Initialize a repo: `git init && git add . && git commit -m "Initial commit"`
- Go to [github.com/new](https://github.com/new) and create a new repository (give it any name, leave everything else as default — do not initialize with a README)
- GitHub will show you setup instructions — copy the two lines under "push an existing repository from the command line" and run them in your terminal
- Follow the "Your First Deploy" steps above to connect the repo to Netlify

The goal is not a polished product. It is experiencing the act of going from local to live. Get something on the internet. You can always improve it later.
:::

:::resources{title="Go Deeper"}
- [Netlify Docs: Get Started](https://docs.netlify.com/get-started/). Step-by-step guide to deploying your first site on Netlify.
- [Vercel Docs: Deployments](https://vercel.com/docs/deployments/overview). Vercel's deployment concepts explained clearly.
- [GitHub Pages Docs](https://docs.github.com/en/pages). How to deploy directly from a GitHub repository for free.
- [Vite Deploying a Static Site](https://vite.dev/guide/static-deploy). Vite's official guide covers deployment to every major platform.
:::
