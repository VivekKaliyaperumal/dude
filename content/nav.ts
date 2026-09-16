import { flags } from "./flags";
import { site } from "./site";

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
} as const;

export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Materials", href: routes.materials },
  { label: "Construction", href: routes.construction },
  { label: "Projects", href: routes.projects },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export type FooterColumn = { title: string; items: NavItem[] };

const contactItems: NavItem[] = [
  { label: site.phone.display, href: site.phone.tel, external: true },
  { label: "WhatsApp", href: site.phone.whatsapp, external: true },
  ...(flags.emailPublic ? [{ label: site.email, href: `mailto:${site.email}`, external: true }] : []),
  { label: "Get a Free Quote", href: routes.quote },
];

export const footerColumns: FooterColumn[] = [
  { title: "NAVIGATION", items: primaryNav },
  {
    title: "MATERIALS",
    items: ["Cement", "TMT Steel", "M-Sand", "Bricks", "Blocks", "Aggregates", "RMC", "Finishing Materials"].map(
      (label) => ({ label, href: routes.materialsList }),
    ),
  },
  {
    title: "CONSTRUCTION",
    items: ["Residential", "Commercial", "RCC", "Civil Work", "Finishing", "Renovation"].map((label) => ({
      label,
      href: routes.constructionScope,
    })),
  },
  { title: "CONTACT", items: contactItems },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
];
