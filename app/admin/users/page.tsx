'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
const AdminHeader = require('../../components/AdminHeader').default

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Ошибка загрузки пользователей:', error)
      } else {
        setUsers(data || [])
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  return (
    <>
      
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">Пользователи</h1>

        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <table className="w-full text-sm border bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Телефон</th>
                <th className="border px-2 py-1">Адрес</th>
                <th className="border px-2 py-1">Город</th>
                <th className="border px-2 py-1">Индекс</th>
                <th className="border px-2 py-1">Зарегистрирован</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Нет зарегистрированных пользователей
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-2 py-1">{user.id}</td>
                    <td className="border px-2 py-1">{user.phone || '-'}</td>
                    <td className="border px-2 py-1">{user.address || '-'}</td>
                    <td className="border px-2 py-1">{user.city || '-'}</td>
                    <td className="border px-2 py-1">{user.zip_code || '-'}</td>
                    <td className="border px-2 py-1">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}
