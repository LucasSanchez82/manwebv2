"use cache";

import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { mangaResponseSchema } from "./schema";

export const getMangasFromMangadexAction = async (
  title: string,
  limit: number = 5
) => {
  cacheLife("days");
  const endpoint = `https://api.mangadex.org/manga/`;
  const requestedEndPoint = `${endpoint}?title=${title}&includes[]=cover_art&limit=${limit}`;
  console.log(requestedEndPoint);
  const response = await fetch(requestedEndPoint);
  return mangaResponseSchema.parse(await response.json());
};
