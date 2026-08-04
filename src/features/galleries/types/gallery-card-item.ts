import { type GalleryMemberRole } from "@/generated/prisma/enums";
import { type GalleryVisibility } from "@/generated/prisma/enums";

export type GalleryCardItem = {
  id: string;
  name: string;
  description: string | null;
  visibility: GalleryVisibility;
  imageCount: number;
  userRole: GalleryMemberRole;
  owner?: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
};