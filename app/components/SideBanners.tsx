'use client'

export default function SideBanners() {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      {/* Smart Watch */}
      <div className="bg-[#e63946] p-4 rounded-lg flex flex-col items-start pb-4 md:pb-0">
        <span className="text-xs font-semibold text-[#f8f9fa] mb-1">GAMING</span>
        <h3 className="text-lg font-bold text-[#f8f9fa] mb-1">Apple Smart Watch</h3>
        <button className="text-sm text-[#f8f9fa] font-medium hover:underline">Купить</button>
        <img
          src="/smartwatch-banner.png" 
          alt="Watch"
          className="mt-4 w-full max-w-[200px] h-auto rounded-md object-contain"
        />
      </div>

      {/* Xbox */}
      <div className="bg-[#001219] border border-[#e63946] p-4 rounded-lg flex flex-col items-start">
        <span className="text-xs font-semibold text-[#f8f9fa] mb-1">GAMING</span>
        <h3 className="text-lg font-bold text-[#f8f9fa] mb-1">Xbox 5th Version</h3>
        <button className="text-sm text-[#e63946] font-medium hover:underline">Купить</button>
        <img
          src="/xbox-banner.jpg"
          alt="Xbox"
          className="mt-4 w-full max-w-[200px] h-auto rounded-md object-contain"
        />
      </div>
    </div>
  )
}
