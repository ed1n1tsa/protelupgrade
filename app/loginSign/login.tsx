import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
    
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля!')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Ошибка входа: ' + error.message)
    } else {
      router.push('/profile')
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Левая панель */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-white">ProTel</span></h1>
          <p className="text-lg">Войдите в личный кабинет и управляйте заказами</p>
        </div>
      </div>

      {/* Правая панель */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Вход в аккаунт</h2>
            <p className="text-sm text-gray-500">Введите данные для входа</p>
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

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Запомнить
              </label>
              <a href="#" className="hover:underline">Забыли пароль?</a>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Войти в аккаунт
            </button>

            <div className="text-center mt-4 text-sm">
              Нет аккаунта?{' '}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Зарегистрируйтесь
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
