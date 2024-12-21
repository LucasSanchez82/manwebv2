import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import ChestModel from '@/components/pages/landing/Chest/Chest'

export default function Hero() {
  return (
    <section className="container relative m-auto flex min-h-screen flex-col pt-0 text-center lg:items-center lg:gap-8 lg:pb-20">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="w-screen space-y-4 rounded-lg p-4 lg:pt-20">
          <h1 className="text-4xl font-bold lg:text-6xl">Manweb</h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
            {
              'Manweb, le marque page numérique pour tous vos besoins (films, séries, musiques, jeux, et tous les contenus qui ont besoin de marque page.)'
            }
          </h2>
        </div>
        <Link
          href="/home>"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: 'lg' }))}`}
        >
          Commencer
        </Link>
      </div>
      <div className="fixed inset-0 -z-10">
        <ChestModel />

        {/* <ModelViewer modelPath="/chest/Chest.glb" /> */}
      </div>
      <div className="absolute bottom-36 h-20 w-20 cursor-pointer">
        <ChevronDownIcon className="h-full w-full text-white" />
      </div>
    </section>
  )
}
