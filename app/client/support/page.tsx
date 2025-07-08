'use client'

import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useRef, useState } from 'react'
const supabase = require('/lib/supabaseClient').supabase

export default function SupportChatPage() {
  const user = useUser()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Подписка на новые сообщения
  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Загрузка всех сообщений
  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
      if (!error) setMessages(data)
    }
    loadMessages()
  }, [])

  // Автоскролл вниз
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return
    await supabase.from('messages').insert({
      user_id: user.id,
      role: 'user',
      content: newMessage.trim(),
    })
    setNewMessage('')
  }

  if (!user) return <div className="p-6 text-center text-gray-500">Пожалуйста, войдите в аккаунт</div>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Чат с поддержкой</h1>
      <div className="border rounded p-4 h-[400px] overflow-y-auto bg-white shadow-sm space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`max-w-[70%] px-3 py-2 rounded text-sm ${msg.role === 'admin' ? 'bg-gray-200 self-start' : 'bg-blue-100 self-end ml-auto'}`}>
            <p>{msg.content}</p>
            <p className="text-[10px] text-right text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишите сообщение..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Отправить
        </button>
      </div>
    </div>
  )
}
