import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const improvements = [
  {
    title: 'Support pour les livres numériques',
    description:
      'Extension de la plateforme pour inclure le suivi et la gestion de livres électroniques.',
    status: 'Planifié',
  },
  {
    title: 'Application mobile native',
    description:
      "Développement d'applications mobiles natives pour iOS et Android pour une expérience optimisée sur smartphone.",
    status: 'En cours',
  },
  {
    title: 'Intégration de podcasts',
    description:
      'Ajout de fonctionnalités pour suivre et écouter vos podcasts préférés directement depuis Manweb.',
    status: 'Idée future',
  },
  {
    title: 'Système de recommandation IA',
    description:
      "Mise en place d'un système de recommandation basé sur l'intelligence artificielle pour des suggestions ultra-personnalisées.",
    status: 'Recherche',
  },
  {
    title: 'Fonctionnalités sociales avancées',
    description:
      'Développement de fonctionnalités sociales plus poussées, comme des groupes de lecture, des événements en ligne, etc.',
    status: 'Planifié',
  },
]

export default function Ameliorations() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto py-24 sm:py-32">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Améliorations et Évolutions Futures
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Découvrez les futures améliorations et évolutions prévues pour Manweb.
          Notre objectif est de créer une plateforme complète pour tous les
          types de contenu médiatique.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {improvements.map((improvement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{improvement.title}</CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      improvement.status === 'En développement'
                        ? 'default'
                        : improvement.status === 'Planifié'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {improvement.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{improvement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
