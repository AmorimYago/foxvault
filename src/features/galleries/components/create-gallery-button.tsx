"use client";

import { ArrowRight, FolderPlus, Plus } from "lucide-react";

type CreateGalleryButtonProps = {
  children?: React.ReactNode;
  dialogId: string;
  variant?: "primary" | "secondary" | "quick-action";
};

export function CreateGalleryButton({
  children = "Nova galeria",
  dialogId,
  variant = "primary",
}: CreateGalleryButtonProps) {
  function openDialog() {
    const dialog = document.getElementById(dialogId);

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }

  if (variant === "quick-action") {
    return (
      <button
        type="button"
        onClick={openDialog}
        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left transition-colors hover:border-orange-500/50"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
          <FolderPlus
            aria-hidden="true"
            className="size-5 text-orange-500"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-200">
            {children}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            Organize suas imagens em uma nova coleção.
          </p>
        </div>

        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-500"
        />
      </button>
    );
  }

  const baseClasses =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors";

  const variantClasses =
    variant === "primary"
      ? "bg-orange-500 px-3 text-zinc-950 hover:bg-orange-400"
      : "border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 hover:bg-zinc-800";

  return (
    <button
      type="button"
      onClick={openDialog}
      className={`${baseClasses} ${variantClasses}`}
    >
      <Plus aria-hidden="true" className="size-4 shrink-0" />

      <span>{children}</span>
    </button>
  );
}