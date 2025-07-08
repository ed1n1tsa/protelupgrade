import '../../styles/globals.css'
import { Providers } from '../providers'; // путь выше, потому что ты в папке /kz

export const metadata = {
  title: 'ProTel Shop',
  description: 'Онлайн магазин',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>{/* Никакого html/body/ClientOnlyLayout – они уже есть в корневом layout */}
      <Providers>{children}</Providers>
    </>
  )
}
