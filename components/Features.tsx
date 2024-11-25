import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Film, Tv, History, List, Star } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Suivi de Manga",
    description:
      "Suivez votre progression de lecture de manga et vos séries préférées",
  },
  {
    icon: <Film className="w-10 h-10" />,
    title: "Collection de Films",
    description: "Créez votre liste de films personnels et notez vos favoris",
  },
  {
    icon: <Tv className="w-10 h-10" />,
    title: "Gestion de Séries",
    description:
      "Suivez les épisodes, les saisons, et ne manquez jamais un épisode",
  },
  {
    icon: <History className="w-10 h-10" />,
    title: "Suivi de Progression",
    description:
      "Reprenez là où vous vous êtes arrêté avec un suivi détaillé de la progression",
  },
  {
    icon: <List className="w-10 h-10" />,
    title: "Listes Personnalisées",
    description: "Créez des listes personnalisées pour organiser votre contenu",
  },
  {
    icon: <Star className="w-10 h-10" />,
    title: "Notes et Avis",
    description: "Partagez vos pensées et voyez ce que les autres en pensent",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manweb fournit tous les outils dont vous avez besoin pour gérer
            efficacement votre bibliothèque de divertissement
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
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
  );
}
