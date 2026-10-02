import type { Metadata } from "next";
import type { FaqItem } from "@/content/faq";
import { flags } from "@/content/flags";
import { liveSocialProfiles, site } from "@/content/site";

export const siteUrl = site.url;

/**
 * Only the production deployment may be indexed. Vercel preview and branch deployments
 * (VERCEL_ENV "preview" / "development") would otherwise compete with it as duplicate copies.
 * Off Vercel (local, self-hosted) there is no VERCEL_ENV and indexing follows the page.
 */
export const indexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

const abs = (path: string) => new URL(path, siteUrl).toString();

/** Stable node ids so every page's JSON-LD points at the same business and website. */
export const businessId = abs("/#business");
const websiteId = abs("/#website");

type Args = {
  title: string;
  description: string;
  path: string;
  /** Use the title verbatim instead of the "%s | dude & Co." template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/**
 * The brand share card from app/opengraph-image.tsx. A page-level `openGraph` replaces the parent's
 * entirely, images included, so every page names the card explicitly or shares with no preview.
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.brand.wordmark} - ${site.brand.strapline}, ${site.serviceArea}`,
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex }: Args): Metadata {
  const url = abs(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.brand.copy,
      url,
      title,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * schema.org business + website graph built only from verified facts in content/site.ts.
 * Deliberately omitted until confirmed: ratings, reviews, opening hours, price range,
 * geo coordinates. Social profiles (`sameAs`) appear only once their URLs are confirmed in content/site.ts.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
        "@id": businessId,
        name: site.brand.wordmark,
        alternateName: site.brand.copy,
        slogan: site.brand.tagline,
        description: site.description,
        url: siteUrl,
        ...(liveSocialProfiles.length > 0 ? { sameAs: liveSocialProfiles.map((p) => p.href) } : {}),
        logo: abs("/logo-mark.png"),
        image: abs("/logo-mark.png"),
        telephone: site.phone.e164,
        ...(flags.emailPublic ? { email: site.email } : {}),
        taxID: site.gstin,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: { "@type": "AdministrativeArea", name: site.serviceArea },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phone.e164,
            contactType: "sales",
            areaServed: "IN",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.brand.copy,
        inLanguage: "en-IN",
        publisher: { "@id": businessId },
      },
    ],
  };
}

/** FAQPage from the exact items a FaqSection renders, so the markup always matches the visible answers. */
export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList; Home is prepended automatically. */
export function breadcrumbJsonLd(trail: readonly Crumb[]) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

type ServiceArgs = { name: string; description: string; path: string; serviceType: string; options?: readonly string[] };

/** A Service offered by the business. Options are listed by name only: no prices are published. */
export function serviceJsonLd({ name, description, path, serviceType, options }: ServiceArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { "@id": businessId },
    areaServed: { "@type": "AdministrativeArea", name: site.serviceArea },
    ...(options && options.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: options.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: o } })),
          },
        }
      : {}),
  };
}

/** Serialise for a <script type="application/ld+json"> without allowing </script> injection. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
