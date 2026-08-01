"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { updateGallerySchema } from "../schemas/update-gallery-schema";
import { updateGalleryService } from "../services/update-gallery-service";
import { type UpdateGalleryActionState } from "../types/update-gallery-action-state";

export async function updateGalleryAction(
  _previousState: UpdateGalleryActionState,
  formData: FormData,
): Promise<UpdateGalleryActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = updateGallerySchema.safeParse({
    galleryId: formData.get("galleryId"),
    name: formData.get("name"),
    description: formData.get("description"),
    visibility: formData.get("visibility"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: "Revise os campos destacados.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await updateGalleryService({
      ownerId: session.user.id,
      ...validationResult.data,
    });

    revalidatePath("/galleries");

    return {
      success: true,
      submissionId: crypto.randomUUID(),
      message: "Galeria atualizada com sucesso.",
    };
  } catch (error) {
    console.error("Failed to update gallery:", error);

    return {
      success: false,
      message:
        "Não foi possível atualizar a galeria agora. Tente novamente em instantes.",
    };
  }
}