'use client'

const X = require('lucide-react').X
const Link = require('next/link').default

export default function AdminMobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 px-6 pt-6 pb-10 shadow-md overflow-auto lg:hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="text-lg font-bold">Админ-меню</span>
        <button onClick={onClose} className="ml-auto">
          <X className="w-6 h-6" />
        </button>
      </div>
      <ul className="space-y-3 text-gray-800">
        <li>
          <Link href="/admin" onClick={onClose} className="block hover:text-orange-500">Панель</Link>
        </li>
        <li>
          <Link href="/admin/products" onClick={onClose} className="block hover:text-orange-500">Товары</Link>
        </li>
        <li>
          <Link href="/admin/upload" onClick={onClose} className="block hover:text-orange-500">Загрузка XML</Link>
        </li>
        <li>
          <Link href="/admin/users" onClick={onClose} className="block hover:text-orange-500">Пользователи</Link>
        </li>
        <li>
          <Link href="/admin/orders" onClick={onClose} className="block hover:text-orange-500">Заказы</Link>
        </li>
        <li>
          <Link href="/admin/profile" onClick={onClose} className="block hover:text-orange-500">Профиль</Link>
        </li>
        <li>
          <button
            onClick={async () => {
              const { supabase } = require('../../lib/supabaseClient')
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="text-red-600 hover:underline"
          >
            Выход
          </button>
        </li>
      </ul>
    </div>
  )
}
