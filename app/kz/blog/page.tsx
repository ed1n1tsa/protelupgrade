'use client'

const Image = require('next/image').default

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Сол жақ — мәтін */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Біз туралы</h1>
          <p className="text-gray-700 mb-4">
            <strong>ProTel</strong> компаниясы өз жұмысын 2020 жылдың желтоқсан айында бастады. Біз заманауи
            құрылғыларды — смартфондар мен аксессуарлардан бастап, үй мен кеңсеге арналған электроникаға дейін —
            сатумен айналысамыз.
          </p>
          <p className="text-gray-700 mb-4">
            Біздің компания клиенттерге тек сенімді өндірушілердің сапалы тауарларын қолжетімді бағамен және
            жоғары қызмет көрсету деңгейімен ұсынуға тырысады. Біз әрдайым өнім таңдауға көмектесуге және
            кеңес беруге дайын кәсіби командамен мақтанамыз.
          </p>
          <p className="text-gray-700 mb-6">
            <strong>ProTel</strong> Қазақстан бойынша өз филиалдарын кеңейтіп, белсенді дамып келеді, клиенттерге
            жақынырақ болу үшін. Біздің миссиямыз — заманауи технологияларды әр адамға қолжетімді ету!
          </p>
          <a
            href="#contacts"
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            Бізбен байланысыңыз
          </a>
        </div>

        {/* Оң жақ — сурет */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/about.png"
            alt="Біз туралы"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Байланыс ақпараты */}
      <div id="contacts" className="w-full mt-24 border-t pt-10">
        <h2 className="text-2xl font-bold mb-4">Байланыс ақпараты</h2>
        <ul className="text-gray-800 space-y-2">
          <li>📍 Мекенжай: Астана қ., Протель көшесі, 17</li>
          <li>📞 Телефон: <a href="tel:+77001234567" className="text-blue-600 underline">+7 (700) 123-45-67</a></li>
          <li>📧 Email: <a href="mailto:support@protel.kz" className="text-blue-600 underline">support@protel.kz</a></li>
          <li>🕒 Жұмыс уақыты: Дс–Жм 9:00–18:00</li>
        </ul>
      </div>
    </div>
  )
}
