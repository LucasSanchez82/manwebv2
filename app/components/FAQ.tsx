'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  MessageCircleQuestionIcon as QuestionMarkCircle,
  MessageCircle,
} from 'lucide-react'

const faqs = [
  {
    question: "Qu'est-ce que Manweb ?",
    answer:
      "Manweb est une plateforme de gestion de contenu numérique qui vous permet de suivre et d'organiser vos films, séries, mangas, et jeux. C'est votre bibliothèque personnelle pour tout votre divertissement.",
  },
  {
    question: 'Est-ce que Manweb est gratuit ?',
    answer:
      "Oui, Manweb propose une version gratuite avec toutes les fonctionnalités essentielles. Une version premium avec des fonctionnalités avancées est également disponible pour les utilisateurs qui souhaitent plus d'options.",
  },
  {
    question: 'Comment puis-je commencer à utiliser Manweb ?',
    answer:
      "C'est très simple ! Créez un compte gratuit, puis commencez à ajouter vos contenus préférés à votre bibliothèque. Vous pouvez immédiatement commencer à suivre votre progression et organiser vos collections.",
  },
  {
    question: 'Puis-je synchroniser Manweb sur plusieurs appareils ?',
    answer:
      'Absolument ! Manweb se synchronise automatiquement sur tous vos appareils. Connectez-vous simplement avec votre compte et retrouvez votre bibliothèque où que vous soyez.',
  },
  {
    question: 'Comment fonctionne le système de recommandations ?',
    answer:
      'Notre système de recommandations analyse vos préférences basées sur votre historique, vos notes et vos genres préférés pour vous suggérer du nouveau contenu que vous pourriez apprécier.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer:
      'La sécurité de vos données est notre priorité. Nous utilisons un cryptage de bout en bout et respectons strictement les normes de protection des données pour garantir la confidentialité de vos informations.',
  },
]

export default function FAQ() {
  return (
    <section className="w-full bg-black py-20">
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Questions Fréquentes
          </h2>
          <p className="mx-auto max-w-3xl text-gray-400 md:text-lg">
            Trouvez rapidement des réponses à vos questions sur Manweb
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 left-0 right-0 -z-10 h-96 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-3xl" />

          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  {/* Background gradient that shows on hover and when open */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <AccordionTrigger className="px-6 py-4 transition-all duration-300 hover:no-underline group-hover:text-purple-400 [&[data-state=open]]:bg-gray-900/50 [&[data-state=open]]:text-purple-400">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 transition-all duration-300 group-hover:from-purple-500/20 group-hover:to-pink-500/20">
                        <QuestionMarkCircle className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-left text-lg font-medium">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="relative">
                    {/* Animated gradient line at the top */}
                    <div className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                    <div className="px-6 pb-6 pt-4">
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                          <MessageCircle className="h-5 w-5 text-purple-400/70" />
                        </div>
                        <div className="text-base leading-relaxed text-gray-400">
                          {faq.answer}
                        </div>
                      </div>
                    </div>

                    {/* Subtle gradient background for the content */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900/20" />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Bottom Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </motion.div>
      </div>

      {/* Additional Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="mb-4 text-gray-400">
          Vous ne trouvez pas la réponse que vous cherchez ?
        </p>
        <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
          Contactez-nous
        </button>
      </motion.div>
    </section>
  )
}
