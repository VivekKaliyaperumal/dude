import { images } from "@/content/images";
import { quality } from "@/content/why";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { Reveal } from "@/components/ui/Reveal";

/** "Right Material. Right Application. Right Result." (Home, About). */
export function QualityApproach() {
  return (
    <section className="relative overflow-hidden bg-white py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.05]"
        style={{
          backgroundImage: "linear-gradient(#565656 1px, transparent 1px), linear-gradient(90deg, #565656 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <Container
        className="relative grid items-center gap-[clamp(28px,4vw,64px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}
      >
        <Reveal className="relative aspect-[4/3] min-h-[260px]">
          <ImageWithCredit image={images.quality} sizes="(min-width: 1000px) 50vw, 100vw" />
          <span className="absolute -top-px -left-px bg-gold px-3.5 py-[9px] font-mono text-[10.5px] tracking-[.16em] text-ink">
            MATERIAL &amp; APPLICATION
          </span>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>Quality approach</Eyebrow>
          <h2 className="mt-3.5 max-w-[22ch] text-[clamp(26px,3.6vw,44px)] leading-[1.06] font-bold tracking-[-.032em] text-ink">
            Right Material. Right Application. Right Result.
          </h2>
          <ul className="mt-[26px] border-t border-line">
            {quality.map((q) => (
              <li key={q} className="flex items-center gap-3.5 border-b border-line py-4">
                <span aria-hidden className="h-1.5 w-1.5 flex-none bg-gold" />
                <span className="text-[15.5px] font-semibold tracking-[-.012em] text-ink">{q}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
