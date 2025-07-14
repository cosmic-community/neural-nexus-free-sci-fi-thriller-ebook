import { getBookDetails, getChapters, getSiteSettings } from '@/lib/cosmic'
import { Hero } from '@/components/Hero'
import { BookStats } from '@/components/BookStats'
import { ChapterList } from '@/components/ChapterList'
import { Footer } from '@/components/Footer'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export default async function Home() {
  const [bookDetails, chapters, siteSettings] = await Promise.all([
    getBookDetails(),
    getChapters(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Hero 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
        
        <BookStats 
          bookDetails={bookDetails}
          chapters={chapters}
        />
        
        <ChapterList 
          chapters={chapters}
          siteSettings={siteSettings}
        />
        
        <NewsletterSignup />
        
        <Footer 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
      </div>
    </div>
  )
}