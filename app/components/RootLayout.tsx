'use client'

import { useState } from 'react'
import Header from '../components/Header'

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Функция для управления состоянием меню
  const handleMenuToggle = (isOpen: boolean) => {
    setMenuOpen(isOpen)
  }

  return (
    <div>
      {/* Передаем функцию в Header */}
      <Header onMenuToggle={handleMenuToggle} />
      {/* Другие компоненты */}
    </div>
  )
}
