'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to subscribe')
        // Reset to idle after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setErrorMessage('')
        }, 5000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
      // Reset to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }
  
  return (
    <section className="mb-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="p-8 bg-card border rounded-3xl glass-effect">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Stay Updated</span>
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Get notified when new chapters are released and receive exclusive sci-fi content
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
          
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">
                Thank you for subscribing! 🎉
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">
                {errorMessage}
              </p>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}