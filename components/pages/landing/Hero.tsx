import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ModelViewer } from "@/components/pages/home/3d/ModelViewer";

export default function Hero() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Model Background */}
      <div className="absolute top-0 right-0">
        <ModelViewer modelPath="/shiba/scene.gltf" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4 text-white">Manweb</h1>
            <p className="mb-6 text-white/90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              earum error fugit fuga laudantium veniam quis ullam possimus minus
              quaerat sunt, eligendi dicta saepe reiciendis soluta id. Dolorem,
              alias quasi.
            </p>
            <div className="flex gap-4">
              <Button>
                <Link href="se-connecter">Se-connecter</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            {/* Remove placeholder since we have the 3D model as background */}
          </div>
        </div>
        <div className="w-20 h-20 absolute bottom-36 cursor-pointer">
          <ChevronDownIcon className="h-full w-full text-white" />
        </div>
      </div>
    </div>
  );
}
