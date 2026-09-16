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
};

/**
 * Fills its (relatively positioned) parent. Renders the Unsplash credit the licence asks for,
 * and an honest empty frame (logo watermark, no text) when no photo exists yet.
 */
export function ImageWithCredit({ image, sizes, priority, imgClassName, className, credit = true }: Props) {
  if (!image) {
    return (
      <div aria-hidden className={cn("absolute inset-0 grid place-items-center bg-well", className)}>
        <Image src="/logo-mark.png" alt="" width={120} height={120} className="w-[28%] max-w-[120px] opacity-[.08]" />
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
        quality={70}
        className={cn("object-cover", imgClassName)}
      />
      {credit && image.credit ? <Credit credit={image.credit} /> : null}
    </div>
  );
}

function Credit({ credit }: { credit: NonNullable<SiteImage["credit"]> }) {
  const links = creditLinks(credit);
  const linkCls = "text-white underline-offset-2 hover:underline focus-visible:underline";
  return (
    <span className="absolute bottom-2 left-2 z-[1] bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-[.04em] text-on-dark backdrop-blur-[2px]">
      Photo by{" "}
      <a href={links.photographer} target="_blank" rel="noopener noreferrer" className={linkCls}>
        {credit.name}
      </a>{" "}
      on{" "}
      <a href={links.source} target="_blank" rel="noopener noreferrer" className={linkCls}>
        {credit.source}
      </a>
    </span>
  );
}
