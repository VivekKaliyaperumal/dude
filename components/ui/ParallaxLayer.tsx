"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Fraction of scrollY to translate by (prototype uses 0.035). */
  factor?: number;
  /** "y" translates vertically; "centred" keeps a translate(-50%,-50%) anchor and adds the offset. */
  mode?: "y" | "centred";
  children?: ReactNode;
};

/** Gentle scroll parallax. Only updates while near the viewport; off under reduced motion. */
export function ParallaxLayer({ factor = 0.035, mode = "y", className, style, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const run = () => {
      raf = 0;
      if (!visible) return;
      const y = Math.round(window.scrollY * factor);
      el.style.transform = mode === "centred" ? `translate(-50%, calc(-50% + ${y}px))` : `translateY(${y}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor, mode]);

  const base: CSSProperties = mode === "centred" ? { transform: "translate(-50%, -50%)" } : {};
  return (
    <div ref={ref} className={className} style={{ ...base, ...style }} {...rest}>
      {children}
    </div>
  );
}
