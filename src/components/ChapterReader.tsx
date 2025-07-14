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

  const selectBestVoice = (voices: SpeechSynthesisVoice[]) => {
    if (voices.length === 0) return null
    
    // Priority order for more natural-sounding voices
    const voicePreferences = [
      // High-quality neural voices (usually available on newer systems)
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('neural') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('enhanced') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('premium') && v.lang.startsWith('en'),
      
      // Platform-specific high-quality voices
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('samantha') && v.lang.startsWith('en'), // macOS
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('alex') && v.lang.startsWith('en'), // macOS
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('zira') && v.lang.startsWith('en'), // Windows
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('hazel') && v.lang.startsWith('en'), // Windows
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('david') && v.lang.startsWith('en'), // Windows
      
      // Google voices (often high quality)
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en'),
      
      // Local voices over remote ones (better performance)
      (v: SpeechSynthesisVoice) => v.localService && v.lang.startsWith('en'),
      
      // Fallback to any English voice
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-US'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ]
    
    // Try each preference in order
    for (const preference of voicePreferences) {
      const voice = voices.find(preference)
      if (voice) return voice
    }
    
    // Ultimate fallback
    return voices[0]
  }

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
        
        // Select the best available voice
        const selectedVoice = selectBestVoice(voices)
        
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
        
        // Optimize speech settings for natural reading
        utterance.rate = 0.85 // Slightly slower for better comprehension
        utterance.pitch = 1.0
        utterance.volume = 0.9
        
        utterance.onend = () => {
          setIsPlaying(false)
          setSpeech(null)
        }
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event.error)
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