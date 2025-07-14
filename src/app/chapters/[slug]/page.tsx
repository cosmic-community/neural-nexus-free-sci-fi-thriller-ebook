// src/app/chapters/[slug]/page.tsx
import { getChapterBySlug, getChapters, getSiteSettings } from '@/lib/cosmic'
import { ChapterReader } from '@/components/ChapterReader'
import { ChapterNavigation } from '@/components/ChapterNavigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ReadingProgress } from '@/components/ReadingProgress'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

interface ChapterPageProps {
  params: Promise<{ slug: string }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params
  
  const [chapter, allChapters, siteSettings] = await Promise.all([
    getChapterBySlug(slug),
    getChapters(),
    getSiteSettings()
  ])

  if (!chapter) {
    notFound()
  }

  const currentIndex = allChapters.findIndex(c => c.id === chapter.id)
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Chapters</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {allChapters.length}
            </div>
            {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
          </div>
        </nav>

        <ChapterReader 
          chapter={chapter} 
          siteSettings={siteSettings}
          allChapters={allChapters}
        />

        {siteSettings?.metadata?.enable_navigation && (
          <ChapterNavigation 
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            allChapters={allChapters}
            currentChapter={chapter}
          />
        )}
      </div>
      
      <ReadingProgress chapters={allChapters} />
    </div>
  )
}