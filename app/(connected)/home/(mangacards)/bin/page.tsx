import AddMangaForm from "@/components/forms/mangaForm/AddMangaForm";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
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

  const mangas = await getPersonnalMangas({
    userId: session.user.id,
    searchStr:
      (await searchParams)?.search?.toString().toLowerCase() || undefined,
    showDeleted: true,
  });
  return (
    <>
      <DisplayMangas mangas={mangas} showDeleted={true} />
    </>
  );
};

export default Page;
