import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Draw the short gold rule before the label (30px; "long" = 38px, hero). */
  rule?: boolean | "long";
  tone?: "muted" | "gold" | "bronze" | "on-dark";
  className?: string;
  as?: "span" | "p" | "div";
};

const tones = {
  muted: "text-muted",
  gold: "text-gold",
  bronze: "text-bronze",
  "on-dark": "text-on-dark-2",
} as const;

export function Eyebrow({ children, rule, tone = "muted", className, as: Tag = "span" }: Props) {
  if (!rule) {
    return <Tag className={cn("eyebrow block", tones[tone], className)}>{children}</Tag>;
  }
  return (
    <Tag className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className={cn("h-px bg-gold", rule === "long" ? "w-[38px]" : "w-[30px]")} />
      <span className={cn("eyebrow", tones[tone])}>{children}</span>
    </Tag>
  );
}
