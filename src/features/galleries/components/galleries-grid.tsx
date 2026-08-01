import { type GalleryListItem } from "../repositories/gallery-repository";
import { GalleryCard } from "./gallery-card";

type GalleriesGridProps = {
  galleries: GalleryListItem[];
};

export function GalleriesGrid({ galleries }: GalleriesGridProps) {
  return (
    <section className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {galleries.map((gallery) => (
        <GalleryCard key={gallery.id} gallery={gallery} />
      ))}
    </section>
  );
}