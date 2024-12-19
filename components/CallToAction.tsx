import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="bg-primary px-8 py-20 text-primary-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold">
          {"Commencez à Organiser Votre Divertissement Aujourd'hui"}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
          Rejoignez Manweb et prenez le contrôle de votre bibliothèque de
          divertissement. Suivez votre progression, découvrez de nouveaux
          contenus et ne perdez plus jamais la trace de ce que vous regardez ou
          lisez.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/home">Créer un Compte Gratuit</Link>
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="bg-transparent"
            asChild
          >
            <Link href="/about">En Savoir Plus</Link>
          </Button> */}
        </div>
      </div>
    </section>
  )
}
