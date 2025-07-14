import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cosmic, getBookDetails, getSiteSettings, getAllChaptersForStaticGeneration } from '@/lib/cosmic'
import { ChapterReader } from '@/components/ChapterReader'
import { ChapterNavigation } from '@/components/ChapterNavigation'
import { SocialShare } from '@/components/SocialShare'
import { ReadingProgress } from '@/components/ReadingProgress'
import { BookStats } from '@/components/BookStats'
import { Footer } from '@/components/Footer'
import { Chapter, SiteSettings, BookDetails } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const response = await cosmic.objects.findOne({
      type: 'chapters',
      slug: slug
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)

    if (!response.object) {
      return {
        title: 'Chapter Not Found',
        description: 'The requested chapter could not be found.'
      }
    }

    const chapter = response.object as Chapter
    const siteSettings = await getSiteSettings()

    const siteTitle = siteSettings?.metadata?.site_title || 'Neural Nexus'
    const chapterTitle = chapter.metadata.chapter_title
    const chapterNumber = chapter.metadata.chapter_number
    const summary = chapter.metadata.summary || ''

    return {
      title: `Chapter ${chapterNumber}: ${chapterTitle} - ${siteTitle}`,
      description: summary,
      openGraph: {
        title: `Chapter ${chapterNumber}: ${chapterTitle}`,
        description: summary,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Chapter ${chapterNumber}: ${chapterTitle}`,
        description: summary,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.'
    }
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const [chapterResponse, allChaptersResponse, siteSettings, bookDetails] = await Promise.all([
      cosmic.objects.findOne({
        type: 'chapters',
        slug: slug
      }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({
        type: 'chapters'
      }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      getSiteSettings(),
      getBookDetails()
    ])

    if (!chapterResponse.object) {
      notFound()
    }

    const chapter = chapterResponse.object as Chapter
    const allChapters = allChaptersResponse.objects as Chapter[]

    const sortedChapters = allChapters.sort((a: Chapter, b: Chapter) => 
      a.metadata.chapter_number - b.metadata.chapter_number
    )

    const currentIndex = sortedChapters.findIndex((c: Chapter) => c.id === chapter.id)
    const previousChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null
    const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null

    return (
      <div className="min-h-screen bg-background">
        <ReadingProgress chapters={sortedChapters} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ChapterReader 
              chapter={chapter} 
              siteSettings={siteSettings}
              allChapters={sortedChapters}
            />
            
            <div className="mt-12">
              <BookStats 
                bookDetails={bookDetails}
                chapters={sortedChapters}
              />
            </div>

            <ChapterNavigation
              currentChapter={chapter}
              allChapters={sortedChapters}
              siteSettings={siteSettings}
              previousChapter={previousChapter}
              nextChapter={nextChapter}
            />

            <div className="mt-12 pt-8 border-t border-border/50">
              <SocialShare 
                title={`Chapter ${chapter.metadata.chapter_number}: ${chapter.metadata.chapter_title}`}
                description={chapter.metadata.summary || ''}
              />
            </div>
          </div>
        </main>

        <Footer 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading chapter:', error)
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    // Use the new function to fetch all chapters for static generation
    const chapters = await getAllChaptersForStaticGeneration()

    return chapters.map((chapter: Chapter) => ({
      slug: chapter.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}