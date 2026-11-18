# Content Quality + On-Page SEO: dudeandco.in

Audit date: 18-Nov-2026. Scope: 13 URLs in `raw/urls.txt`, fetched live with curl (all HTTP 200, server-rendered HTML, no SPA shell). Source mapped to the local repo `c:/Users/Hp/Documents/GitHub/dude`.

**Executive summary**
- Content Quality: **54/100**. On-Page SEO: **72/100**. AI citation readiness: **58/100**.
- Copy is careful, technically sound and honest (no invented prices, no fake testimonials, GSTIN shown). What it lacks is *proof of experience*: no real projects, no own photos, no founder/years, and the hero shows a Foxconn site the business is not shown to have worked on.
- The 8 material pages are ~80-85% shared template; only ~95-177 unique words each. Titles/descriptions are good; H1s, H2 reuse and "Bangalore"/price-intent coverage need work.

---

## 1. Method

| Check | Tool / method |
|---|---|
| Titles, meta, canonical, headings, links, images | Python HTMLParser over raw HTML (script/style stripped) |
| Near-duplicate | 5-word shingle Jaccard, after removing shingles present on all 13 pages (site chrome) |
| Readability | Flesch Reading Ease / FK grade on full visible text (includes nav/footer, so home/about read lower than the real body) |
| Templated metadata | `metadata_template.py --pairs-file` (13 pairs) |

## 2. Page inventory

| URL | Words | Title (chars) | Desc (chars) | H1 | FRE |
|---|---|---|---|---|---|
| / | 945 | Construction Material Supplier in Bengaluru \| dude & Co. (56) | 152 | Everything You Need / to Build Better. | 30 |
| /materials | 1,750 | Building Materials Supplier in Bengaluru \| dude & Co. (53) | 151 | Materials, From Foundation to Finishing. | 48 |
| /materials/cement | 862 | Cement Supplier in Bengaluru — OPC 43, 53, PPC (59) | 151 | Cement Supplier in Bengaluru. | 58 |
| /materials/tmt-steel | 857 | TMT Steel Bars Supplier in Bengaluru — Fe 500D (59) | 153 | TMT Steel Supplier in Bengaluru. | 56 |
| /materials/m-sand | 790 | M-Sand Supplier in Bengaluru, Karnataka (52) | 159 | M-Sand Supplier in Bengaluru. | 58 |
| /materials/aggregates | 788 | Jelly & Aggregates Supplier in Bengaluru (53) | 157 | Aggregates (Jelly) Supplier in Bengaluru. | 57 |
| /materials/red-bricks | 771 | Red Bricks Supplier in Bengaluru — Wire-cut (56) | 155 | Red Bricks Supplier in Bengaluru. | 61 |
| /materials/concrete-blocks | 768 | Solid & Hollow Concrete Blocks in Bengaluru (56) | 158 | Concrete Blocks Supplier in Bengaluru. | 60 |
| /materials/aac-blocks | 803 | AAC Blocks Supplier in Bengaluru (45) | 158 | AAC Blocks Supplier in Bengaluru. | 60 |
| /materials/ready-mix-concrete | 836 | Ready Mix Concrete (RMC) Supplier in Bengaluru (59) | 159 | Ready Mix Concrete (RMC) in Bengaluru. | 57 |
| /construction | 1,074 | Civil Construction Contractor in Bengaluru (55) | 156 | Complete Construction Support. | 43 |
| /about | 686 | About Us — Materials & Construction, Bengaluru (59) | 151 | More Than a Material Supplier. | 35 |
| /contact | 436 | Get a Free Construction Material Quote (51) | 152 | Tell Us What Your Project Needs. | 52 |

Word counts are full visible text including ~250-300 words of shared nav/footer/CTA. All pages: self-referencing canonical, single H1, no robots restriction.

## 3. E-E-A-T

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 30 | No real projects live (`content/projects.ts` is fictional placeholders, `flags.projects` off; `/projects` is `noindex` yet linked in nav/footer). No testimonials (correctly off). No founder, founding year, delivery volume. Imagery is Unsplash / Wikimedia / Flickr / rawpixel (`content/images.ts`). Hero is Foxconn "Project Elephant" from an X post with caption rendered on page, implying an association not evidenced anywhere. |
| Expertise | 25% | 65 | Material copy is technically correct and practical (OPC 43/53/PPC/PSC use, Fe 500 vs 500D, IS 383 grading, BBS, ISI mark + mill test certificate, M20-M30 RMC). /construction names Ar. Vinuta Yogesh (B.Arch, 15+ yrs, COA reg. CA/98/23049) and Harshitha U. No named author/reviewer on material guidance (file comment says engineer review is pending). |
| Authoritativeness | 25% | 25 | No social profiles (`socialProfiles` hrefs empty → no `sameAs`), no Google Business Profile link, no reviews, no brand/dealer authorisations, no memberships/certifications. |
| Trustworthiness | 30% | 70 | GSTIN 29AAYFD3535F1Z1 in footer on every page, full street address, phone + WhatsApp, honest "no published prices" FAQ, delivery-charge caveats, privacy/terms pages. Undermined by the Foxconn hero and stock imagery; email hidden; legal bodies flagged off. |
| **Weighted** | | **49.5** | |

## 4. Findings (Content)

### C1. Hero implies a Foxconn project relationship. Severity: CRITICAL
- Evidence: homepage text `Project Elephant, Foxconn — Bengaluru` caption on hero slides; `content/images.ts` lines ~34-64 note source is an X post by @IndexKarnataka, reuse permission "still to confirm". Nothing on site says dude & Co. supplied that project.
- Risk: misleading experience signal (QRG trust), copyright, and breaches the "own photos only" rule.
- Fix: `content/images.ts` `heroSlides` → replace with dude & Co.'s own site/yard/delivery photos. If no own photo exists yet, use a plain brand-colour hero rather than a third-party project. Remove `foxconnCaption`.

### C2. No first-hand experience evidence anywhere indexable. Severity: HIGH
- Evidence: projects flagged off; testimonials empty; About has no founder, start year, team or yard photos; team appears only on /construction.
- Fix (all values "to confirm" by owner, nothing invented):
  - `content/projects.ts`: replace the 6 fictional entries with real ones (locality, stage, materials supplied, month-year, own photos), then enable `flags.projects` (`content/flags.ts`) and drop `noindex` on `app/projects/page.tsx`.
  - `content/about.ts`: add founder/partner names and roles, year started (to confirm), yard/warehouse location, photo of team. Reuse the /construction team block on About.
  - Collect real client feedback with written consent before ever enabling `flags.testimonials`. Do not draft quotes for customers.

### C3. Material pages are near-template duplicates. Severity: HIGH
- Evidence: after removing site chrome, pairwise Jaccard 0.37-0.67 (avg 0.44). Unique words per page only 95 (concrete-blocks) to 177 (tmt-steel). Red-bricks / concrete-blocks / AAC share the same guide cell ("Bricks, blocks and AAC") and storage tip (Jaccard 0.61-0.67). Identical sections on all 8: "Have These Handy" (6 H3s), shared FAQ (5 Qs), CTA band. red-bricks and concrete-blocks have **zero** page-specific FAQs (`faq: []`).
- Fix in `content/material-pages.ts` (+ `content/materials-guide.ts`): give each page 300-500 words of material-specific content:
  - "How to check quality on delivery" per material (e.g. M-sand silt test, brick soundness/size, AAC density marking, RMC slump + delivery ticket, cement bag date).
  - "How much do I need" quantity guidance with a worked example from the engineer (to confirm), e.g. bags per m³ for a given mix.
  - Units and how it is sold/delivered in Bengaluru (bags, tonnes, loads, m³, nos.) and vehicle-access notes.
  - 2-3 page-specific FAQs each, especially for red-bricks and concrete-blocks; split `MASONRY` guide cell into three material-specific cells.
  - A real photo of that material at your yard/site per page.
  - Engineer reviewer byline ("Reviewed by <name>, <qualification>", to confirm) and "Last reviewed dd-MMM-yyyy".
  - In `app/materials/[slug]/page.tsx`, show the shared FAQ on /materials only (or 1-2 Qs) instead of repeating all five on each page.

### C4. No price-intent content for "price/rate" queries. Severity: MEDIUM
- Evidence: Bengaluru buyers search "M sand price Bangalore", "cement rate today". Pages say "Do you publish prices? No." and "Request Current Price". That is honest but gives nothing to rank or cite.
- Fix: in `content/material-pages.ts` add a "What affects the price of <material> in Bengaluru" section (brand, grade, quantity, distance, vehicle type, GST, unloading) without numbers. Any price or range needs Kiran/owner approval first; until then write "to confirm".

### C5. Homepage copy generic in places. Severity: LOW
- Evidence: "Quality construction materials, reliable supply, and complete construction support — from one trusted partner." (`components/sections/HomeHero.tsx` line 85); "Quality-Focused Materials", "Wide Material Categories" cards (`content/why.ts`). Unsupported adjectives.
- Fix: replace with checkable specifics: categories supplied, districts served (already in `content/about.ts`), GSTIN, what a quotation contains.

### C6. Delivery-time statement needs owner confirmation. Severity: LOW
- Evidence: `content/faq.ts` line 29 "typically go out within a few working days". Fine wording; confirm it reflects actual operations.

### Readability
Material pages FRE 56-61 (FK grade ~8): good for homeowners. Home/About 30-35 is depressed by heading fragments without punctuation and nav/footer; body copy itself is plain. No action beyond C5.

### AI citation readiness: 58/100
- Good: clear H2/H3 hierarchy, short definitional answers (grade use, jelly sizes), FAQPage + BreadcrumbList + Service + HomeAndConstructionBusiness/GeneralContractor JSON-LD with address, phone, area served.
- Missing: no dates (no "last updated"), no author/reviewer, no `sameAs`, no numeric facts (founding year, deliveries, districts count is the only quantity), identical FAQ text across 9 URLs dilutes which page is the source.

---

## 5. On-Page SEO: 72/100

### What works
- 13 unique titles, all 45-59 chars, primary keyword + Bengaluru first, brand last (`content/site.ts`, `seoTitle` in `content/material-pages.ts`, `buildMetadata` in `lib/seo.ts`).
- Descriptions 151-159 chars, unique, specific (grades, sizes). `metadata_template.py`: `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Minor pattern only: 6/8 material descriptions end "…across Karnataka. Request an itemised quote."
- One H1 per page; material H1s target "<material> supplier in Bengaluru".
- Internal linking: every page links to all 8 material pages, /materials, /construction, /about, /contact; material pages have a "Related Materials" block of 3 contextual links.
- Canonicals self-referencing; breadcrumbs on inner pages.

### On-page findings

**O1. Homepage H1 run-together in text extraction. Severity: MEDIUM**
- Evidence: raw HTML `<span class="block">Everything You Need</span><span class="block">to Build <span>Better.</span></span>` with no whitespace between spans. Visually fine (CSS `display:block`), but any parser reading `textContent` (crawlers that do not apply CSS, AI extractors, some link-preview/SERP snippets) gets "Everything You Needto Build Better." It is a real markup issue, not just an extraction quirk.
- Fix: `components/sections/HomeHero.tsx` lines 71-82: add `{" "}` between the two outer spans (or a trailing space inside the first). Also consider keyword-bearing H1, e.g. "Construction Materials Supplier in Bengaluru" with the slogan moved to a `<p>`.

**O2. Non-keyword H1s on key pages. Severity: MEDIUM**
- `/` H1 has no "construction materials" or "Bengaluru" (see O1).
- `/construction` H1 "Complete Construction Support." vs title "Civil Construction Contractor in Bengaluru". Fix: `app/construction/page.tsx` / `content/construction.ts` hero title → "Civil Construction Contractor in Bengaluru."
- `/about` H1 "More Than a Material Supplier." Fix: `content/about.ts` `heroTitle` → "About dude & Co., Bengaluru" style.

**O3. Duplicate / repeated headings. Severity: LOW-MEDIUM**
- `/about` H1 and first H2 are identical ("More Than a Material Supplier."): `content/about.ts` `heroTitle` reused by the summary section.
- `/materials` H1 "Materials, From Foundation to Finishing." and H2 "Construction Materials, From Foundation to Finish." near-identical, and the H2 also appears on home.
- Same H2s on 9-13 pages: "Planning to Build?", "Common Questions.", "Have These Handy.", "From Requirement to Site." Fix: make section headings material-specific on `app/materials/[slug]/page.tsx` (e.g. `Common Questions About ${material.name}`, `What to Share for a ${material.name} Quote`).
- Material pages' first H3 is a generic guide label ("Bricks, blocks and AAC" on 3 pages). Fix with the guide-cell split in C3.

**O4. "Bangalore" variant and buyer-query terms absent. Severity: MEDIUM**
- Evidence: 0 occurrences of "Bangalore" and "dealer" on all 13 pages; "Bengaluru" 5-8 per page. Targets: "cement supplier in Bengaluru" covered; "TMT steel dealers Bangalore", "M sand price Bangalore", "jelly supplier near me" not.
- Fix: `content/material-pages.ts` `lede` / new copy: one natural use of "Bangalore" per page (e.g. "Supplying sites across Bengaluru (Bangalore) and Karnataka"), "dealer/distributor" only if factually true (authorised dealer status to confirm), and the price-factors section from C4. Do not stuff titles.

**O5. Nav links to a `noindex` placeholder page. Severity: LOW**
- `/projects` returns 200 with `noindex, follow` and "Projects We Have Supplied" heading while content is placeholder. Linked from every page. Fix: hide the nav/footer link in `content/nav.ts` while `flags.projects` is off, or publish real projects (C2).

**O6. Images missing alt text. Severity: LOW**
- 5 images without alt on every page (8 on home, 6 on /materials). Likely decorative/logo images; confirm they are `alt=""` intentionally, otherwise add descriptive alt in the relevant components.

**O7. Contact page thin (436 words incl. chrome). Severity: LOW**
- Acceptable for a contact page, but add map/landmark directions to the yard, working hours (to confirm) and GSTIN in body. `content/contact.ts`.

### On-page score breakdown
| Element | Score |
|---|---|
| Titles | 92 |
| Meta descriptions | 88 |
| H1s | 55 |
| H2/H3 structure | 60 |
| Keyword targeting (Bengaluru buyer queries) | 60 |
| Internal linking | 85 |
| Images/alt | 65 |
| **Overall** | **72** |

---

## 6. Structured findings (for audit-data.json, Content Quality category)

```json
[
 {"id":"C1","title":"Hero uses third-party Foxconn project photos with caption","severity":"critical","file":"content/images.ts"},
 {"id":"C2","title":"No real projects, founder, years or own photos","severity":"high","file":"content/projects.ts, content/about.ts, content/flags.ts"},
 {"id":"C3","title":"Material pages near-template duplicates (95-177 unique words)","severity":"high","file":"content/material-pages.ts, content/materials-guide.ts, app/materials/[slug]/page.tsx"},
 {"id":"C4","title":"No price-factor content for price/rate queries","severity":"medium","file":"content/material-pages.ts"},
 {"id":"C5","title":"Generic hero/why-us adjectives","severity":"low","file":"components/sections/HomeHero.tsx, content/why.ts"},
 {"id":"O1","title":"Home H1 spans concatenate without space","severity":"medium","file":"components/sections/HomeHero.tsx:71-82"},
 {"id":"O2","title":"Non-keyword H1s on home, construction, about","severity":"medium","file":"components/sections/HomeHero.tsx, content/construction.ts, content/about.ts"},
 {"id":"O3","title":"Duplicate/repeated H1-H2 and boilerplate H2s","severity":"low","file":"content/about.ts, app/materials/page.tsx, app/materials/[slug]/page.tsx"},
 {"id":"O4","title":"No 'Bangalore'/'dealer'/price-intent terms","severity":"medium","file":"content/material-pages.ts"},
 {"id":"O5","title":"Nav links to noindex placeholder /projects","severity":"low","file":"content/nav.ts"},
 {"id":"O6","title":"5+ images per page without alt","severity":"low","file":"components/*"},
 {"id":"O7","title":"Thin contact page","severity":"low","file":"content/contact.ts"}
]
```

All suggested copy must pass the company rules: no "guaranteed", no invented numbers/prices/years/project counts (mark "to confirm"), own photos only, no fabricated customer quotes; pricing language needs Kiran's approval.
