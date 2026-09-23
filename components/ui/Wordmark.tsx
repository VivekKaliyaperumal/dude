import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = { tone?: "ink" | "white"; strapline?: boolean; size?: number; className?: string };

export function Wordmark({ tone = "ink", strapline = false, size = 34, className }: Props) {
  return (
    <span className={cn("flex items-center gap-[11px]", className)}>
      <Image
        unoptimized
        src="/logo-mark.png"
        alt=""
        width={size}
        height={size}
        className="block object-contain"
        style={{ width: size, height: size }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-wordmark small-caps text-[20px] font-semibold tracking-[.04em]",
            tone === "white" ? "text-white" : "text-ink",
          )}
        >
          {site.brand.wordmark}
        </span>
        {strapline ? (
          <span className="mt-1 hidden font-mono text-[8.5px] tracking-[.22em] text-muted min-[25rem]:block">{site.brand.strapline}</span>
        ) : null}
      </span>
    </span>
  );
}
