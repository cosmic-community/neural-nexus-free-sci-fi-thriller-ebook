'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, List, BookOpen } from 'lucide-react'
import { Chapter, SiteSettings } from '@/lib/cosmic'

interface ChapterNavigationProps {
  currentChapter: Chapter
  allChapters: Chapter[]
  siteSettings: SiteSettings | null
  previousChapter?: Chapter | null
  nextChapter?: Chapter | null
}

export function ChapterNavigation({
  currentChapter,
  allChapters,
  siteSettings,
  previousChapter,
  nextChapter
}: ChapterNavigationProps) {
  const [showAllChapters, setShowAllChapters] = useState(false)
  
  const currentIndex = allChapters.findIndex(chapter => chapter.id === currentChapter.id)
  const progress = ((currentIndex + 1) / allChapters.length) * 100

  return (
    <div className="mt-12 space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Progress Text */}
      <div className="text-center text-sm text-muted-foreground">
        Chapter {currentIndex + 1} of {allChapters.length}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        {previousChapter ? (
          <Link 
            href={`/chapters/${previousChapter.slug}`}
            className="flex items-center gap-3 px-6 py-3 bg-muted/50 hover:bg-muted transition-colors rounded-xl group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Previous</div>
              <div className="font-medium line-clamp-1">
                {previousChapter.metadata.chapter_title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Chapter List Toggle */}
        <button
          onClick={() => setShowAllChapters(!showAllChapters)}
          className="flex items-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors"
        >
          <List className="w-5 h-5" />
          <span className="font-medium">All Chapters</span>
        </button>

        {nextChapter ? (
          <Link 
            href={`/chapters/${nextChapter.slug}`}
            className="flex items-center gap-3 px-6 py-3 bg-muted/50 hover:bg-muted transition-colors rounded-xl group"
          >
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Next</div>
              <div className="font-medium line-clamp-1">
                {nextChapter.metadata.chapter_title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* All Chapters List */}
      {showAllChapters && (
        <div className="grid gap-3 p-6 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">All Chapters</h3>
          </div>
          
          <div className="grid gap-2">
            {allChapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  chapter.id === currentChapter.id
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {chapter.metadata.chapter_number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-1">
                    {chapter.metadata.chapter_title}
                  </div>
                  {chapter.metadata.reading_time && (
                    <div className="text-sm text-muted-foreground">
                      {chapter.metadata.reading_time}
                    </div>
                  )}
                </div>
                {chapter.id === currentChapter.id && (
                  <div className="text-xs text-primary font-medium">
                    Current
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Back to Home */}
      <div className="text-center pt-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}