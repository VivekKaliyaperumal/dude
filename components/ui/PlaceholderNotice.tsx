import type { ReactNode } from "react";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: ReactNode;
  children: ReactNode;
  cta?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
};

/** Honest "not yet" notice used where a flagged-off section would otherwise sit. */
export function PlaceholderNotice({ eyebrow, children, cta, tone = "light", className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border p-panel",
        tone === "dark" ? "border-dark-line-2 bg-ink text-white" : "border-line bg-white text-ink",
        className,
      )}
    >
      <Eyebrow tone={tone === "dark" ? "on-dark" : "muted"}>{eyebrow}</Eyebrow>
      <p className={cn("max-w-[62ch] text-[15px] leading-relaxed", tone === "dark" ? "text-on-dark" : "text-mid")}>{children}</p>
      {cta ? (
        <Button href={cta.href} variant={tone === "dark" ? "outline-dark" : "outline"} size="xs" className="self-start">
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}
