import {
  FolderOpen,
  HardDrive,
  Images,
  Users,
} from "lucide-react";

import { type DashboardSummary } from "../types/dashboard-summary";
import { DashboardStatCard } from "./dashboard-stat-card";

type DashboardStatsGridProps = {
  summary: DashboardSummary;
};

export function DashboardStatsGrid({
  summary,
}: DashboardStatsGridProps) {
  return (
    <section
      aria-label="Resumo do FoxVault"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <DashboardStatCard
        title="Galerias"
        value={summary.totalGalleries.toLocaleString("pt-BR")}
        icon={FolderOpen}
      />

      <DashboardStatCard
        title="Imagens"
        value={summary.totalImages.toLocaleString("pt-BR")}
        icon={Images}
      />

      <DashboardStatCard
        title="Compartilhadas comigo"
        value={summary.sharedGalleries.toLocaleString("pt-BR")}
        icon={Users}
      />

      <DashboardStatCard
        title="Armazenamento usado"
        value={summary.storageUsedLabel}
        icon={HardDrive}
      />
    </section>
  );
}