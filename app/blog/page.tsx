'use client'

const Image = require('next/image').default

export default function BlogPage() {
  return (
    <div className="bg-[#001219] text-[#f8f9fa] max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Левая часть — текст */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-[#e63946] mb-6">О Нас</h1>
          <p className="mb-4">
            Компания <strong>ProTel</strong> начала свою работу в декабре 2020 года. Мы занимаемся продажей техники, 
            предлагая широкий ассортимент современных устройств — от смартфонов и аксессуаров до электроники 
            для дома и офиса.
          </p>
          <p className="mb-4">
            Наша компания стремится предоставлять клиентам только качественные товары от проверенных производителей,
            обеспечивая доступные цены и высокий уровень обслуживания. Мы гордимся своей командой профессионалов,
            которые всегда готовы помочь с выбором продукции и предоставить консультации.
          </p>
          <p className="mb-6">
            <strong>ProTel</strong> активно развивается, расширяя сеть филиалов по всему Казахстану, чтобы быть ближе 
            к нашим клиентам. Наша миссия — сделать передовые технологии доступными для каждого!
          </p>
          <a
            href="#contacts"
            className="inline-block bg-[#e63946] hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Связаться с нами
          </a>
        </div>

        {/* Правая часть — изображение */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/about.png"
            alt="О нас"
            width={600}
            height={400}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Контакты */}
      <div id="contacts" className="w-full mt-24 border-t border-[#334] pt-10">
        <h2 className="text-2xl font-bold text-[#e63946] mb-4">Контактные данные</h2>
        <ul className="space-y-2">
          <li>📍 Адрес: г. Астана, ул. Протельская, 17</li>
          <li>
            📞 Телефон: <a href="tel:+77001234567" className="text-[#e63946] underline">+7 (700) 123-45-67</a>
          </li>
          <li>
            📧 Email: <a href="mailto:support@protel.kz" className="text-[#e63946] underline">support@protel.kz</a>
          </li>
          <li>🕒 Время работы: Пн–Пт с 9:00 до 18:00</li>
        </ul>
      </div>
    </div>
  )
}
