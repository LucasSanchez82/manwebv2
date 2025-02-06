import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import ContentCardBackgroundImage from './ContentCard.backgroundImage'
import { PersonnalContent } from '@/lib/cachedRequests/content/getPersonnalContents'
import { PropsWithChildren } from 'react'
import EasyUpChapterButton from '@/components/forms/contentForm/EasyUpChapterButton'

type Props = PropsWithChildren<
  Partial<PersonnalContent> & {
    buttonContainer?: {
      className?: string
    }
  }
>
export default function ContentCardProvider({
  title,
  readerUrl,
  image,
  chapter,
  isSelfHosted,
  children,
  buttonContainer,
  deletedAt,
  id,
}: Props) {
  const imageUrl = `${isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + '/' : ''}${image}`
  return (
    <Card className="group relative h-64 w-full max-w-sm overflow-hidden">
      <ContentCardBackgroundImage imageUrl={imageUrl} />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70" />
      <CardContent className="relative flex h-full flex-col justify-end p-4 text-white">
        <h2 className="s mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-4 text-sm">Dernier lu: {chapter}</p>
        <div
          className={`flex items-center ${buttonContainer?.className || 'justify-between'}`}
        >
          {!deletedAt && id && readerUrl && (
            <div className="flex flex-col gap-2">
              <EasyUpChapterButton idContent={id} chapter={chapter ?? 0} />
              <Link
                href={readerUrl}
                passHref
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <Button className="mr-2 flex-grow" variant="secondary">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continuer à lire
                </Button>
              </Link>
            </div>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
