import Image from "next/image"

interface DesktopMockupProps {
  image: string
  color: string
}

export default function DesktopMockup({ image, color }: DesktopMockupProps) {
  return (
    <div className="relative mx-auto max-w-[600px]">
      {/* Monitor Frame */}
      <div className="relative rounded-xl border-[16px] border-gray-800 border-b-[36px] shadow-xl">
        {/* Power Button */}
        <div className="absolute bottom-[-30px] right-6 w-6 h-6 bg-gray-700 rounded-full z-10" />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative overflow-hidden bg-gray-900 aspect-video">
          {/* Screen Content */}
          <Image
            src={image || "/placeholder.svg"}
            alt="Desktop mockup"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />

          {/* Screen Reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Stand */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg z-10" />
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg z-10" />

      {/* Glow Effect */}
      <div
        className={`absolute -z-10 -top-4 -right-4 w-full h-full rounded-xl bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}

