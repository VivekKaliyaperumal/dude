"use client";

import Link from "next/link";
import { useRef } from "react";
import { primaryNav, routes } from "@/content/nav";
import { site } from "@/content/site";
import { useBodyScrollLock } from "@/lib/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);
  useFocusTrap(ref, open, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-theme="dark"
      className="animate-fade-in fixed inset-0 z-[95] flex flex-col bg-ink px-[clamp(18px,6vw,40px)] py-[26px] text-white"
    >
      <div className="flex items-center justify-between">
        <Wordmark tone="white" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          data-autofocus
          className="grid h-11 w-11 place-items-center border border-dark-line-4 bg-transparent text-white"
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <nav aria-label="Mobile" className="mt-11 flex flex-col">
        {primaryNav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="animate-up-in border-b border-dark-line py-3.5 text-[clamp(26px,8vw,34px)] font-semibold tracking-[-.02em] text-white"
            style={{ animationDelay: `${i * 40}ms`, animationDuration: "0.6s" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3 pt-7">
        <Link href={routes.quote} onClick={onClose} className="bg-green p-[17px] text-center font-semibold text-white">
          Get a Free Quote
        </Link>
        <a
          href={site.phone.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-dark-line-4 p-[17px] text-center font-semibold text-white"
        >
          Chat on WhatsApp
        </a>
        <a href={site.phone.tel} className="text-center font-mono text-[11px] tracking-[.1em] text-on-dark-2">
          {site.phone.display}
        </a>
      </div>
    </div>
  );
}
