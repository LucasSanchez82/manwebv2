import { GetTmdbMoviesReturnType } from '@/lib/actions/external/tmdb/tmdb.action'
import { ContentSchemaInputServer } from '@/lib/schemas/contents/contentSchema'
const sanitizeTmdbMoviesResponse = async (
  data: GetTmdbMoviesReturnType
): Promise<ContentSchemaInputServer[]> => {
  return (await data).results.map((movie) => {
    return {
      title: movie.title,
      description: movie.overview,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      readerUrl: `https://www.themoviedb.org/movie/${movie.id}`,
      type: 'film',
      chapter: 0,
    }
  })
}

export default sanitizeTmdbMoviesResponse
