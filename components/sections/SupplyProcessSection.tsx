import { supplySteps } from "@/content/supply";
import { Container } from "@/components/ui/Container";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SupplyProcessSection() {
  return (
    <section className="overflow-hidden bg-paper py-section">
      <Container>
        <SectionHeading layout="row" size="h2-sm" eyebrow="Supply process" title="From Requirement to Site." />
        <ProcessSteps steps={supplySteps} className="mt-[clamp(34px,4vw,58px)]" />
      </Container>
    </section>
  );
}
