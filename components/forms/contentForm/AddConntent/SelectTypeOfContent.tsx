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

type Props = {}

export default function SelectTypeOfContent({}: Props) {
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
