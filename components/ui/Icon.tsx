import type { SVGProps } from "react";

type Name = "phone" | "phone-handset" | "whatsapp" | "whatsapp-outline" | "shield" | "check-circle" | "close";

type Props = SVGProps<SVGSVGElement> & { name: Name; size?: number };

const WHATSAPP_PATH =
  "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.45-.72-2.93-1.15-4.77-4.2-4.91-4.4-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.29.57-.36.77-.36.19 0 .39 0 .56.01.19.01.44-.07.68.53.24.6.82 2.06.89 2.2.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.45.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.19-.29.39-.24.65-.15.27.1 1.71.81 2 .95.29.15.49.22.56.34.07.12.07.7-.17 1.38Z";

/** Inline SVG icons lifted from the prototype. Stroke icons inherit `currentColor`. */
export function Icon({ name, size = 16, ...rest }: Props) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...rest };
  switch (name) {
    case "phone":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a16 16 0 0 1-16-16Z" />
        </svg>
      );
    case "phone-handset":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.7}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} fill="currentColor">
          <path d={WHATSAPP_PATH} />
        </svg>
      );
    case "whatsapp-outline":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.7}>
          <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5Z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12.5 2.6 2.5L16 9.5" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
  }
}

/** Single-path stroke icon (trust strip icons carry their own path data). */
export function PathIcon({ d, size = 19, ...rest }: SVGProps<SVGSVGElement> & { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      focusable={false}
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
