"use client";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
} from "react";

import { DeleteGalleryDialog } from "./delete-gallery-dialog";
import { EditGalleryDialog } from "./edit-gallery-dialog";

type GalleryCardActionsProps = {
  gallery: {
    id: string;
    name: string;
    description: string | null;
    visibility: "PRIVATE" | "SHARED" | "PUBLIC";
  };
};

export function GalleryCardActions({
  gallery,
}: GalleryCardActionsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const editDialogId = `edit-gallery-dialog-${gallery.id}`;
  const deleteDialogId = `delete-gallery-dialog-${gallery.id}`;

  useEffect(() => {
    function handleOutsidePointerDown(event: PointerEvent) {
      const details = detailsRef.current;

      if (!details?.open) {
        return;
      }

      if (
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.removeAttribute("open");
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsidePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsidePointerDown,
      );
    };
  }, []);

  function closeActionsMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  function openEditDialog() {
    closeActionsMenu();

    const dialog = document.getElementById(editDialogId);

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }

  function openDeleteDialog() {
    closeActionsMenu();

    const dialog = document.getElementById(deleteDialogId);

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }

  return (
    <>
      <details ref={detailsRef} className="relative">
        <summary
          aria-label={`Abrir ações da galeria ${gallery.name}`}
          className="flex size-8 cursor-pointer list-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 [&::-webkit-details-marker]:hidden"
        >
          <MoreHorizontal
            aria-hidden="true"
            className="size-5"
          />
        </summary>

        <div className="absolute top-full right-0 z-50 mt-1 w-40 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl">
          <button
            type="button"
            onClick={openEditDialog}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            <Pencil aria-hidden="true" className="size-4" />
            Editar
          </button>

          <button
            type="button"
            onClick={openDeleteDialog}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            Excluir
          </button>
        </div>
      </details>

      <EditGalleryDialog
        dialogId={editDialogId}
        gallery={gallery}
      />

      <DeleteGalleryDialog
        dialogId={deleteDialogId}
        gallery={{
          id: gallery.id,
          name: gallery.name,
        }}
      />
    </>
  );
}