export type NavItem = { label: string; href: string; external?: boolean };

export const routes = {
  home: "/",
  materials: "/materials",
  construction: "/construction",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  quote: "/contact#quote",
  contactForm: "/contact#contact",
  materialsList: "/materials#materials",
  constructionScope: "/construction#construction",
  estimate: "/#resources",
} as const;

/** Landing page for one material category (content/material-pages.ts). */
export const materialHref = (slug: string) => `/materials/${slug}`;

export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Materials", href: routes.materials },
  { label: "Construction", href: routes.construction },
  { label: "Projects", href: routes.projects },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

/*
 * The footer lists primaryNav under "Explore" and builds its Contact column from content/site.ts.
 * The earlier Materials / Construction footer columns (14 labels that all pointed at the same two
 * anchors) were removed on 18-Sep-2026 at the owner's request.
 */

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
];
