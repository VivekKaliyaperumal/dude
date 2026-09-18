# dude & Co. — website

Production website for **dude & Co.**, construction-material supplier and civil-construction firm in Bengaluru, serving Karnataka. Built from the Claude Design prototype in `design/` with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Deploys on Vercel.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint .
pnpm build && pnpm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying.

## Where things live

| Folder | Purpose |
|---|---|
| `content/` | **All copy and facts.** `site.ts` is the single source of truth for name, phone, WhatsApp, address, GSTIN. Every list on the site (materials, process steps, FAQ, districts…) is a typed module here. Edit text here, not in components. |
| `content/flags.ts` | Switches for sections whose content the business has not supplied yet (see below). |
| `content/images.ts` | Every photograph, keyed by use. Currently Unsplash stock with credits; swap `src` for `/photos/…` when real site photos exist. |
| `components/ui/` | Primitives: Button, Chip, Eyebrow, SectionHeading, HairlineGrid, NumberedRows, ProcessSteps, Faq, Reveal, ParallaxLayer, ImageWithCredit… |
| `components/chrome/` | Header, mobile menu, footer, WhatsApp button, mobile sticky bar, page hero, CTA band. |
| `components/sections/` | Page sections composed from primitives and content. |
| `components/forms/` | Quote, estimate and contact forms. |
| `app/actions/submit-enquiry.ts` | The one server action behind all three forms. |
| `lib/enquiry/` | Validation schema, rate limit, and `transport.ts` — the only file to change to send enquiries somewhere real. |
| `design/` | The prototype pages (`*.dc.html`) kept as the copy reference. Not served. |

## Content flags

Nothing invented ships. Sections that need real content stay off until it exists:

| Flag | Default | Turn on when |
|---|---|---|
| `brandOptions` | off | dude & Co. confirms which brands it supplies; fill `content/brands.ts` |
| `projects` | off | real projects with own photos replace the six placeholders in `content/projects.ts` |
| `testimonials` | off | genuine, attributed client feedback is added to `content/testimonials.ts` |
| `legalBodies` | off | approved Privacy / Terms wording is added to `content/legal.ts` (pages are `noindex` until then) |
| `emailPublic` | off | the inbox is confirmed live (the design marked `hello@dudeandco.in` as temporary) |
| `estimator` | on | — |

Flip a flag in `content/flags.ts`, or per deployment with `NEXT_PUBLIC_FLAG_<NAME>=1`.

## Enquiry forms

Quote, material estimate and contact forms all call `submitEnquiry`. It rejects honeypot and too-fast submissions, rate-limits per connection (5 per 10 minutes, in-memory), validates with zod (Indian mobile numbers are normalised to `+91XXXXXXXXXX`), then calls `deliverEnquiry()` in `lib/enquiry/transport.ts`.

**Today the transport logs each enquiry to the server console** (visible in `pnpm dev` output or Vercel function logs). To deliver enquiries for real, implement a case in `transport.ts` (email via Resend, a Google Sheet webhook, WhatsApp Cloud API…) and set `ENQUIRY_TRANSPORT`. Nothing else changes.

## Photography

**Own photos** live as originals in `photos/` (never served). `pnpm photos` renders each one to WebP at several widths in `public/photos/` and writes `lib/images/photos.manifest.json`; the custom loader in `lib/images/loader.ts` picks the rendition nearest the requested width and appends a content hash so renditions cache for a year. To add a photo: drop the original in `photos/<area>/`, run `pnpm photos`, commit the outputs, and reference it as `/photos/<area>/<name>` in `content/images.ts`. Photos are never upscaled, so supply the largest original available (a full-bleed hero wants 1920 px or wider).

**Home hero** is a crossfading slideshow (`components/sections/HeroSlideshow.tsx`) of four photos of Foxconn's Project Elephant campus, Bengaluru, from the 18-Apr-2025 post by Karnataka Development Index (@IndexKarnataka). The page shows only the caption "Project Elephant, Foxconn — Bengaluru"; the photographer credit was removed at the owner's request on 18-Sep-2026. X serves them at about 1270 px wide, which is the largest rendition available. **Permission from the poster to reuse them is to confirm before launch**, as is the wording of any claim about dude & Co.'s role on that project (none is made today). Only the first slide is preloaded (LCP); the rest load after it. The slideshow pauses off-screen, in hidden tabs and under reduced motion, and has a pause/play control.

**Everything else** is still Unsplash stock as a stop-gap. `ImageWithCredit` renders the photographer credit Unsplash requires, and the loader serves sized variants straight from Unsplash's CDN. Replace them the same way before launch.

## Deploy (Vercel)

Import the repo, set `NEXT_PUBLIC_SITE_URL` (and any flags), deploy. `vercel.json` pins functions to Mumbai (`bom1`). Static pages, `sitemap.xml`, `robots.txt`, favicon and the Open Graph card are generated at build time.

## Open items for the owner

See the plan file and `content/flags.ts` comments: confirm the email inbox, brand list, real projects, legal wording, GST legal name, domain, and replace stock photography.
