export default {
  slug: 'deploy',
  title: 'Deployment',
  subtitle: 'From localhost to the world.',
  duration: '15 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Deployment, Revisited',
        body: [
          'You learned about deployment in Level 00 — what it means, static vs. dynamic, hosting platforms. This lesson is the hands-on version. You are going to take a real project and get it live.',
          'The difference between "knowing about deployment" and "having deployed" is enormous. Once you have done it once, the mystery disappears. It becomes a routine step: push code, site updates. But that first time matters.',
        ],
      },
      {
        type: 'callout',
        body: 'Your first deploy does not need to be impressive. It needs to be live. A single page on the internet is worth more than a perfect design on your laptop.',
      },
      {
        type: 'text',
        heading: 'The Deploy Checklist',
        body: [
          'Before deploying, verify these things:',
          'Your project builds: Run npm run build and make sure it completes without errors. If the build fails, you cannot deploy. Read the error, fix it, try again.',
          'Your project works locally: Run npm run dev, open it in the browser, and click through everything. If it is broken locally, it will be broken in production.',
          'Your code is committed and pushed: The hosting platform deploys from your GitHub repository. If your latest changes are not pushed, the deployed version will be behind.',
          'No secrets in the code: Check that .env is in your .gitignore. API keys, passwords, and tokens should never be committed. If they are, rotate them immediately.',
        ],
      },
      {
        type: 'code',
        body: '# The deploy checklist in terminal commands:\n\n# 1. Build successfully?\nnpm run build\n\n# 2. Works locally?\nnpm run dev\n# → Open http://localhost:5173 and click around\n\n# 3. Code is committed and pushed?\ngit status          # Nothing unexpected\ngit add .\ngit commit -m "Ready to deploy"\ngit push origin main\n\n# 4. No secrets exposed?\ncat .gitignore      # .env should be listed\ngit log --all --full-history -- .env   # Should show nothing',
      },
      {
        type: 'text',
        heading: 'Netlify: Step by Step',
        body: [
          'We use Netlify for Zero Vector and it is the simplest path for your first deploy.',
          'Go to netlify.com and sign up with your GitHub account. Click "Add new site" and select "Import an existing project." Choose GitHub as the source and select your repository.',
          'Netlify asks for two settings. Build command: npm run build. Publish directory: dist (for Vite projects — check your build tool if you use something else). Leave everything else as default.',
          'Click "Deploy site." Netlify clones your repo, runs the build, and publishes the output. In about 60-90 seconds, you have a URL. Click it. Your project is on the internet.',
          'From now on, every push to your main branch triggers an automatic rebuild and redeploy. You do not need to visit Netlify again unless you are changing settings.',
        ],
      },
      {
        type: 'text',
        heading: 'Environment Variables',
        body: [
          'If your project uses environment variables (API keys, configuration), you need to add them to your hosting platform. Locally they live in .env. In production they live in the platform dashboard.',
          'On Netlify: Site settings → Environment variables → Add a variable. Set the same key and value as your .env file. The next deploy will pick them up.',
          'Remember: .env files are not deployed. They are local only. The hosting platform provides its own environment. This separation is a security feature — your secrets never touch your Git repository.',
        ],
      },
      {
        type: 'text',
        heading: 'Custom Domains',
        body: [
          'Your site is live at something-random.netlify.app. To use your own domain:',
          'In Netlify: Site settings → Domain management → Add custom domain. Type your domain (e.g., myproject.com).',
          'At your domain registrar (Namecheap, Cloudflare, etc.): Add a CNAME record pointing your domain to your Netlify URL. Or use Netlify DNS and point your domain\'s nameservers to Netlify directly.',
          'Wait for DNS propagation (usually 5-30 minutes). Netlify automatically provisions an SSL certificate. Your site is now live on your custom domain with HTTPS.',
          'The DNS lesson in Level 00 covered the theory. This is the practice.',
        ],
      },
      {
        type: 'text',
        heading: 'When the Deploy Fails',
        body: [
          'Deploys fail. It is normal. The build log tells you exactly what happened.',
          'In Netlify, go to Deploys → click the failed deploy → scroll through the log. The error is usually near the bottom. Common causes:',
          'Node version mismatch — your local Node is different from Netlify\'s default. Fix: add a .node-version or .nvmrc file specifying your version.',
          'Missing dependency — you installed a package locally but it did not make it into package.json. Fix: npm install the-package --save and push.',
          'Build error — something in your code that works in dev but fails in production (often a missing environment variable). Fix: check your env vars in the Netlify dashboard.',
          'Read the error. Fix the cause. Push again. Netlify rebuilds automatically.',
        ],
      },
      {
        type: 'exercise',
        title: 'Deploy Your Project',
        body: 'Take the project you have been building (or create a fresh one with npm create vite@latest my-site -- --template react). Make sure it builds: npm run build. Create a GitHub repo and push your code. Sign up for Netlify, import the repo, set build command to "npm run build" and publish directory to "dist." Deploy. Click the URL. You are on the internet. Change something in your code, commit, push, and watch Netlify auto-deploy the update.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Netlify Docs — Site Deploys', url: 'https://docs.netlify.com/site-deploys/overview/', note: 'Everything about how Netlify builds and deploys your site.' },
          { title: 'Netlify Docs — Custom Domains', url: 'https://docs.netlify.com/domains-https/custom-domains/', note: 'Step-by-step guide for connecting your own domain.' },
          { title: 'Vite — Deploying a Static Site', url: 'https://vite.dev/guide/static-deploy', note: 'Platform-specific deployment instructions for Vite projects.' },
        ],
      },
    ],
  },
};
