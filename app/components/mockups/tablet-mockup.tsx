import Image from "next/image"

interface TabletMockupProps {
  image: string
  color: string
}

export default function TabletMockup({ image, color }: TabletMockupProps) {
  return (
    <div className="relative mx-auto max-w-[450px]">
      {/* Tablet Frame */}
      <div className="relative rounded-[2rem] border-[12px] border-gray-800 shadow-xl aspect-[3/4]">
        {/* Camera */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full z-10" />

        {/* Home Button */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 border-2 border-gray-700 rounded-full z-10" />

        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative rounded-[1.5rem] overflow-hidden bg-gray-900 h-full">
          {/* Screen Content */}
          <Image
            src={image || "/placeholder.svg"}
            alt="Tablet mockup"
            width={800}
            height={1200}
            className="w-full h-full object-cover"
          />

          {/* Screen Reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute -z-10 -top-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-[2rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}

