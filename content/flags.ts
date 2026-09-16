/**
 * Content flags. Sections that depend on content the business has not yet supplied
 * (real projects, client feedback, confirmed brand list, approved legal wording, a
 * confirmed inbox) stay OFF until that content exists. Nothing invented goes live.
 *
 * Preview deployments can flip a flag with NEXT_PUBLIC_FLAG_<NAME>=1 (static access
 * is required so Next.js can inline the value into client bundles).
 */
function flag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export const flags = {
  /** Brands & Product Options section (Home, Materials). Brand list unconfirmed. */
  brandOptions: flag(process.env.NEXT_PUBLIC_FLAG_BRAND_OPTIONS, false),
  /** Project grid (Home, Projects). Prototype projects are fictional placeholders. */
  projects: flag(process.env.NEXT_PUBLIC_FLAG_PROJECTS, false),
  /** Client Voices (Home) and testimonials card (About). No real feedback collected yet. */
  testimonials: flag(process.env.NEXT_PUBLIC_FLAG_TESTIMONIALS, false),
  /** Privacy / Terms clause bodies. Approved wording not yet supplied. */
  legalBodies: flag(process.env.NEXT_PUBLIC_FLAG_LEGAL_BODIES, false),
  /** Show the email address. Marked "(temporary)" in the design. */
  emailPublic: flag(process.env.NEXT_PUBLIC_FLAG_EMAIL_PUBLIC, false),
  /** Free Material Estimate section on Home. */
  estimator: flag(process.env.NEXT_PUBLIC_FLAG_ESTIMATOR, true),
} as const;

export type FlagName = keyof typeof flags;
