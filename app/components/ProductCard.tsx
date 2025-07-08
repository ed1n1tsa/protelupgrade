'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '../../lib/cartUtils'

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter()

  const handleBuy = () => {
    addToCart(product)
    router.push('/client/cart')
  }

  return (
    <div className="border border-[#e63946] bg-[#001219] text-[#f8f9fa] p-4 rounded">
      <img
        src={product.img || 'https://avatars.mds.yandex.net/get-yabs_performance/10256469/hat4203a5ade400c144c2a8a10ba165f94c/hugeX'}
        alt={product.model}
        className="mb-2 h-40 object-contain w-full rounded"
      />
      <h3 className="font-semibold text-base">{product.model}</h3>
      <p className="text-sm">Остаток: {product.stock_count}</p>
      <p className="text-lg font-bold text-[#e63946]">{product.price.toLocaleString()} тг</p>
      <button
        onClick={handleBuy}
        className="w-full mt-2 bg-[#e63946] text-[#f8f9fa] py-1 rounded hover:opacity-90 transition"
      >
        Купить
      </button>
    </div>
  )
}
