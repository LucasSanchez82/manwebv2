"use client"

import { Film, Music, Gamepad2, Bookmark, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    { icon: Film, label: "Films", color: "from-purple-500 to-blue-500" },
    { icon: Music, label: "Musiques", color: "from-pink-500 to-rose-500" },
    { icon: Gamepad2, label: "Jeux", color: "from-green-500 to-emerald-500" },
    { icon: Bookmark, label: "Contenus", color: "from-amber-500 to-orange-500" },
  ]

  if (!mounted) return null

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-purple-500/20 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-blue-500/20 blur-xl animate-float" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-pink-500/10 blur-xl animate-float" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container relative px-4 md:px-6 mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <div className="relative">
              <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 pb-2">
                Manweb
              </h1>
              <div className="h-1 w-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mt-2 animate-pulse" />
            </div>
          </div>

          <p className="max-w-[700px] text-gray-300 md:text-xl font-light tracking-wide">
            Le marque page numérique pour tous vos besoins
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 w-full max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative perspective"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`
                    flex flex-col items-center p-6 rounded-xl 
                    bg-gradient-to-br ${category.color}
                    shadow-lg border border-white/10
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:scale-105
                    ${hoverIndex === index ? "shadow-[0_0_25px_rgba(168,85,247,0.4)]" : ""}
                  `}
                  style={{
                    transform:
                      hoverIndex === index
                        ? "translateZ(20px) rotateX(5deg) rotateY(5deg)"
                        : "translateZ(0) rotateX(0) rotateY(0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 rounded-xl bg-black opacity-40 group-hover:opacity-30 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center">
                    <category.icon className="h-12 w-12 text-white mb-3" />
                    <span className="text-base font-medium text-white">{category.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/commencer"
              className="group relative inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 text-base font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 overflow-hidden"
            >
              <span className="relative flex items-center">
                Commencer
                <ArrowRightIcon className="ml-2 h-5 w-5 animate-pulse" />
              </span>
            </Link>

            <Link
              href="/en-savoir-plus"
              className="group relative inline-flex h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-10 text-base font-medium text-white border border-white/20 transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 overflow-hidden"
            >
              <span className="relative flex items-center">
                En savoir plus
                <Sparkles className="ml-2 h-4 w-4 text-amber-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

