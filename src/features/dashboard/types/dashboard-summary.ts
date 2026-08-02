export type RecentDashboardGallery = {
  id: string;
  name: string;
  description: string | null;
  visibility: "PRIVATE" | "SHARED" | "PUBLIC";
  imageCount: number;
  createdAt: Date;
};

export type DashboardSummary = {
  totalGalleries: number;
  totalImages: number;
  sharedGalleries: number;
  storageUsedInBytes: bigint;
  storageUsedLabel: string;
  recentGalleries: RecentDashboardGallery[];
};