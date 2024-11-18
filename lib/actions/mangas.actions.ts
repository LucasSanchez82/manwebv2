"use server";

import { expireTag } from "next/cache";
import { auth } from "../auth/auth";
import { prisma } from "../prisma";
import { cacheTagEnum } from "../cachedRequests/cacheTagEnum";
import { webdav } from "../webdav";

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
export const deleteMangaAction = async (id: number | bigint) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { error: "Unauthorized" };
  }

  const mangaToDelete = await prisma.manga.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!mangaToDelete) {
    return { error: "Manga not found" };
  }

  //HARD DELETE
  if (mangaToDelete.deletedAt) {
    const deletedManga = await prisma.manga.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    deletedManga.image && (await deleteOldFile(deletedManga.image));

    return deletedManga;
  }
  //   SSOFT DELETE
  const softDeletedManga = await prisma.manga.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  expireTag(cacheTagEnum.GET_PERSONNAL_MANGAS);

  return softDeletedManga;
};
