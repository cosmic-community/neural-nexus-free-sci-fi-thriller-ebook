'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Chapter } from '@/lib/cosmic'

interface ReadingProgress {
  chaptersRead: string[]
  currentChapter: number | null
  lastReadDate: string
}

export function useReadingProgress(chapters: Chapter[]) {
  const [progress, setProgress] = useLocalStorage<ReadingProgress>('reading-progress', {
    chaptersRead: [],
    currentChapter: null,
    lastReadDate: new Date().toISOString()
  })

  const markChapterAsRead = (chapterId: string) => {
    const newChaptersRead = [...progress.chaptersRead]
    if (!newChaptersRead.includes(chapterId)) {
      newChaptersRead.push(chapterId)
    }
    
    const chapter = chapters.find(c => c.id === chapterId)
    const currentChapter = chapter?.metadata.chapter_number || null
    
    setProgress({
      chaptersRead: newChaptersRead,
      currentChapter,
      lastReadDate: new Date().toISOString()
    })
  }

  const progressPercentage = (progress.chaptersRead.length / chapters.length) * 100

  return {
    progress: progressPercentage,
    currentChapter: progress.currentChapter,
    chaptersRead: progress.chaptersRead,
    markChapterAsRead
  }
}