import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Prêt à commencer votre voyage ?
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Rejoignez les lecteurs qui utilisent déjà Manweb pour centraliser leur
          lecture de mangas, films, séries et autres contenu.
        </p>
        <Button size="lg" asChild>
          <Link href="/se-connecter">Commencer maintenant</Link>
        </Button>
      </div>
    </section>
  );
}
