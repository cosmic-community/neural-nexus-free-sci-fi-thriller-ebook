'use client'

import { useState, useEffect } from 'react'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { useReadingProgress } from '@/hooks/useReadingProgress'
import { trackChapterRead, trackAudioPlay } from '@/utils/analytics'

interface ChapterReaderProps {
  chapter: Chapter
  siteSettings: SiteSettings | null
  allChapters: Chapter[]
}

export function ChapterReader({ chapter, siteSettings, allChapters }: ChapterReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [readingProgress, setReadingProgress] = useState(0)
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  const { markChapterAsRead } = useReadingProgress(allChapters)

  useEffect(() => {
    // Track chapter read
    trackChapterRead(chapter.metadata.chapter_number, chapter.metadata.chapter_title)
    
    // Mark as read in local storage
    setTimeout(() => {
      markChapterAsRead(chapter.id)
    }, 5000) // Mark as read after 5 seconds
    
    // Track reading progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapter, markChapterAsRead])
  
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
    
    const voicePreferences = [
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('neural') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('enhanced') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('samantha') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('alex') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.localService && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-US'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ]
    
    for (const preference of voicePreferences) {
      const voice = voices.find(preference)
      if (voice) return voice
    }
    
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
        trackAudioPlay(chapter.metadata.chapter_number)
        
        const utterance = new SpeechSynthesisUtterance(
          chapter.metadata.content.replace(/<[^>]*>/g, '')
        )
        
        const selectedVoice = selectBestVoice(voices)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
        
        utterance.rate = 0.85
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

  const restartSpeech = () => {
    stopSpeech()
    setTimeout(() => {
      toggleSpeech()
    }, 100)
  }

  return (
    <div className="relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <span>Chapter {chapter.metadata.chapter_number}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {chapter.metadata.chapter_title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            {chapter.metadata.reading_time && (
              <span>⏱️ {chapter.metadata.reading_time}</span>
            )}
            {chapter.metadata.word_count && (
              <span>📝 {chapter.metadata.word_count} words</span>
            )}
          </div>
          
          {chapter.metadata.enable_audio && (
            <div className="flex justify-center gap-3">
              <button
                onClick={toggleSpeech}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'} Audio
              </button>
              
              {speech && (
                <>
                  <button
                    onClick={restartSpeech}
                    className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-accent transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restart
                  </button>
                  
                  <button
                    onClick={stopSpeech}
                    className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-accent transition-colors"
                  >
                    <VolumeX className="w-5 h-5" />
                    Stop
                  </button>
                </>
              )}
            </div>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-p:leading-relaxed prose-p:mb-6">
          <div dangerouslySetInnerHTML={{ __html: chapter.metadata.content }} />
        </div>
      </article>
    </div>
  )
}