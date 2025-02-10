'use client'
import Spinner from '@/components/global/Spinner'
import { Button } from '@/components/ui/button'
import {
  changeChapterContentAction,
  quickChangeChapterContentAction,
} from '@/lib/actions/contents.actions'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { EasySelectChapter } from '@/components/forms/contentForm/EasyUpChapterButton/EasyUpChapterButton.select'

type Props = {
  idContent: number | bigint
  chapter: number
}

const EasyUpChapterButton = ({ idContent, chapter }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleChapterQuickChange = async (toUp: 1 | -1) => {
    try {
      setIsLoading(true)
      await quickChangeChapterContentAction(idContent, toUp > 0)
    } catch {
      toast.error('Erreur lors de la mise a jour du chapitre')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeChapter = async (newChapter: number) => {
    try {
      setIsLoading(true)
      return await changeChapterContentAction(idContent, newChapter)
    } catch {
      toast.error('Erreur lors de la mise a jour du chapitre')
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading)
    return (
      <div className="absolute left-1/2 top-2 -translate-x-1/2">
        <Spinner />
      </div>
    )
  return (
    <div className="absolute left-1/2 top-2 flex w-min -translate-x-1/2 items-center gap-2 rounded p-1 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => await handleChapterQuickChange(-1)}
        className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      <span className="min-w-[2ch] text-center font-medium text-white">
        <EasySelectChapter
          chapter={chapter}
          handleChangeChapter={handleChangeChapter}
        />
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => await handleChapterQuickChange(1)}
        className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default EasyUpChapterButton
