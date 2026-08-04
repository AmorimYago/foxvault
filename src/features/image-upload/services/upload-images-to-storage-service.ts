type UploadImageToStorageItem = {
  imageId: string;
  file: File;
  uploadUrl: string;
  contentType: string;
};

export type UploadedStorageItem = {
  imageId: string;
  etag: string | null;
};

type UploadImagesToStorageServiceInput = {
  uploads: UploadImageToStorageItem[];
  concurrency?: number;
};

const defaultUploadConcurrency = 4;

export async function uploadImagesToStorageService({
  uploads,
  concurrency = defaultUploadConcurrency,
}: UploadImagesToStorageServiceInput): Promise<
  UploadedStorageItem[]
> {
  if (uploads.length === 0) {
    return [];
  }

  const normalizedConcurrency = Math.max(
    1,
    Math.min(concurrency, uploads.length),
  );

  const results = new Array<UploadedStorageItem>(
    uploads.length,
  );

  let nextUploadIndex = 0;

  async function uploadWorker() {
    while (nextUploadIndex < uploads.length) {
      const currentUploadIndex = nextUploadIndex;
      nextUploadIndex += 1;

      const upload = uploads[currentUploadIndex];

      if (!upload) {
        continue;
      }

      results[currentUploadIndex] =
        await uploadSingleImage(upload);
    }
  }

  await Promise.all(
    Array.from(
      {
        length: normalizedConcurrency,
      },
      () => uploadWorker(),
    ),
  );

  return results;
}

async function uploadSingleImage({
  imageId,
  file,
  uploadUrl,
  contentType,
}: UploadImageToStorageItem): Promise<UploadedStorageItem> {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload image ${file.name}. Storage returned HTTP ${response.status}.`,
    );
  }

  return {
    imageId,
    etag: response.headers.get("ETag"),
  };
}