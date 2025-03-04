"use client"

import { motion } from "framer-motion"
import { BookOpen, ListPlus, Star } from "lucide-react"

// Import mockup components
import PhoneMockup from "./mockups/phone-mockup"
import TabletMockup from "./mockups/tablet-mockup"
import DesktopMockup from "./mockups/desktop-mockup"
import DesktopPCMockup from "./mockups/laptop-mockup"
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
          {steps.map((step, index) => {
            // Determine which device mockup to use based on index
            const renderMockup = () => {
              switch (index % 4) {
                case 0:
                  return <PhoneMockup image={step.mockup} color={step.color} />
                case 1:
                  return <DesktopPCMockup image={step.mockup} color={step.color} />
                case 2:
                  return <TabletMockup image={step.mockup} color={step.color} />
                case 3:
                  return <DesktopMockup image={step.mockup} color={step.color} />
                default:
                  return <PhoneMockup image={step.mockup} color={step.color} />
              }
            }

            return (
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

                {/* Device Mockup */}
                <div className="flex-1 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    {renderMockup()}

                    {/* Floating Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute top-1/4 left-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-float" />
                      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-float-delayed" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

