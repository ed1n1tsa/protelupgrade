'use client'

const AdminHeader = require('../components/AdminHeader').default

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  )
}
