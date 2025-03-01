"use client"

import { Book, Film, Tv, Clock, List, Star } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Book,
    title: "Suivi de Contenu",
    description: "Suivez votre progression de lecture de manga et vos séries préférées",
  },
  {
    icon: Film,
    title: "Collection de Films",
    description: "Créez votre liste de films personnelle et notez vos favoris",
  },
  {
    icon: Tv,
    title: "Gestion de Séries",
    description: "Suivez les épisodes, les saisons, et ne manquez jamais un épisode",
  },
  {
    icon: Clock,
    title: "Suivi de Progression",
    description: "Reprenez là où vous vous êtes arrêté avec un suivi détaillé de la progression",
  },
  {
    icon: List,
    title: "Listes Personnalisées",
    description: "Créez des listes personnalisées pour organiser votre contenu",
  },
  {
    icon: Star,
    title: "Notes et Avis",
    description: "Partagez vos pensées et voyez ce que les autres en pensent",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-gray-400 md:text-lg">
            Manweb fournit tous les outils dont vous avez besoin pour gérer efficacement votre bibliothèque de
            divertissement
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border border-gray-800/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-4 inline-block rounded-lg bg-gray-800/50 p-3">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

