'use client'

const Image = require('next/image').default

export default function MobileAppPromo() {
  return (
    <section className="bg-gray-100 py-10 px-6 mt-16 text-center">
      <p className="uppercase text-xs text-gray-500 mb-2">Қосымшаны жүктеу</p>
      <h2 className="text-2xl font-bold mb-1">
        <span className="text-red-500 underline">ProTel App</span> жүктеп алыңыз
      </h2>
      <p className="text-gray-600 mb-6">Бұл сіздің өміріңізді жеңілдетеді!</p>

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
          alt="Мобильді қосымшаның алдын ала қарауы"
          width={220}
          height={400}
          className="rounded-xl shadow-md"
        />
      </div>
    </section>
  )
}
