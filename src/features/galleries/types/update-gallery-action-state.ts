export type UpdateGalleryActionState = {
  success: boolean;
  submissionId?: string;
  message?: string;
  fieldErrors?: {
    galleryId?: string[];
    name?: string[];
    description?: string[];
    visibility?: string[];
  };
};

export const initialUpdateGalleryActionState: UpdateGalleryActionState = {
  success: false,
};