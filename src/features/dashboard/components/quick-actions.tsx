import { ImageUp } from "lucide-react";

import { CreateGalleryButton } from "@/features/galleries/components/create-gallery-button";

type QuickActionsProps = {
  createGalleryDialogId: string;
};

export function QuickActions({
  createGalleryDialogId,
}: QuickActionsProps) {
  return (
    <section
      aria-labelledby="quick-actions-title"
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
    >
      <div>
        <h2
          id="quick-actions-title"
          className="font-semibold text-zinc-100"
        >
          Ações rápidas
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Acesse as principais funcionalidades do seu cofre.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <CreateGalleryButton
          dialogId={createGalleryDialogId}
          variant="quick-action"
        >
          Criar uma galeria
        </CreateGalleryButton>

        <div
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 opacity-60"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
            <ImageUp
              aria-hidden="true"
              className="size-5 text-zinc-500"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-zinc-300">
                Enviar imagens
              </p>

              <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Em breve
              </span>
            </div>

            <p className="mt-0.5 text-xs text-zinc-600">
              O upload será disponibilizado em uma próxima etapa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}