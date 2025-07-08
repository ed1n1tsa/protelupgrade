import '../styles/globals.css'
const Providers = require('./providers').Providers

export const metadata = {
  title: 'ProTel Shop',
  description: 'Онлайн магазин',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
