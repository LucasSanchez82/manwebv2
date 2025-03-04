import Image from "next/image"

interface PhoneMockupProps {
  image: string
  color: string
}

export default function PhoneMockup({ image, color }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto max-w-[280px]">
      {/* Phone Frame */}
      <div className="relative rounded-[3rem] border-[14px] border-gray-800 shadow-xl h-[580px]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-gray-800 rounded-b-xl z-10" />

        {/* Side buttons */}
        <div className="absolute top-32 -left-[17px] w-[3px] h-12 bg-gray-700 rounded-l-lg" />
        <div className="absolute top-20 -right-[17px] w-[3px] h-16 bg-gray-700 rounded-r-lg" />
        <div className="absolute top-40 -right-[17px] w-[3px] h-16 bg-gray-700 rounded-r-lg" />

        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 h-full">
          {/* Screen Content */}
          <Image
            src={image || "/placeholder.svg"}
            alt="Phone mockup"
            width={400}
            height={800}
            className="w-full h-full object-cover"
          />

          {/* Screen Reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute -z-10 -top-4 -right-4 w-full h-full rounded-[3rem] bg-gradient-to-r ${color} opacity-20 blur-2xl`}
      />
      <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-[3rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
    </div>
  )
}

