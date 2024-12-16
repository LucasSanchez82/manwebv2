import NavBar from '@/components/pages/navbar/Navbar'
import Profile from '@/components/pages/profile/Profile'
import { auth } from '@/lib/auth/auth'
import { getSession } from '@/lib/auth/getsession'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await getSession() // redirect if not logged in
  return (
    <main className="min-w-screen h-full min-h-screen">
      <NavBar />
      {children}
    </main>
  )
}

export default Layout
