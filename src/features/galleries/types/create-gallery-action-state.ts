export type CreateGalleryActionState = {
  success: boolean;
  submissionId?: string;
  message?: string;
  fieldErrors?: {
    name?: string[];
    description?: string[];
    visibility?: string[];
  };
};

export const initialCreateGalleryActionState: CreateGalleryActionState = {
  success: false,
};