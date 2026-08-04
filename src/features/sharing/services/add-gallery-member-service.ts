import { sharingRepository } from "../repositories/sharing-repository";
import { type AddGalleryMemberInput } from "../schemas/add-gallery-member-schema";

type AddGalleryMemberServiceInput = {
  ownerId: string;
  input: AddGalleryMemberInput;
};

type AddGalleryMemberServiceResult =
  | {
      status: "SUCCESS";
    }
  | {
      status: "UNAUTHORIZED";
    }
  | {
      status: "USER_NOT_FOUND";
    }
  | {
      status: "CANNOT_ADD_OWNER";
    }
  | {
      status: "ALREADY_MEMBER";
    };

export async function addGalleryMemberService({
  ownerId,
  input,
}: AddGalleryMemberServiceInput): Promise<AddGalleryMemberServiceResult> {
  const gallery = await sharingRepository.findOwnedGallery({
    galleryId: input.galleryId,
    ownerId,
  });

  if (!gallery) {
    return {
      status: "UNAUTHORIZED",
    };
  }

  const user = await sharingRepository.findUserByEmail(
    input.email,
  );

  if (!user) {
    return {
      status: "USER_NOT_FOUND",
    };
  }

  if (user.id === ownerId) {
    return {
      status: "CANNOT_ADD_OWNER",
    };
  }

  const existingMember =
    await sharingRepository.findGalleryMember({
      galleryId: gallery.id,
      userId: user.id,
    });

  if (existingMember) {
    return {
      status: "ALREADY_MEMBER",
    };
  }

  await sharingRepository.addGalleryMember({
    galleryId: gallery.id,
    userId: user.id,
    role: input.role,
  });

  return {
    status: "SUCCESS",
  };
}