"use cache";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cacheTagEnum } from "../cacheTagEnum";
import { SanitizedSearchParamsForSearch } from "./sanitizeSearchParamsForSearch";

type Props = {
  userId: string;
  showDeleted?: boolean;
  filters: SanitizedSearchParamsForSearch;
};
export const getPersonnalContents = async ({
  userId,
  showDeleted = false,
  filters: { itempsPerPage, page, search = "", types = [] },
}: Props) => {
  cacheLife("days");
  cacheTag(cacheTagEnum.GET_PERSONNAL_CONTENTS);

  const query: Prisma.ContentFindManyArgs = {
    where: {
      deletedAt: showDeleted ? { not: null } : null,
      userId,
      title: search ? { contains: search, mode: "insensitive" } : undefined,

      typeId: types.length > 0 ? { in: types } : undefined,
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
    take: itempsPerPage,
    skip: itempsPerPage * (page - 1),
  };

  const [contents, count] = await prisma.$transaction([
    prisma.content.findMany(query),
    prisma.content.count({ where: query.where }),
  ]);

  return { contents, itemsCount: count };
};

export type PersonnalContents = Awaited<
  ReturnType<typeof getPersonnalContents>
>["contents"];

type PersonnalContentPrimitive = PersonnalContents[number];
export type PersonnalContent = PersonnalContentPrimitive;
