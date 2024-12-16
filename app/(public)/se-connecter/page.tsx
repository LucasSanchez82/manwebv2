import { signIn } from '@/lib/auth/auth'
import { Suspense } from 'react'
const Component = () => {
  return signIn()
}
const Page = () => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  )
}

export default Page
