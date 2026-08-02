import { galleryRepository } from "../repositories/gallery-repository";
import { type GalleryDetails } from "../types/gallery-details";

type GetGalleryDetailsServiceInput = {
  galleryId: string;
  userId: string;
};

export async function getGalleryDetailsService({
  galleryId,
  userId,
}: GetGalleryDetailsServiceInput): Promise<GalleryDetails | null> {
  const gallery = await galleryRepository.findAccessibleById({
    galleryId,
    userId,
  });

  if (!gallery) {
    return null;
  }

  const userRole =
    gallery.ownerId === userId
      ? "OWNER"
      : gallery.members[0]?.role ?? "VIEWER";

  return {
    id: gallery.id,
    name: gallery.name,
    description: gallery.description,
    visibility: gallery.visibility,
    imageCount: gallery._count.images,
    createdAt: gallery.createdAt,
    updatedAt: gallery.updatedAt,
    ownerId: gallery.ownerId,
    userRole,
  };
}