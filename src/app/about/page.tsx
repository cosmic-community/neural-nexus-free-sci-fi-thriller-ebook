import { getBookDetails, getSiteSettings } from '@/lib/cosmic'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DonateButton } from '@/components/DonateButton'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Heart, Zap } from 'lucide-react'

export default async function AboutPage() {
  const [bookDetails, siteSettings] = await Promise.all([
    getBookDetails(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Book</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <DonateButton bookDetails={bookDetails} />
            {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
          </div>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none text-foreground">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">About Neural Nexus</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              The story behind the story
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                The Story
              </h2>
              <p className="text-muted-foreground mb-6">
                Neural Nexus explores the dangerous intersection of human consciousness and artificial intelligence. 
                Set in a near-future world where neural interfaces have become commonplace, the story follows 
                Dr. Maya Chen as she discovers her groundbreaking technology has been weaponized for mind control.
              </p>
              <p className="text-muted-foreground">
                Through Maya's journey, we examine themes of free will, technological ethics, and what it 
                truly means to be human in an age of artificial intelligence. The story asks: if consciousness 
                can be enhanced, shared, or controlled, what defines our individual identity?
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary" />
                The Author
              </h2>
              <p className="text-muted-foreground mb-6">
                Written by {bookDetails?.metadata?.author || 'Your Name'}, Neural Nexus represents 
                a passion project exploring the ethical implications of emerging neurotechnology. 
                The author combines technical expertise with storytelling to create a thriller that's 
                both entertaining and thought-provoking.
              </p>
              <p className="text-muted-foreground">
                This book is offered completely free as a gift to the sci-fi community. If you enjoy 
                the story, please consider supporting the author to enable more creative projects.
              </p>
            </div>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Reading Experience</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card border rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Reading</h3>
                <p className="text-muted-foreground">
                  Navigate chapters easily with progress tracking and reading estimates
                </p>
              </div>
              
              <div className="text-center p-6 bg-card border rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Audio Experience</h3>
                <p className="text-muted-foreground">
                  Listen to chapters with high-quality text-to-speech technology
                </p>
              </div>
              
              <div className="text-center p-6 bg-card border rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Free & Open</h3>
                <p className="text-muted-foreground">
                  Completely free to read, with optional support for the author
                </p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-16 p-8 bg-card border rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Technical Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Book Statistics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 12 chapters</li>
                  <li>• ~20,000 words</li>
                  <li>• 2-3 hour read time</li>
                  <li>• Audio narration available</li>
                  <li>• Mobile-optimized</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Technology</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Built with Next.js 15</li>
                  <li>• Powered by Cosmic CMS</li>
                  <li>• Web Speech API integration</li>
                  <li>• Responsive design</li>
                  <li>• Dark mode support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 btn-hover font-semibold"
            >
              <BookOpen className="w-5 h-5" />
              Start Reading Neural Nexus
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}