import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** stacked: eyebrow / h2 / lede. split: h2 left, lede right (aligned to baseline). row: h2 left, eyebrow right. */
  layout?: "stacked" | "split" | "row";
  size?: "h2" | "h2-sm";
  rule?: boolean;
  titleClassName?: string;
  ledeClassName?: string;
  className?: string;
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  layout = "stacked",
  size = "h2",
  rule = false,
  titleClassName,
  ledeClassName,
  className,
  tone = "light",
  id,
}: Props) {
  const titleCls = cn(
    size === "h2" ? "text-h2" : "text-h2-sm",
    "font-bold",
    tone === "dark" ? "text-white" : "text-ink",
    titleClassName,
  );
  const ledeCls = cn("text-base leading-relaxed", tone === "dark" ? "text-on-dark" : "text-muted", ledeClassName);

  if (layout === "row") {
    return (
      <Reveal className={cn("flex flex-wrap items-baseline justify-between gap-4", className)}>
        <h2 id={id} className={titleCls}>
          {title}
        </h2>
        <Eyebrow tone={tone === "dark" ? "on-dark" : "muted"}>{eyebrow}</Eyebrow>
      </Reveal>
    );
  }

  if (layout === "split") {
    return (
      <div
        className={cn("grid items-end gap-[clamp(20px,4vw,60px)]", className)}
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}
      >
        <Reveal>
          <Eyebrow rule={rule} tone={tone === "dark" ? "on-dark" : "muted"}>
            {eyebrow}
          </Eyebrow>
          <h2 id={id} className={cn("mt-4", titleCls)}>
            {title}
          </h2>
        </Reveal>
        {lede ? (
          <Reveal as="p" delay={120} className={cn("mb-2 max-w-[46ch]", ledeCls)}>
            {lede}
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <Reveal className={className}>
      <Eyebrow rule={rule} tone={tone === "dark" ? "on-dark" : "muted"}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className={cn("mt-[18px]", titleCls)}>
        {title}
      </h2>
      {lede ? <p className={cn("mt-[18px] max-w-[62ch]", ledeCls)}>{lede}</p> : null}
    </Reveal>
  );
}
