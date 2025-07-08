'use client'

const X = require('lucide-react').X
const Link = require('next/link').default

export default function AdminMobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 px-6 pt-6 pb-10 shadow-md overflow-auto lg:hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="text-lg font-bold">Әкімші мәзірі</span>
        <button onClick={onClose} className="ml-auto">
          <X className="w-6 h-6" />
        </button>
      </div>
      <ul className="space-y-3 text-gray-800">
        <li>
          <Link href="/kz/admin" onClick={onClose} className="block hover:text-orange-500">Басқару</Link>
        </li>
        <li>
          <Link href="/kz/admin/products" onClick={onClose} className="block hover:text-orange-500">Тауарлар</Link>
        </li>
        <li>
          <Link href="/kz/admin/upload" onClick={onClose} className="block hover:text-orange-500">XML жүктеу</Link>
        </li>
        <li>
          <Link href="/kz/admin/users" onClick={onClose} className="block hover:text-orange-500">Қолданушылар</Link>
        </li>
        <li>
          <Link href="/kz/admin/orders" onClick={onClose} className="block hover:text-orange-500">Тапсырыстар</Link>
        </li>
        <li>
          <Link href="/kz/admin/profile" onClick={onClose} className="block hover:text-orange-500">Профиль</Link>
        </li>
        <li>
          <button
            onClick={async () => {
              const { supabase } = require('../../../lib/supabaseClient')
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="text-red-600 hover:underline"
          >
            Шығу
          </button>
        </li>
      </ul>
    </div>
  )
}
