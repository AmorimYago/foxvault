import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ApplicationSidebar } from "@/components/layout/application-sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FoxVault",
    template: "%s | FoxVault",
  },
  description:
    "A collaborative image vault built for sharing and organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen bg-zinc-950 text-zinc-100">
  <ApplicationSidebar />

  <div className="flex min-w-0 flex-1 flex-col">
    <main className="flex-1">{children}</main>
  </div>
</body>
    </html>
  );
}