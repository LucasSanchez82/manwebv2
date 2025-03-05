import Image from 'next/image'
import { MockupProps } from './type'

export default function DesktopPCMockup({ image, color }: MockupProps) {
  return (
    <div className="group relative mx-auto max-w-[600px]">
      {/* Main Container with 3D Transform */}
      <div className="perspective-1200 rotate-y-1 rotate-x-2 group-hover:rotate-y-0 group-hover:rotate-x-0 relative transform transition-transform duration-500">
        {/* Desktop Monitor */}
        <div className="relative rounded-xl border-[16px] border-b-[36px] border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
          {/* Power Button */}
          <div className="absolute bottom-[-30px] right-6 z-10 h-6 w-6 rounded-full bg-gray-700"></div>

          <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
            {/* Screen Content */}
            <Image
              alt={image.alt || 'Laptop screen content'}
              src={image.src}
              width={image.width}
              height={image.height}
              className="object-cover"
            />

            {/* Screen Reflections */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>

            {/* Screen Glare - Moves on Hover */}
            <div className="absolute -inset-full h-[300%] w-[300%] rotate-12 transform bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-1000 group-hover:-translate-y-1/4 group-hover:translate-x-1/4 group-hover:opacity-100"></div>
          </div>
        </div>
      </div>

      {/* Glow Effects - Keeping these as requested */}
      <div
        className={`absolute -right-8 -top-8 -z-10 h-[120%] w-[120%] rounded-full bg-gradient-to-r ${color} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
      ></div>
      <div className="absolute -bottom-8 -left-8 -z-10 h-[120%] w-[120%] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-30"></div>

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-black/0 via-purple-500/5 to-black/0 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"></div>
    </div>
  )
}
