import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function EasySelectChapter({ chapter }: { chapter: number }) {
  const nbSelect = 100
  const calculateRange = () => {
    const start = Math.max(0, chapter - nbSelect)
    const end = start + nbSelect
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
    <Select defaultValue={chapter.toString()}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={chapter.toString()}>
          {generateOptions()}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
