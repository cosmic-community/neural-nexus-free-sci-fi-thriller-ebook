import { getBookDetails, getChapters, getSiteSettings } from '@/lib/cosmic'
import { ChapterList } from '@/components/ChapterList'
import { BookHeader } from '@/components/BookHeader'
import { ThemeProvider } from '@/components/ThemeProvider'

export default async function Home() {
  const [bookDetails, chapters, siteSettings] = await Promise.all([
    getBookDetails(),
    getChapters(),
    getSiteSettings()
  ])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <BookHeader 
            bookDetails={bookDetails}
            siteSettings={siteSettings}
          />
          <ChapterList 
            chapters={chapters}
            siteSettings={siteSettings}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}