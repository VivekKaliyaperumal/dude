import type { CSSProperties } from "react";
import { constructionCopy, designTeam } from "@/content/construction";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Our design team" (Construction). Monogram cards, no photos by the owner's request. */
export function DesignTeam() {
  return (
    <section id="design-team" className="border-t border-line bg-paper py-section">
      <Container>
        <SectionHeading
          layout="split"
          eyebrow="Our design team"
          title="The People Behind Your Design."
          lede={constructionCopy.teamLede}
        />
        <div className="mt-block grid gap-[clamp(16px,2vw,24px)] split:grid-cols-2">
          {designTeam.map((m, i) => (
            <Reveal
              key={m.name}
              as="article"
              delay={i * 110}
              className="group relative flex flex-col border border-line bg-white p-panel transition-[transform,box-shadow] duration-[400ms] hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -top-px h-[3px] origin-left scale-x-[.18] bg-green transition-transform duration-[600ms] ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <header className="flex items-center gap-[clamp(14px,1.8vw,22px)]">
                <span
                  aria-hidden
                  className="grid size-[clamp(56px,6vw,72px)] shrink-0 place-items-center bg-ink font-mono text-[clamp(17px,1.8vw,21px)] font-medium tracking-[.08em] text-gold"
                >
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <p className="label-mono text-bronze">{m.role}</p>
                  <h3 className="mt-2 text-h3 font-bold text-ink">{m.name}</h3>
                </div>
              </header>

              {/* Column count follows the member's facts (COA only for registered architects), so no empty cell. */}
              <dl
                className="mt-[clamp(20px,2.4vw,30px)] grid grid-cols-1 border-y border-line tight:grid-cols-(--facts-cols)"
                style={{ "--facts-cols": `repeat(${m.facts.length}, minmax(0, 1fr))` } as CSSProperties}
              >
                {m.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between gap-4 border-line py-3 not-last:border-b tight:block tight:py-4 tight:not-last:border-r tight:not-last:border-b-0 tight:not-first:pl-4"
                  >
                    <dt className="label-mono text-muted">{f.k}</dt>
                    <dd className="text-[15px] font-semibold tracking-[-.01em] text-ink tight:mt-1.5">{f.v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-[clamp(18px,2vw,24px)] text-base leading-[1.7] text-mid">{m.bio}</p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-[clamp(18px,2vw,24px)]" aria-label="Areas of work">
                {m.tags.map((t) => (
                  <li key={t}>
                    <Chip variant="light">{t}</Chip>
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
