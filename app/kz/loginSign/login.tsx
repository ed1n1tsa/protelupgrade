import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
    
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Барлық өрістерді толтырыңыз!')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Кіру қатесі: ' + error.message)
    } else {
      router.push('/kz/profile')
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Сол жақ панель */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">ProTel жүйесіне қош келдіңіз</h1>
          <p className="text-lg">Жеке кабинетке кіріп, тапсырыстарыңызды басқарыңыз</p>
        </div>
      </div>

      {/* Оң жақ панель */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Аккаунтқа кіру</h2>
            <p className="text-sm text-gray-500">Кіру үшін деректерді енгізіңіз</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Электронды пошта"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Құпия сөз"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Есте сақтау
              </label>
              <a href="#" className="hover:underline">Құпия сөзді ұмыттыңыз ба?</a>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Кіру
            </button>

            <div className="text-center mt-4 text-sm">
              Аккаунтыңыз жоқ па?{' '}
              <a href="/kz/signup" className="text-indigo-600 hover:underline">
                Тіркеліңіз
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
