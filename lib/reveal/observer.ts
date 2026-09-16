/**
 * One IntersectionObserver shared by every <Reveal> on the page.
 * Mirrors the prototype: rootMargin -4% bottom, threshold .04, per-element delay
 * scaled 0.6x under 700px and 1.2x above.
 */
let observer: IntersectionObserver | null = null;
const delays = new WeakMap<Element, number>();

function delayScale(): number {
  return window.innerWidth < 700 ? 0.6 : 1.2;
}

function reveal(el: HTMLElement) {
  el.setAttribute("data-reveal", "in");
}

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = Math.round((delays.get(el) ?? 0) * delayScale());
        el.style.transitionDelay = `${delay}ms`;
        reveal(el);
        obs.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -4% 0px", threshold: 0.04 },
  );
  return observer;
}

/** Start observing; returns a cleanup. Reveals immediately under reduced motion or without IO support. */
export function observe(el: HTMLElement, delay: number): (() => void) | undefined {
  if (el.getAttribute("data-reveal") === "in") return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof IntersectionObserver === "undefined") {
    reveal(el);
    return;
  }
  delays.set(el, delay);
  const obs = getObserver();
  obs.observe(el);
  return () => obs.unobserve(el);
}
