'use client'

import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
const supabase = require('../../../../lib/supabaseClient').supabase

export default function OrdersPage() {
  const user = useUser()
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Тапсырыстарды жүктеу қатесі:', error)
      } else {
        setOrders(data)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return <div className="p-6 text-center text-gray-500">Аккаунтқа кіріңіз</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Менің тапсырыстарым</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">Әзірге ешқандай тапсырыс жоқ.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4 bg-white shadow-sm">
              <p><span className="font-semibold">Тапсырыс №:</span> {order.id}</p>
              <p><span className="font-semibold">Сома:</span> {Number(order.total_amount).toLocaleString()} тг</p>
              <p><span className="font-semibold">Күйі:</span> {order.status}</p>
              <p><span className="font-semibold">Күні:</span> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
