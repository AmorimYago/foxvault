import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ApplicationHeader } from "@/components/layout/application-header";
import { ApplicationSidebar } from "@/components/layout/application-sidebar";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <ApplicationSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <ApplicationHeader user={session.user} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}