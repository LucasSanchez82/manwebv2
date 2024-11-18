"use cache";

import { prisma } from "@/lib/prisma";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cacheTagEnum } from "../cacheTagEnum";

type Props = {
  userId: string;
  searchStr?: string;
  showDeleted?: boolean;
};
export const getPersonnalMangas = async ({
  userId,
  searchStr,
  showDeleted = false,
}: Props) => {
  cacheLife("days");
  cacheTag(cacheTagEnum.GET_PERSONNAL_MANGAS);
  const mangas = await prisma.manga.findMany({
    where: {
      deletedAt: showDeleted ? { not: null } : null,
      userId,
      title: searchStr
        ? { contains: searchStr, mode: "insensitive" }
        : undefined,
    },
    orderBy: { createdAt: "desc" },
    select: {
      title: true,
      readerUrl: true,
      image: true,
      chapter: true,
      isSelfHosted: true,
      description: true,
      id: true,
    },
  });
  return mangas;
};

export type PersonnalMangas = Awaited<ReturnType<typeof getPersonnalMangas>>;
export type PersonnalManga = PersonnalMangas[number];
