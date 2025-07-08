'use client'

import Link from 'next/link'
const { default: Image } = require('next/image')

export default function PopularCategory() {
  return (
    <section className="px-6 my-10">
      <h2 className="text-2xl font-bold mb-6">Танымал санаттар</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Сол жақ баннер */}
        <div className="bg-blue-100 rounded-lg p-6 flex flex-col justify-between w-full lg:max-w-[300px]">
          <div>
            <h3 className="text-lg font-bold mb-2">Танымал санаттар</h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>Смартфондар</li>
              <li>Электроника</li>
              <li>Ойындар</li>
            </ul>
            <Link href="#" className="text-sm font-medium text-black hover:text-orange-500 flex items-center">
              Қазір сатып алу <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="mt-4">
            <Image
              src="/smartwatch-banner.png" 
              alt="Смарт сағаттар"
              width={260}
              height={260}
              className="object-contain"
            />
          </div>
        </div>

        {/* Өнім карточкалары */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          <ProductCard
            image="/jbl.jpg"
            title="JBL Clip 4 Қызғылт сары портативті динамик"
            price="80 000 ₸"
            oldPrice="90 000 ₸"
            rating={4}
          />
          <ProductCard
            image="/samsung.jpg"
            title="Samsung Galaxy A52 (8/128 GB)"
            price="170 000 ₸"
            oldPrice="190 000 ₸"
            rating={2}
          />
          <ProductCard
            image="/xbox.jpg"
            title="Xbox Wireless ойын контроллері"
            price="123 000 ₸"
            oldPrice="150 000 ₸"
            rating={0}
          />
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  image,
  title,
  price,
  oldPrice,
  rating,
}: {
  image: string
  title: string
  price: string
  oldPrice?: string
  rating: number
}) {
  return (
    <div className="border rounded-lg p-4 group hover:border-orange-400 transition duration-300 shadow-sm">
      <div className="w-full h-48 relative mb-4">
        <Image src={image} alt={title} layout="fill" objectFit="contain" />
      </div>
      <div className="space-y-1">
        <div className="flex gap-1 text-yellow-500 text-sm">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < rating ? '★' : '☆'}</span>
          ))}
        </div>
        <h4 className="text-base font-semibold">{title}</h4>
        <div className="text-sm">
          {oldPrice && (
            <span className="line-through text-gray-400 mr-2">{oldPrice}</span>
          )}
          <span className="text-red-500 font-bold">{price}</span>
        </div>
      </div>
    </div>
  )
}
