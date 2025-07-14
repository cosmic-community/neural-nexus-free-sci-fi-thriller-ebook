import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { ThemeToggle } from './ThemeToggle'
import { DonateButton } from './DonateButton'
import { SocialShare } from './SocialShare'
import { Play, Download, Star, Users, Clock } from 'lucide-react'
import Link from 'next/link'

interface HeroProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function Hero({ bookDetails, siteSettings }: HeroProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="font-semibold text-lg">Neural Nexus</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/support" className="text-sm hover:text-primary transition-colors">
              Support
            </Link>
            <DonateButton bookDetails={bookDetails} />
            {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Star className="w-4 h-4" />
                <span>Free Sci-Fi Thriller</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">
                  {bookDetails?.metadata?.title || 'Neural Nexus'}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground">
                {bookDetails?.metadata?.subtitle || 'A Sci-Fi Thriller'}
              </p>
              
              <p className="text-lg text-muted-foreground">
                by <span className="font-semibold text-foreground">
                  {bookDetails?.metadata?.author || 'Your Name'}
                </span>
              </p>
            </div>

            {/* Book Description */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <div dangerouslySetInnerHTML={{ 
                __html: bookDetails?.metadata?.description || '' 
              }} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#chapters"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 btn-hover font-semibold"
              >
                <Play className="w-5 h-5" />
                Start Reading
              </Link>
              
              {bookDetails?.metadata?.enable_tts && (
                <button className="flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 btn-hover font-semibold">
                  <Download className="w-5 h-5" />
                  Listen Now
                </button>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1,247 readers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{bookDetails?.metadata?.reading_time || '2-3 hours'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.8/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Book Cover */}
          <div className="relative">
            {bookDetails?.metadata?.cover_image ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <img 
                  src={`${bookDetails.metadata.cover_image.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
                  alt={bookDetails.metadata.title}
                  className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl card-hover"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold">FREE</span>
                </div>
                
                {bookDetails.metadata.enable_tts && (
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-lg font-medium">Neural Nexus</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Share */}
        <SocialShare 
          title={bookDetails?.metadata?.title || 'Neural Nexus'}
          description={bookDetails?.metadata?.description || ''}
        />
      </div>
    </section>
  )
}