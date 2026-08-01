"use client";

import { Globe2, LoaderCircle, Lock, Users, X } from "lucide-react";
import {
  type ComponentType,
  type PointerEvent,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useFormStatus } from "react-dom";

import { updateGalleryAction } from "../actions/update-gallery";
import { initialUpdateGalleryActionState } from "../types/update-gallery-action-state";

type GalleryVisibility = "PRIVATE" | "SHARED" | "PUBLIC";

type EditGalleryDialogProps = {
  dialogId: string;
  gallery: {
    id: string;
    name: string;
    description: string | null;
    visibility: GalleryVisibility;
  };
};

export function EditGalleryDialog({
  dialogId,
  gallery,
}: EditGalleryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pointerStartedOnBackdropRef = useRef(false);

  const [state, formAction] = useActionState(
    updateGalleryAction,
    initialUpdateGalleryActionState,
  );

  useEffect(() => {
    if (!state.success || !state.submissionId) {
      return;
    }

    formRef.current?.reset();
    dialogRef.current?.close();
  }, [state.success, state.submissionId]);

  function closeDialog() {
    formRef.current?.reset();
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    formRef.current?.reset();
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
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            Editar galeria
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Atualize as informações e a visibilidade da coleção.
          </p>
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

      <form
        ref={formRef}
        action={formAction}
        className="space-y-6 px-6 py-5"
      >
        <input
          type="hidden"
          name="galleryId"
          value={gallery.id}
        />

        <div>
          <label
            htmlFor={`${dialogId}-name`}
            className="text-sm font-medium text-zinc-200"
          >
            Nome
          </label>

          <input
            id={`${dialogId}-name`}
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="off"
            autoFocus
            defaultValue={gallery.name}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={
              state.fieldErrors?.name
                ? `${dialogId}-name-error`
                : undefined
            }
            className="mt-2 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {state.fieldErrors?.name && (
            <p
              id={`${dialogId}-name-error`}
              className="mt-2 text-xs text-red-400"
            >
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor={`${dialogId}-description`}
              className="text-sm font-medium text-zinc-200"
            >
              Descrição
            </label>

            <span className="text-xs text-zinc-500">
              Opcional
            </span>
          </div>

          <textarea
            id={`${dialogId}-description`}
            name="description"
            rows={3}
            maxLength={300}
            defaultValue={gallery.description ?? ""}
            placeholder="Conte um pouco sobre esta galeria..."
            aria-invalid={Boolean(
              state.fieldErrors?.description,
            )}
            aria-describedby={
              state.fieldErrors?.description
                ? `${dialogId}-description-error`
                : undefined
            }
            className="mt-2 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {state.fieldErrors?.description && (
            <p
              id={`${dialogId}-description-error`}
              className="mt-2 text-xs text-red-400"
            >
              {state.fieldErrors.description[0]}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-zinc-200">
            Visibilidade
          </legend>

          <div className="mt-3 space-y-2">
            <VisibilityOption
              value="PRIVATE"
              title="Privada"
              description="Somente você pode acessar esta galeria."
              icon={Lock}
              defaultChecked={
                gallery.visibility === "PRIVATE"
              }
            />

            <VisibilityOption
              value="SHARED"
              title="Compartilhada"
              description="Pessoas convidadas poderão acessar a galeria."
              icon={Users}
              defaultChecked={
                gallery.visibility === "SHARED"
              }
            />

            <VisibilityOption
              value="PUBLIC"
              title="Pública"
              description="Qualquer pessoa com o link poderá visualizar."
              icon={Globe2}
              defaultChecked={
                gallery.visibility === "PUBLIC"
              }
            />
          </div>
        </fieldset>

        {state.message && !state.success && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            {state.message}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeDialog}
            className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            Cancelar
          </button>

          <UpdateGalleryButton />
        </div>
      </form>
    </dialog>
  );
}

function UpdateGalleryButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin"
        />
      )}

      {pending ? "Salvando..." : "Salvar alterações"}
    </button>
  );
}

type VisibilityOptionProps = {
  value: GalleryVisibility;
  title: string;
  description: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  defaultChecked: boolean;
};

function VisibilityOption({
  value,
  title,
  description,
  icon: Icon,
  defaultChecked,
}: VisibilityOptionProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3 transition-colors has-checked:border-orange-500 has-checked:bg-orange-500/5 hover:border-zinc-700">
      <input
        type="radio"
        name="visibility"
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 size-4 accent-orange-500"
      />

      <Icon
        aria-hidden="true"
        className="mt-0.5 size-5 shrink-0 text-zinc-400"
      />

      <span>
        <span className="block text-sm font-medium text-zinc-200">
          {title}
        </span>

        <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
          {description}
        </span>
      </span>
    </label>
  );
}