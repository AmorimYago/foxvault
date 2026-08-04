export type AddGalleryMemberActionState = {
  success: boolean;
  submissionId?: string;
  message?: string;
  fieldErrors?: {
    galleryId?: string[];
    email?: string[];
    role?: string[];
  };
};

export const initialAddGalleryMemberActionState: AddGalleryMemberActionState =
  {
    success: false,
  };