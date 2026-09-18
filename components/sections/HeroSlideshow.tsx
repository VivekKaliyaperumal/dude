"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ImageCredit } from "@/content/images";
import { Icon } from "@/components/ui/Icon";
import { Credit } from "@/components/ui/ImageWithCredit";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  /** Default (largest) rendition. */
  src: string;
  srcSet: string;
  alt: string;
  credit?: ImageCredit;
  caption?: string;
};

type Props = {
  slides: readonly HeroSlide[];
  /** `sizes` hint shared by every slide. */
  sizes: string;
  /** How long each photo stays before the crossfade (ms). */
  interval?: number;
};

/**
 * Full-bleed crossfading photo background for the home hero.
 *
 * - Only the first slide is server-rendered: it is the LCP image (preloaded by HomeHero).
 *   The rest mount after it has loaded, at low fetch priority, so they never compete with it.
 * - Auto-advances only while the hero is in view and the tab is visible; starts paused under
 *   prefers-reduced-motion. A pause/play control satisfies WCAG 2.2.2 (Pause, Stop, Hide).
 * - Each active slide drifts from scale 1 to 1.06 over its stay (a slow Ken Burns), and the
 *   crossfade is a plain opacity transition, so nothing here needs JS beyond the timer.
 * - The root must not sit inside a transformed/animated ancestor: that would open a stacking
 *   context and leave the credit / pause control beneath the hero copy container.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const readReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const serverReducedMotion = () => false;

// false during server render and hydration, true once the client has taken over — lets the first
// slide start at scale 1 in the HTML and drift to 1.06 after hydration, like the others do.
const subscribeNever = () => () => {};
const readHydrated = () => true;
const serverHydrated = () => false;

export function HeroSlideshow({ slides, sizes, interval = 7000 }: Props) {
  const many = slides.length > 1;
  const [active, setActive] = useState(0);
  const [extras, setExtras] = useState(false);
  const [running, setRunning] = useState(false);
  // null = follow the visitor's motion preference; true/false = they pressed the control.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  const hydrated = useSyncExternalStore(subscribeNever, readHydrated, serverHydrated);
  const paused = userPaused ?? reducedMotion;
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLImageElement>(null);

  // Mount the remaining slides once the first has landed (or after a grace period).
  useEffect(() => {
    if (!many) return;
    const img = firstRef.current;
    const timer = window.setTimeout(() => setExtras(true), img?.complete ? 0 : 2500);
    const onLoad = () => {
      window.clearTimeout(timer);
      setExtras(true);
    };
    img?.addEventListener("load", onLoad, { once: true });
    return () => {
      window.clearTimeout(timer);
      img?.removeEventListener("load", onLoad);
    };
  }, [many]);

  // Run only while the hero is on screen and the tab is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!many || !el) return;
    let inView = false;
    const update = () => setRunning(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [many]);

  useEffect(() => {
    if (!many || !extras || paused || !running) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [many, extras, paused, running, interval, slides.length]);

  const current = slides[active];

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => {
        if (i > 0 && !extras) return null;
        const on = i === active;
        return (
          // Plain <img> so HomeHero's single preload matches exactly (next/image would add a second, lower-priority one).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            ref={i === 0 ? firstRef : undefined}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes={sizes}
            alt={slide.alt}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={!on}
            className={cn(
              // Tailwind v4's scale-* utilities set the CSS `scale` property, so that is what drifts.
              "absolute inset-0 h-full w-full object-cover [transition:opacity_1.4s_ease,scale_9s_linear]",
              on ? "opacity-100" : "opacity-0",
              on && hydrated ? "scale-[1.06]" : "scale-100",
            )}
          />
        );
      })}

      <div className="absolute bottom-2 left-2 z-[1] flex max-w-[calc(100%-16px)] items-stretch gap-1">
        <Credit credit={current.credit} caption={current.caption} floating={false} />
        {many && extras ? (
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="grid w-7 place-items-center bg-ink/70 text-on-dark backdrop-blur-[2px] transition-colors hover:text-white focus-visible:text-white"
          >
            <Icon name={paused ? "play" : "pause"} size={12} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
