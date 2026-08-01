"use client";

import { LoaderCircle, Trash2, X } from "lucide-react";
import {
  type PointerEvent,
  useActionState,
  useRef,
} from "react";
import { useFormStatus } from "react-dom";

import { deleteGalleryAction } from "../actions/delete-gallery";
import { initialDeleteGalleryActionState } from "../types/delete-gallery-action-state";

type DeleteGalleryDialogProps = {
  dialogId: string;
  gallery: {
    id: string;
    name: string;
  };
};

export function DeleteGalleryDialog({
  dialogId,
  gallery,
}: DeleteGalleryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOnBackdropRef = useRef(false);

  const [state, formAction] = useActionState(
    deleteGalleryAction,
    initialDeleteGalleryActionState,
  );

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    pointerStartedOnBackdropRef.current = false;
  }

  function handleBackdropPointerDown(
    event: PointerEvent<HTMLDialogElement>,
  ) {
    pointerStartedOnBackdropRef.current =
      event.target === event.currentTarget;
  }

  function handleBackdropPointerUp(
    event: PointerEvent<HTMLDialogElement>,
  ) {
    const pointerEndedOnBackdrop =
      event.target === event.currentTarget;

    if (
      pointerStartedOnBackdropRef.current &&
      pointerEndedOnBackdrop
    ) {
      closeDialog();
    }

    pointerStartedOnBackdropRef.current = false;
  }

  return (
    <dialog
      ref={dialogRef}
      id={dialogId}
      onClose={handleDialogClose}
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
      onPointerCancel={() => {
        pointerStartedOnBackdropRef.current = false;
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <Trash2
              aria-hidden="true"
              className="size-5 text-red-400"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-100">
              Excluir galeria?
            </h2>

            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Esta ação não poderá ser desfeita.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={closeDialog}
          aria-label="Fechar modal"
          className="cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <form action={formAction} className="px-6 py-5">
        <input
          type="hidden"
          name="galleryId"
          value={gallery.id}
        />

        <p className="text-sm leading-6 text-zinc-300">
          A galeria{" "}
          <strong className="font-semibold text-zinc-100">
            &quot;{gallery.name}&quot;
          </strong>{" "}
          será excluída permanentemente.
        </p>

        <p className="mt-3 text-xs leading-5 text-zinc-500">
          Quando o upload de imagens estiver disponível, todo o conteúdo
          associado a esta galeria também será removido.
        </p>

        {state.message && !state.success && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            {state.message}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeDialog}
            className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            Cancelar
          </button>

          <DeleteGalleryButton />
        </div>
      </form>
    </dialog>
  );
}

function DeleteGalleryButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin"
        />
      )}

      {pending ? "Excluindo..." : "Excluir galeria"}
    </button>
  );
}