import { type GalleryCardItem } from "../types/gallery-card-item";
import { GalleryCard } from "./gallery-card";

type GalleriesGridProps = {
  galleries: GalleryCardItem[];
};

export function GalleriesGrid({
  galleries,
}: GalleriesGridProps) {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {galleries.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          gallery={gallery}
        />
      ))}
    </section>
  );
}