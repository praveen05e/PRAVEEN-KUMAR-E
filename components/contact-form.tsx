'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full relative rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-neutral-200/50">
      {/* Structural visual linear ambient accent */}
      <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2 text-left">
            <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 pl-1">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Praveen Kumar"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-sm shadow-sm"
            />
          </div>
          
          <div className="space-y-2 text-left">
            <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 pl-1">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="praveen@example.com"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-sm shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 pl-1">
            Subject Title
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project partnership / Freelance request"
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 pl-1">
            Message Details <span className="text-primary">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Briefly describe your objectives, timeline, or scope of engineering work..."
            rows={5}
            required
            className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-sm resize-none shadow-sm"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium shadow-sm"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium shadow-sm"
          >
            Inquiry transmission successful. I will reach back out to you shortly.
          </motion.div>
        )}

        {/* Premium interactive click action */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileTap={{ scale: 0.99 }}
          className="w-full relative group overflow-hidden px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : null}
          <span>{isLoading ? 'Transmitting...' : 'Send Inquiry'}</span>
        </motion.button>
      </form>
    </div>
  )
}