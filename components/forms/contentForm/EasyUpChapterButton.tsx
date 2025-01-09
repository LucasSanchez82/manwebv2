'use client'
import { Button } from '@/components/ui/button'
import { quickChangeChapterContent } from '@/lib/actions/contents.actions'
import { ChevronUp, ChevronDown } from 'lucide-react'

type Props = {
  idContent: number | bigint
  chapter: number
}

const EasyUpChapterButton = ({ idContent, chapter }: Props) => {
  return (
    <div className="mb-2 flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => await quickChangeChapterContent(idContent, true)}
        className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <span className="min-w-[2ch] text-center font-medium text-white">
        {chapter}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => await quickChangeChapterContent(idContent, false)}
        className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default EasyUpChapterButton
