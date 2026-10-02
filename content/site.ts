/** The owner's confirmed domain (02-Oct-2026). The bare domain and http both 308-redirect here. */
const productionUrl = "https://www.dudeandco.in";

/**
 * Public origin for canonical URLs, sitemap, Open Graph and JSON-LD:
 * NEXT_PUBLIC_SITE_URL when set (e.g. a staging domain), otherwise the confirmed production domain.
 * Preview and local builds also point their canonicals at production, which is what search engines
 * expect; lib/seo.ts keeps previews out of the index. Server-only: no client component reads it.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return explicit ? explicit.replace(/\/+$/, "") : productionUrl;
}

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
  url: resolveSiteUrl(),
  /** ≤60 characters so Google shows it in full (SEO pass, 02-Oct-2026). */
  titleDefault: "Construction Material Supplier in Bengaluru | dude & Co.",
  /** ≤160 characters; also the JSON-LD business description. */
  description:
    "Cement, TMT steel, M-sand, jelly, bricks, AAC blocks, RMC and interior materials supplied across Karnataka, plus civil construction. Based in Bengaluru.",
} as const;

export type SocialIcon = "facebook" | "instagram" | "youtube" | "x" | "linkedin";
export type SocialProfile = { name: string; icon: SocialIcon; href: string };

/**
 * Social profiles, in the order the owner asked for (18-Sep-2026). URLs are to confirm —
 * paste the full profile URL (e.g. "https://www.instagram.com/<handle>"). While an href is
 * empty the footer shows the icon as a placeholder that does not link anywhere, and the
 * profile is left out of the JSON-LD `sameAs`. Fill the URL and both switch on.
 */
export const socialProfiles: readonly SocialProfile[] = [
  { name: "Facebook", icon: "facebook", href: "" },
  { name: "Instagram", icon: "instagram", href: "" },
  { name: "YouTube", icon: "youtube", href: "" },
  { name: "X (Twitter)", icon: "x", href: "" },
];

/** Only the profiles with a confirmed URL. */
export const liveSocialProfiles: readonly SocialProfile[] = socialProfiles.filter((p) => p.href !== "");
