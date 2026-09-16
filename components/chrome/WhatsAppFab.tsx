import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Desktop-only floating WhatsApp button (CSS breakpoint, no JS). */
export function WhatsAppFab() {
  return (
    <a
      href={site.phone.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="animate-wa-pop fixed right-7 bottom-7 z-[80] hidden h-14 w-14 place-items-center rounded-full bg-green text-white shadow-fab transition-[background-color,transform] duration-250 hover:-translate-y-[3px] hover:bg-ink motion-reduce:transition-none nav:grid"
    >
      <span
        aria-hidden
        className="animate-wa-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-green motion-reduce:animate-none"
      />
      <Icon name="whatsapp" size={28} className="relative" />
    </a>
  );
}
