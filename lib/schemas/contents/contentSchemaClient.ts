import { z } from 'zod'
import { contentWithoutImage } from './contentSchema'
import { MAX_FILE_SIZE } from './constant'
import { contentTypesKeys } from '@/prisma/constant'

export const contentSchemaClient = contentWithoutImage.extend({
  image: z
    .union([
      z
        .string({
          message: 'Doit être une image valide (ou url si selectionné)',
        })
        .url({ message: 'Doit être une url valide' })
        .describe(
          "Url de l'image de couverture ( https://exemple.com/image.jpg )"
        ),
      z
        .instanceof(FileList)
        .refine(
          (file) => file[0].type.startsWith('image/'),
          'Le fichier doit être une image'
        )
        .refine(
          (file) => file[0].size <= MAX_FILE_SIZE,
          `L'image doit faire maximum ${MAX_FILE_SIZE / (1024 * 1024)} MB`
        ),
    ])
    .optional()
    .nullable(),
})

export const contentSchemaClientPartial = contentSchemaClient.partial()

export const contentsSchemaClient = z.array(contentSchemaClient)
