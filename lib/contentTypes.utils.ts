import {
  contentTypesValues,
  ContentTypeKey,
  contentTypes,
  contentTypesKeys,
} from "@/prisma/constant";

export const allContentTypesIdsAvailable = contentTypesValues.map(
  (type) => type.id
);
export const getTypeIdFromKey = (key: ContentTypeKey) => contentTypes[key].id;
export const getKeyFromId = (id: number) =>
  contentTypesKeys.find((key) => contentTypes[key].id === id);
export const getManyKeysFromStr = (ids: string) => {
  return ids?.split(",").reduce((acc, id) => {
    const idNumber = parseInt(id);
    if (!isNaN(idNumber) && allContentTypesIdsAvailable.includes(idNumber)) {
      const key = getKeyFromId(idNumber);
      if (key) {
        acc.push(key);
      }
    }
    return acc;
  }, [] as ContentTypeKey[]);
};
