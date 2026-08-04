import { galleryRepository } from "../repositories/gallery-repository";
import { type GalleryCardItem } from "../types/gallery-card-item";

type GetGalleriesDashboardServiceInput = {
  userId: string;
};

type GalleriesDashboard = {
  ownedGalleries: GalleryCardItem[];
  sharedGalleries: GalleryCardItem[];
};

export async function getGalleriesDashboardService({
  userId,
}: GetGalleriesDashboardServiceInput): Promise<GalleriesDashboard> {
  const { ownedGalleries, sharedGalleries } =
    await galleryRepository.listDashboard(userId);

  return {
    ownedGalleries: ownedGalleries.map((gallery) => ({
      id: gallery.id,
      name: gallery.name,
      description: gallery.description,
      visibility: gallery.visibility,
      imageCount: gallery._count.images,
      userRole: "OWNER",
    })),

    sharedGalleries: sharedGalleries.map((gallery) => ({
      id: gallery.id,
      name: gallery.name,
      description: gallery.description,
      visibility: gallery.visibility,
      imageCount: gallery._count.images,
      userRole: gallery.members[0]?.role ?? "VIEWER",
      owner: gallery.owner,
    })),
  };
}

export type { GalleriesDashboard };