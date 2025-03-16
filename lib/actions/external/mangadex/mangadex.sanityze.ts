import {
  ContentSchemaInputServer,
  ContentSchemaFromProvider,
} from '@/lib/schemas/contents/contentSchema'
import { MangadexResponse } from './mangadex.schema'
import { contentTypes } from '@/prisma/constant'

export type SanityzedMangadexResponseItem = ContentSchemaInputServer & {
  image: string
  isSelfHosted: boolean
}
export const sanityzeMangadexResponse = (
  response: MangadexResponse
): ContentSchemaFromProvider[] => {
  return response.data.map((manga) => {
    const coverRelation = manga.relationships.find(
      (rel) => rel.type === 'cover_art'
    )
    const cover = coverRelation?.attributes?.fileName
    const image = cover
      ? `/api/manga-image-proxy?image=${manga.id}/${cover}.512.jpg`
      : '/404.png'
    return {
      title: manga.attributes?.title.en || '',
      description: manga.attributes.description?.en ?? '',
      image,
      readerUrl: `https://mangadex.org/title/${manga.id}/${manga.attributes.title.en}`,
      chapter: 0,
      uniqueIdentifier: `mangadex-${manga.id}`,
      isSelfHosted: false,
      type: contentTypes.manga.name,
    }
  })
}
