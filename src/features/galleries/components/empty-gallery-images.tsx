import { ImageIcon } from "lucide-react";

import { UploadButton } from "@/features/image-upload/components/upload-button";

type EmptyGalleryImagesProps = {
  uploadDialogId: string;
  canUploadImages: boolean;
};

export function EmptyGalleryImages({
  uploadDialogId,
  canUploadImages,
}: EmptyGalleryImagesProps) {
  return (
    <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <ImageIcon
          aria-hidden="true"
          className="size-6 text-zinc-600"
        />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-zinc-200">
        Esta galeria ainda está vazia
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Envie suas primeiras imagens para começar a organizar esta galeria.
      </p>

      <div className="mt-6">
        <UploadButton
          dialogId={uploadDialogId}
          disabled={!canUploadImages}
        />
      </div>
    </section>
  );
}