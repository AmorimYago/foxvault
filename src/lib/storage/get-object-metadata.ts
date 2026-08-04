import "server-only";

import { HeadObjectCommand } from "@aws-sdk/client-s3";

import { r2BucketName, r2Client } from "./r2-client";

type GetObjectMetadataInput = {
  objectKey: string;
};

export async function getObjectMetadata({
  objectKey,
}: GetObjectMetadataInput) {
  const response = await r2Client.send(
    new HeadObjectCommand({
      Bucket: r2BucketName,
      Key: objectKey,
    }),
  );

  return {
    contentLength: response.ContentLength ?? null,
    contentType: response.ContentType ?? null,
    etag: response.ETag ?? null,
    lastModified: response.LastModified ?? null,
  };
}