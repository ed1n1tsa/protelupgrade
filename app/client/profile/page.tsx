'use client'

import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
const supabase = require('/lib/supabaseClient').supabase

export default function ProfilePage() {
  const user = useUser()
  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {
    const fetchOrderCount = async () => {
      if (!user) return
      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      if (!error && count !== null) setOrderCount(count)
    }

    fetchOrderCount()
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/' // редирект на главную
  }

  if (!user) {
    return <div className="p-6 text-center text-gray-500">Пожалуйста, войдите в аккаунт</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
      <p className="mb-4"><span className="font-semibold">Всего заказов:</span> {orderCount}</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Выйти
      </button>
    </div>
  )
}
