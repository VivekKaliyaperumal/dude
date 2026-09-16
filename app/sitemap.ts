import type { MetadataRoute } from "next";
import { flags } from "@/content/flags";
import { routes } from "@/content/nav";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: string[] = [
    routes.home,
    routes.materials,
    routes.construction,
    routes.projects,
    routes.about,
    routes.contact,
    // Legal pages are noindex until approved wording is in place.
    ...(flags.legalBodies ? [routes.privacy, routes.terms] : []),
  ];
  return pages.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: path === routes.home ? "weekly" : "monthly",
    priority: path === routes.home ? 1 : path === routes.contact ? 0.9 : 0.7,
  }));
}
