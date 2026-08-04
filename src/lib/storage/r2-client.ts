import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} = process.env;

if (!R2_ACCOUNT_ID) {
  throw new Error("Missing R2_ACCOUNT_ID environment variable.");
}

if (!R2_ACCESS_KEY_ID) {
  throw new Error("Missing R2_ACCESS_KEY_ID environment variable.");
}

if (!R2_SECRET_ACCESS_KEY) {
  throw new Error("Missing R2_SECRET_ACCESS_KEY environment variable.");
}

if (!R2_BUCKET_NAME) {
  throw new Error("Missing R2_BUCKET_NAME environment variable.");
}

export const r2BucketName = R2_BUCKET_NAME;

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});