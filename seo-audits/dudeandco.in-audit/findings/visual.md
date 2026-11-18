# Visual audit - dudeandco.in (18-Nov-2026)
Screenshots: seo-audits/dudeandco.in-audit/screenshots/{home,materials-cement,contact}/ (desktop, laptop, tablet, mobile)

1. MEDIUM - Cement hero image looks like stock, and is not Indian. Bags print Vietnamese text ("VICEM HOANG MAI"); film-style editorial shot. Breaks the no-stock-photography rule. Fix: replace with a real Dude & Co. delivery or site photo. Check the other /materials/* pages too.
2. MEDIUM - Homepage desktop capture (1920x1080) shows an empty dark grid with only the "Project Elephant, Foxconn" ticker. Hero content did not appear at capture. Likely a reveal animation or lazy hydration, or a real above-the-fold blank. Fix: confirm with a manual desktop load. Hero text and CTA must render without waiting on JS or animation.
3. LOW - Homepage H1 spacing is fine visually. On mobile it reads "Everything You / Need / to Build Better." The text-extract "Needto" is a line-break artefact (likely a <br> with no space). Mobile wraps leave "Need" orphaned on its own line. Fix: add a space or use a span, and tune the max-width or text-wrap: balance. File not located (likely the hero component).
4. LOW - Chat avatar (bottom-right, about 55px) overlays body text on contact and cement pages, and sits close to the ticker on home. The sticky "Get Free Quote" bar covers content at the fold, which is normal.
5. PASS - Mobile above-the-fold, home:
   - H1 visible.
   - Primary CTA "Get a Free Quote" visible, plus a header phone icon, a sticky bottom "Get Free Quote" bar and a WhatsApp button (all pages).
   - No horizontal scroll or text overflow seen in screenshots.
   - Body text is large (about 16px+).
   - Tap targets: header phone and menu buttons are about 42px (84px at 2x), CTAs 56px+. Header buttons are marginally under 48px.
6. NOT VERIFIED - Programmatic DOM checks (scrollWidth, tap-target counts, alt text) failed: the Playwright module is missing in the system Python. Results above come from screenshots only.
