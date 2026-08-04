import { type SelectedImage } from "../types/selected-image";
import { SelectedImageCard } from "./selected-image-card";

type SelectedImagesListProps = {
  images: SelectedImage[];
  onCommentChange: (imageId: string, comment: string) => void;
  onRemove: (imageId: string) => void;
};

export function SelectedImagesList({
  images,
  onCommentChange,
  onRemove,
}: SelectedImagesListProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="selected-images-title">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3
            id="selected-images-title"
            className="text-sm font-semibold text-zinc-200"
          >
            Imagens selecionadas
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Os comentários poderão ser usados para localizar as imagens.
          </p>
        </div>

        <span className="shrink-0 text-xs text-zinc-500">
          {images.length} {images.length === 1 ? "imagem" : "imagens"}
        </span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {images.map((image) => (
          <SelectedImageCard
            key={image.id}
            image={image}
            onCommentChange={onCommentChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}