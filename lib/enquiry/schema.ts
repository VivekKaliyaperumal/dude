import { z } from "zod";
import { estimatorProjectTypes, floorOptions, projectTypes } from "@/content/contact";
import { estimatorCategories } from "@/content/materials";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const optText = (max = 200) => z.preprocess(blankToUndefined, z.string().trim().max(max).optional());
const optEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(blankToUndefined, z.enum(values).optional());
const optNumber = (max = 100_000) =>
  z.preprocess(blankToUndefined, z.coerce.number().positive("Enter a number above zero.").max(max).optional());

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
  projectType: optEnum(projectTypes),
  material: optText(),
  quantity: optText(),
  deliveryLocation: optText(),
  message: optText(2000),
  page: optText(),
});

export const EstimateSchema = z.object({
  kind: z.literal("estimate"),
  projectType: optEnum(estimatorProjectTypes),
  city: optText(),
  plotLengthFt: optNumber(),
  plotWidthFt: optNumber(),
  floors: optEnum(floorOptions),
  builtUpSqft: optNumber(1_000_000),
  sumpCapacity: optText(),
  phone: phoneSchema,
  categories: z.array(z.enum(estimatorCategories)).max(estimatorCategories.length).default([]),
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

export const EnquirySchema = z.discriminatedUnion("kind", [QuoteSchema, EstimateSchema, ContactSchema]);
export type Enquiry = z.infer<typeof EnquirySchema>;

/** FormData -> plain object; repeated `categories` values become an array. */
export function formDataToObject(fd: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const categories: string[] = [];
  for (const [key, value] of fd.entries()) {
    if (typeof value !== "string") continue;
    if (key === "categories") categories.push(value);
    else out[key] = value;
  }
  out.categories = categories;
  return out;
}
