import Link from "next/link";
import { routes } from "@/content/nav";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Mobile-only sticky bottom bar. The footer carries 57px of bottom padding below the nav breakpoint so this never covers its links. */
export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] grid grid-cols-[1fr_auto] gap-px border-t border-dark-line bg-ink nav:hidden">
      <Link href={routes.quote} className="bg-green-deep p-4 text-center text-[15px] font-semibold text-white">
        Get Free Quote
      </Link>
      <a
        href={site.phone.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid place-items-center bg-ink px-5 text-green"
      >
        <Icon name="whatsapp" size={20} />
      </a>
    </div>
  );
}
