import "server-only";

import { imageRepository } from "../repositories/image-repository";
import { type GalleryImage } from "../types/gallery-image";

const fileExtensionByContentType = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

type SupportedImageContentType =
  keyof typeof fileExtensionByContentType;

type GetGalleryImagesServiceInput = {
  galleryId: string;
};

export async function getGalleryImagesService({
  galleryId,
}: GetGalleryImagesServiceInput): Promise<GalleryImage[]> {
  const imageDeliveryUrl =
    process.env.NEXT_PUBLIC_IMAGE_DELIVERY_URL;

  if (!imageDeliveryUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_IMAGE_DELIVERY_URL environment variable.",
    );
  }

  const images = await imageRepository.listByGalleryId({
    galleryId,
  });

  return images.map((image) => {
    if (!isSupportedImageContentType(image.contentType)) {
      throw new Error(
        `Unsupported stored image content type: ${image.contentType}`,
      );
    }

    const extension =
      fileExtensionByContentType[image.contentType];

    const directUrl = new URL(
      `/i/${image.publicImageId}.${extension}`,
      ensureTrailingSlash(imageDeliveryUrl),
    ).toString();

    return {
      id: image.id,
      publicImageId: image.publicImageId,
      originalFilename: image.originalFilename,
      contentType: image.contentType,
      sizeInBytes: Number(image.sizeInBytes),
      comment: image.comment,
      createdAt: image.createdAt,
      directUrl,
    };
  });
}

function isSupportedImageContentType(
  contentType: string,
): contentType is SupportedImageContentType {
  return contentType in fileExtensionByContentType;
}

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}