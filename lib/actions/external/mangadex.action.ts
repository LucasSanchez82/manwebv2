'use server'

import { contentResponseSchema } from './schema'
import { sanityzeMangadexResponse } from '@/lib/actions/external/mangadex.sanityze'
import { type ContentSchemaFromProvider } from '@/lib/schemas/contents/contentSchema'

export const getContentsFromMangadexAction = async (
  title: string,
  limit: number = 5
): Promise<ContentSchemaFromProvider[]> => {
  const endpoint = `https://api.mangadex.org/manga`
  const requestedEndPoint = `${endpoint}?title=${title}&includes[]=cover_art&limit=${limit}`
  const response = await fetch(requestedEndPoint)
  const contentResult = contentResponseSchema.parse(await response.json())
  return sanityzeMangadexResponse(contentResult)
}
