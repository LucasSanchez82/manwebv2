import AddMangaForm from "@/components/forms/mangaForm/AddMangaForm";
import AddMangasTabs from "@/components/forms/mangaForm/AddMangasTabs";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { ContentTypestabs } from "@/components/pages/home/Manga/ContentTypeTabs";
import DisplayMangas from "@/components/pages/home/Manga/DisplayMangas";
import { getSession } from "@/lib/auth/getsession";
import { getPersonnalMangas } from "@/lib/cachedRequests/manga/getPersonnalMangas";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const session = await getSession();
  if (!(session && session.user?.id)) throw new Error("pas de session");
  const params = await searchParams;
  const mangas = await getPersonnalMangas({
    userId: session.user.id,
    searchStr: params?.search?.toString().toLowerCase() || undefined,
  });
  return (
    <>
      <div className="w-full flex justify-center my-4">
        <DialogResponsive form={<AddMangasTabs />} title="Ajouter un manga">
          Ajouter un manga
        </DialogResponsive>
      </div>
      <ContentTypestabs currentTab={"manga"}>
        <DisplayMangas mangas={mangas} />
      </ContentTypestabs>
    </>
  );
};

export default Page;
