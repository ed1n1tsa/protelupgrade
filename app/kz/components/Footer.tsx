'use client'

const Image = require('next/image').default

export default function Footer() {
  return (
    <footer className="bg-white mt-20 border-t pt-10 pb-5 px-6">
      {/* Жоғарғы бөлік: логотип пен бағандар */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-700">
        <div>
          <h4 className="text-base font-semibold text-black mb-3">Біз туралы</h4>
          <p className="text-gray-500">ТМД бойынша ең үздік электроника</p>
        </div>

        <div>
          <h4 className="text-base font-semibold text-black mb-3">Ерекшеліктер</h4>
          <ul className="space-y-2">
            <li><a href="#">Біз туралы</a></li>
            <li><a href="#">Шарттар</a></li>
            <li><a href="#">Үздік тауарлар</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-black mb-3">Навигация</h4>
          <ul className="space-y-2">
            <li><a href="#">Блог</a></li>
            <li><a href="#">Дүкен</a></li>
            <li><a href="#">Қолдау</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-black mb-3">Пайдалы</h4>
          <ul className="space-y-2">
            <li><a href="#">Біз туралы</a></li>
            <li><a href="#">Танымал санаттар</a></li>
            <li><a href="#">Байланыс</a></li>
          </ul>
        </div>
      </div>

      {/* Төменгі бөлік */}
      <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm text-gray-500">
        <p>©2025 ProTel. Барлық құқықтар қорғалған.</p>  
        <p>Сайт жасаған — raimdev</p>
      </div>
    </footer>
  )
}
