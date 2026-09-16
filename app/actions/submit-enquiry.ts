"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { site } from "@/content/site";
import { isRateLimited } from "@/lib/enquiry/rate-limit";
import { EnquirySchema, formDataToObject } from "@/lib/enquiry/schema";
import { deliverEnquiry } from "@/lib/enquiry/transport";
import type { EnquiryKind, EnquiryPayload, EnquiryState } from "@/lib/enquiry/types";

const KINDS: readonly EnquiryKind[] = ["quote", "estimate", "contact"];
const asKind = (v: unknown): EnquiryKind => (KINDS.includes(v as EnquiryKind) ? (v as EnquiryKind) : "quote");

/** The single server action behind the quote, estimate and contact forms. */
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const kind = asKind(formData.get("kind"));

  // 1. Honeypot: bots fill the hidden field. Pretend success, log nothing.
  if (String(formData.get("company_website") ?? "").trim() !== "") return { status: "ok", kind };

  // 2. Time trap: a human takes longer than 1.5 s. Skipped when the field is absent (no-JS clients).
  const started = Number(formData.get("startedAt"));
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 1500) return { status: "ok", kind };

  // 3. Rate limit per connection.
  if (isRateLimited(ip)) {
    return { status: "error", message: `Too many enquiries from this connection. Please call ${site.phone.display}.` };
  }

  // 4. Validate.
  const parsed = EnquirySchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>,
    };
  }

  // 5. Build the payload and hand it to the transport.
  const { kind: parsedKind, page, ...fields } = parsed.data;
  const payload: EnquiryPayload = {
    kind: parsedKind,
    receivedAt: new Date().toISOString(),
    page,
    fields,
    consent: "notice-v1",
    meta: {
      ipHash: createHash("sha256").update(ip).digest("hex").slice(0, 12),
      userAgent: h.get("user-agent") ?? "",
    },
  };

  const result = await deliverEnquiry(payload).catch((err: unknown) => {
    console.error("[enquiry] transport failed", err);
    return { ok: false };
  });
  if (!result.ok) {
    return {
      status: "error",
      message: `We could not send your enquiry. Please call or WhatsApp ${site.phone.display}.`,
    };
  }
  return { status: "ok", kind: parsedKind };
}
