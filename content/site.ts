/**
 * Single source of truth for every verified business fact.
 * Verified against the dude & Co. business card (design/uploads) and the approved prototype copy.
 * Anything not listed here is "to confirm" — do not add facts elsewhere in the codebase.
 */
export const site = {
  brand: {
    /** Header / footer lockup, small-caps wordmark. */
    wordmark: "Dude & Co.",
    /** Running copy, <title>, © line. */
    copy: "dude & Co.",
    tagline: "Your Dream Home. Delivered.",
    strapline: "MATERIALS & CONSTRUCTION",
  },
  phone: {
    display: "+91 63637 03532",
    e164: "+916363703532",
    tel: "tel:+916363703532",
    whatsapp: "https://wa.me/916363703532",
  },
  /** Marked "(temporary)" in the design. Only rendered when flags.emailPublic is on. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dudeandco.in",
  address: {
    lines: ["No. 20, Saladoddi Grama", "Bengaluru Urban - 560082", "Bengaluru, Karnataka, India"],
    street: "No. 20, Saladoddi Grama",
    locality: "Bengaluru Urban",
    region: "Karnataka",
    postalCode: "560082",
    country: "IN",
  },
  gstin: "29AAYFD3535F1Z1",
  basedIn: "Bengaluru, Karnataka",
  serviceArea: "Karnataka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  titleDefault:
    "dude & Co. — Construction Material Supplier in Karnataka | Building Materials & Civil Construction",
  description:
    "dude & Co. supplies construction materials across Karnataka — cement, TMT steel, M-sand, aggregates, bricks, AAC blocks, RMC and finishing materials — and undertakes complete civil construction. Based in Bengaluru. GST registered business.",
} as const;

export const addressOneLine = site.address.lines.join(", ");
