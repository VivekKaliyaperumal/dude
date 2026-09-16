import { haveHandy } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/chrome/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { QuoteSection } from "@/components/sections/QuoteSection";

const lede =
  "Share your requirement and we will come back with a clear, itemised quotation. No prices are published online — every quotation is prepared for the specific project.";

export const metadata = buildMetadata({
  title: "Get a Free Quote — Contact",
  description: lede,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Tell Us What Your Project Needs." lede={lede} />
      <QuoteSection tall />
      <NumberedCards
        eyebrow="Before you enquire"
        title="Have These Handy."
        lede="You do not need all of them. The more you share, the more precise the first quotation will be."
        items={haveHandy}
        minCol={320}
      />
      <ContactSection />
    </>
  );
}
