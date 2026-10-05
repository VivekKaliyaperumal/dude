"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { AssistantPanel } from "./AssistantPanel";
import { useLiveSession } from "./useLiveSession";

/**
 * Floating "Ask dude" launcher. Sits 16px above the WhatsApp FAB on desktop (28 + 56 + 16 = 100px);
 * on phones the same 100px clears the 57px StickyBar and the hero caption row above it.
 * Opening the panel starts a Gemini Live session (inside the click, so audio may play); closing ends it.
 */
export function AssistantFab() {
  const [open, setOpen] = useState(false);
  const live = useLiveSession();
  const { start, end, speaking } = live;

  const close = useCallback(() => {
    setOpen(false);
    end();
  }, [end]);

  const toggle = () => {
    if (open) return close();
    setOpen(true);
    void start();
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? "Close dude" : "Ask dude, our voice assistant"}
        title="Ask dude"
        className={cn(
          "group animate-wa-pop fixed right-4 bottom-[100px] z-[80] grid h-14 w-14 place-items-center rounded-full shadow-fab transition-[background-color,transform] duration-250 hover:-translate-y-[3px] motion-reduce:transition-none nav:right-7",
          open ? "border border-dark-line-3 bg-ink text-white hover:bg-green-deep" : "p-[3px]",
        )}
      >
        {speaking ? (
          <span aria-hidden className="animate-wa-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-green [animation-delay:0s] motion-reduce:animate-none" />
        ) : null}
        {open ? (
          <Icon name="close" size={20} className="relative" />
        ) : (
          <>
            {/* Rotating green-gold ring and a soft gold glow; the avatar gives a small hello tilt every few seconds. */}
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full motion-safe:animate-dude-glow" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(var(--color-green),var(--color-gold),var(--color-green-tint),var(--color-green))] group-hover:[animation-duration:1.4s] motion-safe:animate-dude-ring"
            />
            <Image
              unoptimized
              src="/assistant/dude-avatar.jpg"
              alt=""
              width={56}
              height={56}
              className="relative h-full w-full rounded-full object-cover ring-1 ring-white motion-safe:animate-dude-hello"
            />
          </>
        )}
      </button>
      {open ? <AssistantPanel live={live} onClose={close} /> : null}
    </>
  );
}
