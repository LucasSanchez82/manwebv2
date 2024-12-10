"use server";

import { unstable_expireTag as expireTag } from "next/cache";
import { auth } from "../auth/auth";
import { prisma } from "../prisma";
import { cacheTagEnum } from "../cachedRequests/cacheTagEnum";
import { webdav } from "../webdav";
import { ServerResponseHandler } from "./type";

const WEBDAV_UPLOAD_PATH = process.env.WEBDAV_UPLOAD_PATH!;

export const deleteOldFile = async (filePath: string): Promise<void> => {
  try {
    await webdav.deleteFile(WEBDAV_UPLOAD_PATH + filePath);
    console.log("Old file deleted successfully");
  } catch (error) {
    console.error("Error deleting old file:", error);
    // Continue execution even if delete fails
  }
};
export const deleteContentAction: ServerResponseHandler = async (
  id: number | bigint
) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { error: "Unauthorized" };
  }

  const contentToDelete = await prisma.content.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!contentToDelete) {
    return { error: "Contenu non trouvé" };
  }

  //HARD DELETE
  if (contentToDelete.deletedAt) {
    const deletedContent = await prisma.content.delete({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        title: true,
        chapter: true,
        description: true,
        readerUrl: true,
        image: true,
        isSelfHosted: true,
      },
    });

    deletedContent.image &&
      deletedContent.isSelfHosted &&
      (await deleteOldFile(deletedContent.image));
    expireTag(cacheTagEnum.GET_PERSONNAL_CONTENTS);

    return {
      data: {
        deletedContent: deletedContent,
        message: "Contenu supprimé définitivement",
      },
    };
  }
  //   SOFT DELETE
  const softDeletedContent = await prisma.content.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      deletedAt: new Date(),
    },
    select: {
      title: true,
      chapter: true,
      description: true,
      readerUrl: true,
      image: true,
      isSelfHosted: true,
    },
  });

  expireTag(cacheTagEnum.GET_PERSONNAL_CONTENTS);

  return {
    data: {
      softDeletedContent: softDeletedContent,
      message: "Contenu déplacé dans la corbeille",
    },
  };
};

export const restoreContentAction: ServerResponseHandler = async (
  id: number | bigint
) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const currentContent = await prisma.content.findUnique({
      where: {
        userId: session.user.id,
        id,
      },
    });
    if (!currentContent) return { error: "Ce contenu n'existe pas ou plus" };
    if (!currentContent?.deletedAt)
      return { error: "Ce contenu n'est pas dans la corebeille" };
    const restoredContent = await prisma.content.update({
      where: {
        userId: session.user.id,
        id,
      },
      data: {
        deletedAt: null,
      },
      select: {
        title: true,
        chapter: true,
        description: true,
        readerUrl: true,
        image: true,
        isSelfHosted: true,
      },
    });
    expireTag(cacheTagEnum.GET_PERSONNAL_CONTENTS);
    return {
      data: { restoredContent: restoredContent, message: "Contenu restauré" },
    };
  } catch (error) {
    return { error: "Erreur interne du serveur" };
  }
};
