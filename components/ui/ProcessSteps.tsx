import { Reveal } from "./Reveal";

type Props = { steps: readonly string[]; className?: string };

/** "From Requirement to Site." — numbered cells with → arrows, hairline borders. */
export function ProcessSteps({ steps, className }: Props) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
        borderTop: "1px solid var(--color-line-2)",
        borderLeft: "1px solid var(--color-line-2)",
      }}
    >
      {steps.map((title, i) => (
        <Reveal
          key={title}
          delay={i * 110}
          className="relative flex min-h-[190px] flex-col border-r border-b border-line-2 bg-paper px-[22px] pt-[26px] pb-7 transition-colors duration-300 hover:bg-white motion-reduce:transition-none"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[30px] leading-none font-medium tracking-[-.04em] text-bronze">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="font-mono text-base text-on-dark-2">
              {i < steps.length - 1 ? "→" : ""}
            </span>
          </div>
          <h3 className="mt-auto pt-[34px] text-base leading-[1.3] font-semibold tracking-[-.015em] text-ink">{title}</h3>
        </Reveal>
      ))}
    </div>
  );
}
