import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Construction Materials, From Foundation to Finishing",
  description:
    "Cement, steel, sand, aggregates, blocks, bricks and ready mix concrete — sourced and coordinated through one team across Karnataka.",
  path: "/materials",
});

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Construction Materials"
        title="Materials, From Foundation to Finishing."
        lede="Cement, steel, sand, aggregates, blocks, bricks and ready mix concrete — sourced and coordinated through one team across Karnataka."
      />
      <CtaBand />
    </>
  );
}
