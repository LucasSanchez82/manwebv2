import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Feature from "@/components/pages/landing/feature/Feature";
import WhyChooseUs from "@/components/WhyChooseUs";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
