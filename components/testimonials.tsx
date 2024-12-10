import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const usersComments = [
    {
      name: "Lucas",
      title: "Dévellopeur de Manweb et lecteur passionné",
      description:
        "Manweb a complètement changé ma façon de lire des séries. Tout est centralisé et simple à utiliser.",
    },
    {
      name: "Lucas",
      avatar: "U",
      title: "Dévellopeur de Manweb et lecteur régulier",
      description:
        "Je peux enfin suivre tous mes mangas préférés au même endroit. C'est un vrai gain de temps !",
    },
    {
      name: "Lucas",
      avatar: "C",
      title: "Dévellopeur de Manweb et fan de films",
      description:
        "L'interface est intuitive et la synchronisation entre les différentes sources est parfaite.",
    },
  ];
  return (
    <section className="container py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ce que disent nos utilisateurs
        </h2>
        <p className="mt-4 text-muted-foreground">
          Découvrez les expériences de nos utilisateurs avec Manweb
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {usersComments.map((testimonial, i) => (
          <Card key={i} className="border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {testimonial.avatar ?? testimonial.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </div>
                </div>
              </div>
              <div className="mt-4">{testimonial.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
