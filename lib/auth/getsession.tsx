'use server'
import { redirect } from 'next/navigation'
import { auth } from './auth'

export const getSession = async () => {
  const session = await auth()

  if (!(session && session.user?.id)) redirect('/se-connecter')
  return session
}
