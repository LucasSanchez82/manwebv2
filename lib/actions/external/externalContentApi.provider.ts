import { ContentTypeKey } from '@/prisma/constant'
import { sanityzeMangadexResponse } from '@/lib/actions/external/mangadex/mangadex.sanityze'
import { getMangasFromMangadexAction } from '@/lib/actions/external/mangadex/mangadex.action'
import { ContentSchemaInputServer } from '@/lib/schemas/contents/contentSchema'
import getFilmsTmdbMovies from './tmdb/tmdb.action'
import sanitizeTmdbMoviesResponse from './tmdb/tmdb.sanitize'

type Props = Partial<{
  [key in ContentTypeKey]: (
    title: string,
    limit?: number
  ) => Promise<ContentSchemaInputServer[]>
}>

export const apiContentProviders: Props = {
  manga: async (title: string, limit?: number) =>
    sanityzeMangadexResponse(await getMangasFromMangadexAction(title, limit)),
  film: async (title: string, limit?: number) =>
    sanitizeTmdbMoviesResponse(await getFilmsTmdbMovies(title)),
}
