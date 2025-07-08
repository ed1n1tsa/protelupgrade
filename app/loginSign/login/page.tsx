'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля!')
      return
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError('Ошибка входа: ' + loginError.message)
    } else {
      if (email === 'izbasarraimbek373@gmail.com') {
        router.push('/admin')
      } else {
        router.push('/client/catalog')
      }
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Левая панель */}
      <div className="hidden lg:flex w-1/2 bg-[#e63946] text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Добро пожаловать в ProTel</h1>
          <p className="text-lg">Войдите в личный кабинет и управляйте заказами</p>
        </div>
      </div>

      {/* Правая панель */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#001219]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#f8f9fa]">Вход в аккаунт</h2>
            <p className="text-sm text-[#c0c0c0]">Введите данные для входа</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-[#334] bg-[#0a1a22] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border border-[#334] bg-[#0a1a22] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-gradient-to-r from-[#e63946] to-[#a4161a] hover:opacity-90 text-white font-semibold rounded-lg shadow-md transition"
            >
              Войти в аккаунт
            </button>

            <div className="text-center mt-4 text-sm text-[#c0c0c0]">
              Нет аккаунта?{' '}
              <Link href="/loginSign/signup" className="text-[#e63946] hover:underline">
                Зарегистрируйтесь
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
