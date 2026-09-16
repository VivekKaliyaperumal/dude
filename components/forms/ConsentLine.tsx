import Link from "next/link";
import { formCopy } from "@/content/contact";
import { routes } from "@/content/nav";
import { cn } from "@/lib/utils";

/** Consent notice under every submit button. Wording to confirm with the owner. */
export function ConsentLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted", className)}>
      {formCopy.consent}{" "}
      <Link href={routes.privacy} className="text-green-deep underline underline-offset-2">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
