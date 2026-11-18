# Technical SEO findings: https://www.dudeandco.in/ (audit 18-Nov-2026)
Score: 84/100

## Pass
- 13/13 sitemap URLs return 200, no redirects; each has a self-referencing canonical, unique title and description, no noindex.
- Sitemap valid (helper: urlset, 200, declared in robots.txt). Matches footer/nav links; privacy, terms, projects are noindex via flags and correctly excluded.
- http and apex redirect to https://www in one 308 hop. Trailing slash redirects to the clean URL (308).
- 404 returns real 404 with noindex. SSR/static prerender (x-nextjs-prerender), single H1, 2 JSON-LD blocks, viewport set, lang en-IN, hero image preloaded with fetchPriority high.

## Findings
1. HIGH - Security headers missing (only HSTS, max-age 63072000, no includeSubDomains/preload). Missing: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy. Fix: next.config.ts, add a `/:path*` rule in headers() (read node_modules/next/dist/docs/ for current headers API before editing). Test CSP in report-only first (Unsplash images, inline script in app/layout.tsx).
2. MEDIUM - Homepage canonical is "https://www.dudeandco.in" (no slash); sitemap, og:url and links use "https://www.dudeandco.in/". Equivalent for root, but make consistent. Fix: app/page.tsx / lib/seo.ts buildMetadata (alternates.canonical = path; home path should resolve to "/").
3. MEDIUM - Sitemap lastmod is a hand-maintained map; 11 of 13 share 2026-10-02 (materials sub-pages use one constant). Acceptable (honest, not build time), but must be updated when copy changes. Fix: app/sitemap.ts. changefreq/priority are ignored by Google; optional removal.
4. MEDIUM - Page weight: HTML 110-341 KB per page (homepage 210 KB, /materials 341 KB). Some pages took 1.3-2.3 s TTFB-to-complete from this location on cold cache (aggregates, red-bricks, aac-blocks); field CWV data to confirm via CrUX/PageSpeed. Fix: app/materials/page.tsx and components for the large inline payload; consider fewer RSC-inlined items.
5. LOW - 404 page canonical points to "/404" (noindex, harmless). Fix: app/not-found.tsx, drop path/canonical.
6. LOW - IndexNow not implemented (no key file; /indexnow.txt 404). Only matters for Bing/Yandex. Fix: add public/<key>.txt and a deploy-time ping; needs Kiran's approval for any external submission. Bing verification env var NEXT_PUBLIC_BING_VERIFICATION appears unset ("to confirm").
7. LOW - Remaining Unsplash stock photos (preconnect in app/layout.tsx; 2 unsplash refs on homepage), conflicting with the no-stock-photography rule; also extra third-party connection. Fix: content/images.ts, app/layout.tsx.
8. LOW - robots.txt has no AI-crawler rules (all allowed). Fine unless policy decided; app/robots.ts. llms.txt absent (optional).
9. INFO - Vercel preview noindex logic in lib/seo.ts (`indexable`) is correct; confirm production VERCEL_ENV=production (live robots.txt confirms).

Sandbox: render not run via Playwright; raw fetch only.
