import { redirect } from 'next/navigation'
import { auth } from './auth'

export const getSession = async () => {
  if (typeof window !== 'undefined')
    throw new Error('getSession should not be called on the client side')
  const session = await auth()

  if (!(session && session.user?.id)) redirect('/se-connecter')
  return session
}
