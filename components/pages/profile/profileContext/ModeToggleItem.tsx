'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ModeToggleItem() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }
  return (
    <Button
      variant={'ghost'}
      className="justify-between py-2 text-sm font-normal"
      onClick={toggleTheme}
    >
      <span>Changer le thème</span>
      <div className="relative">
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </div>
    </Button>
  )
}
