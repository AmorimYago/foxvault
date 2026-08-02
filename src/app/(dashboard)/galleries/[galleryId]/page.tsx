import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { EmptyGalleryImages } from "@/features/galleries/components/empty-gallery-images";
import { GalleryDetailsHeader } from "@/features/galleries/components/gallery-details-header";
import { getGalleryDetailsService } from "@/features/galleries/services/get-gallery-details-service";

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

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 lg:p-8">
      <GalleryDetailsHeader gallery={gallery} />

      <EmptyGalleryImages />
    </div>
  );
}