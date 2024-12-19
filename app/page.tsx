import CallToAction from '@/components/CallToAction'
import Features from '@/components/Features'
import HeroHeader from '@/components/pages/landing/Heroalternative'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroHeader />
      {/* <Hero /> */}
      <Features />
      <WhyChooseUs />
      <CallToAction />
      {/* <ModelViewer modelPath="/scene.gltf" /> */}
    </main>
  )
}
