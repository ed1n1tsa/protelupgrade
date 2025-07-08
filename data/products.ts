export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;  // категория товара
  brand: string;     // бренд товара
}

// Экспорт массива товаров
const products: Product[] = [
  {
    id: 1,
    name: 'Смартфон Iphone 16',
    price: 799990,
    image: '/phone.jpg',
    category: 'mobile',   // категория: Смартфоны
    brand: 'Apple',       // бренд: Apple
  },
  {
    id: 2,
    name: 'Смарт-часы FitTime',
    price: 324900,
    image: '/watch.jpg',
    category: 'electronics',  // категория: Электроника
    brand: 'FitTime',         // бренд: FitTime
  },
  {
    id: 3,
    name: 'Геймпад XGame Controller',
    price: 59900,
    image: '/controller.jpg',
    category: 'games',        // категория: Игры
    brand: 'XGame',           // бренд: XGame
  },
  {
    id: 4,
    name: 'Ноутбук ProBook 14',
    price: 189900,
    image: '/laptop.png',
    category: 'electronics',  // категория: Электроника
    brand: 'HP',              // бренд: HP
  },
];

export default products;
