'use client'

import { debounce } from 'lodash'; // Импортируем debounce
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
const ProductCard = require('../../components/ProductCard').default
const Link = require('next/link');

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)

  // Функция фильтрации с debounce
  const filterProducts = debounce(() => {
    const result = products.filter((p) => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      const priceMatch = p.price >= minPrice && p.price <= maxPrice
      return brandMatch && priceMatch
    })
    setFiltered(result)
  }, 500); // Задержка в 500ms

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        console.error('Ошибка загрузки товаров:', error)
      } else {
        setProducts(data)
        setFiltered(data) // Загружаем сразу все товары в filtered
        const uniqueBrands = Array.from(new Set(data.map((p: any) => p.brand)))
        setBrands(uniqueBrands)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts() // Вызовем фильтрацию при изменении фильтров
  }, [selectedBrands, minPrice, maxPrice]) // Убираем products из зависимостей

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, +e.target.value); // Не даем мин цене быть меньше 0
    setMinPrice(value);
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(minPrice, +e.target.value); // Максимум цены не может быть меньше минимальной
    setMaxPrice(value);
  }

  return (
    <main className="p-6 bg-[#001219] text-[#f8f9fa]">
      <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {/* Фильтры */}
        <div className="bg-[#001219] border p-4 rounded-md">
          <h2 className="font-semibold mb-2 text-[#f8f9fa]">Бренды</h2>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <label key={brand} className="block mb-1 text-[#f8f9fa]">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                {brand}
              </label>
            ))
          ) : (
            <p className="text-gray-500">Загрузка брендов...</p>
          )}

          <h2 className="font-semibold mt-4 mb-2 text-[#f8f9fa]">Цена (₸)</h2>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border p-1 rounded w-full bg-[#001219] text-[#f8f9fa] placeholder-[#f8f9fa]"
              placeholder="Мин"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="border p-1 rounded w-full bg-[#001219] text-[#f8f9fa] placeholder-[#f8f9fa]"
              placeholder="Макс"
            />
          </div>
        </div>

        {/* Товары */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))
          ) : (
            <p className="text-[#f8f9fa] col-span-full">Нет товаров</p>
          )}
        </div>
      </div>
    </main>
  )
}
