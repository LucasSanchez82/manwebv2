import AddContentsTabs from "@/components/forms/contentForm/AddContentTabs";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { ContentTypesToggleGroups } from "@/components/pages/home/Content/ContentTypeTabs";
import DisplayContents from "@/components/pages/home/Content/DisplayContents";
import { getSession } from "@/lib/auth/getsession";
import { getPersonnalContents } from "@/lib/cachedRequests/content/getPersonnalContents";
import sanitizeSearchParamsForSearch from "@/lib/cachedRequests/content/sanitizeSearchParamsForSearch";
import SearchParams from "@/lib/global/types/searchParams";

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
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

  const personnalContent = await getPersonnalContents({
    userId: session.user.id,
    filters: await sanitizeSearchParamsForSearch(searchParams),
  });
  return (
    <>
      <div className="w-full flex justify-center my-4">
        <DialogResponsive form={<AddContentsTabs />} title="Ajouter un contenu">
          Ajouter un contenu
        </DialogResponsive>
      </div>
      <ContentTypesToggleGroups currentTab={"manga"}>
        <DisplayContents {...personnalContent} />
      </ContentTypesToggleGroups>
    </>
  );
};

export default Page;
