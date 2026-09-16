import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Civil Construction - Complete Construction Support",
  description:
    "Our secondary service: civil construction execution, from the first foundation work to final finishing, with materials arranged alongside.",
  path: "/construction",
});

export default function ConstructionPage() {
  return (
    <>
      <PageHero
        eyebrow="Civil Construction"
        title="Complete Construction Support."
        lede="Our secondary service: civil construction execution, from the first foundation work to final finishing, with materials arranged alongside."
      />
      <CtaBand />
    </>
  );
}
