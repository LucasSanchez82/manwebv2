import { Undo2 } from "lucide-react";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardProvider from "./MangaCard.provider";
import RestoreButtonMangaCard from "./Restore/RestoreButton.MangaCard";

export default function MangaCardDeleted(props: PersonnalManga) {
  return (
    <MangaCardProvider
      {...props}
      hideContinueReading
      buttonContainer={{ className: "justify-end" }}
    >
      <RestoreButtonMangaCard mangaToRestore={props.id}>
        <Undo2 />
      </RestoreButtonMangaCard>
    </MangaCardProvider>
  );
}
