import { CalendarDays, ExternalLink } from "lucide-react";

import { type GalleryImage } from "../types/gallery-image";

type GalleryImageCardProps = {
  image: GalleryImage;
};

export function GalleryImageCard({
  image,
}: GalleryImageCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700">
      <a
        href={image.directUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir imagem ${image.originalFilename} em uma nova guia`}
        className="block overflow-hidden bg-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.directUrl}
          alt={image.comment || image.originalFilename}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </a>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              title={image.originalFilename}
              className="truncate text-sm font-medium text-zinc-200"
            >
              {image.originalFilename}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {formatFileSize(image.sizeInBytes)}
            </p>
          </div>

          <a
            href={image.directUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${image.originalFilename} em uma nova guia`}
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <ExternalLink
              aria-hidden="true"
              className="size-4"
            />
          </a>
        </div>

        {image.comment && (
          <p className="wrap-break-word text-sm leading-5 text-zinc-400">
            {image.comment}
          </p>
        )}

        <p className="flex items-center gap-1.5 text-xs text-zinc-600">
          <CalendarDays
            aria-hidden="true"
            className="size-3.5"
          />

          {image.createdAt.toLocaleDateString("pt-BR")}
        </p>
      </div>
    </article>
  );
}

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  if (sizeInBytes < 1024 ** 2) {
    return `${(sizeInBytes / 1024).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })} KB`;
  }

  return `${(sizeInBytes / 1024 ** 2).toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })} MB`;
}