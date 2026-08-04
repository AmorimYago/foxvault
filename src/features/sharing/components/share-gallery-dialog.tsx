"use client";

import {
  Eye,
  LoaderCircle,
  Pencil,
  UserPlus,
  X,
} from "lucide-react";
import {
  type PointerEvent,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useFormStatus } from "react-dom";

import { addGalleryMemberAction } from "../actions/add-gallery-member";
import { initialAddGalleryMemberActionState } from "../types/add-gallery-member-action-state";

type ShareGalleryDialogProps = {
  dialogId: string;
  galleryId: string;
  galleryName: string;
};

export function ShareGalleryDialog({
  dialogId,
  galleryId,
  galleryName,
}: ShareGalleryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pointerStartedOnBackdropRef = useRef(false);

  const [state, formAction] = useActionState(
    addGalleryMemberAction,
    initialAddGalleryMemberActionState,
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
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-zinc-100">
            Compartilhar galeria
          </h2>

          <p className="mt-1 wrap-break-word text-sm text-zinc-400">
            Adicione uma pessoa à galeria{" "}
            <span className="font-medium text-zinc-300">
              {galleryName}
            </span>
            .
          </p>
        </div>

        <button
          type="button"
          onClick={closeDialog}
          aria-label="Fechar modal de compartilhamento"
          className="ml-4 cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
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
          value={galleryId}
        />

        <div>
          <label
            htmlFor={`${dialogId}-email`}
            className="text-sm font-medium text-zinc-200"
          >
            E-mail
          </label>

          <input
            id={`${dialogId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            autoFocus
            placeholder="pessoa@exemplo.com"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email
                ? `${dialogId}-email-error`
                : undefined
            }
            className="mt-2 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {state.fieldErrors?.email && (
            <p
              id={`${dialogId}-email-error`}
              className="mt-2 text-xs text-red-400"
            >
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-zinc-200">
            Permissão
          </legend>

          <div className="mt-3 space-y-2">
            <PermissionOption
              value="EDITOR"
              title="Editor"
              description="Pode visualizar e enviar imagens para a galeria."
              icon={Pencil}
              defaultChecked
            />

            <PermissionOption
              value="VIEWER"
              title="Visualizador"
              description="Pode visualizar as imagens, mas não pode enviar."
              icon={Eye}
            />
          </div>

          {state.fieldErrors?.role && (
            <p className="mt-2 text-xs text-red-400">
              {state.fieldErrors.role[0]}
            </p>
          )}
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

          <AddGalleryMemberButton />
        </div>
      </form>
    </dialog>
  );
}

type PermissionOptionProps = {
  value: "EDITOR" | "VIEWER";
  title: string;
  description: string;
  icon: typeof Pencil;
  defaultChecked?: boolean;
};

function PermissionOption({
  value,
  title,
  description,
  icon: Icon,
  defaultChecked = false,
}: PermissionOptionProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3 transition-colors has-checked:border-orange-500 has-checked:bg-orange-500/5 hover:border-zinc-700">
      <input
        type="radio"
        name="role"
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

function AddGalleryMemberButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin"
        />
      ) : (
        <UserPlus aria-hidden="true" className="size-4" />
      )}

      {pending ? "Adicionando..." : "Adicionar pessoa"}
    </button>
  );
}