import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { aboutCopy } from "@/content/about";
import { flags } from "@/content/flags";
import { structuralMaterials } from "@/content/materials";
import { legalLinks, primaryNav, routes } from "@/content/nav";
import { site, socialProfiles } from "@/content/site";
import { trust } from "@/content/why";
import { isInternalHref } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon, PathIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "@/components/ui/Wordmark";

/** Distinct destinations only; every entry goes somewhere different. */
const whatWeDo = [
  { label: "Construction material supply", href: routes.materialsList },
  { label: "Civil construction", href: routes.constructionScope },
  { label: "Free quotation", href: routes.quote },
  ...(flags.estimator ? [{ label: "Free material estimate", href: routes.estimate }] : []),
];

/** "Cement, TMT Steel, … and Ready Mix Concrete" from the real category list, so it never drifts from the Materials page. */
const structuralNames = structuralMaterials.map((m) => m.name);
const materialsLine = `${structuralNames.slice(0, -1).join(", ")} and ${structuralNames.at(-1)}, plus finishing and interior materials.`;

/**
 * Site footer, four columns from the nav breakpoint:
 * Brand (tagline, summary, the five trust points, GST) | Explore | What we do | Contact,
 * then a bottom bar with the legal links and the social tiles on the left and the © line on the right.
 * Every line is existing site content. Social icons come from content/site.ts; one without a URL yet is a
 * non-linking placeholder tile.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    // Below the nav breakpoint the 57px bottom padding sits under the fixed StickyBar, so it never covers the legal links.
    <footer data-theme="dark" className="relative overflow-hidden bg-footer pt-[clamp(48px,6vw,86px)] pb-[57px] text-on-dark nav:pb-0">
      <div aria-hidden className="pointer-events-none absolute -right-[8%] -bottom-[30%] w-[min(560px,70vw)] opacity-[.11]">
        <Image unoptimized src="/logo-mark.png" alt="" width={560} height={560} className="block w-full" />
      </div>
      <div className="container-site relative">
        {/* Phone: Brand / Explore + What we do side by side / Contact. Tablet: Brand + Contact, then the two link lists. Desktop: one row of four. */}
        <Reveal className="grid grid-cols-2 gap-x-[clamp(20px,3.5vw,56px)] gap-y-9 nav:grid-cols-[1.5fr_0.85fr_1.05fr_1.15fr]">
          {/* Brand */}
          <div className="col-span-2 tight:order-1 tight:col-span-1">
            <Wordmark tone="white" size={32} />
            <p className="eyebrow mt-3.5 text-gold">{site.brand.tagline}</p>
            <p className="mt-4 max-w-[46ch] text-[13.5px] leading-[1.65]">{aboutCopy.summaryLede}</p>
            <ul className="mt-5 grid max-w-[46ch] grid-cols-2 gap-x-4 gap-y-2.5" aria-label={`Why ${site.brand.copy}`}>
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-[12.5px] font-medium text-on-dark">
                  <PathIcon d={t.d} size={14} className="flex-none text-green" />
                  {t.label}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="label-mono text-gold">GST REGISTERED BUSINESS</span>
              <span className="font-mono text-[10.5px] tracking-[.14em] text-on-dark-3">GSTIN {site.gstin}</span>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer: explore" className="tight:order-3 nav:order-2">
            <FooterHeading>EXPLORE</FooterHeading>
            <ul className="mt-4 flex flex-col gap-[9px]">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* What we do */}
          <nav aria-label="Footer: what we do" className="tight:order-4 nav:order-3">
            <FooterHeading>WHAT WE DO</FooterHeading>
            <ul className="mt-4 flex flex-col gap-[9px]">
              {whatWeDo.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[32ch] text-[12.5px] leading-[1.6] text-on-dark-3">{materialsLine}</p>
          </nav>

          {/* Contact */}
          <div className="col-span-2 tight:order-2 tight:col-span-1 nav:order-4">
            <FooterHeading>CONTACT</FooterHeading>
            <address className="mt-4 flex flex-col gap-[9px] text-[13.5px] leading-[1.6] not-italic">
              <p>
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <FooterLink href={site.phone.tel}>Call {site.phone.display}</FooterLink>
              <FooterLink href={site.phone.whatsapp}>Chat on WhatsApp</FooterLink>
              {flags.emailPublic ? <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink> : null}
            </address>
            <p className="mt-3 text-[12.5px] leading-[1.6] text-on-dark-3">
              Based in {site.basedIn}. Serving projects across {site.serviceArea}.
            </p>
            <Button href={routes.quote} variant="outline-dark" size="xs" className="mt-5">
              Get a Free Quote
            </Button>
          </div>
        </Reveal>

        {/* Bottom bar, as the owner asked (18-Sep-2026): legal links then the social tiles in the left corner, © on the right. */}
        <div className="mt-[clamp(28px,3.5vw,44px)] flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t border-footer-line py-4">
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2.5">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-on-dark-3 transition-colors hover:text-gold">
                {l.label}
              </Link>
            ))}
            {/* A profile without a confirmed URL is a placeholder tile (no link) until the owner supplies it. */}
            <ul className="flex gap-2" aria-label={`Follow ${site.brand.copy}`}>
              {socialProfiles.map((p) => (
                <li key={p.name}>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.brand.copy} on ${p.name}`}
                      className="grid h-9 w-9 place-items-center border border-dark-line-3 text-on-dark transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon name={p.icon} size={15} />
                    </a>
                  ) : (
                    <span
                      role="img"
                      aria-label={`${p.name} (link to be added)`}
                      title={`${p.name} — link to be added`}
                      className="grid h-9 w-9 place-items-center border border-dark-line-3 text-on-dark"
                    >
                      <Icon name={p.icon} size={15} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <span className="text-xs text-on-dark-3">
            &copy; {year} {site.brand.copy} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[.16em] text-on-dark-3">{children}</span>;
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = "text-[13.5px] text-on-dark transition-colors hover:text-gold";
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
