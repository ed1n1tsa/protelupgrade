'use client'

export default function HeroBanner() {
  return (
    <div className="bg-purple-100 rounded-xl overflow-hidden w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 gap-6">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Жаңа модель</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Macbook X Pro
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Қуаттылық, өнімділік және стиль — бір құрылғыда.
          </p>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Қазір сатып алу
          </button>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="/banner-laptop.png" 
            alt="ProTel Macbook"
            className="w-full max-w-[600px] h-auto object-contain mx-auto" 
          />
        </div>
      </div>
    </div>
  )
}
