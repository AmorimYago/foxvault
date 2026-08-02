import {
  ArrowRight,
  FolderOpen,
  Globe2,
  Lock,
  Users,
} from "lucide-react";
import Link from "next/link";

import { type RecentDashboardGallery } from "../types/dashboard-summary";

type RecentGalleriesProps = {
  galleries: RecentDashboardGallery[];
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

function getGalleryHref(galleryId: string) {
  return `/galleries/${galleryId}`;
}

export function RecentGalleries({
  galleries,
}: RecentGalleriesProps) {
  return (
    <section
      aria-labelledby="recent-galleries-title"
      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
    >
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
        <div>
          <h2
            id="recent-galleries-title"
            className="font-semibold text-zinc-100"
          >
            Galerias recentes
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            As últimas galerias criadas no seu cofre.
          </p>
        </div>

        <Link
          href="/galleries"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
        >
          Ver todas
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </header>

      {galleries.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
            <FolderOpen
              aria-hidden="true"
              className="size-5 text-zinc-600"
            />
          </div>

          <h3 className="mt-4 font-medium text-zinc-200">
            Nenhuma galeria criada
          </h3>

          <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">
            Crie sua primeira galeria para começar a organizar suas imagens.
          </p>

          <Link
            href="/galleries"
            className="mt-5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400"
          >
            Criar galeria
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-800">
          {galleries.map((gallery) => {
            const visibility =
              visibilityConfiguration[gallery.visibility];
            const VisibilityIcon = visibility.icon;

            return (
              <li key={gallery.id}>
                <Link
                  href={getGalleryHref(gallery.id)}
                  aria-label={`Abrir galeria ${gallery.name}`}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-zinc-800/50 focus-visible:bg-zinc-800/50 focus-visible:outline-none"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 transition-colors group-hover:border-zinc-700">
                    <FolderOpen
                      aria-hidden="true"
                      className="size-5 text-orange-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-200 transition-colors group-hover:text-zinc-100">
                      {gallery.name}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1">
                        <VisibilityIcon
                          aria-hidden="true"
                          className="size-3.5"
                        />

                        {visibility.label}
                      </span>

                      <span>
                        {gallery.imageCount}{" "}
                        {gallery.imageCount === 1
                          ? "imagem"
                          : "imagens"}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-orange-500"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}