'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '../../lib/directus/getProducts';

export default function ProductsWithImagesPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log('📦 Продукты:', data);
        setProducts(data);
      } catch (error) {
        console.error('❌ Ошибка при загрузке продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-[#121212] text-white min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Все товары с изображениями <span className="text-[#c1121f]">(отладка)</span>
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-400">Нет товаров для отображения.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const image = product.images?.[0]?.directus_files_id?.filename_disk;
            return (
              <div key={product.id} className="bg-[#1e1e1e] p-4 rounded-lg shadow">
                {image ? (
                  <img
                    src={`https://directus-protel.onrender.com/assets/${image}`}
                    alt={product.name}
                    className="product-image mb-3 rounded"
                  />
                ) : (
                  <div className="w-full h-48 bg-[#333] mb-3 rounded flex items-center justify-center text-gray-500 text-sm">
                    Нет изображения
                  </div>
                )}
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-300 mb-2">{product.description}</p>
                <p className="font-bold text-[#c1121f]">{product.price} ₸</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-black p-4 mt-10 rounded">
        <h3 className="text-white font-semibold mb-2">Сырые данные:</h3>
        <pre className="text-green-400 text-sm overflow-x-auto">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </main>
  );
}
