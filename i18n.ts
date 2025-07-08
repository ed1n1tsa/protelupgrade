import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Подключаем файлы переводов
import translationKk from './public/locales/kk/translation.json'
import translationRu from './public/locales/ru/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: translationRu
      },
      kk: {
        translation: translationKk
      }
    },
    // Указываем казахский язык как язык по умолчанию
    lng: 'kk',  // По умолчанию казахский
    fallbackLng: 'ru', // Запасной язык — русский
    interpolation: {
      escapeValue: false // Не экранировать значения
    }
  })

export default i18n
