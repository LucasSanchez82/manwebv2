import Image from "next/image"

interface DesktopPCMockupProps {
  image: string
  color: string
}

export default function DesktopPCMockup({ image, color }: DesktopPCMockupProps) {
  return (
    <div className="relative mx-auto max-w-[600px] group">
      {/* Main Container with 3D Transform */}
      <div className="relative transform perspective-1200 rotate-y-1 rotate-x-2 transition-transform duration-500 group-hover:rotate-y-0 group-hover:rotate-x-0">
        {/* Desktop Monitor */}
        <div className="relative rounded-xl border-[16px] border-gray-800 border-b-[36px] shadow-xl bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Power Button */}
          <div className="absolute bottom-[-30px] right-6 w-6 h-6 bg-gray-700 rounded-full z-10"></div>

          <div className="relative overflow-hidden bg-gray-900 aspect-[16/10]">
            {/* Screen Content */}
            <Image
              src={image || "/placeholder.svg"}
              alt="Desktop PC mockup"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />

            {/* Screen Reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>

            {/* Screen Glare - Moves on Hover */}
            <div className="absolute -inset-full w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform rotate-12 group-hover:translate-x-1/4 group-hover:-translate-y-1/4"></div>
          </div>
        </div>
      </div>

      {/* Glow Effects - Keeping these as requested */}
      <div
        className={`absolute -z-10 -top-8 -right-8 w-[120%] h-[120%] rounded-full bg-gradient-to-r ${color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}
      ></div>
      <div className="absolute -z-10 -bottom-8 -left-8 w-[120%] h-[120%] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl group-hover:opacity-30 transition-opacity duration-500"></div>

      {/* Ambient Light Effect */}
      <div className="absolute -z-20 inset-0 bg-gradient-to-tr from-black/0 via-purple-500/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
    </div>
  )
}

