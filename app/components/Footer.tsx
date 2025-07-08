'use client'

const Image = require('next/image').default

export default function Footer() {
  return (
    <footer className="bg-[#001219] mt-20 border-t border-[#e63946] pt-10 pb-5 px-6">
      {/* Верхняя часть: логотип и колонки */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-[#f8f9fa]">
        <div>
          <h4 className="text-base font-semibold text-[#e63946] mb-3">О нас</h4>
          <p>
            <span className="text-[#f8f9fa]">PROTEL</span> — это удобный интернет-магазин для покупки смартфонов. Каталог включает широкий ассортимент телефонов от ведущих брендов с подробными описаниями, характеристиками и отзывами. Пользователи могут легко оформлять заказы и отслеживать доставку.
          </p>
        </div>

        <div>
          <h4 className="text-base font-semibold text-[#e63946] mb-3">Особенности</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">О нас</a></li>
            <li><a href="#" className="hover:underline">Условия</a></li>
            <li><a href="#" className="hover:underline">Лучшие товары</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-[#e63946] mb-3">Навигация</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Блог</a></li>
            <li><a href="#" className="hover:underline">Магазин</a></li>
            <li><a href="#" className="hover:underline">Поддержка</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-[#e63946] mb-3">Полезное</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">О нас</a></li>
            <li><a href="#" className="hover:underline">Популярные категории</a></li>
            <li><a href="#" className="hover:underline">Контакты</a></li>
          </ul>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="mt-10 border-t border-[#e63946] pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm text-[#f8f9fa]">
        <p>©2025 ProTel. Все права защищены.</p>
        <p>Сайт сделал raimdev</p>
      </div>
    </footer>
  )
}
