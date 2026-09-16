import { flags } from "./flags";
import { site } from "./site";

export type ContactRow = { k: string; v: string; href?: string };

/** Contact key/value list (Home contact summary, Contact page). */
export const contactRows: readonly ContactRow[] = [
  { k: "ADDRESS", v: site.address.lines.join("\n") },
  { k: "PHONE", v: site.phone.display, href: site.phone.tel },
  { k: "WHATSAPP", v: site.phone.display, href: site.phone.whatsapp },
  ...(flags.emailPublic ? [{ k: "EMAIL", v: site.email, href: `mailto:${site.email}` }] : []),
  { k: "SERVICE AREA", v: site.serviceArea },
];

export const projectTypes = ["Residential", "Commercial", "Villa", "Renovation", "Other"] as const;
export const estimatorProjectTypes = ["Residential", "Commercial", "Renovation", "Other"] as const;
export const floorOptions = ["G", "G+1", "G+2", "G+3", "G+4 or more"] as const;

export const formCopy = {
  callLine: `FOR A FREE QUOTE, CALL ${site.phone.display}`,
  prefer: "Prefer to speak directly? Call",
  /** Wording to confirm with the owner (DPDP notice). */
  consent: "By submitting, you agree to be contacted by dude & Co. about this enquiry. See our",
  quote: {
    submit: "Request Free Quote",
    successTitle: "Thank you. Enquiry received.",
    successBody:
      "Our team will contact you to understand your material requirement, quantity and delivery location, and prepare the right quotation.",
    reset: "Submit another enquiry",
  },
  estimate: {
    step1: "STEP 01 — PROJECT DETAILS",
    step2: "STEP 02 — MATERIAL CATEGORIES",
    disclaimer:
      "Indicative estimate only. Final material quantities depend on structural design, BOQ, drawings, specifications and site conditions.",
    submit: "Get Free Estimate",
    successTitle: "Thank you. Our team will contact you for a detailed requirement and quotation.",
    reset: "Start a new estimate",
    footnote: "For a free quote, call",
  },
  contact: {
    submit: "Send Enquiry",
    successTitle: "Enquiry sent.",
    successBody: "Thank you. Our team will contact you for a detailed requirement and quotation.",
    reset: "Send another",
  },
} as const;

/** "Have These Handy" cards on the Contact page. */
export const haveHandy: readonly { n: string; title: string; body: string }[] = [
  { n: "01", title: "Material and grade", body: "For example OPC 43 cement, Fe 500D TMT 12 mm, 20 mm aggregate. If unsure, tell us the stage of construction." },
  { n: "02", title: "Approximate quantity", body: "Bags, tonnes, loads or square feet. A range is fine." },
  { n: "03", title: "Delivery location", body: "Site address or area, and whether a large truck can reach the gate." },
  { n: "04", title: "Timeline", body: "When you need the first delivery and how the rest should be spaced." },
  { n: "05", title: "Drawings or BOQ", body: "If you have them, attach or share on WhatsApp after the call." },
  { n: "06", title: "Contact preference", body: "Call or WhatsApp, and a good time to reach you." },
];
