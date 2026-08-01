import { CreateGalleryButton } from "./create-gallery-button";

type GalleriesPageHeaderProps = {
  createGalleryDialogId: string;
};

export function GalleriesPageHeader({
  createGalleryDialogId,
}: GalleriesPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Galerias
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Organize suas imagens em coleções privadas, compartilhadas ou
          públicas.
        </p>
      </div>

      <CreateGalleryButton dialogId={createGalleryDialogId} />
    </header>
  );
}