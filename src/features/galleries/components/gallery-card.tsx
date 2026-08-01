import { FolderOpen, Globe2, Lock, Users } from "lucide-react";

import { type GalleryListItem } from "../repositories/gallery-repository";
import { GalleryCardActions } from "./gallery-card-actions";

type GalleryCardProps = {
  gallery: GalleryListItem;
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

export function GalleryCard({ gallery }: GalleryCardProps) {
  const visibility = visibilityConfiguration[gallery.visibility];
  const VisibilityIcon = visibility.icon;

  return (
    <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700">
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-t-2xl border-b border-zinc-800 bg-zinc-950">
        <FolderOpen
          aria-hidden="true"
          className="size-10 text-zinc-700"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-zinc-100">
            {gallery.name}
          </h2>

          <GalleryCardActions
            gallery={{
              id: gallery.id,
              name: gallery.name,
              description: gallery.description,
              visibility: gallery.visibility,
            }}
          />
        </div>

        {gallery.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-400">
            {gallery.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <VisibilityIcon
              aria-hidden="true"
              className="size-3.5"
            />

            {visibility.label}
          </span>

          <span>
            {gallery._count.images}{" "}
            {gallery._count.images === 1 ? "imagem" : "imagens"}
          </span>
        </div>
      </div>
    </article>
  );
}