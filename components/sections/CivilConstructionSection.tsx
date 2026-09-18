import { constructionCopy, constructionProcess, scope } from "@/content/construction";
import { images } from "@/content/images";
import { routes } from "@/content/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HairlineCell, HairlineGrid } from "@/components/ui/HairlineGrid";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  /**
   * Home shows the parallax photo banner with the heading on it. The Construction page passes false:
   * its PageHero already introduces the page, so the heading moves to the top of the body instead
   * and the page no longer opens with two stacked dark heroes.
   */
  banner?: boolean;
};

/** Dark "Need More Than Materials?" block: banner (optional), primary/secondary box, scope chips, 9-step process. */
export function CivilConstructionSection({ banner = true }: Props) {
  const heading = (
    <>
      <Reveal>
        <Eyebrow tone="gold">Secondary service — Civil construction</Eyebrow>
      </Reveal>
      <Reveal
        as="h2"
        delay={100}
        className={cn("mt-3.5 font-bold", banner ? "text-[clamp(30px,5vw,64px)] leading-[1.02] tracking-[-.035em]" : "text-h2")}
      >
        Need More Than Materials?
      </Reveal>
    </>
  );

  return (
    <section
      id="construction"
      data-theme="dark"
      className={cn("relative overflow-hidden bg-ink text-white", !banner && "border-t border-dark-line")}
    >
      {banner ? (
        <div className="relative h-[clamp(240px,30vw,400px)] overflow-hidden">
          <ParallaxLayer factor={0.035} className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
            <ImageWithCredit image={images.civilBanner} sizes="100vw" />
          </ParallaxLayer>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(27_28_26/.55),rgb(27_28_26/.9))]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end">
            <Container className="pb-[clamp(24px,3vw,40px)]">{heading}</Container>
          </div>
        </div>
      ) : (
        <Container className="pt-section">{heading}</Container>
      )}

      <Container
        className="grid gap-[clamp(28px,4vw,64px)] pt-[clamp(36px,4vw,56px)] pb-[clamp(40px,5vw,64px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
      >
        <Reveal>
          <p className="max-w-[40ch] text-[clamp(17px,1.8vw,22px)] leading-[1.5] font-medium tracking-[-.015em] text-white">
            {constructionCopy.statement}
          </p>
          <div className="mt-[34px] grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 border border-dark-line-2 p-[22px]">
            <div>
              <span className="font-mono text-[10px] tracking-[.16em] text-on-dark-2">PRIMARY</span>
              <p className="mt-[7px] text-[15px] font-semibold text-green">MATERIAL SUPPLY</p>
            </div>
            <span aria-hidden className="text-xl text-on-dark-2">
              +
            </span>
            <div>
              <span className="font-mono text-[10px] tracking-[.16em] text-on-dark-2">SECONDARY</span>
              <p className="mt-[7px] text-[15px] font-semibold text-white">CONSTRUCTION EXECUTION</p>
            </div>
          </div>
          <Button href={routes.contactForm} variant="green" arrow className="mt-7 px-7">
            Discuss Your Construction Project
          </Button>
        </Reveal>
        <Reveal delay={120}>
          <span className="block font-mono text-[10.5px] tracking-[.16em] text-on-dark-2">SCOPE OF WORK</span>
          <ul className="mt-4 flex flex-wrap gap-2">
            {scope.map((s) => (
              <li key={s}>
                <Chip variant="dark">{s}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="border-t border-dark-line">
        <Container className="py-[clamp(36px,4.5vw,60px)]">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3.5">
            <h3 className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-.03em]">Complete Construction Process</h3>
            <span className="eyebrow text-muted">01 — 09</span>
          </Reveal>
          {/* Nine steps: fixed 3 x 3 from 700px (auto-fit gave 2 columns and an orphan ninth cell on tablets). */}
          <HairlineGrid tone="dark" columns="grid-cols-1 tight:grid-cols-3" className="mt-6">
            {constructionProcess.map((step, i) => (
              <HairlineCell
                key={step}
                tone="dark"
                size="sm"
                headingLevel="h4"
                n={String(i + 1).padStart(2, "0")}
                title={step}
                delay={(i % 5) * 80}
              />
            ))}
          </HairlineGrid>
        </Container>
      </div>
    </section>
  );
}
