import web from '@/app/assets/features/web.svg';
import webtoon from '@/app/assets/features/webtoon.svg';
import link from '@/app/assets/features/link.svg';
import { StaticImageData } from 'next/image';

export const images: { [key: string]: { src: StaticImageData; alt: string } } = {
  web: { src: web, alt: "Web icon" },
  webtoon: { src: webtoon, alt: "Webtoon icon" },
  link: { src: link, alt: "Link icon" }
};

export type FeatureCardProps = {
    key: React.Key,
  image: { src: StaticImageData; alt: string };
  title: string;
};

export const featuresContent: FeatureCardProps[] = [
    {
        key: 1,
        title: "Centraliser ses lectures",  
        image: images.web
    }, 
    {
        key: 2,
        title: 'Ajouter toutes les données d\'un manga en 1 lien',
        image: images.link,
    },
    {
        key: 3,
        title: 'Plusieurs sites de lecture en ligne sont/seront prises en charge',
        image: images.webtoon
    }
]
