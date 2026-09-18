import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EstimatorForm } from "@/components/forms/EstimatorForm";

/** "Planning Your Build? Get a Free Material Estimate." (Home #resources). */
export function EstimatorSection() {
  return (
    <section id="resources" className="relative overflow-hidden bg-paper py-section">
      <div aria-hidden className="grid-overlay-ink pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal className="max-w-[60ch]">
          <Eyebrow rule>Free material estimate</Eyebrow>
          <h2 className="mt-4 text-h2-sm font-bold text-ink">Planning Your Build? Get a Free Material Estimate.</h2>
          <p className="mt-4 text-base leading-[1.6] text-muted">
            Share your basic project details and our team can help you understand the material requirements.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-block border border-line bg-white">
          <EstimatorForm />
        </Reveal>
      </Container>
    </section>
  );
}
