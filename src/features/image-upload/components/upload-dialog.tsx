"use client";

import { ImageUp, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type MouseEvent,
  type SyntheticEvent,
  useRef,
  useState,
} from "react";

import { confirmUploadsAction } from "../actions/confirm-uploads";
import { requestUploadUrlsAction } from "../actions/request-upload-urls";
import { useUploadImages } from "../hooks/use-upload-images";
import { uploadImagesToStorageService } from "../services/upload-images-to-storage-service";
import { SelectedImagesList } from "./selected-images-list";
import { UploadDropzone } from "./upload-dropzone";
import { UploadValidationMessage } from "./upload-validation-message";

type UploadDialogProps = {
  dialogId: string;
  galleryId: string;
  galleryName: string;
};

export function UploadDialog({
  dialogId,
  galleryId,
  galleryName,
}: UploadDialogProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(
    null,
  );

  const {
    selectedImages,
    validationMessages,
    selectedImageCount,
    hasSelectedImages,
    canSelectMoreImages,
    remainingImageSlots,
    addFiles,
    updateImageComment,
    removeImage,
    clearImages,
    clearValidationMessages,
  } = useUploadImages();

  function closeDialog() {
    if (isUploading) {
      return;
    }

    dialogRef.current?.close();
  }

  function handleDialogClose() {
    clearImages();
    setUploadError(null);
  }

  function handleDialogCancel(
    event: SyntheticEvent<HTMLDialogElement>,
  ) {
    if (isUploading) {
      event.preventDefault();
    }
  }

  function handleBackdropMouseDown(
    event: MouseEvent<HTMLDialogElement>,
  ) {
    if (isUploading) {
      return;
    }

    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  }

  function handleFilesSelected(files: FileList | File[]) {
    setUploadError(null);
    addFiles(files);
  }

  async function handleUpload() {
    if (!hasSelectedImages || isUploading) {
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const requestResult = await requestUploadUrlsAction({
        galleryId,
        images: selectedImages.map((image) => ({
          originalFilename: image.file.name,
          contentType: image.file.type,
          sizeInBytes: image.file.size,
          comment: image.comment,
        })),
      });

      if (!requestResult.success) {
        setUploadError(requestResult.message);
        return;
      }

      if (
        requestResult.uploads.length !== selectedImages.length
      ) {
        setUploadError(
          "O servidor retornou uma quantidade inesperada de autorizações de upload.",
        );
        return;
      }

      await uploadImagesToStorageService({
        uploads: requestResult.uploads.map((upload, index) => {
          const selectedImage = selectedImages[index];

          if (!selectedImage) {
            throw new Error(
              "Selected image could not be matched to its upload authorization.",
            );
          }

          return {
            imageId: upload.imageId,
            file: selectedImage.file,
            uploadUrl: upload.uploadUrl,
            contentType: upload.contentType,
          };
        }),
      });

      const confirmationResult = await confirmUploadsAction({
        galleryId,
        uploads: requestResult.uploads.map((upload) => ({
          imageId: upload.imageId,
          publicImageId: upload.publicImageId,
          objectKey: upload.objectKey,
          originalFilename: upload.originalFilename,
          contentType: upload.contentType,
          sizeInBytes: upload.sizeInBytes,
          comment: upload.comment,
        })),
      });

      if (!confirmationResult.success) {
        setUploadError(confirmationResult.message);
        return;
      }

      dialogRef.current?.close();
      router.refresh();
    } catch (error) {
      console.error("Failed to upload images:", error);

      setUploadError(
        "Não foi possível concluir o envio. Sua seleção foi preservada para que você possa tentar novamente.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id={dialogId}
      onClose={handleDialogClose}
      onCancel={handleDialogCancel}
      onMouseDown={handleBackdropMouseDown}
      aria-labelledby={`${dialogId}-title`}
      aria-describedby={`${dialogId}-description`}
      aria-busy={isUploading}
      className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
        <div className="min-w-0">
          <h2
            id={`${dialogId}-title`}
            className="text-xl font-semibold text-zinc-100"
          >
            Enviar imagens
          </h2>

          <p
            id={`${dialogId}-description`}
            className="mt-1 wrap-break-word text-sm text-zinc-400"
          >
            Selecione imagens para a galeria{" "}
            <span className="font-medium text-zinc-300">
              {galleryName}
            </span>
            .
          </p>
        </div>

        <button
          type="button"
          onClick={closeDialog}
          disabled={isUploading}
          aria-label="Fechar modal de upload"
          className="ml-4 cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div
        className={`max-h-[calc(100vh-13rem)] space-y-6 overflow-y-auto px-6 py-5 ${
          isUploading ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <UploadDropzone
          onFilesSelected={handleFilesSelected}
        />

        <UploadValidationMessage
          messages={validationMessages}
          onDismiss={clearValidationMessages}
        />

        {uploadError && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {uploadError}
          </p>
        )}

        {hasSelectedImages && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-300">
                {selectedImageCount}{" "}
                {selectedImageCount === 1
                  ? "imagem selecionada"
                  : "imagens selecionadas"}
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                {canSelectMoreImages
                  ? `Você ainda pode adicionar ${remainingImageSlots} ${
                      remainingImageSlots === 1
                        ? "imagem"
                        : "imagens"
                    }.`
                  : "O limite de imagens foi atingido."}
              </p>
            </div>

            <button
              type="button"
              onClick={clearImages}
              className="cursor-pointer text-sm font-medium text-zinc-400 transition-colors hover:text-red-400"
            >
              Limpar seleção
            </button>
          </div>
        )}

        <SelectedImagesList
          images={selectedImages}
          onCommentChange={updateImageComment}
          onRemove={removeImage}
        />
      </div>

      <footer className="flex flex-col-reverse gap-3 border-t border-zinc-800 bg-zinc-900 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500">
          {isUploading
            ? "Enviando e confirmando suas imagens..."
            : "As imagens serão armazenadas com segurança no FoxVault."}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={closeDialog}
            disabled={isUploading}
            className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!hasSelectedImages || isUploading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin"
              />
            ) : (
              <ImageUp aria-hidden="true" className="size-4" />
            )}

            {isUploading
              ? "Enviando..."
              : `Enviar ${selectedImageCount} ${
                  selectedImageCount === 1
                    ? "imagem"
                    : "imagens"
                }`}
          </button>
        </div>
      </footer>
    </dialog>
  );
}