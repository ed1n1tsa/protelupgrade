'use client'

export default function HeroBanner() {
  return (
    <div className="bg-[#e63946] rounded-xl overflow-hidden w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 gap-6">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase text-[#f8f9fa] mb-2">Новая модель</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#f8f9fa] leading-tight">
             Macbook X Pro
          </h1>
          <p className="text-sm text-[#f8f9fa] mt-2">
            Мощность, производительность и стиль в одном корпусе.
          </p>
          <button className="mt-4 bg-white text-[#e63946] border border-white px-6 py-2 rounded hover:bg-[#f8f9fa] transition">
            Купить сейчас
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
