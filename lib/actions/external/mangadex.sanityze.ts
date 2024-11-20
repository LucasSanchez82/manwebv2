import { MangaSchemaInputServer } from "@/lib/schemas/mangas/mangaSchema";
import {
  MangadexRelationshipCoverArtSchema,
  MangadexRelationshipSchema,
  MangadexResponse,
} from "./schema";

export type SanityzedMangadexResponseItem = MangaSchemaInputServer & {
  image: string;
  mangadexId: string;
  isSelfHosted: boolean;
};
export const sanityzeMangadexResponse = (
  response: MangadexResponse
): SanityzedMangadexResponseItem[] => {
  return response.data.map((manga) => {
    const coverRelation: MangadexRelationshipCoverArtSchema =
      manga.relationships.find(
        (rel) => rel.id === "cover_art"
      ) as MangadexRelationshipCoverArtSchema;
    const cover = coverRelation?.attributes?.fileName ?? "/404.png";

    return {
      title: manga.attributes.title.en,
      description: manga.attributes.description?.en ?? "",
      image: cover
        ? `https://mangadex.org/covers/${manga.id}/${cover}.jpg`
        : "/404.png",
      readerUrl: `https://mangadex.org/title/${manga.id}/${manga.attributes.title.en}`,
      chapter: 0,
      mangadexId: manga.id,
      isSelfHosted: false,
    };
  });
};
