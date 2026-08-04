export type RequestedUploadImage = {
  imageId: string;
  publicImageId: string;
  objectKey: string;
  uploadUrl: string;
  expiresInSeconds: number;
  originalFilename: string;
  contentType: string;
  sizeInBytes: number;
  comment: string;
};

export type RequestUploadUrlsResult =
  | {
      success: true;
      uploads: RequestedUploadImage[];
    }
  | {
      success: false;
      message: string;
      fieldErrors?: {
        galleryId?: string[];
        images?: string[];
      };
    };