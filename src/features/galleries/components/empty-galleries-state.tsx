import { FolderOpen } from "lucide-react";

import { CreateGalleryButton } from "./create-gallery-button";

type EmptyGalleriesStateProps = {
  createGalleryDialogId: string;
};

export function EmptyGalleriesState({
  createGalleryDialogId,
}: EmptyGalleriesStateProps) {
  return (
    <section className="flex flex-1 items-start justify-center pt-20 pb-16">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <FolderOpen
            aria-hidden="true"
            className="size-7 text-zinc-400"
          />
        </div>

        <h2 className="text-xl font-semibold text-zinc-100">
          Você ainda não possui galerias
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Crie sua primeira galeria para começar a organizar suas imagens no
          FoxVault.
        </p>

        <div className="mt-6">
          <CreateGalleryButton
            dialogId={createGalleryDialogId}
            variant="secondary"
          >
            Criar minha primeira galeria
          </CreateGalleryButton>
        </div>
      </div>
    </section>
  );
}