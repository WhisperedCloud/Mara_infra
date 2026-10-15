# Mara Infra Constructions — Website Architecture

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
├── _headers              # Security headers (Netlify / Cloudflare Pages)
├── robots.txt            # Allows crawling and points to the sitemap
├── sitemap.xml           # The five indexable pages
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
- If the domain changes, update the canonical/`og:url`/`og:image` tags in each page head, the JSON-LD in `index.html`, `sitemap.xml` and `robots.txt` together.

---

## 🔒 Security
- `_headers` sets a Content Security Policy, clickjacking protection (`frame-ancestors 'none'`, `X-Frame-Options`), `nosniff`, a referrer policy, a permissions policy and HSTS. On a host that ignores `_headers`, set the same headers in its config.
- If you add a new third-party script, font, embed or form endpoint, add its domain to the matching directive in the CSP or the browser will block it.
- Font Awesome loads with a Subresource Integrity hash. If you change its version, replace the `integrity` value on every page (cdnjs lists the hash next to each file).
- The Web3Forms `access_key` in the forms is public by design: it can only send mail to the address registered with Web3Forms. Every form has a hidden `botcheck` honeypot. For extra spam protection, enable domain restriction and hCaptcha in the Web3Forms dashboard.

---

## 📱 Browser & Device Support
Tested and responsive across all standard viewports:
- Mobile: 375px, 390px, 430px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px
- Full support for `prefers-reduced-motion`.
