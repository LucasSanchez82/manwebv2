import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Hero() {
  // TODO: Scroll in view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 ">
          <h1 className="text-4xl font-bold mb-4">Manweb</h1>
          <p className="mb-6">
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
          {/* Replace with your 3D avatar or image */}
          <div className="w-5/6 h-64 bg-gray-300 rounded mx-auto">
            {/* Placeholder for 3D avatar */}
          </div>
        </div>
      </div>
      <div className="w-20 h-20 absolute bottom-36 cursor-pointer">
        <ChevronDownIcon className="h-full w-full" />
      </div>
    </div>
  );
}
