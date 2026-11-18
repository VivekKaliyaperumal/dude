# Local SEO - dudeandco.in (score 38/100)
Business type: hybrid (visible address, Karnataka service area). Vertical: construction/home services.
Scores: GBP 6/25 (unverified), Reviews 2/20, On-page 11/20, NAP 12/15, Schema 6/10, Links/authority 1/10.

## Verified
- NAP consistent: content/site.ts is single source; live /contact shows +91 63637 03532 and "No. 20" in JSON-LD; schema telephone +916363703532.
- Schema: HomeAndConstructionBusiness + GeneralContractor, @id, address, areaServed, taxID (lib/seo.ts:66-112).
- Fabricated ratings/hours/geo deliberately omitted.

## Findings
1. HIGH - GBP not verified. Web search could not be run (Google returned an error page). Status: not found / to confirm. Off-site: claim/create GBP, primary category "Building materials supplier" (or confirm Civil contractor), service area Karnataka, add real photos.
2. HIGH - No embedded map or directions link. Evidence: grep for iframe/google.com/maps found none. Fix: add Maps embed/link to GBP in app/contact + footer once GBP exists.
3. HIGH - No reviews: testimonials flag off (content/flags.ts:20), no aggregateRating (correct, don't fake). Off-site: ask real customers for Google reviews; add GBP review link.
4. HIGH - Indian directories unverified: JustDial, IndiaMART, Sulekha, TradeIndia not found / to confirm. Off-site: list with identical NAP (same address string "No. 20, Saladoddi Grama, Bengaluru 560082").
5. MEDIUM - Schema gaps: no geo (5-decimal), openingHoursSpecification, priceRange, sameAs (socials empty, content/site.ts:65-70), hasMap. Add only after owner confirms. Address locality "Bengaluru Urban" is a district; use addressLocality "Bengaluru" (site.ts:40) and keep district in street line.
6. MEDIUM - Address oddity: "Saladoddi Grama" with PIN 560082; confirm with owner/GST certificate and match GBP exactly.
7. MEDIUM - Single-URL local coverage: /materials/[slug] pages exist (good service pages); no area pages. Add city/locality pages (e.g. Bengaluru north, Tumakuru, Mysuru) ONLY with unique content: real delivery lead times, actual project sites, local rates to confirm, area-specific specs. Swap-the-city-name pages = doorway risk; skip otherwise.
8. LOW - Hours not published on site; confirm and add to footer/contact and GBP.
9. LOW - Email only shown if flags.emailPublic; fine.

Limitations: no GBP/citation/review data (search unavailable, no DataForSEO); proximity not assessable.
