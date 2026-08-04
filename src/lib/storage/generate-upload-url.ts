import "server-only";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2BucketName, r2Client } from "./r2-client";

const uploadUrlExpirationInSeconds = 5 * 60;

type GenerateUploadUrlInput = {
  objectKey: string;
  contentType: string;
};

export async function generateUploadUrl({
  objectKey,
  contentType,
}: GenerateUploadUrlInput) {
  const command = new PutObjectCommand({
    Bucket: r2BucketName,
    Key: objectKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, {
    expiresIn: uploadUrlExpirationInSeconds,
  });

  return {
    uploadUrl,
    expiresInSeconds: uploadUrlExpirationInSeconds,
  };
}