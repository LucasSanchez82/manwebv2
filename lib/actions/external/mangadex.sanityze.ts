import { ContentSchemaInputServer } from '@/lib/schemas/contents/contentSchema'
import { MangadexResponse } from './schema'

export type SanityzedMangadexResponseItem = ContentSchemaInputServer & {
  image: string
  mangadexId: string
  isSelfHosted: boolean
}
export const sanityzeMangadexResponse = (
  response: MangadexResponse
): SanityzedMangadexResponseItem[] => {
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
      mangadexId: manga.id,
      isSelfHosted: false,
      type: 'manga',
    }
  })
}
