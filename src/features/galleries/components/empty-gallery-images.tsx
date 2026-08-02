import { ImageIcon, ImageUp } from "lucide-react";

export function EmptyGalleryImages() {
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
        Quando o upload estiver disponível, suas imagens aparecerão
        organizadas aqui.
      </p>

      <button
        type="button"
        disabled
        className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-400 opacity-60"
      >
        <ImageUp aria-hidden="true" className="size-4" />
        Enviar imagens
      </button>
    </section>
  );
}