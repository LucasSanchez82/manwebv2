import CallToAction from '@/components/CallToAction'
import Features from '@/components/Features'
import Hero from '@/components/pages/landing/Hero'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* <Hero /> */}
      <Features />
      <WhyChooseUs />
      <CallToAction />
      {/* <ModelViewer modelPath="/scene.gltf" /> */}
    </main>
  )
}
