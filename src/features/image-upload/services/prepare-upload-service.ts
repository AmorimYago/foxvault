import {
  maximumUploadImageCount,
  uploadImageFileSchema,
} from "../schemas/upload-images-schema";
import {
  type PrepareUploadResult,
  type SelectedImage,
} from "../types/selected-image";

type PrepareUploadServiceInput = {
  files: File[];
  currentImages: SelectedImage[];
};

export function prepareUploadService({
  files,
  currentImages,
}: PrepareUploadServiceInput): PrepareUploadResult {
  const acceptedImages: SelectedImage[] = [];
  const validationMessages: string[] = [];

  const existingFileKeys = new Set(
    currentImages.map(({ file }) => createFileKey(file)),
  );

  const availableSlots =
    maximumUploadImageCount - currentImages.length;

  if (availableSlots <= 0) {
    return {
      acceptedImages,
      validationMessages: [
        `Você pode selecionar no máximo ${maximumUploadImageCount} imagens.`,
      ],
    };
  }

  const filesWithinLimit = files.slice(0, availableSlots);
  const ignoredFileCount = files.length - filesWithinLimit.length;

  if (ignoredFileCount > 0) {
    validationMessages.push(
      `${ignoredFileCount} ${
        ignoredFileCount === 1
          ? "imagem foi ignorada"
          : "imagens foram ignoradas"
      } porque o limite é de ${maximumUploadImageCount} arquivos.`,
    );
  }

  for (const file of filesWithinLimit) {
    const fileKey = createFileKey(file);

    if (existingFileKeys.has(fileKey)) {
      validationMessages.push(
        `${file.name}: esta imagem já foi selecionada.`,
      );

      continue;
    }

    const validationResult = uploadImageFileSchema.safeParse(file);

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message ??
        "A imagem selecionada é inválida.";

      validationMessages.push(`${file.name}: ${errorMessage}`);

      continue;
    }

    existingFileKeys.add(fileKey);

    acceptedImages.push({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      comment: "",
    });
  }

  return {
    acceptedImages,
    validationMessages,
  };
}

function createFileKey(file: File) {
  return [
    file.name,
    file.size,
    file.type,
    file.lastModified,
  ].join(":");
}