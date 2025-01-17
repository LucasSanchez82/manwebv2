import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  contentTypes,
  contentTypesKeys,
  ContentTypeKey,
} from '@/prisma/constant'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setSelectedValue: Dispatch<SetStateAction<ContentTypeKey>>
}

export default function SelectTypeOfContent({ setSelectedValue }: Props) {
  const disponiblesProvider: ContentTypeKey[] = ['manga', 'anime']

  return (
    <Select defaultValue={contentTypes.manga.id.toString()}>
      <SelectTrigger className="mx-auto my-2 w-3/4">
        <SelectValue placeholder="Choisis un contenu" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type de contenus :</SelectLabel>
          {contentTypesKeys.map((contentKey) => {
            const content = contentTypes[contentKey]
            return (
              <SelectItem
                key={content.id}
                value={content.id.toString()}
                disabled={!disponiblesProvider.includes(contentKey)}
                onSelect={() => setSelectedValue(contentKey)}
              >
                {content.name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
