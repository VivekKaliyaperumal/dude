"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { observe } from "@/lib/reveal/observer";

type Tag = "div" | "section" | "article" | "p" | "span" | "h2" | "h3" | "h4" | "ul" | "ol" | "li" | "figure" | "header" | "footer";

type Props = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  /** Milliseconds; scaled 0.6x on phones and 1.2x on desktop like the prototype. */
  delay?: number;
  children?: ReactNode;
};

/** Fade-up on scroll. Content is visible without JS (see globals.css). */
export function Reveal({ as = "div", delay = 0, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, delay);
  }, [delay]);
  // All allowed tags accept the same HTML attributes; typing as "div" keeps the ref simple.
  const Tag = as as "div";
  return (
    <Tag ref={ref} data-reveal="" data-delay={delay} {...rest}>
      {children}
    </Tag>
  );
}
