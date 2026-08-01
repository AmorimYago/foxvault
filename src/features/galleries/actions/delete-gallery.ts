"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { deleteGallerySchema } from "../schemas/delete-gallery-schema";
import { deleteGalleryService } from "../services/delete-gallery-service";
import { type DeleteGalleryActionState } from "../types/delete-gallery-action-state";

export async function deleteGalleryAction(
  _previousState: DeleteGalleryActionState,
  formData: FormData,
): Promise<DeleteGalleryActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = deleteGallerySchema.safeParse({
    galleryId: formData.get("galleryId"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: "Não foi possível identificar a galeria.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await deleteGalleryService({
      ownerId: session.user.id,
      ...validationResult.data,
    });

    revalidatePath("/galleries");

    return {
      success: true,
      message: "Galeria excluída com sucesso.",
    };
  } catch (error) {
    console.error("Failed to delete gallery:", error);

    return {
      success: false,
      message:
        "Não foi possível excluir a galeria agora. Tente novamente em instantes.",
    };
  }
}