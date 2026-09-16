export type EnquiryKind = "quote" | "estimate" | "contact";

export type EnquiryState =
  | { status: "idle" }
  | { status: "ok"; kind: EnquiryKind }
  | { status: "error"; message: string; errors?: Record<string, string[] | undefined> };

export const initialEnquiryState: EnquiryState = { status: "idle" };

export type EnquiryPayload = {
  kind: EnquiryKind;
  receivedAt: string;
  page?: string;
  fields: Record<string, unknown>;
  consent: "notice-v1";
  meta: { ipHash: string; userAgent: string };
};
