"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { maximumUploadImageCount } from "../schemas/upload-images-schema";
import { prepareUploadService } from "../services/prepare-upload-service";
import { type SelectedImage } from "../types/selected-image";

export function useUploadImages() {
  const [selectedImages, setSelectedImages] = useState<
    SelectedImage[]
  >([]);
  const [validationMessages, setValidationMessages] = useState<
    string[]
  >([]);

  const selectedImagesRef = useRef<SelectedImage[]>([]);

  useEffect(() => {
    selectedImagesRef.current = selectedImages;
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      for (const image of selectedImagesRef.current) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, []);

  const selectedImageCount = selectedImages.length;
  const hasSelectedImages = selectedImageCount > 0;

  const canSelectMoreImages =
    selectedImageCount < maximumUploadImageCount;

  const remainingImageSlots = Math.max(
    maximumUploadImageCount - selectedImageCount,
    0,
  );

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const filesArray = Array.from(files);

      if (filesArray.length === 0) {
        return;
      }

      const result = prepareUploadService({
        files: filesArray,
        currentImages: selectedImages,
      });

      setSelectedImages((currentImages) => [
        ...currentImages,
        ...result.acceptedImages,
      ]);

      setValidationMessages(result.validationMessages);
    },
    [selectedImages],
  );

  const updateImageComment = useCallback(
    (imageId: string, comment: string) => {
      setSelectedImages((currentImages) =>
        currentImages.map((image) =>
          image.id === imageId
            ? {
                ...image,
                comment,
              }
            : image,
        ),
      );
    },
    [],
  );

  const removeImage = useCallback((imageId: string) => {
    setSelectedImages((currentImages) => {
      const imageToRemove = currentImages.find(
        (image) => image.id === imageId,
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter(
        (image) => image.id !== imageId,
      );
    });
  }, []);

  const clearImages = useCallback(() => {
    setSelectedImages((currentImages) => {
      for (const image of currentImages) {
        URL.revokeObjectURL(image.previewUrl);
      }

      return [];
    });

    setValidationMessages([]);
  }, []);

  const clearValidationMessages = useCallback(() => {
    setValidationMessages([]);
  }, []);

  return {
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
  };
}