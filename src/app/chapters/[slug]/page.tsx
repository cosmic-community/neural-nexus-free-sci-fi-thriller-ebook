import { getChapterBySlug, getChapters, getSiteSettings } from '@/lib/cosmic'
import { ChapterReader } from '@/components/ChapterReader'
import { ChapterNavigation } from '@/components/ChapterNavigation'
import { ThemeProvider } from '@/components/ThemeProvider'
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

  const currentIndex = allChapters.findIndex(c => c.slug === slug)
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ChapterReader 
            chapter={chapter}
            siteSettings={siteSettings}
          />
          <ChapterNavigation 
            previousChapter={previousChapter}
            nextChapter={nextChapter}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

export async function generateStaticParams() {
  const chapters = await getChapters()
  
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }))
}