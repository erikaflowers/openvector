---
slug: dns
title: DNS
subtitle: How the internet finds your site.
duration: 15 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: DNS translates domain names into IP addresses. Why do we need this translation layer? Why not just use IP addresses directly?
    hint: Think about what would happen if a server moved to a different IP address, and how many addresses you would need to memorize.
  - question: When you type a URL into your browser, what happens behind the scenes before the page starts loading? Walk through the DNS lookup process.
  - question: Why do DNS changes take time to propagate across the internet, and what should you do (and not do) while waiting?
    hint: Think about caching. DNS servers around the world remember old answers for a while.
  - question: What is the difference between an A record and a CNAME record, and why do hosting platforms like Netlify prefer CNAME records?
---

## The Phone Book of the Internet

When you type `zerovector.design` into your browser, your computer has no idea where that is. It does not know which server, which country, which rack in which data center. So it asks.

It asks the Domain Name System: "What is the IP address for `zerovector.design`?" DNS answers: `104.21.45.67`. Your browser connects to that number and loads the site. Every website visit starts with this invisible lookup.

DNS translates human-readable names into machine-readable addresses. We remember words. Computers need numbers. DNS is the translator between us.

> DNS is invisible infrastructure. You will configure it once per project and then never think about it again. But understanding it means you will never be stuck wondering why your site is not loading after a domain change.

## Domain Names

A domain name has parts, and each part means something. Take `www.zerovector.design`:

`.design` is the TLD, the top-level domain. Classic ones are `.com`, `.org`, `.net`. Newer ones like `.design`, `.dev`, `.io`, and `.app` exist for more specific identities.

`zerovector` is the second-level domain, the name you buy. This is the part that is yours.

`www` is a subdomain, an optional prefix. You can create any subdomain you want: `blog.zerovector.design`, `docs.zerovector.design`, `staging.zerovector.design`. Each one can point to a different server.

You buy domains from registrars. **Namecheap**, **Cloudflare**, and **Porkbun** are popular for individual developers. Prices range from $8 to $15 per year for common TLDs. Once you own a domain, you control where it points.

## DNS Records

You do not need to memorize every type of DNS record. You need to recognize three:

`A` record points a domain directly to an IP address. "`zerovector.design` should go to `104.21.45.67`." This is the most fundamental record.

`CNAME` record points a domain to another domain name. "`www.zerovector.design` should go wherever `zerovector.design` goes." Like a forwarding address. Hosting platforms love these because they let you point your domain to their servers without knowing the IP address.

`TXT` record is plain text attached to your domain. Used for verification. When Netlify says "add this `TXT` record to prove you own this domain," you paste their string into a `TXT` record. It is a handshake.

That is it for now. There are other record types (`MX` for email, `AAAA` for IPv6), but these three handle 95% of what you will do as a developer deploying web projects.

```
# Common DNS records you will configure:

# A record — domain to IP address
zerovector.design    A    104.21.45.67

# CNAME — domain to another domain
www                  CNAME  zerovector.design

# TXT — verification string
zerovector.design    TXT    "netlify-verify=abc123def456"
```

## How It Connects to Deployment

Here is where the previous lesson and this one meet:

You deployed your site (Deployment lesson). Netlify gave you a URL like `my-project.netlify.app`. It works. People can visit it. But you want your own domain, `my-project.com`, pointing there instead.

The process:

- Buy a domain from a registrar (**Namecheap**, **Cloudflare**, **Porkbun**).
- In Netlify: Site settings → Domain management → Add custom domain.
- Netlify tells you what DNS records to set.
- Go to your registrar's DNS settings and add a `CNAME` record pointing your domain to `my-project.netlify.app`.
- Wait for propagation (covered in the next section of this lesson).
- Netlify automatically provisions an SSL certificate. Your site is live on your own domain, with HTTPS, for free.

That is the whole process. Two configuration changes (one at your registrar, one at your hosting platform) and your custom domain serves your deployed site.

## Propagation

DNS changes are not instant. When you update a DNS record, that change needs to spread to DNS servers all around the world. This process is called propagation, and it takes anywhere from a few minutes to 48 hours (though usually under an hour).

During propagation, some people will see the old address and some will see the new one, depending on which DNS server their ISP uses and how long it caches old records.

If you just changed your DNS and your site is not loading, the first thing to do is wait. Check again in 15 minutes. Then 30. If it has been over an hour and nothing has changed, double-check your records. The most common mistake is a typo in the `CNAME` target or setting an `A` record when you needed a `CNAME`.

## Checking DNS

You can look up DNS records from your terminal, which is useful for debugging:

On Mac or Linux, use `dig`: `dig zerovector.design`. The ANSWER section shows the IP address (`A` record) for that domain.

On Windows, use `nslookup`: `nslookup zerovector.design`. Same information, different format.

You can also check specific record types: `dig zerovector.design CNAME` or `dig zerovector.design TXT`.

There are also web-based tools like [dnschecker.org](https://dnschecker.org) that show you what DNS servers around the world are reporting for your domain. This is useful during propagation to see how far your change has spread.

```
# Look up the A record for a domain
dig zerovector.design

# Look up a specific record type
dig zerovector.design CNAME
dig zerovector.design TXT

# Windows equivalent
nslookup zerovector.design

# Short answer only (useful for scripts)
dig +short zerovector.design
```

:::exercise{title="Look Up a Domain"}
Open your terminal.

- Run `dig google.com` (Mac/Linux) or `nslookup google.com` (Windows)
- Look at the ANSWER section; you will see one or more IP addresses. That is where Google lives on the internet
- Try `dig zerovector.design`
- Try `dig github.com`
- Try your own domain if you have one

Every domain you visit every day resolves to a number through this exact process. You just watched it happen.
:::

:::resources{title="Go Deeper"}
- [How DNS Works (visual explainer)](https://howdns.works/). A charming, illustrated comic that walks through a DNS lookup step by step. Best explanation on the internet.
- [Cloudflare: What Is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/). Cloudflare's learning center has thorough, well-written articles on every DNS concept.
- [Julia Evans: DNS Zines](https://wizardzines.com/zines/dns/). Illustrated zines that make DNS click. Julia Evans has a gift for making infrastructure approachable.
- [DNS Checker](https://dnschecker.org/). Check DNS propagation worldwide. Essential tool when you are waiting for a domain change to take effect.
:::
