'use client'

import { motion } from 'framer-motion'
import { BookOpen, ListPlus, LucideProps, Star } from 'lucide-react'
import mobileImage from '../assets/landing/mockups/mobile.png'
import desktopImage from '../assets/landing/mockups/desktop.png'
import PhoneMockup from './mockups/phone-mockup'
import TabletMockup from './mockups/tablet-mockup'
import DesktopMockup from './mockups/desktop-mockup'
import DesktopPCMockup from './mockups/laptop-mockup'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { StaticImageData } from 'next/image'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Badge } from '@/components/ui/badge'

type Step = {
  title: string
  description: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  image?: StaticImageData
  color: string
  mockupType: 'phone' | 'tablet' | 'desktop' | 'desktopPC'
  isAvailable: boolean
}
const steps: Step[] = [
  {
    title: 'Suivez votre progression',
    description:
      'Gardez une trace de vos épisodes visionnés, chapitres lus et niveaux complétés.',
    icon: ListPlus,
    image: mobileImage,
    color: 'from-purple-500 to-pink-500',
    mockupType: 'phone',
    isAvailable: true,
  },
  {
    title: 'Créez votre bibliothèque',
    description:
      'Ajoutez facilement vos films, séries, mangas et jeux à votre collection personnelle.',
    icon: BookOpen,
    image: desktopImage,
    color: 'from-blue-500 to-cyan-500',
    mockupType: 'desktop',
    isAvailable: true,
  },
  {
    title: 'Notez et partagez',
    description:
      'Évaluez vos contenus préférés et découvrez les recommandations de la communauté.',
    icon: Star,
    // image: mobileImage,
    color: 'from-amber-500 to-orange-500',
    mockupType: 'phone',
    isAvailable: false,
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
          >
            Comment ça marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-gray-400 md:text-lg"
          >
            Découvrez comment Manweb vous aide à organiser et suivre tous vos
            divertissements en quelques étapes simples
          </motion.p>
        </div>

        <div className="space-y-20 md:space-y-32">
          {steps.map((step, index) => {
            // Determine which device mockup to use based on index
            const renderMockup = () => {
              switch (step.mockupType) {
                case 'phone':
                  return (
                    <PhoneMockup
                      color={step.color}
                      image={step.image}
                      key={index}
                    />
                  )
                case 'desktopPC':
                  return (
                    <DesktopPCMockup
                      color={step.color}
                      image={step.image}
                      key={index}
                    />
                  )
                case 'tablet':
                  return (
                    <TabletMockup
                      color={step.color}
                      image={step.image}
                      key={index}
                    />
                  )
                case 'desktop':
                  return (
                    <DesktopMockup
                      color={step.color}
                      image={step.image}
                      key={index}
                    />
                  )
                default:
                  return (
                    <PhoneMockup
                      color={step.color}
                      image={step.image}
                      key={index}
                    />
                  )
              }
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative items-center gap-8 md:gap-12`}
              >
                {/* Add coming soon border and badge */}
                {!step.isAvailable && (
                  <>
                    <div className="absolute inset-0 -m-4 animate-pulse rounded-3xl border-2 border-dashed border-amber-500/50"></div>
                    <Badge className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/4 transform border-0 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-white">
                      Disponible prochainement
                    </Badge>
                  </>
                )}
                {/* Content */}
                <div className={'relative flex-1 text-center md:text-left'}>
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} mb-6 p-0.5`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-900">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-6 text-lg text-gray-400">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-purple-400 transition-colors hover:text-purple-300 md:justify-start">
                    <span className="font-medium">En savoir plus</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Device Mockup */}
                <div className="relative flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative py-2"
                  >
                    {renderMockup()}

                    {/* Floating Elements */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
                      <div className="animate-float absolute left-0 top-1/4 h-20 w-20 rounded-full bg-purple-500/10 blur-xl" />
                      <div className="animate-float-delayed absolute bottom-1/4 right-0 h-32 w-32 rounded-full bg-pink-500/10 blur-xl" />
                    </div>
                    {/* Add overlay for coming soon items */}
                    {!step.isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-[2px]">
                        <Badge
                          className="animate-pulse border-0 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg"
                          variant="secondary"
                        >
                          Bientôt disponible
                        </Badge>
                      </div>
                    )}
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
