import { routes } from "@/content/nav";
import { flags } from "@/content/flags";
import { materialsFaq } from "@/content/faq";
import { materialGuide, materialGuideCopy, storageCopy, storageTips } from "@/content/materials-guide";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { BrandOptions } from "@/components/sections/BrandOptions";
import { FaqSection } from "@/components/sections/FaqSection";
import { MaterialsFull } from "@/components/sections/MaterialsFull";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { NumberedList } from "@/components/sections/NumberedList";
import { SupplyProcessSection } from "@/components/sections/SupplyProcessSection";
import { JsonLd } from "@/components/ui/JsonLd";

const lede =
  "Cement, steel, sand, aggregates, blocks, bricks and ready mix concrete, through to plywood, laminates, hardware and other interior materials — sourced and coordinated through one team across Karnataka.";

export const metadata = buildMetadata({
  title: "Building Materials Supplier in Bengaluru",
  description:
    "Cement, TMT steel, M-sand, aggregates, bricks, blocks, RMC, finishing and interior materials from one team across Karnataka. Request an itemised quote.",
  path: "/materials",
});

export default function MaterialsPage() {
  return (
    <>
      <PageHero eyebrow="Construction materials" title="Materials, From Foundation to Finishing." lede={lede} />
      <MaterialsFull />
      {flags.brandOptions ? <BrandOptions /> : null}
      <NumberedCards
        eyebrow={materialGuideCopy.eyebrow}
        title={materialGuideCopy.title}
        lede={materialGuideCopy.lede}
        items={materialGuide.map((g) => ({ n: g.label, title: g.title, body: g.body }))}
        labelNumbers
        minCol={340}
      />
      <NumberedList eyebrow={storageCopy.eyebrow} title={storageCopy.title} lede={storageCopy.lede} rows={storageTips} />
      <SupplyProcessSection />
      <FaqSection items={materialsFaq} />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Materials", path: routes.materials }])} />
    </>
  );
}
