'use client'

import { useState } from 'react'
import xml2js from 'xml2js'
import { supabase } from '../../../../lib/supabaseClient'

// Определение бренда по модели
function detectBrand(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('iphone') || lower.includes('apple')) return 'Apple'
  if (lower.includes('samsung')) return 'Samsung'
  if (lower.includes('redmi') || lower.includes('xiaomi')) return 'Xiaomi'
  if (lower.includes('realme')) return 'Realme'
  if (lower.includes('jbl')) return 'JBL'
  if (lower.includes('huawei')) return 'Huawei'
  if (lower.includes('honor')) return 'Honor'
  if (lower.includes('asus')) return 'ASUS'
  return 'Неизвестно'
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState<any[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFile(file)
    setStatus('')
  }

  const handleUpload = async () => {
    if (!file) return setStatus('❌ Файл не выбран.')

    setStatus('⏳ Чтение и обработка файла...')
    const xml = await file.text()

    try {
      const parser = new xml2js.Parser({ explicitArray: false, trim: true })
      const parsed = await parser.parseStringPromise(xml)

      const offers =
        parsed?.kaspi_catalog?.offers?.offer
          ? Array.isArray(parsed.kaspi_catalog.offers.offer)
            ? parsed.kaspi_catalog.offers.offer
            : [parsed.kaspi_catalog.offers.offer]
          : null

      if (!offers) {
        setStatus('❌ Не удалось найти товары в XML.')
        return
      }

      const products = offers.map((offer: any) => {
        const priceEntry = offer.cityprices?.cityprice
        const availability = offer.availabilities?.availability
        const model = offer.model || ''
        const imageUrl = offer.img ? [offer.img] : []

        return {
          sku: offer.$.sku,
          model,
          brand: detectBrand(model),
          price: Array.isArray(priceEntry)
            ? parseFloat(priceEntry[0]._)
            : parseFloat(priceEntry._),
          stock_count: availability?.$?.stockCount
            ? parseInt(availability.$.stockCount)
            : 0,
          available: availability?.$?.available === 'yes',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          img: imageUrl.length > 0 ? imageUrl[0] : null,
        }
      })

      const validProducts = products.filter(
        (p) =>
          p.sku &&
          typeof p.price === 'number' &&
          !isNaN(p.price)
      )

      const { error } = await supabase
        .from('products')
        .upsert(validProducts, { onConflict: 'sku' })

      if (error) {
        console.error(error)
        setStatus(`❌ Ошибка при вставке в базу: ${error.message}`)
      } else {
        setStatus(`✅ Загружено товаров: ${validProducts.length}`)
        setPreview(validProducts.slice(0, 10))
      }
    } catch (err) {
      console.error(err)
      setStatus('❌ Ошибка при парсинге XML.')
    }
  }

  return (
    <main className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">Загрузка XML товаров</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input type="file" accept=".xml" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Загрузить в базу
        </button>
      </div>

      {status && <p className="text-blue-600 mb-4">{status}</p>}

      {preview.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Превью товаров:</h2>
          <table className="w-full text-sm bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">SKU</th>
                <th className="border px-2 py-1">Модель</th>
                <th className="border px-2 py-1">Бренд</th>
                <th className="border px-2 py-1">Цена</th>
                <th className="border px-2 py-1">В наличии</th>
                <th className="border px-2 py-1">Остаток</th>
                <th className="border px-2 py-1">Фото</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((p, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{p.sku}</td>
                  <td className="border px-2 py-1">{p.model}</td>
                  <td className="border px-2 py-1">{p.brand}</td>
                  <td className="border px-2 py-1">{p.price}</td>
                  <td className="border px-2 py-1">{p.available ? 'Да' : 'Нет'}</td>
                  <td className="border px-2 py-1">{p.stock_count}</td>
                  <td className="border px-2 py-1">
                    {p.img && (
                      <img src={p.img} alt="Product" className="w-16 h-16" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
