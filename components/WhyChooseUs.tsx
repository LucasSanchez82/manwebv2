import { Check } from "lucide-react";

const benefits = [
  "Comprehensive tracking for manga, movies, and TV series",
  "Intuitive and user-friendly interface",
  "Detailed progress tracking and history",
  "Personalized recommendations based on your taste",
  "Create and share custom lists with friends",
  "Regular updates with new features and improvements"
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Manweb?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-background backdrop-blur-sm border shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-center px-6">
                  Join thousands of users who trust Manweb to manage their entertainment library
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}