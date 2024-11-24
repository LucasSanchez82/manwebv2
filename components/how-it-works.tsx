import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Comment ça marche</h2>
        <p className="mt-4 text-muted-foreground">
          Découvrez comment Manweb simplifie votre expérience de lecture
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Créez votre compte",
              description: "Inscrivez-vous gratuitement en quelques secondes",
            },
            {
              title: "Ajoutez vos sources",
              description: "Connectez vos sites de lecture préférés",
            },
            {
              title: "Commencez à lire",
              description: "Profitez d'une expérience de lecture unifiée",
            },
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2">
                <span className="text-xl font-bold">{i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-center text-muted-foreground">
                {step.description}
              </p>
              {i !== 2 && (
                <ArrowRight className="absolute -right-4 top-6 hidden h-6 w-6 text-muted-foreground/30 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
