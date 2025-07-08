const URL = 'https://directus-protel.onrender.com/items/products?fields=id,name,price,description,in_stock,category_id.id,category_id.name,images.directus_files_id.id,images.directus_files_id.filename_disk';
const TOKEN = 'd8xOZE2kJxKWgaSD5uDRxc_nTQgiKqgk';

export const getProducts = async () => {
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};
