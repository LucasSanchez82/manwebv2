import SuspensWrapper from '@/components/global/SuspensWrapper'
import NavBar from '@/components/pages/navbar/Navbar'
import { getSession } from '@/lib/auth/getsession'
import React from 'react'

const Layout = SuspensWrapper(
  async ({ children }: { children: React.ReactNode }) => {
    await getSession() // redirect if not logged in
    return (
      <main className="min-w-screen h-full min-h-screen">
        <NavBar />
        {children}
      </main>
    )
  }
)

export default Layout
