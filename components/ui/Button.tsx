import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isInternalHref } from "@/lib/utils";

export type ButtonVariant =
  | "green" // brand fill; hover → ink (light bg) or white (dark bg)
  | "ink" // ink fill; hover → green
  | "white" // white fill on dark; hover → green
  | "outline" // hairline on light bg
  | "outline-dark" // hairline on dark bg
  | "outline-green"; // green hairline on dark bg

type Size = "xs" | "sm" | "md" | "lg";

// Labels may wrap (centred) below `tight`, where long CTAs outgrow the ~284-354px content column.
const base =
  "inline-flex items-center justify-center gap-2.5 text-center font-semibold cursor-pointer transition-colors duration-300 tight:whitespace-nowrap motion-reduce:transition-none";

const variants: Record<ButtonVariant, string> = {
  // Deeper brand green for white-on-green text: 6:1 contrast (the lighter #409804 is 3.7:1, below AA).
  green: "bg-green-deep text-white hover:bg-ink dark-section:hover:bg-white dark-section:hover:text-ink",
  ink: "bg-ink text-white hover:bg-green-deep",
  white: "bg-white text-ink hover:bg-green-deep hover:text-white",
  outline: "border border-line-2 text-ink hover:border-green hover:text-green-deep",
  "outline-dark": "border border-dark-line-3 text-white hover:border-green hover:text-green",
  "outline-green": "border border-green text-green hover:bg-green-deep hover:text-white",
};

const sizes: Record<Size, string> = {
  xs: "text-[13.5px] px-[22px] py-3.5",
  sm: "font-ui text-[13px] tracking-[.02em] px-5 py-3",
  md: "text-[15px] px-[30px] py-[17px]",
  lg: "text-[15px] px-8 py-[18px]",
};

type Common = {
  variant?: ButtonVariant;
  size?: Size;
  /** Append the mono → arrow. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type NativeProps = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = LinkProps | NativeProps;

export function Button({ variant = "green", size = "md", arrow, className, children, ...rest }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden className="font-mono">
          →
        </span>
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof Common>;
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          {content}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { href: _unused, type = "button", ...buttonRest } = rest as Omit<NativeProps, keyof Common>;
  void _unused;
  return (
    <button type={type} className={cls} {...buttonRest}>
      {content}
    </button>
  );
}
