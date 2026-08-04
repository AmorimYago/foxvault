import { prismaClient } from "@/lib/database";

import { type CreateGalleryInput } from "../schemas/create-gallery-schema";
import { type DeleteGalleryInput } from "../schemas/delete-gallery-schema";
import { type UpdateGalleryInput } from "../schemas/update-gallery-schema";

type CreateGalleryRepositoryInput = CreateGalleryInput & {
  ownerId: string;
};

type UpdateOwnedGalleryRepositoryInput = UpdateGalleryInput & {
  ownerId: string;
};

type DeleteOwnedGalleryRepositoryInput = DeleteGalleryInput & {
  ownerId: string;
};

type FindAccessibleGalleryByIdRepositoryInput = {
  galleryId: string;
  userId: string;
};

type FindGalleryUploadAccessRepositoryInput = {
  galleryId: string;
  userId: string;
};

async function create({
  ownerId,
  name,
  description,
  visibility,
}: CreateGalleryRepositoryInput) {
  return prismaClient.gallery.create({
    data: {
      name,
      description,
      visibility,
      ownerId,
    },
  });
}

async function listByOwner(ownerId: string) {
  return prismaClient.gallery.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      description: true,
      visibility: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
  });
}

async function findAccessibleById({
  galleryId,
  userId,
}: FindAccessibleGalleryByIdRepositoryInput) {
  return prismaClient.gallery.findFirst({
    where: {
      id: galleryId,
      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
            },
          },
        },
        {
          visibility: "PUBLIC",
        },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      visibility: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          images: true,
        },
      },
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
        take: 1,
      },
    },
  });
}

async function findUploadAccess({
  galleryId,
  userId,
}: FindGalleryUploadAccessRepositoryInput) {
  return prismaClient.gallery.findFirst({
    where: {
      id: galleryId,
      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
              role: {
                in: ["OWNER", "EDITOR"],
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      ownerId: true,
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
        take: 1,
      },
    },
  });
}

async function updateOwned({
  galleryId,
  ownerId,
  name,
  description,
  visibility,
}: UpdateOwnedGalleryRepositoryInput) {
  return prismaClient.gallery.updateMany({
    where: {
      id: galleryId,
      ownerId,
    },
    data: {
      name,
      description,
      visibility,
    },
  });
}

async function deleteOwned({
  galleryId,
  ownerId,
}: DeleteOwnedGalleryRepositoryInput) {
  return prismaClient.gallery.deleteMany({
    where: {
      id: galleryId,
      ownerId,
    },
  });
}

export const galleryRepository = {
  create,
  deleteOwned,
  findAccessibleById,
  findUploadAccess,
  listByOwner,
  updateOwned,
};

export type GalleryListItem = Awaited<
  ReturnType<typeof galleryRepository.listByOwner>
>[number];

export type AccessibleGalleryDetails = Awaited<
  ReturnType<typeof galleryRepository.findAccessibleById>
>;

export type GalleryUploadAccess = Awaited<
  ReturnType<typeof galleryRepository.findUploadAccess>
>;