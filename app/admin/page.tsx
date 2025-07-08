'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const email = userData.user?.email
      if (email !== 'izbasarraimbek373@gmail.com') {
        router.push('/')
        return
      }

      const { count: products } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      const { count: users } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      const { data: salesData } = await supabase
        .from('orders')
        .select('total_price')

      const totalRevenue = salesData?.reduce((acc, order) => acc + (order.total_price || 0), 0) || 0

      setStats({ products: products || 0, users: users || 0, orders: orders || 0, totalRevenue })
      setLoading(false)
    }

    fetchStats()
  }, [router])

  if (loading) return <p className="p-10">Загрузка CRM...</p>

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">Админ-панель ProTel</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Товары" value={stats.products} onClick={() => router.push('/admin/products')} />
        <Card title="Пользователи" value={stats.users} onClick={() => router.push('/admin/users')} />
        <Card title="Заказы" value={stats.orders} onClick={() => router.push('/admin/orders')} />
        <Card title="Сумма продаж" value={stats.totalRevenue.toLocaleString()} suffix="₸" />
      </div>

      <div className="space-x-4">
        <button
          onClick={() => router.push('/admin/upload')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Загрузить XML
        </button>
        <button
          onClick={() => router.push('/products')}
          className="bg-gray-100 border px-4 py-2 rounded hover:bg-gray-200"
        >
          Перейти в каталог
        </button>
      </div>
    </main>
  )
}

function Card({
  title,
  value,
  suffix = '',
  onClick,
}: {
  title: string
  value: number | string
  suffix?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded shadow p-6 border ${
        onClick ? 'cursor-pointer hover:bg-gray-50 transition' : ''
      }`}
    >
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold">
        {value} <span className="text-base font-normal text-gray-600">{suffix}</span>
      </p>
    </div>
  )
}
