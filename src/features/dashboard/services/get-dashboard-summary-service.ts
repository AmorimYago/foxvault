import { dashboardRepository } from "../repositories/dashboard-repository";
import { type DashboardSummary } from "../types/dashboard-summary";

type GetDashboardSummaryServiceInput = {
  userId: string;
};

export async function getDashboardSummaryService({
  userId,
}: GetDashboardSummaryServiceInput): Promise<DashboardSummary> {
  const summary = await dashboardRepository.getSummaryByUserId(userId);

  return {
    totalGalleries: summary.totalGalleries,
    totalImages: summary.totalImages,
    sharedGalleries: summary.sharedGalleries,
    storageUsedInBytes: summary.storageUsed,
    storageUsedLabel: formatStorageSize(summary.storageUsed),
    recentGalleries: summary.recentGalleries.map((gallery) => ({
      id: gallery.id,
      name: gallery.name,
      description: gallery.description,
      visibility: gallery.visibility,
      imageCount: gallery._count.images,
      createdAt: gallery.createdAt,
    })),
  };
}

function formatStorageSize(sizeInBytes: bigint) {
  const size = Number(sizeInBytes);

  if (size === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1,
  );

  const formattedSize = size / 1024 ** unitIndex;
  const maximumFractionDigits = unitIndex === 0 ? 0 : 1;

  return `${formattedSize.toLocaleString("pt-BR", {
    maximumFractionDigits,
  })} ${units[unitIndex]}`;
}