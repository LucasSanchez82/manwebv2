import Image from 'next/image'
import { MockupProps } from './type'

export default function DesktopMockup({ image, color }: MockupProps) {
  return (
    <div className="relative mx-auto max-w-[600px]">
      {/* Monitor Frame */}
      <div className="relative rounded-xl border-[16px] border-b-[36px] border-gray-800 shadow-xl">
        {/* Power Button */}
        <div className="absolute bottom-[-30px] right-6 z-10 h-6 w-6 rounded-full bg-gray-700" />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative aspect-video overflow-hidden bg-gray-900">
          {/* Screen Content */}
          {image && (
            <Image
              alt={image.alt || 'Desktop screen content'}
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

      {/* Stand */}
      <div className="absolute -bottom-8 left-1/2 z-10 h-8 w-40 -translate-x-1/2 transform rounded-t-lg bg-gradient-to-b from-gray-700 to-gray-800" />
      <div className="absolute -bottom-16 left-1/2 z-10 h-8 w-60 -translate-x-1/2 transform rounded-lg bg-gradient-to-b from-gray-800 to-gray-900" />

      {/* Glow Effect */}
      <div
        className={`absolute -right-4 -top-4 -z-10 h-full w-full rounded-xl bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}
