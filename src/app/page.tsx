import { getBookDetails, getChapters, getSiteSettings } from '@/lib/cosmic'
import { Hero } from '@/components/Hero'
import { BookStats } from '@/components/BookStats'
import { ChapterList } from '@/components/ChapterList'
import { Footer } from '@/components/Footer'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { DonateButton } from '@/components/DonateButton'

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
        
        {/* Support Section */}
        <section id="support" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Support the Author</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Help create more amazing sci-fi stories by supporting the author
            </p>
            <DonateButton bookDetails={bookDetails} />
          </div>
        </section>
        
        <NewsletterSignup />
        
        <Footer 
          bookDetails={bookDetails}
          siteSettings={siteSettings}
        />
      </div>
    </div>
  )
}