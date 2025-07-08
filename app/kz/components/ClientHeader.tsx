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
      <header className="p-4 flex justify-between items-center bg-white shadow">
        {/* Сол жақ — логотип және бургер */}  
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden">
            <MenuIcon className="w-6 h-6" />
          </button>
          <Link href="/" className="font-bold text-xl">ProTel</Link>
        </div>

        {/* Десктоп мәзірі */}  
        <nav className="space-x-4 text-sm hidden lg:flex">
          <Link href="/kz/client/catalog">Каталог</Link>
          <Link href="/kz/client/orders">Менің тапсырыстарым</Link>
          <Link href="/kz/client/cart">
            <span className="relative inline-block">
              Себет
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-green-500 text-white text-xs px-2 rounded-full">
                  {count}
                </span>
              )}
            </span>
          </Link>
          <Link href="/kz/client/support">Қолдау</Link>
          <Link href="/kz/client/profile">Профиль</Link>
          <Link href="/kz/loginSign/login" className="text-red-500">Шығу</Link>
        </nav>
      </header>

      {/* Мобильді мәзір */}  
      <ClientMobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
