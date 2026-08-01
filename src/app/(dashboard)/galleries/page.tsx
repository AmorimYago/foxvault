import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CreateGalleryDialog } from "@/features/galleries/components/create-gallery-dialog";
import { EmptyGalleriesState } from "@/features/galleries/components/empty-galleries-state";
import { GalleriesGrid } from "@/features/galleries/components/galleries-grid";
import { GalleriesPageHeader } from "@/features/galleries/components/galleries-page-header";
import { galleryRepository } from "@/features/galleries/repositories/gallery-repository";

const CREATE_GALLERY_DIALOG_ID = "create-gallery-dialog";

export default async function GalleriesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const galleries = await galleryRepository.listByOwner(session.user.id);

  return (
    <div className="flex min-h-full flex-col p-8">
      <GalleriesPageHeader
        createGalleryDialogId={CREATE_GALLERY_DIALOG_ID}
      />

      {galleries.length === 0 ? (
        <EmptyGalleriesState
          createGalleryDialogId={CREATE_GALLERY_DIALOG_ID}
        />
      ) : (
        <GalleriesGrid galleries={galleries} />
      )}

      <CreateGalleryDialog id={CREATE_GALLERY_DIALOG_ID} />
    </div>
  );
}