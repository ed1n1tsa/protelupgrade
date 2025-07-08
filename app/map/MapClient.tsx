'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Настройка иконок
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const branches = [
  { city: 'Алматы', coords: [43.238949, 76.889709], address: 'Абый хана 12/16', phone: '87761040777' },
  { city: 'Шымкент', coords: [42.3417, 69.5901], address: 'Тынбагево, 41', phone: '87785530178' },
  { city: 'Тараз', coords: [42.8995, 71.3694], address: 'Тауке Хана, 24/1', phone: '8747695058' },
  { city: 'Актобе', coords: [50.2839, 57.166], address: 'Марата Оспанова 52', phone: '87763391611' },
  { city: 'Уральск', coords: [51.2225, 51.3543], address: 'Аманжолова 111', phone: '87051837899' },
  { city: 'Астана', coords: [51.1605, 71.4704], address: 'Малика Габдулина, 5', phone: '87714199173' },
  { city: 'Атырау', coords: [47.0945, 51.9234], address: 'мкр Привокзальный 5.7', phone: '87058965094' },
  { city: 'Актау', coords: [43.6411, 51.1989], address: '27 мкр, 71', phone: '87002749871' },
  { city: 'Оскемен', coords: [49.9714, 82.6142], address: 'Бахова 1', phone: '87058549227' },
  { city: 'Петропавловск', coords: [54.8731, 69.1505], address: 'ул. Карима Сутюшева 6ОА (2 этаж)', phone: '—' },
  { city: 'Караганда', coords: [49.802, 73.0886], address: 'Бухар Жырау, 53/8 ТД "Цум", 46 ряд', phone: '87755279668' },
]

export default function MapClient() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) {
      console.log('Карта уже инициализирована, пропускаем повторное монтирование');
      return;
    }

    console.log('Компонент MapClient смонтирован');
    isInitialized.current = true;

    return () => {
      console.log('Компонент MapClient демонтирован');
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      isInitialized.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: '600px', width: '100%', position: 'relative', zIndex: 1 }}
    >
      <MapContainer
        center={[48.0196, 66.9237] as [number, number]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '12px', border: '2px solid #e63946' }}
        ref={(map) => {
          if (map && !mapRef.current) {
            mapRef.current = map;
            console.log('Карта инициализирована');
            setTimeout(() => map.invalidateSize(), 0); // Принудительное обновление размеров
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {branches.map((branch, idx) => (
          <Marker key={idx} position={branch.coords as [number, number]}>
            <Popup>
              <strong>{branch.city}</strong>
              <br />
              {branch.address}
              <br />
              📞 {branch.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}