import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  /** Minimum column width in px; columns auto-fit. */
  minCol?: number;
  tone?: "light" | "dark";
  /** auto-fit (default) stretches to fill; auto-fill keeps column width. */
  mode?: "auto-fit" | "auto-fill";
};

/** 1px hairline grid: cells sit on a `line` background with gap-px, like the prototype. */
export function HairlineGrid({ minCol = 360, tone = "light", mode = "auto-fit", className, style, ...rest }: GridProps) {
  const s: CSSProperties = { gridTemplateColumns: `repeat(${mode}, minmax(min(100%, ${minCol}px), 1fr))`, ...style };
  return (
    <div
      className={cn("grid gap-px border", tone === "dark" ? "bg-dark-line border-dark-line" : "bg-line border-line", className)}
      style={s}
      {...rest}
    />
  );
}

type CellProps = {
  /** Mono number or label shown above the title. */
  n?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  tone?: "light" | "dark";
  /** md: 26px bronze numeral, 19px title (Why grid). sm: 11px gold label, 16px title (process grid). */
  size?: "md" | "sm";
  /** numeral (default) or a small mono label such as "CEMENT". */
  nStyle?: "numeral" | "label";
  delay?: number;
  headingLevel?: "h3" | "h4";
  className?: string;
  children?: ReactNode;
};

export function HairlineCell({
  n,
  title,
  body,
  tone = "light",
  size = "md",
  nStyle = "numeral",
  delay = 0,
  headingLevel = "h3",
  className,
  children,
}: CellProps) {
  const H = headingLevel;
  return (
    <Reveal
      delay={delay}
      className={cn(
        "transition-colors duration-300 motion-reduce:transition-none",
        tone === "dark" ? "bg-ink hover:bg-dark-hover" : "bg-white hover:bg-card",
        size === "md" ? "p-[clamp(24px,2.6vw,36px)]" : "px-5 pt-6 pb-[30px]",
        className,
      )}
    >
      {n !== undefined ? (
        <span
          className={cn(
            "block font-mono",
            nStyle === "label"
              ? "text-[10px] tracking-[.16em] text-bronze"
              : size === "md"
                ? "text-[26px] tracking-[-.02em] text-bronze"
                : "text-[11px] tracking-[.14em] text-gold",
          )}
        >
          {n}
        </span>
      ) : null}
      <H
        className={cn(
          size === "md" ? "mt-3.5 text-[19px] font-bold tracking-[-.02em]" : "mt-3 text-base font-semibold tracking-[-.018em]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </H>
      {body ? (
        <p className={cn("mt-2.5 text-[13.5px] leading-[1.6]", tone === "dark" ? "text-on-dark-2" : "text-muted")}>{body}</p>
      ) : null}
      {children}
    </Reveal>
  );
}
