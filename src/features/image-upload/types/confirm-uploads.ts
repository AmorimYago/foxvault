export type ConfirmedUpload = {
  imageId: string;
  objectKey: string;
};

export type ConfirmUploadsResult =
  | {
      success: true;
      confirmedUploads: ConfirmedUpload[];
    }
  | {
      success: false;
      message: string;
      fieldErrors?: {
        galleryId?: string[];
        uploads?: string[];
      };
    };