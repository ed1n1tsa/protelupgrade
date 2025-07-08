'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'

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
        router.push('/kz/loginSign/login') // Егер қолданушы кірмеген болса, логинге бағыттау
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/kz/loginSign/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Профиль</h1>
        {userEmail ? (
          <>
            <p className="mb-4 text-gray-600">Сіз кірдіңіз: <strong>{userEmail}</strong></p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
            >
              Шығу
            </button>
          </>
        ) : (
          <p className="text-gray-500">Деректер жүктелуде...</p>
        )}
      </div>
    </main>
  )
}

export default Profile
