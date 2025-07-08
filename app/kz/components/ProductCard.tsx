'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '../../../lib/cartUtils'

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter()

  const handleBuy = () => {
    addToCart(product)
    router.push('/kz/client/cart')
  }

  return (
    <div className="border p-4 rounded">
      <img
        src={product.img || 'https://avatars.mds.yandex.net/get-yabs_performance/10256469/hat4203a5ade400c144c2a8a10ba165f94c/hugeX'}
        alt={product.model}
        className="mb-2 h-40 object-contain w-full"
      />
      <h3 className="font-semibold text-base">{product.model}</h3>
      <p className="text-sm text-gray-600">Қалған саны: {product.stock_count}</p>
      <p className="text-lg font-bold">{product.price.toLocaleString()} ₸</p>
      <button
        onClick={handleBuy}
        className="w-full mt-2 bg-black text-white py-1 rounded hover:bg-gray-800 transition"
      >
        Сатып алу
      </button>
    </div>
  )
}
