export type GalleryImage = {
  id: string;
  publicImageId: string;
  originalFilename: string;
  contentType: string;
  sizeInBytes: number;
  comment: string | null;
  createdAt: Date;
  directUrl: string;
};