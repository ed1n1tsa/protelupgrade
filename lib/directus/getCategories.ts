import { readItems } from '@directus/sdk';
import { client } from '../directus';

export async function getProducts() {
  try {
    const response = await client.request(
      readItems('products', {
        fields: [
          'id',
          'name',
          'description',
          'price',
          'images.directus_files_id.id',
          'images.directus_files_id.filename_disk'
        ],
        populate: {
          images: {
            directus_files_id: true
          }
        }
      })
    );

    return response;
  } catch (error) {
    console.error('❌ Ошибка при получении товаров:', error);
    return [];
  }
}
