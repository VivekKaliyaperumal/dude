import { aboutCopy, homeKeyValues } from "@/content/about";
import { routes } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Building More Than Structures." key facts + GST strip (Home). */
export function AboutSummary() {
  return (
    <section className="border-t border-line bg-white py-section">
      <Container>
        <SectionHeading
          layout="split"
          eyebrow="About dude & Co."
          title="Building More Than Structures."
          titleClassName="text-[clamp(30px,4.2vw,58px)]"
          lede={aboutCopy.summaryLede}
          ledeClassName="text-[16.5px] text-mid max-w-[50ch]"
        />
        <KeyValueGrid items={homeKeyValues} className="mt-block" delay={160} />
        <GstStrip />
      </Container>
    </section>
  );
}

export function KeyValueGrid({
  items,
  className,
  delay = 0,
}: {
  items: readonly { k: string; v: string }[];
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={className}
      style={{
        display: "grid",
        // 380px minimum gives 3 columns in the 1320px container (6 facts = 2 full rows), 2 on tablets, 1 on phones.
        // At 300px the home grid had 4 columns and a second row of 2 cells beside 2 empty grey ones.
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: 1,
        background: "var(--color-line)",
        border: "1px solid var(--color-line)",
      }}
    >
      {items.map((a) => (
        <div key={a.k} className="bg-card px-[22px] py-[clamp(18px,2vw,24px)] transition-colors duration-300 hover:bg-white motion-reduce:transition-none">
          <span className="font-mono text-[10px] tracking-[.16em] text-bronze">{a.k}</span>
          <p className="mt-3 text-[17px] leading-[1.3] font-bold tracking-[-.018em] text-ink">{a.v}</p>
        </div>
      ))}
    </Reveal>
  );
}

function GstStrip() {
  return (
    <Reveal
      delay={220}
      data-theme="dark"
      className="mt-px grid items-center gap-[clamp(18px,3vw,40px)] bg-ink p-panel text-white"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
    >
      <div className="flex items-start gap-4">
        <Icon name="shield" size={28} className="flex-none text-green" />
        <div>
          <h3 className="text-[19px] font-bold tracking-[-.02em]">{aboutCopy.gstTitle}</h3>
          <p className="mt-2 max-w-[52ch] text-sm leading-[1.6] text-on-dark">{aboutCopy.gstStatement}</p>
        </div>
      </div>
      <Button href={routes.about} variant="outline-dark" arrow className="justify-self-start px-6 py-[15px] text-sm">
        More About Us
      </Button>
    </Reveal>
  );
}
