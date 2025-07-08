'use client'

import Link from 'next/link'
import { useState } from 'react'

// Импорты через require
const Menu = require('lucide-react').Menu
const MobileMenu = require('./MobileMenu').default

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void
}

export default function Header({ onMenuToggle = () => {} }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    onMenuToggle(newState)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#001219] border-b border-[#e63946] px-6 py-4 flex items-center justify-between">
        {/* Слева: логотип и бургер */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-[#f8f9fa]" onClick={handleMenuToggle}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-bold">
            <span className="text-[#e63946]">PRO</span>
            <span className="text-[#f8f9fa]">TEL</span>
          </div>
        </div>

        {/* Центр: меню для десктопа */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/" className="text-[#f8f9fa] hover:text-[#e63946]">Главная</Link>
          <Link href="/products" className="text-[#f8f9fa] hover:text-[#e63946]">Каталог</Link>
          <Link href="/card" className="text-[#f8f9fa] hover:text-[#e63946]">Корзина</Link>
          <Link href="/blog" className="text-[#f8f9fa] hover:text-[#e63946]">Блог</Link>
          <Link href="/map" className="text-[#f8f9fa] hover:text-[#e63946]">Филиалы</Link>
        </div>
      </header>

      {/* Мобильное меню (открывается на кнопке) */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
