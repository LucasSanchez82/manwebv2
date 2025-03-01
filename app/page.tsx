import HowItWorks from './components/HowItWork'
import WhyManweb from './components/WhyManweb'
import FAQ from './components/FAQ'
import CallToAction from './components/CTA'
import Features from './components/Features'
import Hero from './components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyManweb />
      <FAQ />
      <CallToAction />
    </main>
  )
}
