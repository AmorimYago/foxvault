import { Trash2 } from "lucide-react";
import Image from "next/image";

import { type SelectedImage } from "../types/selected-image";

type SelectedImageCardProps = {
  image: SelectedImage;
  onCommentChange: (imageId: string, comment: string) => void;
  onRemove: (imageId: string) => void;
};

export function SelectedImageCard({
  image,
  onCommentChange,
  onRemove,
}: SelectedImageCardProps) {
  const commentInputId = `image-comment-${image.id}`;

  return (
    <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        <Image
          src={image.previewUrl}
          alt={`Preview de ${image.file.name}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-4 p-3">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p
              title={image.file.name}
              className="truncate text-sm font-medium text-zinc-200"
            >
              {image.file.name}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {formatFileSize(image.file.size)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(image.id)}
            aria-label={`Remover ${image.file.name}`}
            className="cursor-pointer rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor={commentInputId}
              className="text-xs font-medium text-zinc-300"
            >
              Comentário
            </label>

            <span className="text-xs text-zinc-600">
              {image.comment.length}/300
            </span>
          </div>

          <textarea
            id={commentInputId}
            value={image.comment}
            onChange={(event) =>
              onCommentChange(image.id, event.target.value)
            }
            rows={3}
            maxLength={300}
            placeholder="Adicione um comentário pesquisável..."
            className="mt-2 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
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