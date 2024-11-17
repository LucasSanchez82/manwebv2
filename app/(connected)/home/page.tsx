import DisplayMangas from "@/components/pages/home/DisplayMangas";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { getSession } from "@/lib/auth/getsession";
import { prisma } from "@/lib/prisma";
import AddMangaForm from "@/components/forms/mangaForm/AddMangaForm";
import SearchMangaBar from "@/components/pages/home/SearchMangaBar";

const Page = async () => {
  const session = await getSession();
  if (!(session && session.user?.id)) throw new Error("pas de session");
  const mangas = await prisma.manga.findMany({
    where: { deletedAt: null, userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="w-full">
      <SearchMangaBar />
      <div className="w-full flex justify-center my-4">
        <DialogResponsive form={<AddMangaForm />} title="Ajouter un manga">
          Ajouter un manga
        </DialogResponsive>
      </div>
      <DisplayMangas mangas={mangas} />
    </div>
  );
};

export default Page;
