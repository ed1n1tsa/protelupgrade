// lib/directus/getCategories.ts

import { readItems } from '@directus/sdk';
import { directus } from '../directus';

export const getCategories = async () => {
  try {
    const categories = await directus.request(readItems('categories'));
    return categories;
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    return [];
  }
};
