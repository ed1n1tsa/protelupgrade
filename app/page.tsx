'use client'

const CategoryGrid = require('./components/CategoryGrid').default
const products = require('../data/products').default
const HeroSection = require('./components/HeroSection').default
const MobileAppPromo = require('./components/MobileAppPromo').default
const PopularCategory = require('./components/PopularCategory').default
const ProductCard = require('./components/ProductCard').default

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularCategory />
      <CategoryGrid />

      <h2 className="text-2xl font-bold px-6 mt-12 mb-6">Новые товары</h2>

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Мобильді қосымшаның жарнамасы */}
      <MobileAppPromo />
    </main>
  )
}
