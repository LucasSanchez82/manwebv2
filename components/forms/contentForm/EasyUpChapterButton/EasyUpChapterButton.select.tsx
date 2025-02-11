import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function EasySelectChapter({
  chapter,
  handleChangeChapter,
}: {
  chapter: number
  handleChangeChapter: (newChapter: number) => Promise<number | undefined>
}) {
  const nbSelect = 50
  const calculateRange = () => {
    const start = Math.max(0, chapter - nbSelect)
    const end = chapter + nbSelect
    return { start, end }
  }

  // Génération des options
  const generateOptions = () => {
    const { start, end } = calculateRange()
    const options = []

    for (let i = start; i <= end; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i}
        </SelectItem>
      )
    }
    return options
  }
  return (
    <Select
      defaultValue={chapter.toString()}
      onValueChange={(e) => handleChangeChapter(Number(e))}
      key={chapter}
    >
      <SelectTrigger>
        <SelectValue key={chapter + '_selectvalue'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{generateOptions()}</SelectGroup>
      </SelectContent>
    </Select>
  )
}
