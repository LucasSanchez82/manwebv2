import { z } from 'zod'

const movieSchema = z.object({
  adult: z.boolean().default(true),
  backdrop_path: z.string().nullable().optional(),
  id: z.number().int().default(0),
  name: z.string().optional().nullable(),
  original_language: z.string().optional().nullable(),
  original_name: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  poster_path: z.string().optional().nullable(),
  media_type: z.string(),
  genre_ids: z.array(z.number().int()).optional().nullable(),
  popularity: z.number().default(0),
  first_air_date: z.string().optional().nullable(),
  // release_date: z.string(),
  // video: z.boolean().default(true),
  vote_average: z.number().default(0),
  vote_count: z.number().int().default(0),
  origin_country: z.array(z.string()).optional(),
})

const TMDBResponseSchema = z.object({
  page: z.number().int().default(0),
  results: z.array(movieSchema),
  total_pages: z.number().int().default(0),
  total_results: z.number().int().default(0),
})

export type TMDBResponse = z.infer<typeof TMDBResponseSchema>
export type Movie = z.infer<typeof movieSchema>

export default TMDBResponseSchema
