import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CreateGalleryDialog } from "@/features/galleries/components/create-gallery-dialog";
import { EmptyGalleriesState } from "@/features/galleries/components/empty-galleries-state";
import { GalleriesGrid } from "@/features/galleries/components/galleries-grid";
import { GalleriesPageHeader } from "@/features/galleries/components/galleries-page-header";
import { getGalleriesDashboardService } from "@/features/galleries/services/get-galleries-dashboard-service";

const CREATE_GALLERY_DIALOG_ID = "create-gallery-dialog";

export default async function GalleriesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { ownedGalleries, sharedGalleries } =
    await getGalleriesDashboardService({
      userId: session.user.id,
    });

  const hasOwnedGalleries = ownedGalleries.length > 0;
  const hasSharedGalleries = sharedGalleries.length > 0;
  const hasAnyGallery =
    hasOwnedGalleries || hasSharedGalleries;

  return (
    <div className="flex min-h-full flex-col p-8">
      <GalleriesPageHeader
        createGalleryDialogId={CREATE_GALLERY_DIALOG_ID}
      />

      {!hasAnyGallery ? (
        <EmptyGalleriesState
          createGalleryDialogId={CREATE_GALLERY_DIALOG_ID}
        />
      ) : (
        <div className="space-y-10 py-8">
          <section aria-labelledby="owned-galleries-title">
            <div>
              <h2
                id="owned-galleries-title"
                className="text-xl font-semibold text-zinc-100"
              >
                Minhas galerias
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Galerias criadas e administradas por você.
              </p>
            </div>

            {hasOwnedGalleries ? (
              <GalleriesGrid galleries={ownedGalleries} />
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
                Você ainda não criou nenhuma galeria.
              </p>
            )}
          </section>

          {hasSharedGalleries && (
            <section aria-labelledby="shared-galleries-title">
              <div>
                <h2
                  id="shared-galleries-title"
                  className="text-xl font-semibold text-zinc-100"
                >
                  Compartilhadas comigo
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Galerias em que outras pessoas deram acesso
                  para você.
                </p>
              </div>

              <GalleriesGrid galleries={sharedGalleries} />
            </section>
          )}
        </div>
      )}

      <CreateGalleryDialog id={CREATE_GALLERY_DIALOG_ID} />
    </div>
  );
}