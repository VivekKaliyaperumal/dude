import { trust } from "@/content/why";
import { Container } from "@/components/ui/Container";
import { PathIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-white" aria-label="Why choose us">
      <Container
        className="grid py-[clamp(18px,2vw,26px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}
      >
        {trust.map((t) => (
          <Reveal key={t.label} className="flex items-center gap-[11px] py-3.5 pr-[18px]">
            <PathIcon d={t.d} size={19} className="flex-none text-green" />
            <span className="text-[13.5px] font-semibold tracking-[-.005em] text-ink">{t.label}</span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
