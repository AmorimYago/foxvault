import "server-only";

import { galleryRepository } from "@/features/galleries/repositories/gallery-repository";
import {
  generateObjectKey,
  generateUploadUrl,
} from "@/lib/storage";

import { type RequestUploadUrlsInput } from "../schemas/request-upload-urls-schema";
import { type RequestedUploadImage } from "../types/request-upload-urls";

type RequestUploadUrlsServiceInput = {
  userId: string;
  input: RequestUploadUrlsInput;
};

export async function requestUploadUrlsService({
  userId,
  input,
}: RequestUploadUrlsServiceInput): Promise<
  RequestedUploadImage[] | null
> {
  const gallery = await galleryRepository.findUploadAccess({
    galleryId: input.galleryId,
    userId,
  });

  if (!gallery) {
    return null;
  }

  return Promise.all(
    input.images.map(async (image) => {
      const imageId = crypto.randomUUID();
      const publicImageId = crypto.randomUUID();

      const objectKey = generateObjectKey({
        publicImageId,
        contentType: image.contentType,
      });

      const { uploadUrl, expiresInSeconds } =
        await generateUploadUrl({
          objectKey,
          contentType: image.contentType,
        });

      return {
        imageId,
        publicImageId,
        objectKey,
        uploadUrl,
        expiresInSeconds,
        originalFilename: image.originalFilename,
        contentType: image.contentType,
        sizeInBytes: image.sizeInBytes,
        comment: image.comment,
      };
    }),
  );
}