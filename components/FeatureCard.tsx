import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="flex flex-col items-center p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full">
      <CardHeader>
        <Icon className="w-12 h-12 mb-4 text-primary" />
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;

