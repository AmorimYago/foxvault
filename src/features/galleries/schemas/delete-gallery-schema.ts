import { z } from "zod";

export const deleteGallerySchema = z.object({
  galleryId: z.string().cuid("Galeria inválida."),
});

export type DeleteGalleryInput = z.infer<typeof deleteGallerySchema>;