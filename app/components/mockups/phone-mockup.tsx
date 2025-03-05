import Image, { ImageProps } from 'next/image'

interface MockupProps {
  image: Omit<ImageProps, 'alt'> & {
    alt?: string
  }
  color: string
}

export default function PhoneMockup({ image, color }: MockupProps) {
  return (
    <div className="relative mx-auto max-w-[280px]">
      {/* Phone Frame */}
      <div className="relative h-[580px] rounded-[3rem] border-[14px] border-gray-800 shadow-xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-7 w-1/3 -translate-x-1/2 transform rounded-b-xl bg-gray-800" />

        {/* Side buttons */}
        <div className="absolute -left-[17px] top-32 h-12 w-[3px] rounded-l-lg bg-gray-700" />
        <div className="absolute -right-[17px] top-20 h-16 w-[3px] rounded-r-lg bg-gray-700" />
        <div className="absolute -right-[17px] top-40 h-16 w-[3px] rounded-r-lg bg-gray-700" />

        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-gray-900">
          <Image
            alt={image.alt || 'Mobile screen content'}
            src={image.src}
            width={image.width}
            height={image.height}
            className="object-cover"
          />

          {/* Screen Reflections */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute -right-4 -top-4 -z-10 h-full w-full rounded-[3rem] bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[3rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}
