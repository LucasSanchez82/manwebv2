import AddContentsTabs from "@/components/forms/contentForm/AddContentTabs";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { ContentTypesToggleGroups } from "@/components/pages/home/Content/ContentTypeTabs";
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
  const params = await searchParams;
  const types =
    typeof params?.types === "string"
      ? params.types.split(",").reduce((acc, nb) => {
          // return array of numbers (skip if isNaN)
          const number = Number(nb);
          if (number) acc.push(number);
          return acc;
        }, [] as number[])
      : [];
  console.log("types", types);
  const contents = await getPersonnalContents({
    userId: session.user.id,
    searchStr: params?.search?.toString().toLowerCase() || undefined,
    typeIds: types.length > 0 ? types : undefined,
  });
  return (
    <>
      <div className="w-full flex justify-center my-4">
        <DialogResponsive form={<AddContentsTabs />} title="Ajouter un contenu">
          Ajouter un contenu
        </DialogResponsive>
      </div>
      <ContentTypesToggleGroups currentTab={"manga"}>
        <DisplayContents contents={contents} />
      </ContentTypesToggleGroups>
    </>
  );
};

export default Page;
