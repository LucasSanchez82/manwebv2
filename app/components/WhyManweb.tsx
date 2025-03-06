'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@radix-ui/react-icons'

const benefits = [
  'Suivi complet pour les mangas, films et séries TV',
  'Interface intuitive et conviviale',
  'Suivi détaillé de la progression et historique',
  'Recommandations personnalisées basées sur vos goûts',
  'Créez et partagez des listes personnalisées avec des amis',
  'Mises à jour régulières avec de nouvelles fonctionnalités et améliorations',
]

export default function WhyManweb() {
  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Pourquoi choisir Manweb ?
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 50,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-900">
                          <CheckIcon className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-300">
                        {benefit}
                      </p>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transform bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-x-100" />
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
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              <div className="relative rounded-2xl bg-gray-900 p-8">
                <p className="mb-6 text-center text-xl font-medium text-white">
                  Rejoignez les utilisateurs qui font confiance à Manweb pour
                  gérer leur bibliothèque de divertissement.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <div className="text-3xl font-bold text-purple-400">
                      10k+
                    </div>
                    <div className="text-gray-400">Utilisateurs</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <div className="text-3xl font-bold text-pink-400">50k+</div>
                    <div className="text-gray-400">Contenus suivis</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -top-4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 -z-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
