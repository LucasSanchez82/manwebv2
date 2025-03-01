"use client"

import { motion } from "framer-motion"
import { CheckIcon } from "@radix-ui/react-icons"

const benefits = [
  "Suivi complet pour les mangas, films et séries TV",
  "Interface intuitive et conviviale",
  "Suivi détaillé de la progression et historique",
  "Recommandations personnalisées basées sur vos goûts",
  "Créez et partagez des listes personnalisées avec des amis",
  "Mises à jour régulières avec de nouvelles fonctionnalités et améliorations",
]

export default function WhyManweb() {
  return (
    <section className="w-full py-20 bg-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
              Pourquoi choisir Manweb ?
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative lg:ml-4"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              <div className="relative bg-gray-900 rounded-2xl p-8">
                <p className="text-xl text-white text-center font-medium mb-6">
                  Rejoignez les utilisateurs qui font confiance à Manweb pour gérer leur bibliothèque de divertissement.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <div className="text-3xl font-bold text-purple-400">10k+</div>
                    <div className="text-gray-400">Utilisateurs</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <div className="text-3xl font-bold text-pink-400">50k+</div>
                    <div className="text-gray-400">Contenus suivis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

