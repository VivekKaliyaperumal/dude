import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { footerColumns, legalLinks } from "@/content/nav";
import { addressOneLine, site } from "@/content/site";
import { isInternalHref } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-footer pt-[clamp(48px,6vw,86px)] text-on-dark">
      <div aria-hidden className="pointer-events-none absolute -right-[8%] -bottom-[30%] w-[min(560px,70vw)] opacity-[.11]">
        <Image unoptimized src="/logo-mark.png" alt="" width={560} height={560} className="block w-full" />
      </div>
      <div className="container-site relative">
        <Reveal
          className="grid gap-[clamp(24px,3vw,44px)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))" }}
        >
          <div className="min-w-[220px]">
            <Wordmark tone="white" size={32} />
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-[1.6]">
              Construction materials and complete construction support, serving projects across Karnataka.
            </p>
            <p className="label-mono mt-[18px] text-gold">GST REGISTERED BUSINESS</p>
            <p className="mt-1.5 font-mono text-[10.5px] tracking-[.14em] text-on-dark-3">GSTIN {site.gstin}</p>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title.toLowerCase()}`}>
              <span className="font-mono text-[10px] tracking-[.16em] text-on-dark-3">{col.title}</span>
              <ul className="mt-4 flex flex-col gap-[9px]">
                {col.items.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>

        <div className="mt-[clamp(34px,4vw,56px)] flex flex-wrap items-center justify-between gap-3.5 border-t border-footer-line py-[22px]">
          <span className="text-xs text-on-dark-3">
            &copy; {year} {site.brand.copy} All rights reserved.
          </span>
          <span className="max-w-[60ch] text-xs text-on-dark-3">{addressOneLine}</span>
          <div className="flex gap-[18px]">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-on-dark-3 transition-colors hover:text-gold">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = "text-[13.5px] text-on-dark transition-colors hover:text-gold";
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
