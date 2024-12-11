import { z } from "zod";
import { MAX_FILE_SIZE } from "./constant";
import { contentTypesKeys } from "@/prisma/constant";

export const contentWithoutImage = z.object({
  title: z
    .string({ message: "Doit être une chaine de caractere valide" })
    .min(3, { message: "Doit contenir au moins 3 lettres" })
    .describe("titre"),
  description: z.string().optional().nullable().describe("Description"),
  readerUrl: z
    .string()
    .url({ message: "Doit être une url valide ( https://exemple.com/ )" })
    .describe(
      "Url du lecteur en ligne ( https://exemple.com/lecture-enligne/one-piece )"
    )
    .nullable(),

  chapter: z.coerce
    .number({ message: "Doit être un nombre valide" })
    .describe("Chapitre, par exemple le dernier chapitre lu"),
  type: z
    .enum([...contentTypesKeys] as [string, ...string[]], {
      message: "Doit être un type de contenu valide",
    })
    .describe('Type de contenu (ex: "manga")'),
});

export const contentSchemaInputServer = contentWithoutImage.extend({
  image: z.union([
    z
      .string()
      .url({ message: "Doit être une url valide" })
      .describe(
        "Url de l'image de couverture ( https://exemple.com/image.jpg )"
      ),
    z
      .instanceof(File)
      .refine(
        (file) => file.type.startsWith("image/"),
        "Le fichier doit être une image"
      )
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `L'image doit faire maximum ${MAX_FILE_SIZE / (1024 * 1024)} MB`
      ),
  ]),
});
export const contentSchemaInputServerWithId = contentSchemaInputServer.extend({
  id: z.coerce.bigint().describe("Id du contenu"),
});
export const contentSchemaOutputServer = contentSchemaInputServer.extend({
  id: z.coerce.bigint().describe("Id du contenu"),
});

export type ContentSchemaInputServer = z.infer<typeof contentSchemaInputServer>;
