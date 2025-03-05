'use client'

import { Film, Music, Gamepad2, Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)

    // Add floating animation to decorative elements
    const interval = setInterval(() => {
      const decorElements = document.querySelectorAll('.decor-element')
      decorElements.forEach((el) => {
        const randomX = Math.random() * 10 - 5
        const randomY = Math.random() * 10 - 5
        el.setAttribute(
          'style',
          `transform: translate(${randomX}px, ${randomY}px)`
        )
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const categories = [
    { icon: Film, label: 'Films', color: 'from-purple-500 to-blue-500' },
    { icon: Music, label: 'Musiques', color: 'from-pink-500 to-rose-500' },
    { icon: Gamepad2, label: 'Jeux', color: 'from-green-500 to-emerald-500' },
    {
      icon: Bookmark,
      label: 'Contenus',
      color: 'from-amber-500 to-orange-500',
    },
  ]

  if (!mounted) return null

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 text-white md:py-32 lg:py-40">
      {/* Decorative elements */}
    </section>
  )
}
