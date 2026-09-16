"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import type { EnquiryKind } from "@/lib/enquiry/types";

/** Form kind, originating page, time trap and honeypot. */
export function HiddenFields({ kind }: { kind: EnquiryKind }) {
  const pathname = usePathname();
  const hpId = useId();
  return (
    <>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="page" value={pathname} />
      <input
        type="hidden"
        name="startedAt"
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now());
        }}
      />
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={hpId}>Leave this field empty</label>
        <input id={hpId} type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
    </>
  );
}
