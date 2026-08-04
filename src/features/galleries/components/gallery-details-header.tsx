import {
  CalendarDays,
  Globe2,
  Lock,
  Users,
} from "lucide-react";

import { UploadButton } from "@/features/image-upload/components/upload-button";
import { ShareGalleryButton } from "@/features/sharing/components/share-gallery-button";

import { type GalleryDetails } from "../types/gallery-details";

type GalleryDetailsHeaderProps = {
  gallery: GalleryDetails;
  uploadDialogId: string;
  shareDialogId: string;
};

const visibilityConfiguration = {
  PRIVATE: {
    label: "Privada",
    icon: Lock,
  },
  SHARED: {
    label: "Compartilhada",
    icon: Users,
  },
  PUBLIC: {
    label: "Pública",
    icon: Globe2,
  },
} as const;

export function GalleryDetailsHeader({
  gallery,
  uploadDialogId,
  shareDialogId,
}: GalleryDetailsHeaderProps) {
  const visibility = visibilityConfiguration[gallery.visibility];
  const VisibilityIcon = visibility.icon;

  const isOwner = gallery.userRole === "OWNER";

  const canUploadImages =
    isOwner || gallery.userRole === "EDITOR";

  return (
    <header className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="wrap-break-word text-3xl font-bold tracking-tight text-zinc-100">
            {gallery.name}
          </h1>

          {gallery.description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              {gallery.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <VisibilityIcon
                aria-hidden="true"
                className="size-4"
              />

              {visibility.label}
            </span>

            <span>
              {gallery.imageCount}{" "}
              {gallery.imageCount === 1 ? "imagem" : "imagens"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays
                aria-hidden="true"
                className="size-4"
              />

              Criada em{" "}
              {gallery.createdAt.toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {isOwner && (
            <ShareGalleryButton dialogId={shareDialogId} />
          )}

          {canUploadImages && (
            <UploadButton dialogId={uploadDialogId} />
          )}
        </div>
      </div>
    </header>
  );
}