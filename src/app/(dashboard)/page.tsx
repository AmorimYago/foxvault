import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DashboardStatsGrid } from "@/features/dashboard/components/dashboard-stats-grid";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { RecentGalleries } from "@/features/dashboard/components/recent-galleries";
import { getDashboardSummaryService } from "@/features/dashboard/services/get-dashboard-summary-service";
import { CreateGalleryDialog } from "@/features/galleries/components/create-gallery-dialog";

const createGalleryDialogId = "dashboard-create-gallery-dialog";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const summary = await getDashboardSummaryService({
    userId: session.user.id,
  });

  const userName =
    session.user.name?.trim().split(/\s+/)[0] ?? "usuário";

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-8 p-6 lg:p-8">
        <DashboardHeader userName={userName} />

        <DashboardStatsGrid summary={summary} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <RecentGalleries galleries={summary.recentGalleries} />

          <QuickActions
            createGalleryDialogId={createGalleryDialogId}
          />
        </div>
      </div>

      <CreateGalleryDialog id={createGalleryDialogId} />
    </>
  );
}