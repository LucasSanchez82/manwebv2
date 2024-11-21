import { z } from "zod";

// Tag Schema
const tagSchema = z.object({
  id: z.string(),
  type: z.literal("tag"),
  attributes: z.object({
    name: z.object({
      en: z.string(),
    }),
    description: z.object({}).optional(),
    group: z.string(),
    version: z.number(),
  }),
  relationships: z.array(z.any()).optional(),
});
const coverArtAttributesSchema = z.object({
  description: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  locale: z.string().optional().nullable(),
  //   createdAt: z.string().date().optional(),
  //   updatedAt: z.string().date().optional(),
  version: z.number().optional().nullable(),
});

const relationshipSchema = z.object({
  id: z.string(),
  type: z.string(),
  attributes: coverArtAttributesSchema.optional(),
});

// Manga Attributes Schema
export const mangaAttributesSchema = z.object({
  title: z.object({
    en: z.string(),
  }),
  altTitles: z.array(z.record(z.string())).optional(),
  description: z
    .object({
      en: z.string().optional(),
    })
    .optional(),
  isLocked: z.boolean(),
  links: z.record(z.string()).nullable(),
  originalLanguage: z.string(),
  lastVolume: z.string().nullable(),
  lastChapter: z.string().nullable(),
  publicationDemographic: z.string().nullable(),
  status: z.string(),
  year: z.number().nullable(),
  contentRating: z.string(),
  tags: z.array(tagSchema),
  state: z.string(),
  chapterNumbersResetOnNewVolume: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.number(),
  availableTranslatedLanguages: z.array(z.string()),
  latestUploadedChapter: z.string().nullable(),
});

// Manga Item Schema
export const mangaItemSchema = z.object({
  id: z.string(),
  type: z.literal("manga"),
  attributes: mangaAttributesSchema,
  relationships: z.array(relationshipSchema),
});

// Full Response Schema
export const mangaResponseSchema = z.object({
  result: z.literal("ok"),
  response: z.literal("collection"),
  data: z.array(mangaItemSchema),
  //   limit: z.number(),
  //   offset: z.number(),
  total: z.number(),
});

export type MangadexResponse = z.infer<typeof mangaResponseSchema>;
export type MangadexItem = z.infer<typeof mangaItemSchema>;
export type MangadexAttributes = z.infer<typeof mangaAttributesSchema>;
export type MangadexRelationshipSchema = z.infer<typeof relationshipSchema>;
