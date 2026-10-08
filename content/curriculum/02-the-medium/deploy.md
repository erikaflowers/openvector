---
slug: deploy
title: Deployment
subtitle: From localhost to the world.
duration: 15 min
status: available
updatedAt: "2026-10-07"
---

## Deployment, Revisited

You learned about deployment in Level 00: what it means, static vs. dynamic, the build step, and how to drag a folder onto Netlify Drop for a first live URL. This lesson is the full pipeline. You are going to connect a real project's GitHub repository to Netlify, so every push goes live without you uploading anything.

The difference between "knowing about deployment" and "having deployed" is enormous. Once you have done it once, the mystery disappears. It becomes a routine step: push code, site updates. But that first time matters.

> Your first deploy does not need to be impressive. It needs to be live. A single page on the internet is worth more than a perfect design on your laptop.

## The Deploy Checklist

Before deploying, verify these things:

Your project builds: Run npm run build and make sure it completes without errors. If the build fails, you cannot deploy. Read the error, fix it, try again.

Your project works locally: Run npm run dev, open it in the browser, and click through everything. If it is broken locally, it will be broken in production.

Your code is committed and pushed: The hosting platform deploys from your GitHub repository. If your latest changes are not pushed, the deployed version will be behind.

No secrets in the code: Check that .env is in your .gitignore. API keys, passwords, and tokens should never be committed. If they are, rotate them immediately.

```bash
# The deploy checklist in terminal commands:

# 1. Build successfully?
npm run build

# 2. Works locally?
npm run dev
# → Open http://localhost:5173 and click around

# 3. Code is committed and pushed?
git status          # Nothing unexpected
git add .
git commit -m "Ready to deploy"
git push origin main

# 4. No secrets exposed?
cat .gitignore      # .env should be listed
git log --all --full-history -- .env   # Should show nothing
```

## Netlify: Step by Step

We use Netlify for Zero Vector and it is the simplest path for your first deploy.

Go to netlify.com and sign up with your GitHub account. Click "Add new project" and select "Import an existing project." Choose GitHub as the source and select your repository.

Netlify asks for two settings. Build command: npm run build. Publish directory: dist (for Vite projects; check your build tool if you use something else). Leave everything else as default.

Confirm with the Publish button at the bottom of the page. Netlify clones your repo, runs the build, and publishes the output. In about 60-90 seconds, you have a URL. Click it. Your project is on the internet.

From now on, every push to your main branch triggers an automatic rebuild and redeploy. You do not need to visit Netlify again unless you are changing settings.

## Environment Variables

If your project uses environment variables (API keys, configuration), you need to add them to your hosting platform. Locally they live in .env. In production they live in the platform dashboard.

On Netlify: Project configuration → Environment variables → Add a variable. Set the same key and value as your .env file. The next deploy will pick them up.

Remember: .env files are not deployed. They are local only. The hosting platform provides its own environment. This separation is a security feature: your secrets never touch your Git repository.

## Custom Domains

Your site is live at something-random.netlify.app. To use your own domain:

In Netlify: open your project, select Domain management in the left sidebar → Add a domain → Add a domain you already own. Type your domain (e.g., myproject.com).

At your domain registrar (Namecheap, Cloudflare, etc.): For www (or any subdomain), add a CNAME record pointing to your Netlify URL (your-project.netlify.app). For the bare domain (myproject.com), add an ALIAS record to apex-loadbalancer.netlify.com, or an A record to 75.2.60.5 if your registrar has no ALIAS option. Or use Netlify DNS and point your domain's nameservers to Netlify directly.

Wait for DNS propagation (often minutes, but it can take up to 48 hours). Netlify automatically provisions an SSL certificate. Your site is now live on your custom domain with HTTPS.

The DNS lesson in Level 00 covered the theory. This is the practice.

## When the Deploy Fails

Deploys fail. It is normal. The build log tells you exactly what happened.

In Netlify, go to Deploys → click the failed deploy → scroll through the log. The error is usually near the bottom. Common causes:

Node version mismatch: your local Node is different from Netlify's default. Fix: add a .node-version or .nvmrc file specifying your version.

Missing dependency: you installed a package locally but it did not make it into package.json. Fix: npm install the-package --save and push.

Build error: something in your code that works in dev but fails in production (often a missing environment variable). Fix: check your env vars in the Netlify dashboard.

Read the error. Fix the cause. Push again. Netlify rebuilds automatically.

::::exercise{title="Deploy Your Project"}

:::prereq
You will need two things set up before starting this exercise:

- **GitHub credentials configured locally.** You need to be able to push code from your terminal to GitHub. If you have not done this yet, follow GitHub's guide to [setting up authentication](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git#authenticating-with-github-from-git). The easiest option is HTTPS with a personal access token or the GitHub CLI (`gh auth login`).
- **A Netlify account connected to GitHub.** If you made a Netlify account with an email address in Level 00, you can keep it; Netlify asks for GitHub access when you import a repository. Otherwise, sign up at [netlify.com](https://www.netlify.com) using your GitHub account. The free tier is all you need.
:::

- Take the project you have been building (or create a fresh one with `npm create vite@latest my-site -- --template react`).
- Make sure it builds: `npm run build`.
- If the project is not a Git repository yet, initialize it: `git init && git add . && git commit -m "Initial commit"`
- Go to [github.com/new](https://github.com/new) and create a new repository. Give it any name and leave everything else as default. Do not initialize it with a README.
- GitHub shows you setup instructions. Copy the lines under "push an existing repository from the command line" and run them in your terminal.
- In Netlify, import the repo, set build command to `npm run build` and publish directory to `dist`.
- Click Publish. Click the URL. You are on the internet.
- Change something in your code, commit, push, and watch Netlify auto-deploy the update.
::::

:::resources{title="Go Deeper"}
- [Netlify Docs: Deploy Overview](https://docs.netlify.com/deploy/deploy-overview/): Everything about how Netlify builds and deploys your site.
- [Netlify Docs: Custom Domains](https://docs.netlify.com/domains-https/custom-domains/): Step-by-step guide for connecting your own domain.
- [Vite: Deploying a Static Site](https://vite.dev/guide/static-deploy): Platform-specific deployment instructions for Vite projects.
:::
