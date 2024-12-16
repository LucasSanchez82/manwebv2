import SearchContentBar from '@/components/pages/home/SearchContentBar'
import React, { Suspense } from 'react'
const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <SearchContentBar />
      {children}
    </div>
  )
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <Component>{children}</Component>
    </Suspense>
  )
}

export default Layout
