import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="flex min-h-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Settings className="size-6 text-zinc-400" />
        </div>

        <h1 className="text-xl font-semibold text-zinc-100">
          Configurações
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          As configurações da sua conta e do FoxVault aparecerão aqui.
        </p>
      </div>
    </section>
  );
}