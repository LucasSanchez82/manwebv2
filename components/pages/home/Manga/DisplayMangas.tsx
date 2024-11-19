import MangaCard from "./MangaCard";
import { PersonnalMangas } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardDeleted from "./MangaCard.showDeleted";

const DisplayMangas = ({
  mangas,
  showDeleted = false,
}: {
  mangas: PersonnalMangas;
  showDeleted?: boolean;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-screen">
      {showDeleted
        ? mangas.map((manga) => <MangaCardDeleted key={manga.id} {...manga} />)
        : mangas.map((manga) => <MangaCard key={manga.id} {...manga} />)}
    </div>
  );
};

export default DisplayMangas;
