import { districts, whereWeWorkCopy } from "@/content/about";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhereWeWork() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <SectionHeading layout="split" eyebrow="Where we work" title="Karnataka-Wide Supply." lede={whereWeWorkCopy.lede} />
        <Reveal as="ul" className="mt-block flex flex-wrap gap-2.5" aria-label="Districts served">
          {districts.map((d) => (
            <li key={d}>
              <Chip variant="light" className="min-h-11 text-[13.5px]">
                {d}
              </Chip>
            </li>
          ))}
        </Reveal>
        <Reveal as="p" className="mt-6 max-w-[62ch] text-sm leading-[1.7] text-muted">
          {whereWeWorkCopy.footnote}
        </Reveal>
      </Container>
    </section>
  );
}
