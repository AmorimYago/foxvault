"use server";

import { auth } from "@/auth";

import { requestUploadUrlsSchema } from "../schemas/request-upload-urls-schema";
import { requestUploadUrlsService } from "../services/request-upload-urls-service";
import { type RequestUploadUrlsResult } from "../types/request-upload-urls";

export async function requestUploadUrlsAction(
  input: unknown,
): Promise<RequestUploadUrlsResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente para continuar.",
    };
  }

  const validationResult = requestUploadUrlsSchema.safeParse(input);

  if (!validationResult.success) {
    const fieldErrors =
      validationResult.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Revise os dados das imagens selecionadas.",
      fieldErrors: {
        galleryId: fieldErrors.galleryId,
        images: fieldErrors.images,
      },
    };
  }

  try {
    const uploads = await requestUploadUrlsService({
      userId: session.user.id,
      input: validationResult.data,
    });

    if (!uploads) {
      return {
        success: false,
        message:
          "Você não possui permissão para enviar imagens para esta galeria.",
      };
    }

    return {
      success: true,
      uploads,
    };
  } catch (error) {
    console.error("Failed to request upload URLs:", error);

    return {
      success: false,
      message:
        "Não foi possível preparar o envio das imagens agora. Tente novamente em instantes.",
    };
  }
}