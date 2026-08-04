"use client";

import { ImageUp } from "lucide-react";

type UploadButtonProps = {
  dialogId: string;
  disabled?: boolean;
};

export function UploadButton({
  dialogId,
  disabled = false,
}: UploadButtonProps) {
  function openDialog() {
    if (disabled) {
      return;
    }

    const dialog = document.getElementById(dialogId);

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={openDialog}
      className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <ImageUp aria-hidden="true" className="size-4" />

      Enviar imagens
    </button>
  );
}