'use client'

import { useState, useEffect } from 'react'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface ChapterReaderProps {
  chapter: Chapter
  siteSettings: SiteSettings | null
}

export function ChapterReader({ chapter, siteSettings }: ChapterReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices())
      }
      
      updateVoices()
      window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
      }
    }
  }, [])

  const toggleSpeech = () => {
    if (!chapter.metadata.enable_audio) return
    
    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      if (speech) {
        window.speechSynthesis.resume()
      } else {
        // Create new speech synthesis
        const utterance = new SpeechSynthesisUtterance(
          chapter.metadata.content.replace(/<[^>]*>/g, '') // Strip HTML tags
        )
        
        // Find appropriate voice
        const preferredVoice = voices.find(voice => 
          voice.lang === 'en-US' && voice.name.includes('Female')
        ) || voices[0]
        
        if (preferredVoice) {
          utterance.voice = preferredVoice
        }
        
        utterance.rate = 0.9
        utterance.pitch = 1
        
        utterance.onend = () => {
          setIsPlaying(false)
          setSpeech(null)
        }
        
        setSpeech(utterance)
        window.speechSynthesis.speak(utterance)
      }
      setIsPlaying(true)
    }
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setSpeech(null)
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Chapter {chapter.metadata.chapter_number}: {chapter.metadata.chapter_title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {chapter.metadata.reading_time && (
            <span>⏱️ {chapter.metadata.reading_time}</span>
          )}
          {chapter.metadata.word_count && (
            <span>📝 {chapter.metadata.word_count} words</span>
          )}
        </div>
        
        {chapter.metadata.enable_audio && (
          <div className="flex gap-2">
            <button
              onClick={toggleSpeech}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'} Audio
            </button>
            
            {speech && (
              <button
                onClick={stopSpeech}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
              >
                <VolumeX size={16} />
                Stop
              </button>
            )}
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground">
        <div dangerouslySetInnerHTML={{ __html: chapter.metadata.content }} />
      </div>
    </article>
  )
}