import { z } from "zod";
import { MAX_FILE_SIZE } from "./constant";

export const mangaWithoutImage = z.object({
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
    ),

  chapter: z.coerce
    .number({ message: "Doit être un nombre valide" })
    .describe("Chapitre, par exemple le dernier chapitre lu"),
});

export const mangaSchemaInputServer = mangaWithoutImage.extend({
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
export const mangaSchemaInputServerWithId = mangaSchemaInputServer.extend({
  id: z.coerce.bigint().describe("Id du manga"),
});
export const mangaSchemaOutputServer = mangaSchemaInputServer.extend({
  id: z.coerce.bigint().describe("Id du manga"),
});
