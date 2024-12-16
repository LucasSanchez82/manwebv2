import { Check } from 'lucide-react'

const benefits = [
  'Suivi complet pour les mangas, films et séries TV',
  'Interface intuitive et conviviale',
  'Suivi détaillé de la progression et historique',
  'Recommandations personnalisées basées sur vos goûts',
  'Créez et partagez des listes personnalisées avec des amis',
  'Mises à jour régulières avec de nouvelles fonctionnalités et améliorations',
]

export default function WhyChooseUs() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold">
              Pourquoi choisir Manweb ?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-lg border bg-gradient-to-br from-primary/20 via-primary/10 to-background shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="px-6 text-center text-lg font-medium">
                  Rejoignez les utilisateurs qui font confiance à Manweb pour
                  gérer leur bibliothèque de divertissement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
