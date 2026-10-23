import { z } from "zod";
import { projectTypes } from "@/content/contact";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const optText = (max = 200) => z.preprocess(blankToUndefined, z.string().trim().max(max).optional());
const optEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(blankToUndefined, z.enum(values).optional());

/** Indian mobile numbers: 10 digits starting 6-9, optional +91 / 91 / 0 prefix. Normalised to +91XXXXXXXXXX. */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter your phone number.")
  .transform((raw, ctx) => {
    const digits = raw.replace(/[\s\-().]/g, "");
    const match = digits.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
    if (!match) {
      ctx.addIssue({ code: "custom", message: "Enter a 10-digit Indian mobile number." });
      return z.NEVER;
    }
    return `+91${match[1]}`;
  });

const nameSchema = z.string().trim().min(2, "Please enter your name.").max(80, "Please keep your name under 80 characters.");

export const QuoteSchema = z.object({
  kind: z.literal("quote"),
  name: nameSchema,
  phone: phoneSchema,
  location: optText(),
  message: optText(2000),
  page: optText(),
});

export const ContactSchema = z.object({
  kind: z.literal("contact"),
  name: nameSchema,
  phone: phoneSchema,
  email: z.preprocess(blankToUndefined, z.email("Enter a valid email address.").optional()),
  projectType: optEnum(projectTypes),
  location: optText(),
  requirement: optText(),
  message: optText(2000),
  page: optText(),
});

export const EnquirySchema = z.discriminatedUnion("kind", [QuoteSchema, ContactSchema]);
export type Enquiry = z.infer<typeof EnquirySchema>;

/** FormData -> plain object (string values only). */
export function formDataToObject(fd: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of fd.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}
