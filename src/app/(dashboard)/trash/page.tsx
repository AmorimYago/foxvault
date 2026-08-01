import { Trash2 } from "lucide-react";

export default function TrashPage() {
  return (
    <section className="flex min-h-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Trash2 className="size-6 text-zinc-400" />
        </div>

        <h2 className="text-xl font-semibold text-zinc-100">
          Lixeira vazia
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Nenhuma imagem foi movida para a lixeira.
        </p>
      </div>
    </section>
  );
}