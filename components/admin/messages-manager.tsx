'use client'

import { useState, useEffect } from 'react'
import { getMessages } from '@/app/actions/portfolio'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const data = await getMessages()
    // @ts-ignore
    setMessages(data || [])
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">Contact Messages</h3>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 text-center text-muted-foreground">
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-primary/20 bg-card/50 p-6 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-foreground">{msg.subject}</h4>
                  <p className="text-sm font-medium text-primary">From: {msg.name} ({msg.email})</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-4 p-4 rounded bg-background/50 text-foreground border border-primary/10 whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
