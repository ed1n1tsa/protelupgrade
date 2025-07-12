'use client'

import { useEffect, useState } from 'react';
import { getProducts } from '../lib/directus/getProducts'; // правильный путь
const HeroSection = require('./components/HeroSection').default;
const MobileAppPromo = require('./components/MobileAppPromo').default;
const ProductCard = require('./components/ProductCard').default;

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts(); // получаем данные о товарах
        setProducts(productData);
        setFilteredProducts(productData);

        // Получаем категории из Directus
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('❌ Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  // Функция для получения категорий из Directus
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://directus-protel.onrender.com/items/categories');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Ошибка получения категорий:', error);
      return [];
    }
  };

  // Фильтрация товаров
  const filterProducts = () => {
    console.log("Selected category:", selectedCategory);
    const filtered = products.filter(product => {
      const productCategoryId = String(product.category_id); // Преобразуем category_id товара в строку
      const isCategoryMatch = selectedCategory
        ? productCategoryId === String(selectedCategory) // Сравниваем как строки
        : true;
      const isSearchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;

      console.log(`Filtering product ${product.id}: category_id=${productCategoryId}, isCategoryMatch=${isCategoryMatch}`);

      return isCategoryMatch && isSearchMatch && isPriceMatch;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  return (
    <main>
      <HeroSection />

      <div className="flex flex-wrap justify-between items-center mt-12">
        <h2 className="text-2xl font-bold w-full mb-4 md:mb-0">Товары</h2>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* Фильтр по категориям */}
          <select
            className="p-2 bg-gray-800 text-white rounded"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          {/* Фильтр по названию товара */}
          <input
            type="text"
            placeholder="Поиск по названию"
            className="p-2 bg-gray-800 text-white rounded"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Фильтр по цене */}
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Мин. цена"
              className="p-2 bg-gray-800 text-white rounded"
              onChange={(e) => setMinPrice(Number(e.target.value))}
              value={minPrice}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Макс. цена"
              className="p-2 bg-gray-800 text-white rounded"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              value={maxPrice}
            />
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-400">Нет товаров для отображения.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Мобильді қосымшаның жарнамасы */}
      <MobileAppPromo />
    </main>
  );
}
