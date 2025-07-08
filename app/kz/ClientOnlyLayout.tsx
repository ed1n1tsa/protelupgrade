'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayout = pathname.startsWith('/client') || pathname.startsWith('/admin')
  const isKazakh = pathname.startsWith('/kz')

  const Header = dynamic(() =>
    isKazakh
      ? import('@/app/kz/components/Header').then(mod => mod.default)
      : import('@/app/components/Header').then(mod => mod.default),
    { ssr: false }
  )

  const Footer = dynamic(() =>
    isKazakh
      ? import('@/app/kz/components/Footer').then(mod => mod.default)
      : import('@/app/components/Footer').then(mod => mod.default),
    { ssr: false }
  )

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  )
}
