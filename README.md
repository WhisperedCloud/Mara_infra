# Mara Infra Constructions: Website Architecture

## Overview
A fast, framework-free marketing website for **Mara Infra Constructions**: residential, commercial, renovation and sustainable construction, with enquiry forms.

---

## 🛠️ Technology Stack Compliance
- **Core:** HTML5, CSS3, Vanilla JavaScript (single `js/app.js`, no build step)
- **Zero Framework Overhead:** No React, No Next.js, No Vue, No Angular, No Bootstrap, No Tailwind CSS, No jQuery.
- **Strict Pricing Policy:** Absolutely ZERO rates, costs, or pricing symbols (`₹`, `INR`). Uses **Get a Quote** and **Enquire Now** CTAs exclusively.

---

## 📁 Project Architecture

```text
Mara_infra/
├── index.html            # Homepage (hero, services, about, why choose us, contact)
├── construction.html     # Construction services in detail
├── about.html            # Company background and founders
├── careers.html          # Careers
├── contact.html          # Contact details, location and enquiry form
├── 404.html              # Page not found
│
├── css/
│   ├── style.css         # Design tokens, reset and typography
│   ├── icons.css         # The icons in use, built by tools/build-icons.py
│   ├── components.css    # Buttons, header, cards, modals, forms, footer and page sections
│   └── responsive.css    # Breakpoint overrides
│
├── js/
│   └── app.js            # Navigation, scroll reveals, enquiry modal and homepage interactions
│
├── assets/
│   ├── images/           # Project photos and logos
│   └── videos/           # "Why choose us" video in three sizes, posters and a standalone player page
│
├── tools/
│   └── build-icons.py    # Rebuilds css/icons.css after adding or removing an icon
│
├── _headers              # Security headers (Netlify / Cloudflare Pages)
├── vercel.json           # The same headers for Vercel
├── gallery.html          # Project photo gallery with filters and a full-size viewer
├── llms.txt              # Plain-text summary of the company for AI search tools
├── robots.txt            # Allows crawling and points to the sitemap
├── sitemap.xml           # Every indexable page, plus the gallery photos
└── README.md
```

---

## ✉️ Enquiry Forms
Forms post to Web3Forms (`https://api.web3forms.com/submit`); `js/app.js` submits them in the background and shows a confirmation in place of the form.

---

## 🌐 Deployment & SEO
The site is built to live at the root of **https://marainfra.co.in** (canonical URLs, `sitemap.xml`, `robots.txt`, share previews and the 404 page's `<base href="/">` all assume this).
- Host the folder as-is on any static host (Netlify, Vercel, Cloudflare Pages or GitHub Pages) and point the `marainfra.co.in` DNS at it. Configure the host to serve `404.html` for missing pages.
- After launch, add the domain to Google Search Console and submit `https://marainfra.co.in/sitemap.xml`.
- Keep the business name, address, phone numbers and hours identical on the site, Google Business Profile and Instagram. The homepage carries matching `GeneralContractor` structured data.
- Photos are served as WebP in two sizes (800px and full size, named `name-800.webp` / `name-1600.webp`). Add new photos the same way so pages stay fast.
- The homepage FAQ answers are repeated in the JSON-LD `FAQPage` block in `index.html`; edit both together.
- If the domain changes, update the canonical/`og:url`/`og:image` tags in each page head, the JSON-LD in `index.html`, `sitemap.xml` and `robots.txt` together.

### Visitor tracking (Umami)
The site is ready to count visits and the actions that matter, but sends nothing until the Umami script is added. To switch it on:
1. Create a free account at https://cloud.umami.is, add the website `marainfra.co.in`, and copy its Website ID.
2. Paste this line just before `</head>` on all seven pages, with your ID:
   `<script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR-WEBSITE-ID" data-domains="marainfra.co.in"></script>`
   (`data-domains` stops local testing from being counted.)

`js/app.js` then reports these events, each with a `place` (header, footer, floating button, or the section id): **Call click**, **WhatsApp click**, **Email click**, **Directions click**, **Instagram click**, **Job application click**, **Quote form opened** and **Enquiry sent** (quote pop-up, homepage or contact page). The CSP in `_headers` already allows Umami. Umami uses no cookies, so no cookie banner is needed.

---

## 🔒 Security
- `_headers` (Netlify / Cloudflare Pages) and `vercel.json` (Vercel) set the same headers; change both together. They set a Content Security Policy, clickjacking protection (`frame-ancestors 'none'`, `X-Frame-Options`), `nosniff`, a referrer policy, a permissions policy and HSTS. On a host that ignores `_headers`, set the same headers in its config.
- If you add a new third-party script, font, embed or form endpoint, add its domain to the matching directive in the CSP or the browser will block it.
- Icons are self-hosted, so no third-party stylesheet or font loads on any page. `css/icons.css` holds only the Font Awesome Free 6.4.0 icons the site uses, with their two small fonts embedded (about 11 KB instead of about 150 KB), so icons also show when a page is opened straight from disk.
- To add or remove an icon, use it on the page (`<i class="fa-solid fa-NAME" aria-hidden="true"></i>`, or `fa-brands` for logos), then run `python3 tools/build-icons.py` from the site folder (one-time setup: `pip3 install fonttools brotli`). It rebuilds `css/icons.css` with exactly the icons in use. The regular (outline) style isn't included.
- The Web3Forms `access_key` in the forms is public by design: it can only send mail to the address registered with Web3Forms. Every form has a hidden `botcheck` honeypot. For extra spam protection, enable domain restriction and hCaptcha in the Web3Forms dashboard.

---

## 📱 Browser & Device Support
Tested and responsive across all standard viewports:
- Mobile: 375px, 390px, 430px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px
- Full support for `prefers-reduced-motion`.
