import { Card, CardTitle } from '@/components/ui/card'
import { FeatureCardProps } from './constant'
import Image from 'next/image'

const FeatureCard = ({ title, image }: FeatureCardProps) => {
  return (
    <Card className="flex w-full flex-col items-center gap-5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <Image src={image.src} alt={image.alt} height={50} width={50} />
      <CardTitle>{title}</CardTitle>
    </Card>
  )
}

export default FeatureCard
