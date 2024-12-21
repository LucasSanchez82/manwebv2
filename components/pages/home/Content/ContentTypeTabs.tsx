'use client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import contentypesUtilities from '@/lib/contentTypes.utils'
import useCustomSearchParams from '@/lib/hooks/useCustomSearchParams'
import {
  ContentTypeKey,
  contentTypes,
  contentTypesKeys,
} from '@/prisma/constant'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
export function ContentTypesToggleGroups({
  children,
  currentTab,
}: PropsWithChildren<{
  currentTab: ContentTypeKey
}>) {
  const { pushManyQueries, getQuery } = useCustomSearchParams()
  const types = contentypesUtilities.getManyKeysFromStr(getQuery('types') || '')
  const handleValueChange = (values: ContentTypeKey[]) => {
    const okContentTypesKeys = values.filter((key) =>
      contentTypesKeys.includes(key)
    )
    const okContentTypesKeysIds = okContentTypesKeys.map(
      (value) => contentTypes[value].id
    )

    // si certains elements au moins sont bons
    if (okContentTypesKeys) {
      pushManyQueries({
        types: okContentTypesKeysIds.join(','),
        page: '1',
      })
    } else {
      toast.error(
        'Les valeurs ne correspondent pas avec celles prevues, si cela se reproduit veuillez contacter le support'
      )
    }
  }

  return (
    <section defaultValue={currentTab} className="m-auto my-4 w-fit">
      <ToggleGroup
        type="multiple"
        defaultValue={types}
        onValueChange={handleValueChange}
        className="mb-7 grid gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      >
        {contentTypesKeys.map((key) => (
          <ToggleGroupItem
            value={key}
            aria-label={`Toggle ${contentTypes[key].name}`}
            key={key}
            className="focus:not:hover:bg-none"
          >
            {contentTypes[key].name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {children}
    </section>
  )
}
