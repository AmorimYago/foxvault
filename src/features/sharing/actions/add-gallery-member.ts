"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { addGalleryMemberSchema } from "../schemas/add-gallery-member-schema";
import { addGalleryMemberService } from "../services/add-gallery-member-service";
import { type AddGalleryMemberActionState } from "../types/add-gallery-member-action-state";

export async function addGalleryMemberAction(
  _previousState: AddGalleryMemberActionState,
  formData: FormData,
): Promise<AddGalleryMemberActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message:
        "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = addGalleryMemberSchema.safeParse({
    galleryId: formData.get("galleryId"),
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: "Revise os campos destacados.",
      fieldErrors:
        validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await addGalleryMemberService({
      ownerId: session.user.id,
      input: validationResult.data,
    });

    switch (result.status) {
      case "UNAUTHORIZED":
        return {
          success: false,
          message:
            "Você não possui permissão para compartilhar esta galeria.",
        };

      case "USER_NOT_FOUND":
        return {
          success: false,
          message:
            "Essa pessoa ainda não possui uma conta no FoxVault. Peça para ela entrar uma vez com esse e-mail.",
        };

      case "CANNOT_ADD_OWNER":
        return {
          success: false,
          message:
            "Você já é o dono desta galeria e não precisa ser adicionado como membro.",
        };

      case "ALREADY_MEMBER":
        return {
          success: false,
          message:
            "Essa pessoa já possui acesso a esta galeria.",
        };

      case "SUCCESS":
        revalidatePath("/galleries");
        revalidatePath(
          `/galleries/${validationResult.data.galleryId}`,
        );

        return {
          success: true,
          submissionId: crypto.randomUUID(),
          message: "Pessoa adicionada à galeria com sucesso.",
        };
    }
  } catch (error) {
    console.error("Failed to add gallery member:", error);

    return {
      success: false,
      message:
        "Não foi possível adicionar essa pessoa agora. Tente novamente em instantes.",
    };
  }
}