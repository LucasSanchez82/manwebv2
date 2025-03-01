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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border border-gray-800/50"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                          <CheckIcon className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-lg font-medium">{benefit}</p>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
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

            <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

