import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Organizing Your Entertainment Today
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join Manweb and take control of your entertainment library. Track your progress, discover new content, and never lose track of what you're watching or reading again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}