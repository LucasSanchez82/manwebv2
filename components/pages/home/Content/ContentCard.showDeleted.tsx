import { Undo2 } from 'lucide-react'
import { PersonnalContent } from '@/lib/cachedRequests/content/getPersonnalContents'
import ContentCardProvider from './ContentCard.provider'
import RestoreButtonContentCard from './Restore/RestoreButton.ContentCard'
import PermanentDeleteContentCard from './PermanentDelete/PermanentDeleteButton.ContentCard'

export default function ContentCardDeleted(props: PersonnalContent) {
  return (
    <ContentCardProvider {...props}>
      <PermanentDeleteContentCard contentToPermDelete={props.id}>
        Supprimer
      </PermanentDeleteContentCard>
      <RestoreButtonContentCard contentToRestore={props.id}>
        <Undo2 />
      </RestoreButtonContentCard>
    </ContentCardProvider>
  )
}
