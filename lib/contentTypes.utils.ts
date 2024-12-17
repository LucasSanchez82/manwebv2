import {
  contentTypesValues,
  ContentTypeKey,
  contentTypes,
  contentTypesKeys,
} from '@/prisma/constant'

const allAvailableTypesIds = contentTypesValues.map((type) => type.id)
const getTypeIdFromKey = (key: ContentTypeKey) => contentTypes[key].id
const getTypeIdFromStr = (str: string) => {
  const key = contentTypesKeys.find((key) => key === str) ?? 'autre'
  return getTypeIdFromKey(key)
}
const getKeyFromId = (id: number) =>
  contentTypesKeys.find((key) => contentTypes[key].id === id)
const getManyKeysFromStr = (ids: string) => {
  return ids?.split(',').reduce((acc, id) => {
    const idNumber = parseInt(id)
    if (!isNaN(idNumber) && allAvailableTypesIds.includes(idNumber)) {
      const key = getKeyFromId(idNumber)
      if (key) {
        acc.push(key)
      }
    }
    return acc
  }, [] as ContentTypeKey[])
}
const contentTypesUtilities = {
  getTypeIdFromKey,
  getTypeIdFromStr,
  getKeyFromId,
  getManyKeysFromStr,
  allContentTypesIdsAvailable: allAvailableTypesIds,
}
export default contentTypesUtilities
