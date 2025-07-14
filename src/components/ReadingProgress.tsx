'use client'

import { useReadingProgress } from '@/hooks/useReadingProgress'
import { Chapter } from '@/lib/cosmic'

interface ReadingProgressProps {
  chapters: Chapter[]
}

export function ReadingProgress({ chapters }: ReadingProgressProps) {
  const { progress, currentChapter, markChapterAsRead } = useReadingProgress(chapters)
  
  return (
    <div className="fixed bottom-6 right-6 bg-card border rounded-2xl p-4 shadow-lg z-50 glass-effect">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-bold text-sm">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="text-sm">
          <div className="font-medium">Reading Progress</div>
          <div className="text-muted-foreground">
            {currentChapter ? `Chapter ${currentChapter}` : 'Not started'}
          </div>
        </div>
      </div>
      
      <div className="mt-3 w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}