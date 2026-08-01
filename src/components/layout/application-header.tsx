import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Search, Settings } from "lucide-react";

import { signOut } from "@/auth";

type ApplicationHeaderProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

function getUserInitials(name?: string | null) {
  if (!name) {
    return "FV";
  }

  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function ApplicationHeader({ user }: ApplicationHeaderProps) {
  const displayName = user.name ?? "Usuário";
  const displayEmail = user.email ?? "E-mail não disponível";
  const initials = getUserInitials(user.name);

  return (
    <header className="flex h-16 shrink-0 items-center gap-6 border-b border-zinc-800 bg-zinc-900 px-6">
      <div className="relative max-w-xl flex-1">
        <label htmlFor="global-search" className="sr-only">
          Pesquisar imagens, comentários ou tags
        </label>

        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
        />

        <input
          id="global-search"
          type="search"
          placeholder="Pesquisar imagens, comentários ou tags..."
          className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 pr-4 pl-10 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
      </div>

      <details className="relative">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-800 [&::-webkit-details-marker]:hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={`Foto de ${displayName}`}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-9 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-zinc-950">
              {initials}
            </div>
          )}

          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-40 truncate text-sm font-medium text-zinc-100">
              {displayName}
            </p>

            <p className="max-w-40 truncate text-xs text-zinc-500">
              {displayEmail}
            </p>
          </div>

          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-zinc-500"
          />
        </summary>

        <div className="absolute top-full right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="border-b border-zinc-800 px-4 py-3">
            <p className="truncate text-sm font-medium text-zinc-100">
              {displayName}
            </p>

            <p className="mt-0.5 truncate text-xs text-zinc-500">
              {displayEmail}
            </p>
          </div>

          <div className="p-2">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <Settings aria-hidden="true" className="size-4" />
              Configurações
            </Link>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo: "/login",
                });
              }}
            >
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut aria-hidden="true" className="size-4" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </details>
    </header>
  );
}