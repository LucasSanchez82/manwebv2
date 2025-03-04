"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function CallToAction() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 md:p-12"
        >
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4"
              >
                Commencez à Organiser Votre Divertissement Aujourd&apos;hui
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 mb-8 md:text-lg"
              >
                Rejoignez Manweb et prenez le contrôle de votre bibliothèque de divertissement. Suivez votre
                progression, découvrez de nouveaux contenus et ne perdez plus jamais la trace de ce que vous regardez ou
                lisez.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/creer-un-compte"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Créer un Compte Gratuit
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          <div className="absolute -z-10 top-1/2 left-0 right-0 h-96 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-3xl transform -translate-y-1/2" />
        </motion.div>
      </div>
    </section>
  )
}

