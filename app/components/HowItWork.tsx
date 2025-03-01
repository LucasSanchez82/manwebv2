"use client"

import { motion } from "framer-motion"
import { BookOpen, ListPlus, Star } from "lucide-react"
import Image from "next/image"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const steps = [
  {
    title: "Créez votre bibliothèque",
    description: "Ajoutez facilement vos films, séries, mangas et jeux à votre collection personnelle.",
    icon: ListPlus,
    mockup: "/placeholder.svg?height=600&width=800",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Suivez votre progression",
    description: "Gardez une trace de vos épisodes visionnés, chapitres lus et niveaux complétés.",
    icon: BookOpen,
    mockup: "/placeholder.svg?height=600&width=800",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Notez et partagez",
    description: "Évaluez vos contenus préférés et découvrez les recommandations de la communauté.",
    icon: Star,
    mockup: "/placeholder.svg?height=600&width=800",
    color: "from-amber-500 to-orange-500",
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4"
          >
            Comment ça marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 md:text-lg max-w-3xl mx-auto"
          >
            Découvrez comment Manweb vous aide à organiser et suivre tous vos divertissements en quelques étapes simples
          </motion.p>
        </div>

        <div className="space-y-20 md:space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
            >
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 mb-6`}
                >
                  <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg mb-6">{step.description}</p>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span className="font-medium">En savoir plus</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Mockup */}
              <div className="flex-1 relative">
                <div className="relative mx-auto max-w-[600px]">
                  {/* Device Frame */}
                  <div className="relative rounded-[2.5rem] border-[8px] border-gray-800 shadow-xl">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gray-800 to-gray-900" />
                    <div className="relative rounded-[2rem] overflow-hidden bg-gray-900">
                      {/* Mockup Image */}
                      <Image
                        src={step.mockup || "/placeholder.svg"}
                        alt={step.title}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                      {/* Screen Glare Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div
                    className={`absolute -z-10 -top-4 -right-4 w-full h-full rounded-[2.5rem] bg-gradient-to-r ${step.color} opacity-20 blur-2xl`}
                  />
                  <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-[2.5rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-1/4 left-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-float" />
                  <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-float-delayed" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

