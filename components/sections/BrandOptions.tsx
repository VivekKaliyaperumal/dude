import { brandGroups } from "@/content/brands";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Brands & Product Options". Only rendered when flags.brandOptions is on; empty groups are skipped. */
export function BrandOptions() {
  const groups = brandGroups.filter((g) => g.brands.length > 0);
  if (groups.length === 0) return null;
  return (
    <section className="border-t border-line bg-white py-section-sm">
      <Container>
        <SectionHeading
          eyebrow="Brand options"
          title="Brands & Product Options"
          titleClassName="text-[clamp(30px,4.2vw,58px)]"
          lede="We can help you source products from suitable brands based on your project requirements, specifications and budget."
        />
        <div className="mt-block flex flex-col gap-[clamp(28px,3.5vw,44px)]">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 90}>
              <div className="flex items-baseline gap-3.5">
                <span className="eyebrow text-bronze">{g.title}</span>
                <span aria-hidden className="h-px flex-1 self-center bg-line" />
              </div>
              <ul
                className="mt-3.5 grid gap-px border border-line bg-line"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))" }}
              >
                {g.brands.map((b) => (
                  <li
                    key={b}
                    className="grid min-h-[120px] place-items-center bg-card p-3.5 text-center text-[15px] font-semibold text-ink transition-colors hover:bg-white"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
