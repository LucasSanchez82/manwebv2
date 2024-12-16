import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

export interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="flex w-full flex-col items-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <Icon className="mb-4 h-12 w-12 text-primary" />
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
