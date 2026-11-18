# GEO / AI Search Readiness: dudeandco.in

Audit date: 18-Nov-2026. Scope: the 13 URLs in `raw/urls.txt`. Each page was fetched with an AI-search user agent, and the source repo was reviewed. No files were edited.

**AI Search Readiness score: 59/100.** The technical foundation is strong: the HTML is server-rendered, all crawlers are allowed, and the schema is clean. The material pages hold genuinely useful facts. The main gap is entity and authority signals. Off-site we found no trace of the brand, and the name "Dude" collides with a 2025 Tamil film that dominates search results.

## Dimension scores

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 60 | Material pages contain fact-dense blocks with IS codes. Passages are short (40-70 words), headings are slogans, and no page says in one passage what dude & Co. is. |
| Structural readability | 20% | 78 | One H1 per page, clean H2s, FAQPage and BreadcrumbList schema. The H2 "More Than a Material Supplier." appears twice on /about. Six generic materials FAQs are repeated on all 8 material pages. |
| Multi-modal | 15% | 45 | Alt text is descriptive. Many images are Unsplash stock, and the home hero is a third-party photo of Foxconn's site. There are no own-site photos and no video. |
| Authority and brand | 20% | 25 | No founders or people are named, there is no founding year, `sameAs` is empty, the projects section is disabled (placeholder content), there are no reviews, and no off-site mentions were found. |
| Technical accessibility | 20% | 85 | SSR (all 13 pages return 200 with full text to a bot UA, 400-1,750 words each), robots allows all, sitemap present. /llms.txt returns 404. No visible or schema dates. |

Weighted: 15.0 + 15.6 + 6.75 + 5.0 + 17.0 = **59**.

## AI crawler access (robots.txt: `User-agent: * / Allow: /`)

| Crawler | Governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| PerplexityBot | Perplexity | Allowed |
| Googlebot | Google Search and AI Overviews | Allowed |
| Bingbot | Bing and Copilot | Allowed |
| GPTBot / ClaudeBot / CCBot / cohere-ai | Model training only | Allowed (an owner choice; this does not affect citations) |
| Google-Extended | Gemini training and grounding | Allowed (helps Gemini answers) |
| Applebot-Extended | Apple Intelligence training only | Allowed |

- **llms.txt:** missing (404).
- **RSL licence:** none.

## What works

- **Server rendering.** Every page returns full HTML text; no client-side rendering risk (`app/**`).
- **Structured data.** `lib/seo.ts` emits `HomeAndConstructionBusiness` + `GeneralContractor` schema with the address, phone and GSTIN. It also emits `Service` + `OfferCatalog` markup, an FAQPage that mirrors the visible FAQs, and a BreadcrumbList.
- **Citable facts on material pages.** For example: "OPC 33, 43 and 53 are all covered by IS 269:2015; the number is the minimum 28-day strength in MPa…". These blocks come from `content/materials-guide.ts`.
- **Construction stage timeline.** The G+1 stage timeline with week ranges on /construction (`content/construction.ts`) is a strong, answer-shaped block.
- **Local intent covered.** Titles and H1s read "X Supplier in Bengaluru", and /about names the districts served.

## Off-site brand mentions (checked 18-Nov-2026)

| Source | Result |
|---|---|
| Bing: "dude & Co" + Bengaluru construction / Saladoddi | 0 relevant results. The first page is dominated by the film *Dude (2025)* (Wikipedia, IMDb, Netflix, YouTube). |
| Bing: "Dude and Co" Bangalore cement TMT | 0 relevant results (same film collision). |
| Bing: "dudeandco.in", `site:dudeandco.in` | No results from the domain observed. The scraped results looked unreliable, so confirm in Bing Webmaster Tools. |
| Bing: phone 6363703532 | No business listing. |
| Bing: GSTIN 29AAYFD3535F1Z1 | No match. |
| JustDial | 403 (blocked to automated fetch). Not verified. |
| IndiaMART | Search URL returned 404. Not verified. |
| DuckDuckGo | Bot challenge. Not verified. |
| Google Business Profile | Not verifiable from here. No GBP or Maps link appears on the site. |
| Wikipedia / Reddit / YouTube / LinkedIn | No mentions found. All social `href`s in `content/site.ts` are empty. |

Conclusion: no third-party corroboration of the entity was found. AI engines currently have only the site itself to go on.

## Findings

### 1. No off-site entity corroboration; brand name collides with a film (Critical)

- **Evidence:** See the table above. `socialProfiles` hrefs are all `""`, so the JSON-LD has no `sameAs`.
- **Fix:**
  1. Create or claim a Google Business Profile, plus IndiaMART, JustDial and LinkedIn company pages. Use one identical NAP everywhere: "dude & Co., No. 20, Saladoddi Grama, Bengaluru Urban 560082, +91 63637 03532".
  2. Paste the profile URLs into `content/site.ts` → `socialProfiles`. This turns on `sameAs` automatically.
  3. Add GBP/Maps and IndiaMART URLs to `sameAs` in `lib/seo.ts` → `siteJsonLd()`.
  4. Always pair the brand with a category ("dude & Co. construction materials, Bengaluru") to disambiguate it from the film.
- **Effort:** Medium (owner action).

### 2. No definitional "who we are" passage (High)

- **Evidence:** The home H1 is "Everything You Need to Build Better." and the /about H1 is "More Than a Material Supplier.". No single passage states name + what the business does + where + for whom + how to order.
- **Fix:** Add a 130-170-word block near the top of /about and the home page, built only from existing facts: what is supplied (materials list), civil construction offered with supply, based at Saladoddi, Bengaluru, supply across Karnataka, regular deliveries around Bengaluru, Mysuru and Tumakuru, itemised quotations with no price list, GST registered, and the phone/WhatsApp number.
- **Files:** `content/about.ts`, the home hero copy (`content/why.ts` / `app/page.tsx`).
- **Effort:** Low.

### 3. Third-party hero photo implies a project association (High)

- **Evidence:** In `content/images.ts`, the home hero is Foxconn "Project Elephant", sourced from an X post. Reuse permission is still "to confirm". The alt text and caption name Foxconn.
- **Risk:** AI engines may infer that dude & Co. worked on Foxconn's project. Nothing on the site says so, and that unsupported claim could be cited. It also breaks the "own photos only" rule.
- **Fix:** Replace it with own-site photos and descriptive alt text, for example "dude & Co. delivery of OPC 43 cement at a residential site, <area>".
- **Effort:** Low.

### 4. No proof layer: people, years, projects, reviews (High)

- **Evidence:** `flags.projects`, `flags.testimonials` and `flags.brandOptions` are all false (`content/flags.ts`). `content/projects.ts` contains fictional placeholders.
- **Fix:**
  - Publish 3-5 real projects with own photos, location and month/year.
  - Add the founder or team names, with a `Person` schema linked as `founder`.
  - Add the founding year (to confirm with owner).
  - Then enable the flags.
- **Effort:** Medium.

### 5. Headings are slogans, not questions; passages are short (Medium)

- **Evidence:** Every material page has the same H2s ("Cement Options.", "Have These Handy.", "Related Materials."). The uses blocks are about 30-45 words.
- **Fix:**
  - Rename the H2s to questions, for example "Which cement grade should I buy for a house in Bengaluru?" and "How is cement delivered to sites in Bengaluru?".
  - Open each section with a 40-60-word direct answer.
  - Merge the guide, uses and storage text into one 130-170-word answer block per material.
- **Files:** `content/material-pages.ts`, `content/materials-guide.ts`.
- **Effort:** Medium.

### 6. FAQs duplicated across 8 pages (Medium)

- **Evidence:** All 8 material pages show the six `materialsFaq` items plus one page-specific item, so 85% of FAQ text is duplicated.
- **Fix:** Give each material 3-4 page-specific FAQs in `content/material-pages.ts` → `faq`. Keep the generic set on /materials only.
- **Effort:** Low-Medium.

### 7. llms.txt missing (Medium)

- **Fix:** Add `public/llms.txt` with the draft below.
- **Effort:** Low.

### 8. No freshness signals (Low)

- **Evidence:** No `datePublished`/`dateModified` in the schema and no "Last reviewed" line on the guides.
- **Fix:** Add a visible "Last reviewed: dd-MMM-yyyy" line plus `dateModified` to the material pages (`app/materials/[slug]`, `lib/seo.ts`).
- **Effort:** Low.

### 9. Duplicate H2 on /about (Low)

- **Evidence:** "More Than a Material Supplier." is used for both the H1 and an H2.
- **Fix:** Retitle the section in `content/about.ts` / `content/why.ts`.

## Top 5 changes by impact

1. **GBP + IndiaMART + JustDial + LinkedIn with consistent NAP, then fill `sameAs`.** Medium effort, owner action.
2. **Definitional entity paragraph on Home and /about.** About 1 hour.
3. **Replace the Foxconn and stock imagery with own photos.** Owner photos needed.
4. **Real projects, team and founding year; enable the flags.** Owner content needed.
5. **Question H2s + 130-170-word answer blocks + unique FAQs per material page.** About 1 day.

## Platform readiness (estimates)

| Platform | Score | Main blocker |
|---|---|---|
| Google AI Overviews | 50 | No GBP link or reviews; local packs depend on GBP. |
| ChatGPT Search | 40 | No third-party corroboration; brand collides with the film. |
| Perplexity | 50 | Good fact blocks; lacks external citations. |
| Bing Copilot | 40 | Domain not observed in Bing results; verify in Bing Webmaster Tools and submit the sitemap / IndexNow. |
| Gemini | 45 | Same as Google AIO; Google-Extended is allowed. |

## Draft `public/llms.txt` (site facts only)

```
# dude & Co.

> Construction material supplier and civil construction contractor based in Bengaluru, Karnataka. Supplies cement, TMT steel, M-sand, aggregates (jelly), red bricks, concrete blocks, AAC blocks, ready mix concrete and interior/finishing materials across Karnataka. Every quotation is itemised for the specific project; no price list is published. GST registered.

- Address: No. 20, Saladoddi Grama, Bengaluru Urban - 560082, Karnataka, India
- Phone / WhatsApp: +91 63637 03532
- Service area: Karnataka. Regular deliveries in and around Bengaluru, Mysuru and Tumakuru; project-based supply to other districts.
- Construction: civil construction offered together with material supply, in Bengaluru and surrounding districts, built to approved drawings.

## Materials
- [All materials](https://www.dudeandco.in/materials): categories, grade guide, storage tips, FAQs
- [Cement](https://www.dudeandco.in/materials/cement): OPC 43, OPC 53, PPC, PSC
- [TMT steel](https://www.dudeandco.in/materials/tmt-steel): Fe 500, Fe 500D, Fe 550
- [M-sand](https://www.dudeandco.in/materials/m-sand): concrete, plastering, washed
- [Aggregates / jelly](https://www.dudeandco.in/materials/aggregates): 12 mm, 20 mm, 40 mm
- [Red bricks](https://www.dudeandco.in/materials/red-bricks): wire-cut, table-mould
- [Concrete blocks](https://www.dudeandco.in/materials/concrete-blocks): solid, hollow
- [AAC blocks](https://www.dudeandco.in/materials/aac-blocks)
- [Ready mix concrete](https://www.dudeandco.in/materials/ready-mix-concrete): project-specific grades

## Construction and company
- [Civil construction](https://www.dudeandco.in/construction): scope, typical G+1 stages, what to share
- [About](https://www.dudeandco.in/about): who we serve, districts covered, how quotations work
- [Contact / request a quote](https://www.dudeandco.in/contact)
```
