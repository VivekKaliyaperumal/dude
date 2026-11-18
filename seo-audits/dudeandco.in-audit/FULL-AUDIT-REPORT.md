# dudeandco.in — Full SEO Audit

Audit date: 18-Nov-2026 · Tool: claude-seo v2.6.2 · Pages: 13 (all in sitemap, all HTTP 200)
Business type: hybrid local business — construction-materials supplier + civil contractor, Bengaluru, serving Karnataka.

## Executive summary

**SEO Health Score: 69 / 100.** The website is technically sound and readable by Google and AI tools. What holds it back is **trust and presence off the website**: no verified Google Business Profile, no directory listings or reviews found, no real project proof, third-party/stock photos, and material pages that are too similar. For buyer searches in Bengaluru, directories (IndiaMART, AskLaila, McCoy Mart) and dated price pages currently take the top results.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 84 |
| Content Quality | 23% | 54 |
| On-Page SEO | 20% | 72 |
| Schema / Structured Data | 10% | 72 |
| Performance (lab, mobile+desktop) | 10% | 72 |
| AI Search Readiness | 10% | 59 |
| Images | 5% | 62 |
| **Weighted total** | | **69** |

Supporting (not in the weighted total): Local SEO 38 · Agent-UX 100 (heuristic) · SXO Gap (cement page) 53.

### Top 5 critical issues
1. Homepage hero uses Foxconn "Project Elephant" photos from an X post — not cleared for reuse, implies a project we have not claimed.
2. No verified Google Business Profile, reviews or directory listings found; brand search returns the film *Dude*.
3. No price-intent page while "TMT steel price Bangalore"-type results are ~90% price pages.
4. Material pages are near-duplicates (95–177 unique words each).
5. Mobile LCP 4.1s on home and cement pages (lab).

### Top 5 quick wins
1. Fix "Needto" H1 spacing and use keyword-led H1s (home, /construction, /about).
2. Add "Bangalore" spelling naturally (0 mentions today).
3. Stop the decorative logo-mark being the mobile LCP element; `fetchpriority=high` on hero.
4. Add `public/llms.txt` (draft ready in `findings/geo.md`).
5. Add security headers in `next.config.ts`.

## Category detail
- Technical — `findings/technical.md`
- Content + On-Page — `findings/content.md`
- Schema — `findings/schema.md`
- Performance + Images — `findings/performance.md`
- AI search (GEO) — `findings/geo.md`
- Agent readiness — `findings/agentic.md`
- Local — `findings/local.md`
- Search intent (SXO) — `findings/sxo.md`
- Visual / mobile — `findings/visual.md` + `screenshots/`

## Limitations
- No Google Search Console / GA4 / CrUX access: no real rankings, clicks or field Core Web Vitals. Performance is local Lighthouse lab data.
- PageSpeed public API was rate-limited (HTTP 429); Lighthouse Agentic Browsing fraction not measured.
- Directory/GBP checks were blocked or inconclusive (JustDial 403, IndiaMART 404, search bot checks) — status "to confirm", not "absent".
- SERP analysis used web search, not live Google (no local pack / AI Overview data).
- Desktop homepage screenshot was blank: hero/header fade-in (`app/globals.css` L308) had not finished at capture. Mobile render and HTML are complete. Verify manually in a desktop browser.

All numbers here are measured or taken from the site. Anything not verifiable is marked "to confirm". No ranking outcome is promised.
