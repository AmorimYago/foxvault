export type DeleteGalleryActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: {
    galleryId?: string[];
  };
};

export const initialDeleteGalleryActionState: DeleteGalleryActionState = {
  success: false,
};