'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const MenuIcon = require('lucide-react').Menu
const ClientMobileMenu = require('./ClientMobileMenu').default

export default function ClientHeader() {
  const [count, setCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    const items = cart ? JSON.parse(cart) : []
    setCount(items.length)
  }, [])

  return (
    <>
      <header className="p-4 flex justify-between items-center bg-[#001219] text-[#f8f9fa] shadow">
        {/* Левая часть — логотип и бургер */}
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden">
            <MenuIcon className="w-6 h-6" />
          </button>
          <Link href="/" className="font-bold text-xl">ProTel</Link>
        </div>

        {/* Десктоп-меню */}
        <nav className="space-x-4 text-sm hidden lg:flex">
          <Link href="/client/catalog" className="hover:text-[#e63946]">Каталог</Link>
          <Link href="/client/orders" className="hover:text-[#e63946]">Мои заказы</Link>
          <Link href="/client/cart">
            <span className="relative inline-block hover:text-[#e63946]">
              Корзина
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-green-500 text-white text-xs px-2 rounded-full">
                  {count}
                </span>
              )}
            </span>
          </Link>
          <Link href="/client/support" className="hover:text-[#e63946]">Поддержка</Link>
          <Link href="/client/profile" className="hover:text-[#e63946]">Профиль</Link>
          <Link href="/loginSign/login" className="text-red-500 hover:text-[#e63946]">Выйти</Link>
        </nav>
      </header>

      {/* Мобильное меню */}
      <ClientMobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
