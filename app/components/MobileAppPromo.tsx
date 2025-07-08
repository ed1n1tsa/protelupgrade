'use client'

const Image = require('next/image').default

export default function MobileAppPromo() {
  return (
    <section className="bg-[#001219] py-10 px-6 mt-16 text-center">
      <p className="uppercase text-xs text-[#f8f9fa] mb-2">Скачать приложение</p>
      <h2 className="text-2xl font-bold mb-1 text-[#f8f9fa]">
        Скачайте <span className="text-[#e63946] underline">ProTel App</span>
      </h2>
      <p className="text-[#f8f9fa] mb-6">Это облегчит вам жизнь! </p>

      <div className="flex justify-center items-center gap-4 mb-8">
        <Image
          src="/google-play.png"
          alt="Google Play"
          width={160}
          height={48}
        />
        <Image
          src="/app-store.png"
          alt="App Store"
          width={164}
          height={52}
        />
      </div>

      <div className="flex justify-center">
        <Image
          src="/mobile-promo-phone.png"
          alt="Mobile App Preview"
          width={220}
          height={400}
          className="rounded-xl shadow-md"
        />
      </div>
    </section>
  )
}
