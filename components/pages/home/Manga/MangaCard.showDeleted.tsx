import { Undo2 } from "lucide-react";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardProvider from "./MangaCard.provider";
import { Button } from "@/components/ui/button";
import RestoreButtonMangaCard from "./Restore/RestoreButton.MangaCard";

export default function MangaCardDeleted(props: PersonnalManga) {
  return (
    <MangaCardProvider {...props}>
      <RestoreButtonMangaCard mangaToRestore={props.id}>
        <Undo2 />
      </RestoreButtonMangaCard>
    </MangaCardProvider>
  );
}
