---
date: "2026-09-30"
title: "Correct the custom-domain record step: bare domains can't use CNAME on Netlify"
kind: update
lessons: ["00-orientation/dns"]
sources: ["https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/", "https://docs.netlify.com/domains-https/custom-domains/"]
---

The DNS lesson now explains that a bare domain like my-project.com can't use a CNAME record on Netlify. Use an A record pointing to 75.2.60.5, or an ALIAS/ANAME record if your registrar offers one. Keep the CNAME for www and other subdomains.
