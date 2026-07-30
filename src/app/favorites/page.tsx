import { Star } from "lucide-react";

export default function FavoritesPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-100">
        <Star className="size-5 text-neutral-500" />
      </div>

      <h1 className="text-lg font-semibold text-neutral-950">
        Você ainda não possui imagens favoritas
      </h1>

      <p className="mt-2 max-w-md text-sm text-neutral-500">
        As imagens marcadas como favoritas aparecerão aqui.
      </p>
    </section>
  );
}