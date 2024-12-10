import { Card, CardTitle } from "@/components/ui/card";
import { FeatureCardProps } from "./constant";
import Image from "next/image";

const FeatureCard = ({ title, image }: FeatureCardProps) => {
  return (
    <Card className="flex flex-col gap-5 items-center p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full">
      <Image src={image.src} alt={image.alt} height={50} width={50} />
      <CardTitle>{title}</CardTitle>
    </Card>
  );
};

export default FeatureCard;
