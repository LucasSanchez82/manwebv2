import { Edit2 } from 'lucide-react'
import ContentCardEditedForm from '../../../forms/contentForm/ContentCardEditedForm'
import { DialogResponsive } from '@/components/global/DialogResponsive/DialogResponsive'
import { PersonnalContent } from '@/lib/cachedRequests/content/getPersonnalContents'
import ContentCardProvider from './ContentCard.provider'

export default function ContentCard(props: PersonnalContent) {
  const imageUrl = `${props.isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + '/' : ''}${props.image}`
  return (
    <ContentCardProvider {...props}>
      <DialogResponsive
        title={`Modifier ${props.title}`}
        form={
          <ContentCardEditedForm
            {...{
              ...props,
              imageUrl,
              image: props.image ?? undefined,
              readerUrl: props.readerUrl ?? undefined,
            }}
          />
        }
        buttonProps={{ variant: 'outline', size: 'icon' }}
        className="bg-cover bg-center"
      >
        <Edit2 className="h-4 w-4 text-black dark:text-white" />
      </DialogResponsive>
    </ContentCardProvider>
  )
}
