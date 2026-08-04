import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { EmptyGalleryImages } from "@/features/galleries/components/empty-gallery-images";
import { GalleryDetailsHeader } from "@/features/galleries/components/gallery-details-header";
import { getGalleryDetailsService } from "@/features/galleries/services/get-gallery-details-service";
import { UploadDialog } from "@/features/image-upload/components/upload-dialog";
import { GalleryImagesGrid } from "@/features/images/components/gallery-images-grid";
import { getGalleryImagesService } from "@/features/images/services/get-gallery-images-service";

type GalleryDetailsPageProps = {
  params: Promise<{
    galleryId: string;
  }>;
};

export default async function GalleryDetailsPage({
  params,
}: GalleryDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { galleryId } = await params;

  const gallery = await getGalleryDetailsService({
    galleryId,
    userId: session.user.id,
  });

  if (!gallery) {
    notFound();
  }

  const images = await getGalleryImagesService({
    galleryId: gallery.id,
  });

  const uploadDialogId = `upload-images-dialog-${gallery.id}`;

  const canUploadImages =
    gallery.userRole === "OWNER" ||
    gallery.userRole === "EDITOR";

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-6 lg:p-8">
        <GalleryDetailsHeader
          gallery={gallery}
          uploadDialogId={uploadDialogId}
        />

        {images.length === 0 ? (
          <EmptyGalleryImages
            uploadDialogId={uploadDialogId}
            canUploadImages={canUploadImages}
          />
        ) : (
          <GalleryImagesGrid images={images} />
        )}
      </div>

      <UploadDialog
        dialogId={uploadDialogId}
        galleryId={gallery.id}
        galleryName={gallery.name}
      />
    </>
  );
}