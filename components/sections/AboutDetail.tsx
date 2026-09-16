import { aboutCopy, aboutKeyValues } from "@/content/about";
import { flags } from "@/content/flags";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { KeyValueGrid } from "./AboutSummary";

/** About page: key facts on the left, GST card (and testimonials, when real) on the right. */
export function AboutDetail() {
  const showTestimonials = flags.testimonials && testimonials.length > 0;
  return (
    <section className="bg-paper py-section">
      <Container
        className="grid items-start gap-[clamp(28px,4vw,64px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}
      >
        <Reveal>
          <Eyebrow>{aboutCopy.heroEyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.04] font-bold tracking-[-.033em] text-ink">
            Building More Than Structures.
          </h2>
          <p className="mt-[18px] max-w-[52ch] text-[16.5px] leading-[1.6] text-mid">{aboutCopy.summaryLede}</p>
          <KeyValueGrid items={aboutKeyValues} className="mt-8" />
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-4">
          <div className="flex items-start gap-4 border border-line bg-white p-[clamp(24px,3vw,36px)]">
            <Icon name="shield" size={26} className="flex-none text-green" />
            <div>
              <h3 className="text-[19px] font-bold tracking-[-.02em] text-ink">{aboutCopy.gstTitle}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">{aboutCopy.gstStatement}</p>
            </div>
          </div>
          {showTestimonials ? (
            <div className="border border-line bg-white p-[clamp(24px,3vw,36px)]">
              <h3 className="text-[19px] font-bold tracking-[-.02em] text-ink">What Clients Say</h3>
              <div className="mt-4 flex flex-col gap-4">
                {testimonials.map((t) => (
                  <figure key={t.who} className="m-0 border-t border-line pt-4">
                    <blockquote className="text-[14.5px] leading-[1.65] text-mid">{t.quote}</blockquote>
                    <figcaption className="mt-2 font-mono text-[10.5px] tracking-[.14em] text-muted uppercase">{t.who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
