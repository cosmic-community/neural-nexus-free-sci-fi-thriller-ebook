'use client'

import { useState, useEffect } from 'react'
import { Chapter } from '@/lib/cosmic'
import { Book, ChevronRight, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import Link from 'next/link'

interface TableOfContentsProps {
  chapters: Chapter[]
  currentChapter?: Chapter
  className?: string
}

export function TableOfContents({ chapters, currentChapter, className }: TableOfContentsProps) {
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load completed chapters from localStorage
    const completed = localStorage.getItem('completed-chapters')
    if (completed) {
      setCompletedChapters(new Set(JSON.parse(completed)))
    }
  }, [])

  const sortedChapters = chapters.sort((a, b) => 
    a.metadata.chapter_number - b.metadata.chapter_number
  )

  const currentIndex = currentChapter 
    ? sortedChapters.findIndex(c => c.id === currentChapter.id)
    : -1

  const totalReadingTime = sortedChapters.reduce((total, chapter) => {
    const time = chapter.metadata?.reading_time || '0 min'
    const minutes = parseInt(time.split(' ')[0]) || 0
    return total + minutes
  }, 0)

  const completionPercentage = (completedChapters.size / sortedChapters.length) * 100

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          Table of Contents
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{sortedChapters.length} chapters</span>
            <span>{totalReadingTime} min total</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {completedChapters.size} of {sortedChapters.length} completed
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {sortedChapters.map((chapter, index) => {
          const isCompleted = completedChapters.has(chapter.id)
          const isCurrent = currentChapter?.id === chapter.id
          const isAvailable = index <= currentIndex + 1 // Allow reading next chapter
          
          return (
            <div key={chapter.id} className="group">
              {isAvailable ? (
                <Link href={`/chapters/${chapter.slug}`}>
                  <div className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${isCurrent 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-accent'
                    }
                  `}>
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-medium
                          ${isCurrent 
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : 'border-muted-foreground/30'
                          }
                        `}>
                          {chapter.metadata.chapter_number}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`
                          font-medium line-clamp-1
                          ${isCurrent ? 'text-primary' : ''}
                        `}>
                          {chapter.metadata.chapter_title}
                        </h4>
                        {isCurrent && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        {chapter.metadata.reading_time && (
                          <span className="text-xs text-muted-foreground">
                            {chapter.metadata.reading_time}
                          </span>
                        )}
                        {chapter.metadata.enable_audio && (
                          <Badge variant="secondary" className="text-xs">
                            Audio
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg opacity-50">
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs font-medium">
                    {chapter.metadata.chapter_number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium line-clamp-1 text-muted-foreground">
                      {chapter.metadata.chapter_title}
                    </h4>
                    <div className="text-xs text-muted-foreground mt-1">
                      Locked
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}