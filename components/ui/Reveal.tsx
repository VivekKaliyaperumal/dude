import { createElement, type HTMLAttributes, type ReactNode } from "react";

type Tag = "div" | "section" | "article" | "p" | "span" | "h2" | "h3" | "h4" | "ul" | "ol" | "li" | "figure" | "header" | "footer";

type Props = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  /** Milliseconds; scaled 0.6x on phones and 1.2x on desktop like the prototype. */
  delay?: number;
  children?: ReactNode;
};

/**
 * Fade-up on scroll. Renders plain markup (no client boundary); <RevealObserver> in the
 * root layout animates every [data-reveal] element. Content is visible without JS.
 */
export function Reveal({ as = "div", delay = 0, children, ...rest }: Props) {
  return createElement(as, { "data-reveal": "", "data-delay": delay || undefined, ...rest }, children);
}
