'use client'

import { useState, useEffect } from 'react'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

interface ChapterReaderProps {
  chapter: Chapter
  siteSettings: SiteSettings | null
  allChapters: Chapter[]
}

export function ChapterReader({ chapter, siteSettings, allChapters }: ChapterReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        setCurrentUtterance(null)
      } else {
        const utterance = new SpeechSynthesisUtterance(chapter.metadata.content)
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 1
        
        utterance.onend = () => {
          setIsPlaying(false)
          setCurrentUtterance(null)
        }
        
        utterance.onerror = () => {
          setIsPlaying(false)
          setCurrentUtterance(null)
        }
        
        setCurrentUtterance(utterance)
        setIsPlaying(true)
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const resetSpeech = () => {
    if (currentUtterance) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setCurrentUtterance(null)
    }
  }

  useEffect(() => {
    return () => {
      if (currentUtterance) {
        window.speechSynthesis.cancel()
      }
    }
  }, [currentUtterance])

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Chapter {chapter.metadata.chapter_number}</span>
          {chapter.metadata.reading_time && (
            <>
              <span>•</span>
              <span>{chapter.metadata.reading_time}</span>
            </>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          {chapter.metadata.chapter_title}
        </h1>
        
        {chapter.metadata.summary && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {chapter.metadata.summary}
          </p>
        )}
        
        {chapter.metadata.enable_audio && (
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={handleTextToSpeech}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Listen</span>
                </>
              )}
            </button>
            
            {currentUtterance && (
              <button
                onClick={resetSpeech}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}
      </header>
      
      <div 
        className="chapter-content"
        dangerouslySetInnerHTML={{ __html: chapter.metadata.content }}
      />
    </article>
  )
}