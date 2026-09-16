import { faqCopy, type FaqItem } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <section className="border-t border-line bg-white py-section" aria-labelledby="faq-heading">
      <Container>
        <SectionHeading id="faq-heading" layout="split" eyebrow={faqCopy.eyebrow} title={faqCopy.title} lede={faqCopy.lede} />
        <div className="mt-[clamp(32px,4vw,56px)]">
          <Faq items={items} />
        </div>
      </Container>
    </section>
  );
}
