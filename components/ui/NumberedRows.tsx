import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Row = { n: string; title: string; body: string };
type Props = { rows: readonly Row[]; tone?: "light" | "dark"; className?: string };

/** Numbered rows with hairline dividers (how we quote, storage, stages, checklist). */
export function NumberedRows({ rows, tone = "light", className }: Props) {
  const line = tone === "dark" ? "border-dark-line" : "border-line-2";
  return (
    <div className={cn("border-t", line, className)}>
      {rows.map((r, i) => (
        <Reveal
          key={r.n}
          delay={(i % 4) * 80}
          className={cn("grid grid-cols-[44px_1fr] items-start gap-4 border-b py-6 tight:grid-cols-[72px_1fr] tight:gap-6", line)}
        >
          <span className={cn("font-mono text-[26px] leading-none tracking-[-.03em]", tone === "dark" ? "text-gold" : "text-bronze")}>
            {r.n}
          </span>
          <div>
            <h3 className={cn("text-[19px] font-bold tracking-[-.02em]", tone === "dark" ? "text-white" : "text-ink")}>{r.title}</h3>
            <p className={cn("mt-2 max-w-[68ch] text-[14.5px] leading-[1.6]", tone === "dark" ? "text-on-dark" : "text-muted")}>{r.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
