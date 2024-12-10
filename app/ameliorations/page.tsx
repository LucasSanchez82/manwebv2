import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const improvements = [
  {
    title: "Intégration de films et séries",
    description:
      "Ajout de la possibilité de suivre et gérer vos films et séries préférés, en plus des mangas.",
    status: "En développement",
  },
  {
    title: "Support pour les livres numériques",
    description:
      "Extension de la plateforme pour inclure le suivi et la gestion de livres électroniques.",
    status: "Planifié",
  },
  {
    title: "Application mobile native",
    description:
      "Développement d'applications mobiles natives pour iOS et Android pour une expérience optimisée sur smartphone.",
    status: "En cours",
  },
  {
    title: "Intégration de podcasts",
    description:
      "Ajout de fonctionnalités pour suivre et écouter vos podcasts préférés directement depuis Manweb.",
    status: "Idée future",
  },
  {
    title: "Système de recommandation IA",
    description:
      "Mise en place d'un système de recommandation basé sur l'intelligence artificielle pour des suggestions ultra-personnalisées.",
    status: "Recherche",
  },
  {
    title: "Fonctionnalités sociales avancées",
    description:
      "Développement de fonctionnalités sociales plus poussées, comme des groupes de lecture, des événements en ligne, etc.",
    status: "Planifié",
  },
];

export default function Ameliorations() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto py-24 sm:py-32">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Améliorations et Évolutions Futures
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Découvrez les futures améliorations et évolutions prévues pour Manweb.
          Notre objectif est de créer une plateforme complète pour tous les
          types de contenu médiatique.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {improvements.map((improvement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{improvement.title}</CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      improvement.status === "En développement"
                        ? "default"
                        : improvement.status === "Planifié"
                          ? "secondary"
                          : "outline"
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
  );
}
