import { galleryRepository } from "../repositories/gallery-repository";
import { type CreateGalleryInput } from "../schemas/create-gallery-schema";

type CreateGalleryServiceInput = CreateGalleryInput & {
  ownerId: string;
};

export async function createGalleryService({
  ownerId,
  name,
  description,
  visibility,
}: CreateGalleryServiceInput) {
  return galleryRepository.create({
    ownerId,
    name,
    description,
    visibility,
  });
}