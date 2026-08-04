export type SelectedImage = {
  id: string;
  file: File;
  previewUrl: string;
  comment: string;
};

export type PrepareUploadResult = {
  acceptedImages: SelectedImage[];
  validationMessages: string[];
};