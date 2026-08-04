"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { confirmUploadsSchema } from "../schemas/confirm-uploads-schema";
import { confirmUploadsService } from "../services/confirm-uploads-service";
import { type ConfirmUploadsResult } from "../types/confirm-uploads";

export async function confirmUploadsAction(
  input: unknown,
): Promise<ConfirmUploadsResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = confirmUploadsSchema.safeParse(input);

  if (!validationResult.success) {
    const fieldErrors =
      validationResult.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Revise os dados das imagens enviadas.",
      fieldErrors: {
        galleryId: fieldErrors.galleryId,
        uploads: fieldErrors.uploads,
      },
    };
  }

  try {
    const result = await confirmUploadsService({
      userId: session.user.id,
      input: validationResult.data,
    });

    if (result.status === "UNAUTHORIZED") {
      return {
        success: false,
        message:
          "Você não possui permissão para confirmar imagens nesta galeria.",
      };
    }

    if (result.status === "INVALID_UPLOAD") {
      return {
        success: false,
        message: result.message,
      };
    }

    revalidatePath("/");
    revalidatePath("/galleries");
    revalidatePath(
      `/galleries/${validationResult.data.galleryId}`,
    );

    return {
      success: true,
      confirmedUploads: result.confirmedUploads,
    };
  } catch (error) {
    console.error("Failed to confirm uploads:", error);

    return {
      success: false,
      message:
        "Não foi possível confirmar as imagens agora. Os arquivos permanecem protegidos no armazenamento e a confirmação poderá ser tentada novamente.",
    };
  }
}