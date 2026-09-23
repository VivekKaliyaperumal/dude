"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { primaryNav, routes } from "@/content/nav";
import { site } from "@/content/site";
import { useScrollMetrics } from "@/lib/hooks/useScrollMetrics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const shrunk = useScrollMetrics(progressRef, 60);

  // The menu remembers which route it was opened on, so a route change closes it without an effect.
  const [menu, setMenu] = useState<{ open: boolean; path: string }>({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const openMenu = useCallback(() => setMenu({ open: true, path: pathname }), [pathname]);
  const closeMenu = useCallback(() => setMenu({ open: false, path: pathname }), [pathname]);

  return (
    <>
      <header className="animate-fade-in-slow fixed inset-x-0 top-0 z-[90] border-b border-line bg-paper/86 backdrop-blur-[14px]">
        <div
          ref={progressRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px z-[2] h-0.5 origin-left scale-x-0 bg-gold"
        />
        <div
          className={cn(
            "container-site flex items-center gap-4 transition-[height] duration-[450ms] ease-out-expo tight:gap-7 motion-reduce:transition-none",
            shrunk ? "h-[68px]" : "h-[88px]",
          )}
        >
          <Link href="/" className="flex flex-none items-center text-inherit">
            <Wordmark strapline />
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-[clamp(14px,2vw,30px)] nav:flex">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative py-1.5 font-ui text-[15px] font-medium tracking-[.02em] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-gold transition-transform duration-[400ms] ease-out-expo",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="hidden flex-none items-center gap-2.5 nav:flex">
            <Button href={routes.quote} variant="green" size="sm">
              Get a Quote
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2.5 nav:hidden">
            <a
              href={site.phone.tel}
              aria-label={`Call ${site.phone.display}`}
              className="grid h-11 w-11 place-items-center border border-line bg-white text-green-deep"
            >
              <Icon name="phone" size={16} />
            </a>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center border border-line bg-ink p-0"
            >
              <span className="flex flex-col items-center">
                <span className="my-0.5 block h-[1.5px] w-4 bg-white" />
                <span className="my-0.5 block h-[1.5px] w-4 bg-green" />
                <span className="my-0.5 block h-[1.5px] w-4 bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
