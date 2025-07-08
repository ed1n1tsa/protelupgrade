'use client'

import { useEffect, useRef, useState } from 'react'
const supabase = require('/lib/supabaseClient').supabase

export default function AdminChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Подписка на новые сообщения
  useEffect(() => {
    const channel = supabase
      .channel('chat-room-admin')
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

  // Загрузка сообщений
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    await supabase.from('messages').insert({
      user_id: null,
      role: 'admin',
      content: newMessage.trim(),
    })
    setNewMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Чат с пользователями</h1>
      <div className="border rounded p-4 h-[500px] overflow-y-auto bg-white shadow-sm space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`max-w-[70%] px-3 py-2 rounded text-sm ${msg.role === 'user' ? 'bg-blue-100 self-start' : 'bg-gray-200 self-end ml-auto'}`}>
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
          placeholder="Сообщение"
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
