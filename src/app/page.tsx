import { getBookDetails, getChapters, getSiteSettings } from '@/lib/cosmic'
import { ChapterList } from '@/components/ChapterList'
import { BookHeader } from '@/components/BookHeader'
import { Footer } from '@/components/Footer'

export default async function Home() {
  const [bookDetails, chapters, siteSettings] = await Promise.all([
    getBookDetails(),
    getChapters(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BookHeader 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
        <ChapterList 
          chapters={chapters}
          siteSettings={siteSettings}
        />
        <Footer 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
      </div>
    </div>
  )
}