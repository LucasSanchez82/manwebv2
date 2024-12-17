import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Film, Tv, History, List, Star } from 'lucide-react'

const features = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: 'Suivi de Contenu',
    description:
      'Suivez votre progression de lecture de manga et vos séries préférées',
  },
  {
    icon: <Film className="h-10 w-10" />,
    title: 'Collection de Films',
    description: 'Créez votre liste de films personnels et notez vos favoris',
  },
  {
    icon: <Tv className="h-10 w-10" />,
    title: 'Gestion de Séries',
    description:
      'Suivez les épisodes, les saisons, et ne manquez jamais un épisode',
  },
  {
    icon: <History className="h-10 w-10" />,
    title: 'Suivi de Progression',
    description:
      'Reprenez là où vous vous êtes arrêté avec un suivi détaillé de la progression',
  },
  {
    icon: <List className="h-10 w-10" />,
    title: 'Listes Personnalisées',
    description: 'Créez des listes personnalisées pour organiser votre contenu',
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: 'Notes et Avis',
    description: 'Partagez vos pensées et voyez ce que les autres en pensent',
  },
]

export default function Features() {
  return (
    <section className="bg-secondary/50 px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold">
            Tout ce dont vous avez besoin
          </h2>
          <p className="primary mx-auto max-w-2xl text-muted-foreground">
            Manweb fournit tous les outils dont vous avez besoin pour gérer
            efficacement votre bibliothèque de divertissement
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg transition-shadow hover:shadow-xl"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
