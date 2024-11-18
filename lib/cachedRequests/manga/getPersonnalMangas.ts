"use cache";

import { prisma } from "@/lib/prisma";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cacheTagEnum } from "../cacheTagEnum";

export const getPersonnalMangas = async (userId: string) => {
  cacheLife("days");
  cacheTag(cacheTagEnum.GET_PERSONNAL_MANGAS);
  const mangas = await prisma.manga.findMany({
    where: { deletedAt: null, userId },
    orderBy: { createdAt: "desc" },
  });
  return mangas;
};
