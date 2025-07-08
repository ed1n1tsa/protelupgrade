'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState({
    sku: '',
    model: '',
    brand: '',
    price: '',
    stock_count: '',
    available: false,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) console.error(error)
      else setProducts(data || [])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const handleChange = (id: number, field: string, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.product_id === id ? { ...p, [field]: value } : p))
    )
  }

  const saveProduct = async (product: any) => {
    const { error } = await supabase
      .from('products')
      .update({
        ...product,
        price: parseFloat(product.price),
        stock_count: parseInt(product.stock_count),
        updated_at: new Date().toISOString(),
      })
      .eq('product_id', product.product_id)

    if (error) console.error(error)
    else setEditingId(null)
  }

  const addNewProduct = async () => {
    const insertData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock_count: parseInt(newProduct.stock_count),
      available: newProduct.available,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('products').insert([insertData]).select()

    if (error) console.error(error)
    else {
      setProducts((prev) => [...data, ...prev])
      setNewProduct({ sku: '', model: '', brand: '', price: '', stock_count: '', available: false })
    }
  }

  if (loading) return <p className="p-6">Загрузка товаров...</p>

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Все товары</h1>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">➕ Новый товар</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {['sku', 'model', 'brand', 'price', 'stock_count'].map((field) => (
            <input
              key={field}
              type={field === 'price' || field === 'stock_count' ? 'number' : 'text'}
              placeholder={field}
              className="border p-2 rounded"
              value={(newProduct as any)[field]}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
          ))}
          <label className="flex items-center space-x-1 text-sm">
            <input
              type="checkbox"
              checked={newProduct.available}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, available: e.target.checked }))
              }
            />
            <span>В наличии</span>
          </label>
          <button
            onClick={addNewProduct}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Добавить
          </button>
        </div>
      </div>

      <table className="w-full text-sm border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">SKU</th>
            <th className="border px-2 py-1">Модель</th>
            <th className="border px-2 py-1">Бренд</th>
            <th className="border px-2 py-1">Цена</th>
            <th className="border px-2 py-1">Остаток</th>
            <th className="border px-2 py-1">Доступен</th>
            <th className="border px-2 py-1">Действие</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              {['sku', 'model', 'brand', 'price', 'stock_count'].map((field) => (
                <td className="border px-2 py-1" key={field}>
                  {editingId === p.product_id ? (
                    <input
                      className="border p-1 w-full"
                      type={field === 'price' || field === 'stock_count' ? 'number' : 'text'}
                      value={p[field]}
                      onChange={(e) => handleChange(p.product_id, field, e.target.value)}
                    />
                  ) : (
                    p[field]
                  )}
                </td>
              ))}
              <td className="border px-2 py-1 text-center">
                {editingId === p.product_id ? (
                  <input
                    type="checkbox"
                    checked={p.available}
                    onChange={(e) => handleChange(p.product_id, 'available', e.target.checked)}
                  />
                ) : (
                  p.available ? 'Да' : 'Нет'
                )}
              </td>
              <td className="border px-2 py-1 text-center">
                {editingId === p.product_id ? (
                  <button
                    onClick={() => saveProduct(p)}
                    className="text-green-600 hover:underline"
                  >
                    Сохранить
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingId(p.product_id)}
                    className="text-blue-600 hover:underline"
                  >
                    Редактировать
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
