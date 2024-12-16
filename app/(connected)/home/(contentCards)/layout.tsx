import SearchContentBar from '@/components/pages/home/SearchContentBar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <SearchContentBar />
      {children}
    </div>
  )
}

export default Layout
