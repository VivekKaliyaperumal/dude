import { jsonLdString } from "@/lib/seo";

/** One schema.org block, rendered in the page body as the Next.js JSON-LD guide recommends. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
