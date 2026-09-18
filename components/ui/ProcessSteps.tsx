import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = { steps: readonly string[]; className?: string };

/**
 * "From Requirement to Site." Seven steps.
 * From the nav breakpoint: one fixed row of seven hairline cells with → arrows (seven columns, so no orphan cell).
 * Below it: compact numbered rows, one per step, instead of an auto-fit grid that left 4+3 or 2+2+2+1 layouts.
 */
export function ProcessSteps({ steps, className }: Props) {
  return (
    <div className={cn("border-t border-line-2 nav:grid nav:grid-cols-7 nav:border-l", className)}>
      {steps.map((title, i) => (
        <Reveal
          key={title}
          delay={i * 110}
          className="flex items-baseline gap-4 border-b border-line-2 bg-paper py-4 transition-colors duration-300 hover:bg-white motion-reduce:transition-none nav:min-h-[150px] nav:flex-col nav:items-stretch nav:gap-0 nav:border-r nav:px-[22px] nav:py-6"
        >
          <div className="flex w-11 flex-none items-center justify-between nav:w-auto">
            <span className="font-mono text-[22px] leading-none font-medium tracking-[-.04em] text-bronze nav:text-[30px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="hidden font-mono text-base text-on-dark-2 nav:inline">
              {i < steps.length - 1 ? "→" : ""}
            </span>
          </div>
          <h3 className="text-base leading-[1.3] font-semibold tracking-[-.015em] text-ink nav:mt-auto nav:pt-6">{title}</h3>
        </Reveal>
      ))}
    </div>
  );
}
