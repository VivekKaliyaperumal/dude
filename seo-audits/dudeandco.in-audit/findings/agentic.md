# Agent-readiness: https://www.dudeandco.in/ (checked 18-Nov-2026)

Lighthouse Agentic Browsing: NOT MEASURED. PSI HTTP 429 (daily quota, mobile and desktop). No X/N. Fix: configure a Google API key (/seo google setup) and re-run.
Agent-UX heuristic (separate from Lighthouse): 100/100, complete. Home: 1141 a11y nodes, 68 interactive, 0 unnamed. /contact: 450 nodes, 42 interactive, 0 unnamed. Both: 4 inputs without aria attributes (labels present).
Sandbox: no sandbox warning observed.

## Access policy (robots.txt, single "User-agent: *  Allow: /" group)
- Training (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended): allowed via * (no deliberate policy)
- Search (OAI-SearchBot, Claude-SearchBot, PerplexityBot): allowed via *
- User-triggered (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent): allowed; vendors differ on honouring robots.txt
- Content-Signal: none (draft/proposal, facts checked 23-Sep-2026)

## Findings
- P0 pass: server-rendered (945 words without JS); robots.txt 200; real 404s (no soft-404).
- P1 opportunity: no llms.txt (404; llms-full 404). Add app/llms.txt/route.ts (H1, ">" summary, Markdown links) -> adds a counted Lighthouse audit.
- P1 opportunity: no Markdown delivery (no Accept negotiation, no alternate link, /index.md 404). Optional; next.config.ts rewrites on Accept: text/markdown plus Vary: Accept.
- P1 opportunity: no Content-Signal, no named AI groups. Decide training/search policy (Kiran), then edit app/robots.ts (Next MetadataRoute.robots cannot emit Content-Signal natively; may need a route handler instead).
- P2 opportunity: WebMCP absent (W3C CG draft; 0 registerTool, 0 navigator.modelContext). Quote form unannotated: components/forms/QuoteForm.tsx (add toolname/tooldescription declarative attributes or registerTool bound to existing submit handler). Confirm at runtime once PSI works.
- P2/P3 n/a: /.well-known api-catalog, oauth-*, agent-card.json, ucp, ai-catalog.json all 404. Not needed; no API/auth to describe.
- P3: 4 inputs lack aria attributes (QuoteForm.tsx; add aria-required/aria-describedby for errors). Assistant UI in components/assistant/AssistantPanel.tsx also contains a form; includes voice widget, check it is operable via keyboard/a11y tree (not tested).
- Quote form submission success/validation by an agent was NOT tested (heuristic is static).

Standards notes: WebMCP, Content-Signal, ai-catalog.json, Web Bot Auth are drafts/proposals (checked 23-Sep-2026). No ranking/citation effect is promised.
