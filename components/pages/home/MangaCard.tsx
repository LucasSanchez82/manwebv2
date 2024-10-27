"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Edit2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { mangaSchemaOutputServer } from "@/lib/schemas/mangas/mangaSchema";
import { mangaSchemaClientPartial } from "@/lib/schemas/mangas/mangaSchemaClient";
import { MangaSchemaClientPartial } from "@/lib/types/schemasTypes";
import MangaCardEditedForm from "./MangaCardEditedForm";
import { DialogResponsive } from "@/components/ui/DialogResponsive.custom";

type Manga = Omit<z.infer<typeof mangaSchemaOutputServer>, "id">;

type MangaCardProps = Manga;

export default function MangaCard({
  title,
  readerUrl,
  image,
  chapter,
  description,
}: MangaCardProps) {
  return (
    <Card className="w-full max-w-sm h-64 overflow-hidden group relative">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70" />
      <CardContent className="relative h-full flex flex-col justify-end p-4 text-white">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm mb-4">Last read: {chapter}</p>
        <div className="flex justify-between items-center">
          <Link href={readerUrl} passHref>
            <Button className="flex-grow mr-2" variant="secondary">
              <BookOpen className="mr-2 h-4 w-4" />
              Continue Reading
            </Button>
          </Link>
          <DialogResponsive
            title={`Modifier ${title}`}
            form={<MangaCardEditedForm />}
            buttonProps={{ variant: "outline", size: "icon" }}
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <Edit2 className="h-4 w-4 dark:text-white light:text-black" />
          </DialogResponsive>
        </div>
      </CardContent>
    </Card>
  );
}
