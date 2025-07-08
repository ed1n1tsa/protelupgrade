'use client';  // Бұл клиенттік компонент екенін көрсетеді

import { useState } from 'react';
import products from '../../../data/products';
const ProductCard = require('../components/ProductCard').default;  // Компонентке жол

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([10000, 1000000]);

  // Тауарларды сүзу
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesBrand && matchesPrice;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((checkbox) => {
      const newCategories = checkbox.includes(category)
        ? checkbox.filter((item) => item !== category)
        : [...checkbox, category];
      return newCategories;
    });
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((checkbox) => {
      const newBrands = checkbox.includes(brand)
        ? checkbox.filter((item) => item !== brand)
        : [...checkbox, brand];
      return newBrands;
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([Number(e.target.value), priceRange[1]]);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([priceRange[0], Number(e.target.value)]);
  };

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Тауарлар каталогы</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
        {/* Сүзгілер */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-4">Санаттар</h2>
          <ul className="space-y-2">
            <li>
              <input
                type="checkbox"
                id="electronics"
                className="mr-2"
                onChange={() => handleCategoryChange('electronics')}
              />
              <label htmlFor="electronics">Электроника</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="games"
                className="mr-2"
                onChange={() => handleCategoryChange('games')}
              />
              <label htmlFor="games">Ойындар</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="mobile"
                className="mr-2"
                onChange={() => handleCategoryChange('mobile')}
              />
              <label htmlFor="mobile">Смартфондар</label>
            </li>
          </ul>

          <h2 className="font-semibold text-lg mt-6 mb-4">Баға диапазоны</h2>
          <div className="mb-4">
            <span className="mr-2">{priceRange[0]}₸</span>
            <input
              type="range"
              min="0"
              max="1000000"
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <span className="ml-2">{priceRange[1]}₸</span>
          </div>

          <h2 className="font-semibold text-lg mt-6 mb-4">Брендтер</h2>
          <ul className="space-y-2">
            <li>
              <input
                type="checkbox"
                id="apple"
                className="mr-2"
                onChange={() => handleBrandChange('Apple')}
              />
              <label htmlFor="apple">Apple</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="samsung"
                className="mr-2"
                onChange={() => handleBrandChange('Samsung')}
              />
              <label htmlFor="samsung">Samsung</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="xiaomi"
                className="mr-2"
                onChange={() => handleBrandChange('Xiaomi')}
              />
              <label htmlFor="xiaomi">Xiaomi</label>
            </li>
          </ul>
        </div>

        {/* Өнімдер тізімі */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Сүзгілерге сәйкес келетін тауарлар табылған жоқ.</p>
          )}
        </div>
      </div>
    </main>
  );
}
