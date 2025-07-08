'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({})

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(` 
          id,
          user_id,
          total_amount,
          status,
          created_at,
          customer_name,
          phone,
          address,
          profiles (
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Ошибка загрузки заказов:', error)
      } else {
        setOrders(data || [])
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (error) {
      alert('Ошибка обновления статуса')
      console.error(error)
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700'
      case 'в пути': return 'bg-yellow-100 text-yellow-700'
      case 'завершён': return 'bg-blue-100 text-blue-700'
      case 'отменён': return 'bg-gray-200 text-gray-600'
      default: return 'bg-red-100 text-red-700'
    }
  }

  const handleExpand = async (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
      return
    }

    // если уже загружены — не повторяем запрос
    if (!orderItems[orderId]) {
      const { data, error } = await supabase
        .from('order_items')
        .select('model, quantity, price')
        .eq('order_id', orderId)

      if (error) {
        console.error('Ошибка загрузки товаров:', error)
        return
      }

      setOrderItems((prev) => ({ ...prev, [orderId]: data }))
    }

    setExpandedOrderId(orderId)
  }

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Заказы</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Фильтр по статусу:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Все</option>
          <option value="в обработке">Новый</option>
          <option value="paid">Оплачен</option>
          <option value="в пути">В пути</option>
          <option value="завершён">Завершён</option>
          <option value="отменён">Отменён</option>
        </select>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className="w-full text-sm border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Имя</th>
              <th className="border px-2 py-1">Телефон</th>
              <th className="border px-2 py-1">Адрес</th>
              <th className="border px-2 py-1">Сумма</th>
              <th className="border px-2 py-1">Статус</th>
              <th className="border px-2 py-1">Дата</th>
              <th className="border px-2 py-1">Действие</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-b">
                  <td className="border px-2 py-1">{order.id}</td>
                  <td className="border px-2 py-1">{order.profiles?.email || 'неизвестно'}</td>
                  <td className="border px-2 py-1">{order.customer_name}</td>
                  <td className="border px-2 py-1">{order.phone}</td>
                  <td className="border px-2 py-1">{order.address}</td>
                  <td className="border px-2 py-1">{order.total_amount} ₸</td>
                  <td className={`border px-2 py-1 ${getStatusClass(order.status)} rounded`}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-transparent"
                    >
                      <option value="в обработке">Новый</option>
                      <option value="paid">Оплачен</option>
                      <option value="в пути">В пути</option>
                      <option value="завершён">Завершён</option>
                      <option value="отменён">Отменён</option>
                    </select>
                  </td>
                  <td className="border px-2 py-1">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleExpand(order.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {expandedOrderId === order.id ? 'Скрыть' : 'Подробнее'}
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order.id && orderItems[order.id] && (
                  <tr className="bg-gray-50">
                    <td colSpan={9} className="p-4">
                      <h4 className="font-semibold mb-2">Товары в заказе:</h4>
                      <ul className="space-y-1">
                        {orderItems[order.id].map((item, index) => (
                          <li key={index} className="text-sm">
                            {item.model} — {item.quantity} шт × {item.price} ₸
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
