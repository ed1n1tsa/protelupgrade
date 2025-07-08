import { supabase } from './supabaseClient'

interface CartItem {
  sku: string
  model: string
  price: number
  quantity: number
  [key: string]: any
}

interface FullCart {
  userId: string
  items: CartItem[]
}

export async function getUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id || null
}

export async function getCart(): Promise<CartItem[]> {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem('cart')
  const userId = await getUserId()

  if (!stored || !userId) return []

  try {
    const parsed: FullCart = JSON.parse(stored)
    if (parsed.userId !== userId) {
      localStorage.removeItem('cart')
      return []
    }
    return parsed.items || []
  } catch {
    localStorage.removeItem('cart')
    return []
  }
}

export async function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return

  const userId = await getUserId()
  if (!userId) return

  const cart: FullCart = { userId, items }
  localStorage.setItem('cart', JSON.stringify(cart))
}

export async function addToCart(product: CartItem) {
  const cart = await getCart()
  const existing = cart.find((item) => item.sku === product.sku)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  await saveCart(cart)
}

export async function removeFromCart(sku: string) {
  const cart = (await getCart()).filter((item) => item.sku !== sku)
  await saveCart(cart)
}

export async function clearCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart')
  }
}
