'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const Profile = () => {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUserEmail(user.email ?? null)
      } else {
        router.push('/loginSign/login')
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/loginSign/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000000] p-6">
      <div className="bg-[#111111] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#333]">
        <h1 className="text-2xl font-bold text-white mb-4">Ваш профиль</h1>
        {userEmail ? (
          <>
            <p className="mb-4 text-gray-300">
              Вы вошли как: <strong className="text-white">{userEmail}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-[#e63946] hover:bg-[#c1121f] text-white rounded-lg font-semibold transition"
            >
              Выйти из аккаунта
            </button>
          </>
        ) : (
          <p className="text-gray-400">Загрузка данных...</p>
        )}
      </div>
    </main>
  )
}

export default Profile
