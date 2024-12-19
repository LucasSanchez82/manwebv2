"use server"

import { mangaResponseSchema } from './schema'

export const getMangasFromMangadexAction = async (
  title: string,
  limit: number = 5
) => {
  const endpoint = `https://api.mangadex.org/manga`
  const requestedEndPoint = `${endpoint}?title=${title}&includes[]=cover_art&limit=${limit}`
  const response = await fetch(requestedEndPoint)
  return mangaResponseSchema.parse(await response.json())
}
