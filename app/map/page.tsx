'use client'
import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('./MapClient'), { ssr: false })

export default function MapPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#f8f9fa' }}>
        Наши филиалы на карте
      </h1>
      <MapClient />
    </div>
  )
}