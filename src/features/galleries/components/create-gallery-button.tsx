"use client";

import { Plus } from "lucide-react";

type CreateGalleryButtonProps = {
  children?: React.ReactNode;
  dialogId: string;
  variant?: "primary" | "secondary";
};

export function CreateGalleryButton({
  children = "Nova galeria",
  dialogId,
  variant = "primary",
}: CreateGalleryButtonProps) {
  const baseClasses =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors";

  const variantClasses =
    variant === "primary"
      ? "bg-orange-500 px-3 text-zinc-950 hover:bg-orange-400"
      : "border border-zinc-700 bg-zinc-900 px-4 text-zinc-100 hover:bg-zinc-800";

  function openDialog() {
    const dialog = document.getElementById(dialogId);

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }

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