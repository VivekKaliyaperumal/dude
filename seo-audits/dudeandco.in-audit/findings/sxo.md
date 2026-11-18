# SXO Findings — dudeandco.in (18-Nov-2026)

**Summary:** Our pages are single-supplier "request a quote" pages. Most target queries are won by directories (IndiaMART, AskLaila, McCoy Mart, RealEstateIndia, TradeIndia) and by price-list or aggregator pages (HomeRun, InfraLens, Tata Nexarc, Brick & Bolt). The biggest mismatch is on "TMT steel price Bangalore", where every result we saw is a price page and ours says "we do not publish prices".

SXO Gap Score (cement page): **53/100**. This score is separate from the SEO Health Score.

## Method
- Pages fetched with render_page.py `--mode auto` (raw HTML; not an SPA; HTTP 200; no sandbox warnings).
- Pages checked: `/`, `/materials/cement`, `/materials/tmt-steel`, `/construction`.
- SERPs came from the WebSearch tool, run once per query (8 queries). These are not live Google results, so local pack, ads and AI Overview could not be seen.
- Fetched content and SERP content were treated as untrusted.

## Query → page map
| Query | Our page | SERP dominant type (confidence) | Mismatch |
|---|---|---|---|
| construction material supplier in Bangalore | `/` (title matches; H1 "Everything You Need to Build Better.") | Supplier/marketplace category + directories (~60%) | MEDIUM: H1 has no keyword |
| cement dealers in Bangalore | `/materials/cement` | Price-list + brand price pages (HomeRun) + directories (AskLaila) (~70%) | HIGH |
| TMT steel price Bangalore | `/materials/tmt-steel` | Dated price pages / price trackers (~90%) | **CRITICAL**: page says it does not publish prices |
| M sand suppliers Bangalore | `/materials/m-sand` | IndiaMART/TradeIndia seller listings (~65%) | HIGH: listings show per-ton unit and minimum order quantity |
| AAC blocks Bangalore | `/materials/aac-blocks` | Directory product listings with per-piece price and size (~70%) | HIGH |
| ready mix concrete Bangalore | `/materials/ready-mix-concrete` | IndiaMART directory + RMC brands + price tracker (~60%) | MEDIUM |
| building contractors in Bangalore | `/construction` (H1 "Complete Construction Support.") | Brick & Bolt city landing pages + directories (~85%) | HIGH |
| jelly / aggregates suppliers Bangalore | `/materials/aggregates` | IndiaMART listings with ₹/ton by size (~75%) | MEDIUM: H1 is aligned; missing units and MOQ |
| (missing) cement / steel / material price list Bangalore | none | Price-list pages | Missing page |
| (missing) house construction cost Bangalore | none | Package / cost guides | Missing page |

## Top competitors seen
- **Brick & Bolt**: material-supply pages for each material plus contractor city pages.
- **HomeRun**: price lists for each brand, buying guides, and a claim of 105+ pin codes.
- **IndiaMART / TradeIndia / Dial4Trade**: sellers including AVN, Manvi Sands, SM Builders, Geo Products and Megha Projects.
- **InfraLens**: dated price trackers.
- **Tata Nexarc**: TMT price page.
- **AskLaila, McCoy Mart, RealEstateIndia**: directories.
- **Shankara Buildpro, Bhavani Traders**: suppliers.

## Findings
1. **CRITICAL: Wrong page type for the price-intent query.** Every TMT price result we saw is a dated price page. Our FAQ says "Do you publish prices? No."
   - Fix: add a dated "rate guide" route under `app/materials/[slug]` or a new `app/prices/`. Content should cover:
     - the price drivers (brand, grade, diameter, quantity, delivery)
     - a "today's rate on WhatsApp" CTA
   - Any figures: to confirm, with the owner's sign-off before anything is published.
2. **HIGH: Directories dominate local commercial queries.** Our site cannot become a directory.
   - Fix (off-site): claim and complete GBP, IndiaMART and JustDial listings that link to each `/materials/<slug>`. Run `/seo local`.
3. **HIGH: The construction page lacks contractor-SERP elements.**
   - The H1 has no keyword.
   - Projects and testimonials are switched off (`content/flags.ts`).
   - There is no package or cost-per-sq-ft structure (cost: to confirm).
   - Fix: `app/construction/page.tsx` (H1) and `content/construction.ts`. Switch the flags on only once real projects and testimonials exist.
4. **MEDIUM: No brand list.** `content/brands.ts` arrays are empty and `brandOptions` is off. "Cement dealers" SERPs rank pages for named brands.
   - Fix: get the list of brands actually supplied confirmed, then fill the arrays.
5. **MEDIUM: Missing buying facts that listings show.**
   - Units of sale: bag, ton, load, piece, m³.
   - Minimum order quantity.
   - Delivery localities or pin codes. Today we only state "Karnataka".
   - Fix: `content/material-pages.ts` (new fields), `content/faq.ts`, `content/site.ts` (`serviceArea`). Values are to confirm.
6. **MEDIUM: No calculators.** There are no tools for cement bags, steel kg or AAC block count. Fix: add a calculator component linked from `MaterialDetail`.
7. **LOW: Freshness and trust.**
   - No visible "updated" date (htmldate reads 2026-01-01).
   - Test-certificate and silt-report mentions could be stronger on M-sand and cement.
   - Fix: `content/material-pages.ts` `uses` / `faq`.

## SXO Gap Score: /materials/cement (53/100)
| Dimension | Score | Evidence |
|---|---|---|
| Page type | 9/15 | Supplier page; the SERP is mixed directories and price lists |
| Content depth | 8/15 | ~600 words; one material-specific FAQ |
| UX | 11/15 | WhatsApp FAB, sticky bar, "Have These Handy" checklist |
| Schema | 11/15 | FAQPage, BreadcrumbList, Service/OfferCatalog, HomeAndConstructionBusiness |
| Media | 6/15 | Not fully assessed; no video or calculator |
| Authority | 4/15 | No reviews or testimonials; brand list empty |
| Freshness | 4/10 | No dated content |

## Persona scores (Relevance / Clarity / Trust / Action, 25 each)
| Page | Home builder | Contractor | Architect |
|---|---|---|---|
| /materials/cement | 20/20/12/20 = **72** | 15/14/10/15 = **54** | 14/18/12/10 = **54** |
| /construction | 18/16/8/17 = **59** | 8/12/8/10 = **38** | 14/14/15/10 = **53** |

Weakest persona first:
- **Contractor on /construction (38).** Add a sub-contract / labour-only scope note and a path to bulk material supply.
- **Contractor on cement (54).** Add bulk and scheduled supply, brands, and invoicing with GST shown.
- **Architect (53–54).** Offer spec and test-certificate downloads, and a "send BOQ" CTA.
- **Home builder on /construction (59).** Add real projects, a stage-wise cost guide (to confirm), and a warranty statement only if the owner approves it.

## Limitations
- SERPs came from WebSearch, not live Google. No rank, CTR, local-pack, ads or AI Overview data.
- Images and above-the-fold layout were not visually reviewed.
- Competitor prices seen were not verified and are not reused.
