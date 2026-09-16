import Image from "next/image";
import { finishingMaterials, materialsCopy, structuralMaterials } from "@/content/materials";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialCard } from "./MaterialCard";
import { materialsGridStyle } from "./MaterialsSection";

function GroupDivider({ label }: { label: string }) {
  return (
    <Reveal className="mt-[clamp(36px,5vw,64px)] flex items-baseline gap-3.5">
      <h3 className="eyebrow text-bronze">{label}</h3>
      <span aria-hidden className="h-px flex-1 self-center bg-line-2" />
    </Reveal>
  );
}

/** Materials page: all 9 structural + 11 finishing categories. */
export function MaterialsFull() {
  return (
    <section id="materials" className="relative overflow-hidden bg-paper py-section-lg">
      <div aria-hidden className="pointer-events-none absolute -bottom-[10%] -left-[18%] w-[min(760px,80vw)] opacity-[.07]">
        <Image unoptimized src="/logo-mark.png" alt="" width={760} height={760} className="block w-full" />
      </div>
      <Container className="relative">
        <SectionHeading
          layout="split"
          rule
          eyebrow="What we supply"
          title="Construction Materials, From Foundation to Finish."
          titleClassName="text-[clamp(30px,4.4vw,54px)] max-w-[22ch]"
          lede="Source essential construction materials through one coordinated team, with options across major material categories and brands."
        />
        <GroupDivider label="Structural materials" />
        <div className="mt-5 grid gap-[clamp(16px,1.6vw,24px)]" style={materialsGridStyle}>
          {structuralMaterials.map((m, i) => (
            <MaterialCard key={m.n} material={m} delay={(i % 3) * 90} />
          ))}
        </div>
        <GroupDivider label="Finishing & building materials" />
        <div className="mt-5 grid gap-[clamp(16px,1.6vw,24px)]" style={materialsGridStyle}>
          {finishingMaterials.map((m, i) => (
            <MaterialCard key={m.n} material={m} delay={(i % 3) * 90} />
          ))}
        </div>
        <Reveal as="p" className="mt-[clamp(30px,4vw,48px)] max-w-[70ch] border-t border-line-2 pt-[26px] text-sm text-muted">
          {materialsCopy.listFootnote}
        </Reveal>
      </Container>
    </section>
  );
}
