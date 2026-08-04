import { type GalleryImage } from "../types/gallery-image";
import { GalleryImageCard } from "./gallery-image-card";

type GalleryImagesGridProps = {
  images: GalleryImage[];
};

export function GalleryImagesGrid({
  images,
}: GalleryImagesGridProps) {
  return (
    <section aria-labelledby="gallery-images-title">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="gallery-images-title"
          className="text-lg font-semibold text-zinc-100"
        >
          Imagens
        </h2>

        <span className="text-sm text-zinc-500">
          {images.length}{" "}
          {images.length === 1 ? "imagem" : "imagens"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <GalleryImageCard
            key={image.id}
            image={image}
          />
        ))}
      </div>
    </section>
  );
}