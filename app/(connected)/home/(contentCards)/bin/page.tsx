import AddContentForm from "@/components/forms/contentForm/AddContentForm";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import DisplayContents from "@/components/pages/home/Content/DisplayContents";
import { getSession } from "@/lib/auth/getsession";
import { getPersonnalContents } from "@/lib/cachedRequests/content/getPersonnalContents";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const session = await getSession();
  if (!(session && session.user?.id)) throw new Error("pas de session");

  const contents = await getPersonnalContents({
    userId: session.user.id,
    searchStr:
      (await searchParams)?.search?.toString().toLowerCase() || undefined,
    showDeleted: true,
  });
  return (
    <>
      <DisplayContents contents={contents} showDeleted />
    </>
  );
};

export default Page;
