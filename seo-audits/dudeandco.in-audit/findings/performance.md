# Performance + Images (LAB DATA ONLY, local Lighthouse 13.6.0, 18-Nov-2026; no CrUX/field data; PSI public endpoint rate-limited)
| Page | Mobile score / LCP / TBT / CLS | Desktop score / LCP / TBT / CLS |
|---|---|---|
| / | 65 / 4.1s / 770ms / 0 | 93 / 1.4s / 20ms / 0.007 |
| /materials/cement | 78 / 4.1s / 360ms / 0 | 95 / 1.2s / 140ms / 0 |
| /construction | 73 / 3.1s / 870ms / 0 | 100 / 0.8s / 0 / 0 |
Performance score (mobile avg 72, desktop avg 96): 72. Images score: 62.
Findings
1. HIGH Home mobile LCP element is the decorative logo-mark (alt="", loading=lazy, no fetchpriority), LCP breakdown: TTFB 769ms, load delay 689ms, render delay 453ms. Fix: components/sections/HomeHero.tsx (logo-mark Image: remove from LCP / make it CSS background or hide on mobile; ensure hero photo is the LCP).
2. HIGH /materials/cement LCP 4.1s: element render delay 1,130ms; preload lacks fetchpriority=high. Fix: components/sections/MaterialDetail.tsx / ui/ImageWithCredit.tsx (priority already set; check preload and reveal/opacity animation via RevealObserver delaying paint).
3. HIGH Mobile TBT 360-870ms, main-thread 2.8-4.8s; unused JS ~90KiB (2 chunks), legacy JS 14KiB. Fix: lazy-load AssistantFab/Panel, Analytics, RevealObserver (app/layout.tsx); set browserslist modern.
4. MED Home mobile 1,620KiB; image-delivery waste ~743KiB, Unsplash images up to 288KiB at w=750. Fix: content/images.ts replace stock with own photos; lib/images/loader.ts lower q / better sizes.
5. MED /assistant/dude-avatar.jpg unoptimized (~10KiB savings): components/assistant/AssistantFab.tsx, AssistantPanel.tsx.
6. MED Render-blocking CSS chunk (0i7eqeqa_p4zk.css): next.config.ts consider experimental inlineCss.
7. LOW Fonts: 4 Google fonts (layout.tsx), 2 non-preloaded; display swap OK. CLS 0 to 0.007: pass.
Images positives: descriptive alt text in content/images.ts, own WebP renditions with immutable cache (next.config.ts), hero slides 2+ lazy/low priority. Concern: Unsplash stock conflicts with the no-stock-photography rule.
INP: not measurable in lab (TBT is proxy). CWV pass/fail (lab): LCP fail mobile, CLS pass.
