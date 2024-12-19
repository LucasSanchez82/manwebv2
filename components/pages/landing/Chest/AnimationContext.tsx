import { createContext, useContext } from 'react'

interface AnimationContextType {
  names: string[]
  setNames: (names: string[]) => void
  currentAnimation: string | null
  setCurrentAnimation: (name: string) => void
}

export const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
)

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error(
      'useAnimationContext must be used within an AnimationProvider'
    )
  }
  return context
}

export function AnimationProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: AnimationContextType
}) {
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
