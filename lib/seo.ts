import type { Metadata } from "next";
import { flags } from "@/content/flags";
import { site } from "@/content/site";

export const siteUrl = site.url;

type Args = {
  title: string;
  description: string;
  path: string;
  /** Use the title verbatim instead of the "%s | dude & Co." template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex }: Args): Metadata {
  const url = new URL(path, siteUrl).toString();
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
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * schema.org LocalBusiness built only from verified facts in content/site.ts.
 * Deliberately omitted until confirmed: ratings, reviews, opening hours, price range,
 * geo coordinates, social profiles.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand.wordmark,
    alternateName: site.brand.copy,
    slogan: site.brand.tagline,
    description: site.description,
    url: siteUrl,
    logo: new URL("/logo-mark.png", siteUrl).toString(),
    image: new URL("/logo-mark.png", siteUrl).toString(),
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
  };
}

/** Serialise for a <script type="application/ld+json"> without allowing </script> injection. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
