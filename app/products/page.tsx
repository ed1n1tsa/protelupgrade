'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '../../lib/directus/getCategories';
import { getProducts } from '../../lib/directus/getProducts';

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cat = await getCategories();
        const prod = await getProducts();
        setCategories(cat);
        setProducts(prod);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id?.id === selectedCategory)
    : products;

  return (
    <main className="bg-[#121212] text-white min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg border ${
            selectedCategory === null ? 'bg-[#c1121f] text-white' : 'bg-[#1f1f1f]'
          }`}
        >
          Все категории
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === cat.id ? 'bg-[#c1121f] text-white' : 'bg-[#1f1f1f]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#1e1e1e] p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-300 mb-2">{product.description}</p>
              <p className="font-bold text-[#c1121f]">{product.price} ₸</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10">Нет товаров в этой категории.</p>
      )}
    </main>
  );
}
