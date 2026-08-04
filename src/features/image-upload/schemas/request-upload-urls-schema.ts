import { z } from "zod";

import {
  acceptedUploadImageTypes,
  maximumUploadImageCount,
  maximumUploadImageSizeInBytes,
} from "./upload-images-schema";

const acceptedContentTypes = new Set<string>(
  acceptedUploadImageTypes,
);

const requestUploadImageSchema = z.object({
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

export const requestUploadUrlsSchema = z.object({
  galleryId: z
    .string()
    .trim()
    .min(1, "A galeria é obrigatória."),

  images: z
    .array(requestUploadImageSchema)
    .min(1, "Selecione pelo menos uma imagem.")
    .max(
      maximumUploadImageCount,
      `Você pode enviar no máximo ${maximumUploadImageCount} imagens por vez.`,
    ),
});

export type RequestUploadUrlsInput = z.infer<
  typeof requestUploadUrlsSchema
>;