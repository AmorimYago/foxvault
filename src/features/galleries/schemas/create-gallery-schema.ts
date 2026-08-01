import { z } from "zod";

export const galleryVisibilitySchema = z.enum([
  "PRIVATE",
  "SHARED",
  "PUBLIC",
]);

export const createGallerySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da galeria.")
    .max(80, "O nome deve possuir no máximo 80 caracteres."),

  description: z
    .string()
    .trim()
    .max(300, "A descrição deve possuir no máximo 300 caracteres.")
    .transform((value) => value || undefined),

  visibility: galleryVisibilitySchema,
});

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;