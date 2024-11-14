import { z } from "zod";
import {
  mangaSchemaClient,
  mangaSchemaClientPartial,
} from "../schemas/mangas/mangaSchemaClient";

export type MangaSchemaClientPartial = z.infer<typeof mangaSchemaClientPartial>;
export type MangaSchemaClient = z.infer<typeof mangaSchemaClient>;
