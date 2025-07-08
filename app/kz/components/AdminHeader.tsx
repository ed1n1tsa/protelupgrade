'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
const { LogOut, Menu } = require('lucide-react')
const AdminMobileMenu = require('./AdminMobileMenu').default

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.href = '/'
  }

  return (
    <>
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <Link href="/admin" className="text-xl font-bold">ProTel Әкімші</Link>
        <nav className="hidden lg:flex gap-6 text-sm">
          <Link href="/kz/admin" className="hover:text-orange-400">Басқару</Link>
          <Link href="/kz/admin/products" className="hover:text-orange-400">Тауарлар</Link>
          <Link href="/kz/admin/upload" className="hover:text-orange-400">Жүктеу</Link>
          <Link href="/kz/admin/users" className="hover:text-orange-400">Қолданушылар</Link>
          <Link href="/kz/admin/orders" className="hover:text-orange-400">Тапсырыстар</Link>
          <Link href="/kz/admin/chat" className="hover:text-orange-400">Клиентпен чат</Link>
          <Link href="/kz/admin/profile" className="hover:text-orange-400">Профиль</Link>
          <button onClick={handleLogout} className="hover:text-red-400 flex items-center gap-1">
            <LogOut size={16} /> Шығу
          </button>
        </nav>

        {/* Гамбургер */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden text-white"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Мобильді мәзір */}
      <AdminMobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
