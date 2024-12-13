import { paginationConstants } from "@/lib/global/constants/pagination.constant";
import SearchParams from "@/lib/global/types/searchParams";

const sanitizeSearchParamsForSearch = async (p?: SearchParams) => {
  const params = await p;

  const itempsPerPage =
    parseInt(
      (params?.itempsPerPage instanceof Array
        ? params.itempsPerPage[0]
        : params?.itempsPerPage) ??
        paginationConstants.itemsPerPage.default.toString()
    ) ?? paginationConstants.itemsPerPage.default;

  const page =
    parseInt(
      (params?.page instanceof Array ? params.page[0] : params?.page) ?? "1"
    ) ?? 1;
  const types =
    typeof params?.types === "string"
      ? params.types.split(",").reduce((acc, nb) => {
          // return array of numbers (skip if isNaN)
          const number = Number(nb);
          if (number) acc.push(number);
          return acc;
        }, [] as number[])
      : [];

  return {
    search: params?.search instanceof Array ? params.search[0] : params?.search,
    types,
    itempsPerPage,
    page,
  };
};

export default sanitizeSearchParamsForSearch;
type SanitizedSearchParamsForSearch = Awaited<
  ReturnType<typeof sanitizeSearchParamsForSearch>
>;
export type { SanitizedSearchParamsForSearch };
