'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

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
      <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={handleMenuToggle}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-bold">PROTEL</div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/kz" className="text-gray-800 hover:text-orange-500">Басты бет</Link>
          <Link href="/kz/products" className="text-gray-800 hover:text-orange-500">Каталог</Link>
          <Link href="/kz/card" className="text-gray-800 hover:text-orange-500">Себет</Link>
          <Link href="/kz/blog" className="text-gray-800 hover:text-orange-500">Блог</Link>
          <Link href="/kz/map" className="text-gray-800 hover:text-orange-500">Филиалдар</Link>
          <Link href="/kz/loginSign/login" className="text-gray-800 hover:text-orange-500">Кіру</Link>
          <Link href="/" className="text-gray-800 hover:text-orange-500">RU</Link>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
