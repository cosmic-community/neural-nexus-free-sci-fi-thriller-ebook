import { getChapter, getChapters, getSiteSettings } from '@/lib/cosmic'
import { ChapterReader } from '@/components/ChapterReader'
import { ChapterNavigation } from '@/components/ChapterNavigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface ChapterPageProps {
  params: Promise<{ slug: string }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params
  const [chapter, allChapters, siteSettings] = await Promise.all([
    getChapter(slug),
    getChapters(),
    getSiteSettings()
  ])

  if (!chapter) {
    notFound()
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Chapters
          </Link>
        </div>
        
        <ChapterReader 
          chapter={chapter}
          siteSettings={siteSettings}
        />
        
        <ChapterNavigation 
          currentChapter={chapter}
          allChapters={allChapters}
          siteSettings={siteSettings}
        />
      </div>
    </div>
  )
}