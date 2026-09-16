import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLSpanElement> & {
  /** mono: tiny mono tag on cards. light: bordered pill on light bg. dark: bordered pill on dark bg. */
  variant?: "mono" | "light" | "dark";
};

const variants = {
  mono: "font-mono text-[10.5px] tracking-[.02em] text-mid border border-line-2 bg-white px-2 py-1",
  light:
    "text-[12.5px] font-medium text-mid border border-line-2 bg-white px-3.5 py-[9px] transition-colors hover:border-green",
  dark: "text-[12.5px] text-on-dark border border-dark-line-2 px-3.5 py-[9px] transition-colors hover:border-gold hover:text-white",
} as const;

export function Chip({ variant = "light", className, ...rest }: Props) {
  return <span className={cn("inline-flex items-center", variants[variant], className)} {...rest} />;
}
