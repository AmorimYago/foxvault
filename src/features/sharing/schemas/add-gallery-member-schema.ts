import { z } from "zod";

export const addGalleryMemberSchema = z.object({
  galleryId: z.string().cuid("Galeria inválida."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Informe o e-mail da pessoa.")
    .email("Informe um e-mail válido."),

  role: z.enum(["EDITOR", "VIEWER"], {
    message: "Selecione uma permissão válida.",
  }),
});

export type AddGalleryMemberInput = z.infer<
  typeof addGalleryMemberSchema
>;