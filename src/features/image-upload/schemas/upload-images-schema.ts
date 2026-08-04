import { z } from "zod";

export const maximumUploadImageCount = 20;
export const maximumUploadImageSizeInBytes = 20 * 1024 * 1024;

export const acceptedUploadImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const uploadImageFileSchema = z
  .custom<File>(
    (value) =>
      typeof File !== "undefined" && value instanceof File,
    {
      message: "O arquivo selecionado é inválido.",
    },
  )
  .superRefine((file, context) => {
    if (
      !acceptedUploadImageTypes.includes(
        file.type as (typeof acceptedUploadImageTypes)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message:
          "Formato não suportado. Use JPG, JPEG, PNG, WEBP ou GIF.",
      });
    }

    if (file.size > maximumUploadImageSizeInBytes) {
      context.addIssue({
        code: "custom",
        message: "A imagem deve ter no máximo 20 MB.",
      });
    }
  });