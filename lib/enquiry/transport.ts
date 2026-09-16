import type { EnquiryPayload } from "./types";

/**
 * THE swap point for where enquiries go.
 *
 * Today this is a stub that logs the payload to the server console (visible in `pnpm dev`
 * output and in Vercel function logs). When the destination is decided, replace the body of
 * this function - e.g. send an email via Resend, append a row to a Google Sheet, or post to
 * the WhatsApp Cloud API - and select the transport with the ENQUIRY_TRANSPORT env var.
 * Keep the signature; nothing else in the codebase needs to change.
 */
export async function deliverEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean; id?: string }> {
  const transport = process.env.ENQUIRY_TRANSPORT ?? "console";
  switch (transport) {
    case "console":
    default:
      console.log("[enquiry]", JSON.stringify(payload, null, 2));
      return { ok: true };
  }
}
