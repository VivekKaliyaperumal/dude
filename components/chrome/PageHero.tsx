import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Props = { eyebrow: ReactNode; title: ReactNode; lede?: ReactNode; className?: string };

/** Dark inner-page hero: gold eyebrow, h1, lede, faint 88px grid. */
export function PageHero({ eyebrow, title, lede, className }: Props) {
  return (
    <section
      data-theme="dark"
      className={cn(
        // Top padding clears the 88px fixed header: ~36px to spare at desktop widths, 28px at the 116px floor
        // (phones and ~1000px laptops, where 10vw dips below it).
        "relative overflow-hidden bg-ink pt-[clamp(116px,10vw,124px)] pb-[clamp(32px,4vw,52px)] text-white",
        className,
      )}
    >
      <div aria-hidden className="grid-overlay-hero pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="animate-up-in flex items-center gap-3" style={{ animationDelay: "0.05s", animationDuration: "0.8s" }}>
          <span aria-hidden className="h-px w-[30px] bg-gold" />
          <span className="eyebrow text-gold">{eyebrow}</span>
        </div>
        <h1 className="animate-up-in mt-5 max-w-[20ch] text-h1 font-bold" style={{ animationDelay: "0.15s" }}>
          {title}
        </h1>
        {lede ? (
          <p
            className="animate-up-in mt-5 max-w-[58ch] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-on-dark-2"
            style={{ animationDelay: "0.28s" }}
          >
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
