import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { NumberedRows } from "@/components/ui/NumberedRows";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Row = { n: string; title: string; body: string };
type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  rows: readonly Row[];
  tone?: "light" | "dark";
  bg?: "white" | "paper";
  children?: ReactNode;
};

/** Generic "heading + numbered rows" section (how we quote, storage, stages, checklist). */
export function NumberedList({ eyebrow, title, lede, rows, tone = "light", bg = "paper", children }: Props) {
  const dark = tone === "dark";
  return (
    <section
      data-theme={dark ? "dark" : undefined}
      className={cn("py-section", dark ? "bg-ink text-white" : bg === "paper" ? "bg-paper" : "border-t border-line bg-white")}
    >
      <Container>
        <SectionHeading layout="split" eyebrow={eyebrow} title={title} lede={lede} tone={tone} />
        <NumberedRows rows={rows} tone={tone} className="mt-block" />
        {children}
      </Container>
    </section>
  );
}
