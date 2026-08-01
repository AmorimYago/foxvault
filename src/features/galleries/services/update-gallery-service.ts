import { galleryRepository } from "../repositories/gallery-repository";
import { type UpdateGalleryInput } from "../schemas/update-gallery-schema";

type UpdateGalleryServiceInput = UpdateGalleryInput & {
  ownerId: string;
};

export async function updateGalleryService({
  galleryId,
  ownerId,
  name,
  description,
  visibility,
}: UpdateGalleryServiceInput) {
  const updateResult = await galleryRepository.updateOwned({
    galleryId,
    ownerId,
    name,
    description,
    visibility,
  });

  if (updateResult.count === 0) {
    throw new Error("Gallery not found or user is not the owner.");
  }
}