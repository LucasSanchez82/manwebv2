import { z } from "zod";
import { mangaWithoutImage } from "./mangaSchema";
import { fileToBase64 } from "@/lib/helpers/fileHelpers";

const isServer = typeof window === "undefined";
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB / 3MO
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const mangaSchemaClient = mangaWithoutImage.extend({
  image: z.union([
    z
      .string()
      .url({ message: "Doit être une url valide" })
      .describe(
        "Url de l'image de couverture ( https://exemple.com/image.jpg )"
      ),
    z
      .any()
      .refine(
        (files) => !isServer && files && files?.length && files?.length <= 1,
        "Vous ne devez télécharger qu'un seul fichier"
      )
      .refine(
        (files) => !isServer && files[0] instanceof Blob,
        "Ce fichier n'est pas un Blob"
      )
      .refine(
        (files) => !isServer && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        `Les types de fichiers acceptes sont ${ACCEPTED_IMAGE_TYPES.map(
          (str) => str.split("/")[1]
        ).join(", ")}`
      )
      .refine((files) => {
        if (isServer) return true;
        console.log({
          fileSize: files[0].size,
          MAX_FILE_SIZE,
        });
        return files[0].size <= MAX_FILE_SIZE;
      }, `L'image doit faire maximum ${MAX_FILE_SIZE / (1024 * 1024)} MB`)
      .refine(async (files) => {
        if (isServer) return true;
        try {
        const base64 = await fileToBase64(files);
          return true;
        } catch (error) {
          return false;
        }
      }, "Failed to convert image to base64")
      .transform(async (files) => {
        if (isServer) return "";
        const base64 = await fileToBase64(files);
        return base64;
      }),
  ]),
});

export const mangaSchemaClientPartial = mangaSchemaClient.partial();

export const mangasSchemaClient = z.array(mangaSchemaClient);
