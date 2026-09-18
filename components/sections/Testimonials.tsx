import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Client Voices". Only rendered when flags.testimonials is on and real quotes exist. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-t border-line bg-paper py-section-sm">
      <Container>
        <SectionHeading eyebrow="Client voices" title="What Clients Say." titleClassName="text-[clamp(30px,4.2vw,58px)]" />
        <div
          className="mt-block grid items-center gap-[clamp(16px,2vw,24px)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={`${t.who}-${i}`}
              as="figure"
              delay={i * 100}
              className={cn(
                "m-0 border bg-white p-panel transition-[transform,box-shadow] duration-[400ms] hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none",
                t.featured ? "border-green-tint shadow-lift split:-translate-y-2" : "border-line",
              )}
            >
              <span aria-hidden className="block font-mono text-[44px] leading-none text-bronze">
                &rdquo;
              </span>
              <blockquote className="mt-[18px] text-base leading-[1.7] text-mid">{t.quote}</blockquote>
              <figcaption className="mt-7 border-t border-line pt-[22px]">
                <p className="text-[15px] font-bold tracking-[-.015em] text-ink">{t.who}</p>
                <p className="mt-[5px] text-[13px] text-muted">{t.where}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
