import { aboutCopy, howWeQuote, howWeQuoteCopy, whoWeWorkWith, whoWeWorkWithCopy } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { AboutDetail } from "@/components/sections/AboutDetail";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { NumberedList } from "@/components/sections/NumberedList";
import { QualityApproach } from "@/components/sections/QualityApproach";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { WhySection } from "@/components/sections/WhySection";

export const metadata = buildMetadata({
  title: "About — More Than a Material Supplier",
  description: aboutCopy.heroLede,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutCopy.heroEyebrow} title={aboutCopy.heroTitle} lede={aboutCopy.heroLede} />
      <WhySection id="about" />
      <QualityApproach />
      <AboutDetail />
      <NumberedCards
        eyebrow="Who we work with"
        title="Homeowners, Contractors and Design Teams."
        lede={whoWeWorkWithCopy.lede}
        items={whoWeWorkWith}
        minCol={300}
      />
      <WhereWeWork />
      <NumberedList
        tone="dark"
        eyebrow="How we quote"
        title="From Enquiry to Itemised Quotation."
        lede={howWeQuoteCopy.lede}
        rows={howWeQuote}
      />
      <CtaBand />
    </>
  );
}
