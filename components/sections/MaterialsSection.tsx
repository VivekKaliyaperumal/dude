import Image from "next/image";
import { homeMaterials, materialsCopy } from "@/content/materials";
import { routes } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialCard } from "./MaterialCard";

export const materialsGridStyle = { gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" } as const;

/** Home version: first six structural materials + "View All Materials". */
export function MaterialsSection() {
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
        <div className="mt-block grid gap-[clamp(16px,1.6vw,24px)]" style={materialsGridStyle}>
          {homeMaterials.map((m, i) => (
            <MaterialCard key={m.n} material={m} delay={(i % 3) * 90} />
          ))}
        </div>
        <Reveal className="mt-block flex flex-wrap items-center justify-between gap-4 border-t border-line-2 pt-5">
          <p className="max-w-[60ch] text-sm text-muted">{materialsCopy.homeFootnote}</p>
          <Button href={routes.materialsList} variant="ink" arrow className="px-[26px] py-[15px] text-[14.5px]">
            View All Materials
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
