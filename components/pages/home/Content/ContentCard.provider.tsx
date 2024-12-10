import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import ContentCardBackgroundImage from "./ContentCard.backgroundImage";
import { PersonnalContent } from "@/lib/cachedRequests/content/getPersonnalContents";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  Omit<PersonnalContent, "id"> & {
    hideContinueReading?: boolean;
    buttonContainer?: {
      className?: string;
    };
  }
>;
export default function ContentCardProvider({
  title,
  readerUrl,
  image,
  chapter,
  isSelfHosted,
  children,
  hideContinueReading = false,
  buttonContainer,
}: Props) {
  const imageUrl = `${isSelfHosted ? process.env.SELFHOSTED_IMAGES_BASE_URL + "/" : ""}${image}`;
  return (
    <Card className="w-full max-w-sm h-64 overflow-hidden group relative">
      <ContentCardBackgroundImage imageUrl={imageUrl} />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70" />
      <CardContent className="relative h-full flex flex-col justify-end p-4 text-white">
        <h2 className="text-2xl font-bold mb-2 s">{title}</h2>
        <p className="text-sm mb-4">Last read: {chapter}</p>
        <div
          className={`flex items-center ${buttonContainer?.className || "justify-between"}`}
        >
          {!hideContinueReading && readerUrl && (
            <Link href={readerUrl} passHref>
              <Button className="flex-grow mr-2" variant="secondary">
                <BookOpen className="mr-2 h-4 w-4" />
                Continue Reading
              </Button>
            </Link>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
