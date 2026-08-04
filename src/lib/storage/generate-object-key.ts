const fileExtensionByContentType = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

type SupportedImageContentType =
  keyof typeof fileExtensionByContentType;

type GenerateObjectKeyInput = {
  publicImageId: string;
  contentType: string;
};

export function generateObjectKey({
  publicImageId,
  contentType,
}: GenerateObjectKeyInput) {
  if (!isSupportedImageContentType(contentType)) {
    throw new Error(
      `Unsupported image content type: ${contentType}`,
    );
  }

  const extension = fileExtensionByContentType[contentType];

  return [
    "images",
    `${encodePathSegment(publicImageId)}.${extension}`,
  ].join("/");
}

function isSupportedImageContentType(
  contentType: string,
): contentType is SupportedImageContentType {
  return contentType in fileExtensionByContentType;
}

function encodePathSegment(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error("Storage path segment cannot be empty.");
  }

  return encodeURIComponent(normalizedValue);
}