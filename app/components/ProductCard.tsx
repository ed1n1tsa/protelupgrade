'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '../../lib/cartUtils'

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter()

  const handleBuy = () => {
    addToCart(product)
    router.push('/client/cart')
  }

  const imageUrl = product.images?.[0]?.directus_files_id?.filename_disk
    ? `https://directus-protel.onrender.com/assets/${product.images[0].directus_files_id.filename_disk}`
    : 'https://avatars.mds.yandex.net/i?id=4bd78bee88cd51fb26b06257b8741c9955b690e7-5887345-images-thumbs&n=13'

  return (
    <div className="border border-[#e63946] bg-[#001219] text-[#f8f9fa] p-4 rounded">
      <img
        src={imageUrl}
        alt={product.model}
        className="mb-2 h-40 object-contain w-full rounded"
      />
      <h3 className="font-semibold text-base">{product.name}</h3>
      <p className="text-sm">Цена: {product.stock_count}</p>
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
