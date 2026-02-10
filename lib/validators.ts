import { z } from "zod/v4";

// ── Step 1: Product ──────────────────────────────────────────────
export const productTypes = ["Taatsdeur", "Scharnierdeur", "Vast Paneel"] as const;

export const productSchema = z.object({
  productType: z.enum(productTypes),
});

// ── Step 2: Dimensions ──────────────────────────────────────────
export const dimensionsSchema = z.object({
  height: z
    .number({ error: "Vul een geldige hoogte in" })
    .min(2000, "Minimaal 2000mm")
    .max(3000, "Maximaal 3000mm"),
  width: z
    .number({ error: "Vul een geldige breedte in" })
    .min(300, "Minimaal 300mm")
    .max(3000, "Maximaal 3000mm"),
});

// ── Step 3: Options ─────────────────────────────────────────────
export const glassTypes = ["Helder", "Rookglas", "Melkglas"] as const;
export const finishTypes = ["Poedercoat Zwart", "Goud", "Brons"] as const;

export const optionsSchema = z.object({
  glassType: z.enum(glassTypes),
  finish: z.enum(finishTypes),
});

// ── Step 4: Contact ─────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Vul uw naam in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  phone: z.string().min(10, "Vul een geldig telefoonnummer in"),
  note: z.string().optional(),
});

// ── Combined (used on final submission) ─────────────────────────
export const quoteSchema = productSchema
  .merge(dimensionsSchema)
  .merge(optionsSchema)
  .merge(contactSchema);

export type QuoteData = z.infer<typeof quoteSchema>;

// Per-step schemas for step-by-step validation
export const stepSchemas = [
  productSchema,
  dimensionsSchema,
  optionsSchema,
  contactSchema,
] as const;
