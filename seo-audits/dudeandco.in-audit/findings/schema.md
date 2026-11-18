# Schema audit: dudeandco.in (source-based, local repo)
Score: 72/100

## Detection (from lib/seo.ts, app/layout.tsx, page.tsx files)
- All 13 URLs: siteJsonLd() @graph from layout (HomeAndConstructionBusiness+GeneralContractor, WebSite). Valid.
- /materials, /materials/*, /construction, /about, /contact: BreadcrumbList. Valid. Homepage: none (correct).
- /materials/* and /construction: Service + OfferCatalog (Offer > Product name only).
- /materials, /materials/*, /construction: FAQPage via FaqSection.tsx.

## Findings
1. INFO: FAQPage on 9 URLs. No Google rich result (retired for all sites 07-May-2026). Harmless; keep or remove. Files: components/sections/FaqSection.tsx, lib/seo.ts faqJsonLd.
2. MEDIUM: sameAs absent. content/site.ts socialProfiles hrefs are empty. Fill real URLs (and Google Business Profile / Maps URL); siteJsonLd already emits them.
3. MEDIUM: No geo, openingHoursSpecification, hasMap. Deliberately omitted until confirmed (lib/seo.ts L63). Add after owner confirms.
4. LOW: Offer nodes carry no price/availability. Fine for Service (not a Product rich result); do not invent prices. Do not convert to Product snippets without real offers.
5. LOW: areaServed only "Karnataka". Add City entries (Bengaluru etc.) once confirmed.
6. LOW: contactPoint areaServed "IN" vs business "Karnataka"; add availableLanguage once confirmed.
7. LOW: /about and /contact use plain WebPage-less schema; add AboutPage / ContactPage nodes.
8. INFO: logo is /logo-mark.png; confirm it is at least 112x112 and square-ish.
No deprecated types (HowTo, SpecialAnnouncement) found. Contexts https, URLs absolute.

## Snippets (fill "to confirm" values with real data only)
lib/seo.ts siteJsonLd business node, add:
"geo": {"@type":"GeoCoordinates","latitude":"to confirm","longitude":"to confirm"},
"hasMap": "to confirm (Google Maps URL)",
"openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"to confirm","closes":"to confirm"}],
"areaServed": [{"@type":"State","name":"Karnataka"},{"@type":"City","name":"Bengaluru"}]

app/contact/page.tsx and app/about/page.tsx:
{"@context":"https://schema.org","@type":"ContactPage","@id":"https://www.dudeandco.in/contact#webpage","url":"https://www.dudeandco.in/contact","name":"Contact dude & Co.","isPartOf":{"@id":"https://www.dudeandco.in/#website"},"about":{"@id":"<businessId>"}}
(About: same with "@type":"AboutPage" and /about.)
