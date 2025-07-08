'use client'

import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { clearCart, getCart } from '../../../../lib/cartUtils'
import { supabase } from '../../../../lib/supabaseClient'

export default function CheckoutPage() {
  const router = useRouter()
  const user = useUser()
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'kaspi',
    delivery: 'courier',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadCart = async () => {
      const items = await getCart()
      setCart(items)
      setLoading(false)
    }
    loadCart()
  }, [])

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !user.id) {
      alert('Аккаунтқа кірмедіңіз')
      console.error('user бос немесе id жоқ:', user)
      return
    }

    if (cart.length === 0) {
      alert('Себет бос')
      return
    }

    setSubmitting(true)

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: 'өңделуде',
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        payment_method: form.payment,
        delivery_method: form.delivery,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Тапсырыс жасау қатесі:', JSON.stringify(orderError, null, 2))
      alert('Тапсырысты рәсімдеу кезінде қате шықты')
      setSubmitting(false)
      return
    }

    const orderId = orderData.id

    const items = cart.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      model: item.model,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(items)

    if (itemsError) {
      console.error('Тапсырыс тауарларын қосу қатесі:', JSON.stringify(itemsError, null, 2))
      alert('Тапсырыс заттарын сақтау қатесі')
      setSubmitting(false)
      return
    }

    clearCart()
    localStorage.setItem('last_order_id', orderId)

    if (form.payment === 'kaspi') {
      window.location.href = 'https://pay.kaspi.kz/pay/p5soibnh'
    } else {
      router.push('/client/checkout/success')
    }
  }

  if (loading) return <p className="p-6">Себет жүктелуде...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Тапсырысты рәсімдеу</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Атыңыз"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон нөмірі"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Жеткізу мекенжайы"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Жеткізу</label>
            <select
              name="delivery"
              value={form.delivery}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            >
              <option value="courier">Курьер</option>
              <option value="pickup">Өзі алып кету</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Төлем</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            >
              <option value="kaspi">Kaspi</option>
              <option value="halyk">Halyk</option>
              <option value="cash">Қолма-қол</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`w-full text-white py-2 rounded transition ${
            submitting ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {submitting ? 'Өңделуде...' : 'Төлеуге өту'}
        </button>
      </form>
    </div>
  )
}
