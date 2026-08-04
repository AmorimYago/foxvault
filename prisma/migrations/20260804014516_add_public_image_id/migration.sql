ALTER TABLE "images"
ADD COLUMN "publicImageId" TEXT;

UPDATE "images"
SET "publicImageId" = gen_random_uuid()::text
WHERE "publicImageId" IS NULL;

ALTER TABLE "images"
ALTER COLUMN "publicImageId" SET NOT NULL;

CREATE UNIQUE INDEX "images_publicImageId_key"
ON "images"("publicImageId");