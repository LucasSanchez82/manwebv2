import { z } from "zod";
import { mangaWithoutImage } from "./mangaSchema";
import { fileToBase64 } from "@/lib/helpers/fileHelpers";
import { MAX_FILE_SIZE } from "./constant";

const isServer = typeof window === "undefined";

export const mangaSchemaClient = mangaWithoutImage.extend({
  image: z.union([
    z
      .string({ message: "Doit être une url valide" })
      .url({ message: "Doit être une url valide" })
      .describe(
        "Url de l'image de couverture ( https://exemple.com/image.jpg )"
      ),
    z
      .instanceof(FileList)
      .refine(
        (file) => file[0].type.startsWith("image/"),
        'Le fichier doit être une image'
      )
      .refine(
        (file) => file[0].size <= MAX_FILE_SIZE,
        `L'image doit faire maximum ${MAX_FILE_SIZE / (1024 * 1024)} MB`
      ),
  ]),
});

export const mangaSchemaClientPartial = mangaSchemaClient.partial();

export const mangasSchemaClient = z.array(mangaSchemaClient);
