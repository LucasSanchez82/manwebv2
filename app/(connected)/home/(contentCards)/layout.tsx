import SuspensWrapper from '@/components/global/SuspensWrapper'
import SearchContentBar from '@/components/pages/home/SearchContentBar'
import React from 'react'

const Layout = SuspensWrapper(({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <SearchContentBar />
      {children}
    </div>
  )
})

export default Layout
