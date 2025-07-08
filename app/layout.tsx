import '../styles/globals.css'
import ClientOnlyLayout from './ClientOnlyLayout'
import { Providers } from './providers'

const Header = require('./components/Header').default
const Footer = require('./components/Footer').default

export const metadata = {
  title: 'ProTel Shop',
  description: 'Онлайн магазин',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {/* Этот контейнер ClientOnlyLayout проверит путь и сам решит, что показывать */}
          <ClientOnlyLayout>{children}</ClientOnlyLayout>
        </Providers>
      </body>
    </html>
  )
}
