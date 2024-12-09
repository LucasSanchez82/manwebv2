import { Navigation } from "@/components/navigation";
import Feature from "@/components/Feature";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { MangaDexAcknowledgment } from "@/components/MangaDexAcknowledgment";
import Hero from "./components/pages/landing/Hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Feature />
        <HowItWorks />
        <MangaDexAcknowledgment />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
