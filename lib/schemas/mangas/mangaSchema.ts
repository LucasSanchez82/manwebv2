import { z } from "zod";

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
      .string()
      .regex(/^[A-Za-z0-9+/]*={0,2}$/, { 
        message: "Doit être une chaîne base64 valide" 
      })
      .describe("Image de couverture en base64"),
  ]),
});
export const mangaSchemaOutputServer = mangaSchemaInputServer.extend({
  id: z.coerce.bigint().describe("Id du manga"),
});

