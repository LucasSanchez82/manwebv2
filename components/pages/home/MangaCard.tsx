import { Edit2 } from "lucide-react";
import MangaCardEditedForm from "../../forms/mangaForm/MangaCardEditedForm";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";
import MangaCardProvider from "./MangaCard.provider";

export default function MangaCard(props: PersonnalManga) {
  const imageUrl = `${props.isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + "/" : ""}${props.image}`;
  return (
    <MangaCardProvider {...props}>
      <DialogResponsive
        title={`Modifier ${props.title}`}
        form={
          <MangaCardEditedForm
            {...{ ...props, imageUrl, image: props.image || undefined }}
          />
        }
        buttonProps={{ variant: "outline", size: "icon" }}
        className="bg-cover bg-center"
      >
        <Edit2 className="h-4 w-4 dark:text-white text-black" />
      </DialogResponsive>
    </MangaCardProvider>
  );
}
