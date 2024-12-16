import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ModelViewer } from "@/components/pages/home/3d/ModelViewer";

export default function Hero() {
  return (
    <div className="min-h-screen">
      {/* Model Background */}
      <div className="fixed inset-0 -z-10">
        <ModelViewer modelPath="/hologram_console/scene.gltf" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4 text-white">Manweb</h1>
            <p className="mb-6 text-white/90">
              Manweb, le marque page numérique pour tous vos besoins (films,
              séries, musiques, jeux, et tous les contenus qui ont besoin de
              marque page.)
            </p>
            <div className="flex gap-4">
              <Button>
                <Link href="se-connecter">Se-connecter</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-20 h-20 absolute bottom-36 cursor-pointer">
          <ChevronDownIcon className="h-full w-full text-white" />
        </div>
      </div>
    </div>
  );
}
