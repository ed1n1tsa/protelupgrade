'use client'

const Link = require('next/link').default

const categories = [
  { title: 'Игры', image: '/icons/game.png', href: '#' },
  { title: 'Электроника', image: '/icons/electronics.png', href: '#' },
  { title: 'Колонки', image: '/icons/speaker.png', href: '#' },
  { title: 'Наушники', image: '/icons/headphones.png', href: '#' },
  { title: 'Смартфоны', image: '/icons/mobile.png', href: '#' },
]

export default function CategoryGrid() {
  return (
    <section className="px-6 my-10">
      <h2 className="text-2xl font-bold mb-6">Категории</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <Link key={index} href={cat.href}>
            <div className="flex flex-col items-center text-sm hover:text-orange-500 transition cursor-pointer">
              <img src={cat.image} alt={cat.title} className="w-12 h-12 mb-2" />
              <span>{cat.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
