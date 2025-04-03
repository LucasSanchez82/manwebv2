export const contentTypes = {
  manga: { name: 'Manga', id: 1 },
  film: { name: 'Film', id: 2 },
  serie: { name: 'Série', id: 3 },
  anime: { name: 'Anime', id: 4 },
  documentaire: { name: 'Documentaire', id: 5 },
  autre: { name: 'Autre', id: 6 },
}

export type ContentType = typeof contentTypes
export type ContentTypeKey = keyof ContentType

export const contentTypesValues = Object.values(contentTypes)
export const contentTypesKeys = Object.keys(
  contentTypes
) as (keyof ContentType)[]

export const getContentTypeKeyByName = (name: string) => {
  const contentTypeKey = Object.entries(contentTypes).find(
    ([, value]) => value.name === name
  )?.[0]

  return contentTypeKey as ContentTypeKey | undefined
}
