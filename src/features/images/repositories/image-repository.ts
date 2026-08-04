import "server-only";

import { prismaClient } from "@/lib/database";

type ListGalleryImagesRepositoryInput = {
  galleryId: string;
};

async function listByGalleryId({
  galleryId,
}: ListGalleryImagesRepositoryInput) {
  return prismaClient.image.findMany({
    where: {
      galleryId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      publicImageId: true,
      originalFilename: true,
      contentType: true,
      sizeInBytes: true,
      comment: true,
      createdAt: true,
    },
  });
}

export const imageRepository = {
  listByGalleryId,
};

export type GalleryImageRepositoryItem = Awaited<
  ReturnType<typeof imageRepository.listByGalleryId>
>[number];