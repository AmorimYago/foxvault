import { Images } from "lucide-react";

export default function HomePage() {
  return (
    <section className="flex min-h-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Images className="size-6 text-orange-500" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Bem-vindo ao FoxVault
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Suas galerias, imagens e memórias ficarão organizadas em um único
          lugar.
        </p>
      </div>
    </section>
  );
}