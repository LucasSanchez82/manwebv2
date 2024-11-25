import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Commencez à Organiser Votre Divertissement Aujourd'hui
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Rejoignez Manweb et prenez le contrôle de votre bibliothèque de
          divertissement. Suivez votre progression, découvrez de nouveaux
          contenus et ne perdez plus jamais la trace de ce que vous regardez ou
          lisez.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Créer un Compte Gratuit</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent"
            asChild
          >
            <Link href="/about">En Savoir Plus</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
