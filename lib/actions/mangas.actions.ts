"use server";

import { expireTag } from "next/cache";
import { auth } from "../auth/auth";
import { prisma } from "../prisma";
import { cacheTagEnum } from "../cachedRequests/cacheTagEnum";

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
