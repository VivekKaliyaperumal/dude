import Image from "next/image";
import { creditLinks, type SiteImage } from "@/content/images";
import { cn } from "@/lib/utils";

type Props = {
  image: SiteImage | null | undefined;
  /** next/image `sizes` hint, e.g. "(min-width: 1000px) 33vw, 100vw". */
  sizes: string;
  priority?: boolean;
  /** Extra classes on the <img> (object-fit is already cover). */
  imgClassName?: string;
  className?: string;
  credit?: boolean;
  /** Unsplash quality (default 70). Lower for very large hero photos. Ignored for own photos (fixed at build). */
  quality?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Fills its (relatively positioned) parent. Renders the credit a borrowed photo requires,
 * and an honest empty frame (logo watermark, no text) when no photo exists yet.
 */
export function ImageWithCredit({
  image,
  sizes,
  priority,
  imgClassName,
  className,
  credit = true,
  quality = 70,
  loading,
  fetchPriority,
}: Props) {
  if (!image) {
    return (
      <div aria-hidden className={cn("absolute inset-0 grid place-items-center bg-well", className)}>
        <Image unoptimized src="/logo-mark.png" alt="" width={120} height={120} className="w-[28%] max-w-[120px] opacity-[.08]" />
      </div>
    );
  }
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        quality={quality}
        className={cn("object-cover", imgClassName)}
      />
      {(credit && image.credit) || image.caption ? (
        <Credit credit={credit ? image.credit : undefined} caption={image.caption} />
      ) : null}
    </div>
  );
}

type CreditProps = {
  /** Photographer credit for a borrowed photo. Omit for own photos that only carry a caption. */
  credit?: SiteImage["credit"];
  /** Optional factual caption ("Project Elephant, Foxconn — Bengaluru"). */
  caption?: string;
  /** Pinned to the frame's bottom-left corner (default). Pass false to lay it out yourself. */
  floating?: boolean;
  className?: string;
};

/** The small mono chip: "[caption][ · ]Photo by <name> on <source>". Renders nothing if given neither. */
export function Credit({ credit, caption, floating = true, className }: CreditProps) {
  if (!credit && !caption) return null;
  const links = credit ? creditLinks(credit) : null;
  const linkCls = "text-white underline-offset-2 hover:underline focus-visible:underline";
  return (
    <span
      className={cn(
        "z-[1] bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-[.04em] text-on-dark backdrop-blur-[2px]",
        floating && "absolute bottom-2 left-2",
        className,
      )}
    >
      {/* Caption and credit together only fit from the 700px breakpoint; phones keep the credit alone. */}
      {caption ? (
        <span className={cn("text-white", credit && "hidden tight:inline")}>
          {caption}
          {credit ? " · " : null}
        </span>
      ) : null}
      {credit && links ? (
        <>
          Photo by{" "}
          <a href={links.photographer} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {credit.name}
          </a>{" "}
          on{" "}
          <a href={links.source} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {credit.source}
          </a>
        </>
      ) : null}
    </span>
  );
}
