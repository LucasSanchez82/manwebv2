import {
  ContentSchemaInputServer,
  ContentSchemaFromProvider,
} from '@/lib/schemas/contents/contentSchema'
import { type PhenixScanResponse } from './phenixscan.schema'
import { contentTypes } from '@/prisma/constant'

export type SanityzedMangadexResponseItem = ContentSchemaInputServer & {
  image: string
  isSelfHosted: boolean
}
export const sanityzeMangadexResponse = (
  response: PhenixScanResponse
): ContentSchemaFromProvider[] => {
  return (
    response.series?.all?.map((item) => ({
      chapter: 0,
      type: contentTypes.manga.name,
      uniqueIdentifier: `phenixscan-${item.ID}`,
      title: item.post_title,
      description: '',
      image: item.post_image ?? '',
      isSelfHosted: false,
    })) ?? []
  )
}
