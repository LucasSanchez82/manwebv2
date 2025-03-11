'use client'
import {
  Film,
  Music,
  Gamepad2,
  Bookmark,
  ChevronsDown,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12 text-white md:py-20 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-10 top-20 h-20 w-20 rounded-full bg-purple-500/20 blur-xl"></div>
        <div className="animate-blob animation-delay-2000 absolute right-20 top-40 h-32 w-32 rounded-full bg-blue-500/20 blur-xl"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/4 h-40 w-40 rounded-full bg-pink-500/10 blur-xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-between px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 pt-8 text-center md:pt-12"
        >
          <div className="relative">
            <div className="absolute -inset-72 -top-96 opacity-25 blur transition">
              <div className="morph-animation h-full w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </div>
            <div className="relative">
              <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text pb-2 text-5xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                Manweb
              </h1>
              <div className="mx-auto mt-2 h-1 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
            </div>
          </div>

          <p className="max-w-[700px] font-light tracking-wide text-gray-300 md:text-xl">
            Le marque page numérique pour tous vos besoins
          </p>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 py-8 md:grid-cols-4 md:gap-6 md:py-10">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={`flex flex-col items-center rounded-xl bg-gradient-to-br ${category.color} border border-white/10 p-4 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl md:p-6`}
                >
                  <div className="absolute inset-0 rounded-xl bg-black opacity-40 transition-opacity group-hover:opacity-30"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <category.icon className="mb-2 h-8 w-8 text-white md:mb-3 md:h-12 md:w-12" />
                    <span className="text-sm font-medium text-white md:text-base">
                      {category.label}
                    </span>
                  </div>

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${category.color} opacity-0 blur-xl transition-opacity group-hover:opacity-30`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row md:mt-8">
            <Link
              href="/commencer"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-base font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 md:h-14 md:px-10"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-purple-600 to-pink-600"></span>
              <span className="absolute inset-0 h-full w-full bg-gradient-to-t from-white/20 via-white/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
              <span className="relative flex items-center">
                Commencer
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="centered-bounce absolute bottom-4 left-1/2 z-10 h-14 w-14 -translate-x-1/2 transform"
      >
        <ChevronsDown
          className="hidden h-full w-full text-white/70 md:block"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  )
}
