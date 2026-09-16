import type { FaqItem } from "@/content/faq";
import { Reveal } from "./Reveal";

/** Two-column FAQ with gold top rules. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <dl
      className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))" }}
    >
      {items.map((f, i) => (
        <Reveal key={f.q} delay={(i % 2) * 100} className="border-t-2 border-gold pt-5">
          <dt className="text-[17px] font-bold tracking-[-.015em] text-ink">{f.q}</dt>
          <dd className="mt-2.5 text-[14.5px] leading-[1.65] text-muted">{f.a}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
