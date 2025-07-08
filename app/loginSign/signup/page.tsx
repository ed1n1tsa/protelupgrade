'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля!')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setError('Ошибка регистрации: ' + error.message)
      } else {
        router.push('/loginSign/login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Левая панель */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Присоединяйтесь к ProTel</h1>
          <p className="text-lg">Создайте аккаунт и начните заказывать прямо сейчас</p>
        </div>
      </div>

      {/* Правая панель */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Регистрация</h2>
            <p className="text-sm text-gray-500">Заполните форму ниже</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-lg transition ${
                loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
              }`}
            >
              {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>

            <div className="text-center mt-4 text-sm">
              Уже есть аккаунт?{' '}
              <Link href="/loginSign/login" className="text-indigo-600 hover:underline">
                Войдите
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
