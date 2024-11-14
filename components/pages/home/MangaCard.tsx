import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit2 } from "lucide-react";
import Link from "next/link";
import MangaCardEditedForm from "../../forms/mangaForm/MangaCardEditedForm";
import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import { Manga } from "@prisma/client";

export default function MangaCard({
  title,
  readerUrl,
  image,
  chapter,
  isSelfHosted,
  description,
  id,
}: Manga) {
  const imageUrl = `${isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + "/" : ""}${image}`;
  return (
    <Card className="w-full max-w-sm h-64 overflow-hidden group relative">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
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
            form={
              <MangaCardEditedForm
                {...{
                  title,
                  readerUrl,
                  image: image || undefined,
                  imageUrl,
                  chapter,
                  description,
                  id,
                }}
              />
            }
            buttonProps={{ variant: "outline", size: "icon" }}
            className="bg-cover bg-center"
          >
            <Edit2 className="h-4 w-4 dark:text-white" />
          </DialogResponsive>
        </div>
      </CardContent>
    </Card>
  );
}
