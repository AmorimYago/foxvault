import "server-only";

import { galleryRepository } from "@/features/galleries/repositories/gallery-repository";
import {
  generateObjectKey,
  getObjectMetadata,
} from "@/lib/storage";

import { imageUploadRepository } from "../repositories/image-upload-repository";
import { type ConfirmUploadsInput } from "../schemas/confirm-uploads-schema";
import { type ConfirmedUpload } from "../types/confirm-uploads";

type ConfirmUploadsServiceInput = {
  userId: string;
  input: ConfirmUploadsInput;
};

type ConfirmUploadsServiceResult =
  | {
      status: "SUCCESS";
      confirmedUploads: ConfirmedUpload[];
    }
  | {
      status: "UNAUTHORIZED";
    }
  | {
      status: "INVALID_UPLOAD";
      message: string;
    };

export async function confirmUploadsService({
  userId,
  input,
}: ConfirmUploadsServiceInput): Promise<ConfirmUploadsServiceResult> {
  const gallery = await galleryRepository.findUploadAccess({
    galleryId: input.galleryId,
    userId,
  });

  if (!gallery) {
    return {
      status: "UNAUTHORIZED",
    };
  }

  for (const upload of input.uploads) {
    const expectedObjectKey = generateObjectKey({
      publicImageId: upload.publicImageId,
      contentType: upload.contentType,
    });

    if (upload.objectKey !== expectedObjectKey) {
      return {
        status: "INVALID_UPLOAD",
        message:
          "Uma das imagens possui uma chave de armazenamento inválida.",
      };
    }

    let objectMetadata;

    try {
      objectMetadata = await getObjectMetadata({
        objectKey: expectedObjectKey,
      });
    } catch (error) {
      console.error(
        `Failed to read R2 object metadata for ${expectedObjectKey}:`,
        error,
      );

      return {
        status: "INVALID_UPLOAD",
        message:
          "Uma das imagens não foi encontrada no armazenamento. Tente enviá-la novamente.",
      };
    }

    if (objectMetadata.contentType !== upload.contentType) {
      return {
        status: "INVALID_UPLOAD",
        message:
          "O formato de uma das imagens não corresponde ao arquivo enviado.",
      };
    }

    if (objectMetadata.contentLength !== upload.sizeInBytes) {
      return {
        status: "INVALID_UPLOAD",
        message:
          "O tamanho de uma das imagens não corresponde ao arquivo enviado.",
      };
    }
  }

  const confirmedUploads =
    await imageUploadRepository.confirmUploads({
      galleryId: gallery.id,
      uploadedById: userId,
      storageOwnerId: gallery.ownerId,
      uploads: input.uploads.map((upload) => ({
        imageId: upload.imageId,
        publicImageId: upload.publicImageId,
        objectKey: upload.objectKey,
        originalFilename: upload.originalFilename,
        contentType: upload.contentType,
        sizeInBytes: upload.sizeInBytes,
        comment: upload.comment,
      })),
    });

  return {
    status: "SUCCESS",
    confirmedUploads,
  };
}