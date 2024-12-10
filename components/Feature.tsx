import React from "react";
import FeatureCard from "./FeatureCard";
import { Search, Database, Globe, BookOpen, Zap, Users } from "lucide-react";

const featuresContent = [
  {
    key: "search",
    title: "Recherche avancée avec MangaDex",
    description:
      "Trouvez et enregistrez vos mangas en utilisant simplement leur titre grâce à l'API MangaDex. Notre système de recherche intelligent vous permet de trouver rapidement ce que vous cherchez.",
    icon: Search,
  },
  {
    key: "centralize",
    title: "Centralisation des données",
    description:
      "Gardez toutes vos lectures et informations sur vos mangas, series etc.. au même endroit. Suivez votre progression, vos notes et vos commentaires pour chaque série.",
    icon: Database,
  },
  {
    key: "integration",
    title: "Intégration MangaDex",
    description:
      "Profitez des services de MangaDex directement dans notre application. Synchronisez vos listes de lecture et accédez à une vaste bibliothèque de mangas.",
    icon: Globe,
  },
  {
    key: "reading",
    title: "Expérience de lecture fluide",
    description:
      "Lisez vos mangas, series etc.. directement sur Manweb avec notre lecteur intégré. Profitez d'une expérience de lecture optimisée pour tous vos appareils.",
    icon: BookOpen,
  },
  {
    key: "recommendations",
    title: "Recommandations personnalisées",
    description:
      "Découvrez de nouveaux mangas basés sur vos goûts et votre historique de lecture. Notre système de recommandation s'améliore au fil de vos lectures.",
    icon: Zap,
  },
  {
    key: "community",
    title: "Fonctionnalités communautaires",
    description:
      "Partagez vos avis, créez des listes de lecture publiques et découvrez les recommandations d'autres passionnés de manga.",
    icon: Users,
  },
];

const Feature = () => {
  return (
    <section id="features" className="container mx-auto py-24 sm:py-32">
      <h2 className="text-3xl font-bold text-center mb-6">
        Fonctionnalités principales
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Découvrez comment Manweb révolutionne votre expérience de lecture de
        mangas, séries et autre contenus avec ces fonctionnalités uniques.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresContent.map((feat) => (
          <FeatureCard {...feat} key={feat.key} />
        ))}
      </div>
    </section>
  );
};

export default Feature;
