# dudeandco.in — SEO Action Plan

Audit date: 18-Nov-2026 · Overall SEO Health Score: **69 / 100** · Detailed evidence: `findings/*.md`

Owner key: **Code** = can be done in this repo now · **Owner** = needs facts/photos from the business · **Kiran** = needs CEO approval (pricing, external submissions) · **Off-site** = done outside the website

> No ranking position can be promised. These actions improve the expected likelihood of ranking and being cited; results depend on Google and competitors.

## Phase 1 — Critical (this week)

| # | Action | Owner | Where |
|---|---|---|---|
| 1 | Remove the Foxconn "Project Elephant" hero photos + caption (third-party photos from an X post, not cleared for reuse; reads as a false project claim). Replace with our own site/delivery photos. | Owner → Code | `content/images.ts` (`heroSlides`) |
| 2 | Create/claim **Google Business Profile** (category, Karnataka service area, own photos, hours). This is the #1 lever for "near me" / Bengaluru searches. | Off-site | — |
| 3 | List on **IndiaMART, JustDial, Sulekha, TradeIndia, LinkedIn** with the identical name/address/phone as `content/site.ts`; link each to the matching `/materials/<slug>` page. | Off-site | — |
| 4 | Fix homepage H1 "Needto" (missing space between spans) and make it keyword-led (e.g. "Construction Materials Supplier in Bengaluru"). | Code | `components/sections/HomeHero.tsx` L71–82 |

## Phase 2 — High impact (weeks 2–3)

| # | Action | Owner | Where |
|---|---|---|---|
| 5 | Replace Unsplash/Wikimedia/Flickr stock images with own photos (also fixes the stock-photo rule). Cement hero shows Vietnamese "VICEM" bags. | Owner → Code | `content/images.ts`, `app/layout.tsx` (Unsplash preconnect) |
| 6 | Mobile LCP 4.1s: stop the decorative logo-mark being the LCP element; add `fetchpriority=high` to hero/material LCP image; check reveal animation isn't delaying first paint. | Code | `HomeHero.tsx`, `MaterialDetail.tsx`, `ImageWithCredit.tsx`, `app/globals.css` L308 |
| 7 | Cut mobile JS (TBT 360–870ms): lazy-load assistant widget, analytics, reveal observer. | Code | `app/layout.tsx` |
| 8 | Keyword H1s for /construction ("Building Contractor in Bengaluru…") and /about; remove /about duplicate H1→H2. | Code | `content/construction.ts`, `content/about.ts` |
| 9 | Add one natural "Bangalore" spelling per page (currently 0 mentions). | Code | `content/*.ts` |
| 10 | Make each material page unique: material-specific FAQs (3–4 each), units of sale, delivery checks, quantity guidance — values **to confirm**. Stop repeating all 5 shared FAQs. | Owner + Code | `content/material-pages.ts`, `content/faq.ts`, `app/materials/[slug]/page.tsx` |
| 11 | Fill confirmed brand list (cement/steel brands actually supplied). | Owner | `content/brands.ts` |
| 12 | Add security headers (CSP report-only first, X-Content-Type-Options, Referrer-Policy, frame-ancestors, Permissions-Policy). | Code | `next.config.ts` `headers()` |
| 13 | Ask real customers for Google reviews (GBP review link). No fabricated testimonials. | Off-site | — |

## Phase 3 — Content & authority (month 2)

| # | Action | Owner | Where |
|---|---|---|---|
| 14 | **Price-intent page** ("what affects cement/TMT/M-sand price" + "today's rate on WhatsApp"). Any price figure or pricing language needs **Kiran's approval**. | Kiran → Code | new `app/prices/` or material pages |
| 15 | Publish real projects (photos, location, scope) and turn on `flags.projects`; add founder, founding year, team to About. | Owner → Code | `content/projects.ts`, `content/flags.ts`, `content/about.ts` |
| 16 | Schema: add `sameAs` (GBP + socials), `geo`, `hasMap`, `openingHoursSpecification`, City "Bengaluru" in `areaServed`; `addressLocality` → "Bengaluru"; AboutPage/ContactPage nodes. Real values only. | Owner → Code | `content/site.ts`, `lib/seo.ts`, `app/about`, `app/contact` |
| 17 | Map embed / directions link on /contact + footer (after GBP exists). | Code | `app/contact/page.tsx` |
| 18 | `public/llms.txt` (draft from site facts in `findings/geo.md`) + a 130–170-word "who we are" passage. | Code | `public/llms.txt`, `content/about.ts` |
| 19 | Question-style H2s with 40–60-word direct answers on material pages (AI citability). | Code | `content/material-pages.ts`, `content/materials-guide.ts` |
| 20 | Material calculators (cement bags, steel, AAC blocks). | Code | new component in `MaterialDetail` |
| 21 | Construction page for contractors: labour-only / sub-contract scope, cost structure (figures to confirm, Kiran approval). | Owner + Kiran | `app/construction/page.tsx`, `content/construction.ts` |

## Phase 4 — Monitoring (ongoing)

- Daily drift check against 18-Nov-2026 baseline (13 pages captured).
- Connect **Google Search Console** + a free **PageSpeed API key** → real rankings, clicks, indexing and field Core Web Vitals.
- Verify the site in **Bing Webmaster Tools** (feeds ChatGPT / Copilot); IndexNow only after Kiran approves external submissions.
- Update `lastmod` in `app/sitemap.ts` whenever page copy changes.
- Low items: homepage canonical trailing slash (`lib/seo.ts`), 404 canonical (`app/not-found.tsx`), `/projects` (noindex) in nav (`content/nav.ts`), alt text on 5 images/page, unoptimised assistant avatar, AI-crawler policy decision (Kiran).
