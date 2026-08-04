import { z } from "zod";

import {
  acceptedUploadImageTypes,
  maximumUploadImageCount,
  maximumUploadImageSizeInBytes,
} from "./upload-images-schema";

const acceptedContentTypes = new Set<string>(
  acceptedUploadImageTypes,
);

const confirmUploadItemSchema = z.object({
  imageId: z.string().uuid(
    "O identificador interno da imagem é inválido.",
  ),

  publicImageId: z.string().uuid(
    "O identificador público da imagem é inválido.",
  ),

  objectKey: z
    .string()
    .trim()
    .min(1, "A chave do objeto é obrigatória."),

  originalFilename: z
    .string()
    .trim()
    .min(1, "O nome do arquivo é obrigatório.")
    .max(255, "O nome do arquivo deve ter no máximo 255 caracteres."),

  contentType: z
    .string()
    .refine(
      (contentType) => acceptedContentTypes.has(contentType),
      "Formato de imagem não suportado.",
    ),

  sizeInBytes: z
    .number()
    .int()
    .positive("O tamanho do arquivo deve ser maior que zero.")
    .max(
      maximumUploadImageSizeInBytes,
      "A imagem deve ter no máximo 20 MB.",
    ),

  comment: z
    .string()
    .trim()
    .max(300, "O comentário deve ter no máximo 300 caracteres."),
});

export const confirmUploadsSchema = z.object({
  galleryId: z
    .string()
    .trim()
    .min(1, "A galeria é obrigatória."),

  uploads: z
    .array(confirmUploadItemSchema)
    .min(1, "Confirme pelo menos uma imagem.")
    .max(
      maximumUploadImageCount,
      `Você pode confirmar no máximo ${maximumUploadImageCount} imagens por vez.`,
    ),
});

export type ConfirmUploadsInput = z.infer<
  typeof confirmUploadsSchema
>;