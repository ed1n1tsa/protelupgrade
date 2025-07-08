'use client'

import { useEffect, useState } from 'react';
const Link = require('next/link').default
const { X } = require('lucide-react')

export default function ClientMobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart')
      const items = cart ? JSON.parse(cart) : []
      setCount(items.length)
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 shadow-md overflow-auto lg:hidden">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">Мәзір</span>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <ul className="space-y-3 text-gray-800">
        <li>
          <Link href="/kz/client/catalog" onClick={onClose}>Каталог</Link>
        </li>
        <li>
          <Link href="/kz/client/orders" onClick={onClose}>Менің тапсырыстарым</Link>
        </li>
        <li>
          <Link href="/kz/client/cart" onClick={onClose}>
            Себет
            {count > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link href="/kz/client/support" onClick={onClose}>Қолдау</Link>
        </li>
        <li>
          <Link href="/kz/client/profile" onClick={onClose}>Профиль</Link>
        </li>
        <li>
          <Link href="/kz/loginSign/login" onClick={onClose} className="text-red-500">Шығу</Link>
        </li>
      </ul>
    </div>
  )
}
