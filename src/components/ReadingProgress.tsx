'use client'

import { useEffect, useState } from 'react'
import { Chapter } from '@/lib/cosmic'

interface ReadingProgressProps {
  chapters: Chapter[]
}

export function ReadingProgress({ chapters }: ReadingProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
      <div 
        className="h-full bg-primary transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}