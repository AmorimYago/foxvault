export type GalleryDetails = {
  id: string;
  name: string;
  description: string | null;
  visibility: "PRIVATE" | "SHARED" | "PUBLIC";
  imageCount: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER";
};