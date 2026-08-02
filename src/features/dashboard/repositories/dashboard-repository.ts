import { prismaClient } from "@/lib/database";

async function getSummaryByUserId(userId: string) {
  const [
    user,
    totalGalleries,
    totalImages,
    sharedGalleries,
    recentGalleries,
  ] = await prismaClient.$transaction([
    prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        storageUsed: true,
      },
    }),

    prismaClient.gallery.count({
      where: {
        ownerId: userId,
      },
    }),

    prismaClient.image.count({
      where: {
        gallery: {
          ownerId: userId,
        },
      },
    }),

    prismaClient.gallery.count({
      where: {
        members: {
          some: {
            userId,
          },
        },
        ownerId: {
          not: userId,
        },
      },
    }),

    prismaClient.gallery.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        description: true,
        visibility: true,
        createdAt: true,
        _count: {
          select: {
            images: true,
          },
        },
      },
    }),
  ]);

  const storageUsed = user?.storageUsed ?? BigInt(0);

  return {
    storageUsed,
    totalGalleries,
    totalImages,
    sharedGalleries,
    recentGalleries,
  };
}

export const dashboardRepository = {
  getSummaryByUserId,
};

export type DashboardRepositorySummary = Awaited<
  ReturnType<typeof dashboardRepository.getSummaryByUserId>
>;