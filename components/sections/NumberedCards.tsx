import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { HairlineCell, HairlineGrid } from "@/components/ui/HairlineGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Item = { n: string; title: string; body: string };
type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  lede: string;
  items: readonly Item[];
  tone?: "light" | "dark";
  bg?: "white" | "paper";
  minCol?: number;
  /** Render the item number as a small mono label instead of a numeral. */
  labelNumbers?: boolean;
  children?: ReactNode;
};

/** Generic "heading + hairline grid of numbered cards" section used across inner pages. */
export function NumberedCards({ id, eyebrow, title, lede, items, tone = "light", bg = "white", minCol = 320, labelNumbers, children }: Props) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      data-theme={dark ? "dark" : undefined}
      className={cn("py-section", dark ? "bg-ink text-white" : bg === "paper" ? "bg-paper" : "border-t border-line bg-white")}
    >
      <Container>
        <SectionHeading layout="split" eyebrow={eyebrow} title={title} lede={lede} tone={tone} />
        <HairlineGrid tone={tone} minCol={minCol} className="mt-[clamp(32px,4vw,56px)]">
          {items.map((it, i) => (
            <HairlineCell
              key={it.n}
              tone={tone}
              n={it.n}
              nStyle={labelNumbers ? "label" : "numeral"}
              title={it.title}
              body={it.body}
              delay={(i % 3) * 110}
            />
          ))}
        </HairlineGrid>
        {children}
      </Container>
    </section>
  );
}
