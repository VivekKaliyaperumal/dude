import { twoWays, twoWaysCopy } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Supply Only, or Supply and Build." light PRIMARY panel + dark SECONDARY panel. */
export function TwoWaysWeWork() {
  return (
    <section className="border-t border-line bg-white py-section">
      <Container>
        <SectionHeading layout="split" eyebrow="Two ways we work" title="Supply Only, or Supply and Build." lede={twoWaysCopy.lede} />
        <div
          className="mt-[clamp(32px,4vw,56px)] grid gap-[clamp(16px,2vw,24px)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}
        >
          {twoWays.map((w, i) => {
            const dark = i === 1;
            return (
              <Reveal
                key={w.label}
                delay={i * 120}
                data-theme={dark ? "dark" : undefined}
                className={cn("border p-[clamp(26px,3.4vw,44px)]", dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink")}
              >
                <span className={cn("font-mono text-[10.5px] tracking-[.16em]", dark ? "text-on-dark-2" : "text-bronze")}>{w.label}</span>
                <h3 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-.025em]">{w.title}</h3>
                <p className={cn("mt-3.5 text-[15px] leading-[1.6]", dark ? "text-on-dark" : "text-muted")}>{w.body}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {w.points.map((p) => (
                    <li key={p} className={cn("flex gap-3 text-[14.5px] leading-[1.5]", dark ? "text-on-dark" : "text-mid")}>
                      <span aria-hidden className="text-gold">
                        &mdash;
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
