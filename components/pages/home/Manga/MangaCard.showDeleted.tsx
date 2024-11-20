import { Eraser, Undo2 } from "lucide-react";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardProvider from "./MangaCard.provider";
import RestoreButtonMangaCard from "./Restore/RestoreButton.MangaCard";
import PermanentDeleteMangaCard from "./PermanentDelete/PermanentDeleteButton.MangaCard";

export default function MangaCardDeleted(props: PersonnalManga) {
  return (
    <MangaCardProvider {...props} hideContinueReading>
      <PermanentDeleteMangaCard mangaToPermDelete={props.id}>
        Supprimer
      </PermanentDeleteMangaCard>
      <RestoreButtonMangaCard mangaToRestore={props.id}>
        <Undo2 />
      </RestoreButtonMangaCard>
    </MangaCardProvider>
  );
}
