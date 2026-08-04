import { prismaClient } from "@/lib/database";

type ConfirmUploadRepositoryItem = {
  imageId: string;
  publicImageId: string;
  objectKey: string;
  originalFilename: string;
  contentType: string;
  sizeInBytes: number;
  comment: string;
};

type ConfirmUploadsRepositoryInput = {
  galleryId: string;
  uploadedById: string;
  storageOwnerId: string;
  uploads: ConfirmUploadRepositoryItem[];
};

async function confirmUploads({
  galleryId,
  uploadedById,
  storageOwnerId,
  uploads,
}: ConfirmUploadsRepositoryInput) {
  return prismaClient.$transaction(async (transaction) => {
    const imageIds = uploads.map((upload) => upload.imageId);

    const publicImageIds = uploads.map(
      (upload) => upload.publicImageId,
    );

    const objectKeys = uploads.map((upload) => upload.objectKey);

    const existingImages = await transaction.image.findMany({
      where: {
        OR: [
          {
            id: {
              in: imageIds,
            },
          },
          {
            publicImageId: {
              in: publicImageIds,
            },
          },
          {
            storageKey: {
              in: objectKeys,
            },
          },
        ],
      },
      select: {
        id: true,
        publicImageId: true,
        storageKey: true,
      },
    });

    const existingImageIds = new Set(
      existingImages.map((image) => image.id),
    );

    const existingPublicImageIds = new Set(
      existingImages.map((image) => image.publicImageId),
    );

    const existingObjectKeys = new Set(
      existingImages.map((image) => image.storageKey),
    );

    const newUploads = uploads.filter(
      (upload) =>
        !existingImageIds.has(upload.imageId) &&
        !existingPublicImageIds.has(upload.publicImageId) &&
        !existingObjectKeys.has(upload.objectKey),
    );

    if (newUploads.length === 0) {
      return [];
    }

    await transaction.image.createMany({
      data: newUploads.map((upload) => ({
        id: upload.imageId,
        publicImageId: upload.publicImageId,
        galleryId,
        uploadedById,
        originalFilename: upload.originalFilename,
        storageKey: upload.objectKey,
        contentType: upload.contentType,
        sizeInBytes: BigInt(upload.sizeInBytes),
        comment: upload.comment || null,
      })),
      skipDuplicates: true,
    });

    const createdImages = await transaction.image.findMany({
      where: {
        id: {
          in: newUploads.map((upload) => upload.imageId),
        },
      },
      select: {
        id: true,
        storageKey: true,
        sizeInBytes: true,
      },
    });

    const totalCreatedSize = createdImages.reduce(
      (totalSize, image) => totalSize + image.sizeInBytes,
      BigInt(0),
    );

    if (totalCreatedSize > BigInt(0)) {
      await transaction.user.update({
        where: {
          id: storageOwnerId,
        },
        data: {
          storageUsed: {
            increment: totalCreatedSize,
          },
        },
      });
    }

    return createdImages.map((image) => ({
      imageId: image.id,
      objectKey: image.storageKey,
    }));
  });
}

export const imageUploadRepository = {
  confirmUploads,
};

export type ConfirmedUploadRepositoryItem = Awaited<
  ReturnType<typeof imageUploadRepository.confirmUploads>
>[number];