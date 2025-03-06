'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 md:p-12"
      >
        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
            >
              Commencez à Organiser Votre Divertissement Aujourd&apos;hui
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-gray-300 md:text-lg"
            >
              Rejoignez Manweb et prenez le contrôle de votre bibliothèque de
              divertissement. Suivez votre progression, découvrez de nouveaux
              contenus et ne perdez plus jamais la trace de ce que vous regardez
              ou lisez.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/home"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              >
                Créer un Compte Gratuit
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 -z-10 h-96 -translate-y-1/2 transform bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-3xl" />
      </motion.div>
    </section>
  )
}
