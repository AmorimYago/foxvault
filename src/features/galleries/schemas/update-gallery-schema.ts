import { z } from "zod";

export const updateGallerySchema = z.object({
  galleryId: z.string().cuid("Galeria inválida."),

  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da galeria.")
    .max(80, "O nome deve possuir no máximo 80 caracteres."),

  description: z
    .string()
    .trim()
    .max(300, "A descrição deve possuir no máximo 300 caracteres.")
    .transform((value) => value || null),

  visibility: z.enum(["PRIVATE", "SHARED", "PUBLIC"]),
});

export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;