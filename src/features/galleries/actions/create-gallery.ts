"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { createGallerySchema } from "../schemas/create-gallery-schema";
import { createGalleryService } from "../services/create-gallery-service";
import { type CreateGalleryActionState } from "../types/create-gallery-action-state";

export async function createGalleryAction(
  _previousState: CreateGalleryActionState,
  formData: FormData,
): Promise<CreateGalleryActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = createGallerySchema.safeParse({
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
    await createGalleryService({
      ownerId: session.user.id,
      ...validationResult.data,
    });

    revalidatePath("/");
    revalidatePath("/galleries");

    return {
      success: true,
      submissionId: crypto.randomUUID(),
      message: "Galeria criada com sucesso.",
    };
  } catch (error) {
    console.error("Failed to create gallery:", error);

    return {
      success: false,
      message:
        "Não foi possível criar a galeria agora. Tente novamente em instantes.",
    };
  }
}