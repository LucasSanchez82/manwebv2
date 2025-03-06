import Image from 'next/image'
import { MockupProps } from '@/app/components/mockups/type'

export default function TabletMockup({ image, color }: MockupProps) {
  return (
    <div className="relative mx-auto max-w-[450px]">
      {/* Tablet Frame */}
      <div className="relative aspect-[3/4] rounded-[2rem] border-[12px] border-gray-800 shadow-xl">
        {/* Camera */}
        <div className="absolute left-1/2 top-4 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-gray-700" />

        {/* Home Button */}
        <div className="absolute bottom-3 left-1/2 z-10 h-10 w-10 -translate-x-1/2 transform rounded-full border-2 border-gray-700" />

        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-gray-900">
          {/* Screen Content */}
          {image && (
            <Image
              alt={image.alt || 'Tablet screen content'}
              src={image.src}
              width={image.width}
              height={image.height}
              className="object-cover"
            />
          )}

          {/* Screen Reflections */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute -right-4 -top-4 -z-10 h-full w-full rounded-[2rem] bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[2rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}
