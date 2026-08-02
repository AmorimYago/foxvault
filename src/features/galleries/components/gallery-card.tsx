import { FolderOpen, Globe2, Lock, Users } from "lucide-react";
import Link from "next/link";

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
  const galleryHref = `/galleries/${gallery.id}`;

  return (
    <article className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/10">
      <Link
        href={galleryHref}
        tabIndex={0}
        aria-label={`Abrir galeria ${gallery.name}`}
        className="block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <div className="flex aspect-video items-center justify-center border-b border-zinc-800 bg-zinc-950">
          <FolderOpen
            aria-hidden="true"
            className="size-10 text-zinc-700 transition-colors group-hover:text-zinc-600"
          />
        </div>

        <div className="p-4">
          <h2 className="truncate pr-10 text-base font-semibold text-zinc-100 transition-colors group-hover:text-orange-400">
            {gallery.name}
          </h2>

          {gallery.description && (
            <p className="mt-1 line-clamp-2 pr-10 text-sm leading-5 text-zinc-400">
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
      </Link>

      <div className="absolute top-[calc(56.25%+1rem)] right-4 z-10">
        <GalleryCardActions
          gallery={{
            id: gallery.id,
            name: gallery.name,
            description: gallery.description,
            visibility: gallery.visibility,
          }}
        />
      </div>
    </article>
  );
}