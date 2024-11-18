import { Undo2 } from "lucide-react";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardProvider from "./MangaCard.provider";
import { Button } from "@/components/ui/button";

export default function MangaCardDeleted(props: PersonnalManga) {
  const imageUrl = `${props.isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + "/" : ""}${props.image}`;
  return (
    <MangaCardProvider {...props}>
      <Button variant={"outline"}>
        <Undo2 className="h-4 w-4 dark:text-white text-black" />
      </Button>
    </MangaCardProvider>
  );
}
