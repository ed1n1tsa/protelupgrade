'use client'

import { useState } from 'react'
const ClientHeader = require('../components/ClientHeader').default
const ClientMobileMenu = require('../components/ClientMobileMenu').default
const Providers = require('../providers').Providers

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Providers>
      <ClientHeader onMenuOpen={() => setMenuOpen(true)} />
      <ClientMobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
    </Providers>
  )
}
