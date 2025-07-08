'use client';

import Link from 'next/link';
import { useState } from 'react';
import products, { Product } from '../../../data/products'; // Тауарлар мен Product типін импорттаймыз

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setCart((prevCart) => [...prevCart, product]); // Себетке тауар қосамыз
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id)); // Себеттен тауарды жоямыз
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0); // Барлық тауар бағаларын қосамыз
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Себет</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-xl">Себет бос</p>
          <Link href="/products">
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg">
              Каталогқа өту
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mr-4" />
                  <span>{product.name}</span>
                </div>
                <div className="flex items-center">
                  <span>{product.price}₸</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    Жою
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Жалпы: {getTotal()}₸</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Тапсырыс беру
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
