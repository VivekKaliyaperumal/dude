import type { Metadata } from "next";
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
