import { z } from 'zod'

const MovieResult = z.object({
  adult: z.boolean().default(true),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number().default(0),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().default(0),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean().default(true),
  vote_average: z.number().default(0),
  vote_count: z.number().int().default(0),
})

const TMDBResponse = z.object({
  page: z.number().int().default(0),
  results: z.array(MovieResult),
  total_pages: z.number().int().default(0),
  total_results: z.number().int().default(0),
})

export type TMDBResponseType = z.infer<typeof TMDBResponse>
export type MovieResultType = z.infer<typeof MovieResult>

export default TMDBResponse
