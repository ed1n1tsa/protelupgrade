// lib/directus/getCategories.ts

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus-protel.onrender.com'

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/items/categories?sort=name`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Всегда получать актуальные данные
    })

    if (!res.ok) throw new Error('Ошибка при получении категорий')

    const json = await res.json()
    return json.data
  } catch (error) {
    console.error('Ошибка getCategories:', error)
    return []
  }
}
