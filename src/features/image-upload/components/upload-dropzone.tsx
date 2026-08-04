"use client";

import { ImagePlus } from "lucide-react";
import {
  type ChangeEvent,
  type DragEvent,
  useRef,
  useState,
} from "react";

import {
  acceptedUploadImageTypes,
  maximumUploadImageCount,
  maximumUploadImageSizeInBytes,
} from "../schemas/upload-images-schema";

type UploadDropzoneProps = {
  onFilesSelected: (files: FileList | File[]) => void;
};

export function UploadDropzone({
  onFilesSelected,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      onFilesSelected(event.target.files);
    }

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      onFilesSelected(event.dataTransfer.files);
    }
  }

  const maximumSizeInMegabytes =
    maximumUploadImageSizeInBytes / 1024 ** 2;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-2xl border border-dashed p-8 text-center transition-colors ${
        isDragging
          ? "border-orange-500 bg-orange-500/5"
          : "border-zinc-700 bg-zinc-950 hover:border-zinc-600"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedUploadImageTypes.join(",")}
        onChange={handleFileChange}
        className="sr-only"
      />

      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <ImagePlus
          aria-hidden="true"
          className="size-6 text-orange-500"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-zinc-200">
        Arraste imagens para cá
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        ou selecione arquivos no seu dispositivo
      </p>

      <button
        type="button"
        onClick={openFilePicker}
        className="mt-5 cursor-pointer rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400"
      >
        Selecionar imagens
      </button>

      <p className="mt-4 text-xs leading-5 text-zinc-600">
        Até {maximumUploadImageCount} imagens, com no máximo{" "}
        {maximumSizeInMegabytes} MB cada. Formatos: JPG, PNG, WEBP e GIF.
      </p>
    </div>
  );
}