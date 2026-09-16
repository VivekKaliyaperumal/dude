"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * One passive, rAF-coalesced scroll listener for the header.
 * - `shrunk` flips when scrollY passes `threshold` (state; boolean flips only).
 * - The progress bar is written straight to the DOM through `progressRef` (no re-render).
 */
export function useScrollMetrics(progressRef: RefObject<HTMLElement | null>, threshold = 60): boolean {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      setShrunk(y > threshold);
      const bar = progressRef.current;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progressRef, threshold]);

  return shrunk;
}
