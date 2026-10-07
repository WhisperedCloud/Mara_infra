# Mara Infra Solutions — Website Architecture

## Overview
A high-performance, modular **Construction Products + Solutions + Product Catalogue + Enquiry Website** built from scratch for **Mara Infra Solutions** (Authorised Distributor of Saint-Gobain Weber).

---

## 🛠️ Technology Stack Compliance
- **Core:** HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Zero Framework Overhead:** No React, No Next.js, No Vue, No Angular, No Bootstrap, No Tailwind CSS, No jQuery.
- **Strict Pricing Policy:** Absolutely ZERO rates, costs, or pricing symbols (`₹`, `INR`). Uses **Get a Quote** and **Enquire Now** CTAs exclusively.

---

## 📁 Project Architecture

```text
Mara/
├── index.html            # Homepage (Hero, Trust bar, Categories, Solutions, About, CTA)
├── products.html         # Live filterable Product Catalogue & Search
├── product-detail.html   # Dynamic product detail page (renders from URL query ?id=...)
├── solutions.html        # Requirement-to-solution discovery mapping
├── about.html            # Company background, positioning, & Weber partnership
├── resources.html        # Technical Data Sheets & product documentation downloads
├── contact.html          # Showrooms in Hosur & Krishnagiri, Clickable tel & email
├── 404.html              # Custom page not found page
│
├── css/
│   ├── style.css         # CSS Variables / Custom Properties, Reset & Typography
│   ├── components.css    # Reusable Buttons, Header, Cards, Modals, Tables, Forms
│   └── responsive.css    # Breakpoint queries (375px, 390px, 430px, 768px, 1024px, 1280px, 1920px)
│
├── js/
│   ├── main.js           # Central application coordinator
│   ├── navigation.js     # Sticky header, mobile drawer toggle, active link tracking
│   ├── products.js       # Reusable HTML component renderers (Product Card, Category Card)
│   ├── filters.js        # Category filtering, product counter, empty state handler
│   ├── search.js         # Debounced live keyword search handler
│   ├── product-detail.js # Dynamic product page & specification table renderer
│   ├── enquiry.js        # Modal lifecycle, pre-filling selected products, inline validation
│   └── animations.js     # Lightweight IntersectionObserver scroll reveal animations
│
├── data/
│   └── products.js       # Authentic product dataset & application taxonomy
│
└── README.md
```

---

## 🚀 Future Backend / Framework Migration Readiness
The JavaScript architecture decouples data rendering from UI markup:
- Product data in `data/products.js` can be seamlessly replaced with a `fetch('/api/products')` REST API call.
- The `enquiry.js` module contains pre-configured submission hooks ready to POST data to a backend endpoint.
- URL query parameters (`product-detail.html?id=weber-primer-401`) can be mapped directly to server-side routes like `/products/:id`.

---

## 📱 Browser & Device Support
Tested and responsive across all standard viewports:
- Mobile: 375px, 390px, 430px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px
- Full support for `prefers-reduced-motion`.
