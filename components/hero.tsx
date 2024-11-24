import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 ">
          <h1 className="text-4xl font-bold mb-4">Manweb</h1>
          <p className="mb-6">
            Découvrez Manweb, votre plateforme centralisée pour gérer et suivre
            vos lectures de manga. Grâce à notre intégration avec MangaDex, vous
            pouvez facilement enregistrer et organiser vos mangas préférés en
            utilisant simplement leur titre.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/se-connecter">Se connecter</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#features">En savoir plus</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          {/* Replace with your 3D avatar or image */}
          <div className="w-5/6 h-64 bg-gray-300 rounded mx-auto">
            {/* Placeholder for 3D avatar */}
            <Image
              alt="S"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/faa0c85c-3026-4ed3-be87-838b0f142c27/dho45gf-24ac2089-f869-4213-8738-b22cfcfa5dd2.jpg/v1/fit/w_828,h_1472,q_70,strp/fantasy_dreamscape_by_aitonomous_dho45gf-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhYTBjODVjLTMwMjYtNGVkMy1iZTg3LTgzOGIwZjE0MmMyN1wvZGhvNDVnZi0yNGFjMjA4OS1mODY5LTQyMTMtODczOC1iMjJjZmNmYTVkZDIuanBnIiwiaGVpZ2h0IjoiPD0xNjAwIiwid2lkdGgiOiI8PTkwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9mYWEwYzg1Yy0zMDI2LTRlZDMtYmU4Ny04MzhiMGYxNDJjMjdcL2FpdG9ub21vdXMtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.bjE6HS8e4m5qVBehNCAkPNZKjaTceVCouwErq7HJYiM"
              fill
            />
          </div>
        </div>
      </div>
      <div className="w-20 h-20 absolute bottom-36 cursor-pointer">
        <ChevronDownIcon className="h-full w-full" />
      </div>
    </div>
  );
}
