"use cache";

import { prisma } from "@/lib/prisma";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cacheTagEnum } from "../cacheTagEnum";
import { Optional } from "@prisma/client/runtime/library";

type Props = {
  userId: string;
  searchStr?: string;
  showDeleted?: boolean;
  typeIds?: number[];
};
export const getPersonnalContents = async ({
  userId,
  searchStr,
  showDeleted = false,
  typeIds = undefined,
}: Props) => {
  cacheLife("days");
  cacheTag(cacheTagEnum.GET_PERSONNAL_CONTENTS);
  const contents = await prisma.content.findMany({
    where: {
      deletedAt: showDeleted ? { not: null } : null,
      userId,
      title: searchStr
        ? { contains: searchStr, mode: "insensitive" }
        : undefined,
      typeId: typeIds && { in: typeIds },
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
  return contents;
};

export type PersonnalContents = Awaited<
  ReturnType<typeof getPersonnalContents>
>;

type PersonnalContentPrimitive = PersonnalContents[number];

type NullableAlsoOptional<T> = T extends null
  ? undefined | T
  : T extends (infer U)[]
    ? NullableAlsoOptional<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: NullableAlsoOptional<T[K]> }
      : T;

export type PersonnalContent = NullableAlsoOptional<PersonnalContents[number]>;
