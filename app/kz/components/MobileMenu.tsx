'use client'

import { X } from 'lucide-react'
import Link from 'next/link'

export default function MobileMenu({ isOpen, onClose }) {
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
          <Link href="/kz/" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Басты бет
          </Link>
        </li>
        <li>
          <Link href="/kz/products" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Каталог
          </Link>
        </li>
        <li>
          <Link href="/kzcard" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Себет
          </Link>
        </li>
        <li>
          <Link href="/kz/blog" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Блог
          </Link>
        </li>
        <li>
          <Link href="/kz/map" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Филиалдар
          </Link>
        </li>
        <li>
          <Link href="/kz/loginSign/login" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            Кіру
          </Link>
        </li>
        <li>
          <Link href="/" className="block text-gray-800 hover:text-orange-500" onClick={onClose}>
            RU
          </Link>
        </li>
      </ul>
    </div>
  )
}
