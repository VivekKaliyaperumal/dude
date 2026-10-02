import type { MetadataRoute } from "next";
import { flags } from "@/content/flags";
import { materialPages } from "@/content/material-pages";
import { materialHref, routes } from "@/content/nav";
import { siteUrl } from "@/lib/seo";

/**
 * Last real content change per route (dd-MMM-yyyy in comments). A fixed date, not the build time,
 * so search engines are not told every page changed on each deploy. Update it when a page's copy changes.
 */
const updated: Record<string, string> = {
  [routes.home]: "2026-10-02", // 02-Oct-2026 SEO pass
  [routes.materials]: "2026-10-02",
  [routes.construction]: "2026-10-02",
  [routes.projects]: "2026-09-16",
  [routes.about]: "2026-10-02",
  [routes.contact]: "2026-10-02",
  [routes.privacy]: "2026-09-16",
  [routes.terms]: "2026-09-16",
};
const materialPagesUpdated = "2026-10-02";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: string[] = [
    routes.home,
    routes.materials,
    ...materialPages.map((p) => materialHref(p.slug)),
    routes.construction,
    // Projects and legal pages are noindex until real projects / approved wording are in place.
    ...(flags.projects ? [routes.projects] : []),
    routes.about,
    routes.contact,
    ...(flags.legalBodies ? [routes.privacy, routes.terms] : []),
  ];
  return pages.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: updated[path] ?? materialPagesUpdated,
    changeFrequency: path === routes.home ? "weekly" : "monthly",
    priority: path === routes.home ? 1 : path === routes.contact ? 0.9 : path.startsWith(`${routes.materials}/`) ? 0.8 : 0.7,
  }));
}
