import { routes } from "@/content/nav";
import { aboutCopy, howWeQuote, howWeQuoteCopy, whoWeWorkWith, whoWeWorkWithCopy } from "@/content/about";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { AboutDetail } from "@/components/sections/AboutDetail";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { NumberedList } from "@/components/sections/NumberedList";
import { QualityApproach } from "@/components/sections/QualityApproach";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { WhySection } from "@/components/sections/WhySection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "About Us — Materials & Construction, Bengaluru",
  description:
    "dude & Co. combines construction material supply and civil construction in Bengaluru, with quotations and supply decisions made with the build in mind.",
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
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: routes.about }])} />
    </>
  );
}
