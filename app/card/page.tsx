'use client'

import Link from 'next/link'
import { useState } from 'react'
import products, { Product } from '../../data/products'

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (id: number) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      setCart((prevCart) => [...prevCart, product])
    }
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id))
  }

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0)
  }

  return (
    <div className="bg-[#121212] text-[#f8f9fa] min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-xl mb-4">Корзина пуста</p>
          <Link href="/products">
            <button className="bg-[#c1121f] hover:bg-red-700 transition px-6 py-2 rounded-xl text-white">
              Перейти в каталог
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-[#1f1f1f] p-4 rounded-xl shadow-md border border-[#333]"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover mr-4 rounded-lg"
                  />
                  <span className="text-lg">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">{product.price}₸</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-[#c1121f] hover:bg-red-700 px-4 py-2 rounded-xl text-white"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold">Итого: {getTotal()}₸</p>
            <button className="bg-[#c1121f] hover:bg-red-700 px-8 py-3 rounded-xl text-white text-lg">
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
