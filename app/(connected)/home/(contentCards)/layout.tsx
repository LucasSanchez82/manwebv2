import React, { Suspense } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <div className="w-full">
        {/* <SearchContentBar /> */}
        {children}
      </div>
    </Suspense>
  )
}

export default Layout
