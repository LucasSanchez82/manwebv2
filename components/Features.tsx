import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Film, Tv, History, List, Star } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Manga Tracking",
    description: "Keep track of your manga reading progress and favorite series"
  },
  {
    icon: <Film className="w-10 h-10" />,
    title: "Movie Collection",
    description: "Build your personal movie watchlist and rate your favorites"
  },
  {
    icon: <Tv className="w-10 h-10" />,
    title: "Series Management",
    description: "Track episodes, seasons, and never miss a show again"
  },
  {
    icon: <History className="w-10 h-10" />,
    title: "Progress Tracking",
    description: "Resume where you left off with detailed progress tracking"
  },
  {
    icon: <List className="w-10 h-10" />,
    title: "Custom Lists",
    description: "Create personalized lists to organize your content"
  },
  {
    icon: <Star className="w-10 h-10" />,
    title: "Ratings & Reviews",
    description: "Share your thoughts and see what others think"
  }
];

export default function Features() {
  return (
    <section className="py-20 px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manweb provides all the tools you need to manage your entertainment library effectively
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
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