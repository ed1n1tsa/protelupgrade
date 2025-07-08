'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
const Image = require('next/image').default

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUserId = session?.user?.id ?? null  // ✅ исправлено

      setUserId(currentUserId)

      const stored = localStorage.getItem('cart')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.userId === currentUserId) {
          setCart(parsed.items)
        } else {
          localStorage.removeItem('cart')
        }
      }
    }

    fetchSession()
  }, [])

  const updateLocalCart = (updatedItems: any[]) => {
    setCart(updatedItems)
    localStorage.setItem('cart', JSON.stringify({
      userId,
      items: updatedItems
    }))
  }

  const handleRemove = (index: number) => {
    const updated = [...cart]
    updated.splice(index, 1)
    updateLocalCart(updated)
  }

  const updateQuantity = (index: number, quantity: number) => {
    const updated = [...cart]
    updated[index].quantity = quantity
    updateLocalCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <main className="p-10 text-center text-gray-600 flex flex-col items-center justify-center min-h-[50vh]">
        <Image src="/icons/empty-cart.png" alt="Пусто" width={150} height={150} />
        <h2 className="text-xl font-semibold mt-4">Ваша корзина пуста</h2>
        <p className="text-sm mt-2">Добавьте товары из каталога</p>
      </main>
    )
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>

      {/* Статус заказа */}
      <div className="bg-white border rounded-md mb-6 p-4">
        <p className="font-semibold mb-2">Статус заказа</p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">1</div>
            <span className="mt-1">Корзина</span>
          </div>
          <div className="h-1 w-10 bg-gray-300" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center">2</div>
            <span className="mt-1 text-gray-400">Оформление</span>
          </div>
          <div className="h-1 w-10 bg-gray-300" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center">3</div>
            <span className="mt-1 text-gray-400">Оплата</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Список товаров */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div key={i} className="border rounded p-4 flex justify-between items-center bg-white shadow-sm">
              <div>
                <p className="font-semibold">{item.model}</p>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Кол-во:</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(i, Number(e.target.value))}
                    className="w-16 border rounded px-1"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-lg">{(item.price * item.quantity).toLocaleString()} тг</p>
                <button
                  onClick={() => handleRemove(i)}
                  className="text-red-500 text-xs mt-2 hover:underline"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Сводка */}
        <div className="border rounded p-4 bg-gray-50 shadow-md">
          <h2 className="font-semibold mb-2 text-lg">Итого</h2>
          <p className="text-xl font-bold mb-4">{total.toLocaleString()} тг</p>
          <button
            onClick={() => router.push('/client/checkout')}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </main>
  )
}
