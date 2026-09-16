type ClassValue = string | false | null | undefined | 0;

/** Tiny class joiner — enough for this codebase, no dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Is this href handled by the Next.js router (internal path or in-page anchor)? */
export function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}
