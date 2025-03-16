import { z } from 'zod'

const phenixScanItemSchema = z.object({
  ID: z.number(),
  post_image: z.string().nullable().optional(),
  post_title: z.string(),
  post_genres: z.array(z.string()).or(z.string()).nullable().optional(),
  post_type: z.string().nullable().optional(),
  post_status: z.string().nullable().optional(),
  post_link: z.string().url().nullable().optional(),
  post_latest: z.string().nullable().optional(),
})

export const phenixScanResponseSchema = z.object({
  series: z
    .array(
      z.object({
        all: z.array(phenixScanItemSchema).optional(),
      })
    )
    .optional()
    .transform((seriesArray) =>
      seriesArray && seriesArray.length > 0 ? seriesArray[0] : undefined
    ),
})

export type PhenixScanItem = z.infer<typeof phenixScanItemSchema>
export type PhenixScanResponse = z.infer<typeof phenixScanResponseSchema>
