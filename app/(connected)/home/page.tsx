import AddMangaForm from '@/components/forms/AddMangaForm';
import DisplayMangas from '@/components/pages/home/DisplayMangas';
import { DialogResponsive } from '@/components/ui/DialogResponsive.custom';
import { getSession } from '@/lib/auth/getsession';
import { prisma } from '@/lib/prisma';

const Page = async () => {
    const session = await getSession();
    if(!(session && session.user?.id)) throw new Error("pas de session");
    const mangas = await prisma.manga.findMany({orderBy: {createdAt: 'desc'}});
    return (
        <div className='w-full'>
            <DialogResponsive form={<AddMangaForm />} title='Ajouter un manga' >
            Ajouter un manga
            </DialogResponsive>
            <DisplayMangas mangas={mangas} />
        </div>
    );
};

export default Page;