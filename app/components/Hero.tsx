'use client'

import {
  Film,
  Music,
  Gamepad2,
  Bookmark,
  Sparkles,
  ChevronsDown,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

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
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 text-white md:py-32 lg:py-40">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute left-10 top-20 h-20 w-20 rounded-full bg-purple-500/20 blur-xl" />
        <div className="animate-float animation-delay-2000 absolute right-20 top-40 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />
        <div className="animate-float animation-delay-4000 absolute bottom-20 left-1/4 h-40 w-40 rounded-full bg-pink-500/10 blur-xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <div className="relative">
            <div className="absolute -inset-72 -top-96 opacity-25 blur transition">
              <div
                className="h-full w-full bg-gradient-to-r from-purple-600 to-pink-600"
                style={{
                  borderRadius: '40% 70% 30% 60% / 60% 30% 70% 40%',
                  animation: 'borderMorph 8s ease-in-out infinite alternate',
                }}
              />
            </div>
            <div className="relative">
              <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text pb-2 text-6xl font-bold tracking-tighter text-transparent sm:text-7xl md:text-8xl">
                Manweb
              </h1>
              <div className="mx-auto mt-2 h-1 w-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
            </div>
            <style jsx>{`
              @keyframes borderMorph {
                0% {
                  border-radius: 40% 70% 30% 60% / 60% 30% 70% 40%;
                }
                100% {
                  border-radius: 60% 30% 70% 40% / 40% 60% 30% 70%;
                }
              }

              @keyframes float {
                0% {
                  transform: translateY(0px) translateX(0px);
                }
                50% {
                  transform: translateY(-20px) translateX(10px);
                }
                100% {
                  transform: translateY(0px) translateX(0px);
                }
              }

              .animate-float {
                animation: float 6s ease-in-out infinite;
              }

              .animation-delay-2000 {
                animation-delay: 2s;
              }

              .animation-delay-4000 {
                animation-delay: 4s;
    style     }
            `}</style>
          </div>

          <p className="max-w-[700px] font-light tracking-wide text-gray-300 md:text-xl">
            Le marque page numérique pour tous vos besoins
          </p>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="perspective group relative"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`flex flex-col items-center rounded-xl bg-gradient-to-br p-6 ${category.color} border border-white/10 shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl ${hoverIndex === index ? 'shadow-[0_0_25px_rgba(168,85,247,0.4)]' : ''} `}
                  style={{
                    transform:
                      hoverIndex === index
                        ? 'translateZ(20px) rotateX(5deg) rotateY(5deg)'
                        : 'translateZ(0) rotateX(0) rotateY(0)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 rounded-xl bg-black opacity-40 transition-opacity group-hover:opacity-30" />
                  <div className="relative z-10 flex flex-col items-center">
                    <category.icon className="mb-3 h-12 w-12 text-white" />
                    <span className="text-base font-medium text-white">
                      {category.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/commencer"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 text-base font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className="relative flex items-center">
                Commencer
                <ArrowRightIcon className="ml-2 h-5 w-5 animate-pulse" />
              </span>
            </Link>

            <Link
              href="/en-savoir-plus"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2"
            >
              <span className="relative flex items-center">
                En savoir plus
                <Sparkles className="ml-2 h-4 w-4 text-amber-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
      <ChevronsDown
        width={80}
        height={80}
        className="centered-bounce absolute bottom-5 left-1/2"
      />
    </section>
  )
}
