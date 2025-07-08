'use client'

import { X } from 'lucide-react'
import Link from 'next/link'

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#001219] text-[#f8f9fa] z-50 p-6 shadow-md overflow-auto lg:hidden border-r border-[#e63946]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">Меню</span>
        <button onClick={onClose} className="text-[#e63946]">
          <X className="w-6 h-6" />
        </button>
      </div>
      <ul className="space-y-3">
        <li>
          <Link href="/" className="block hover:text-[#e63946]" onClick={onClose}>
            Главная
          </Link>
        </li>
        <li>
          <Link href="/products" className="block hover:text-[#e63946]" onClick={onClose}>
            Каталог
          </Link>
        </li>
        <li>
          <Link href="/card" className="block hover:text-[#e63946]" onClick={onClose}>
            Корзина
          </Link>
        </li>
        <li>
          <Link href="/blog" className="block hover:text-[#e63946]" onClick={onClose}>
            Блог
          </Link>
        </li>
        <li>
          <Link href="/map" className="block hover:text-[#e63946]" onClick={onClose}>
            Филиалы
          </Link>
        </li>
      </ul>
    </div>
  )
}
