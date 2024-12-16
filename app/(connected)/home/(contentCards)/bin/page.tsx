import AddContentForm from '@/components/forms/contentForm/AddContentForm'
import { DialogResponsive } from '@/components/global/DialogResponsive/DialogResponsive'
import DisplayContents from '@/components/pages/home/Content/DisplayContents'
import { getSession } from '@/lib/auth/getsession'
import { getPersonnalContents } from '@/lib/cachedRequests/content/getPersonnalContents'
import sanitizeSearchParamsForSearch from '@/lib/cachedRequests/content/sanitizeSearchParamsForSearch'
import SearchParams from '@/lib/global/types/searchParams'

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const session = await getSession()
  if (!(session && session.user?.id)) throw new Error('pas de session')

  const personnalContent = await getPersonnalContents({
    userId: session.user.id,
    showDeleted: true,
    filters: await sanitizeSearchParamsForSearch(undefined),
  })
  return (
    <>
      <DisplayContents {...personnalContent} showDeleted />
    </>
  )
}

export default Page
