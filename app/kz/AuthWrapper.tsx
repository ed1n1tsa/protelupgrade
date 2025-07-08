'use client'

import { useUser } from '@supabase/auth-helpers-react'
const Header = require('./components/Header').default
const Footer = require('./components/Footer').default

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const user = useUser()

  const isLoading = user === undefined
  const isAuthenticated = !!user

  // Пока загружается — можешь отрендерить nothing или лоадер
  if (isLoading) return null

  // Если авторизован, скрываем Header/Footer
  return (
    <>
      {!isAuthenticated && <Header />}
      <main>{children}</main>
      {!isAuthenticated && <Footer />}
    </>
  )
}
