import { why } from "@/content/why";
import { Container } from "@/components/ui/Container";
import { HairlineCell, HairlineGrid } from "@/components/ui/HairlineGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { id?: string };

export function WhySection({ id }: Props) {
  return (
    <section id={id} className="border-t border-line bg-white py-section">
      <Container>
        <SectionHeading
          layout="split"
          eyebrow="Why dude & Co."
          title="More Than a Material Supplier."
          titleClassName="text-[clamp(30px,4.2vw,52px)]"
          lede="We understand construction from the material stage to the actual site."
          ledeClassName="max-w-[42ch]"
        />
        <HairlineGrid minCol={360} className="mt-block">
          {why.map((w, i) => (
            <HairlineCell key={w.n} n={w.n} title={w.title} body={w.body} delay={(i % 3) * 90} />
          ))}
        </HairlineGrid>
      </Container>
    </section>
  );
}
