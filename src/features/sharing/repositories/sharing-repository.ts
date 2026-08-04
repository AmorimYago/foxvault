import { prismaClient } from "@/lib/database";

type FindOwnedGalleryInput = {
  galleryId: string;
  ownerId: string;
};

type FindGalleryMemberInput = {
  galleryId: string;
  userId: string;
};

type AddGalleryMemberInput = {
  galleryId: string;
  userId: string;
  role: "EDITOR" | "VIEWER";
};

async function findUserByEmail(email: string) {
  return prismaClient.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
}

async function findOwnedGallery({
  galleryId,
  ownerId,
}: FindOwnedGalleryInput) {
  return prismaClient.gallery.findFirst({
    where: {
      id: galleryId,
      ownerId,
    },
    select: {
      id: true,
      ownerId: true,
    },
  });
}

async function findGalleryMember({
  galleryId,
  userId,
}: FindGalleryMemberInput) {
  return prismaClient.galleryMember.findUnique({
    where: {
      galleryId_userId: {
        galleryId,
        userId,
      },
    },
    select: {
      id: true,
      role: true,
    },
  });
}

async function addGalleryMember({
  galleryId,
  userId,
  role,
}: AddGalleryMemberInput) {
  return prismaClient.$transaction(async (transaction) => {
    const member = await transaction.galleryMember.create({
      data: {
        galleryId,
        userId,
        role,
      },
      select: {
        id: true,
        role: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    await transaction.gallery.update({
      where: {
        id: galleryId,
      },
      data: {
        visibility: "SHARED",
      },
    });

    return member;
  });
}

export const sharingRepository = {
  addGalleryMember,
  findGalleryMember,
  findOwnedGallery,
  findUserByEmail,
};