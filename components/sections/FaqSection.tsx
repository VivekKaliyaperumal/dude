import { faqCopy, type FaqItem } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** FAQ list plus its FAQPage JSON-LD, built from the same items so the two never drift. */
export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <section className="border-t border-line bg-white py-section" aria-labelledby="faq-heading">
      <Container>
        <SectionHeading id="faq-heading" layout="split" eyebrow={faqCopy.eyebrow} title={faqCopy.title} lede={faqCopy.lede} />
        <div className="mt-block">
          <Faq items={items} />
        </div>
      </Container>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
