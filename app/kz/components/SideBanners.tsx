'use client'

export default function SideBanners() {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      {/* Ақылды сағат баннері */}
      <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-start pb-4 md:pb-0">
        <span className="text-xs font-semibold text-gray-600 mb-1">GAMING</span>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Apple Smart Watch</h3>
        <button className="text-sm text-orange-600 font-medium hover:underline">Сатып алу</button>
        <img
          src="/smartwatch-banner.png" 
          alt="Сағат"
          className="mt-4 w-full max-w-[200px] h-auto rounded-md object-contain"
        />
      </div>

      {/* Xbox баннері */}
      <div className="bg-white border p-4 rounded-lg flex flex-col items-start">
        <span className="text-xs font-semibold text-gray-600 mb-1">GAMING</span>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Xbox 5-нұсқасы</h3>
        <button className="text-sm text-orange-600 font-medium hover:underline">Сатып алу</button>
        <img
          src="/xbox-banner.jpg"
          alt="Xbox"
          className="mt-4 w-full max-w-[200px] h-auto rounded-md object-contain"
        />
      </div>
    </div>
  )
}
