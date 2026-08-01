import { galleryRepository } from "../repositories/gallery-repository";
import { type DeleteGalleryInput } from "../schemas/delete-gallery-schema";

type DeleteGalleryServiceInput = DeleteGalleryInput & {
  ownerId: string;
};

export async function deleteGalleryService({
  galleryId,
  ownerId,
}: DeleteGalleryServiceInput) {
  const deleteResult = await galleryRepository.deleteOwned({
    galleryId,
    ownerId,
  });

  if (deleteResult.count === 0) {
    throw new Error("Gallery not found or user is not the owner.");
  }
}