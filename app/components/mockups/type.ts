import { ImageProps } from 'next/image'

export interface MockupProps {
  image?: Omit<ImageProps, 'alt'> & {
    alt?: string
  }
  color: string
}
