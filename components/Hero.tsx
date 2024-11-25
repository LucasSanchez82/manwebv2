"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookMarked, Library, Film, Tv } from "lucide-react";
import { motion, MotionProps } from "framer-motion";
// Define a new interface that extends MotionProps
interface CustomMotionProps extends MotionProps {
  className: string;
}
const CustomMotion = motion<CustomMotionProps>("div");

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-16">
        <CustomMotion
          className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Your Personal Entertainment Library
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Track, organize, and discover your favorite manga, films, and series
            all in one place. Never lose track of what you're watching or
            reading again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button size="lg" className="text-lg" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <Link href="/explore">Explore Features</Link>
            </Button>
          </div>
        </CustomMotion>

        <CustomMotion
          className="flex-1 w-full max-w-xl lg:max-w-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-sm border border-primary/10 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8 p-8">
                  <CustomMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <BookMarked className="w-12 h-12 text-primary" />
                    <span className="text-sm font-medium">Manga</span>
                  </CustomMotion>
                  <CustomMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Film className="w-12 h-12 text-primary" />
                    <span className="text-sm font-medium">Movies</span>
                  </CustomMotion>
                  <CustomMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Tv className="w-12 h-12 text-primary" />
                    <span className="text-sm font-medium">Series</span>
                  </CustomMotion>
                  <CustomMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Library className="w-12 h-12 text-primary" />
                    <span className="text-sm font-medium">Library</span>
                  </CustomMotion>
                </div>
              </div>
            </div>
          </div>
        </CustomMotion>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
