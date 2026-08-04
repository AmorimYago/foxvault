"use client";

import { UserPlus } from "lucide-react";

type ShareGalleryButtonProps = {
  dialogId: string;
};

export function ShareGalleryButton({
  dialogId,
}: ShareGalleryButtonProps) {
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
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
    >
      <UserPlus aria-hidden="true" className="size-4" />
      Compartilhar
    </button>
  );
}