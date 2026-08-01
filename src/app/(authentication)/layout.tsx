import { redirect } from "next/navigation";

import { auth } from "@/auth";

type AuthenticationLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      {children}
    </main>
  );
}