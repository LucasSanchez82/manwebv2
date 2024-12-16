import { create } from 'zustand'
import { Session } from 'next-auth'
import { getSession } from '../auth/getsession'

type SessionState = {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const useSessionStore = create<SessionState>((set, get) => {
  // Immediately invoke an async function to fetch the session
  ;(async () => {
    const initialSession = await getSession()
    set({ session: initialSession })
  })()
  return {
    session: null,
    setSession: (session) => set({ session }),
  }
})
