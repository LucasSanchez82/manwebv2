import { PersonnalContents } from '@/lib/cachedRequests/content/getPersonnalContents'
import SuspensWrapper from '@/components/global/SuspensWrapper'
import ContentCardDeleted from './ContentCard.showDeleted'
import ContentCard from './ContentCard'
import CustomPagination from '@/components/global/CustomPagination'

const DisplayContents = SuspensWrapper(
  ({
    contents,
    showDeleted = false,
    itemsCount,
  }: {
    contents: PersonnalContents
    itemsCount: number
    showDeleted?: boolean
  }) => {
    return (
      <div className="flex w-screen flex-wrap justify-center gap-4">
        {showDeleted
          ? contents.map((content) => (
              <ContentCardDeleted key={content.id} {...content} />
            ))
          : contents.map((content) => (
              <ContentCard key={content.id} {...content} />
            ))}
        <CustomPagination itemsCount={itemsCount} />
      </div>
    )
  }
)

export default DisplayContents
