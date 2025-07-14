'use client'

import { Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  title: string
  description: string
}

export function SocialShare({ title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = `Check out "${title}" - ${description}`
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-600'
    }
  ]
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Share2 className="w-5 h-5" />
        <span className="text-sm">Share this book:</span>
      </div>
      
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 ${link.color}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:text-primary transition-all duration-300 hover:scale-110"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      
      {copied && (
        <span className="text-sm text-primary font-medium">
          Link copied!
        </span>
      )}
    </div>
  )
}