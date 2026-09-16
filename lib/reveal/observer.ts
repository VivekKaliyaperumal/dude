/**
 * One IntersectionObserver for every [data-reveal] element on the page, started once by
 * <RevealObserver> in the root layout. Mirrors the prototype: rootMargin -4% bottom,
 * threshold .04, per-element data-delay scaled 0.6x under 700px and 1.2x above.
 * A MutationObserver picks up elements added later (client navigations, form states).
 */
let io: IntersectionObserver | null = null;
let mo: MutationObserver | null = null;
let revealImmediately = false;

const delayScale = () => (window.innerWidth < 700 ? 0.6 : 1.2);
const reveal = (el: HTMLElement) => el.setAttribute("data-reveal", "in");

function getObserver(): IntersectionObserver {
  if (io) return io;
  io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = Math.round(parseInt(el.dataset.delay ?? "0", 10) * delayScale());
        el.style.transitionDelay = `${delay}ms`;
        reveal(el);
        obs.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -4% 0px", threshold: 0.04 },
  );
  return io;
}

function observe(el: HTMLElement) {
  if (el.getAttribute("data-reveal") === "in") return;
  // No "already observed" marker: IntersectionObserver.observe() is idempotent, and a marker
  // would survive the observer being torn down and restarted (React dev double-invokes effects).
  if (revealImmediately) {
    reveal(el);
    return;
  }
  getObserver().observe(el);
}

function scan(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="in"])').forEach(observe);
}

/** Start observing the document. Returns a cleanup function. */
export function startRevealObserver(): () => void {
  revealImmediately =
    typeof IntersectionObserver === "undefined" ||
    (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  scan(document);
  mo = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.matches("[data-reveal]")) observe(node);
        scan(node);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
  return () => {
    mo?.disconnect();
    io?.disconnect();
    mo = null;
    io = null;
  };
}
