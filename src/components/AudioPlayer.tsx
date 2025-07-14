'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  content: string
  title?: string
  className?: string
}

export function AudioPlayer({ content, title = 'Chapter', className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const progressRef = useRef<number>(0)
  const textRef = useRef<string>('')

  // Extract plain text from HTML content
  const extractTextFromHTML = (html: string): string => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
      
      // Select a default voice (prefer English voices)
      const englishVoice = availableVoices.find(voice => voice.lang.startsWith('en'))
      if (englishVoice) {
        setSelectedVoice(englishVoice)
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  // Update progress periodically
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && currentUtterance) {
      interval = setInterval(() => {
        progressRef.current += 0.5
        const textLength = textRef.current.length
        const estimatedProgress = Math.min((progressRef.current / textLength) * 100, 100)
        setProgress(estimatedProgress)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentUtterance])

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.pause()
        setIsPlaying(false)
      } else if (currentUtterance) {
        window.speechSynthesis.resume()
        setIsPlaying(true)
      } else {
        startSpeech()
      }
    }
  }

  const startSpeech = () => {
    const textContent = extractTextFromHTML(content)
    textRef.current = textContent
    
    const utterance = new SpeechSynthesisUtterance(textContent)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = isMuted ? 0 : volume
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.onstart = () => {
      setIsPlaying(true)
      progressRef.current = 0
    }
    
    utterance.onend = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
      setProgress(100)
    }
    
    utterance.onerror = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
      setProgress(0)
    }
    
    utterance.onpause = () => {
      setIsPlaying(false)
    }
    
    utterance.onresume = () => {
      setIsPlaying(true)
    }
    
    setCurrentUtterance(utterance)
    window.speechSynthesis.speak(utterance)
  }

  const handleStop = () => {
    if (currentUtterance) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setCurrentUtterance(null)
      setProgress(0)
      progressRef.current = 0
    }
  }

  const handleRestart = () => {
    handleStop()
    setTimeout(startSpeech, 100)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (currentUtterance) {
      currentUtterance.volume = isMuted ? volume : 0
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (currentUtterance && !isMuted) {
      currentUtterance.volume = newVolume
    }
  }

  if (!('speechSynthesis' in window)) {
    return null
  }

  return (
    <div className={cn('p-6 bg-card border rounded-2xl space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Audio Player</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Text-to-Speech</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          <span>{isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            disabled={!currentUtterance && !isPlaying}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={handlePlay}
            className="min-w-[80px]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleStop}
            disabled={!currentUtterance}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Voice Selection */}
      {voices.length > 0 && (
        <div className="pt-4 border-t">
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value)
              setSelectedVoice(voice || null)
            }}
            className="w-full p-2 text-sm border rounded-lg bg-background"
          >
            <option value="">Select Voice</option>
            {voices
              .filter(voice => voice.lang.startsWith('en'))
              .map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  )
}